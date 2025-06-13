import React from 'react';
import { styles } from '@/lib/styles/common';

interface HeroProps {
  headline: string;
  subheadline?: string;
  children?: React.ReactNode;
}

export function Hero({ headline, subheadline, children }: HeroProps) {
  return (
    <div className={styles.hero.container}>
      <div className={styles.container}>
        <h1 className={styles.hero.headline}>{headline}</h1>
        {subheadline && (
          <p className={styles.hero.subheadline}>{subheadline}</p>
        )}
        {children}
      </div>
    </div>
  );
} 