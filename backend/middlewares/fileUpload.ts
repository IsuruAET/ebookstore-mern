import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import { Request } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Check if all required Cloudinary config values are present
const missingConfig = Object.entries(cloudinaryConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingConfig.length > 0) {
  console.error("Missing Cloudinary configuration:", missingConfig);
  throw new Error(
    "Cloudinary configuration is incomplete. Please check your .env file."
  );
}

cloudinary.v2.config(cloudinaryConfig);

// Define types for file upload
interface FileUpload {
  fieldname: string;
  mimetype: string;
}

// Configure storage for different file types
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "ebookstore",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    resource_type: "auto",
  } as Record<string, any>,
});

// File filter to accept only specific file types
const fileFilter = (
  _req: Request,
  file: FileUpload,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === "coverImage") {
    // Accept only image files for cover
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for cover!"));
    }
  } else if (file.fieldname === "fileUrl") {
    // Accept only PDF and Word documents
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Word documents are allowed!"));
    }
  } else {
    cb(new Error("Unexpected field!"));
  }
};

// Configure multer upload
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
