import { Router } from "express";
import { signup, login } from "../controller/AuthController.js";
import { forgotPassword, resetPassword } from "../controller/ForgotPassword.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
