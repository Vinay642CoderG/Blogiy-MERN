import express from "express";

import {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateOwnProfile,
  getOwnProfile,
} from "../controllers/user.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
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

// user auth and role based restriction
router.use(protect, restrictTo("admin"));

/* Create User */
router.post(
  "/",
  upload.single("profileImage"),
  handleMulterError,
  validate(createUserSchema),
  createUser,
);

/* Get All Users*/
router.get("/", getUsers);

/* Get User By ID */
router.get("/:id", getUserById);

/* Update User By ID */
router.put(
  "/:id",
  upload.single("profileImage"),
  handleMulterError,
  validate(updateUserSchema),
  updateUser,
);

/* Delete User By ID */
router.delete("/:id", deleteUser);

export default router;
