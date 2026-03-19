
// Cache First Strategy
export async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    try {
      await cache.put(request, networkResponse.clone());
    } catch (e) {
      console.warn('SW: cacheFirst put failed', e);
    }
  }
  return networkResponse;
}

// Network First Strategy
export async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      try {
        await cache.put(request, networkResponse.clone());
      } catch (e) {
        console.warn('SW: networkFirst put failed', e);
      }
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

/**
 * Stale-while-revalidate: devolve cache imediatamente se existir; atualiza cache em background.
 * Clona a resposta de rede ANTES de qualquer await no put para evitar "Response body is already used".
 */
export async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const revalidate = async () => {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const toStore = networkResponse.clone();
      try {
        await cache.put(request, toStore);
      } catch (e) {
        console.warn('SW: staleWhileRevalidate put failed', e);
      }
    }
    return networkResponse;
  };

  if (cachedResponse) {
    revalidate().catch(() => {});
    return cachedResponse;
  }

  return revalidate();
}
