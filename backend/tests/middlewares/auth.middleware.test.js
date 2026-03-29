import { jest } from "@jest/globals";

const mockVerifyAccessToken = jest.fn();
const mockFindActiveById = jest.fn();
const mockWarn = jest.fn();

jest.unstable_mockModule("@src/utils/jwt.js", () => ({
  verifyAccessToken: mockVerifyAccessToken,
}));

jest.unstable_mockModule("@src/repositories/user.repository.js", () => ({
  default: {
    findActiveById: mockFindActiveById,
  },
}));

jest.unstable_mockModule("@src/core/pino.logger.js", () => ({
  system_logger: {
    warn: mockWarn,
  },
}));

const { authMiddleware } = await import("@src/middlewares/auth.middleware.js");
const { default: UnauthenticatedError } = await import("@src/errors/unauthenticated.error.js");
const { default: UnauthorizedError } = await import("@src/errors/unauthorized.error.js");

describe("authMiddleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {},
    };
    res = {};
    next = jest.fn();

    mockVerifyAccessToken.mockReset();
    mockFindActiveById.mockReset();
    mockWarn.mockReset();
  });

  test("should call next with UnauthenticatedError if no token is provided", async () => {
    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(UnauthenticatedError);
    expect(error.message).toBe("Authorization token is required");
  });

  test("should use bearer token when provided", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-1",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-1",
      _id: "mongo-user-1",
      role: "user",
      email: "user1@example.com",
      username: "userone",
      account_type: "customer",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
      account_banned: false,
      is_temporarily_banned: false,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    expect(mockVerifyAccessToken).toHaveBeenCalledWith("valid-token");
    expect(mockFindActiveById).toHaveBeenCalledWith("user-1");

    expect(req.user).toEqual({
      id: "user-1",
      _id: "mongo-user-1",
      sub: "user-1",
      role: "user",
      email: "user1@example.com",
      username: "userone",
      account_type: "customer",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
    });

    expect(next).toHaveBeenCalledWith();
  });

  test("should use cookie token when bearer token is not provided", async () => {
    req.cookies.access_token = "cookie-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-2",
      token_version: 1,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-2",
      _id: "mongo-user-2",
      role: "provider",
      email: "user2@example.com",
      username: "usertwo",
      account_type: "provider",
      isPremium: true,
      onboarding_completed: false,
      is_email_verified: true,
      token_version: 1,
      account_banned: false,
      is_temporarily_banned: false,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    expect(mockVerifyAccessToken).toHaveBeenCalledWith("cookie-token");
    expect(next).toHaveBeenCalledWith();
  });

  test("should prioritize bearer token over cookie token", async () => {
    req.headers.authorization = "Bearer bearer-token";
    req.cookies.access_token = "cookie-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-3",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-3",
      _id: "mongo-user-3",
      role: "user",
      email: "user3@example.com",
      username: "userthree",
      account_type: "both",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
      account_banned: false,
      is_temporarily_banned: false,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    expect(mockVerifyAccessToken).toHaveBeenCalledWith("bearer-token");
    expect(next).toHaveBeenCalledWith();
  });

  test("should call next with UnauthenticatedError if user is not found", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "missing-user",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue(null);

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthenticatedError);
    expect(error.message).toBe("User not found");
  });

  test("should call next with UnauthenticatedError if token version does not match", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-4",
      token_version: 1,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-4",
      _id: "mongo-user-4",
      role: "user",
      email: "user4@example.com",
      username: "userfour",
      account_type: "customer",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 2,
      account_banned: false,
      is_temporarily_banned: false,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthenticatedError);
    expect(error.message).toBe("Token is no longer valid");
  });

  test("should call next with UnauthorizedError if account is banned", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-5",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-5",
      _id: "mongo-user-5",
      role: "user",
      email: "user5@example.com",
      username: "userfive",
      account_type: "customer",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
      account_banned: true,
      is_temporarily_banned: false,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe("Account is suspended");
  });

  test("should call next with UnauthorizedError if account is temporarily banned", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-6",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-6",
      _id: "mongo-user-6",
      role: "user",
      email: "user6@example.com",
      username: "usersix",
      account_type: "provider",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
      account_banned: false,
      is_temporarily_banned: true,
      account_status: "active",
    });

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe("Account is suspended");
  });

  test("should call next with UnauthorizedError if account status is suspended", async () => {
    req.headers.authorization = "Bearer valid-token";

    mockVerifyAccessToken.mockResolvedValue({
      sub: "user-7",
      token_version: 0,
    });

    mockFindActiveById.mockResolvedValue({
      id: "user-7",
      _id: "mongo-user-7",
      role: "user",
      email: "user7@example.com",
      username: "userseven",
      account_type: "both",
      isPremium: false,
      onboarding_completed: true,
      is_email_verified: true,
      token_version: 0,
      account_banned: false,
      is_temporarily_banned: false,
      account_status: "suspended",
    });

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe("Account is suspended");
  });

  test("should call next with UnauthenticatedError when verifyAccessToken throws", async () => {
    req.headers.authorization = "Bearer bad-token";

    mockVerifyAccessToken.mockRejectedValue(new Error("Invalid token"));

    await authMiddleware(req, res, next);

    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(UnauthenticatedError);
    expect(error.message).toBe("Invalid token");
    expect(mockWarn).toHaveBeenCalled();
  });
});