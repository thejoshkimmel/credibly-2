import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useRatings } from '../hooks/useRatings';
import { Rating, RatingFormData } from '../types';
import { validate, ratingFormSchema } from '@/lib/utils/validation';
import { handleError } from '@/lib/utils/error';

interface RatingManagerProps {
  targetUserId: string;
  initialRatings: Rating[];
  onRatingsUpdate?: (ratings: Rating[]) => void;
}

export function RatingManager({ 
  targetUserId, 
  initialRatings, 
  onRatingsUpdate 
}: RatingManagerProps) {
  const [ratings, setRatings] = useState<Rating[]>(initialRatings);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const { submitRating, isSubmitting } = useRatings({
    targetUserId,
    onRatingSubmitted: (newAverageRating) => {
      // Update parent component if needed
      if (onRatingsUpdate) {
        onRatingsUpdate(ratings);
      }
    }
  });

  // Handle rating submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const formData = validate(ratingFormSchema, {
        rating: selectedRating,
        comment
      });

      // Submit rating
      const response = await submitRating(formData);
      
      // Add new rating to list
      const newRating: Rating = {
        id: response.id,
        rating: formData.rating,
        comment: formData.comment,
        ratedBy: response.ratedBy,
        ratedAt: new Date()
      };

      setRatings(prev => [...prev, newRating]);
      
      // Reset form
      setSelectedRating(0);
      setComment('');
      
      toast.success('Rating submitted successfully!');
    } catch (error) {
      handleError(error);
    }
  }, [selectedRating, comment, submitRating]);

  // Handle rating deletion
  const handleDeleteRating = useCallback(async (ratingId: string) => {
    try {
      await fetch(`/api/ratings/${ratingId}`, {
        method: 'DELETE'
      });

      // Remove rating from list
      setRatings(prev => prev.filter(rating => rating.id !== ratingId));
      
      toast.success('Rating deleted successfully');
    } catch (error) {
      handleError(error);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Rating Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= selectedRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment (optional)"
          className="w-full p-2 border rounded"
          rows={3}
        />

        <Button
          type="submit"
          disabled={isSubmitting || selectedRating === 0}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </Button>
      </form>

      {/* Ratings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Ratings</h3>
        {ratings.map((rating) => (
          <div 
            key={rating.id} 
            className="p-4 border rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: rating.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(rating.ratedAt).toLocaleDateString()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteRating(rating.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
            {rating.comment && (
              <p className="text-sm text-gray-600">{rating.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Example usage:
/*
<RatingManager
  targetUserId="user123"
  initialRatings={userRatings}
  onRatingsUpdate={(newRatings) => {
    // Update parent component state
    setUserRatings(newRatings);
  }}
/>
*/ 