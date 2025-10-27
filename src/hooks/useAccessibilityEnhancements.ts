
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAccessibilityEnhancements = () => {
  const location = useLocation();

  const getRouteAnnouncement = (pathname: string): string => {
    const announcements: Record<string, string> = {
      '/': 'Página inicial carregada',
      '/servicos': 'Página de serviços carregada',
      '/case-de-sucesso': 'Página de cases de sucesso carregada',
      '/contato': 'Página de contato carregada',
      '/diagnostico': 'Página de diagnóstico carregada',
      '/blog': 'Blog carregado',
      '/conteudo': 'Página de conteúdo carregada'
    };
    
    return announcements[pathname] || 'Nova página carregada';
  };

  const getPageTitle = (pathname: string): string => {
    const titles: Record<string, string> = {
      '/': 'onsmartAI - Agentes de IA para Transformação Empresarial',
      '/servicos': 'Serviços - onsmartAI',
      '/case-de-sucesso': 'Cases de Sucesso - onsmartAI',
      '/contato': 'Contato - onsmartAI',
      '/diagnostico': 'Diagnóstico Gratuito - onsmartAI',
      '/blog': 'Blog - onsmartAI',
      '/conteudo': 'Conteúdo - onsmartAI'
    };
    
    return titles[pathname] || 'onsmartAI';
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.getElementById('aria-live-announcer');
    if (announcement) {
      announcement.textContent = message;
    } else {
      const announcer = document.createElement('div');
      announcer.id = 'aria-live-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = message;
      document.body.appendChild(announcer);
    }
  };

  useEffect(() => {
    const routeAnnouncement = getRouteAnnouncement(location.pathname);
    announceToScreenReader(routeAnnouncement);

    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle;

    // Melhor gerenciamento de foco
    setTimeout(() => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.focus();
        mainContent.setAttribute('tabindex', '-1');
      }
    }, 100);

    // Adicionar indicadores visuais para navegação por teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.setAttribute('data-keyboard-navigation', 'active');
      }
    };

    const handleMouseDown = () => {
      document.body.removeAttribute('data-keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [location.pathname]);

  return {
    announceToScreenReader,
    getRouteAnnouncement,
    getPageTitle
  };
};
