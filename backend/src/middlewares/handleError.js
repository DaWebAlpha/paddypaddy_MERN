import { system_logger } from '../core/pino.logger.js';
import config from '../config/config.js';

const NODE_ENV = config.node_env;

export function handleError(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    
    const statusCode = err.statusCode || 500;
    
    system_logger.error(
        { 
            err, 
            path: req.originalUrl, 
            method: req.method 
        }, 
        `[${statusCode}] ${err.message}`
    );

    return res.status(statusCode).json({
        success: false,
        // Using err.name makes the response more descriptive (e.g., "UnauthenticatedError")
        title: err.name || 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
        ...(NODE_ENV === 'development' && { stack: err.stack })
    });
}

export default handleError;
