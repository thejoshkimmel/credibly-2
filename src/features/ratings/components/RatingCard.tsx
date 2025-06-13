import React from 'react';
import { Star } from 'lucide-react';
import { styles } from '@/lib/styles/common';

interface RatingCardProps {
  rating: {
    id: string;
    score: number;
    comment: string;
    criteria: {
      name: string;
      score: number;
    }[];
    createdAt: string;
    userName: string;
  };
  onDelete?: () => void;
  canDelete?: boolean;
}

export function RatingCard({ rating, onDelete, canDelete = false }: RatingCardProps) {
  return (
    <div className={styles.ratingCard.container}>
      <div className={styles.ratingCard.header}>
        <div className={styles.ratingCard.score}>
          <Star className={styles.ratingCard.star} />
          <span className={styles.ratingCard.scoreText}>{rating.score.toFixed(1)}</span>
        </div>
        {canDelete && (
          <button
            onClick={onDelete}
            className={`${styles.button.base} ${styles.button.danger}`}
          >
            Delete
          </button>
        )}
      </div>

      <div className={styles.ratingCard.criteria}>
        {rating.criteria.map((criterion) => (
          <div key={criterion.name} className={styles.ratingCard.criterion}>
            <span className={styles.ratingCard.criterionName}>{criterion.name}</span>
            <span className={styles.ratingCard.criterionScore}>{criterion.score}</span>
          </div>
        ))}
      </div>

      <p className={styles.ratingCard.comment}>{rating.comment}</p>

      <div className={styles.ratingCard.footer}>
        <span>{rating.userName}</span>
        <time dateTime={rating.createdAt}>
          {new Date(rating.createdAt).toLocaleDateString()}
        </time>
      </div>
    </div>
  );
} 