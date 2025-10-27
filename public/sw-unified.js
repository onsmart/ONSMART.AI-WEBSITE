
// Unified and optimized service worker
const CACHE_VERSION = 'v5';
const CACHE_NAMES = {
  STATIC: `static-${CACHE_VERSION}`,
  DYNAMIC: `dynamic-${CACHE_VERSION}`,
  API: `api-${CACHE_VERSION}`
};

const CRITICAL_ASSETS = [
  '/',
  '/diagnostico',
  '/contato',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

// Install - cache only critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAMES.STATIC)
      .then(cache => cache.addAll(CRITICAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches efficiently
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const deletePromises = cacheNames
          .filter(name => !Object.values(CACHE_NAMES).includes(name))
          .map(name => caches.delete(name));
        return Promise.all(deletePromises);
      })
      .then(() => self.clients.claim())
  );
});

// Simplified fetch strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  if (request.method !== 'GET') return;
  
  event.respondWith(handleRequest(request, url));
});

async function handleRequest(request, url) {
  try {
    // Strategy for static assets (JS/CSS/Images)
    if (request.destination === 'script' || 
        request.destination === 'style' || 
        request.destination === 'image') {
      return await cacheFirst(request, CACHE_NAMES.STATIC);
    }
    
    // Strategy for API calls
    if (url.pathname.includes('/api/')) {
      return await networkFirst(request, CACHE_NAMES.API);
    }
    
    // Strategy for pages
    return await networkFirst(request, CACHE_NAMES.DYNAMIC);
    
  } catch (error) {
    // Simple fallback
    if (request.destination === 'document') {
      const cache = await caches.open(CACHE_NAMES.STATIC);
      return await cache.match('/') || new Response('Offline', { status: 503 });
    }
    throw error;
  }
}

// Simplified cache strategies
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) return cached;
  
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    return cached || Promise.reject(error);
  }
}
