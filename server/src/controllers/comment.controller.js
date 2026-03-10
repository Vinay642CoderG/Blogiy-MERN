import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/* 
   Create Comment
*/
export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, parentCommentId } = req.body;

  // Check if post exists and is published
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.status !== "published") {
    throw new ApiError(403, "Cannot comment on unpublished posts");
  }

  // If replying to a comment, verify parent comment exists
  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      throw new ApiError(404, "Parent comment not found");
    }
    if (parentComment.post.toString() !== postId) {
      throw new ApiError(400, "Parent comment does not belong to this post");
    }
  }

  const comment = await Comment.create({
    content,
    post: postId,
    author: req.user.id,
    parentComment: parentCommentId || null,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "author",
    "name email profileImage",
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

  // Only get top-level comments (no parent)
  const query = {
    post: postId,
    parentComment: null,
  };

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    populate: { path: "author", select: "name email profileImage" },
  };

  const comments = await Comment.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, comments));
});

/* 
   Get Replies for a Comment
*/
export const getCommentReplies = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "asc",
  } = req.query;

  // Check if parent comment exists
  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    throw new ApiError(404, "Comment not found");
  }

  const query = {
    parentComment: commentId,
  };

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    populate: { path: "author", select: "name email profileImage" },
  };

  const replies = await Comment.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, replies));
});

/* 
   Get Comment by ID
*/
export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id).populate(
    "author",
    "name email profileImage",
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  res.status(200).json(new ApiResponse(200, null, comment));
});

/* 
   Update Comment
*/
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Check if user can update this comment
  if (req.user.role !== "admin" && comment.author.toString() !== req.user.id) {
    throw new ApiError(403, "You don't have permission to update this comment");
  }

  comment.content = content;
  comment.isEdited = true;
  await comment.save();

  const updatedComment = await Comment.findById(comment._id).populate(
    "author",
    "name email profileImage",
  );

  res.status(200).json(new ApiResponse(200, null, updatedComment));
});

/* 
   Delete Comment
*/
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Check if user can delete this comment
  if (req.user.role !== "admin" && comment.author.toString() !== req.user.id) {
    throw new ApiError(403, "You don't have permission to delete this comment");
  }

  // Delete all replies to this comment
  await Comment.deleteMany({ parentComment: id });

  // Delete the comment itself
  await comment.deleteOne();

  res.status(200).json(new ApiResponse(200));
});

/* 
   Get My Comments
*/
export const getMyComments = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = {
    author: req.user.id,
  };

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    populate: [
      { path: "author", select: "name email profileImage" },
      { path: "post", select: "title slug" },
    ],
  };

  const comments = await Comment.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, comments));
});
