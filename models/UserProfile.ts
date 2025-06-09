import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  displayName: { type: String },
  bio: { type: String },
  location: { type: String },
  profilePicture: { type: String },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "suspended", "banned"], default: "active" },
  suspensionReason: { type: String },
  suspensionExpires: { type: Date },
});

UserProfileSchema.index({ location: 1 });
UserProfileSchema.index({ verified: 1 });
UserProfileSchema.index({ status: 1, role: 1 });

export default mongoose.models.UserProfile || mongoose.model("UserProfile", UserProfileSchema); 