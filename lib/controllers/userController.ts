import { db } from '@/lib/db';
import { users, ratings } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export class UserController {
  static async getById(userId: number) {
    try {
      // Get user profile
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

      if (!user) {
        return null;
      }

      // Get user's average rating
      const [{ avgRating }] = await db
        .select({
          avgRating: sql<number>`COALESCE(AVG(${ratings.overallRating}), 0)`,
        })
        .from(ratings)
        .where(eq(ratings.ratedUserId, userId));

      // Get total number of ratings
      const [{ totalRatings }] = await db
        .select({
          totalRatings: sql<number>`COUNT(*)`,
        })
        .from(ratings)
        .where(eq(ratings.ratedUserId, userId));

      return {
        ...user,
        averageRating: avgRating,
        totalRatings: totalRatings,
      };
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }
} 