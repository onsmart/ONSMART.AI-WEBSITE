
import React, { useMemo, memo } from 'react';
import { lazy } from 'react';
import { ContentItem } from './types';
import { cn } from '@/lib/utils';

// Lazy load do VirtualScroll apenas quando necessário
const VirtualScroll = lazy(() => import('@/components/ui/virtual-scroll'));
const ContentCard = lazy(() => import('./ContentCard'));

interface VirtualizedContentGridProps {
  items: ContentItem[];
  className?: string;
  itemHeight?: number;
  containerHeight?: number;
}

// Memoizar o componente para evitar re-renders desnecessários
const VirtualizedContentGrid: React.FC<VirtualizedContentGridProps> = memo(({
  items,
  className,
  itemHeight = 320,
  containerHeight = 600
}) => {
  const renderContentItem = useMemo(() => 
    (item: ContentItem, index: number) => (
      <div className="px-2 pb-4" key={item.id}>
        <React.Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg" />}>
          <ContentCard item={item} />
        </React.Suspense>
      </div>
    ), []
  );

  // Componente de fallback otimizado
  const EmptyState = memo(() => (
    <div className="flex items-center justify-center h-64 text-gray-500">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
        <p>Nenhum conteúdo encontrado</p>
      </div>
    </div>
  ));

  const GridFallback = memo(() => (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg" />
      ))}
    </div>
  ));

  if (items.length === 0) {
    return <EmptyState />;
  }

  // Use virtual scrolling only for large lists (> 20 items)
  if (items.length <= 20) {
    return (
      <React.Suspense fallback={<GridFallback />}>
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
          {items.map((item) => (
            <React.Suspense key={item.id} fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg" />}>
              <ContentCard item={item} />
            </React.Suspense>
          ))}
        </div>
      </React.Suspense>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <React.Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
        <VirtualScroll
          items={items}
          itemHeight={itemHeight}
          containerHeight={containerHeight}
          renderItem={renderContentItem}
          overscan={3}
          className="w-full border rounded-lg"
        />
      </React.Suspense>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Mostrando {items.length} itens • Scroll otimizado para performance
      </div>
    </div>
  );
});

VirtualizedContentGrid.displayName = 'VirtualizedContentGrid';

export default VirtualizedContentGrid;
