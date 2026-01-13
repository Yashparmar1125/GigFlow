import { Router } from "express";
import ProfileController from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

// Protected routes
router.get("/", authMiddleware, ProfileController.getProfile);
router.put("/", authMiddleware, ProfileController.updateProfile);

export default router;