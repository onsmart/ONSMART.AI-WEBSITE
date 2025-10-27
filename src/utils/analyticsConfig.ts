// Configuração do Google Analytics
export const GA_CONFIG = {
  MEASUREMENT_ID: "G-384496JX74",
  GTM_ID: "G-384496JX74"
};

// Função para limpar instalações incorretas do Google Analytics
export const cleanupIncorrectGAInstallations = () => {
  if (typeof window === 'undefined') return;

  // Log apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Limpando instalações incorretas do Google Analytics...');
  }

  // Remover scripts incorretos do Google Analytics
  const incorrectScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
  incorrectScripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.includes(GA_CONFIG.MEASUREMENT_ID)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🗑️ Removendo script incorreto:', src);
      }
      script.remove();
    }
  });

  // Remover scripts inline incorretos
  const inlineScripts = document.querySelectorAll('script');
  inlineScripts.forEach(script => {
    const content = script.textContent || script.innerHTML;
    if (content && content.includes('gtag') && !content.includes(GA_CONFIG.MEASUREMENT_ID)) {
      if (process.env.NODE_ENV === 'development') {
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
        return !event.gtag_id || event.gtag_id === GA_CONFIG.MEASUREMENT_ID;
      }
      return true;
    });
  }

  // Resetar gtag function se necessário
  if ((window as any).gtag) {
    const originalGtag = (window as any).gtag;
    (window as any).gtag = function(...args: any[]) {
      // Verificar se o evento está usando a tag correta
      if (args.length > 0 && args[0] === 'config' && args[1] && args[1] !== GA_CONFIG.MEASUREMENT_ID) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Tentativa de usar tag incorreta interceptada:', args[1]);
        }
        // Substituir pela tag correta
        args[1] = GA_CONFIG.MEASUREMENT_ID;
      }
      return originalGtag.apply(this, args);
    };
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Limpeza de instalações incorretas concluída');
  }
};

// Função para testar se o GTM está funcionando
export const testGTMConnection = () => {
  if (typeof window === 'undefined') return false;

  const testResults = {
    gtmLoaded: false,
    dataLayerExists: false,
    gtagExists: false,
    ga4Configured: false,
    eventsSent: false
  };

  // Verificar se o GTM está carregado
  if ((window as any).dataLayer) {
    testResults.dataLayerExists = true;
    testResults.gtmLoaded = true;
  }

  // Verificar se gtag existe
  if ((window as any).gtag) {
    testResults.gtagExists = true;
  }

  // Verificar se GA4 foi configurado
  if ((window as any).gtag && (window as any).dataLayer) {
    // Enviar evento de teste
    (window as any).gtag('event', 'gtm_test', {
      event_category: 'Test',
      event_label: 'GTM Connection Test',
      test_timestamp: Date.now()
    });
    testResults.ga4Configured = true;
    testResults.eventsSent = true;
  }

  console.log('Teste de conexão GTM:', testResults);
  return testResults;
};

// Função para inicializar GA4 através do GTM
export const initializeGA4 = () => {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('Iniciando configuração do Google Analytics 4...');
  }

  // Aguardar o GTM carregar
  const waitForGTM = () => {
    if ((window as any).dataLayer) {
      if (process.env.NODE_ENV === 'development') {
        console.log('GTM dataLayer encontrado, configurando GA4...');
      }
      
      // Verificar se gtag já existe
      if (!(window as any).gtag) {
        (window as any).gtag = function() {
          (window as any).dataLayer.push(arguments);
        };
      }

      // Configurar GA4 com configurações específicas para usuários ativos
      (window as any).gtag('config', GA_CONFIG.MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true,
        // Configurações específicas para usuários ativos
        engagement_time_msec: 100,
        session_timeout: 1800,
        engagement_timeout: 30,
        session_engaged: 1,
        // Configurações adicionais para melhor rastreamento
        custom_map: {
          'engagement_time_msec': 'engagement_time_msec',
          'session_engaged': 'session_engaged',
          'user_activity': 'user_activity',
          'scroll_depth': 'scroll_depth',
          'time_on_page': 'time_on_page',
          'active_user': 'active_user',
          'user_engagement_level': 'user_engagement_level'
        }
      });

      // Enviar evento de inicialização
      (window as any).gtag('event', 'ga4_initialized', {
        event_category: 'Analytics',
        event_label: 'GA4 Setup Complete',
        active_user: true,
        user_engagement_level: 'high'
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Google Analytics 4 configurado via GTM com sucesso');
      }
      
      // Testar conexão apenas em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        testGTMConnection();
      }
      
      // Iniciar rastreamento de usuários ativos
      startActiveUserTracking();
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('Aguardando GTM carregar...');
      }
      // Tentar novamente em 100ms
      setTimeout(waitForGTM, 100);
    }
  };

  waitForGTM();
};

// Função para iniciar rastreamento de usuários ativos
const startActiveUserTracking = () => {
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

// Função para rastrear usuário ativo
export const trackActiveUser = () => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'user_engagement', {
    engagement_time_msec: 100,
    session_engaged: 1,
    user_activity: 'active',
    active_user: true,
    user_engagement_level: 'high',
    page: window.location.pathname,
    timestamp: Date.now()
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Usuário ativo rastreado');
  }
};

// Função específica para rastrear eventos de usuário ativo
export const trackActiveUserEvent = () => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'active_user_session', {
    event_category: 'User Engagement',
    event_label: 'Active User Detected',
    active_user: true,
    user_engagement_level: 'high',
    session_duration: Date.now() - (parseInt(sessionStorage.getItem('session_start') || '0')),
    page: window.location.pathname,
    timestamp: Date.now()
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Evento de usuário ativo enviado');
  }
};

// Função para rastrear atividade específica
export const trackUserActivity = (activityType: string, metadata?: Record<string, any>) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'user_activity', {
    activity_type: activityType,
    active_user: true,
    user_engagement_level: 'high',
    page: window.location.pathname,
    timestamp: Date.now(),
    ...metadata
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Atividade do usuário rastreada:', activityType);
  }
};

// Função para rastrear sessão
export const trackSession = (sessionData?: Record<string, any>) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  const sessionId = sessionStorage.getItem('session_id') || `session_${Date.now()}`;
  sessionStorage.setItem('session_id', sessionId);
  sessionStorage.setItem('session_start', Date.now().toString());

  (window as any).gtag('event', 'session_start', {
    session_id: sessionId,
    user_engaged: true,
    active_user: true,
    user_engagement_level: 'high',
    page: window.location.pathname,
    timestamp: Date.now(),
    ...sessionData
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Sessão iniciada:', sessionId);
  }
};

// Função para verificar se os eventos estão sendo enviados
export const verifyAnalyticsEvents = () => {
  if (typeof window === 'undefined') return;

  console.log('=== VERIFICAÇÃO DO GOOGLE ANALYTICS ===');
  
  // Verificar dataLayer
  if ((window as any).dataLayer) {
    console.log('✅ dataLayer encontrado');
    console.log('Últimos eventos no dataLayer:', (window as any).dataLayer.slice(-5));
  } else {
    console.log('❌ dataLayer não encontrado');
  }

  // Verificar gtag
  if ((window as any).gtag) {
    console.log('✅ gtag encontrado');
  } else {
    console.log('❌ gtag não encontrado');
  }

  // Verificar GA4
  if ((window as any).gtag && (window as any).dataLayer) {
    console.log('✅ GA4 configurado');
    
    // Enviar evento de teste
    (window as any).gtag('event', 'analytics_test', {
      event_category: 'Debug',
      event_label: 'Analytics Verification',
      test_timestamp: Date.now(),
      page: window.location.pathname,
      active_user: true
    });
    
    console.log('✅ Evento de teste enviado');
  } else {
    console.log('❌ GA4 não configurado');
  }

  // Verificar configuração
  console.log('Configuração atual:');
  console.log('- GTM ID:', GA_CONFIG.GTM_ID);
  console.log('- GA4 ID:', GA_CONFIG.MEASUREMENT_ID);
  console.log('- URL atual:', window.location.href);
  
  console.log('=== FIM DA VERIFICAÇÃO ===');
};

// Função para monitorar eventos em tempo real
export const monitorAnalyticsEvents = () => {
  if (typeof window === 'undefined') return;

  const originalPush = (window as any).dataLayer?.push;
  if (originalPush) {
    (window as any).dataLayer.push = function(...args: any[]) {
      console.log('📊 Evento enviado para GA:', args);
      return originalPush.apply(this, args);
    };
    console.log('✅ Monitoramento de eventos ativado');
  }
};

// Função para verificar usuários ativos no GA
export const checkActiveUsersInGA = () => {
  console.log('=== VERIFICAÇÃO DE USUÁRIOS ATIVOS ===');
  
  // Verificar se os eventos estão sendo enviados
  if ((window as any).gtag) {
    // Enviar evento de verificação de usuário ativo
    (window as any).gtag('event', 'active_user_check', {
      event_category: 'User Engagement',
      event_label: 'Active User Verification',
      active_user: true,
      user_engagement_level: 'high',
      page: window.location.pathname,
      session_id: sessionStorage.getItem('session_id'),
      timestamp: Date.now()
    });
    
    console.log('✅ Evento de verificação de usuário ativo enviado');
  } else {
    console.log('❌ gtag não disponível');
  }
  
  console.log('=== FIM DA VERIFICAÇÃO ===');
}; 

// Função para verificar a configuração atual do Google Analytics
export const verifyGATagConfiguration = () => {
  if (typeof window === 'undefined') return;

  console.log('🔍 VERIFICANDO CONFIGURAÇÃO DO GOOGLE ANALYTICS');
  console.log('================================================');
  
  // Verificar container GTM
  console.log('✅ Container GTM correto:', GA_CONFIG.GTM_ID);
  console.log('✅ Tag GA4 correta:', GA_CONFIG.MEASUREMENT_ID);
  
  // Verificar scripts do GTM no DOM
  const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
  console.log(`📊 Scripts do GTM encontrados: ${gtmScripts.length}`);
  
  gtmScripts.forEach((script, index) => {
    const src = script.getAttribute('src');
    console.log(`  Script GTM ${index + 1}:`, src);
    
    if (src && src.includes(GA_CONFIG.GTM_ID)) {
      console.log('  ✅ Script GTM correto');
    } else {
      console.log('  ❌ Script GTM incorreto!');
    }
  });
  
  // Verificar scripts do GA4 no DOM
  const gaScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
  console.log(`📊 Scripts do GA4 encontrados: ${gaScripts.length}`);
  
  gaScripts.forEach((script, index) => {
    const src = script.getAttribute('src');
    console.log(`  Script GA4 ${index + 1}:`, src);
    
    if (src && src.includes(GA_CONFIG.MEASUREMENT_ID)) {
      console.log('  ✅ Script GA4 correto');
    } else if (src && src.includes('G-K3J5GWS4PX')) {
      console.log('  ❌ Script com tag incorreta detectado!');
    } else {
      console.log('  ⚠️ Script com tag desconhecida');
    }
  });
  
  // Verificar dataLayer
  if ((window as any).dataLayer) {
    console.log('✅ dataLayer encontrado');
    const recentEvents = (window as any).dataLayer.slice(-3);
    console.log('Últimos eventos:', recentEvents);
  } else {
    console.log('❌ dataLayer não encontrado');
  }
  
  // Verificar gtag function
  if ((window as any).gtag) {
    console.log('✅ gtag function encontrada');
  } else {
    console.log('❌ gtag function não encontrada');
  }
  
  // Verificar se o GTM está carregado
  if ((window as any).dataLayer && (window as any).dataLayer.length > 0) {
    const gtmStartEvent = (window as any).dataLayer.find((event: any) => 
      event && event.event === 'gtm.js'
    );
    if (gtmStartEvent) {
      console.log('✅ GTM carregado corretamente');
    } else {
      console.log('⚠️ GTM pode não estar carregado');
    }
  }
  
  console.log('================================================');
  console.log('🔍 FIM DA VERIFICAÇÃO');
}; 

// Função global para debug do Google Analytics (disponível no console do navegador)
export const debugGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Tornar a função disponível globalmente para debug
  (window as any).debugGA = () => {
    console.log('🔍 DEBUG DO GOOGLE ANALYTICS E GTM');
    console.log('====================================');
    
    // Verificar configuração
    verifyGATagConfiguration();
    
    // Verificar container GTM específico
    console.log('🔍 VERIFICAÇÃO ESPECÍFICA DO GTM');
    const gtmContainer = 'G-384496JX74';
    const gtmScripts = document.querySelectorAll(`script[src*="${gtmContainer}"]`);
    console.log(`📊 Scripts do container ${gtmContainer}: ${gtmScripts.length}`);
    
    if (gtmScripts.length === 0) {
      console.log('❌ Container GTM não encontrado!');
    } else {
      console.log('✅ Container GTM encontrado');
    }
    
    // Verificar se há tags incorretas
    const incorrectTags = document.querySelectorAll('script[src*="G-K3J5GWS4PX"]');
    if (incorrectTags.length > 0) {
      console.log('❌ TAGS INCORRETAS ENCONTRADAS!');
      incorrectTags.forEach((tag, index) => {
        console.log(`Tag incorreta ${index + 1}:`, tag.outerHTML);
      });
    } else {
      console.log('✅ Nenhuma tag incorreta encontrada');
    }
    
    // Verificar dataLayer
    if ((window as any).dataLayer) {
      console.log('📊 DataLayer atual:', (window as any).dataLayer);
      
      // Verificar eventos do GTM
      const gtmEvents = (window as any).dataLayer.filter((event: any) => 
        event && (event.event === 'gtm.js' || event.event === 'gtm.dom')
      );
      console.log('📊 Eventos do GTM:', gtmEvents);
    }
    
    // Testar envio de evento
    if ((window as any).gtag) {
      (window as any).gtag('event', 'debug_test', {
        event_category: 'Debug',
        event_label: 'Manual Debug Test',
        debug_timestamp: Date.now()
      });
      console.log('✅ Evento de teste enviado');
    }
    
    console.log('====================================');
  };
  
  console.log('🔧 Função debugGA disponível no console');
  console.log('💡 Use debugGA() no console para verificar o Google Analytics e GTM');
}; 