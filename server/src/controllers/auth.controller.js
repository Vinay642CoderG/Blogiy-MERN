import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "../utils/jwt.js";
import env from "../config/env.js";

/**
 * Cookie options for secure token storage
 */
const getCookieOptions = (maxAge) => ({
  httpOnly: true, // Prevents XSS attacks
  secure: env.NODE_ENV === "production", // HTTPS only in production
  sameSite: env.NODE_ENV === "production" ? "strict" : "lax", // CSRF protection
  maxAge, // Cookie expiration in milliseconds
});

/**
 * Register a new user
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Build user data
  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  // Create user
  const user = (await User.create(userData)).toJSON();

  res.status(201).json(new ApiResponse(201, null, user));
});

/* 
   Login User
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email = "", password = "" } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const payload = { id: user._id, email: user.email };

  // Generate JWT tokens
  const accessToken = jwt.generateToken(payload, "access");
  const refreshToken = jwt.generateToken(payload, "refresh");

  // Set secure httpOnly cookies
  res.cookie("accessToken", accessToken, getCookieOptions(15 * 60 * 1000)); // 15 minutes
  res.cookie(
    "refreshToken",
    refreshToken,
    getCookieOptions(7 * 24 * 60 * 60 * 1000),
  ); // 7 days

  // Return user data (tokens are in cookies)
  const userData = user.toJSON();

  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: userData,
    }),
  );
});

/* 
   Refresh Access Token
*/
export const refreshToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookie
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  try {
    // Verify refresh token
    const decoded = jwt.verifyToken(refreshToken, "refresh");

    // Generate a new access token using payload from refresh token
    const accessToken = jwt.generateToken(
      {
        id: decoded.id,
        email: decoded.email,
      },
      "access",
    );

    // Set new access token in cookie
    res.cookie("accessToken", accessToken, getCookieOptions(15 * 60 * 1000)); // 15 minutes

    // Return success message
    res
      .status(200)
      .json(new ApiResponse(200, "Access token refreshed successfully"));
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

/* 
   Logout User
*/
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear both access and refresh token cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.status(200).json(new ApiResponse(200, "Logout successful"));
});
