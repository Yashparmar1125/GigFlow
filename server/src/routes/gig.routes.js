import { Router } from "express";
import GigController from "../controllers/gig.controller.js";
import BidController from "../controllers/bid.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateGigSchema } from "../validators/gig.validator.js";
import { validateBidSchema } from "../validators/bid.validator.js";

const router = Router();

router.get("/my-gigs", authMiddleware, GigController.getMyGigs);

router.get("/", GigController.listGigs);
router.get("/:id", GigController.getGig);
router.get("/:id/bids", BidController.listBidsForGig);
router.post("/:id/bids", authMiddleware, validateBidSchema, BidController.createBid);

router.post(
  "/",
  authMiddleware,
  validateGigSchema,
  GigController.createGig
);

router.put(
  "/:id",
  authMiddleware,
  validateGigSchema,
  GigController.updateGig
);

router.delete("/:id", authMiddleware, GigController.deleteGig);

export default router;
