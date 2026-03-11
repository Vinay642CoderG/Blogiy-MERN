import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

/**
 * Get dashboard statistics
 * @route GET /api/dashboard/stats
 * @access Private (Admin only)
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    // Get total posts count
    const totalPosts = await Post.countDocuments();

    // Get published posts count
    const publishedPosts = await Post.countDocuments({ status: "published" });

    // Get draft posts count
    const draftPosts = await Post.countDocuments({ status: "draft" });

    // Get total comments count
    const totalComments = await Comment.countDocuments();

    // Get recent posts (last 5)
    const recentPosts = await Post.find()
      .populate("category", "name")
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title excerpt status createdAt featuredImage");

    // Get recent comments (last 5)
    const recentComments = await Comment.find()
      .populate("post", "title")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("content name post createdAt");

    const stats = {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalComments,
      recentPosts,
      recentComments,
    };

    res.status(200).json(new ApiResponse(200, null, stats));
  } catch (error) {
    console.error("Dashboard stats error:", error);
    throw error;
  }
});

export { getDashboardStats };
