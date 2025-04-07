import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksBySeller,
  getBookPdfUrl,
} from "../controllers/bookController";
import { upload } from "../middlewares/fileUpload";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "fileUrl", maxCount: 1 },
  ]),
  createBook
);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "fileUrl", maxCount: 1 },
  ]),
  updateBook
);

router.delete("/:id", protect, deleteBook);
router.get("/seller/:sellerId", protect, getBooksBySeller);
router.get("/:id/pdf", protect, getBookPdfUrl);

export default router;
