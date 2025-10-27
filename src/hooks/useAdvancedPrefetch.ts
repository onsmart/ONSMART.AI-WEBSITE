
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface AdvancedPrefetchOptions {
  enabled?: boolean;
  strategy?: 'immediate' | 'onHover' | 'onVisible' | 'onIdle';
  priority?: 'high' | 'medium' | 'low';
  routes?: string[];
}

const CRITICAL_ROUTES_MAP = {
  '/': ['/diagnostico', '/contato'],
  '/diagnostico': ['/contato', '/servicos'],
  '/contato': ['/diagnostico', '/case-de-sucesso'],
  '/servicos': ['/contato', '/case-de-sucesso'],
  '/case-de-sucesso': ['/contato', '/servicos']
};

export const useAdvancedPrefetch = (options: AdvancedPrefetchOptions = {}) => {
  const location = useLocation();
  const { 
    enabled = true, 
    strategy = 'onIdle',
    priority = 'medium',
    routes = CRITICAL_ROUTES_MAP[location.pathname as keyof typeof CRITICAL_ROUTES_MAP] || []
  } = options;

  const prefetchRoute = useCallback((route: string, fetchPriority: string = 'low') => {
    // Verificar se já foi prefetched
    const cacheKey = `prefetch_${route}`;
    if (sessionStorage.getItem(cacheKey)) return;

    try {
      // Prefetch DNS
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = window.location.origin;
      document.head.appendChild(dnsPrefetch);

      // Prefetch da rota
      const routePrefetch = document.createElement('link');
      routePrefetch.rel = 'prefetch';
      routePrefetch.href = route;
      routePrefetch.as = 'document';
      
      if (fetchPriority === 'high') {
        routePrefetch.setAttribute('fetchpriority', 'high');
      }

      document.head.appendChild(routePrefetch);
      
      // Marcar como prefetched
      sessionStorage.setItem(cacheKey, Date.now().toString());
      
      console.log(`Advanced prefetch: ${route} (priority: ${fetchPriority})`);
    } catch (error) {
      console.warn('Prefetch failed:', route, error);
    }
  }, []);

  const setupHoverPrefetch = useCallback(() => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && routes.includes(href)) {
        const handleMouseEnter = () => {
          prefetchRoute(href, 'high');
        };
        
        link.addEventListener('mouseenter', handleMouseEnter, { once: true });
        link.addEventListener('focus', handleMouseEnter, { once: true });
      }
    });
  }, [routes, prefetchRoute]);

  const setupIntersectionPrefetch = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const route = entry.target.getAttribute('data-prefetch-route');
            if (route) {
              prefetchRoute(route, priority);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-prefetch-route]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefetchRoute, priority]);

  useEffect(() => {
    if (!enabled) return;

    const executeStrategy = () => {
      switch (strategy) {
        case 'immediate':
          routes.forEach(route => prefetchRoute(route, 'high'));
          break;

        case 'onHover':
          setupHoverPrefetch();
          break;

        case 'onVisible':
          return setupIntersectionPrefetch();

        case 'onIdle':
        default:
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
              routes.forEach(route => prefetchRoute(route, priority));
            });
          } else {
            setTimeout(() => {
              routes.forEach(route => prefetchRoute(route, priority));
            }, 2000);
          }
          break;
      }
    };

    const cleanup = executeStrategy();
    return cleanup;
  }, [location.pathname, enabled, strategy, routes, priority, prefetchRoute, setupHoverPrefetch, setupIntersectionPrefetch]);

  return { prefetchRoute };
};
