import { useState } from 'react';
import { RATING_CATEGORIES, RATING_TAGS } from '@/types/user';
import { api } from '@/lib/api';

interface RatingFormProps {
  reviewerId: string;
  reviewedId: string;
  onRatingSubmitted: () => void;
}

export function RatingForm({ reviewerId, reviewedId, onRatingSubmitted }: RatingFormProps) {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState<keyof typeof RATING_CATEGORIES>('DEVELOPMENT');
  const [selectedTags, setSelectedTags] = useState<(keyof typeof RATING_TAGS)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await api.createRating({
        reviewerId,
        reviewedId,
        score,
        comment,
        category,
        tags: selectedTags,
      });

      // Reset form
      setScore(5);
      setComment('');
      setCategory('DEVELOPMENT');
      setSelectedTags([]);

      // Notify parent component
      onRatingSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: keyof typeof RATING_TAGS) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Score</label>
        <div className="flex items-center space-x-2 mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setScore(value)}
              className={`w-10 h-10 rounded-full ${
                score === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as keyof typeof RATING_CATEGORIES)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.entries(RATING_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex flex-wrap gap-2">
          {Object.entries(RATING_TAGS).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleTag(key as keyof typeof RATING_TAGS)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(key as keyof typeof RATING_TAGS)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Share your thoughts..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
      </button>
    </form>
  );
} 