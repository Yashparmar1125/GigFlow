import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gigworker.model.js";
import { getIo } from "../sockets/io.js";

class BidService {
  static async createBid({ gigId, freelancerId, price, message }) {
    const gig = await Gig.findById(gigId);

    if (!gig) {
      throw { status: 404, message: "Gig not found" };
    }

    if (gig.ownerId.toString() === freelancerId.toString()) {
      throw { status: 403, message: "You cannot bid on your own gig" };
    }

    if (gig.status !== "open") {
      throw { status: 400, message: "Bidding is closed for this gig" };
    }

    const bid = await Bid.create({
      gigId: gigId,
      freelancerId: freelancerId,
      price,
      message,
      status: "pending",
    });
    
    await bid.populate("freelancerId", "name email");
    return bid;
  }

  static async getBidsForGig(gigId) {
    const bids = await Bid.find({ gigId: gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });
    
    return bids.map((bid) => {
      const bidObj = bid.toObject();
      return {
        ...bidObj,
        freelancer: bidObj.freelancerId,
      };
    });
  }

  static async getMyBids(userId) {
    const bids = await Bid.find({ freelancerId: userId })
      .populate({
        path: "gigId",
        select: "title budget status",
        populate: {
          path: "ownerId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });
    
    return bids.map((bid) => {
      const bidObj = bid.toObject();
      const gig = bidObj.gigId;
      return {
        ...bidObj,
        gig: {
          _id: gig._id,
          title: gig.title,
          budget: gig.budget,
          status: gig.status,
        },
      };
    });
  }

  static async hireBid(bidId, userId) {
    // 1. Find the bid + gig
    const bid = await Bid.findById(bidId)
      .populate("gigId")
      .populate("freelancerId", "name email");
  
    if (!bid) {
      throw { status: 404, message: "Bid not found" };
    }
  
    const gig = bid.gigId;
  
    if (!gig) {
      throw { status: 404, message: "Gig not found" };
    }
  
    // 2. Ownership check
    if (gig.ownerId.toString() !== userId.toString()) {
      throw { status: 403, message: "Only gig owner can hire freelancers" };
    }
  
    // 3. Concurrency guards
    if (gig.status !== "open") {
      throw { status: 400, message: "Gig is already assigned" };
    }
  
    if (bid.status !== "pending") {
      throw { status: 400, message: "Bid is not in pending status" };
    }
  
    // 4. Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { status: "rejected" }
    );
  
    // 5. Hire selected bid
    bid.status = "hired";
    await bid.save();
  
    // 6. Assign gig
    gig.status = "assigned";
    await gig.save();
  
    // 7. Emit socket notification
    const io = getIo();
    if (io) {
      io.to(`user:${bid.freelancerId._id.toString()}`).emit("notification", {
        type: "hire",
        gigId: gig._id,
        gigTitle: gig.title,
        message: `You have been hired for ${gig.title}!`,
      });
    }
  
    return bid;
  }
  
}

export default BidService;
