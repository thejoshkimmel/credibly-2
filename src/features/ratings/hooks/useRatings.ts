import { useState } from 'react';
import { Rating, RatingFormData } from '../types';
import { toast } from 'sonner';

interface UseRatingsProps {
  targetUserId: string;
  onRatingSubmitted?: (newAverageRating: number) => void;
}

export function useRatings({ targetUserId, onRatingSubmitted }: UseRatingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRating = async (formData: RatingFormData) => {
    if (!formData.rating) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ratings/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit rating');
      }

      toast.success('Rating submitted successfully!');
      
      if (onRatingSubmitted) {
        onRatingSubmitted(data.newAverageRating);
      }

      return data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit rating');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitRating,
    isSubmitting,
  };
} 