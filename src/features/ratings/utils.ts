import { Rating, RatingStats } from './types';

/**
 * Calculate average rating from an array of ratings
 */
export function calculateAverageRating(ratings: Rating[]): number {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, { rating }) => acc + rating, 0);
  return Number((sum / ratings.length).toFixed(1));
}

/**
 * Calculate percentage of positive ratings (4-5 stars)
 */
export function calculatePositiveRatingPercentage(ratings: Rating[]): number {
  if (!ratings.length) return 0;
  const positiveRatings = ratings.filter(({ rating }) => rating >= 4).length;
  return Number(((positiveRatings / ratings.length) * 100).toFixed(1));
}

/**
 * Get distribution of ratings (count of each rating)
 */
export function getRatingDistribution(ratings: Rating[]): { [key: number]: number } {
  return ratings.reduce((acc, { rating }) => {
    const roundedRating = Math.round(rating);
    acc[roundedRating] = (acc[roundedRating] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });
}

/**
 * Calculate all rating statistics
 */
export function calculateRatingStats(ratings: Rating[]): RatingStats {
  return {
    averageRating: calculateAverageRating(ratings),
    totalRatings: ratings.length,
    positiveRatings: ratings.filter(({ rating }) => rating >= 4).length,
    ratingDistribution: getRatingDistribution(ratings),
  };
}

/**
 * Format rating as stars (e.g., "★★★★☆")
 */
export function formatRatingAsStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
} 