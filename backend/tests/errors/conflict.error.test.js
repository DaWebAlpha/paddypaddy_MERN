import ConflictError from "@src/errors/conflict.error.js";
import AppError from "@src/errors/app.error.js";

describe("ConflictError", () => {
    test("Should extend AppError", () => {
        const error = new ConflictError();
        expect(error).toBeInstanceOf(AppError);
        expect(error).toBeInstanceOf(Error);
    });

    test("Should have correct default properties", () => {
        const error = new ConflictError();
        expect(error.statusCode).toBe(409);
        expect(error.message).toBe("Resource conflict");
        expect(error.name).toBe("ConflictError");
        expect(error.isOperational).toBe(true);
    });

    test("Should accept custom message and details", () => {
        const details = { field: "email", reason: "duplicate" };
        const error = new ConflictError("Email already exists", details);
        
        expect(error.message).toBe("Email already exists");
        expect(error.details).toEqual(details);
    });

    test("Should capture stack trace", () => {
        const error = new ConflictError();
        expect(error.stack).toBeDefined();
    });
});
