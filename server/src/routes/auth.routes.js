import express from "express";

import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", [validate(registerUserSchema)], registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;
