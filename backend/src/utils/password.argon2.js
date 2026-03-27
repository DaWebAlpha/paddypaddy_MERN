import argon2 from "argon2";
import { system_logger } from "../core/pino.logger.js";
import BadRequestError from "../errors/bad-request.error.js";

const ARGON_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 2,
  hashLength: 32,
};

export const hashPassword = async (password) => {
  if(typeof password !== "string") return null;
  const cleanPassword = password?.trim();

  
  if (!cleanPassword || typeof cleanPassword !== "string") {
    throw new BadRequestError("Invalid password input");
  }
  if (cleanPassword.length < 8) {
    throw new BadRequestError("Password must be at least 8 characters long");
  }

  try {
    return await argon2.hash(cleanPassword, ARGON_CONFIG);
  } catch (error) {
    system_logger.error({ error: error.message }, "Security: Password hashing failed");
    throw new BadRequestError("Internal security error");
  }
};



export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    if (!plainPassword || !hashedPassword) {
      return false;
    }

    return await argon2.verify(hashedPassword, plainPassword.trim());
  } catch (error) {
    system_logger.error({ error: error.message }, "Security: Password verification failed");
    return false;
  }
};

export default {
  hashPassword,
  verifyPassword,
};