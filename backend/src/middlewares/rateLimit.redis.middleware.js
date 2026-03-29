import redis from '../core/redis.js';
import { system_logger } from '../core/pino.logger.js';
import TooManyRequestsError from '../errors/too-many-requests.error.js';

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
};

export const redisRateLimit = ({
  keyPrefix = 'rate_limit',
  windowInSeconds = 60,
  maxRequests = 10,
  message = 'Too many requests, please try again later',
  useUserId = false,
} = {}) => {
  return async (req, res, next) => {
    try {
      const ip = getClientIp(req);
      const identifier = useUserId && req.user?.id ? req.user.id : ip;
      const key = `${keyPrefix}:${identifier}`;
      
      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowInSeconds);
      } else {
        
        const ttl = await redis.ttl(key);
        if (ttl === -1) await redis.expire(key, windowInSeconds);
      }

      const ttl = await redis.ttl(key);
      const remaining = Math.max(maxRequests - current, 0);

      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', ttl > 0 ? ttl : windowInSeconds);

      if (current > maxRequests) {
        res.setHeader('Retry-After', ttl > 0 ? ttl : windowInSeconds);
        return next(new TooManyRequestsError(message));
      }

      next();
    } catch (error) {
      system_logger.error(
        { error: error.message },
        'Redis rate limit middleware failed'
      );
      next();
    }
  };
};

export default redisRateLimit;
