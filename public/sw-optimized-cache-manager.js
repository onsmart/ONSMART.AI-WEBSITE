
export class CacheManager {
  static async isExpired(response, ttl) {
    if (!response) return true;
    
    const cachedTime = response.headers.get('sw-cached-time');
    if (!cachedTime) return true;
    
    return Date.now() - parseInt(cachedTime) > ttl;
  }

  static addTimestamp(response) {
    const newResponse = response.clone();
    newResponse.headers.set('sw-cached-time', Date.now().toString());
    return newResponse;
  }

  static async cleanExpiredCache(cacheName, ttl) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (await this.isExpired(response, ttl)) {
        await cache.delete(request);
        console.log('SW: Removed expired cache:', request.url);
      }
    }
  }
}
