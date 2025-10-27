
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const TestimonialSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("p-6 border rounded-lg space-y-4", className)}>
    <div className="flex items-start gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-4" />
        ))}
      </div>
    </div>
    
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

export default TestimonialSkeleton;
