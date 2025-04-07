import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Protected route
router.put("/update-password", protect, updatePassword);

export default router;
