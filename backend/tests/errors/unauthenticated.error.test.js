import UnauthenticatedError from "@src/errors/unauthenticated.error.js";
import AppError from "@src/errors/app.error.js";

describe("UnauthenticatedError", () => {
    test("Should extend AppError", () => {
        const error = new UnauthenticatedError();

        expect(error).toBeInstanceOf(AppError);
    });

    test("Should have status code 401", () => {
        const error = new UnauthenticatedError();

        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Authentication required");
        expect(error.name).toBe("UnauthenticatedError");
        expect(error.isOperational).toBe(true);
    });

    test("Should accept custom message", () => {
        const error = new UnauthenticatedError("Invalid token");

        expect(error.message).toBe("Invalid token");
    });
});
