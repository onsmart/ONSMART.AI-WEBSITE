
import React, { useEffect } from 'react';

const AriaLandmarks: React.FC = () => {
  useEffect(() => {
    // Adicionar role="main" ao elemento main se não existir
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.getAttribute('role')) {
      mainElement.setAttribute('role', 'main');
      mainElement.setAttribute('id', 'main-content');
      mainElement.setAttribute('tabindex', '-1');
    }

    // Adicionar role="banner" ao header/nav se não existir
    const headerElement = document.querySelector('header, nav');
    if (headerElement && !headerElement.getAttribute('role')) {
      headerElement.setAttribute('role', 'banner');
    }

    // Adicionar role="contentinfo" ao footer se não existir
    const footerElement = document.querySelector('footer');
    if (footerElement && !footerElement.getAttribute('role')) {
      footerElement.setAttribute('role', 'contentinfo');
    }

    // Adicionar role="navigation" aos elementos de navegação
    const navElements = document.querySelectorAll('nav:not([role])');
    navElements.forEach(nav => {
      nav.setAttribute('role', 'navigation');
    });

    // Adicionar aria-label aos elementos de navegação sem label
    const navigationElements = document.querySelectorAll('[role="navigation"]:not([aria-label]):not([aria-labelledby])');
    navigationElements.forEach((nav, index) => {
      nav.setAttribute('aria-label', `Navegação ${index + 1}`);
    });
  }, []);

  return null;
};

export default AriaLandmarks;
