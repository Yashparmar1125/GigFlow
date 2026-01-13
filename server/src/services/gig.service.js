import Gig from "../models/gigworker.model.js";
import Bid from "../models/bid.model.js";

class GigService {
  static async createGig(userId, data) {
    const gig = await Gig.create({
      ownerId: userId,
      ...data,
    });
    await gig.populate("ownerId", "name");
    return gig;
  }

  static async getAllGigs(filters = {}) {
    const query = {};
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.search) {
      // Use text index on title for efficient search
      query.$text = { $search: filters.search };
    }

    const gigs = await Gig.find(query)
      .populate("ownerId", "name")
      .sort({ createdAt: -1 });
    
    const gigsWithBidCount = await Promise.all(
      gigs.map(async (gig) => {
        const bidCount = await Bid.countDocuments({ gigId: gig._id });
        const gigObj = gig.toObject();
        return {
          ...gigObj,
          createdBy: gigObj.ownerId,
          bidCount,
        };
      })
    );
    
    return gigsWithBidCount;
  }

  static async getGigById(id) {
    const gig = await Gig.findById(id).populate("ownerId", "name");
    if (!gig) {
      return null;
    }
    const gigObj = gig.toObject();
    return {
      ...gigObj,
      createdBy: gigObj.ownerId,
    };
  }

  static async getMyGigs(userId) {
    const gigs = await Gig.find({ ownerId: userId })
      .populate("ownerId", "name")
      .sort({ createdAt: -1 });
    
    const gigsWithBidCount = await Promise.all(
      gigs.map(async (gig) => {
        const bidCount = await Bid.countDocuments({ gigId: gig._id });
        const gigObj = gig.toObject();
        return {
          ...gigObj,
          createdBy: gigObj.ownerId,
          bidCount,
        };
      })
    );
    
    return gigsWithBidCount;
  }

  static async updateGig(id, userId, data) {
    const gig = await Gig.findOne({ _id: id, ownerId: userId });
    if (!gig) {
      throw { status: 404, message: "Gig not found or unauthorized" };
    }

    gig.title = data.title ?? gig.title;
    gig.description = data.description ?? gig.description;
    if (data.budget !== undefined) {
      gig.budget = data.budget;
    }

    await gig.save();
    await gig.populate("ownerId", "name");
    const gigObj = gig.toObject();

    return {
      ...gigObj,
      createdBy: gigObj.ownerId,
    };
  }

  static async deleteGig(id, userId) {
    const gig = await Gig.findOne({ _id: id, ownerId: userId });
    if (!gig) {
      throw { status: 404, message: "Gig not found or unauthorized" };
    }
    await gig.deleteOne();
  }
}

export default GigService;
