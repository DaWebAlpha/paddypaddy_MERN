import UnauthorizedError from "@src/errors/unauthorized.error.js";
import AppError from "@src/errors/app.error.js";

describe("UnauthorizedError", () => {
    test("Should extend AppError", () => {
        const error = new UnauthorizedError();

        expect(error).toBeInstanceOf(AppError);
    });

    test("Should have status code 403", () => {
        const error = new UnauthorizedError();

        expect(error.statusCode).toBe(403);
        expect(error.message).toBe("Forbidden");
        expect(error.name).toBe("UnauthorizedError");
        expect(error.isOperational).toBe(true);
    });

    test("Should accept custom message", () => {
        const error = new UnauthorizedError("You do not have permission");

        expect(error.message).toBe("You do not have permission");
    });
});
