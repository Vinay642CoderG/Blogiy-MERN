import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public Routes */
// Get all categories
router.get("/", getCategories);

/* Admin Only Routes */
// Create category
router.post("/", protect, validate(createCategorySchema), createCategory);

// Update category
router.put("/:id", protect, validate(updateCategorySchema), updateCategory);

// Delete category
router.delete("/:id", protect, deleteCategory);

export default router;
