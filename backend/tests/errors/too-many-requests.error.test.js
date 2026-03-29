import TooManyRequestsError from "@src/errors/too-many-requests.error.js";
import AppError from "@src/errors/app.error.js";

describe("TooManyRequestsError", () => {
    test("Should extend AppError", () => {
        const error = new TooManyRequestsError();

        expect(error).toBeInstanceOf(AppError);
    });

    test("Should have status code 429", () => {
        const error = new TooManyRequestsError();
        
        expect(error.statusCode).toBe(429);
        expect(error.message).toBe("Too many requests, please try again later");
        expect(error.name).toBe("TooManyRequestsError");
        expect(error.isOperational).toBe(true);
    });

    test("Should accept custom message", () => {
        const error = new TooManyRequestsError("Rate limit exceeded");

        expect(error.message).toBe("Rate limit exceeded");
    });
});
