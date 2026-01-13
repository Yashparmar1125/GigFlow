import Profile from "../models/profile.model.js";
import Gig from "../models/gigworker.model.js";
import Bid from "../models/bid.model.js";

class DashboardService {
  static async getDashboardData(userId) {
    const [profile, gigCount, bidCount] = await Promise.all([
      Profile.findOne({ user: userId }),
      Gig.countDocuments({ ownerId: userId }),
      Bid.countDocuments({ freelancerId: userId }),
    ]);

    return {
      profile,
      stats: {
        gigsPosted: gigCount,
        bidsPlaced: bidCount,
      },
    };
  }
}

export default DashboardService;
