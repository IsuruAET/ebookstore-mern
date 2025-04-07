import { Request, Response } from "express";
import { User } from "../models/User";
import { Book } from "../models/Book";
import { Transaction } from "../models/Transaction";

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email, role, isActive } = req.body;

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = isActive !== undefined ? isActive : user.isActive;

    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: "User removed" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all books (Admin only)
// @route   GET /api/admin/books
// @access  Private/Admin
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find({}).populate("seller", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete book (Admin only)
// @route   DELETE /api/admin/books/:id
// @access  Private/Admin
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await Book.findByIdAndDelete(req.params.id);
    return res.json({ message: "Book removed" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all transactions (Admin only)
// @route   GET /api/admin/transactions
// @access  Private/Admin
export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({})
      .populate("user", "name email")
      .populate("book", "title price");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get transaction by ID (Admin only)
// @route   GET /api/admin/transactions/:id
// @access  Private/Admin
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("user", "name email")
      .populate("book", "title price");

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
