import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { styles } from '@/lib/styles/common';

interface Metric {
  id: string;
  title: string;
  value: number;
  trend: number;
  chart?: React.ReactNode;
}

interface MetricsDashboardProps {
  metrics: Metric[];
}

export function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  return (
    <div className={styles.metrics.container}>
      {metrics.map((metric) => (
        <div key={metric.id} className={styles.metrics.card}>
          <div className={styles.metrics.header}>
            <h3 className={styles.metrics.title}>{metric.title}</h3>
            <div className={styles.metrics.trend}>
              {metric.trend > 0 ? (
                <span className={styles.metrics.trendUp}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metric.trend}%
                </span>
              ) : (
                <span className={styles.metrics.trendDown}>
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {Math.abs(metric.trend)}%
                </span>
              )}
            </div>
          </div>

          <div className={styles.metrics.value}>
            {metric.value.toLocaleString()}
          </div>

          {metric.chart && (
            <div className={styles.metrics.chart}>
              {metric.chart}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 