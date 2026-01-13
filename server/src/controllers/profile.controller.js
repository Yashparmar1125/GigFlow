import ProfileService from "../services/profile.service.js";

class ProfileController {
  static async getProfile(req, res, next) {
    try {
      const profile = await ProfileService.getOrCreateProfile(req.userId);

      res.status(200).json({
        success: true,
        profile,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const profile = await ProfileService.updateProfile(
        req.userId,
        req.body
      );

      res.status(200).json({
        success: true,
        profile,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ProfileController;
