
import { CACHE_CONFIG, CACHE_STRATEGIES, CACHE_TTL } from './sw-optimized-config.js';
import { 
  cacheFirstWithTTL, 
  staleWhileRevalidateWithTTL, 
  networkFirstWithTTL, 
  networkFirstWithFallback, 
  cacheFirstPermanent 
} from './sw-optimized-strategies.js';

export async function handleOptimizedRequest(request, url) {
  try {
    // Estratégia para imagens - Cache First com TTL longo
    if (request.destination === 'image') {
      return await cacheFirstWithTTL(request, CACHE_CONFIG.STATIC_CACHE_NAME, CACHE_TTL.IMAGES);
    }

    // Estratégia para CSS/JS - Stale While Revalidate
    if (request.destination === 'script' || request.destination === 'style') {
      return await staleWhileRevalidateWithTTL(request, CACHE_CONFIG.STATIC_CACHE_NAME, CACHE_TTL.STATIC);
    }

    // Estratégia para APIs - Network First com cache curto
    if (url.pathname.includes('/api/') || url.pathname.includes('emailjs')) {
      return await networkFirstWithTTL(request, CACHE_CONFIG.API_CACHE_NAME, CACHE_TTL.API);
    }

    // Estratégia para páginas críticas - Network First com fallback
    if (CACHE_STRATEGIES.CRITICAL.some(critical => url.pathname === critical || url.pathname.startsWith(critical))) {
      return await networkFirstWithFallback(request, CACHE_CONFIG.DYNAMIC_CACHE_NAME);
    }

    // Estratégia para Google Fonts - Cache First permanente
    if (CACHE_STRATEGIES.FONTS.some(font => url.href.includes(font))) {
      return await cacheFirstPermanent(request, CACHE_CONFIG.STATIC_CACHE_NAME);
    }

    // Default: Network First com cache dinâmico
    return await networkFirstWithTTL(request, CACHE_CONFIG.DYNAMIC_CACHE_NAME, CACHE_TTL.DYNAMIC);

  } catch (error) {
    console.error('SW: Fetch error:', error);
    return await handleFallback(request);
  }
}

// Fallback handler
async function handleFallback(request) {
  if (request.destination === 'document') {
    const cache = await caches.open(CACHE_CONFIG.STATIC_CACHE_NAME);
    return await cache.match('/') || new Response('App offline', { status: 503 });
  }
  throw new Error('No fallback available');
}
