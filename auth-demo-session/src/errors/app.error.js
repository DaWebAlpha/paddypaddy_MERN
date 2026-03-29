class AppError extends Error{
    constructor(message="Application Error", statusCode = 500, details=null){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace?.(this, this.constructor);
    }
}

export { AppError };
export default AppError;