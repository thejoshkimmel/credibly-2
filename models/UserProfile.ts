import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userType: { type: String, enum: ["company", "employee"], required: true },
  companyName: { type: String },
  displayName: { type: String },
  bio: { type: String },
  location: { type: String },
  profilePicture: { type: String },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "suspended", "banned"], default: "active" },
  suspensionReason: { type: String },
  suspensionExpires: { type: Date },
});

// Indexes for better query performance
UserProfileSchema.index({ userType: 1 });
UserProfileSchema.index({ companyName: 1 });
UserProfileSchema.index({ location: 1 });
UserProfileSchema.index({ verified: 1 });
UserProfileSchema.index({ status: 1, role: 1 });

// Virtual for full name
UserProfileSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to check if user is verified
UserProfileSchema.methods.isVerified = function() {
  return this.verified;
};

// Method to check if user is active
UserProfileSchema.methods.isActive = function() {
  return this.status === 'active';
};

// Method to check if user is admin
UserProfileSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

export default mongoose.models.UserProfile || mongoose.model("UserProfile", UserProfileSchema); 