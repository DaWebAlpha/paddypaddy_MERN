import { Session } from "../models/sessions/sessions.model.js";
import { User } from "../models/auth/user.model.js";
import { AppError } from "../errors/app.error.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1. Extract token from Authorization header
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Unauthorized - No token provided", 401));
    }

    // 2. Find the session in the database
    // We verify the token existence and validity (not revoked) in one query
    const session = await Session.findOne({
      token: token,
      isRevoked: false,
    });

    if (!session) {
      return next(new AppError("Unauthorized - Invalid or expired session", 401));
    }

    // 3. Optional: Update session activity (keeps 'lastUsedAt' current)
    // Only run this occasionally (e.g., every 10 mins) in production to save DB writes
    // For simplicity, we update it every request here:
    session.lastUsedAt = new Date();
    await session.save();

    // 4. Find the user associated with the session
    const user = await User.findById(session.userId);

    if (!user) {
      return next(new AppError("User associated with this session no longer exists", 401));
    }

    // 5. Attach user and session to request object
    req.user = user;
    req.session = session; // Useful if you need session ID or device info later

    next();
  } catch (error) {
    // Pass to global error handler
    next(error);
  }
};

export { authMiddleware };
export default authMiddleware;