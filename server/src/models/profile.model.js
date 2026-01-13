import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    bio: {
      type: String,
      maxLength: 500,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      maxLength: 100,
      default: "",
    },

    avatar: {
      type: String, // URL
      default: "",
    },

    hourlyRate: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
