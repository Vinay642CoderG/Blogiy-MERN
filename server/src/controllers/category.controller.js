import Category from "../models/Category.js";
import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/*
   Create Category
*/
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({ name });

  res.status(201).json(new ApiResponse(201, null, category));
});

/*
   Get All Categories
*/
export const getCategories = asyncHandler(async (req, res) => {
  const { search, sortBy = "name", order = "asc" } = req.query;

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const sort = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const categories = await Category.find(query).sort(sort);

  res.status(200).json(new ApiResponse(200, null, categories));
});

/*
   Get Category By ID
*/
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json(new ApiResponse(200, null, category));
});

/*
   Update Category
*/
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Check if new name already exists (if name is being changed)
  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new ApiError(400, "Category name already exists");
    }
  }

  if (name) category.name = name;

  await category.save();

  res.status(200).json(new ApiResponse(200, null, category));
});

/*
   Delete Category
*/
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Check if category has posts
  const postCount = await Post.countDocuments({ category: id });
  if (postCount > 0) {
    throw new ApiError(
      400,
      `Cannot delete category with ${postCount} posts. Please reassign or delete posts first.`,
    );
  }

  await category.deleteOne();

  res.status(200).json(new ApiResponse(200));
});

/*
   Get Posts By Category
*/
export const getPostsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  // Check if category exists
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const query = {
    category: categoryId,
    status: "published",
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
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

  res.status(200).json(
    new ApiResponse(200, null, {
      category,
      posts,
    }),
  );
});
