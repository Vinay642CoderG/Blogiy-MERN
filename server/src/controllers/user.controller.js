import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { deleteFile } from "../utils/fileHelper.js";

/**
 * Create User (Admin only)
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle profile image if uploaded
  let profileImage = "";
  if (req.file) {
    profileImage = req.file.filename;
  }

  // Build user data
  const userData = {
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    profileImage,
  };

  // Create user
  const user = await User.create(userData);

  res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

/**
 * Get All Users (Admin only)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    role,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = {};

  // Search by name or email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by role
  if (role) {
    query.role = role;
  }

  // Sort logic
  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  // Pagination options
  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
  };

  const users = await User.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, users));
});

/**
 * Get User By ID (Admin only)
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, null, user));
});

/**
 * Update User (Admin only)
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
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
  if (role) user.role = role;

  // Update password if provided
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

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

  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

/**
 * Delete User (Admin only)
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user.id) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  // Delete profile image if exists
  if (user.profileImage) {
    try {
      await deleteFile(user.profileImage);
    } catch (error) {
      console.error("Error deleting profile image:", error.message);
    }
  }

  await user.deleteOne();

  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

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
