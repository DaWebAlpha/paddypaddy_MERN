import express from 'express';
import authController from "../../controllers/index.js"
import {
    authMiddleware,
    authMiddleware,
    loginRateLimit,
    registerRateLimit,
    refreshTokenRateLimit,
    googleLoginRateLimit,
    accountTypeMiddleware,
    roleMiddleware,
    handleError,
    notFound,
    onboardingMiddleware,
} from "../../middlewares/index.js";



const authRouter = express.Router();

