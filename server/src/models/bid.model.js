import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
      index: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "hired", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate bids by same freelancer
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

export default mongoose.model("Bid", bidSchema);
