import AppError from "./app.error.js";

class UnauthenticatedError extends AppError {
    constructor(message = "Authentication required", details = null) {
        super(message, 401, details);
    }
}

export { UnauthenticatedError };
export default UnauthenticatedError;