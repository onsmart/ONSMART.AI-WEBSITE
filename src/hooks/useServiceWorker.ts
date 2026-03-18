
import { useEffect } from 'react';

interface ServiceWorkerConfig {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useServiceWorker = (config?: ServiceWorkerConfig) => {
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      registerServiceWorker(config);
    }
  }, [config]);
};

const registerServiceWorker = async (config?: ServiceWorkerConfig) => {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
      type: 'module'
    });

    console.log('SW: Registered successfully', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('SW: New version available');
          config?.onUpdate?.();
          
          // Auto-skip waiting for better UX
          newWorker.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    });

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('SW: Controller changed, reloading page');
      window.location.reload();
    });

    // Success callback
    if (registration.active) {
      config?.onSuccess?.();
    }

    // Prefetch critical routes
    const criticalRoutes = ['/diagnostico', '/contato', '/servicos'];
    registration.active?.postMessage({
      type: 'CACHE_URLS',
      payload: { urls: criticalRoutes }
    });

  } catch (error) {
    console.error('SW: Registration failed:', error);
    config?.onError?.(error as Error);
  }
};
