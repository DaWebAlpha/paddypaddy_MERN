import { jest } from "@jest/globals";

const mockSign = jest.fn();
const mockVerify = jest.fn();

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: mockSign,
    verify: mockVerify,
  },
}));

jest.unstable_mockModule("@src/config/config.js", () => ({
  default: {
    jwt_access_secret: "access-secret",
    jwt_refresh_secret: "refresh-secret",
    jwt_access_expires_in: "15m",
    jwt_refresh_expires_in: "7d",
    jwt_issuer: "test-issuer",
    jwt_audience: "test-audience",
  },
}));

const { default: jwt } = await import("jsonwebtoken");
const { system_logger } = await import("@src/core/pino.logger.js");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = await import("@src/utils/jwt.js");

describe("JWT Utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateAccessToken", () => {
    it("should generate an access token with correct payload and options", async () => {
      const user = {
        id: "user123",
        role: "admin",
        token_version: 2,
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-access-token");
      });

      const token = await generateAccessToken(user);

      expect(token).toBe("mock-access-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user123",
          role: "admin",
          token_version: 2,
        },
        "access-secret",
        {
          expiresIn: "15m",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should default access token_version to 0 when missing", async () => {
      const user = {
        id: "user123",
        role: "user",
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-access-token");
      });

      const token = await generateAccessToken(user);

      expect(token).toBe("mock-access-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user123",
          role: "user",
          token_version: 0,
        },
        "access-secret",
        {
          expiresIn: "15m",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should convert string token_version to a number for access token", async () => {
      const user = {
        id: "user321",
        role: "editor",
        token_version: "7",
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-access-token");
      });

      const token = await generateAccessToken(user);

      expect(token).toBe("mock-access-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user321",
          role: "editor",
          token_version: 7,
        },
        "access-secret",
        {
          expiresIn: "15m",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should reject and log if access token generation fails", async () => {
      const loggerSpy = jest.spyOn(system_logger, "error").mockImplementation(() => {});

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(new Error("sign failed"), null);
      });

      await expect(
        generateAccessToken({
          id: "user123",
          role: "admin",
          token_version: 1,
        })
      ).rejects.toThrow("Could not generate access token");

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "sign failed" },
        "Security Error: Access token generation failed"
      );
    });
  });

  describe("generateRefreshToken", () => {
    it("should generate a refresh token with correct payload and options", async () => {
      const user = {
        id: "user123",
        token_version: 5,
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-refresh-token");
      });

      const token = await generateRefreshToken(user, "device-abc");

      expect(token).toBe("mock-refresh-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user123",
          device_id: "device-abc",
          token_version: 5,
        },
        "refresh-secret",
        {
          expiresIn: "7d",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should default refresh token_version to 0 when missing", async () => {
      const user = {
        id: "user999",
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-refresh-token");
      });

      const token = await generateRefreshToken(user, "device-xyz");

      expect(token).toBe("mock-refresh-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user999",
          device_id: "device-xyz",
          token_version: 0,
        },
        "refresh-secret",
        {
          expiresIn: "7d",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should convert string token_version to a number for refresh token", async () => {
      const user = {
        id: "user456",
        token_version: "4",
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-refresh-token");
      });

      const token = await generateRefreshToken(user, "device-777");

      expect(token).toBe("mock-refresh-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user456",
          device_id: "device-777",
          token_version: 4,
        },
        "refresh-secret",
        {
          expiresIn: "7d",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should allow undefined device_id and still pass it in payload", async () => {
      const user = {
        id: "user888",
        token_version: 1,
      };

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "mock-refresh-token");
      });

      const token = await generateRefreshToken(user);

      expect(token).toBe("mock-refresh-token");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          sub: "user888",
          device_id: undefined,
          token_version: 1,
        },
        "refresh-secret",
        {
          expiresIn: "7d",
          algorithm: "HS256",
          issuer: "test-issuer",
          audience: "test-audience",
        },
        expect.any(Function)
      );
    });

    it("should reject and log if refresh token generation fails", async () => {
      const loggerSpy = jest.spyOn(system_logger, "error").mockImplementation(() => {});

      mockSign.mockImplementation((payload, secret, options, callback) => {
        callback(new Error("refresh sign failed"), null);
      });

      await expect(
        generateRefreshToken(
          {
            id: "user123",
            token_version: 1,
          },
          "device-001"
        )
      ).rejects.toThrow("Could not generate refresh token");

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "refresh sign failed" },
        "Security Error: Refresh token generation failed"
      );
    });
  });

  describe("verifyAccessToken", () => {
    it("should resolve decoded payload for a valid access token", async () => {
      const decodedPayload = {
        sub: "user123",
        role: "admin",
        token_version: 2,
      };

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(null, decodedPayload);
      });

      const result = await verifyAccessToken("valid-access-token");

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(
        "valid-access-token",
        "access-secret",
        {
          algorithms: ["HS256"],
          issuer: "test-issuer",
          audience: "test-audience",
          clockTolerance: 5,
        },
        expect.any(Function)
      );
    });

    it("should reject and log warning if access token verification fails", async () => {
      const loggerSpy = jest.spyOn(system_logger, "warn").mockImplementation(() => {});

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(new Error("jwt expired"), null);
      });

      await expect(verifyAccessToken("bad-access-token")).rejects.toThrow(
        "Invalid or expired access token"
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "jwt expired" },
        "Security: Access token verification failed"
      );
    });

    it("should reject and log warning for malformed access token", async () => {
      const loggerSpy = jest.spyOn(system_logger, "warn").mockImplementation(() => {});

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(new Error("jwt malformed"), null);
      });

      await expect(verifyAccessToken("malformed-token")).rejects.toThrow(
        "Invalid or expired access token"
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "jwt malformed" },
        "Security: Access token verification failed"
      );
    });
  });

  describe("verifyRefreshToken", () => {
    it("should resolve decoded payload for a valid refresh token", async () => {
      const decodedPayload = {
        sub: "user123",
        device_id: "device-abc",
        token_version: 5,
      };

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(null, decodedPayload);
      });

      const result = await verifyRefreshToken("valid-refresh-token");

      expect(result).toEqual(decodedPayload);
      expect(jwt.verify).toHaveBeenCalledWith(
        "valid-refresh-token",
        "refresh-secret",
        {
          algorithms: ["HS256"],
          issuer: "test-issuer",
          audience: "test-audience",
          clockTolerance: 5,
        },
        expect.any(Function)
      );
    });

    it("should reject and log warning if refresh token verification fails", async () => {
      const loggerSpy = jest.spyOn(system_logger, "warn").mockImplementation(() => {});

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(new Error("invalid signature"), null);
      });

      await expect(verifyRefreshToken("bad-refresh-token")).rejects.toThrow(
        "Invalid or expired refresh token"
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "invalid signature" },
        "Security: Refresh token verification failed"
      );
    });

    it("should reject and log warning for expired refresh token", async () => {
      const loggerSpy = jest.spyOn(system_logger, "warn").mockImplementation(() => {});

      mockVerify.mockImplementation((token, secret, options, callback) => {
        callback(new Error("jwt expired"), null);
      });

      await expect(verifyRefreshToken("expired-refresh-token")).rejects.toThrow(
        "Invalid or expired refresh token"
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "jwt expired" },
        "Security: Refresh token verification failed"
      );
    });
  });
});