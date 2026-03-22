import dotenv from "dotenv";


const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const {
  PORT,
  MONGO_URI,
  NODE_ENV,
  LOG_LEVEL,
  REDIS_URI,
  MAX_FAILED_ATTEMPTS,
  LOCK_DURATION,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
} = process.env;

const requiredEnvs = {
  MONGO_URI,
  REDIS_URI,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
};

for (const [key, value] of Object.entries(requiredEnvs)) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Environment variable ${key} is missing`);
  }
}

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
  port: toNumber(PORT, 5000),
  mongo_uri: MONGO_URI,
  node_env: NODE_ENV || "development",
  log_level: LOG_LEVEL || "info",
  redis_uri: REDIS_URI,

  max_failed_attempts: toNumber(MAX_FAILED_ATTEMPTS, 5),
  lock_duration: toNumber(LOCK_DURATION, 15 * 60 * 1000),

  jwt_access_secret: JWT_ACCESS_SECRET,
  jwt_refresh_secret: JWT_REFRESH_SECRET,
  jwt_access_expires_in: JWT_ACCESS_EXPIRES_IN || "15m",
  jwt_refresh_expires_in: JWT_REFRESH_EXPIRES_IN || "7d",

  google_client_id: GOOGLE_CLIENT_ID,
  google_client_secret: GOOGLE_CLIENT_SECRET,
  google_callback_url: GOOGLE_CALLBACK_URL,

  cloudinary_cloud_name: CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: CLOUDINARY_API_KEY,
  cloudinary_api_secret: CLOUDINARY_API_SECRET,

  mail_host: MAIL_HOST,
  mail_port: toNumber(MAIL_PORT, 587),
  mail_secure: MAIL_SECURE === "true",
  mail_user: MAIL_USER,
  mail_pass: MAIL_PASS,
  mail_from: MAIL_FROM,
};

export { config };
export default config;