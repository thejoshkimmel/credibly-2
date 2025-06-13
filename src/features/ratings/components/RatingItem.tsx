import React from 'react';
import { Star } from 'lucide-react';
import { Rating } from '@/types';

interface RatingItemProps {
  rating: Rating;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export function RatingItem({ rating, onDelete, canDelete = false }: RatingItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: rating.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(rating.ratedAt).toLocaleDateString()}
          </span>
        </div>
        
        {canDelete && onDelete && (
          <button
            onClick={() => onDelete(rating.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {rating.comment && (
        <p className="text-gray-700 text-sm">{rating.comment}</p>
      )}

      <div className="text-xs text-gray-500">
        Rated by: {rating.ratedBy}
      </div>
    </div>
  );
} 