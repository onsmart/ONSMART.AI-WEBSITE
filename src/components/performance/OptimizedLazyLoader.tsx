
import React, { Suspense, lazy, ComponentType } from 'react';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface LazyComponentOptions {
  fallback?: React.ReactNode;
  delay?: number;
  chunkName?: string;
}

// Simplified lazy loading with better chunking - removed forwardRef to fix TypeScript issues
export const createOptimizedLazy = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {}
) => {
  const LazyComponent = lazy(() => {
    // Add artificial delay only in development for testing
    if (process.env.NODE_ENV === 'development' && options.delay) {
      return new Promise<{ default: T }>(resolve => 
        setTimeout(() => resolve(importFn()), options.delay)
      );
    }
    return importFn();
  });

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={options.fallback || <LoadingSkeleton variant="card" />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Pre-built optimized lazy components for critical paths
export const OptimizedNavbar = createOptimizedLazy(
  () => import('@/components/navbar/Navbar'),
  { fallback: <LoadingSkeleton variant="card" className="h-16" /> }
);

export const OptimizedFooter = createOptimizedLazy(
  () => import('@/components/Footer'),
  { fallback: <LoadingSkeleton variant="card" className="h-32" /> }
);

export const OptimizedDiagnosticoForm = createOptimizedLazy(
  () => import('@/components/diagnostico/DiagnosticoForm'),
  { fallback: <LoadingSkeleton variant="card" /> }
);

export const OptimizedFloatingWhatsapp = createOptimizedLazy(
  () => import('@/components/contact/FloatingWhatsappButton'),
  { fallback: null }
);
