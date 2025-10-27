import ReactGA from "react-ga4";

// Configuração do Google Analytics
const TRACKING_ID = "G-384496JX74";
const GTM_ID = "G-384496JX74";
const DEBUG_MODE = import.meta.env.VITE_GA_DEBUG_MODE === "true";

export const GA_CONFIG = {
  MEASUREMENT_ID: TRACKING_ID,
  GTM_ID: GTM_ID
};

// Função para detectar se estamos em produção
const isProduction = () => {
  return process.env.NODE_ENV === 'production' || 
         (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
};

// Função para testar a detecção de ambiente (apenas em desenvolvimento)
export const testEnvironmentDetection = () => {
  if (typeof window === 'undefined') return;
  
  const isProd = isProduction();
  const nodeEnv = process.env.NODE_ENV;
  const hostname = window.location.hostname;
  
  console.log('🔍 Teste de Detecção de Ambiente:');
  console.log('- NODE_ENV:', nodeEnv);
  console.log('- Hostname:', hostname);
  console.log('- isProduction():', isProd);
  console.log('- Ambiente detectado:', isProd ? 'PRODUÇÃO' : 'DESENVOLVIMENTO');
};

// Função para limpar instalações incorretas do Google Analytics
const cleanupIncorrectGAInstallations = () => {
  if (typeof window === 'undefined') return;

  // Log apenas em desenvolvimento
  if (!isProduction()) {
    console.log('🔧 Limpando instalações incorretas do Google Analytics...');
  }

  // Remover scripts incorretos do Google Analytics
  const incorrectScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
  incorrectScripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.includes(TRACKING_ID)) {
      if (!isProduction()) {
        console.log('🗑️ Removendo script incorreto:', src);
      }
      script.remove();
    }
  });

  // Remover scripts inline incorretos
  const inlineScripts = document.querySelectorAll('script');
  inlineScripts.forEach(script => {
    const content = script.textContent || script.innerHTML;
    if (content && content.includes('gtag') && !content.includes(TRACKING_ID)) {
      if (!isProduction()) {
        console.log('🗑️ Removendo script inline incorreto');
      }
      script.remove();
    }
  });

  // Limpar dataLayer de eventos incorretos
  if ((window as any).dataLayer) {
    (window as any).dataLayer = (window as any).dataLayer.filter((event: any) => {
      if (event && typeof event === 'object') {
        // Manter apenas eventos com a tag correta
        return !event.gtag_id || event.gtag_id === TRACKING_ID;
      }
      return true;
    });
  }

  if (!isProduction()) {
    console.log('✅ Limpeza de instalações incorretas concluída');
  }
};

// Inicialização do GA4
export const initGA = () => {
  // Limpar instalações incorretas primeiro
  cleanupIncorrectGAInstallations();
  
  ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      debug_mode: DEBUG_MODE,
      // Configurações específicas para usuários ativos
      engagement_time_msec: 100,
      session_timeout: 1800,
      engagement_timeout: 30,
      session_engaged: 1,
    },
    gtagOptions: {
      send_page_view: true,
      anonymize_ip: true,
    }
  });
  
  // Log apenas em desenvolvimento
  if (!isProduction()) {
    console.log('Google Analytics 4 inicializado:', TRACKING_ID);
  }
};

// Rastreamento de Page Views
export const trackPageView = (path: string) => {
  ReactGA.send({ 
    hitType: "pageview", 
    page: path,
    title: document.title 
  });
  
  // Log apenas em desenvolvimento
  if (!isProduction()) {
    console.log('Page View rastreada:', path);
  }
};

// Rastreamento de eventos customizados
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
  
  // Log apenas em desenvolvimento
  if (!isProduction()) {
    console.log('Evento rastreado:', { category, action, label, value });
  }
};

// Funções específicas para diferentes tipos de eventos
export const trackCTAClick = (buttonText: string, page?: string) => {
  trackEvent('cta_click', 'button_clicked', buttonText, 1);
};

export const trackFormSubmit = (formType: string, success: boolean = true) => {
  trackEvent('form_submission', success ? 'form_completed' : 'form_error', formType, 1);
};

export const trackUserEngagement = (engagementType: string, duration?: number) => {
  trackEvent('user_engagement', engagementType, 'engagement_tracking', duration);
};

// Função para rastrear usuários ativos
export const trackActiveUser = () => {
  trackEvent('user_activity', 'active_user', 'user_engaged', 1);
};

// Função para rastrear performance
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', metric, 'performance_tracking', value);
};

// Eventos específicos para Jarvis AI Assistant
export const trackJarvisEvent = (eventType: string, details: { command: string; responseTime: number }) => {
  trackEvent('jarvis_interaction', eventType, details.command, details.responseTime);
};

export const trackJarvisUsage = (sessionDuration: number) => {
  trackEvent('jarvis_usage', 'session_duration', null, sessionDuration);
};

export const trackJarvisPerformance = (responseTime: number) => {
  trackEvent('jarvis_performance', 'response_time', null, responseTime);
};

// Função para testar se o GA4 está funcionando
export const testGA4Connection = () => {
  if (typeof window === 'undefined') return false;

  const testResults = {
    ga4Loaded: false,
    eventsSent: false,
    dataLayerExists: false
  };

  // Verificar se GA4 foi inicializado
  if (ReactGA) {
    testResults.ga4Loaded = true;
  }

  // Verificar se dataLayer existe
  if ((window as any).dataLayer) {
    testResults.dataLayerExists = true;
  }

  // Enviar evento de teste
  try {
    ReactGA.event({
      category: 'Test',
      action: 'ga4_connection_test',
      label: 'Connection Test',
      value: 1
    });
    testResults.eventsSent = true;
  } catch (error) {
    if (!isProduction()) {
      console.error('Erro ao enviar evento de teste:', error);
    }
  }

  if (!isProduction()) {
    console.log('Teste de conexão GA4:', testResults);
  }
  return testResults;
};

// Função para verificar se os eventos estão sendo enviados
export const verifyAnalyticsEvents = () => {
  if (typeof window === 'undefined') return;

  if (!isProduction()) {
    console.log('=== VERIFICAÇÃO DO GOOGLE ANALYTICS ===');
  }
  
  // Verificar dataLayer
  if ((window as any).dataLayer) {
    if (!isProduction()) {
      console.log('✅ dataLayer encontrado');
      console.log('Últimos eventos no dataLayer:', (window as any).dataLayer.slice(-5));
    }
  } else {
    if (!isProduction()) {
      console.log('❌ dataLayer não encontrado');
    }
  }

  // Verificar GA4
  if (ReactGA) {
    if (!isProduction()) {
      console.log('✅ GA4 configurado');
    }
    
    // Enviar evento de teste
    ReactGA.event({
      category: 'Debug',
      action: 'analytics_verification',
      label: 'Analytics Verification',
      value: 1
    });
    
    if (!isProduction()) {
      console.log('✅ Evento de teste enviado');
    }
  } else {
    if (!isProduction()) {
      console.log('❌ GA4 não configurado');
    }
  }
};

// Função para monitorar eventos em tempo real
export const monitorAnalyticsEvents = () => {
  if (typeof window === 'undefined') return;

  const originalDataLayer = (window as any).dataLayer;
  
  if (originalDataLayer) {
    // Interceptar eventos para monitoramento
    (window as any).dataLayer = {
      push: function(...args: any[]) {
        if (!isProduction()) {
          console.log('📊 Evento GA4:', args);
        }
        originalDataLayer.push.apply(originalDataLayer, args);
      }
    };
    
    if (!isProduction()) {
      console.log('🔍 Monitoramento de eventos GA4 ativado');
    }
  }
};

// Função para rastrear sessão
export const trackSession = (sessionData?: Record<string, any>) => {
  const sessionId = sessionStorage.getItem('session_id') || `session_${Date.now()}`;
  sessionStorage.setItem('session_id', sessionId);
  sessionStorage.setItem('session_start', Date.now().toString());

  trackEvent('session_start', 'session_created', sessionId, 1);
  
  if (!isProduction()) {
    console.log('Sessão iniciada:', sessionId);
  }
};

// Função para rastrear atividade específica
export const trackUserActivity = (activityType: string, metadata?: Record<string, any>) => {
  trackEvent('user_activity', activityType, 'activity_tracking', 1);
  
  if (!isProduction()) {
    console.log('Atividade do usuário rastreada:', activityType);
  }
};

// Função para iniciar rastreamento de usuários ativos
export const startActiveUserTracking = () => {
  let isActive = false;
  let lastActivity = Date.now();
  let activeUserEventsSent = 0;

  const markAsActive = () => {
    if (!isActive) {
      isActive = true;
      trackActiveUser();
    }
    lastActivity = Date.now();
  };

  // Eventos que indicam atividade
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'focus'];
  
  activityEvents.forEach(event => {
    document.addEventListener(event, markAsActive, { passive: true });
  });

  // Verificar atividade a cada 10 segundos
  setInterval(() => {
    if (isActive && (Date.now() - lastActivity) < 30000) {
      trackActiveUser();
      activeUserEventsSent++;
      
      // Enviar evento de usuário ativo a cada 30 segundos
      if (activeUserEventsSent % 3 === 0) {
        trackActiveUserEvent();
      }
    } else if ((Date.now() - lastActivity) > 30000) {
      isActive = false;
    }
  }, 10000);
};

// Função específica para rastrear eventos de usuário ativo
export const trackActiveUserEvent = () => {
  trackEvent('active_user_session', 'Active User Detected', 'User Engagement', 1);
  
  if (!isProduction()) {
    console.log('Evento de usuário ativo enviado');
  }
}; 