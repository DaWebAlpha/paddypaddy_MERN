import { User } from "../../models/auth/user.model.js";
import { Session } from "../../models/sessions/sessions.model.js";
import { stringHelpers } from "../../utils/string.utils.js";
import { AppError } from "../../errors/app.error.js";
import { generateOpaqueToken } from "../../utils/token.js";
import {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
} from "../../utils/request.js";

class AuthService {
  // FIX: Accept 'req' to extract IP, User-Agent, etc.
  async register(payload = {}, req) {
    const email = stringHelpers.normalizeValue(String(payload?.email ?? ""));
    const username = stringHelpers.normalizeValue(String(payload?.username ?? ""));
    const password = String(payload?.password ?? "").trim();

    if (!email) throw new AppError("Email is required", 400);
    if (!username) throw new AppError("Username is required", 400);
    if (!password) throw new AppError("Password is required", 400);

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      throw new AppError("Username or email already exists", 409);
    }

    try {
      const user = await User.create({ username, email, password });
      
      const sessionToken = generateOpaqueToken();

      // FIX: Pass 'req' to utility functions
      await Session.create({
        token: sessionToken,
        userId: user._id, 
        userAgent: getUserAgent(req), 
        ipAddress: getClientIP(req),
        deviceName: getDeviceName(req),
        deviceId: getDeviceId(req),
        // Ensure defaults are set if not in schema
        isRevoked: false, 
      });

      return {
        user: { id: user._id, email: user.email, username: user.username },
        sessionToken: sessionToken,
        message: "User registered successfully",
      };
    } catch (error) {
      if (error.name === "ValidationError") {
        const message = Object.values(error.errors)
          .map((val) => val.message)
          .join(", ");
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

  // FIX: Accept 'req'
  async login(payload = {}, req) {
    try {
      const username = stringHelpers.normalizeValue(String(payload?.username ?? ""));
      const email = stringHelpers.normalizeValue(String(payload?.email ?? ""));
      const password = String(payload?.password ?? "").trim();

      if ((!username && !email) || !password) {
        throw new AppError("Enter either username or email and password", 400);
      }

      const user = await User.findOne({
        $or: [
          { email: email || undefined },
          { username: username || undefined },
        ],
      }).select("+password");

      if (!user) {
        throw new AppError("Invalid credentials", 401);
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new AppError("Password did not match", 401);
      }

      const sessionToken = generateOpaqueToken();

      // FIX: Pass 'req'
      await Session.create({
        token: sessionToken,
        userId: user._id,
        userAgent: getUserAgent(req),
        ipAddress: getClientIP(req),
        deviceName: getDeviceName(req),
        deviceId: getDeviceId(req),
        isRevoked: false,
      });

      return {
        user: { id: user._id, email: user.email, username: user.username },
        sessionToken: sessionToken,
        message: "Login successful",
      };
    } catch (error) {
      if (error.name === "MongooseServerSelectionError") {
        throw new AppError("Authentication service temporarily unavailable", 503);
      }
      throw error;
    }
  }

  async logout(payload = {}) {
    const token = String(payload?.token ?? "").trim();

    if (!token) {
      throw new AppError("Token is required", 401);
    }

    const session = await Session.findOne({ token });

    if (!session) {
      return { message: "Logged out successfully" };
    }

    // Assuming session.revoke is a method on the document instance
    await session.revoke("user_logout");

    return { message: "Logged out successfully" };
  }

  async logoutAll(userId) {
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }

    // FIX: Use $inc to atomically increment version or just set fields.
    // Removed undefined 'tokenVersion' variable.
    const result = await Session.updateMany(
      { userId: userId, isRevoked: false },
      [ 
        { 
          $set: { 
            isRevoked: true, 
            tokenVersion: { $add: ["$tokenVersion", 1] },
            revokedAt: new Date(), 
            revokeReason: "logout_all_devices" 
          } 
        }
      ]
    );

    return { 
        message: `Successfully logged out of ${result.modifiedCount} devices.` 
    };
  }

  async getProfile(userId) {
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return { user };
  }

  async getSessions(userId) {
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }

    const sessions = await Session.find({ 
        userId: userId, 
        isRevoked: false 
    }).sort({ lastUsedAt: -1 });

    return { 
        count: sessions.length, 
        sessions 
    };
  }
}

const authService = new AuthService();
export { authService };
export default authService;