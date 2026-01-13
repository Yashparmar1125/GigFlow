import BidService from "../services/bid.service.js";

class BidController {
  static async createBid(req, res, next) {
    try {
      const gigId = req.params.gigId || req.params.id;
      const bid = await BidService.createBid({
        gigId: gigId,
        freelancerId: req.userId,
        price: req.body.price,
        message: req.body.message,
      });

      const bidObj = bid.toObject();
      res.status(201).json({
        success: true,
        bid: {
          ...bidObj,
          freelancer: bidObj.freelancerId,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async listBidsForGig(req, res, next) {
    try {
      const gigId = req.params.gigId || req.params.id;
      const bids = await BidService.getBidsForGig(gigId);

      res.status(200).json({
        success: true,
        bids,
      });
    } catch (err) {
      next(err);
    }
  }

  static async listMyBids(req, res, next) {
    try {
      const bids = await BidService.getMyBids(req.userId);

      res.status(200).json({
        success: true,
        bids,
      });
    } catch (err) {
      next(err);
    }
  }

  static async hireBid(req, res, next) {
    try {
      const bid = await BidService.hireBid(req.params.id, req.userId);
      
      const bidObj = bid.toObject();
      res.status(200).json({
        success: true,
        message: "Freelancer hired successfully",
        bid: {
          ...bidObj,
          freelancer: bidObj.freelancerId,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default BidController;
