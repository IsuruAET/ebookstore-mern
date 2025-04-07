import express from "express";
import {
  createCheckoutSession,
  confirmPayment,
  getUserTransactions,
  getTransactionById,
} from "../controllers/transactionController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Protected routes
router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/confirm-payment", protect, confirmPayment);
router.get("/user-transactions", protect, getUserTransactions);
router.get("/:id", protect, getTransactionById);

// Commented out webhook route - keeping for reference
// router.post("/webhook", handleStripeWebhook);

export default router;
