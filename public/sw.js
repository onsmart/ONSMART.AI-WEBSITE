
// Import modules
import { CACHE_CONFIG, CRITICAL_ASSETS } from './sw-config.js';
import { handleRequest } from './sw-request-handler.js';
import { handleBackgroundSync } from './sw-sync-handlers.js';
import { handleMessage } from './sw-message-handlers.js';

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_CONFIG.STATIC_CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_CONFIG.STATIC_CACHE_NAME && 
                cacheName !== CACHE_CONFIG.DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_CONFIG.CACHE_NAME) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - optimized strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (except fonts and APIs we control)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  // Não interceptar: painel de marketing, APIs e tRPC — evita "Failed to fetch" / respostas corrompidas
  const path = url.pathname;
  if (
    path.startsWith('/api/') ||
    path.startsWith('/marketing') ||
    path.includes('/trpc')
  ) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Background Sync
self.addEventListener('sync', handleBackgroundSync);

// Message handling
self.addEventListener('message', handleMessage);

// Error handling
self.addEventListener('error', (event) => {
  console.error('SW: Error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('SW: Unhandled rejection:', event.reason);
});
