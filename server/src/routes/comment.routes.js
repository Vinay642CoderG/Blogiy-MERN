import express from "express";
import {
  createComment,
  getPostComments,
  getCommentReplies,
  getCommentById,
  updateComment,
  deleteComment,
  getMyComments,
} from "../controllers/comment.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../validations/comment.validation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public Routes */
// Get comments for a post
router.get("/post/:postId", getPostComments);

// Get replies for a comment
router.get("/:commentId/replies", getCommentReplies);

// Get comment by ID
router.get("/:id", getCommentById);

/* Protected Routes */
// Get my comments
router.get("/my/comments", protect, getMyComments);

// Create comment (authenticated users)
router.post("/", protect, validate(createCommentSchema), createComment);

// Update comment (author or admin)
router.put("/:id", protect, validate(updateCommentSchema), updateComment);

// Delete comment (author or admin)
router.delete("/:id", protect, deleteComment);

export default router;
