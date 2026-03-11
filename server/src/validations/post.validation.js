import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  excerpt: Joi.string().max(300).optional(),
  tags: Joi.string().optional(),
  category: Joi.string().optional(),
  status: Joi.string().valid("draft", "published", "archived").optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(10).optional(),
  excerpt: Joi.string().max(300).optional(),
  tags: Joi.string().optional(),
  category: Joi.string().optional(),
  status: Joi.string().valid("draft", "published", "archived").optional(),
});

export const generateContentSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 200 characters",
    "any.required": "Title is required",
  }),
});
