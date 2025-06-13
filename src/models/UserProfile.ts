import mongoose from 'mongoose';
import { Rating } from '@/types';

const ratingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  ratedBy: { type: String, required: true },
  ratedAt: { type: Date, default: Date.now }
});

const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
  bio: { type: String },
  ratings: [ratingSchema],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamps on save
userProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate average rating before saving
userProfileSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = sum / this.ratings.length;
    this.totalRatings = this.ratings.length;
  }
  next();
});

const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

export default UserProfile; 