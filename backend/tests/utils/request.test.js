import { jest } from "@jest/globals";
import {
  getClientIP,
  getUserAgent,
  getDeviceName,
  getDeviceId,
} from "@src/utils/request.js";

describe("Request Info Utility", () => {
  describe("getClientIP", () => {
    test("should return first IP from x-forwarded-for header", () => {
      const req = {
        headers: {
          "x-forwarded-for": " 192.168.1.10, 10.0.0.1 ",
        },
        socket: {
          remoteAddress: "127.0.0.1",
        },
        ip: "8.8.8.8",
      };

      const result = getClientIP(req);
      expect(result).toBe("192.168.1.10");
    });

    test("should return x-real-ip if x-forwarded-for is missing", () => {
      const req = {
        headers: {
          "x-real-ip": "172.16.0.5",
        },
        socket: {
          remoteAddress: "127.0.0.1",
        },
        ip: "8.8.8.8",
      };

      const result = getClientIP(req);
      expect(result).toBe("172.16.0.5");
    });

    test("should return socket.remoteAddress if headers are missing", () => {
      const req = {
        headers: {},
        socket: {
          remoteAddress: "10.10.10.10",
        },
        ip: "8.8.8.8",
      };

      const result = getClientIP(req);
      expect(result).toBe("10.10.10.10");
    });

    test("should return req.ip if others are missing", () => {
      const req = {
        headers: {},
        socket: {},
        ip: "203.0.113.1",
      };

      const result = getClientIP(req);
      expect(result).toBe("203.0.113.1");
    });

    test("should return unknown if no IP source exists", () => {
      const req = {
        headers: {},
        socket: {},
      };

      const result = getClientIP(req);
      expect(result).toBe("unknown");
    });

    test("should trim whitespace from forwarded IP", () => {
      const req = {
        headers: {
          "x-forwarded-for": "   41.58.0.1   , 41.58.0.2",
        },
        socket: {},
      };

      const result = getClientIP(req);
      expect(result).toBe("41.58.0.1");
    });
  });

  describe("getUserAgent", () => {
    test("should return user-agent header if present", () => {
      const req = {
        headers: {
          "user-agent": "Mozilla/5.0",
        },
      };

      const result = getUserAgent(req);
      expect(result).toBe("Mozilla/5.0");
    });

    test("should return null if user-agent is missing", () => {
      const req = {
        headers: {},
      };

      const result = getUserAgent(req);
      expect(result).toBeNull();
    });
  });

  describe("getDeviceName", () => {
    test("should return trimmed device_name from body first", () => {
      const req = {
        body: {
          device_name: "  My Laptop  ",
        },
        headers: {
          "x-device-name": "Header Device",
          "device-name": "Fallback",
        },
      };

      const result = getDeviceName(req);
      expect(result).toBe("My Laptop");
    });

    test("should fallback to x-device-name header", () => {
      const req = {
        body: {},
        headers: {
          "x-device-name": "  Samsung Galaxy  ",
        },
      };

      const result = getDeviceName(req);
      expect(result).toBe("Samsung Galaxy");
    });

    test("should fallback to device-name header", () => {
      const req = {
        body: {},
        headers: {
          "device-name": "  Desktop Chrome  ",
        },
      };

      const result = getDeviceName(req);
      expect(result).toBe("Desktop Chrome");
    });

    test("should return empty string if no device name exists", () => {
      const req = {
        body: {},
        headers: {},
      };

      const result = getDeviceName(req);
      expect(result).toBe("");
    });

    test("should return empty string if device name is null", () => {
      const req = {
        body: {
          device_name: null,
        },
        headers: {},
      };

      const result = getDeviceName(req);
      expect(result).toBe("");
    });
  });

  describe("getDeviceId", () => {
    let uuidSpy;

    beforeEach(() => {
      uuidSpy = jest
        .spyOn(globalThis.crypto, "randomUUID")
        .mockReturnValue("mock-uuid-123");
    });

    afterEach(() => {
      uuidSpy.mockRestore();
    });

    test("should return trimmed device_id from body first", () => {
      const req = {
        body: {
          device_id: "  body-id  ",
        },
        headers: {
          "x-device-id": "header-id",
        },
      };

      const result = getDeviceId(req);
      expect(result).toBe("body-id");
      expect(globalThis.crypto.randomUUID).not.toHaveBeenCalled();
    });

    test("should fallback to x-device-id header", () => {
      const req = {
        body: {},
        headers: {
          "x-device-id": "  x-header-id  ",
        },
      };

      const result = getDeviceId(req);
      expect(result).toBe("x-header-id");
    });

    test("should fallback to device-id header", () => {
      const req = {
        body: {},
        headers: {
          "device-id": "  plain-id  ",
        },
      };

      const result = getDeviceId(req);
      expect(result).toBe("plain-id");
    });

    test("should generate UUID if no device id exists", () => {
      const req = {
        body: {},
        headers: {},
      };

      const result = getDeviceId(req);
      expect(result).toBe("mock-uuid-123");
      expect(globalThis.crypto.randomUUID).toHaveBeenCalled();
    });

    test("should generate UUID if device id is empty string", () => {
      const req = {
        body: {
          device_id: "   ",
        },
        headers: {},
      };

      const result = getDeviceId(req);
      expect(result).toBe("mock-uuid-123");
    });

    test("should generate UUID if device id is null", () => {
      const req = {
        body: {
          device_id: null,
        },
        headers: {},
      };

      const result = getDeviceId(req);
      expect(result).toBe("mock-uuid-123");
    });
  });
});