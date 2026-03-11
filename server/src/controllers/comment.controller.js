import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/* 
   Create Comment (Anonymous only)
*/
export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, name } = req.body;

  // Check if post exists and is published
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.status !== "published") {
    throw new ApiError(403, "Cannot comment on unpublished posts");
  }

  // Create comment (anonymous only)
  const commentData = {
    content,
    post: postId,
    name,
  };

  const comment = await Comment.create(commentData);

  const populatedComment = await Comment.findById(comment._id).populate(
    "post",
    "title slug",
  );

  res.status(201).json(new ApiResponse(201, null, populatedComment));
});

/* 
   Get Comments for a Post
*/
export const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const query = {
    post: postId,
  };

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
  };

  const comments = await Comment.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, comments));
});

/* 
   Update Comment (Admin only)
*/
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, name } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Update fields
  comment.content = content;
  comment.isEdited = true;

  // Admin can update name
  if (name) comment.name = name;

  await comment.save();

  const updatedComment = await Comment.findById(comment._id).populate(
    "post",
    "title slug",
  );

  res.status(200).json(new ApiResponse(200, null, updatedComment));
});

/* 
   Delete Comment (Admin only)
*/
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Delete the comment
  await comment.deleteOne();

  res.status(200).json(new ApiResponse(200));
});

/* 
   Get All Comments (Admin Only)
*/
export const getAllComments = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    order = "desc",
    search = "",
    postId = "",
  } = req.query;

  // Build query
  const query = {};

  // Search in content or name
  if (search) {
    query.$or = [
      { content: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by post
  if (postId) {
    query.post = postId;
  }

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    populate: [{ path: "post", select: "title slug" }],
  };

  const comments = await Comment.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, comments));
});
