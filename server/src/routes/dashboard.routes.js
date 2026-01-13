import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/dashboard
router.get("/", authMiddleware, DashboardController.getDashboard);

export default router;
