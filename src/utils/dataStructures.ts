// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  endorsements?: string[]; // IDs of users who endorsed this user
  endorsedBy?: string[]; // IDs of users endorsed by this user
  verificationToken?: string;
  verified: boolean;
}

interface Rating {
  id: string;
  raterId: string;
  targetId: string;
  score: number;
  comment: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface EndorsementNode {
  id: string;
  userId: string;
  endorserId: string;
  children: EndorsementNode[];
  level: number;
}

interface CategoryStats {
  averageScore: number;
  totalRatings: number;
  ratings: Set<string>;
}

// Optimized data structures
export class UserStore {
  private users: Map<string, User>;
  private emailToId: Map<string, string>;
  private roleToUsers: Map<string, Set<string>>;
  private emailToToken: Map<string, string>;
  private tokenToEmail: Map<string, string>;

  constructor() {
    this.users = new Map();
    this.emailToId = new Map();
    this.roleToUsers = new Map();
    this.emailToToken = new Map();
    this.tokenToEmail = new Map();
  }

  addUser(user: User): void {
    this.users.set(user.id, user);
    this.emailToId.set(user.email, user.id);
    
    const roleUsers = this.roleToUsers.get(user.role) || new Set();
    roleUsers.add(user.id);
    this.roleToUsers.set(user.role, roleUsers);

    if (user.verificationToken) {
      this.emailToToken.set(user.email, user.verificationToken);
      this.tokenToEmail.set(user.verificationToken, user.email);
    }
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    const id = this.emailToId.get(email);
    return id ? this.users.get(id) : undefined;
  }

  getUsersByRole(role: string): User[] {
    const userIds = this.roleToUsers.get(role);
    return userIds ? Array.from(userIds).map(id => this.users.get(id)!) : [];
  }

  // O(1) lookup for endorsements
  getEndorsements(userId: string): User[] {
    const user = this.users.get(userId);
    return user?.endorsements?.map(id => this.users.get(id)!) || [];
  }

  // O(1) verification token lookups
  getVerificationToken(email: string): string | undefined {
    return this.emailToToken.get(email);
  }

  getEmailByToken(token: string): string | undefined {
    return this.tokenToEmail.get(token);
  }

  verifyUser(token: string): boolean {
    const email = this.tokenToEmail.get(token);
    if (!email) return false;

    const user = this.getUserByEmail(email);
    if (!user) return false;

    user.verified = true;
    this.emailToToken.delete(email);
    this.tokenToEmail.delete(token);
    return true;
  }
}

export class RatingStore {
  private ratings: Map<string, Rating>;
  private userRatings: Map<string, Set<string>>;
  private categoryRatings: Map<string, Set<string>>;
  private raterToTarget: Map<string, Map<string, string>>; // raterId -> (targetId -> ratingId)
  private targetToRater: Map<string, Map<string, string>>; // targetId -> (raterId -> ratingId)
  private categoryStats: Map<string, CategoryStats>;
  private sortedRatings: Rating[] = [];
  private isSorted = false;

  constructor() {
    this.ratings = new Map();
    this.userRatings = new Map();
    this.categoryRatings = new Map();
    this.raterToTarget = new Map();
    this.targetToRater = new Map();
    this.categoryStats = new Map();
  }

  addRating(rating: Rating): void {
    this.ratings.set(rating.id, rating);
    this.isSorted = false;

    // Update user ratings index
    const userRatings = this.userRatings.get(rating.raterId) || new Set();
    userRatings.add(rating.id);
    this.userRatings.set(rating.raterId, userRatings);

    // Update category ratings index
    const categoryRatings = this.categoryRatings.get(rating.category) || new Set();
    categoryRatings.add(rating.id);
    this.categoryRatings.set(rating.category, categoryRatings);

    // Update rater-target mapping
    let raterMap = this.raterToTarget.get(rating.raterId);
    if (!raterMap) {
      raterMap = new Map();
      this.raterToTarget.set(rating.raterId, raterMap);
    }
    raterMap.set(rating.targetId, rating.id);

    // Update target-rater mapping
    let targetMap = this.targetToRater.get(rating.targetId);
    if (!targetMap) {
      targetMap = new Map();
      this.targetToRater.set(rating.targetId, targetMap);
    }
    targetMap.set(rating.raterId, rating.id);

    // Update category stats
    this.updateCategoryStats(rating);
  }

  private updateCategoryStats(rating: Rating): void {
    const stats = this.categoryStats.get(rating.category) || {
      averageScore: 0,
      totalRatings: 0,
      ratings: new Set<string>()
    };

    stats.ratings.add(rating.id);
    stats.totalRatings++;
    stats.averageScore = (stats.averageScore * (stats.totalRatings - 1) + rating.score) / stats.totalRatings;
    this.categoryStats.set(rating.category, stats);
  }

  getRating(id: string): Rating | undefined {
    return this.ratings.get(id);
  }

  // O(1) lookup for user ratings
  getUserRatings(userId: string): Rating[] {
    const ratingIds = this.userRatings.get(userId);
    return ratingIds ? Array.from(ratingIds).map(id => this.ratings.get(id)!) : [];
  }

  // O(1) lookup for category ratings
  getCategoryRatings(category: string): Rating[] {
    const ratingIds = this.categoryRatings.get(category);
    return ratingIds ? Array.from(ratingIds).map(id => this.ratings.get(id)!) : [];
  }

  // O(1) lookup for rating between two users
  getRatingBetweenUsers(raterId: string, targetId: string): Rating | undefined {
    const raterMap = this.raterToTarget.get(raterId);
    if (!raterMap) return undefined;
    const ratingId = raterMap.get(targetId);
    return ratingId ? this.ratings.get(ratingId) : undefined;
  }

  // O(1) lookup for all ratings received by a user
  getRatingsReceived(targetId: string): Rating[] {
    const raterMap = this.targetToRater.get(targetId);
    if (!raterMap) return [];
    return Array.from(raterMap.values()).map(id => this.ratings.get(id)!);
  }

  // O(1) lookup for category statistics
  getCategoryStats(category: string): CategoryStats | undefined {
    return this.categoryStats.get(category);
  }

  // O(n log n) sort, cached until new ratings are added
  getSortedRatings(sortBy: 'score' | 'date' = 'score'): Rating[] {
    if (!this.isSorted) {
      this.sortedRatings = Array.from(this.ratings.values());
      this.sortedRatings.sort((a, b) => {
        if (sortBy === 'score') {
          return b.score - a.score;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.isSorted = true;
    }
    return this.sortedRatings;
  }
}

// Tree-based endorsement system
export class EndorsementTree {
  private nodes: Map<string, EndorsementNode>;
  private userNodes: Map<string, Set<string>>;
  private endorserToEndorsee: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Map();
    this.userNodes = new Map();
    this.endorserToEndorsee = new Map();
  }

  addEndorsement(endorsement: EndorsementNode): void {
    this.nodes.set(endorsement.id, endorsement);

    // Update user nodes index
    const userNodes = this.userNodes.get(endorsement.userId) || new Set();
    userNodes.add(endorsement.id);
    this.userNodes.set(endorsement.userId, userNodes);

    // Update endorser-endorsee mapping
    const endorseeSet = this.endorserToEndorsee.get(endorsement.endorserId) || new Set();
    endorseeSet.add(endorsement.userId);
    this.endorserToEndorsee.set(endorsement.endorserId, endorseeSet);
  }

  // O(1) lookup for direct endorsements
  getDirectEndorsements(userId: string): EndorsementNode[] {
    const nodeIds = this.userNodes.get(userId);
    return nodeIds ? Array.from(nodeIds).map(id => this.nodes.get(id)!) : [];
  }

  // O(1) lookup for users endorsed by a specific user
  getEndorsedUsers(endorserId: string): string[] {
    const endorseeSet = this.endorserToEndorsee.get(endorserId);
    return endorseeSet ? Array.from(endorseeSet) : [];
  }

  // O(n) traversal for all endorsements in the tree
  getAllEndorsements(userId: string): EndorsementNode[] {
    const results: EndorsementNode[] = [];
    const visited = new Set<string>();

    const traverse = (node: EndorsementNode): void => {
      if (visited.has(node.id)) return;
      visited.add(node.id);
      results.push(node);

      node.children.forEach(child => traverse(child));
    };

    const directEndorsements = this.getDirectEndorsements(userId);
    directEndorsements.forEach(endorsement => traverse(endorsement));

    return results;
  }

  // O(n) traversal for endorsement chain
  getEndorsementChain(userId: string): EndorsementNode[] {
    const chain: EndorsementNode[] = [];
    const visited = new Set<string>();

    const traverse = (node: EndorsementNode): void => {
      if (visited.has(node.id)) return;
      visited.add(node.id);
      chain.push(node);

      // Sort children by level for consistent traversal
      const sortedChildren = [...node.children].sort((a, b) => a.level - b.level);
      sortedChildren.forEach(child => traverse(child));
    };

    const directEndorsements = this.getDirectEndorsements(userId);
    directEndorsements.forEach(endorsement => traverse(endorsement));

    return chain;
  }
}

// Example usage:
/*
const userStore = new UserStore();
const ratingStore = new RatingStore();
const endorsementTree = new EndorsementTree();

// Add users with verification tokens
userStore.addUser({
  id: '1',
  name: 'John',
  email: 'john@example.com',
  role: 'user',
  verificationToken: 'token123',
  verified: false,
});

// Add ratings with rater-target relationship
ratingStore.addRating({
  id: '1',
  raterId: '1',
  targetId: '2',
  score: 5,
  comment: 'Great service',
  category: 'service',
  tags: ['fast', 'friendly'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
});

// Get category statistics
const serviceStats = ratingStore.getCategoryStats('service');
console.log(`Average service rating: ${serviceStats?.averageScore}`);

// Get rating between users
const rating = ratingStore.getRatingBetweenUsers('1', '2');

// Get all ratings received by a user
const receivedRatings = ratingStore.getRatingsReceived('2');

// Verify user
const verified = userStore.verifyUser('token123');

// Get endorsed users
const endorsedUsers = endorsementTree.getEndorsedUsers('1');
*/ 