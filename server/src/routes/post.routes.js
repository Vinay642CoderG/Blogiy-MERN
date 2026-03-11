import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  generateContent,
} from "../controllers/post.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  createPostSchema,
  updatePostSchema,
  generateContentSchema,
} from "../validations/post.validation.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload, handleMulterError } from "#src/config/multer.js";

const router = express.Router();

/* Public Routes */
// Get all published posts (no auth required)
router.get("/", getPosts);

/* Protected Routes - Read Access for All Authenticated Users */
// Get all posts for admin (shows all statuses)
router.get("/admin/all", protect, getPosts);

// Get post by ID (authenticated users can view)
router.get("/:id", protect, getPostById);

/* Admin Only Routes - Write Access */
// Generate AI content (admin only)
router.post(
  "/generate-content",
  protect,
  validate(generateContentSchema),
  generateContent,
);

// Create post (admin only)
// Create post (admin only)
router.post(
  "/",
  protect,
  upload.single("featuredImage"),
  handleMulterError,
  validate(createPostSchema),
  createPost,
);

// Update post (admin only)
router.put(
  "/:id",
  protect,
  upload.single("featuredImage"),
  handleMulterError,
  validate(updatePostSchema),
  updatePost,
);

// Delete post (admin only)
router.delete("/:id", protect, deletePost);

export default router;
