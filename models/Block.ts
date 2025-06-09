import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  blockerId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  blockedId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Compound index to ensure unique blocks
BlockSchema.index({ blockerId: 1, blockedId: 1 }, { unique: true });
BlockSchema.index({ blockerId: 1 });

export default mongoose.models.Block || mongoose.model("Block", BlockSchema); 