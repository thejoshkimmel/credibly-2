import { Rating as RatingType, RATING_CATEGORIES, RATING_TAGS } from '@/types/user';
import { Rating } from './models/Rating';

// Factory function for creating ratings
export function createRating(
  reviewerId: string,
  reviewedId: string,
  score: number,
  comment: string,
  category: keyof typeof RATING_CATEGORIES,
  tags: (keyof typeof RATING_TAGS)[]
): Rating {
  return new Rating(
    reviewerId,
    reviewedId,
    score,
    comment,
    RATING_CATEGORIES[category],
    tags.map(tag => RATING_TAGS[tag])
  );
}

// Helper function for calculating average rating
export function calculateAverageRating(ratings: Rating[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.getScore(), 0);
  return Number((sum / ratings.length).toFixed(1));
}

class RatingsService {
  private ratings: Rating[] = [];

  public addRating(ratingData: {
    reviewerId: string;
    reviewedId: string;
    score: number;
    comment: string;
    category: string;
    tags: string[];
  }): Rating {
    const rating = new Rating(
      ratingData.reviewerId,
      ratingData.reviewedId,
      ratingData.score,
      ratingData.comment,
      ratingData.category as any, // Type assertion needed due to string conversion
      ratingData.tags as any // Type assertion needed due to string conversion
    );
    this.ratings.push(rating);
    return rating;
  }

  public getRatings(): RatingType[] {
    return this.ratings.map(rating => rating.toJSON());
  }

  public getRatingsByUser(userId: string): RatingType[] {
    return this.ratings
      .filter(rating => rating.getReviewedId() === userId)
      .map(rating => rating.toJSON());
  }

  public getRatingsByReviewer(reviewerId: string): RatingType[] {
    return this.ratings
      .filter(rating => rating.getReviewerId() === reviewerId)
      .map(rating => rating.toJSON());
  }

  public getRatingsByCategory(category: string): RatingType[] {
    return this.ratings
      .filter(rating => rating.getCategory() === category)
      .map(rating => rating.toJSON());
  }

  public getAverageRating(userId: string): number {
    const userRatings = this.ratings.filter(rating => rating.getReviewedId() === userId);
    if (userRatings.length === 0) return 0;
    const sum = userRatings.reduce((acc, rating) => acc + rating.getScore(), 0);
    return Number((sum / userRatings.length).toFixed(1));
  }

  public getTopRatedUsers(limit: number = 5): Array<{ userId: string; averageRating: number; totalRatings: number }> {
    const userRatings = new Map<string, Rating[]>();
    
    this.ratings.forEach(rating => {
      const userRatingsList = userRatings.get(rating.getReviewedId()) || [];
      userRatingsList.push(rating);
      userRatings.set(rating.getReviewedId(), userRatingsList);
    });

    return Array.from(userRatings.entries())
      .map(([userId, ratings]) => ({
        userId,
        averageRating: this.calculateAverageRating(ratings),
        totalRatings: ratings.length,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);
  }

  public deleteRating(ratingId: string): RatingType | null {
    const index = this.ratings.findIndex(rating => rating.getId() === ratingId);
    if (index !== -1) {
      const deletedRating = this.ratings.splice(index, 1)[0];
      return deletedRating.toJSON();
    }
    return null;
  }

  public updateRating(ratingId: string, updates: Partial<{
    score: number;
    comment: string;
    category: string;
    tags: string[];
  }>): RatingType | null {
    const rating = this.ratings.find(rating => rating.getId() === ratingId);
    if (rating) {
      rating.update(updates as any); // Type assertion needed due to string conversion
      return rating.toJSON();
    }
    return null;
  }
}

export const ratingsService = new RatingsService(); 