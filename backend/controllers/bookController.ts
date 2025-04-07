import { Request, Response } from "express";
import { Book, IBook } from "../models/Book";
import { upload } from "../middlewares/fileUpload";
import { FilterQuery } from "mongoose";
import { IUser } from "../models/User";

interface BookQuery {
  category?: string;
  author?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

interface UserRequest extends Request {
  user?: IUser;
}

// Get all books with optional filtering
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { category, author, minPrice, maxPrice } = req.query;
    const query: FilterQuery<BookQuery> = {};

    if (category) query.category = category as string;
    if (author) query.author = author as string;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const books = await Book.find(query).populate("seller", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "seller",
      "name email"
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error });
  }
};

// Create a new book with file uploads
export const createBook = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = req.user;

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create books" });
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files || !files["coverImage"] || !files["fileUrl"]) {
      return res.status(400).json({
        message: "Both cover image and book file are required",
        receivedFiles: files ? Object.keys(files) : [],
      });
    }

    // Create the book with the uploaded files
    const book = new Book({
      ...req.body,
      seller: user._id,
      coverImage: files["coverImage"][0].path,
      fileUrl: files["fileUrl"][0].path,
    });

    await book.save();
    return res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Error creating book", error });
  }
};

// Update a book with file uploads
export const updateBook = async (req: UserRequest, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if user is the seller or admin
    if (
      req.user.role !== "admin" &&
      book.seller.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this book" });
    }

    return new Promise((_resolve, _reject) => {
      // Handle file uploads
      upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "fileUrl", maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File upload error", error: err.message });
        }

        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        const updateData: Partial<IBook> = { ...req.body };

        if (files?.["coverImage"]?.[0]?.path) {
          updateData.coverImage = files["coverImage"][0].path;
        }
        if (files?.["fileUrl"]?.[0]?.path) {
          updateData.fileUrl = files["fileUrl"][0].path;
        }

        try {
          const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
          );
          return res.json(updatedBook);
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error updating book", error });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error });
  }
};

// Delete a book
export const deleteBook = async (req: UserRequest, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if user is the seller or admin
    if (
      req.user.role !== "admin" &&
      book.seller.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this book" });
    }

    await Book.findByIdAndDelete(req.params.id);
    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error });
  }
};

// Get books by seller
export const getBooksBySeller = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({ seller: req.params.sellerId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller books", error });
  }
};

// Get PDF URL for a book
export const getBookPdfUrl = async (req: UserRequest, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Check if user is the seller, admin, or has purchased the book
    if (
      req.user.role !== "admin" &&
      book.seller.toString() !== req.user._id.toString() &&
      !book.purchasedBy?.includes(req.user._id)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this book" });
    }

    return res.json({ pdfUrl: book.fileUrl });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching PDF URL", error });
  }
};
