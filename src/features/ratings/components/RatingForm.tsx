import React from 'react';
import { Star } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { styles } from '@/lib/styles/common';

interface RatingFormProps {
  onSubmit: (data: {
    score: number;
    comment: string;
    criteria: { name: string; score: number }[];
  }) => void;
  isLoading?: boolean;
  error?: string;
}

const CRITERIA = [
  { name: 'Quality', description: 'How would you rate the overall quality?' },
  { name: 'Value', description: 'Was it worth the price?' },
  { name: 'Service', description: 'How was the customer service?' },
];

export function RatingForm({ onSubmit, isLoading, error }: RatingFormProps) {
  const [formError, setFormError] = React.useState<string | undefined>(error);
  const [scores, setScores] = React.useState<Record<string, number>>({});
  const [comment, setComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(undefined);

    const criteria = CRITERIA.map(c => ({
      name: c.name,
      score: scores[c.name] || 0,
    }));

    const averageScore = criteria.reduce((acc, curr) => acc + curr.score, 0) / criteria.length;

    onSubmit({
      score: averageScore,
      comment,
      criteria,
    });
  };

  const handleScoreChange = (criterion: string, score: number) => {
    setScores(prev => ({ ...prev, [criterion]: score }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {formError}
        </div>
      )}

      <div className="space-y-4">
        {CRITERIA.map((criterion) => (
          <div key={criterion.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {criterion.name}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleScoreChange(criterion.name, score)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      scores[criterion.name] >= score
                        ? 'text-[var(--accent)] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">{criterion.description}</p>
          </div>
        ))}
      </div>

      <FormField
        label="Comment"
        name="comment"
        type="textarea"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        minLength={10}
        maxLength={500}
        error={formError}
        helperText="Minimum 10 characters, maximum 500 characters."
      />

      <button
        type="submit"
        disabled={isLoading || Object.keys(scores).length !== CRITERIA.length}
        className={`${styles.button.base} ${styles.button.primary} w-full`}
      >
        {isLoading ? 'Submitting...' : 'Submit Rating'}
      </button>
    </form>
  );
} 