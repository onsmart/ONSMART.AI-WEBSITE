
import { useEffect, useState, useCallback } from 'react';

interface UseExitIntentOptions {
  threshold?: number;
  delay?: number;
  onExitIntent?: () => void;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const { threshold = 10, delay = 1000, onExitIntent } = options;
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Detectar movimento do mouse para fora da viewport no topo
    if (e.clientY <= threshold && !hasShown) {
      setIsExitIntent(true);
      setHasShown(true);
      onExitIntent?.();
    }
  }, [threshold, hasShown, onExitIntent]);

  const handleMouseEnter = useCallback(() => {
    setIsExitIntent(false);
  }, []);

  useEffect(() => {
    // Aguardar um tempo antes de ativar o detector
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }, delay);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseLeave, handleMouseEnter, delay]);

  const resetExitIntent = useCallback(() => {
    setIsExitIntent(false);
    setHasShown(false);
  }, []);

  return {
    isExitIntent,
    hasShown,
    resetExitIntent
  };
};
