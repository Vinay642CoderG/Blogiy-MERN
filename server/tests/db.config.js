import mongoose from "mongoose";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

/**
 * Connect to the test database
 */
export const connectTestDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/blogDB_test";

    await mongoose.connect(mongoUri);
    console.log("✓ Test database connected");
  } catch (error) {
    console.error("Test DB connection error:", error.message);
    process.exit(1);
  }
};

/**
 * Clear all collections in the test database
 */
export const clearTestDB = async () => {
  try {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (error) {
    console.error("Error clearing test database:", error.message);
    throw error;
  }
};

/**
 * Disconnect from the test database
 */
export const disconnectTestDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("✓ Test database disconnected");
  } catch (error) {
    console.error("Error disconnecting test database:", error.message);
    throw error;
  }
};
