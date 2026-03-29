import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { config } from "../config/config.js";
import { RefreshToken } from "../models/auth/refreshTokens.model.js";

const JWT_SECRET = config.jwt_secret;

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId: String(userId) },
    JWT_SECRET,
    { expiresIn: "5m" }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generateRefreshToken = async ({
  userId,
  userAgent = null,
  ipAddress = null,
  deviceName = "",
  deviceId = "",
}) => {
  const token = randomBytes(32).toString("hex");

  await RefreshToken.create({
    token,
    userId,
    userAgent,
    ipAddress,
    deviceName,
    deviceId,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  return token;
};

export { generateAccessToken, verifyAccessToken, generateRefreshToken };
export default {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
};