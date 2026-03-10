import jwt from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

/**
 * Authenticate Middleware
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies first, then fall back to Authorization header
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized: Token missing");
  }

  try {
    const decoded = jwt.verifyToken(token, "access");

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Unauthorized: Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Unauthorized: Invalid token");
    }

    // Other unexpected errors
    throw new ApiError(401, "Unauthorized");
  }
});

/**
 * Role Based Authorization
 */
export const restrictTo = (...roles) => {
  if (roles.length === 1 && Array.isArray(roles[0])) {
    roles = roles[0];
  }

  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: You don't have permission"));
    }

    next();
  };
};
