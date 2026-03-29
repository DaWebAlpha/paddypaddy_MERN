import express from "express";
import authController from "../../controllers/auth/user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js"; // Your auth middleware

const authRouter = express.Router();

// Public Routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

// authMiddlewareed Routes (Require `authMiddleware` middleware to set req.user)
authRouter.post("/logout", authMiddleware, authController.logout);
authRouter.post("/logout-all", authMiddleware, authController.logoutAll);
authRouter.get("/me", authMiddleware, authController.getProfile);
authRouter.get("/sessions", authMiddleware, authController.getSessions);

export { authRouter }
export default authRouter;