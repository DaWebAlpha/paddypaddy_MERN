import { jest } from "@jest/globals";
import accountTypeMiddleware from "@src/middlewares/accountType.middleware.js";
import UnauthenticatedError from "@src/errors/unauthenticated.error.js";
import UnauthorizedError from "@src/errors/unauthorized.error.js";

describe("accountTypeMiddleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  test("should call next with UnauthenticatedError if req.user is missing", () => {
    const middleware = accountTypeMiddleware("customer");

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(UnauthenticatedError);
    expect(error.message).toBe(
      "Authentication required. Please log in to access this resource."
    );
  });

  test("should call next with UnauthorizedError if account type is not allowed", () => {
    req.user = { account_type: "customer" };
    const middleware = accountTypeMiddleware("provider");

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe(
      "This account type is not allowed to access this resource"
    );
  });

  test("should call next with no argument if account type is allowed", () => {
    req.user = { account_type: "provider" };
    const middleware = accountTypeMiddleware("provider");

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test("should allow access when account type is one of multiple allowed account types", () => {
    req.user = { account_type: "both" };
    const middleware = accountTypeMiddleware("customer", "both");

    middleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});