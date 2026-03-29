import AppError from "@src/errors/app.error.js";

describe("AppError", () => {
  test("should create default error", () => {
    const error = new AppError();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Application error");
    expect(error.statusCode).toBe(500);
    expect(error.details).toBeNull();
    expect(error.isOperational).toBe(true);
  });

  test("should accept custom values", () => {
    const error = new AppError("Custom", 400, { field: "email" });

    expect(error.message).toBe("Custom");
    expect(error.statusCode).toBe(400);
    expect(error.details).toEqual({ field: "email" });
  });
});