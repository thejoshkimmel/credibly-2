import React from 'react';
import { styles } from '@/lib/styles/common';

interface FeedItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  author: string;
  tags: string[];
}

interface FeedGridProps {
  items: FeedItem[];
}

export function FeedGrid({ items }: FeedGridProps) {
  return (
    <div className={styles.feed.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.feed.card}>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className={styles.feed.image}
            />
          )}

          <div className={styles.feed.content}>
            <h3 className={styles.feed.title}>{item.title}</h3>
            <p className={styles.feed.description}>{item.description}</p>
          </div>

          <div className={styles.feed.meta}>
            <span>{item.author}</span>
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString()}
            </time>
          </div>

          {item.tags.length > 0 && (
            <div className={styles.feed.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.feed.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 