import InternalServerError from "@src/errors/internal-server.error.js";
import AppError from "@src/errors/app.error.js";

describe("InternalServerError", ()=>{
    test("should extend AppError", ()=>{
        const error = new InternalServerError();

        expect(error).toBeInstanceOf(AppError);
    })

    test("Should have status code 500",()=>{
        const error = new InternalServerError();

        expect(error.statusCode).toBe(500);
        expect(error.message).toBe("Internal Server Error");
        expect(error.name).toBe("InternalServerError");
        expect(error.isOperational).toBe(true);
    })

    test("Should accept custommessage", ()=>{
        const error = new InternalServerError("Invalid input");
        expect(error.message).toBe("Invalid input")
    })
})