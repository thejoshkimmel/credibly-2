import { UserProfile, Rating, RATING_CATEGORIES, RATING_TAGS } from '@/types/user';
import { RatingsModule } from '@/types/user';

let userIdCounter = 1;

export function createUser(
  name: string,
  email: string,
  role: 'admin' | 'user' | 'moderator',
  avatar?: string,
  bio?: string
) {
  const id = `u${userIdCounter++}`;
  const createdAt = new Date().toISOString();

  return {
    id,
    name,
    email,
    role,
    avatar,
    bio,
    createdAt,
    addRating: (
      reviewerId: string,
      score: number,
      comment: string,
      category: keyof typeof RATING_CATEGORIES,
      tags: (keyof typeof RATING_TAGS)[]
    ) => {
      const rating = createRating(reviewerId, id, score, comment, category, tags);
      RatingsModule.addRating(rating);
      return rating;
    },
    getProfile: () => {
      const receivedRatings = RatingsModule.getRatingsByUser(id);
      const givenRatings = RatingsModule.getRatingsByReviewer(id);

      return {
        id,
        name,
        email,
        role,
        avatar,
        bio,
        stats: {
          totalRatings: receivedRatings.length,
          averageRating: calculateAverageRating(receivedRatings),
          totalReviews: givenRatings.length,
          followers: Math.floor(Math.random() * 300), // Example random followers
        },
        createdAt,
        updatedAt: new Date().toISOString(),
      };
    },
  };
}

// Helper function for calculating average rating
function calculateAverageRating(ratings: Rating[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
  return Number((sum / ratings.length).toFixed(1));
}

// Helper function for creating ratings
function createRating(
  reviewerId: string,
  reviewedId: string,
  score: number,
  comment: string,
  category: keyof typeof RATING_CATEGORIES,
  tags: (keyof typeof RATING_TAGS)[]
): Rating {
  return {
    id: `r${Date.now()}`,
    reviewerId,
    reviewedId,
    score,
    comment,
    category: RATING_CATEGORIES[category],
    tags: tags.map(tag => RATING_TAGS[tag]),
    createdAt: new Date().toISOString(),
  };
} 