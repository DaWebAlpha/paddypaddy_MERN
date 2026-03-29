import { verifyAccessToken } from "../utils/jwt.js";
import { User } from "../models/auth/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        // Check for Bearer token
        if (req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1]; 
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        // Verify the token (sync)
        const decoded = verifyAccessToken(token);

        // Password is now hidden by default due to select: false in schema
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized - User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        const message = error.name === "TokenExpiredError" ? 'Token expired' : 
                        error.name === "JsonWebTokenError" ? 'Invalid Token' : 
                        "Server error during authentication";
        
        const status = (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") ? 401 : 500;

        return res.status(status).json({
            success: false,
            message
        });
    }
};

export { authMiddleware };
export default authMiddleware;
