import config from "@src/config/config.js";

describe("Configuration Settings", () => {
  describe("Server and Environment", () => {
    test("should have a valid port number", () => {
      expect(typeof config.port).toBe("number");
      expect(config.port).toBeGreaterThan(0);
      expect(config.port).toBe(Number(5000));
    });

    test("should identify the environment as test during testing", () => {
      expect(config.node_env).toBe("test");
    });

    test("should have a valid MongoDB connection string", () => {
      expect(config.mongo_uri).toBeDefined();
      expect(typeof config.mongo_uri).toBe("string");
      expect(config.mongo_uri).toContain("mongodb");
    });
  });

  describe("Authentication and Security", () => {
    test("should have defined JWT secrets", () => {
      expect(config.jwt_access_secret).toBeDefined();
      expect(typeof config.jwt_access_secret).toBe("string");
      expect(config.jwt_access_secret.length).toBeGreaterThan(0);

      expect(config.jwt_refresh_secret).toBeDefined();
      expect(typeof config.jwt_refresh_secret).toBe("string");
      expect(config.jwt_refresh_secret.length).toBeGreaterThan(0);
    });

    test("should have defined JWT expiration durations", () => {
      expect(config.jwt_access_expires_in).toBeDefined();
      expect(config.jwt_refresh_expires_in).toBeDefined();
    });

    test("should limit failed login attempts to a number", () => {
      expect(typeof config.max_failed_attempts).toBe("number");
      expect(config.max_failed_attempts).toBeGreaterThan(0);
    });

    test("should set a numeric account lock duration", () => {
      expect(typeof config.lock_duration).toBe("number");
      expect(config.lock_duration).toBeGreaterThan(0);
    });
  });

  describe("Third-Party Integrations", () => {
    test("should have complete Google OAuth credentials", () => {
      expect(config.google_client_id).toBeDefined();
      expect(config.google_client_secret).toBeDefined();
      expect(config.google_callback_url).toBeDefined();
      expect(typeof config.google_callback_url).toBe("string");
      expect(config.google_callback_url).toMatch(/^http/);
    });

    test("should have complete Cloudinary configurations", () => {
      expect(config.cloudinary_cloud_name).toBeDefined();
      expect(config.cloudinary_api_key).toBeDefined();
      expect(config.cloudinary_api_secret).toBeDefined();
    });
  });

  describe("Email Service Settings", () => {
    test("should have valid SMTP host and port", () => {
      expect(config.mail_host).toBeDefined();
      expect(typeof config.mail_host).toBe("string");
      expect(config.mail_host.length).toBeGreaterThan(0);

      expect(typeof config.mail_port).toBe("number");
      expect(config.mail_port).toBeGreaterThan(0);
    });

    test("should have mail authentication credentials", () => {
      expect(config.mail_user).toBeDefined();
      expect(config.mail_pass).toBeDefined();
      expect(config.mail_from).toBeDefined();
      expect(config.mail_from).toContain("@");
    });

    test("should treat mail_secure as a boolean", () => {
      expect(typeof config.mail_secure).toBe("boolean");
    });
  });
});