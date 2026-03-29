import AppError from "@src/errors/app.error.js";
import NotFoundError from "@src/errors/not-found.error.js";


describe("NotFoundError", () => {
    test("Should extend AppError", () => {
        const error = new NotFoundError();

        expect(error).toBeInstanceOf(AppError);
    })

    test("Should have status code 404", ()=>{
        const error = new NotFoundError();

        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Resource Not Found");
        expect(error.name).toBe("NotFoundError");
        expect(error.isOperational).toBe(true);
    })

    test("Should accept custom message", () => {
        const error = new NotFoundError("Invalid input");

        expect(error.message).toBe("Invalid input")
    })
})