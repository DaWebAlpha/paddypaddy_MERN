import User from "../../models/auth/user.model.js";
import AuthService from "../../services/auth/user.service.js";
import { autoCatchFn } from "../../utils/autoCatchFn.js";
const authService = new AuthService();

class AuthController {
    register = autoCatchFn(async (req, res) => {
       
        const { user, token, message } = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            user, 
            token,
            message: message || "User registered successfully"
        });
    });

    login = autoCatchFn(async (req, res) => {
        
        const { user, token, message } = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            user, 
            token,
            message: message || "Login successful"
        });
    });

    getProfile = autoCatchFn(async (req, res) =>{
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt
            }
        })
    })
}

const authController = new AuthController();

export default authController;
export { authController };
