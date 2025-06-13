import React from 'react';
import { styles } from '@/lib/styles/common';

interface DashboardProps {
  stats: {
    totalRatings: number;
    averageRating: number;
    totalReviews: number;
    activeUsers: number;
  };
  recentActivity: {
    id: string;
    type: string;
    description: string;
    date: string;
  }[];
}

export function Dashboard({ stats, recentActivity }: DashboardProps) {
  return (
    <div className={styles.page.dashboard.container}>
      {/* Header */}
      <div className={styles.page.dashboard.header}>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className={`${styles.button.base} ${styles.button.primary}`}>
          New Rating
        </button>
      </div>

      {/* Stats Grid */}
      <div className={styles.page.dashboard.stats}>
        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Total Ratings</h3>
          </div>
          <div className={styles.card.content}>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {stats.totalRatings}
            </div>
          </div>
        </div>

        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Average Rating</h3>
          </div>
          <div className={styles.card.content}>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {stats.averageRating.toFixed(1)}
            </div>
          </div>
        </div>

        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Total Reviews</h3>
          </div>
          <div className={styles.card.content}>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {stats.totalReviews}
            </div>
          </div>
        </div>

        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Active Users</h3>
          </div>
          <div className={styles.card.content}>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {stats.activeUsers}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.page.dashboard.chart}>
        <div className={styles.card.header}>
          <h2 className={styles.card.title}>Rating Trends</h2>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          Chart Placeholder
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.page.dashboard.recent}>
        <div className={styles.card.header}>
          <h2 className={styles.card.title}>Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <div className={styles.page.dashboard.activity}>
        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Top Rated</h3>
          </div>
          <div className={styles.card.content}>
            {/* Add content */}
          </div>
        </div>

        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Most Reviewed</h3>
          </div>
          <div className={styles.card.content}>
            {/* Add content */}
          </div>
        </div>

        <div className={styles.card.base}>
          <div className={styles.card.header}>
            <h3 className={styles.card.title}>Trending</h3>
          </div>
          <div className={styles.card.content}>
            {/* Add content */}
          </div>
        </div>
      </div>
    </div>
  );
} 