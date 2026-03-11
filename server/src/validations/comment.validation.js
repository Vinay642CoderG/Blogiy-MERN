import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
  postId: Joi.string().required(),
  name: Joi.string().min(1).max(100).required(),
});

export const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
  name: Joi.string().min(1).max(100).optional(),
});
