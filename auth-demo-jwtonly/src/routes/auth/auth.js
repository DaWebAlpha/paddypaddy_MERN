import express from 'express';
import { authController } from "../../controllers/auth/user.controller.js";
import {authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/profile', authMiddleware, authController.register);


export { authRouter };
export default authRouter;

