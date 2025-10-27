import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-P6R4M7MV";

const initializeGA = () => {
  if (typeof window === 'undefined' || (window as any).gtag) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      send_page_view: true,
      anonymize_ip: true
    });
  `;
  document.head.appendChild(script2);
  
  (window as any).gtag = function() {
    (window as any).dataLayer.push(arguments);
  };
};

const setupEssentials = () => {
  // Favicon
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/x-icon";
    favicon.href = "/favicon.ico";
    document.head.appendChild(favicon);
  }

  // Critical fonts with faster loading
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(fontLink);
  }
};

export const OptimizedAppSetup = () => {
  useEffect(() => {
    setupEssentials();
    
    // Removido: Configuração duplicada do GA que pode causar conflito com GTM
    // O GTM já está configurado no index.html e será inicializado pelo AppSetup principal
  }, []);

  return null;
};
