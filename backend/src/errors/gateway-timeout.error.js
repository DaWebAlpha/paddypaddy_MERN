import AppError from "./app.error.js";

class GatewayTimeoutError extends AppError {
    constructor(message = "Gateway timeout", details = null) {
        super(message, 504, details);
    }
}

export { GatewayTimeoutError };
export default GatewayTimeoutError;