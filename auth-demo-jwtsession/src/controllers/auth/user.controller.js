import { authService } from "../../services/auth/user.service.js";
import { autoCatchFn } from "../../utils/autoCatchFn.js";
import { AppError } from "../../errors/app.error.js";

class AuthController {
  /**
   * @desc    Register a new user
   * @route   POST /api/auth/register
   * @access  Public
   */
  register = autoCatchFn(async (req, res) => {
    const result = await authService.register(req.body, req);

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  });

  /**
   * @desc    Login user
   * @route   POST /api/auth/login
   * @access  Public
   */
  login = autoCatchFn(async (req, res) => {
    const result = await authService.login(req.body, req);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  });

  /**
   * @desc    Refresh access token
   * @route   POST /api/auth/refresh
   * @access  Public
   */
  refresh = autoCatchFn(async (req, res, next) => {
    const refreshToken = req.body?.refreshToken;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 401));
    }

    const result = await authService.refreshAccessToken(
      { refreshToken },
      req
    );

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  });

  /**
   * @desc    Logout current session
   * @route   POST /api/auth/logout
   * @access  Private
   */
  logout = autoCatchFn(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Token is required for logout", 401));
    }

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
   * @desc    Get all active sessions (devices)
   * @route   GET /api/auth/sessions
   * @access  Private
   */
  getSessions = autoCatchFn(async (req, res, next) => {
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

// ✅ Export a SINGLE instance (important for Express binding)
const authController = new AuthController();

export { authController };
export default authController;