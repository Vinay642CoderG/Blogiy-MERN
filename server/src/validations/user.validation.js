import Joi from "joi";

/*
  Update User Profile Validation
*/
export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  email: Joi.string().email().trim().optional(),
  password: Joi.string().min(6).max(20).optional(),
  profileImageUrl: Joi.string()
    .uri({ relativeOnly: true })
    .optional()
    .allow(""),
});
