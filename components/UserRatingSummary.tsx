import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { calculateAverageRating, formatRatingAsStars } from '@/utils/ratings';

interface UserRatingSummaryProps {
  name: string;
  ratings: number[];
  className?: string;
}

export function UserRatingSummary({ name, ratings, className = '' }: UserRatingSummaryProps) {
  const averageRating = calculateAverageRating(ratings);
  const totalRatings = ratings.length;
  const positiveRatings = ratings.filter(rating => rating >= 4).length;
  const positivePercentage =
    totalRatings > 0 ? Math.round((positiveRatings / totalRatings) * 100) : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{name}'s Rating Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center text-yellow-400">
            {formatRatingAsStars(averageRating)}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Based on {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="font-medium">Positive Ratings:</div>
          <div className="text-green-600">{positivePercentage}%</div>
          <div className="text-muted-foreground">
            ({positiveRatings} out of {totalRatings})
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1 text-sm">
          {[5, 4, 3, 2, 1].map(star => {
            const count = ratings.filter(r => Math.round(r) === star).length;
            const percentage = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;

            return (
              <div key={star} className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">{star}</span>
                <span className="text-muted-foreground">({percentage}%)</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage:
/*
<UserRatingSummary 
  name="Josh"
  ratings={[4, 5, 5, 3, 4]}
  className="max-w-md"
/>
*/
