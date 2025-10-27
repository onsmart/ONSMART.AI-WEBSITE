
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const DiagnosticFormSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("space-y-6", className)}>
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-2 w-full" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
    
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-12 w-full" />
    </div>
    
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-24 w-full" />
    </div>
    
    <div className="flex justify-between">
      <Skeleton className="h-12 w-24" />
      <Skeleton className="h-12 w-32" />
    </div>
  </div>
);

export default DiagnosticFormSkeleton;
