import AppError from "./app.error.js";

class UnauthorizedError extends AppError {
    constructor(message = "Forbidden", details = null) {
        super(message, 403, details);
    }
}

export { UnauthorizedError };
export default UnauthorizedError;