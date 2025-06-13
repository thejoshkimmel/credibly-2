import { Rating, User } from './dataStructures';

interface GroupRating {
  id: string;
  groupId: string;
  raterId: string;
  targetId: string;
  score: number;
  comment: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  weight: number; // Weight of the rating based on rater's role/status
}

interface GroupStats {
  averageScore: number;
  weightedAverage: number;
  totalRatings: number;
  categoryBreakdown: Map<string, CategoryStats>;
  raterBreakdown: Map<string, RaterStats>;
}

interface CategoryStats {
  averageScore: number;
  weightedAverage: number;
  totalRatings: number;
  ratings: Set<string>;
}

interface RaterStats {
  totalRatings: number;
  averageScore: number;
  categories: Set<string>;
}

export class GroupRatingStore {
  private ratings: Map<string, GroupRating>;
  private groupRatings: Map<string, Set<string>>;
  private userGroupRatings: Map<string, Map<string, Set<string>>>; // userId -> (groupId -> ratingIds)
  private groupStats: Map<string, GroupStats>;
  private sortedRatings: GroupRating[] = [];
  private isSorted = false;

  constructor() {
    this.ratings = new Map();
    this.groupRatings = new Map();
    this.userGroupRatings = new Map();
    this.groupStats = new Map();
  }

  addRating(rating: GroupRating): void {
    this.ratings.set(rating.id, rating);
    this.isSorted = false;

    // Update group ratings index
    const groupRatings = this.groupRatings.get(rating.groupId) || new Set();
    groupRatings.add(rating.id);
    this.groupRatings.set(rating.groupId, groupRatings);

    // Update user-group ratings index
    let userGroupMap = this.userGroupRatings.get(rating.raterId);
    if (!userGroupMap) {
      userGroupMap = new Map();
      this.userGroupRatings.set(rating.raterId, userGroupMap);
    }
    let groupRatingsSet = userGroupMap.get(rating.groupId);
    if (!groupRatingsSet) {
      groupRatingsSet = new Set();
      userGroupMap.set(rating.groupId, groupRatingsSet);
    }
    groupRatingsSet.add(rating.id);

    // Update group statistics
    this.updateGroupStats(rating);
  }

  private updateGroupStats(rating: GroupRating): void {
    const stats = this.groupStats.get(rating.groupId) || {
      averageScore: 0,
      weightedAverage: 0,
      totalRatings: 0,
      categoryBreakdown: new Map(),
      raterBreakdown: new Map()
    };

    // Update overall stats
    stats.totalRatings++;
    stats.averageScore = (stats.averageScore * (stats.totalRatings - 1) + rating.score) / stats.totalRatings;
    stats.weightedAverage = (stats.weightedAverage * (stats.totalRatings - 1) + rating.score * rating.weight) / stats.totalRatings;

    // Update category stats
    let categoryStats = stats.categoryBreakdown.get(rating.category);
    if (!categoryStats) {
      categoryStats = {
        averageScore: 0,
        weightedAverage: 0,
        totalRatings: 0,
        ratings: new Set()
      };
      stats.categoryBreakdown.set(rating.category, categoryStats);
    }
    categoryStats.ratings.add(rating.id);
    categoryStats.totalRatings++;
    categoryStats.averageScore = (categoryStats.averageScore * (categoryStats.totalRatings - 1) + rating.score) / categoryStats.totalRatings;
    categoryStats.weightedAverage = (categoryStats.weightedAverage * (categoryStats.totalRatings - 1) + rating.score * rating.weight) / categoryStats.totalRatings;

    // Update rater stats
    let raterStats = stats.raterBreakdown.get(rating.raterId);
    if (!raterStats) {
      raterStats = {
        totalRatings: 0,
        averageScore: 0,
        categories: new Set()
      };
      stats.raterBreakdown.set(rating.raterId, raterStats);
    }
    raterStats.totalRatings++;
    raterStats.averageScore = (raterStats.averageScore * (raterStats.totalRatings - 1) + rating.score) / raterStats.totalRatings;
    raterStats.categories.add(rating.category);

    this.groupStats.set(rating.groupId, stats);
  }

  // O(1) lookups
  getRating(id: string): GroupRating | undefined {
    return this.ratings.get(id);
  }

  getGroupRatings(groupId: string): GroupRating[] {
    const ratingIds = this.groupRatings.get(groupId);
    return ratingIds ? Array.from(ratingIds).map(id => this.ratings.get(id)!) : [];
  }

  getUserGroupRatings(userId: string, groupId: string): GroupRating[] {
    const userGroupMap = this.userGroupRatings.get(userId);
    if (!userGroupMap) return [];
    const ratingIds = userGroupMap.get(groupId);
    return ratingIds ? Array.from(ratingIds).map(id => this.ratings.get(id)!) : [];
  }

  getGroupStats(groupId: string): GroupStats | undefined {
    return this.groupStats.get(groupId);
  }

  // O(n log n) sort, cached until new ratings are added
  getSortedGroupRatings(groupId: string, sortBy: 'score' | 'date' | 'weight' = 'score'): GroupRating[] {
    if (!this.isSorted) {
      const groupRatings = this.getGroupRatings(groupId);
      this.sortedRatings = [...groupRatings].sort((a, b) => {
        switch (sortBy) {
          case 'score':
            return b.score - a.score;
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'weight':
            return b.weight - a.weight;
          default:
            return 0;
        }
      });
      this.isSorted = true;
    }
    return this.sortedRatings;
  }

  // Calculate weighted average for a group
  calculateWeightedAverage(groupId: string): number {
    const stats = this.groupStats.get(groupId);
    return stats?.weightedAverage || 0;
  }

  // Get category breakdown for a group
  getCategoryBreakdown(groupId: string): Map<string, CategoryStats> {
    const stats = this.groupStats.get(groupId);
    return stats?.categoryBreakdown || new Map();
  }

  // Get rater breakdown for a group
  getRaterBreakdown(groupId: string): Map<string, RaterStats> {
    const stats = this.groupStats.get(groupId);
    return stats?.raterBreakdown || new Map();
  }
}

// Example usage:
/*
const groupRatingStore = new GroupRatingStore();

// Add a group rating
groupRatingStore.addRating({
  id: '1',
  groupId: 'team1',
  raterId: 'user1',
  targetId: 'user2',
  score: 5,
  comment: 'Great teamwork',
  category: 'collaboration',
  tags: ['teamwork', 'communication'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  weight: 1.5 // Higher weight for senior team members
});

// Get group statistics
const groupStats = groupRatingStore.getGroupStats('team1');
console.log(`Team average rating: ${groupStats?.averageScore}`);
console.log(`Weighted average: ${groupStats?.weightedAverage}`);

// Get category breakdown
const categoryBreakdown = groupRatingStore.getCategoryBreakdown('team1');
console.log('Category breakdown:', Object.fromEntries(categoryBreakdown));

// Get sorted ratings
const topRatings = groupRatingStore.getSortedGroupRatings('team1', 'score');
*/ 