import userRepository from "../../repositories/user.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} from '../../utils/jwt.js';
import redis from "../../core/redis.js";
import verifyGoogleIdToken from "../../utils/google.verify.js";
import EmailVerificationToken from "../../models/auth/email.verification.model.js";
import RefreshToken from "../../models/auth/refreshToken.model.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";
import { cleanName, formatName } from "../../utils/string.utils.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

class AuthService {
    async register(payload = {}) {
        const username = formatName(String(payload?.username ?? ""));
        const email = cleanName(String(payload?.email ?? "")).toLowerCase();
        const password = String(payload?.password ?? "").trim();

        if (!username) {
            system_logger.error("Username is required");
            throw new BadRequestError("Username is required");
        }

        if (!email) {
            system_logger.error("Email is required");
            throw new BadRequestError("Email is required");
        }

        if (!password) {
            system_logger.error("Password is required");
            throw new BadRequestError("Password is required");
        }

        const userExists = await userRepository.existsByEmail(email);
        if (userExists) {
            system_logger.error("Username or email already exists");
            throw new ConflictError("Username or email already exists");
        }

        const usernameExists = await userRepository.existsByUsername(username);
        if (usernameExists) {
            system_logger.error("Username or email already exists");
            throw new ConflictError("Username or email already exists");
        }

        const user = await userRepository.create({
            username,
            email,
            password,
        });

        audit_logger.info(
            {
                user_id: user._id,
                username: user.username,
                email: user.email,
            },
            "User successfully created"
        );

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        return {
            user,
            accessToken,
            refreshToken,
            message: "User created",
        };
    }

    async login(payload = {}) {
        const username = formatName(String(payload?.username ?? ""));
        const email = cleanName(String(payload?.email ?? "")).toLowerCase();
        const password = String(payload?.password ?? "").trim();
        const ip_address = cleanName(String(payload?.ip_address ?? ""));
        const user_agent = cleanName(String(payload?.user_agent ?? ""));

        if ((!username && !email) || !password) {
            system_logger.error("Username or email and password is required");
            throw new BadRequestError("Username or email and password is required");
        }

        const user = await userRepository.findByEmailOrUsernameWithPassword({
            $or: [
                { email },
                { username }
            ]
        });

        if (!user) {
            system_logger.error("Invalid credentials");
            throw new BadRequestError("Invalid credentials");
        }

        if (user.account_banned || user.is_temporarily_banned) {
            audit_logger.error(
                {
                    user_id: user._id,
                    username: user.username,
                    email: user.email,
                },
                "Account is suspended"
            );
            throw new BadRequestError("Account is suspended");
        }

        if (user.is_locked) {
            audit_logger.error(
                {
                    user_id: user._id,
                    username: user.username,
                    email: user.email,
                },
                "Account is temporarily locked due to failed login"
            );
            throw new BadRequestError("Account is temporarily locked due to failed login");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            await user.recordFailedLogin({
                ip_address,
                user_agent,
                reason: "Invalid password",
            });

            system_logger.error("Invalid credentials");
            throw new BadRequestError("Invalid credentials");
        }

        await user.clearLoginFailures();
        user.last_login_at = new Date();

        if (user.is_email_verified && user.account_status === "pending") {
            user.account_status = "active";
        }

        await user.save({ validateBeforeSave: false });

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        await redis.set(
            `refresh_token:${user.id}`,
            refreshToken,
            "EX",
            60 * 60 * 24 * 7
        );

        audit_logger.info(
            {
                user_id: user._id,
                username: user.username,
                email: user.email,
            },
            "User logged in successfully"
        );

        return {
            user,
            accessToken,
            refreshToken,
            message: "Login successful",
        };
    }
}

const authService = new AuthService();

export default authService;
export { authService, AuthService };