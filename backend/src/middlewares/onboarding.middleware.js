import UnauthenticatedError from "../errors/unauthenticated.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";

export const onboardingMiddleware = (req, res, next) => {
  if (!req.user) {
    return next(new UnauthenticatedError("Authentication required."));
  }

  if (!req.user.onboarding_completed) {
    return next(
        new UnauthorizedError("Complete onboarding to access this resource")
    );
  }

  next();
};

export default onboardingMiddleware;
