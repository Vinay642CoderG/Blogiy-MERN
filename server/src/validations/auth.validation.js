import Joi from "joi";

// Base schema for login
const baseUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

export const loginUserSchema = baseUserSchema;
