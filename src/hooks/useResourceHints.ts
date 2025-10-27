import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ResourceHintOptions {
  preload?: string[];
  prefetch?: string[];
  preconnect?: string[];
  dnsPrefetch?: string[];
}

const ROUTE_SPECIFIC_HINTS: Record<string, ResourceHintOptions> = {
  '/': {
    preload: [],
    prefetch: ['/diagnostico', '/contato', '/servicos'],
    preconnect: ['https://fonts.googleapis.com', 'https://www.google-analytics.com'],
    dnsPrefetch: ['https://fonts.gstatic.com']
  },
  '/diagnostico': {
    preload: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ],
    prefetch: ['/contato', '/case-de-sucesso'],
    preconnect: ['https://api.emailjs.com'],
    dnsPrefetch: ['https://cdn.emailjs.com']
  },
  '/contato': {
    preload: [],
    prefetch: ['/diagnostico', '/servicos'],
    preconnect: ['https://api.emailjs.com'],
    dnsPrefetch: ['https://cdn.emailjs.com']
  },
  '/servicos': {
    prefetch: ['/case-de-sucesso', '/diagnostico'],
    preconnect: ['https://fonts.googleapis.com'],
    dnsPrefetch: ['https://fonts.gstatic.com']
  },
  '/blog': {
    prefetch: ['/conteudo'],
    preconnect: ['https://images.unsplash.com'],
    dnsPrefetch: ['https://source.unsplash.com']
  }
};

export const useResourceHints = () => {
  const location = useLocation();

  useEffect(() => {
    const currentHints = ROUTE_SPECIFIC_HINTS[location.pathname] || {};
    const existingHints = new Set<string>();

    // Track existing hints to avoid duplicates
    document.querySelectorAll('link[rel^="pre"]').forEach(link => {
      existingHints.add(link.getAttribute('href') || '');
    });

    const addResourceHint = (rel: string, href: string, as?: string, type?: string) => {
      if (existingHints.has(href)) return;

      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute('as', as);
      if (type) link.type = type;
      
      // Add crossorigin for external resources
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        link.crossOrigin = 'anonymous';
      }

      document.head.appendChild(link);
      existingHints.add(href);
    };

    // Add preload hints (high priority resources)
    currentHints.preload?.forEach(href => {
      const extension = href.split('.').pop()?.toLowerCase();
      let as = 'fetch';
      let type = '';

      if (['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension || '')) {
        as = 'image';
      } else if (['css'].includes(extension || '')) {
        as = 'style';
        type = 'text/css';
      } else if (['js'].includes(extension || '')) {
        as = 'script';
        type = 'text/javascript';
      } else if (['woff', 'woff2'].includes(extension || '')) {
        as = 'font';
        type = `font/${extension}`;
      }

      addResourceHint('preload', href, as, type);
    });

    // Add prefetch hints (next navigation resources)
    currentHints.prefetch?.forEach(href => {
      addResourceHint('prefetch', href);
    });

    // Add preconnect hints (establish early connections)
    currentHints.preconnect?.forEach(href => {
      addResourceHint('preconnect', href);
    });

    // Add DNS prefetch hints (resolve DNS early)
    currentHints.dnsPrefetch?.forEach(href => {
      addResourceHint('dns-prefetch', href);
    });

    // Cleanup function to remove route-specific hints when navigating away
    return () => {
      // Keep essential hints, remove route-specific ones
      const hintsToKeep = ['preconnect', 'dns-prefetch'];
      document.querySelectorAll('link[rel^="pre"]').forEach(link => {
        const rel = link.getAttribute('rel');
        if (rel && !hintsToKeep.includes(rel)) {
          const href = link.getAttribute('href');
          if (href && (currentHints.preload?.includes(href) || currentHints.prefetch?.includes(href))) {
            link.remove();
            existingHints.delete(href);
          }
        }
      });
    };
  }, [location.pathname]);
};
