import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  getPostBySlug,
  getMyPosts,
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
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { upload, handleMulterError } from "#src/config/multer.js";

const router = express.Router();

/* Public Routes */
// Get all published posts (no auth required)
router.get("/", getPosts);

// Get post by slug (public for published posts)
router.get("/slug/:slug", getPostBySlug);

/* Protected Routes - Read Access for All Authenticated Users */
// Get my posts (author's own posts)
router.get("/my-posts", protect, getMyPosts);

// Get post by ID (authenticated users can view)
router.get("/:id", protect, getPostById);

/* Admin Only Routes - Write Access */
// Generate AI content (admin only)
router.post(
  "/generate-content",
  protect,
  restrictTo("admin"),
  validate(generateContentSchema),
  generateContent,
);

// Create post (admin only)
router.post(
  "/",
  protect,
  restrictTo("admin"),
  upload.single("featuredImage"),
  handleMulterError,
  validate(createPostSchema),
  createPost,
);

// Update post (admin only)
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  upload.single("featuredImage"),
  handleMulterError,
  validate(updatePostSchema),
  updatePost,
);

// Delete post (admin only)
router.delete("/:id", protect, restrictTo("admin"), deletePost);

export default router;
