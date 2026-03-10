import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../utils/ApiError.js";
import env from "./env.js";

// Base upload directory
const UPLOAD_PATH = path.join(process.cwd(), "uploads");

// Allowed file types
const ALLOWED_FILE_TYPES = /jpeg|jpg|png|gif|webp/;

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    // Generate UUID filename + original extension
    const ext = path.extname(file.originalname);
    const uniqueName = uuidv4() + ext;
    cb(null, uniqueName);
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check file extension and mimetype
  const isValidExt = ALLOWED_FILE_TYPES.test(ext.substring(1));
  const isValidMime = ALLOWED_FILE_TYPES.test(mimetype.split("/")[1]);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP are allowed",
      ),
      false,
    );
  }
};

// Multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// Multer error handler middleware
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
};

export const buildUploadUrl = (filename) => {
  // Here you can set the host dynamically (production/dev)
  // You can also read from environment variable if needed
  const HOST = env.APP_HOST || "http://localhost:5000";
  return `${HOST}/uploads/${filename}`;
};
