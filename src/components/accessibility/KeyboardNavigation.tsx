
import React, { useEffect } from 'react';

const KeyboardNavigation: React.FC = () => {
  useEffect(() => {
    const handleGlobalKeyboard = (e: KeyboardEvent) => {
      // ESC para fechar modais/dropdowns
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[role="dialog"][open]');
        if (openModal) {
          const closeButton = openModal.querySelector('[aria-label*="fechar"], [aria-label*="close"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        }
        
        // Fechar dropdowns abertos
        const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');
        openDropdowns.forEach(dropdown => {
          if (dropdown instanceof HTMLElement) {
            dropdown.click();
          }
        });
      }
      
      // Alt + M para ir ao conteúdo principal
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent instanceof HTMLElement) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Alt + N para ir à navegação
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const navigation = document.querySelector('nav, #navigation');
        if (navigation instanceof HTMLElement) {
          navigation.focus();
          navigation.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Alt + F para ir ao rodapé
      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        const footer = document.querySelector('footer, #footer');
        if (footer instanceof HTMLElement) {
          footer.focus();
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Alt + S para focar no campo de busca (se existir)
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="busca"], input[placeholder*="search"]');
        if (searchInput instanceof HTMLElement) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyboard);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyboard);
    };
  }, []);

  return null;
};

export default KeyboardNavigation;
