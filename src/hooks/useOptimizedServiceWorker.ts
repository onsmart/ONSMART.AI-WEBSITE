
import { useEffect } from 'react';

interface OptimizedSWConfig {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useOptimizedServiceWorker = (config?: OptimizedSWConfig) => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      registerOptimizedSW(config);
    }
  }, [config]);
};

const registerOptimizedSW = async (config?: OptimizedSWConfig) => {
  try {
    const registration = await navigator.serviceWorker.register('/sw-unified.js', {
      scope: '/',
      updateViaCache: 'none'
    });

    console.log('SW: Registered unified service worker');

    // Simplified update handling
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          config?.onUpdate?.();
        }
      });
    });

    // Success callback
    if (registration.active) {
      config?.onSuccess?.();
    }

  } catch (error) {
    console.error('SW: Registration failed:', error);
    config?.onError?.(error as Error);
  }
};
