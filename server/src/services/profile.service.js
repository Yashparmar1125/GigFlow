import Profile from "../models/profile.model.js";

class ProfileService {
  static async getOrCreateProfile(userId) {
    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      profile = await Profile.create({ user: userId });
    }

    return profile;
  }

  static async updateProfile(userId, data) {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: data },
      { new: true, upsert: true }
    );

    return profile;
  }
}

export default ProfileService;
