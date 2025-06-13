import React from 'react';
import { styles } from '@/lib/styles/common';

interface Profile {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  stats: {
    ratings: number;
    reviews: number;
    followers: number;
  };
}

interface ProfileGridProps {
  profiles: Profile[];
}

export function ProfileGrid({ profiles }: ProfileGridProps) {
  return (
    <div className={styles.profileGrid.container}>
      {profiles.map((profile) => {
        const initials = profile.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();

        return (
          <div key={profile.id} className={styles.profileGrid.card}>
            <div className={styles.profileGrid.header}>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={styles.profileGrid.avatar}>
                  {initials}
                </div>
              )}
              <div className={styles.profileGrid.info}>
                <h3 className={styles.profileGrid.name}>{profile.name}</h3>
                <p className={styles.profileGrid.title}>{profile.title}</p>
              </div>
            </div>

            <div className={styles.profileGrid.stats}>
              <div className={styles.profileGrid.stat}>
                <div className={styles.profileGrid.statValue}>
                  {profile.stats.ratings}
                </div>
                <div className={styles.profileGrid.statLabel}>Ratings</div>
              </div>
              <div className={styles.profileGrid.stat}>
                <div className={styles.profileGrid.statValue}>
                  {profile.stats.reviews}
                </div>
                <div className={styles.profileGrid.statLabel}>Reviews</div>
              </div>
              <div className={styles.profileGrid.stat}>
                <div className={styles.profileGrid.statValue}>
                  {profile.stats.followers}
                </div>
                <div className={styles.profileGrid.statLabel}>Followers</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 