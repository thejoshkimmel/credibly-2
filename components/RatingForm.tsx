import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface RatingFormProps {
  targetUserId: string;
  onRatingSubmitted?: (newAverageRating: number) => void;
}

export function RatingForm({ targetUserId, onRatingSubmitted }: RatingFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
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
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit rating');
      }

      toast.success('Rating submitted successfully!');
      setRating(0);
      setComment('');

      if (onRatingSubmitted) {
        onRatingSubmitted(data.newAverageRating);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="min-h-[100px]"
      />

      <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
      </Button>
    </form>
  );
}

// Example usage:
/*
<RatingForm 
  targetUserId="user123"
  onRatingSubmitted={(newAverage) => {
    console.log("New average rating:", newAverage);
  }}
/>
*/
