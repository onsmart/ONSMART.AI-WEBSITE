
import { CACHE_CONFIG, CRITICAL_ASSETS, DYNAMIC_ROUTES } from './sw-config.js';
import { cacheFirst, networkFirst, staleWhileRevalidate } from './sw-cache-strategies.js';

export async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy for images: Cache First
    if (request.destination === 'image') {
      return await cacheFirst(request, CACHE_CONFIG.STATIC_CACHE_NAME);
    }

    // Strategy for CSS/JS: Stale While Revalidate
    if (request.destination === 'script' || request.destination === 'style') {
      return await staleWhileRevalidate(request, CACHE_CONFIG.STATIC_CACHE_NAME);
    }

    // Strategy for critical pages: Network First with fallback
    if (CRITICAL_ASSETS.some(asset => url.pathname === asset || url.pathname.startsWith(asset))) {
      return await networkFirst(request, CACHE_CONFIG.DYNAMIC_CACHE_NAME);
    }

    // Strategy for dynamic routes: Network First
    if (DYNAMIC_ROUTES.some(route => url.pathname.startsWith(route))) {
      return await networkFirst(request, CACHE_CONFIG.DYNAMIC_CACHE_NAME);
    }

    // Strategy for Google Fonts: Cache First with long duration
    if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
      return await cacheFirst(request, CACHE_CONFIG.STATIC_CACHE_NAME);
    }

    // Default: Network First
    return await networkFirst(request, CACHE_CONFIG.DYNAMIC_CACHE_NAME);

  } catch (error) {
    console.error('SW: Fetch error:', error);
    
    // Fallback for navigation
    if (request.destination === 'document') {
      const cachedResponse = await caches.match('/');
      return cachedResponse || new Response('App offline', { status: 503 });
    }
    
    throw error;
  }
}
