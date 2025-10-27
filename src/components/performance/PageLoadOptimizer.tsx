
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoadOptimizer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Resource hints para páginas específicas
    const addResourceHints = () => {
      const currentPath = location.pathname;
      
      // Remove hints antigos
      const oldHints = document.querySelectorAll('link[data-page-hint="true"]');
      oldHints.forEach(hint => hint.remove());

      // Adiciona novos hints baseados na página
      const hints: Array<{href: string, rel: string, as?: string}> = [];

      switch (currentPath) {
        case '/':
          hints.push(
            { href: '/diagnostico', rel: 'prefetch', as: 'document' },
            { href: '/contato', rel: 'prefetch', as: 'document' },
            { href: '/servicos', rel: 'prefetch', as: 'document' }
          );
          break;
        case '/diagnostico':
          hints.push(
            { href: '/contato', rel: 'prefetch', as: 'document' },
            { href: '/servicos', rel: 'preload', as: 'document' }
          );
          break;
        case '/contato':
          hints.push(
            { href: '/diagnostico', rel: 'prefetch', as: 'document' }
          );
          break;
        case '/servicos':
          hints.push(
            { href: '/case-de-sucesso', rel: 'prefetch', as: 'document' },
            { href: '/contato', rel: 'prefetch', as: 'document' }
          );
          break;
        case '/case-de-sucesso':
          hints.push(
            { href: '/servicos', rel: 'prefetch', as: 'document' }
          );
          break;
        case '/conteudo':
          hints.push(
            { href: '/blog', rel: 'prefetch', as: 'document' }
          );
          break;
      }

      // Adiciona os hints ao DOM
      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.as) link.as = hint.as;
        link.setAttribute('data-page-hint', 'true');
        document.head.appendChild(link);
      });
    };

    // Delay para não interferir no carregamento atual
    const timer = setTimeout(addResourceHints, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Otimizar imagens lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img: any) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }

    // Registrar métricas de performance
    if ('performance' in window && 'getEntriesByType' in performance) {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Page Load Performance:', {
            path: location.pathname,
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstByte: navigation.responseStart - navigation.fetchStart
          });
        }
      }, 1000);
    }
  }, [location.pathname]);

  return null;
};

export default PageLoadOptimizer;
