import AppError from "./app.error.js";

class ConflictError extends AppError {
  constructor(message = "Resource conflict", details = null) {
    super(message, 409, details);
  }
}

export { ConflictError };
export default ConflictError;
