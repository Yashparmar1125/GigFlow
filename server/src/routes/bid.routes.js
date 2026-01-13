import { Router } from "express";
import BidController from "../controllers/bid.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateBidSchema } from "../validators/bid.validator.js";

const router = Router();

router.get("/my-bids", authMiddleware, BidController.listMyBids);

router.post(
  "/:gigId",
  authMiddleware,
  validateBidSchema,
  BidController.createBid
);

router.post("/:id/hire", authMiddleware, BidController.hireBid);

export default router;
