
import React from 'react';
import { createRoot } from 'react-dom/client';
// Importar configuração do i18n ANTES do App
// Isso garante que as traduções estejam disponíveis quando os componentes renderarem
import './i18n/config';
import App from './App.tsx';
import './index.css';

// Inicializar tema antes do React renderizar para evitar flash
// FORÇADO PARA SEMPRE MODO CLARO (dark mode não finalizado)
(function initTheme() {
  // Sempre força modo claro - ignora localStorage e preferência do sistema
  document.documentElement.classList.remove('dark');
  // Limpa qualquer preferência dark salva anteriormente
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
  }
})();

// Remover parênteses indesejados que aparecem no menu durante o carregamento inicial
(function removeUnwantedParentheses() {
  const removeParentheses = () => {
    // Remover pseudo-elementos que possam conter parênteses
    const style = document.createElement('style');
    style.textContent = `
      nav *::before,
      nav *::after {
        content: none !important;
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        pointer-events: none !important;
        font-size: 0 !important;
        line-height: 0 !important;
      }
      
      [data-radix-dropdown-menu-trigger]::before,
      [data-radix-dropdown-menu-trigger]::after,
      [data-radix-dropdown-menu-trigger] *::before,
      [data-radix-dropdown-menu-trigger] *::after {
        content: none !important;
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Remover elementos que contenham parênteses como texto (versão melhorada)
    const removeParenthesesElements = () => {
      // Remover elementos que contenham apenas parênteses
      const allElements = document.querySelectorAll('nav *');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const text = htmlEl.textContent?.trim() || '';
        
        // Se o elemento contém apenas parênteses, escondê-lo completamente
        if (text.match(/^[\[\]()]+$/) && text.length > 0) {
          htmlEl.style.display = 'none';
          htmlEl.style.visibility = 'hidden';
          htmlEl.style.opacity = '0';
          htmlEl.style.width = '0';
          htmlEl.style.height = '0';
          htmlEl.style.position = 'absolute';
          htmlEl.style.left = '-9999px';
          // Tentar remover completamente se possível
          try {
            if (htmlEl.parentElement && htmlEl.textContent?.trim().match(/^[\[\]()]+$/)) {
              htmlEl.remove();
            }
          } catch (e) {
            // Ignorar erros de remoção
          }
        }
      });
      
      // Específico para elementos do Radix UI
      const radixTriggers = document.querySelectorAll('[data-radix-dropdown-menu-trigger]');
      radixTriggers.forEach((trigger) => {
        const children = trigger.querySelectorAll('*');
        children.forEach((child) => {
          const childEl = child as HTMLElement;
          const text = childEl.textContent?.trim() || '';
          if (text.match(/^[\[\]()]+$/) && text.length > 0) {
            childEl.remove();
          }
        });
      });
    };

    // Executar múltiplas vezes para capturar elementos criados dinamicamente
    removeParenthesesElements();
    setTimeout(removeParenthesesElements, 100);
    setTimeout(removeParenthesesElements, 300);
    setTimeout(removeParenthesesElements, 500);
    setTimeout(removeParenthesesElements, 1000);
    setTimeout(removeParenthesesElements, 2000);

    // Executar limpeza imediatamente e em intervalos
    const cleanup = () => {
      const navElements = document.querySelectorAll('nav *');
      navElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        // Forçar remoção de pseudo-elementos via inline styles
        htmlEl.style.setProperty('--before-content', 'none', 'important');
        htmlEl.style.setProperty('--after-content', 'none', 'important');
      });
    };

    // Executar múltiplas vezes para garantir
    cleanup();
    setTimeout(cleanup, 100);
    setTimeout(cleanup, 500);
    setTimeout(cleanup, 1000);
    setTimeout(cleanup, 2000);
  };

  // Executar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeParentheses);
  } else {
    removeParentheses();
  }

  // Executar também após um delay para capturar elementos renderizados dinamicamente
  setTimeout(removeParentheses, 100);
  setTimeout(removeParentheses, 500);
  setTimeout(removeParentheses, 1000);
})();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
