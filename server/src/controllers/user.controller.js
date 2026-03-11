import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { deleteFile } from "../utils/fileHelper.js";

/**
 * Get Own Profile (Authenticated user)
 */
export const getOwnProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, null, user));
});

/**
 * Update Own Profile (Authenticated user)
 */
export const updateOwnProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update password if provided
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }
    user.email = email;
  }

  // Update fields
  if (name) user.name = name;

  // Update profile image if uploaded
  if (req.file) {
    // Delete old image if exists
    if (user.profileImage) {
      try {
        await deleteFile(user.profileImage);
      } catch (error) {
        console.error("Error deleting old profile image:", error.message);
      }
    }
    user.profileImage = req.file.filename;
  }

  await user.save();

  // Return user without password
  const updatedUser = await User.findById(user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", updatedUser));
});
