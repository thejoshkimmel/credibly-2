export interface Rating {
  id: string;
  reviewerId: string;
  reviewedId: string;
  score: number;
  comment: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  avatar?: string;
  bio?: string;
  stats: {
    totalRatings: number;
    averageRating: number;
    totalReviews: number;
    followers: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Constants
export const RATING_CATEGORIES = {
  DEVELOPMENT: 'Development',
  COMMUNICATION: 'Communication',
  LEADERSHIP: 'Leadership',
  MANAGEMENT: 'Management',
  TEAMWORK: 'Teamwork',
  INNOVATION: 'Innovation',
} as const;

export const RATING_TAGS = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  REACT: 'react',
  NODE: 'node',
  TEAMWORK: 'teamwork',
  LEADERSHIP: 'leadership',
  PLANNING: 'planning',
  EXECUTION: 'execution',
  STRATEGY: 'strategy',
  COMMUNICATION: 'communication',
} as const;

// Ratings Module (IIFE)
export const RatingsModule = (() => {
  const ratings: Rating[] = [];

  return {
    addRating: (rating: Rating) => {
      ratings.push(rating);
    },
    getRatings: () => [...ratings],
    getRatingsByUser: (userId: string) => 
      ratings.filter(rating => rating.reviewedId === userId),
    getRatingsByReviewer: (reviewerId: string) =>
      ratings.filter(rating => rating.reviewerId === reviewerId),
    getRatingsByCategory: (category: string) =>
      ratings.filter(rating => rating.category === category),
    getAverageRating: (userId: string) => {
      const userRatings = ratings.filter(rating => rating.reviewedId === userId);
      return calculateAverageRating(userRatings);
    },
    getTopRatedUsers: (limit: number = 5) => {
      const userRatings = new Map<string, Rating[]>();
      
      ratings.forEach(rating => {
        const userRatingsList = userRatings.get(rating.reviewedId) || [];
        userRatingsList.push(rating);
        userRatings.set(rating.reviewedId, userRatingsList);
      });

      return Array.from(userRatings.entries())
        .map(([userId, userRatings]) => ({
          userId,
          averageRating: calculateAverageRating(userRatings),
          totalRatings: userRatings.length,
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, limit);
    },
  };
})();

// Helper function for calculating average rating
function calculateAverageRating(ratings: Rating[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
  return Number((sum / ratings.length).toFixed(1));
}

// Example usage
import { createUser } from '@/lib/users';

export function generateExampleData() {
  // Create users
  const john = createUser(
    'John Doe',
    'john@example.com',
    'user',
    '/avatars/john.jpg',
    'Software developer with 5 years of experience'
  );

  const jane = createUser(
    'Jane Smith',
    'jane@example.com',
    'admin',
    '/avatars/jane.jpg',
    'Product manager and team lead'
  );

  const mike = createUser(
    'Mike Johnson',
    'mike@example.com',
    'moderator',
    '/avatars/mike.jpg',
    'Community manager and content moderator'
  );

  // Add ratings
  jane.addRating(
    john.id,
    5,
    'Excellent work on the project!',
    'DEVELOPMENT',
    ['FRONTEND', 'REACT']
  );

  mike.addRating(
    john.id,
    4,
    'Great communication skills',
    'COMMUNICATION',
    ['TEAMWORK', 'COMMUNICATION']
  );

  john.addRating(
    jane.id,
    5,
    'Outstanding leadership',
    'LEADERSHIP',
    ['LEADERSHIP', 'STRATEGY']
  );

  mike.addRating(
    jane.id,
    5,
    'Excellent project management',
    'MANAGEMENT',
    ['PLANNING', 'EXECUTION']
  );

  // Generate profiles
  const profiles = [john, jane, mike].map(user => user.getProfile());

  return {
    users: [john, jane, mike],
    ratings: RatingsModule.getRatings(),
    profiles,
  };
}

// Export example data
export const exampleData = generateExampleData(); 