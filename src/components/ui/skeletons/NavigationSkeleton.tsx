
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const NavigationSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("flex items-center justify-between p-4", className)}>
    <Skeleton className="h-8 w-32" />
    
    <div className="hidden md:flex items-center gap-6">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-5 w-20" />
      ))}
    </div>
    
    <Skeleton className="h-10 w-32" />
  </div>
);

export default NavigationSkeleton;
