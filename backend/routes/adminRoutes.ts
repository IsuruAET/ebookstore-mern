import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllBooks,
  deleteBook,
  getAllTransactions,
  getTransactionById,
} from "../controllers/adminController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

// All routes are protected and require admin access
router.use(protect, admin);

// User management routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Book management routes
router.get("/books", getAllBooks);
router.delete("/books/:id", deleteBook);

// Transaction management routes
router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getTransactionById);

export default router;
