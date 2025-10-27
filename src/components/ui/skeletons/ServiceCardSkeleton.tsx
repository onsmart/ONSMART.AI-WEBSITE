
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const ServiceCardSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("p-6 border rounded-lg space-y-4", className)}>
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export default ServiceCardSkeleton;
