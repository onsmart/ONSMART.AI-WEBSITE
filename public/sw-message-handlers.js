
import { CACHE_CONFIG } from './sw-config.js';

export async function cacheUrls(urls) {
  try {
    const cache = await caches.open(CACHE_CONFIG.DYNAMIC_CACHE_NAME);
    await cache.addAll(urls);
    console.log('SW: Cached URLs:', urls);
  } catch (error) {
    console.error('SW: Error caching URLs:', error);
  }
}

export function handleMessage(event) {
  const { type, payload } = event.data || {};
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0]?.postMessage({ version: CACHE_CONFIG.CACHE_NAME });
      break;
      
    case 'CACHE_URLS':
      if (payload?.urls) {
        cacheUrls(payload.urls);
      }
      break;
      
    default:
      console.log('SW: Unknown message type:', type);
  }
}
