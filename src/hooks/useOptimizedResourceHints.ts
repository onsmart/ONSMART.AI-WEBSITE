import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ResourceHintOptions {
  preload?: string[];
  prefetch?: string[];
  preconnect?: string[];
  dnsPrefetch?: string[];
}

const CRITICAL_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

const ROUTE_HINTS: Record<string, ResourceHintOptions> = {
  '/': {
    preload: CRITICAL_RESOURCES,
    prefetch: ['/diagnostico', '/contato'],
    preconnect: ['https://fonts.googleapis.com', 'https://www.google-analytics.com'],
    dnsPrefetch: ['https://fonts.gstatic.com']
  },
  '/diagnostico': {
    prefetch: ['/contato', '/servicos'],
    preconnect: ['https://api.emailjs.com'],
  },
  '/contato': {
    prefetch: ['/diagnostico', '/case-de-sucesso'],
    preconnect: ['https://api.emailjs.com'],
  },
  '/servicos': {
    prefetch: ['/case-de-sucesso', '/contato'],
  },
  '/case-de-sucesso': {
    prefetch: ['/servicos', '/contato'],
  },
  '/conteudo': {
    prefetch: ['/blog'],
  }
};

export const useOptimizedResourceHints = () => {
  const location = useLocation();

  useEffect(() => {
    const hints = ROUTE_HINTS[location.pathname] || {};
    const existingHints = new Set<string>();

    // Track existing hints
    document.querySelectorAll('link[rel^="pre"]').forEach(link => {
      existingHints.add(link.getAttribute('href') || '');
    });

    const addHint = (rel: string, href: string, as?: string, crossorigin?: boolean) => {
      if (existingHints.has(href)) return;

      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute('as', as);
      if (crossorigin) link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
      existingHints.add(href);
    };

    // Add critical preloads
    hints.preload?.forEach(href => {
      const extension = href.split('.').pop()?.toLowerCase();
      let as = 'fetch';
      
      if (['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension || '')) {
        as = 'image';
      } else if (extension === 'css') {
        as = 'style';
      } else if (extension === 'js') {
        as = 'script';
      }

      addHint('preload', href, as, href.startsWith('http'));
    });

    // Add prefetch hints with delay to avoid blocking
    setTimeout(() => {
      hints.prefetch?.forEach(href => addHint('prefetch', href));
      hints.preconnect?.forEach(href => addHint('preconnect', href));
      hints.dnsPrefetch?.forEach(href => addHint('dns-prefetch', href));
    }, 100);

    // Cleanup on route change
    return () => {
      const hintsToRemove = ['prefetch'];
      document.querySelectorAll('link[rel^="pre"]').forEach(link => {
        const rel = link.getAttribute('rel');
        const href = link.getAttribute('href');
        if (rel && hintsToRemove.includes(rel) && href && hints.prefetch?.includes(href)) {
          link.remove();
          existingHints.delete(href);
        }
      });
    };
  }, [location.pathname]);
};
