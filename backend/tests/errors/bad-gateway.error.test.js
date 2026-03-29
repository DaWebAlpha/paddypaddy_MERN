import BadGatewayError from "@src/errors/bad-gateway.error.js";
import AppError from "@src/errors/app.error.js";

describe("BadGatewayError", () => {
  test("should extend AppError", () => {
    const error = new BadGatewayError();

    expect(error).toBeInstanceOf(AppError);
  });

  test("should have statusCode 502", () => {
    const error = new BadGatewayError();

    expect(error.statusCode).toBe(502);
    expect(error.message).toBe("Bad Gateway");
    expect(error.name).toBe("BadGatewayError");
    expect(error.isOperational).toBe(true);
  });

  test("should accept custom message", () => {
    const error = new BadGatewayError("Invalid entry");

    expect(error.message).toBe("Invalid entry");
  });
});