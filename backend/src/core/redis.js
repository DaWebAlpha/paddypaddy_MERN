
import Redis from 'ioredis';
import config from '../config/config.js';
import { system_logger } from './pino.logger.js';

const REDIS_URI = config.redis_uri;


const redis = new Redis(REDIS_URI);


redis.on('connect', () => {
    system_logger.info('Redis TCP connection established');
});

redis.on('ready', () => {
    system_logger.info('Redis client is ready for commands');
});

redis.on('error', (error) => {
    system_logger.error({ err: error }, 'Redis connection error');
});

redis.on('close', () => {
    system_logger.warn('Redis connection closed');
});


export default redis;