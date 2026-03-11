import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getPostsByCategory,
} from "../controllers/category.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public Routes */
// Get all categories
router.get("/", getCategories);

// Get posts by category
router.get("/:categoryId/posts", getPostsByCategory);

// Get category by ID
router.get("/:id", getCategoryById);

/* Admin Only Routes */
// Create category
router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate(createCategorySchema),
  createCategory,
);

// Update category
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  validate(updateCategorySchema),
  updateCategory,
);

// Delete category
router.delete("/:id", protect, restrictTo("admin"), deleteCategory);

export default router;
