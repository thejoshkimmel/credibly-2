export interface Rating {
  id: string;
  rating: number;
  comment?: string;
  ratedBy: string;
  ratedAt: Date;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  positiveRatings: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export interface RatingFormData {
  rating: number;
  comment?: string;
} 