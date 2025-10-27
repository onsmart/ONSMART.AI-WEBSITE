
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface FastPagePreloaderProps {
  enabled?: boolean;
}

const FastPagePreloader: React.FC<FastPagePreloaderProps> = ({ enabled = true }) => {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    // Preload baseado na página atual
    const currentPath = location.pathname;
    let routesToPreload: string[] = [];

    switch (currentPath) {
      case '/':
        routesToPreload = ['/diagnostico', '/contato', '/servicos'];
        break;
      case '/diagnostico':
        routesToPreload = ['/contato', '/servicos'];
        break;
      case '/contato':
        routesToPreload = ['/diagnostico', '/case-de-sucesso'];
        break;
      case '/servicos':
        routesToPreload = ['/contato', '/case-de-sucesso'];
        break;
      case '/case-de-sucesso':
        routesToPreload = ['/servicos', '/contato'];
        break;
      case '/conteudo':
        routesToPreload = ['/blog', '/servicos'];
        break;
      default:
        routesToPreload = ['/'];
    }

    // Preload com delay para não interferir no carregamento atual
    const preloadTimer = setTimeout(() => {
      routesToPreload.forEach((route, index) => {
        setTimeout(() => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          link.as = 'document';
          document.head.appendChild(link);
        }, index * 100); // Stagger preloads
      });
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, [location.pathname, enabled]);

  return null;
};

export default FastPagePreloader;
