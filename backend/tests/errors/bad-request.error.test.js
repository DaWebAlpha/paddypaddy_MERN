import BadRequestError from "@src/errors/bad-request.error.js";
import AppError from "@src/errors/app.error.js";

describe("BadRequestError", () => {
  test("should extend AppError", () => {
    const error = new BadRequestError();

    expect(error).toBeInstanceOf(AppError);
  });

  test("should have status code 400", () => {
    const error = new BadRequestError();

    expect(error.statusCode).toBe(400);
    expect(error.message).toBe("Bad Request");
    expect(error.name).toBe("BadRequestError");
    expect(error.isOperational).toBe(true);
  });

  test("should accept custom message", () => {
    const error = new BadRequestError("Invalid input");

    expect(error.message).toBe("Invalid input");
  });
});