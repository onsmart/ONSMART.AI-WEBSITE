
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PrefetchOptions {
  enabled?: boolean;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
}

const CRITICAL_ROUTES = [
  '/diagnostico',
  '/contato',
  '/servicos',
  '/case-de-sucesso',
  '/blog'
];

const PREFETCH_STRATEGIES = {
  immediate: ['/diagnostico', '/contato'], // High conversion pages
  onHover: ['/servicos', '/case-de-sucesso'], // Information pages
  onIdle: ['/blog', '/conteudo'], // Content pages
};

export const usePrefetch = (options: PrefetchOptions = {}) => {
  const location = useLocation();
  const { enabled = true, delay = 2000, priority = 'medium' } = options;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefetchRoute = (route: string, strategy: 'immediate' | 'hover' | 'idle' = 'idle') => {
      // Check if route is already cached
      if (sessionStorage.getItem(`prefetched_${route}`)) return;

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      document.head.appendChild(link);
      sessionStorage.setItem(`prefetched_${route}`, 'true');

      // Track prefetch
      console.log(`Prefetched route: ${route} (strategy: ${strategy})`);
    };

    // Immediate prefetch for high-priority routes
    const immediatePrefetch = () => {
      PREFETCH_STRATEGIES.immediate.forEach(route => {
        if (route !== location.pathname) {
          prefetchRoute(route, 'immediate');
        }
      });
    };

    // Hover-based prefetch
    const setupHoverPrefetch = () => {
      const hoverLinks = document.querySelectorAll('a[href]');
      hoverLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && PREFETCH_STRATEGIES.onHover.includes(href)) {
          link.addEventListener('mouseenter', () => {
            prefetchRoute(href, 'hover');
          }, { once: true });
        }
      });
    };

    // Idle prefetch
    const idlePrefetch = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          PREFETCH_STRATEGIES.onIdle.forEach(route => {
            if (route !== location.pathname) {
              prefetchRoute(route, 'idle');
            }
          });
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          PREFETCH_STRATEGIES.onIdle.forEach(route => {
            if (route !== location.pathname) {
              prefetchRoute(route, 'idle');
            }
          });
        }, delay);
      }
    };

    // Execute prefetch strategies
    immediatePrefetch();
    
    const timer = setTimeout(() => {
      setupHoverPrefetch();
      idlePrefetch();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, enabled, delay, priority]);

  const prefetchSpecificRoute = (route: string) => {
    if (!enabled) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';
    document.head.appendChild(link);
    
    console.log(`Manually prefetched: ${route}`);
  };

  return { prefetchSpecificRoute };
};

// Hook for component-level prefetching
export const useComponentPrefetch = (routes: string[], trigger: 'mount' | 'hover' | 'visible' = 'mount') => {
  const { prefetchSpecificRoute } = usePrefetch();

  useEffect(() => {
    if (trigger === 'mount') {
      routes.forEach(route => {
        prefetchSpecificRoute(route);
      });
    }
  }, [routes, trigger, prefetchSpecificRoute]);

  const triggerPrefetch = () => {
    routes.forEach(route => {
      prefetchSpecificRoute(route);
    });
  };

  return { triggerPrefetch };
};

// Intersection Observer for visible-based prefetching
export const useVisibilityPrefetch = (routes: string[], threshold = 0.1) => {
  const { prefetchSpecificRoute } = usePrefetch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            routes.forEach(route => {
              prefetchSpecificRoute(route);
            });
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    // Find elements to observe (e.g., CTA buttons, nav links)
    const ctaElements = document.querySelectorAll('[data-prefetch-trigger]');
    ctaElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [routes, threshold, prefetchSpecificRoute]);
};
