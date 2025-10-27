
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
}

const LoadingSkeleton = ({ className, variant = 'card' }: LoadingSkeletonProps) => {
  switch (variant) {
    case 'card':
      return (
        <div className={cn("space-y-3", className)}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
    
    case 'text':
      return (
        <div className={cn("space-y-2", className)}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      );
    
    case 'avatar':
      return (
        <div className={cn("flex items-center space-x-4", className)}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      );
    
    case 'button':
      return <Skeleton className={cn("h-10 w-[120px]", className)} />;
    
    default:
      return <Skeleton className={className} />;
  }
};

export { LoadingSkeleton };
