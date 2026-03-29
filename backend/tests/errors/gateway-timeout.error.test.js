import AppError from "@src/errors/app.error.js";
import GatewayTimeoutError from "@src/errors/gateway-timeout.error.js";

describe("GatewayTimeoutError", () => {
    test("Should extend AppError", () => {
        const error = new GatewayTimeoutError();
        expect(error).toBeInstanceOf(AppError); 
    });

    test("Should have status code 504", () => { 
        const error = new GatewayTimeoutError();

        expect(error.statusCode).toBe(504);
        expect(error.message).toBe("Gateway timeout");
        expect(error.name).toBe("GatewayTimeoutError");
        expect(error.isOperational).toBe(true);
    });

    test("Should accept custom message", () => {
        const error = new GatewayTimeoutError("Server took too long");
        expect(error.message).toBe("Server took too long");
    });
});
