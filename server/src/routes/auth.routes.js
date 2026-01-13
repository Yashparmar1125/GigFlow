import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validateRegistration,
  validateLogin,
} from "../validators/auth.validator.js";

const router = Router();

// Public routes
router.post("/register", validateRegistration, AuthController.register);
router.post("/login", validateLogin, AuthController.login);

// Protected routes
router.get("/me", authMiddleware, AuthController.me);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;
