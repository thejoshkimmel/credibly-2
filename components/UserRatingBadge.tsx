import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle2 } from 'lucide-react';

interface UserRatingBadgeProps {
  rating: number;
  isVerified: boolean;
  className?: string;
}

export function UserRatingBadge({ rating, isVerified, className = '' }: UserRatingBadgeProps) {
  // Calculate badge type based on rating and verification
  const getBadgeType = () => {
    if (rating >= 4 && isVerified) {
      return {
        label: 'Verified Top Performer',
        variant: 'success' as const,
        icon: <CheckCircle2 className="w-4 h-4 mr-1" />,
      };
    }
    if (rating >= 4) {
      return {
        label: 'Top Performer',
        variant: 'default' as const,
        icon: <Star className="w-4 h-4 mr-1" />,
      };
    }
    if (isVerified) {
      return {
        label: 'Verified',
        variant: 'secondary' as const,
        icon: <CheckCircle2 className="w-4 h-4 mr-1" />,
      };
    }
    return null;
  };

  const badgeType = getBadgeType();

  if (!badgeType) return null;

  return (
    <Badge variant={badgeType.variant} className={`flex items-center gap-1 ${className}`}>
      {badgeType.icon}
      {badgeType.label}
    </Badge>
  );
}

// Example usage:
/*
<UserRatingBadge 
  rating={4.5} 
  isVerified={true} 
  className="mt-2"
/>
*/
