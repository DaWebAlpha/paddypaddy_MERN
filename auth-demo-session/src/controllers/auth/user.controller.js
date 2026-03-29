import { authService } from "../../services/auth/user.service.js";
import { autoCatchFn } from "../../utils/autoCatchFn.js";
import { AppError } from "../../errors/app.error.js";

class AuthController {
  /**
   * @desc    Register a new user
   * @route   POST /api/auth/register
   * @access  Public
   */
  register = autoCatchFn(async (req, res, next) => {
    const result = await authService.register(req.body, req);
    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        sessionToken: result.sessionToken,
      },
    });
  });



  /**
   * @desc    Login user
   * @route   POST /api/auth/login
   * @access  Public
   */
  login = autoCatchFn(async (req, res, next) => {
    // Pass payload (req.body) and req object to service
    const result = await authService.login(req.body, req);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        sessionToken: result.sessionToken,
      },
    });
  });



  /**
   * @desc    Logout current session
   * @route   POST /api/auth/logout
   * @access  Private
   */
  logout = autoCatchFn(async (req, res, next) => {
    // Expecting token in Authorization header: "Bearer <token>"
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Token is required for logout", 401));
    }

    // Pass the token to the service
    const result = await authService.logout({ token });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  });


  /**
   * @desc    Logout from all devices
   * @route   POST /api/auth/logout-all
   * @access  Private
   */
  logoutAll = autoCatchFn(async (req, res, next) => {
    // Assuming middleware attaches user ID to req.user
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await authService.logoutAll(userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  });

  /**
   * @desc    Get current user profile
   * @route   GET /api/auth/me
   * @access  Private
   */
  getProfile = autoCatchFn(async (req, res, next) => {
    // Assuming middleware attaches user ID to req.user
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await authService.getProfile(userId);

    res.status(200).json({
      success: true,
      data: result.user,
    });
  });

  /**
   * @desc    Get all active sessions
   * @route   GET /api/auth/sessions
   * @access  Private
   */
  getSessions = autoCatchFn(async (req, res, next) => {
    // Assuming middleware attaches user ID to req.user
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("User not authenticated", 401));
    }

    const result = await authService.getSessions(userId);

    res.status(200).json({
      success: true,
      count: result.count,
      data: result.sessions,
    });
  });
}

export default new AuthController();
// Exporting an instance allows methods to be bound correctly when used in routes