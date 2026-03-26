import AppError from "./app.error.js";

class ServiceUnavailableError extends AppError{
    constructor(message = "Service Temporarily Unavailable", details = null){
        super(message, 503, details);
    }
}

export { ServiceUnavailableError };
export default ServiceUnavailableError;