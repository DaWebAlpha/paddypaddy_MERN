import { verifyAccessToken } from "../utils/jwt.js";
import userRepository from "../repositories/user.repository.js";
import UnauthenticatedError from "../errors/unauthenticated.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";
import { system_logger } from "../core/pino.logger.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const cookieToken = req.cookies?.access_token;
    const token = bearerToken || cookieToken;

    if (!token) {
      return next(new UnauthenticatedError("Authorization token is required"));
    }

    const decoded = await verifyAccessToken(token);
    const user = await userRepository.findActiveById(decoded.sub);

    if (!user) {
      return next(new UnauthenticatedError("User not found"));
    }

    if (Number(decoded.token_version || 0) !== Number(user.token_version || 0)) {
      return next(new UnauthenticatedError("Token is no longer valid"));
    }

    if (
      user.account_banned ||
      user.is_temporarily_banned ||
      ["banned", "suspended"].includes(user.account_status)
    ) {
      return next(new UnauthorizedError("Account is suspended"));
    }

    req.user = {
      id: user.id,
      _id: user._id,
      sub: user.id,
      role: user.role,
      email: user.email,
      username: user.username,
      account_type: user.account_type,
      isPremium: user.isPremium,
      onboarding_completed: user.onboarding_completed,
      is_email_verified: user.is_email_verified,
      token_version: Number(user.token_version || 0),
    };

    next();
  } catch (error) {
    system_logger.warn(
      { error: error.message },
      "Authentication middleware failed"
    );

    return next(new UnauthenticatedError(error.message || "Unauthorized"));
  }
};

export default authMiddleware;