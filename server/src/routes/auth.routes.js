import express from "express";

import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { loginUserSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/login", validate(loginUserSchema), loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;
