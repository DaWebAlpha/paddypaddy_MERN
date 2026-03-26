import AppError from "./app.error.js";

class InternalServerError extends AppError{
    constructor(message = "Internal Server Error", details = null){
        super(message, 500, details);
    }
} 

export { InternalServerError };
export default InternalServerError;