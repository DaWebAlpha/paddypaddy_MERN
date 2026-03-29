// middleware/error.middleware.js
const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Remove any HTML tags or long stack traces from the message
    const cleanMessage = err.message.replace(/<[^>]*>?/gm, '');

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: cleanMessage,
        // Only show stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};


export { handleError };
export default handleError;