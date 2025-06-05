import { Router } from "express";
import authController from "../controllers/auth.controllers.js";

const authRouter = new Router();

authRouter.post('/register', authController.register);

authRouter.post('/verify-email', authController.verify);

authRouter.post('/resend-verification-email', authController.resendVerificationEmail);

authRouter.post('/login', authController.login);

export default authRouter;