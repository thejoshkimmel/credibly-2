import React from 'react';
import { Star } from 'lucide-react';
import { Rating } from '@/types';

interface RatingsTableProps {
  ratings: Rating[];
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export function RatingsTable({ ratings, onDelete, canDelete = false }: RatingsTableProps) {
  // Sort ratings by date, newest first
  const sortedRatings = [...ratings].sort(
    (a, b) => new Date(b.ratedAt).getTime() - new Date(a.ratedAt).getTime()
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Score
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Comment
            </th>
            {canDelete && (
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRatings.map((rating) => (
            <tr
              key={rating.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {rating.category || 'Overall'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: rating.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({rating.rating}/5)
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(rating.ratedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="max-w-xs truncate">
                  {rating.comment || 'No comment'}
                </div>
              </td>
              {canDelete && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete?.(rating.id)}
                    className="text-red-600 hover:text-red-900 transition-colors duration-150"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {sortedRatings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No ratings available
        </div>
      )}
    </div>
  );
}

// Example usage:
/*
const sampleRatings: Rating[] = [
  {
    id: '1',
    category: 'Professionalism',
    rating: 5,
    comment: 'Excellent work!',
    ratedBy: 'user1',
    ratedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    category: 'Communication',
    rating: 4,
    comment: 'Good communication skills',
    ratedBy: 'user2',
    ratedAt: new Date('2024-03-14')
  },
  {
    id: '3',
    category: 'Overall',
    rating: 5,
    comment: 'Great experience overall',
    ratedBy: 'user3',
    ratedAt: new Date('2024-03-13')
  }
];

<RatingsTable
  ratings={sampleRatings}
  onDelete={handleDeleteRating}
  canDelete={isCurrentUser}
/>
*/ 