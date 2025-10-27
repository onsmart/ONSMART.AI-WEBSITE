
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface VirtualScrollProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  estimatedItemHeight?: number;
}

function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
  onScroll,
  estimatedItemHeight
}: VirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  const visibleStart = useMemo(() => {
    return Math.floor(scrollTop / itemHeight);
  }, [scrollTop, itemHeight]);

  const visibleEnd = useMemo(() => {
    return Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );
  }, [visibleStart, containerHeight, itemHeight, items.length]);

  const startIndex = useMemo(() => {
    return Math.max(0, visibleStart - overscan);
  }, [visibleStart, overscan]);

  const endIndex = useMemo(() => {
    return Math.min(items.length - 1, visibleEnd + overscan);
  }, [visibleEnd, overscan, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  const offsetY = useMemo(() => {
    return startIndex * itemHeight;
  }, [startIndex, itemHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  // Smooth scrolling methods
  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (scrollElementRef.current) {
      const targetScrollTop = index * itemHeight;
      scrollElementRef.current.scrollTo({
        top: targetScrollTop,
        behavior
      });
    }
  }, [itemHeight]);

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    scrollToIndex(0, behavior);
  }, [scrollToIndex]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    scrollToIndex(items.length - 1, behavior);
  }, [scrollToIndex, items.length]);

  // Expose scroll methods via ref
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).scrollToIndex = scrollToIndex;
      (containerRef.current as any).scrollToTop = scrollToTop;
      (containerRef.current as any).scrollToBottom = scrollToBottom;
    }
  }, [scrollToIndex, scrollToTop, scrollToBottom]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{ height: containerHeight }}
    >
      <div
        ref={scrollElementRef}
        className="w-full h-full overflow-auto"
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, index) => (
              <div
                key={startIndex + index}
                style={{
                  height: estimatedItemHeight || itemHeight,
                  overflow: 'hidden'
                }}
              >
                {renderItem(item, startIndex + index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualScroll;
