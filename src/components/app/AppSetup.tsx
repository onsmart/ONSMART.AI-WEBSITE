import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useWebVitals } from "@/hooks/useWebVitals";
import { useRealTimeMonitoring } from "@/hooks/useRealTimeMonitoring";
import { useCSPHeaders } from "@/hooks/useCSPHeaders";
import { useActiveUsers } from "@/hooks/useActiveUsers";
import { initializeGA4, testGTMConnection, verifyAnalyticsEvents, monitorAnalyticsEvents, cleanupIncorrectGAInstallations, verifyGATagConfiguration, debugGoogleAnalytics } from "@/utils/analyticsConfig";
import { useEffect } from "react";

const initializeGA = () => {
  // Limpar instalações incorretas primeiro
  cleanupIncorrectGAInstallations();
  
  // Verificar configuração atual apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    verifyGATagConfiguration();
    debugGoogleAnalytics();
  }
  
  // Usar a nova configuração que funciona com GTM
  initializeGA4();
  
  // Testar conexão apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      testGTMConnection();
      verifyAnalyticsEvents();
      verifyGATagConfiguration();
      monitorAnalyticsEvents();
    }, 3000);
  }
};

const initializeHotjar = () => {
  if (typeof window === 'undefined' || (window as any).hj) return;

  (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
    h.hj = h.hj || function(...args: any[]) { (h.hj.q = h.hj.q || []).push(args) };
    h._hjSettings = { hjid: 3849999, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
};

const setupFonts = () => {
  if (document.querySelector('link[href*="fonts.googleapis.com"]')) return;

  const linkElement = document.createElement("link");
  linkElement.rel = "preload";
  linkElement.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
  linkElement.as = "style";
  linkElement.onload = function() {
    linkElement.rel = "stylesheet";
  };
  document.head.appendChild(linkElement);
};

const setupFavicon = () => {
  if (document.querySelector('link[rel="icon"]')) return;

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/x-icon";
  favicon.href = "/favicon.ico";
  document.head.appendChild(favicon);
};

export const AppSetup = () => {
  useServiceWorker({
    onUpdate: () => {
      console.log('Nova versão disponível');
    },
    onSuccess: () => {
      console.log('Service Worker ativo');
    },
    onError: (error) => {
      console.error('Erro no Service Worker:', error);
    }
  });
  
  useWebVitals();
  
  // Novo: Monitoring real-time expandido
  const { metrics, alerts } = useRealTimeMonitoring();
  
  // Novo: CSP Headers para segurança
  useCSPHeaders();
  
  // Novo: Rastreamento de usuários ativos
  useActiveUsers();

  useEffect(() => {
    console.log('AppSetup: Iniciando configuração...');
    
    // Setup crítico
    setupFavicon();
    
    // Setup não-crítico com delay
    const timer = setTimeout(() => {
      setupFonts();
      
      // Inicializar GA sempre (desenvolvimento e produção)
      if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
        console.log('AppSetup: Inicializando Google Analytics...');
      }
      initializeGA();
      
      if (process.env.NODE_ENV === "production") {
        initializeHotjar();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Log das métricas em desenvolvimento para debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && metrics) {
      console.log('Real-time metrics:', metrics);
      if (alerts.length > 0) {
        console.warn('System alerts:', alerts);
      }
    }
  }, [metrics, alerts]);

  return null;
};
