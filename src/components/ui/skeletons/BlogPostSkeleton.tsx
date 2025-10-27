
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const BlogPostSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn("space-y-6", className)}>
    <div className="space-y-4">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-12 w-full" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
    
    <Skeleton className="aspect-video w-full rounded-xl" />
    
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-16" />
      ))}
    </div>
    
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i % 3 === 0 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  </div>
);

export default BlogPostSkeleton;
