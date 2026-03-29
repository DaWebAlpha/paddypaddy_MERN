import UnauthenticatedError from "../errors/unauthenticated.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";

export const accountTypeMiddleware = (...allowedAccountTypes) => {
  return (req, res, next) => {
        if (!req.user) {
      /* 
      return res.status(401).json({
        success: false,
        message: ("Authentication required. Please log in to access this resource.",
      }); 
      */
      return next(new UnauthenticatedError("Authentication required. Please log in to access this resource."));
    }


    if (!allowedAccountTypes.includes(req.user.account_type)) {
      /* 
      return res.status(403).json({
        success: false,
        message: 'This account type is not allowed to access this resource',
      }); 
      */
      return next(
        new UnauthorizedError("This account type is not allowed to access this resource")
      );
    }

    next();
  };
};

export default accountTypeMiddleware;
