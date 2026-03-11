import express from "express";

import {
  updateOwnProfile,
  getOwnProfile,
} from "../controllers/user.controller.js";

import validate from "../middleware/validate.middleware.js";

import { updateUserSchema } from "../validations/user.validation.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload, handleMulterError } from "#src/config/multer.js";

const router = express.Router();

/* Get Own Profile - accessible to authenticated users */
router.get("/profile/me", protect, getOwnProfile);

/* Update Own Profile - accessible to authenticated users */
router.put(
  "/profile/me",
  protect,
  upload.single("profileImage"),
  handleMulterError,
  validate(updateUserSchema),
  updateOwnProfile,
);

export default router;
