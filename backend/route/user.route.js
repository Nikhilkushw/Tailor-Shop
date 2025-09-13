import { Router } from "express";
import {
  signup,
  login,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/AuthController.js";
import { forgotPassword, resetPassword } from "../controller/ForgotPassword.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/", getUsers);      // Get all users
router.post("/", createUser);   // Add new user
router.put("/:id", updateUser); // Update user
router.delete("/:id", deleteUser); // Delete user

export default router;
