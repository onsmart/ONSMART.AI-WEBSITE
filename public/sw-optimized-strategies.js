
import { CacheManager } from './sw-optimized-cache-manager.js';

// Cache First com TTL
export async function cacheFirstWithTTL(request, cacheName, ttl) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !await CacheManager.isExpired(cachedResponse, ttl)) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate com TTL
export async function staleWhileRevalidateWithTTL(request, cacheName, ttl) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  // Se cache não existe ou está expirado, esperar network
  if (!cachedResponse || await CacheManager.isExpired(cachedResponse, ttl)) {
    return fetchPromise;
  }

  // Se cache existe e é válido, retornar cache e atualizar em background
  fetchPromise.catch(() => {}); // Prevent unhandled rejection
  return cachedResponse;
}

// Network First com TTL
export async function networkFirstWithTTL(request, cacheName, ttl) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse && !await CacheManager.isExpired(cachedResponse, ttl)) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Network First com fallback
export async function networkFirstWithFallback(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para página offline personalizada
    if (request.destination === 'document') {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head><title>onsmartAI - Offline</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>Você está offline</h1>
            <p>Verifique sua conexão e tente novamente.</p>
            <button onclick="window.location.reload()">Tentar Novamente</button>
          </body>
        </html>
      `, {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    throw error;
  }
}

// Cache First permanente (para fonts)
export async function cacheFirstPermanent(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}
