import crypto from 'crypto';
import authService from '../../services/auth/auth.service.js';
import { system_logger } from '../../core/pino.logger.js';
import config from '../../config/config.js';
import {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
} from "../../utils/request.js";

const isProduction = config.node_env === 'production';



const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });

  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });
};


class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register({
        ...req.body,
        ip_address: getClientIp(req),
        user_agent: getUserAgent(req),
        device_id: getDeviceId(req),
        device_name: getDeviceName(req),
      });

      setAuthCookies(res, result.accessToken, result.refreshToken);

      return res.status(201).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          device_id: result.device_id,
        },
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Register controller error'
      );
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login({
        ...req.body,
        ip_address: getClientIp(req),
        user_agent: getUserAgent(req),
        device_id: getDeviceId(req),
        device_name: getDeviceName(req),
      });

      setAuthCookies(res, result.accessToken, result.refreshToken);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          device_id: result.device_id,
        },
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Login controller error'
      );
      return next(error);
    }
  }

  async loginWithGoogle(req, res, next) {
    try {
      const result = await authService.loginWithGoogle({
        ...req.body,
        ip_address: getClientIp(req),
        user_agent: getUserAgent(req),
        device_id: getDeviceId(req),
        device_name: getDeviceName(req),
      });

      setAuthCookies(res, result.accessToken, result.refreshToken);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          device_id: result.device_id,
        },
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Google login controller error'
      );
      return next(error);
    }
  }

  async refreshAccessToken(req, res, next) {
    try {
      const refreshToken =
        req.body?.refreshToken ||
        req.cookies?.refresh_token ||
        req.headers['x-refresh-token'] ||
        '';

      const result = await authService.refreshAccessToken({
        refreshToken,
      });

      setAuthCookies(res, result.accessToken, result.refreshToken);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          device_id: result.device_id,
        },
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Refresh token controller error'
      );
      return next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken =
        req.body?.refreshToken ||
        req.cookies?.refresh_token ||
        req.headers['x-refresh-token'] ||
        '';

      const result = await authService.logout({
        refreshToken,
      });

      clearAuthCookies(res);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Logout controller error'
      );
      return next(error);
    }
  }

  async logoutFromAllDevices(req, res, next) {
    try {
      const userId = req.user?.sub || req.user?.id || req.user?._id;

      const result = await authService.logoutFromAllDevices(userId);

      clearAuthCookies(res);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Logout all devices controller error'
      );
      return next(error);
    }
  }

  async me(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        message: 'Authenticated user fetched successfully',
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Me controller error'
      );
      return next(error);
    }
  }
}

const authController = new AuthController();

export default authController;
export { authController, AuthController };