import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/auth/user.model.js";
import { AppError } from "../errors/app.error.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1. Extract token
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Unauthorized - No token provided", 401));
    }

    // 2. Verify JWT (ACCESS TOKEN)
    const decoded = await verifyAccessToken(token);

    if (!decoded?.sub) {
      return next(new AppError("Invalid token payload", 401));
    }

    // 3. Find user
    const user = await User.findById(decoded.sub);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    if (!user.isActive) {
      return next(new AppError("User account is inactive", 403));
    }

    // 4. Attach user
    req.user = user;

    next();
  } catch (error) {
    return next(new AppError("Unauthorized - Invalid or expired token", 401));
  }
};

export { authMiddleware };
export default authMiddleware;