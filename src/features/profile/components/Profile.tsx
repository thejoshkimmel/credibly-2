import React from 'react';
import { styles } from '@/lib/styles/common';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    stats: {
      ratings: number;
      reviews: number;
      followers: number;
    };
  };
  recentActivity: {
    id: string;
    type: string;
    description: string;
    date: string;
  }[];
  onEdit?: () => void;
}

export function Profile({ user, recentActivity, onEdit }: ProfileProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={styles.page.profile.container}>
      {/* Header */}
      <div className={styles.page.profile.header}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className={`${styles.button.base} ${styles.button.primary}`}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.page.profile.main}>
        {/* Stats */}
        <div className={styles.page.profile.stats}>
          <div className={styles.card.base}>
            <div className={styles.card.header}>
              <h3 className={styles.card.title}>Ratings</h3>
            </div>
            <div className={styles.card.content}>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {user.stats.ratings}
              </div>
            </div>
          </div>

          <div className={styles.card.base}>
            <div className={styles.card.header}>
              <h3 className={styles.card.title}>Reviews</h3>
            </div>
            <div className={styles.card.content}>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {user.stats.reviews}
              </div>
            </div>
          </div>

          <div className={styles.card.base}>
            <div className={styles.card.header}>
              <h3 className={styles.card.title}>Followers</h3>
            </div>
            <div className={styles.card.content}>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {user.stats.followers}
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className={styles.page.profile.activity}>
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
      </div>

      {/* Sidebar */}
      <div className={styles.page.profile.sidebar}>
        {/* Settings */}
        <div className={styles.page.profile.settings}>
          <div className={styles.card.header}>
            <h2 className={styles.card.title}>Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Notifications</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="sr-only">Enable email notifications</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Profile Visibility</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="sr-only">Enable profile visibility</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 