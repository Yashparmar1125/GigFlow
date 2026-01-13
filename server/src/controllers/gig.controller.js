import GigService from "../services/gig.service.js";

class GigController {
  static async createGig(req, res, next) {
    try {
      const gig = await GigService.createGig(req.userId, req.body);
      await gig.populate("ownerId", "name");
      const gigObj = gig.toObject();
      res.status(201).json({
        success: true,
        gig: {
          ...gigObj,
          createdBy: gigObj.ownerId,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async listGigs(req, res, next) {
    try {
      const filters = {};
      if (req.query.status) {
        filters.status = req.query.status;
      }
      if (req.query.search) {
        filters.search = req.query.search;
      }
      if (req.query.q && !filters.search) {
        filters.search = req.query.q;
      }
      const gigs = await GigService.getAllGigs(filters);
      res.status(200).json({ success: true, gigs });
    } catch (err) {
      next(err);
    }
  }

  static async getGig(req, res, next) {
    try {
      const gig = await GigService.getGigById(req.params.id);
      if (!gig) {
        return res.status(404).json({ success: false, message: "Gig not found" });
      }
      res.status(200).json({ success: true, gig });
    } catch (err) {
      next(err);
    }
  }

  static async getMyGigs(req, res, next) {
    try {
      const gigs = await GigService.getMyGigs(req.userId);
      res.status(200).json({ success: true, gigs });
    } catch (err) {
      next(err);
    }
  }

  static async updateGig(req, res, next) {
    try {
      const updatedGig = await GigService.updateGig(req.params.id, req.userId, req.body);
      res.status(200).json({
        success: true,
        gig: updatedGig,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteGig(req, res, next) {
    try {
      await GigService.deleteGig(req.params.id, req.userId);
      res.status(200).json({ success: true, message: "Gig deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default GigController;
