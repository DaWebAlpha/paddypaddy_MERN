import UnauthenticatedError from "../errors/unauthenticated.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";

export const isPremiumMiddleware = (...allowedStatuses) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthenticatedError("Authentication required."));
    }

    // Checking if the user's status is in the allowed list (e.g., [true])
    if (!allowedStatuses.includes(req.user.isPremium)) {
      return next(
        new UnauthorizedError("Premium subscription required to access this resource")
      );
    }

    next();
  };
};

export default isPremiumMiddleware;
