import { generateAccessToken } from "../../utils/jwt.js";
import { User } from "../../models/auth/user.model.js";
import { stringHelpers } from "../../utils/string.utils.js";
import { AppError } from "../../errors/app.error.js";

class AuthService {
    async register(payload = {}) {
        const email = stringHelpers.normalizeValue(String(payload?.email ?? ""));
        const username = stringHelpers.normalizeValue(String(payload?.username ?? ""));
        const password = String(payload?.password ?? "").trim();

        if (!email) throw new AppError("Email is required", 400);
        if (!username) throw new AppError("Username is required", 400);
        if (!password) throw new AppError("Password is required", 400);

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            throw new AppError("Username or email already exists", 409);
        }

        try {
            const user = await User.create({ username, email, password });
            const token = generateAccessToken(user._id);

            return {
                user: { id: user._id, email: user.email, username: user.username },
                token,
                message: "User registered successfully",
            };
        } catch (error) {
            if (error.name === 'ValidationError') {
                const message = Object.values(error.errors).map(val => val.message).join(', ');
                throw new AppError(message, 400);
            }

            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                throw new AppError(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists (DB constraint)`, 409);
            }

            throw error; 
        }
    }

    async login(payload = {}) {
        try {
            const username = stringHelpers.normalizeValue(String(payload?.username ?? ""));
            const email = stringHelpers.normalizeValue(String(payload?.email ?? ""));
            const password = String(payload?.password ?? "").trim();

            if ((!username && !email) || !password) {
                throw new AppError("Enter either username or email and password", 400);
            }

            const user = await User.findOne({
                $or: [
                    { email: email || undefined },
                    { username: username || undefined }
                ]
            }).select("+password");

            if (!user) {
                throw new AppError("Invalid credentials", 401);
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                throw new AppError("Password didnot match", 401);
            }

            const token = generateAccessToken(user._id);

            return {
                user: { id: user._id, email: user.email, username: user.username },
                token,
                message: "Login successful"
            };
        } catch (error) {
            if (error.name === 'MongooseServerSelectionError') {
                throw new AppError("Authentication service temporarily unavailable", 503);
            }
            throw error;
        }
    }
}

const authService = new AuthService();
export { AuthService };
export default AuthService;