import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["open", "assigned"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true }
);

// Text search support
gigSchema.index({ title: "text" });

export default mongoose.model("Gig", gigSchema);
