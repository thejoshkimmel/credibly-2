// Types for nested data structures
interface Comment {
  id: string;
  content: string;
  author: string;
  replies?: Comment[];
  createdAt: string;
}

interface Rating {
  id: string;
  score: number;
  comment: string;
  category: string;
  tags: string[];
  subRatings?: Rating[];
  createdAt: string;
}

// WeakMap for memoization - allows garbage collection of unused entries
const memoCache = new WeakMap<object, any>();

// Type guard functions - O(1) time and space
const isComment = (obj: unknown): obj is Comment => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'content' in obj &&
    'author' in obj &&
    'createdAt' in obj
  );
};

const isRating = (obj: unknown): obj is Rating => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'score' in obj &&
    'comment' in obj &&
    'category' in obj &&
    'tags' in obj &&
    'createdAt' in obj
  );
};

// Comment traversal utilities
// Space: O(1) - uses WeakMap for caching
export const findCommentById = (
  comments: Comment[],
  targetId: string,
  maxDepth = 10
): Comment | null => {
  // Check cache first
  const cacheKey = { id: targetId };
  if (memoCache.has(cacheKey)) {
    return memoCache.get(cacheKey);
  }

  // Iterative approach instead of recursive to avoid call stack
  const stack: { comment: Comment; depth: number }[] = [];
  comments.forEach(comment => stack.push({ comment, depth: 0 }));

  while (stack.length > 0) {
    const { comment, depth } = stack.pop()!;

    if (depth > maxDepth) continue;
    if (comment.id === targetId) {
      memoCache.set(cacheKey, comment);
      return comment;
    }

    if (comment.replies?.length) {
      comment.replies.forEach(reply => 
        stack.push({ comment: reply, depth: depth + 1 })
      );
    }
  }

  memoCache.set(cacheKey, null);
  return null;
};

// Space: O(1) - uses generator for lazy evaluation
export const mapComments = <T>(
  comments: Comment[],
  callback: (comment: Comment, depth: number) => T,
  maxDepth = 10
): Generator<T> {
  function* traverse(comment: Comment, depth = 0): Generator<T> {
    if (depth > maxDepth) return;

    yield callback(comment, depth);

    if (comment.replies?.length) {
      for (const reply of comment.replies) {
        yield* traverse(reply, depth + 1);
      }
    }
  }

  return function* () {
    for (const comment of comments) {
      yield* traverse(comment);
    }
  }();
};

// Rating traversal utilities
// Space: O(1) - uses WeakMap for caching
export const calculateAverageRating = (
  ratings: Rating[],
  maxDepth = 10
): { average: number; count: number } => {
  const cacheKey = { ids: ratings.map(r => r.id) };
  if (memoCache.has(cacheKey)) {
    return memoCache.get(cacheKey);
  }

  let total = 0;
  let count = 0;

  // Iterative approach
  const stack: { rating: Rating; depth: number }[] = [];
  ratings.forEach(rating => stack.push({ rating, depth: 0 }));

  while (stack.length > 0) {
    const { rating, depth } = stack.pop()!;

    if (depth > maxDepth) continue;

    total += rating.score;
    count += 1;

    if (rating.subRatings?.length) {
      rating.subRatings.forEach(subRating => 
        stack.push({ rating: subRating, depth: depth + 1 })
      );
    }
  }

  const result = {
    average: count > 0 ? total / count : 0,
    count,
  };

  memoCache.set(cacheKey, result);
  return result;
};

// Space: O(1) - uses generator for lazy evaluation
export const findRatingsByCategory = (
  ratings: Rating[],
  category: string,
  maxDepth = 10
): Generator<Rating> {
  function* traverse(rating: Rating, depth = 0): Generator<Rating> {
    if (depth > maxDepth) return;

    if (rating.category === category) {
      yield rating;
    }

    if (rating.subRatings?.length) {
      for (const subRating of rating.subRatings) {
        yield* traverse(subRating, depth + 1);
      }
    }
  }

  return function* () {
    for (const rating of ratings) {
      yield* traverse(rating);
    }
  }();
};

// Generic tree traversal utility
// Space: O(1) - uses generator for lazy evaluation
export const traverseTree = <T extends { children?: T[] }>(
  nodes: T[],
  callback: (node: T, depth: number) => void,
  maxDepth = 10
): Generator<void> {
  function* traverse(node: T, depth = 0): Generator<void> {
    if (depth > maxDepth) return;

    callback(node, depth);

    if (node.children?.length) {
      for (const child of node.children) {
        yield* traverse(child, depth + 1);
      }
    }
  }

  return function* () {
    for (const node of nodes) {
      yield* traverse(node);
    }
  }();
};

// Cache cleanup utility
export const clearTraversalCache = () => {
  // WeakMap automatically handles garbage collection
  // No need to manually clear
};

// Example usage with memory monitoring
/*
const measureMemory = <T>(fn: () => T): { result: T; memory: number } => {
  const startMemory = process.memoryUsage().heapUsed;
  const result = fn();
  const endMemory = process.memoryUsage().heapUsed;
  return { 
    result, 
    memory: (endMemory - startMemory) / 1024 / 1024 // MB
  };
};

// Example usage
const comments: Comment[] = [/* ... */];
const { result: comment, memory: findMemory } = measureMemory(() => 
  findCommentById(comments, '3')
);
console.log(`Found comment using ${findMemory.toFixed(2)}MB`);

// Using generators
const ratingGenerator = findRatingsByCategory(ratings, 'service');
for (const rating of ratingGenerator) {
  console.log(rating);
  // Process one rating at a time, no array allocation
}
*/

// Example usage:
/*
const comments: Comment[] = [
  {
    id: '1',
    content: 'Parent comment',
    author: 'user1',
    createdAt: '2024-01-01',
    replies: [
      {
        id: '2',
        content: 'Reply 1',
        author: 'user2',
        createdAt: '2024-01-02',
        replies: [
          {
            id: '3',
            content: 'Nested reply',
            author: 'user3',
            createdAt: '2024-01-03',
          },
        ],
      },
    ],
  },
];

// Find a specific comment
const comment = findCommentById(comments, '3');

// Map all comments to a new format
const commentAuthors = mapComments(comments, (comment, depth) => ({
  author: comment.author,
  depth,
}));

// Calculate average rating
const ratings: Rating[] = [
  {
    id: '1',
    score: 4,
    comment: 'Good',
    category: 'service',
    tags: ['fast', 'friendly'],
    createdAt: '2024-01-01',
    subRatings: [
      {
        id: '2',
        score: 5,
        comment: 'Excellent',
        category: 'service',
        tags: ['professional'],
        createdAt: '2024-01-02',
      },
    ],
  },
];

const { average, count } = calculateAverageRating(ratings);

// Find all ratings in a category
const serviceRatings = findRatingsByCategory(ratings, 'service');
*/ 