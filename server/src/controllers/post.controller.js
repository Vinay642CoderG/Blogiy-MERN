import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { deleteFile } from "../utils/fileHelper.js";
import generateAIContent from "../config/gemini.js";

/* 
   Create Post
*/
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, excerpt, tags, status, category } = req.body;

  // Handle featured image if uploaded
  let featuredImage = "";
  if (req.file) {
    featuredImage = req.file.filename;
  }

  const post = await Post.create({
    title,
    content,
    excerpt,
    featuredImage,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    status: status || "draft",
    category,
    author: req.user.id,
  });

  const populatedPost = await Post.findById(post._id)
    .populate("author", "name email")
    .populate("category");

  res.status(201).json(new ApiResponse(201, null, populatedPost));
});

/* 
   Get All Posts
*/
export const getPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    author,
    tags,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = {};

  // Search by title or content
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by status
  if (status) {
    query.status = status;
  } else {
    // Public route - only show published posts
    query.status = "published";
  }

  // Filter by author
  if (author) {
    query.author = author;
  }

  // Filter by tags
  if (tags) {
    query.tags = { $in: tags.split(",").map((tag) => tag.trim()) };
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
    populate: [
      { path: "author", select: "name email profileImage" },
      { path: "category" },
    ],
  };

  const posts = await Post.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, posts));
});

/* 
   Get Post By ID
*/
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("author", "name email profileImage")
    .populate("category");

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Check if user can view this post
  // Admins can view all posts, regular users can only view published posts
  if (post.status !== "published" && req.user.role !== "admin") {
    throw new ApiError(403, "You don't have permission to view this post");
  }

  // Increment views
  post.views += 1;
  await post.save();

  res.status(200).json(new ApiResponse(200, null, post));
});

/* 
   Get Post By Slug
*/
export const getPostBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug }).populate(
    "author",
    "name email profileImage",
  );

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Check if user can view this post
  if (post.status !== "published") {
    if (!req.user) {
      throw new ApiError(403, "This post is not published");
    }
    if (
      req.user.role !== "admin" &&
      post.author._id.toString() !== req.user.id
    ) {
      throw new ApiError(403, "You don't have permission to view this post");
    }
  }

  // Increment views
  post.views += 1;
  await post.save();

  res.status(200).json(new ApiResponse(200, null, post));
});

/* 
   Get My Posts (Author's own posts)
*/
export const getMyPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = { author: req.user.id };

  if (status) {
    query.status = status;
  }

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const options = {
    page: Number(page),
    limit: Number(limit),
    sort,
    populate: { path: "author", select: "name email profileImage" },
  };

  const posts = await Post.paginate(query, options);

  res.status(200).json(new ApiResponse(200, null, posts));
});

/* 
   Update Post
*/
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, tags, status, category } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only admin can update posts (enforced by middleware)
  if (title) post.title = title;
  if (content) post.content = content;
  if (excerpt !== undefined) post.excerpt = excerpt;
  if (status) post.status = status;
  if (tags) post.tags = tags.split(",").map((tag) => tag.trim());
  if (category !== undefined) post.category = category;

  // Update featured image if uploaded
  if (req.file) {
    // Delete old image if exists
    if (post.featuredImage) {
      try {
        await deleteFile(post.featuredImage);
      } catch (error) {
        throw new ApiError(500, error.message);
      }
    }
    post.featuredImage = req.file.filename;
  }

  await post.save();

  const updatedPost = await Post.findById(post._id)
    .populate("author", "name email profileImage")
    .populate("category");

  res.status(200).json(new ApiResponse(200, null, updatedPost));
});

/* 
   Delete Post
*/
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only admin can delete posts (enforced by middleware)
  // Delete featured image if exists
  if (post.featuredImage) {
    try {
      await deleteFile(post.featuredImage);
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }

  await post.deleteOne();

  res.status(200).json(new ApiResponse(200));
});

/* 
   Generate Post Content with AI
*/
export const generateContent = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const prompt = `Generate a blog content for this topic: "${title.trim()}" in simple text format`;

  const content = await generateAIContent(prompt);

  res.status(200).json(
    new ApiResponse(200, null, {
      title: title.trim(),
      content,
    }),
  );
});
