import AppError from "./app.error.js";

class NotFoundError extends AppError{
    constructor(message = "Resource Not Found", details = null){
        super(message, 404, details);
    }
}

export default NotFoundError;
export { NotFoundError };