import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  ratedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  raterUserId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  criteria: {
    professionalism: { type: Number, required: true },
    timeliness: { type: Number, required: true },
    communication: { type: Number, required: true },
    overall: { type: Number, required: true },
  },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

RatingSchema.index({ ratedUserId: 1 });
RatingSchema.index({ raterUserId: 1 });
RatingSchema.index({ createdAt: -1 });

export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema); 