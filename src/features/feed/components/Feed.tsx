import React from 'react';
import { Star } from 'lucide-react';

interface FeedItem {
  id: string;
  username: string;
  comment: string;
  score: number;
  timestamp: Date;
}

interface FeedProps {
  items: FeedItem[];
}

export function Feed({ items }: FeedProps) {
  return (
    <section className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm p-4 space-y-2"
        >
          <h3 className="font-medium text-gray-900">{item.username}</h3>
          <p className="text-gray-700">{item.comment}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">
                Score: {item.score}/10
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

// Example usage:
/*
const sampleItems: FeedItem[] = [
  {
    id: '1',
    username: 'John Doe',
    comment: 'Great experience working with this user!',
    score: 8,
    timestamp: new Date()
  },
  {
    id: '2',
    username: 'Jane Smith',
    comment: 'Very professional and reliable.',
    score: 9,
    timestamp: new Date()
  },
  {
    id: '3',
    username: 'Mike Johnson',
    comment: 'Excellent communication skills.',
    score: 7,
    timestamp: new Date()
  }
];

<Feed items={sampleItems} />
*/ 