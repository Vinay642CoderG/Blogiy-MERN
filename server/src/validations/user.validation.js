import Joi from "joi";

/*
  Create User Validation
*/
export const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("admin", "user").optional(),
  profileImageUrl: Joi.string()
    .uri({ relativeOnly: true })
    .optional()
    .allow(""),
});

/*
  Update User Validation
*/
export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  email: Joi.string().email().trim().optional(),
  password: Joi.string().min(6).max(20).optional(),
  role: Joi.string().valid("admin", "user").optional(),
  profileImageUrl: Joi.string()
    .uri({ relativeOnly: true })
    .optional()
    .allow(""),
});
