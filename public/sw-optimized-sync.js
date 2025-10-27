
import { CACHE_CONFIG, CACHE_TTL } from './sw-optimized-config.js';
import { CacheManager } from './sw-optimized-cache-manager.js';

export function handleBackgroundSync(event) {
  console.log('SW: Background sync:', event.tag);
  
  if (event.tag === 'cleanup-cache') {
    event.waitUntil(performCacheCleanup());
  }
}

export async function performCacheCleanup() {
  console.log('SW: Performing background cache cleanup...');
  
  await Promise.all([
    CacheManager.cleanExpiredCache(CACHE_CONFIG.DYNAMIC_CACHE_NAME, CACHE_TTL.DYNAMIC),
    CacheManager.cleanExpiredCache(CACHE_CONFIG.API_CACHE_NAME, CACHE_TTL.API)
  ]);
  
  console.log('SW: Cache cleanup completed');
}

// Periodic cleanup setup
export function setupPeriodicCleanup() {
  setInterval(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('cleanup-cache');
      });
    }
  }, 60 * 60 * 1000); // Cleanup a cada hora
}
