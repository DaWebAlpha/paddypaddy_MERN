import ServiceUnavailableError from "@src/errors/service-unavailable.error.js";
import AppError from "@src/errors/app.error.js";


describe("ServiceUnavailableError", ()=>{
    test("Should extend AppError", ()=>{
        const error = new ServiceUnavailableError();

        expect(error).toBeInstanceOf(AppError);
    })

    test("Should have status code 503", ()=>{
        const error = new ServiceUnavailableError();
        expect(error.statusCode).toBe(503);
        expect(error.message).toBe("Service Temporarily Unavailable");
        expect(error.name).toBe("ServiceUnavailableError");
        expect(error.isOperational).toBe(true);
    })

    test("Should accept custom message", ()=>{
        const error = new ServiceUnavailableError("Invalid input");

        expect(error.message).toBe("Invalid input")
    })
})