import User from "../../src/models/User.js";
import bcrypt from "bcrypt";

/**
 * Create a test user in the database
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} Created user
 */
export const createTestUser = async (userData = {}) => {
  const defaultData = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: await bcrypt.hash("Password123!", 10),
    role: "user",
  };

  const user = await User.create({ ...defaultData, ...userData });
  return user;
};

/**
 * Create a test admin user in the database
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} Created admin user
 */
export const createTestAdmin = async (userData = {}) => {
  return createTestUser({ ...userData, role: "admin" });
};

/**
 * Generate authentication tokens for a user
 * @param {Object} app - Express app instance
 * @param {string} email - User email
 * @param {string} password - User password (plain text)
 * @returns {Promise<Object>} Object containing accessToken and refreshToken
 */
export const loginTestUser = async (app, email, password) => {
  const request = (await import("supertest")).default;

  const response = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password });

  const cookies = response.headers["set-cookie"];

  if (!cookies) {
    throw new Error(
      `Login failed for ${email}. Response: ${JSON.stringify(response.body)}`,
    );
  }

  const accessToken = cookies
    .find((cookie) => cookie.startsWith("accessToken="))
    ?.split(";")[0]
    ?.split("=")[1];

  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split(";")[0]
    ?.split("=")[1];

  return { accessToken, refreshToken, user: response.body.data?.user };
};

/**
 * Create multiple test users
 * @param {number} count - Number of users to create
 * @returns {Promise<Array>} Array of created users
 */
export const createMultipleTestUsers = async (count = 5) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const user = await createTestUser({
      name: `Test User ${i + 1}`,
      email: `testuser${i + 1}${Date.now()}@example.com`,
    });
    users.push(user);
  }

  return users;
};
