
import React, { Suspense, lazy } from 'react';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

// Lazy load components with better chunking
const DiagnosticoHero = lazy(() => 
  import('./DiagnosticoHero').then(module => ({ default: module.default }))
);

const DiagnosticoBenefits = lazy(() => 
  import('./DiagnosticoBenefits').then(module => ({ default: module.default }))
);

const DiagnosticoServices = lazy(() => 
  import('./DiagnosticoServices').then(module => ({ default: module.default }))
);

const DiagnosticoForm = lazy(() => 
  import('./DiagnosticoForm').then(module => ({ default: module.default }))
);

interface BundleOptimizerProps {
  children: React.ReactNode;
}

const BundleOptimizer: React.FC<BundleOptimizerProps> = ({ children }) => {
  return (
    <Suspense 
      fallback={
        <div className="space-y-8">
          <LoadingSkeleton variant="card" className="h-64" />
          <LoadingSkeleton variant="card" className="h-48" />
          <LoadingSkeleton variant="card" className="h-96" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

// Preload components on hover for better UX
export const preloadDiagnosticoComponents = () => {
  const components = [
    () => import('./DiagnosticoHero'),
    () => import('./DiagnosticoBenefits'),
    () => import('./DiagnosticoServices'),
    () => import('./DiagnosticoForm')
  ];

  components.forEach(importFn => {
    importFn().catch(() => {
      // Silent fail - components will load normally if preload fails
    });
  });
};

export default BundleOptimizer;
export { DiagnosticoHero, DiagnosticoBenefits, DiagnosticoServices, DiagnosticoForm };
