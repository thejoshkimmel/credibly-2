import { UserProfile, Rating, RATING_CATEGORIES, RATING_TAGS } from '@/types/user';
import { RatingsService } from '../ratings';

export class User {
  private id: string;
  private name: string;
  private email: string;
  private role: 'admin' | 'user' | 'moderator';
  private avatar?: string;
  private bio?: string;
  private createdAt: string;
  private static userIdCounter = 1;

  constructor(
    name: string,
    email: string,
    role: 'admin' | 'user' | 'moderator',
    avatar?: string,
    bio?: string
  ) {
    this.validateInput(name, email, role);
    this.id = `u${User.userIdCounter++}`;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.bio = bio;
    this.createdAt = new Date().toISOString();
  }

  private validateInput(name: string, email: string, role: 'admin' | 'user' | 'moderator'): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Valid email is required');
    }
    if (!['admin', 'user', 'moderator'].includes(role)) {
      throw new Error('Invalid role');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public addRating(
    reviewerId: string,
    score: number,
    comment: string,
    category: keyof typeof RATING_CATEGORIES,
    tags: (keyof typeof RATING_TAGS)[]
  ): Rating {
    if (score < 1 || score > 5) {
      throw new Error('Rating score must be between 1 and 5');
    }
    if (!comment || comment.trim().length === 0) {
      throw new Error('Rating comment is required');
    }
    if (!category || !RATING_CATEGORIES[category]) {
      throw new Error('Valid rating category is required');
    }
    if (!tags || tags.length === 0) {
      throw new Error('At least one rating tag is required');
    }

    const rating = RatingsService.addRating({
      id: `r${Date.now()}`,
      reviewerId,
      reviewedId: this.id,
      score,
      comment,
      category: RATING_CATEGORIES[category],
      tags: tags.map(tag => RATING_TAGS[tag]),
      createdAt: new Date().toISOString()
    });

    return rating;
  }

  public getProfile(): UserProfile {
    const receivedRatings = RatingsService.getRatingsByUser(this.id);
    const givenRatings = RatingsService.getRatingsByReviewer(this.id);

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      bio: this.bio,
      stats: {
        totalRatings: receivedRatings.length,
        averageRating: this.calculateAverageRating(receivedRatings),
        totalReviews: givenRatings.length,
        followers: this.calculateFollowers(),
      },
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString(),
    };
  }

  private calculateAverageRating(ratings: Rating[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return Number((sum / ratings.length).toFixed(1));
  }

  private calculateFollowers(): number {
    // This could be replaced with actual follower calculation logic
    return Math.floor(Math.random() * 300);
  }

  public update(updates: Partial<{
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    avatar: string;
    bio: string;
  }>): void {
    if (updates.name) {
      if (updates.name.trim().length === 0) {
        throw new Error('Name cannot be empty');
      }
      this.name = updates.name;
    }
    if (updates.email) {
      if (!this.isValidEmail(updates.email)) {
        throw new Error('Invalid email format');
      }
      this.email = updates.email;
    }
    if (updates.role) {
      if (!['admin', 'user', 'moderator'].includes(updates.role)) {
        throw new Error('Invalid role');
      }
      this.role = updates.role;
    }
    if (updates.avatar !== undefined) {
      this.avatar = updates.avatar;
    }
    if (updates.bio !== undefined) {
      this.bio = updates.bio;
    }
  }

  public toJSON(): UserProfile {
    return this.getProfile();
  }
} 