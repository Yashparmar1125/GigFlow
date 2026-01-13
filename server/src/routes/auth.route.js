import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddlewware } from "../middlewares/auth.middleware.js";
import {
  validateRegistration,
  validateLogin,
} from "../validators/auth.validator.js";

const router = Router();

// Public routes
router.post("/register", validateRegistration, AuthController.register);
router.post("/login", validateLogin, AuthController.login);

// Protected routes
router.get("/me", authMiddlewware, AuthController.me);
router.post("/logout", authMiddlewware, AuthController.logout);

export default router;
