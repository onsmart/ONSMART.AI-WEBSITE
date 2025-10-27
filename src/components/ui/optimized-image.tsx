
import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized srcSet with different formats
  const generateSrcSet = useCallback((baseSrc: string, format: 'webp' | 'avif' | 'original') => {
    const extension = format === 'original' ? '' : `.${format}`;
    const qualityParam = `?q=${quality}`;
    
    const breakpoints = [640, 768, 1024, 1280, 1536];
    
    return breakpoints
      .map(bp => `${baseSrc}${extension}${qualityParam}&w=${bp} ${bp}w`)
      .join(', ');
  }, [quality]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Base image URL without extension for format variants
  const baseUrl = src.replace(/\.[^/.]+$/, '');

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      <picture>
        {/* AVIF format - best compression */}
        <source
          srcSet={generateSrcSet(baseUrl, 'avif')}
          sizes={sizes}
          type="image/avif"
        />
        
        {/* WebP format - good compression with wide support */}
        <source
          srcSet={generateSrcSet(baseUrl, 'webp')}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src, 'original')}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'hidden'
          )}
        />
      </picture>
      
      {hasError && (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
          <span>Imagem não disponível</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
