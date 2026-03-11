import express from "express";
import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  getAllComments,
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

// Create comment (anonymous users)
router.post("/", validate(createCommentSchema), createComment);

/* Admin Routes */
// Get all comments (admin only)
router.get("/admin/all", protect, getAllComments);

// Update comment (admin only)
router.put("/:id", protect, validate(updateCommentSchema), updateComment);

// Delete comment (admin only)
router.delete("/:id", protect, deleteComment);

export default router;
