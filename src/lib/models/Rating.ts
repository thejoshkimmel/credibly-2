import { Rating as RatingType, RATING_CATEGORIES, RATING_TAGS } from '@/types/user';

export class Rating {
  private id: string;
  private reviewerId: string;
  private reviewedId: string;
  private score: number;
  private comment: string;
  private category: string;
  private tags: string[];
  private createdAt: string;

  constructor(
    reviewerId: string,
    reviewedId: string,
    score: number,
    comment: string,
    category: keyof typeof RATING_CATEGORIES,
    tags: (keyof typeof RATING_TAGS)[]
  ) {
    this.validateInput(score, comment, category, tags);
    this.id = `r${Date.now()}`;
    this.reviewerId = reviewerId;
    this.reviewedId = reviewedId;
    this.score = score;
    this.comment = comment;
    this.category = RATING_CATEGORIES[category];
    this.tags = tags.map(tag => RATING_TAGS[tag]);
    this.createdAt = new Date().toISOString();
  }

  private validateInput(
    score: number,
    comment: string,
    category: keyof typeof RATING_CATEGORIES,
    tags: (keyof typeof RATING_TAGS)[]
  ): void {
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
  }

  public update(updates: Partial<{
    score: number;
    comment: string;
    category: keyof typeof RATING_CATEGORIES;
    tags: (keyof typeof RATING_TAGS)[];
  }>): void {
    if (updates.score !== undefined) {
      if (updates.score < 1 || updates.score > 5) {
        throw new Error('Rating score must be between 1 and 5');
      }
      this.score = updates.score;
    }
    if (updates.comment !== undefined) {
      if (!updates.comment || updates.comment.trim().length === 0) {
        throw new Error('Rating comment cannot be empty');
      }
      this.comment = updates.comment;
    }
    if (updates.category !== undefined) {
      if (!RATING_CATEGORIES[updates.category]) {
        throw new Error('Invalid rating category');
      }
      this.category = RATING_CATEGORIES[updates.category];
    }
    if (updates.tags !== undefined) {
      if (!updates.tags || updates.tags.length === 0) {
        throw new Error('At least one rating tag is required');
      }
      this.tags = updates.tags.map(tag => RATING_TAGS[tag]);
    }
  }

  public toJSON(): RatingType {
    return {
      id: this.id,
      reviewerId: this.reviewerId,
      reviewedId: this.reviewedId,
      score: this.score,
      comment: this.comment,
      category: this.category,
      tags: this.tags,
      createdAt: this.createdAt,
    };
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getReviewerId(): string {
    return this.reviewerId;
  }

  public getReviewedId(): string {
    return this.reviewedId;
  }

  public getScore(): number {
    return this.score;
  }

  public getComment(): string {
    return this.comment;
  }

  public getCategory(): string {
    return this.category;
  }

  public getTags(): string[] {
    return [...this.tags];
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
} 