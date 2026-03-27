import jwt from 'jsonwebtoken';
import { system_logger } from '../core/pino.logger.js';
import config from '../config/config.js';

const JWT_ACCESS_SECRET = config.jwt_access_secret;
const JWT_REFRESH_SECRET = config.jwt_refresh_secret;

const JWT_ACCESS_EXPIRES_IN = config.jwt_access_expires_in;
const JWT_REFRESH_EXPIRES_IN = config.jwt_refresh_expires_in;

const JWT_ISSUER = config.jwt_issuer;
const JWT_AUDIENCE = config.jwt_audience;
const JWT_ALGORITHM = 'HS256';

export const generateAccessToken = (user) => {
  const payload = {
    sub: user.id,
    role: user.role,
    token_version: Number(user.token_version || 0),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_ACCESS_SECRET,
      {
        expiresIn: JWT_ACCESS_EXPIRES_IN,
        algorithm: JWT_ALGORITHM,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      },
      (error, token) => {
        if (error) {
          system_logger.error(
            { error: error.message },
            'Security Error: Access token generation failed'
          );
          return reject(new Error('Could not generate access token'));
        }

        resolve(token);
      }
    );
  });
};

export const generateRefreshToken = (user, device_id) => {
  const payload = {
    sub: user.id,
    device_id,
    token_version: Number(user.token_version || 0),
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_REFRESH_SECRET,
      {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
        algorithm: JWT_ALGORITHM,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      },
      (error, token) => {
        if (error) {
          system_logger.error(
            { error: error.message },
            'Security Error: Refresh token generation failed'
          );
          return reject(new Error('Could not generate refresh token'));
        }

        resolve(token);
      }
    );
  });
};

export const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_ACCESS_SECRET,
      {
        algorithms: [JWT_ALGORITHM],
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        clockTolerance: 5,
      },
      (error, decoded) => {
        if (error) {
          system_logger.warn(
            { error: error.message },
            'Security: Access token verification failed'
          );
          return reject(new Error('Invalid or expired access token'));
        }

        resolve(decoded);
      }
    );
  });
};

export const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_REFRESH_SECRET,
      {
        algorithms: [JWT_ALGORITHM],
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        clockTolerance: 5,
      },
      (error, decoded) => {
        if (error) {
          system_logger.warn(
            { error: error.message },
            'Security: Refresh token verification failed'
          );
          return reject(new Error('Invalid or expired refresh token'));
        }

        resolve(decoded);
      }
    );
  });
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};