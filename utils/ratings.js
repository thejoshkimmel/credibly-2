/**
 * Calculate the average rating from an array of scores
 * @param {number[]} scores - Array of numerical scores
 * @returns {number} The average score rounded to 2 decimal places
 */
export function calculateAverageRating(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return 0;
  }

  const sum = scores.reduce((acc, score) => acc + score, 0);
  const average = sum / scores.length;
  return Number(average.toFixed(2));
}

/**
 * Calculate the percentage of positive ratings (4-5 stars)
 * @param {number[]} scores - Array of numerical scores
 * @returns {number} Percentage of positive ratings
 */
export function calculatePositiveRatingPercentage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return 0;
  }

  const positiveRatings = scores.filter(score => score >= 4).length;
  const percentage = (positiveRatings / scores.length) * 100;
  return Number(percentage.toFixed(1));
}

/**
 * Get rating distribution (count of each rating)
 * @param {number[]} scores - Array of numerical scores
 * @returns {Object} Object containing count for each rating
 */
export function getRatingDistribution(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
  }

  return scores.reduce(
    (acc, score) => {
      const rating = Math.round(score);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }
  );
}

/**
 * Format rating as stars (e.g., "★★★★☆")
 * @param {number} rating - Rating from 0 to 5
 * @returns {string} Formatted star rating
 */
export function formatRatingAsStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Example usage:
/*
const scores = [4.5, 5, 3, 4, 5];
console.log('Average Rating:', calculateAverageRating(scores)); // 4.3
console.log('Positive Rating %:', calculatePositiveRatingPercentage(scores)); // 80.0
console.log('Rating Distribution:', getRatingDistribution(scores)); // {1: 0, 2: 0, 3: 1, 4: 2, 5: 2}
console.log('Formatted Rating:', formatRatingAsStars(4.3)); // ★★★★☆
*/
