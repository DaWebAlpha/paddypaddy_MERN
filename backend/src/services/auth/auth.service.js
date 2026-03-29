import crypto from 'crypto';
import userRepository from "../../repositories/user.repository.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../../utils/jwt.js';
import verifyGoogleIdToken from "../../utils/google.verify.js";
import EmailVerificationToken from "../../models/auth/email.verification.model.js";
import RefreshToken from "../../models/auth/refreshToken.model.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";
import { cleanName, formatName } from "../../utils/string.utils.js";
import { BadRequestError } from '../../errors/bad-request.error.js';
import { ConflictError } from "../../errors/conflict.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";


class AuthService {
    async register(payload = {}) {
        const username = formatName(String(payload?.username ?? ""));
        const email = formatName(String(payload?.email ?? "")).toLowerCase();
        const password = String(payload?.password ?? "").trim();
        const ip_address = cleanName(String(payload?.ip_address ?? ""));
        const user_agent = cleanName(String(payload?.user_agent ?? ""));
        const device_id = cleanName(String(payload?.device_id ?? "")) || crypto.randomUUID();
        const device_name = cleanName(String(payload?.device_name ?? ""));

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

        const [emailExists, usernameExists] = await Promise.all([
            userRepository.existsByEmail(email),
            userRepository.existsByUsername(username),
        ]);

        if (emailExists || usernameExists) {
            system_logger.error("Username or email already exists");
            throw new ConflictError("Username or email already exists");
        }

        const user = await userRepository.create({
            username,
            email,
            password,
            auth_provider: 'local',
        });

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user, device_id);
        const token_hash = RefreshToken.hashToken(refreshToken);

        await RefreshToken.updateMany(
            {
                user_id: user._id,
                device_id,
                is_revoked: false,
                is_deleted: false,
            },
            {
                $set: {
                    is_revoked: true,
                    revoked_at: new Date(),
                    revoke_reason: "replaced_by_new_login",
                },
            }
        );

        await RefreshToken.create({
            user_id: user._id,
            token_hash,
            token_version: user.token_version,
            device_id,
            device_name: device_name || null,
            user_agent: user_agent || null,
            ip_address: ip_address || null,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            last_used_at: new Date(),
        });

        audit_logger.info(
            {
                user_id: user._id,
                username: user.username,
                email: user.email,
                device_id,
            },
            "User successfully created"
        );

        return {
            user,
            accessToken,
            refreshToken,
            device_id,
            message: "User created",
        };
    }

    async login(payload = {}) {
        const username = formatName(String(payload?.username ?? ""));
        const email = formatName(String(payload?.email ?? "")).toLowerCase();
        const password = String(payload?.password ?? "").trim();
        const ip_address = cleanName(String(payload?.ip_address ?? ""));
        const user_agent = cleanName(String(payload?.user_agent ?? ""));
        const device_id = cleanName(String(payload?.device_id ?? "")) || crypto.randomUUID();
        const device_name = cleanName(String(payload?.device_name ?? ""));

        if ((!username && !email) || !password) {
            system_logger.error("Username or email and password is required");
            throw new BadRequestError("Username or email and password is required");
        }

        const query = [];
        if (email) query.push({ email });
        if (username) query.push({ username });

        const user = await userRepository.findByEmailOrUsernameWithPassword({
            $or: query
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
        const refreshToken = await generateRefreshToken(user, device_id);
        const token_hash = RefreshToken.hashToken(refreshToken);

        await RefreshToken.updateMany(
            {
                user_id: user._id,
                device_id,
                is_revoked: false,
                is_deleted: false,
            },
            {
                $set: {
                    is_revoked: true,
                    revoked_at: new Date(),
                    revoke_reason: "replaced_by_new_login",
                },
            }
        );

        await RefreshToken.create({
            user_id: user._id,
            token_hash,
            token_version: user.token_version,
            device_id,
            device_name: device_name || null,
            user_agent: user_agent || null,
            ip_address: ip_address || null,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            last_used_at: new Date(),
        });

        audit_logger.info(
            {
                user_id: user._id,
                username: user.username,
                email: user.email,
                device_id,
            },
            "User logged in successfully"
        );

        return {
            user,
            accessToken,
            refreshToken,
            device_id,
            message: "Login successful",
        };
    }

    async loginWithGoogle(payload = {}) {
        const idToken = String(payload?.idToken ?? "").trim();
        const safeDeviceId = cleanName(String(payload?.device_id ?? "")) || crypto.randomUUID();
        const safeDeviceName = cleanName(String(payload?.device_name ?? ""));
        const safeIpAddress = cleanName(String(payload?.ip_address ?? ""));
        const safeUserAgent = cleanName(String(payload?.user_agent ?? ""));

        if (!idToken) {
            system_logger.error("Google token is required");
            throw new BadRequestError("Google token is required");
        }

        const googlePayload = await verifyGoogleIdToken(idToken);

        if (!googlePayload || !googlePayload.email) {
            system_logger.error("Invalid Google token");
            throw new BadRequestError("Invalid Google token");
        }

        const email = formatName(String(googlePayload.email || ''));
        let user = null;

        if (googlePayload.sub) {
            user = await userRepository.findOne({ google_sub: googlePayload.sub });
        }

        if (!user) {
            user = await userRepository.findByEmail(email);
        }

        if (!user) {
            const rawBase = email
                .split('@')[0]
                .replace(/[^a-z0-9._-]/gi, '')
                .toLowerCase();

            const baseUsername = rawBase || `user${Date.now()}`;
            let username = baseUsername;
            let counter = 1;

            while (await userRepository.existsByUsername(username)) {
                username = `${baseUsername}${counter}`;
                counter += 1;
            }

            user = await userRepository.create({
                username,
                email,
                password: null,
                auth_provider: 'google',
                google_sub: googlePayload.sub || null,
                avatar_url: googlePayload.picture || null,
                role: 'user',
                is_email_verified: Boolean(googlePayload.email_verified),
                account_status: googlePayload.email_verified ? 'active' : 'pending',
            });
        } else {
            if (!user.google_sub && googlePayload.sub) {
                user.google_sub = googlePayload.sub;
            }

            if (googlePayload.picture && !user.avatar_url) {
                user.avatar_url = googlePayload.picture;
            }

            if (googlePayload.email_verified && !user.is_email_verified) {
                user.is_email_verified = true;
            }

            if (user.is_email_verified && user.account_status === "pending") {
                user.account_status = "active";
            }
        }

        await user.clearLoginFailures();
        user.last_login_at = new Date();
        await user.save({ validateBeforeSave: false });

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user, safeDeviceId);
        const token_hash = RefreshToken.hashToken(refreshToken);

        await RefreshToken.updateMany(
            {
                user_id: user._id,
                device_id: safeDeviceId,
                is_revoked: false,
                is_deleted: false,
            },
            {
                $set: {
                    is_revoked: true,
                    revoked_at: new Date(),
                    revoke_reason: "replaced_by_new_login",
                },
            }
        );

        await RefreshToken.create({
            user_id: user._id,
            token_hash,
            token_version: user.token_version,
            device_id: safeDeviceId,
            device_name: safeDeviceName || null,
            user_agent: safeUserAgent || null,
            ip_address: safeIpAddress || null,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            last_used_at: new Date(),
        });

        audit_logger.info(
            {
                user_id: user._id,
                username: user.username,
                email: user.email,
                device_id: safeDeviceId,
            },
            "User logged in successfully with Google"
        );

        return {
            user,
            accessToken,
            refreshToken,
            device_id: safeDeviceId,
            message: "Login successful",
        };
    }

    async refreshAccessToken(payload = {}) {
        const refreshToken = String(payload?.refreshToken ?? "").trim();

        if (!refreshToken) {
            system_logger.error("Refresh token is required");
            throw new BadRequestError("Refresh token is required");
        }

        const decoded = await verifyRefreshToken(refreshToken);

        if (!decoded?.sub || !decoded?.device_id) {
            system_logger.error("Invalid refresh token");
            throw new BadRequestError("Invalid refresh token");
        }

        const token_hash = RefreshToken.hashToken(refreshToken);

        const tokenDoc = await RefreshToken.findOne({
            token_hash,
            user_id: decoded.sub,
            device_id: decoded.device_id,
            is_revoked: false,
            is_deleted: false,
        });

        if (!tokenDoc) {
            system_logger.error("Refresh token not found or revoked");
            throw new BadRequestError("Refresh token not found or revoked");
        }

        if (tokenDoc.expires_at.getTime() <= Date.now()) {
            tokenDoc.is_revoked = true;
            tokenDoc.revoked_at = new Date();
            tokenDoc.revoke_reason = "expired";
            await tokenDoc.save({ validateBeforeSave: false });

            system_logger.error("Refresh token expired");
            throw new BadRequestError("Refresh token expired");
        }

        const user = await userRepository.findById(decoded.sub);

        if (!user) {
            system_logger.error("User not found");
            throw new NotFoundError("User not found");
        }

        if (tokenDoc.token_version !== Number(user.token_version || 0)) {
            tokenDoc.is_revoked = true;
            tokenDoc.revoked_at = new Date();
            tokenDoc.revoke_reason = "token_version_mismatch";
            await tokenDoc.save({ validateBeforeSave: false });

            system_logger.error("Refresh token is no longer valid");
            throw new BadRequestError("Refresh token is no longer valid");
        }

        if (Number(decoded.token_version || 0) !== Number(user.token_version || 0)) {
            tokenDoc.is_revoked = true;
            tokenDoc.revoked_at = new Date();
            tokenDoc.revoke_reason = "jwt_token_version_mismatch";
            await tokenDoc.save({ validateBeforeSave: false });

            system_logger.error("Refresh token payload is no longer valid");
            throw new BadRequestError("Refresh token payload is no longer valid");
        }

        if (user.account_banned || user.is_temporarily_banned) {
            system_logger.error("Account is suspended");
            throw new BadRequestError("Account is suspended");
        }

        const newAccessToken = await generateAccessToken(user);
        const newRefreshToken = await generateRefreshToken(user, decoded.device_id);
        const newTokenHash = RefreshToken.hashToken(newRefreshToken);

        tokenDoc.token_hash = newTokenHash;
        tokenDoc.token_version = Number(user.token_version || 0);
        tokenDoc.last_used_at = new Date();
        tokenDoc.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await tokenDoc.save({ validateBeforeSave: false });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            device_id: decoded.device_id,
            message: "Token refreshed successfully",
        };
    }

    async logout(payload = {}) {
        const refreshToken = String(payload?.refreshToken ?? "").trim();

        if (!refreshToken) {
            system_logger.error("Refresh token is required");
            throw new BadRequestError("Refresh token is required");
        }

        const token_hash = RefreshToken.hashToken(refreshToken);

        const tokenDoc = await RefreshToken.findOne({
            token_hash,
            is_revoked: false,
            is_deleted: false,
        });

        if (!tokenDoc) {
            return { message: "Logged out successfully" };
        }

        tokenDoc.is_revoked = true;
        tokenDoc.revoked_at = new Date();
        tokenDoc.revoke_reason = "logout";

        await tokenDoc.save({ validateBeforeSave: false });

        audit_logger.info(
            {
                user_id: tokenDoc.user_id,
                device_id: tokenDoc.device_id,
            },
            "User logged out from current device successfully"
        );

        return {
            message: "Logged out successfully",
        };
    }

    async logoutFromAllDevices(userId) {
        if (!userId) {
            system_logger.error("User id is required");
            throw new BadRequestError("User id is required");
        }

        await RefreshToken.updateMany(
            {
                user_id: userId,
                is_revoked: false,
                is_deleted: false,
            },
            {
                $set: {
                    is_revoked: true,
                    revoked_at: new Date(),
                    revoke_reason: "logout_all_devices",
                },
            }
        );

        audit_logger.info(
            { user_id: userId },
            "User logged out from all devices successfully"
        );

        return {
            message: "Logged out from all devices successfully",
        };
    }
}

const authService = new AuthService();

export default authService;
export { authService, AuthService };