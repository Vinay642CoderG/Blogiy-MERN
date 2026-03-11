import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

// GET /api/dashboard/stats
router.get("/stats", getDashboardStats);

export default router;
