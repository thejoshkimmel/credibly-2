import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  type: { 
    type: String, 
    enum: ["inappropriate_content", "harassment", "spam", "fake_profile", "other"],
    required: true 
  },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "reviewing", "resolved", "dismissed"],
    default: "pending"
  },
  adminNotes: { type: String },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
});

// Update the updatedAt timestamp before saving
ReportSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

ReportSchema.index({ reportedUserId: 1 });
ReportSchema.index({ status: 1 });
ReportSchema.index({ createdAt: -1 });
ReportSchema.index({ reporterId: 1 });

export default mongoose.models.Report || mongoose.model("Report", ReportSchema); 