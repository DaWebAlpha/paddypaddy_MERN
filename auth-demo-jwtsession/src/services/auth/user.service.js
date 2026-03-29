import { User } from '../../models/auth/user.model.js';
import { RefreshToken } from '../../models/auth/refreshTokens.model.js';
import { stringHelpers } from '../../utils/string.utils.js';
import { AppError } from '../../errors/app.error.js';
import {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
} from '../../utils/request.js';
import {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
} from '../../utils/jwt.js';

class AuthService {

  async register(payload = {}, req) {
    const email = stringHelpers.normalizeValue(String(payload?.email ?? ''));
    const username = stringHelpers.normalizeValue(String(payload?.username ?? ''));
    const password = String(payload?.password ?? '').trim();

    if (!email) throw new AppError('Email is required', 400);
    if (!username) throw new AppError('Username is required', 400);
    if (!password) throw new AppError('Password is required', 400);

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) throw new AppError('Username or email already exists', 409);

    try {
      const user = await User.create({ username, email, password });
      const accessToken = generateAccessToken(user._id);
      const refreshToken = await generateRefreshToken({
        userId: user._id,
        userAgent: getUserAgent(req),
        ipAddress: getClientIP(req),
        deviceName: getDeviceName(req),
        deviceId: getDeviceId(req),
      });

      return {
        user: { id: user._id, email: user.email, username: user.username },
        accessToken,
        refreshToken,
        message: 'User registered successfully',
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map((v) => v.message).join(', ');
        throw new AppError(message, 400);
      }
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw new AppError(
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists (DB constraint)`,
          409
        );
      }
      throw error;
    }
  }

  async login(payload = {}, req) {
    try {
      const username = stringHelpers.normalizeValue(String(payload?.username ?? ''));
      const email = stringHelpers.normalizeValue(String(payload?.email ?? ''));
      const password = String(payload?.password ?? '').trim();

      if ((!username && !email) || !password) {
        throw new AppError('Enter either username or email and password', 400);
      }

      const user = await User.findOne({
        $or: [
          { email: email || undefined },
          { username: username || undefined },
        ],
      }).select('+password');

      if (!user) throw new AppError('Invalid credentials', 401);
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new AppError('Password did not match', 401);

      const accessToken = generateAccessToken(user._id);
      const refreshToken = await generateRefreshToken({
        userId: user._id,
        userAgent: getUserAgent(req),
        ipAddress: getClientIP(req),
        deviceName: getDeviceName(req),
        deviceId: getDeviceId(req),
      });

      return {
        user: { id: user._id, email: user.email, username: user.username },
        accessToken,
        refreshToken,
        message: 'Login successful',
      };
    } catch (error) {
      if (error.name === 'MongooseServerSelectionError') {
        throw new AppError('Authentication service temporarily unavailable', 503);
      }
      throw error;
    }
  }

  async refreshAccessToken(payload = {}, req) {
    const rawToken = String(payload?.refreshToken ?? '').trim();

    if (!rawToken) throw new AppError('Refresh token is required', 401);

    const stored = await RefreshToken.findOne({ token: rawToken });
    if (!stored) throw new AppError('Refresh token not found', 401);

    if (!stored.isActive()) {
      if (!stored.isRevoked) await stored.revoke('token_expired');
      throw new AppError('Refresh token has expired or been revoked', 401);
    }

    const user = await User.findById(stored.userId);
    if (!user || !user.isActive) {
      await stored.revoke('user_inactive_or_deleted');
      throw new AppError('User account is not active', 401);
    }

    const newAccessToken = generateAccessToken(user._id);

    // Rotate: kill old, issue new
    await stored.revoke('token_rotated');
    const newRefreshToken = await generateRefreshToken({
      userId: user._id,
      userAgent: getUserAgent(req),
      ipAddress: getClientIP(req),
      deviceName: getDeviceName(req),
      deviceId: getDeviceId(req),
    });

    return {
      user: { id: user._id, email: user.email, username: user.username },
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      message: 'Token refreshed successfully',
    };
  }

  async logout(payload = {}) {
    const token = String(payload?.token ?? '').trim();
    if (!token) throw new AppError('Token is required', 401);

    const refreshToken = await RefreshToken.findOne({ token });
    if (!refreshToken) return { message: 'Logged out successfully' };

    await refreshToken.revoke('user_logout');
    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId) {
    if (!userId) throw new AppError('User ID is required', 400);

    const result = await RefreshToken.updateMany(
      { userId, isRevoked: false },
      [{
        $set: {
          isRevoked: true,
          tokenVersion: { $add: ['$tokenVersion', 1] },
          revokedAt: new Date(),
          revokeReason: 'logout_all_devices',
        },
      }]
    );

    return {
      message: `Successfully logged out of ${result.modifiedCount} devices.`,
    };
  }

  async getProfile(userId) {
    if (!userId) throw new AppError('User ID is required', 400);
    const user = await User.findById(userId).select('-password');
    if (!user) throw new AppError('User not found', 404);
    return { user };
  }

  async getSessions(userId) {
    if (!userId) throw new AppError('User ID is required', 400);
    const sessions = await RefreshToken.find({
      userId,
      isRevoked: false,
    }).sort({ lastUsedAt: -1 });

    return { count: sessions.length, sessions };
  }
}

const authService = new AuthService();
export { authService };
export default authService;