import { jest } from "@jest/globals";

const mockHash = jest.fn();
const mockVerify = jest.fn();

jest.unstable_mockModule("argon2", () => ({
  default: {
    argon2id: 2,
    hash: mockHash,
    verify: mockVerify,
  },
}));

const { default: argon2 } = await import("argon2");
const { system_logger } = await import("@src/core/pino.logger.js");
const { default: BadRequestError } = await import("@src/errors/bad-request.error.js");
const { hashPassword, verifyPassword } = await import("@src/utils/password.argon2.js");

describe("Password Utility", () => {
  const mockConfig = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 2,
    hashLength: 32,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hashPassword", () => {
    test("should return null if password is not a string", async () => {
      const result = await hashPassword(12345);
      expect(result).toBeNull();
    });

    test("should throw BadRequestError for empty trimmed password", async () => {
      await expect(hashPassword("     ")).rejects.toThrow(BadRequestError);
      await expect(hashPassword("     ")).rejects.toThrow("Invalid password input");
    });

    test("should throw BadRequestError for passwords shorter than 8 characters", async () => {
      await expect(hashPassword("short")).rejects.toThrow(BadRequestError);
      await expect(hashPassword("short")).rejects.toThrow(
        "Password must be at least 8 characters long"
      );
    });

    test("should hash a valid password and trim whitespace", async () => {
      const plainPassword = "  strongpassword123  ";
      const expectedHash = "$argon2id$v=19$m=65536,t=3,p=2$mockhash";

      mockHash.mockResolvedValue(expectedHash);

      const result = await hashPassword(plainPassword);

      expect(result).toBe(expectedHash);
      expect(mockHash).toHaveBeenCalledWith("strongpassword123", mockConfig);
    });

    test("should log error and throw BadRequestError if argon2.hash fails", async () => {
      const loggerSpy = jest.spyOn(system_logger, "error").mockImplementation(() => {});
      mockHash.mockRejectedValue(new Error("Argon error"));

      await expect(hashPassword("validpassword")).rejects.toThrow(BadRequestError);
      await expect(hashPassword("validpassword")).rejects.toThrow(
        "Internal security error"
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "Argon error" },
        "Security: Password hashing failed"
      );
    });
  });

  describe("verifyPassword", () => {
    test("should return false if either parameter is missing", async () => {
      expect(await verifyPassword(null, "hash")).toBe(false);
      expect(await verifyPassword("password", "")).toBe(false);
      expect(await verifyPassword("", "hash")).toBe(false);
      expect(await verifyPassword(undefined, undefined)).toBe(false);
    });

    it("should return true for a matching password", async () => {
      mockVerify.mockResolvedValue(true);

      const result = await verifyPassword("plain_pass", "hashed_pass");

      expect(result).toBe(true);
      expect(mockVerify).toHaveBeenCalledWith("hashed_pass", "plain_pass");
    });

    it("should trim plain password before verification", async () => {
      mockVerify.mockResolvedValue(true);

      const result = await verifyPassword("  plain_pass  ", "hashed_pass");

      expect(result).toBe(true);
      expect(mockVerify).toHaveBeenCalledWith("hashed_pass", "plain_pass");
    });

    it("should return false for a mismatched password", async () => {
      mockVerify.mockResolvedValue(false);

      const result = await verifyPassword("wrong_pass", "hashed_pass");

      expect(result).toBe(false);
      expect(mockVerify).toHaveBeenCalledWith("hashed_pass", "wrong_pass");
    });

    it("should return false and log error if argon2.verify crashes", async () => {
      const loggerSpy = jest.spyOn(system_logger, "error").mockImplementation(() => {});
      mockVerify.mockRejectedValue(new Error("Verify failed"));

      const result = await verifyPassword("pass12345", "hash");

      expect(result).toBe(false);
      expect(loggerSpy).toHaveBeenCalledWith(
        { error: "Verify failed" },
        "Security: Password verification failed"
      );
    });
  });
});