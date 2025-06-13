import React from 'react';
import { Star, Info } from 'lucide-react';
import { styles } from '@/lib/styles/common';

interface Rating {
  id: string;
  score: number;
  comment: string;
  criteria: {
    name: string;
    score: number;
    description: string;
  }[];
  createdAt: string;
  userName: string;
}

interface RatingsListProps {
  ratings: Rating[];
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export function RatingsList({ ratings, onDelete, canDelete = false }: RatingsListProps) {
  return (
    <div className={styles.table.container}>
      <table className={styles.table.table}>
        <thead className={styles.table.header}>
          <tr>
            <th className={styles.table.headerCell}>Rating</th>
            <th className={styles.table.headerCell}>Criteria</th>
            <th className={styles.table.headerCell}>Comment</th>
            <th className={styles.table.headerCell}>Date</th>
            {canDelete && <th className={styles.table.headerCell}>Actions</th>}
          </tr>
        </thead>
        <tbody className={styles.table.body}>
          {ratings.map((rating) => (
            <tr key={rating.id} className={styles.table.row}>
              <td className={styles.table.cell}>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 font-medium">{rating.score.toFixed(1)}</span>
                </div>
              </td>
              <td className={styles.table.cell}>
                <div className="space-y-2">
                  {rating.criteria.map((criterion) => (
                    <div key={criterion.name} className="flex items-center">
                      <span className="text-sm">{criterion.name}</span>
                      <div className={styles.tooltip.info.container}>
                        <Info className={styles.tooltip.info.icon} />
                        <div className={`${styles.tooltip.content} ${styles.tooltip.position.top}`}>
                          {criterion.description}
                          <div className={`${styles.tooltip.arrow} ${styles.tooltip.position.top}`} />
                        </div>
                      </div>
                      <span className="ml-2 text-sm font-medium">{criterion.score}</span>
                    </div>
                  ))}
                </div>
              </td>
              <td className={styles.table.cell}>
                <p className="text-sm line-clamp-2">{rating.comment}</p>
              </td>
              <td className={styles.table.cell}>
                <time dateTime={rating.createdAt} className="text-sm">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </time>
              </td>
              {canDelete && (
                <td className={styles.table.cell}>
                  <button
                    onClick={() => onDelete?.(rating.id)}
                    className="text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 