import AppError from "./app.error.js";

class BadRequestError extends AppError {
    constructor(message = "Bad Request", details = null) {
        super(message, 400, details);
    }
}

export { BadRequestError };
export default BadRequestError;