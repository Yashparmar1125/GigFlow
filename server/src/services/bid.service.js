import Bid from "../models/bid.model.js";
import Gig from "../models/gigworker.model.js";

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
    const bid = await Bid.findById(bidId).populate("gigId");
    
    if (!bid) {
      throw { status: 404, message: "Bid not found" };
    }

    const gig = bid.gigId;
    
    if (!gig) {
      throw { status: 404, message: "Gig not found" };
    }
    
    if (gig.ownerId.toString() !== userId.toString()) {
      throw { status: 403, message: "Only gig owner can hire freelancers" };
    }

    if (gig.status !== "open") {
      throw { status: 400, message: "Gig is already assigned" };
    }

    if (bid.status !== "pending") {
      throw { status: 400, message: "Bid is not in pending status" };
    }

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { status: "rejected" }
    );

    bid.status = "hired";
    await bid.save();

    gig.status = "assigned";
    await gig.save();

    await bid.populate("freelancerId", "name email");
    
    return bid;
  }
}

export default BidService;
