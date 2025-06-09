import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
  userA: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  status: { type: String, enum: ["pending", "accepted", "blocked"], required: true },
  createdAt: { type: Date, default: Date.now },
});

ConnectionSchema.index({ userA: 1, userB: 1 }, { unique: true });
ConnectionSchema.index({ status: 1 });

export default mongoose.models.Connection || mongoose.model("Connection", ConnectionSchema); 