import fs from "fs/promises";
import path from "path";

/**
 * Delete a file from the uploads directory
 * @param {string} filename - Name of the file to delete
 * @returns {Promise<void>}
 * @throws {Error} If file deletion fails (except for file not found)
 */
export const deleteFile = async (filename) => {
  if (!filename) return;

  try {
    const filePath = path.join(process.cwd(), "uploads", filename);
    await fs.unlink(filePath);
  } catch (error) {
    // Only throw error if it's not a "file not found" error
    if (error.code !== "ENOENT") {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
};

/**
 * Check if file exists
 * @param {string} filename - Name of the file to check
 * @returns {Promise<boolean>}
 * @throws {Error} If file access check fails (except for file not found)
 */
export const fileExists = async (filename) => {
  if (!filename) return false;

  try {
    const filePath = path.join(process.cwd(), "uploads", filename);
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw new Error(`Failed to check file existence: ${error.message}`);
  }
};

/**
 * Get file path
 * @param {string} filename - Name of the file
 * @returns {string} Full file path
 */
export const getFilePath = (filename) => {
  return path.join(process.cwd(), "uploads", filename);
};
