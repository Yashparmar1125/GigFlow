import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import gigRoutes from "./gig.routes.js";
import bidRoutes from "./bid.routes.js";
import profileRoutes from "./profile.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/gigs", gigRoutes);
router.use("/bids", bidRoutes);
router.use("/profile", profileRoutes);
router.use("/dashboard", dashboardRoutes);
export default router;
