import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate JWT Token (access or refresh)
 * @param {Object} payload - The payload to encode in JWT
 * @param {"access"|"refresh"} type - Token type
 */
const generateToken = (payload, type = "access") => {
  const secret =
    type === "access" ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET;

  const expiresIn =
    type === "access" ? env.JWT_ACCESS_EXPIRES : env.JWT_REFRESH_EXPIRES;

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify JWT Token
 * @param {Object} payload - The payload to encode in JWT
 * @param {"access"|"refresh"} type - Token type
 */
const verifyToken = (token, type = "access") => {
  const secret =
    type === "access" ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET;

  return jwt.verify(token, secret);
};

/**
 * Decode JWT without verification
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
};
