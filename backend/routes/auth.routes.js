import { Router } from "express";
import authController from "../controllers/auth.controllers.js";

const authRouter = new Router();

authRouter.post('/register', authController.register);


export default authRouter;