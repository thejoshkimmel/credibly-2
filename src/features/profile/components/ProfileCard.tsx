import React from 'react';
import { styles } from '@/lib/styles/common';

interface ProfileCardProps {
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
  onEdit?: () => void;
  onLogout?: () => void;
}

export function ProfileCard({ user, onEdit, onLogout }: ProfileCardProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={styles.profileCard.container}>
      <div className={styles.profileCard.header}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className={styles.profileCard.avatar}>
            {initials}
          </div>
        )}
        <div>
          <h2 className={styles.profileCard.name}>{user.name}</h2>
          <p className={styles.profileCard.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.profileCard.stats}>
        <div className={styles.profileCard.stat}>
          <div className={styles.profileCard.statValue}>{user.stats.ratings}</div>
          <div className={styles.profileCard.statLabel}>Ratings</div>
        </div>
        <div className={styles.profileCard.stat}>
          <div className={styles.profileCard.statValue}>{user.stats.reviews}</div>
          <div className={styles.profileCard.statLabel}>Reviews</div>
        </div>
        <div className={styles.profileCard.stat}>
          <div className={styles.profileCard.statValue}>{user.stats.followers}</div>
          <div className={styles.profileCard.statLabel}>Followers</div>
        </div>
      </div>

      <div className={styles.profileCard.actions}>
        {onEdit && (
          <button
            onClick={onEdit}
            className={`${styles.button.base} ${styles.button.primary}`}
          >
            Edit Profile
          </button>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className={`${styles.button.base} ${styles.button.secondary}`}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
} 