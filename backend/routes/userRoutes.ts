import express from "express";
import { getProfile, updateProfile } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// User profile routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
