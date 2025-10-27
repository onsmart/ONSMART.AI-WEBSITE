// Simulador de Usuários Ativos para Google Analytics
import { 
  trackActiveUser, 
  trackUserActivity, 
  trackSession, 
  trackActiveUserEvent,
  testGTMConnection,
  verifyAnalyticsEvents 
} from './analyticsConfig';

interface SimulationResult {
  success: boolean;
  eventsSent: number;
  errors: string[];
  details: {
    gtmConnection: boolean;
    ga4Configured: boolean;
    eventsTracked: string[];
    sessionData: any;
  };
}

// Simular comportamento de usuário ativo
export const simulateActiveUser = async (): Promise<SimulationResult> => {
  const result: SimulationResult = {
    success: false,
    eventsSent: 0,
    errors: [],
    details: {
      gtmConnection: false,
      ga4Configured: false,
      eventsTracked: [],
      sessionData: null
    }
  };

  try {
    console.log('🎯 Iniciando simulação de usuário ativo...');

    // 1. Verificar conexão GTM
    const gtmTest = testGTMConnection();
    result.details.gtmConnection = gtmTest.gtmLoaded;
    result.details.ga4Configured = gtmTest.ga4Configured;

    if (!gtmTest.gtmLoaded) {
      result.errors.push('GTM não está carregado');
      return result;
    }

    // 2. Simular início de sessão
    console.log('📱 Simulando início de sessão...');
    trackSession({
      user_agent: 'Simulator/1.0',
      referrer: 'https://onsmart.ai',
      landing_page: '/'
    });
    result.eventsSent++;
    result.details.eventsTracked.push('session_start');

    // 3. Simular atividade do usuário
    console.log('🖱️ Simulando atividade do usuário...');
    
    // Simular cliques
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      trackUserActivity('click', { element: `button_${i}`, page: '/' });
      result.eventsSent++;
      result.details.eventsTracked.push('user_activity_click');
    }

    // Simular scroll
    for (let i = 0; i < 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      trackUserActivity(`scroll_${(i + 1) * 25}_percent`, { 
        scroll_depth: (i + 1) * 25,
        page: '/' 
      });
      result.eventsSent++;
      result.details.eventsTracked.push(`user_activity_scroll_${(i + 1) * 25}_percent`);
    }

    // Simular tempo na página
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      trackUserActivity(`time_on_page_${(i + 1) * 10}s`, { 
        time_spent: (i + 1) * 10,
        page: '/' 
      });
      result.eventsSent++;
      result.details.eventsTracked.push(`user_activity_time_${(i + 1) * 10}s`);
    }

    // 4. Simular usuário ativo
    console.log('👤 Simulando usuário ativo...');
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      trackActiveUser();
      result.eventsSent++;
      result.details.eventsTracked.push('user_engagement');
    }

    // 5. Simular eventos de usuário ativo
    console.log('🎯 Simulando eventos de usuário ativo...');
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      trackActiveUserEvent();
      result.eventsSent++;
      result.details.eventsTracked.push('active_user_session');
    }

    // 6. Verificar eventos no GA
    verifyAnalyticsEvents();

    result.success = true;
    result.details.sessionData = {
      session_id: sessionStorage.getItem('session_id'),
      session_start: sessionStorage.getItem('session_start'),
      events_count: result.eventsSent
    };

    console.log('✅ Simulação concluída com sucesso!');
    console.log(`📊 Total de eventos enviados: ${result.eventsSent}`);
    console.log('📋 Eventos rastreados:', result.details.eventsTracked);

  } catch (error) {
    result.errors.push(`Erro na simulação: ${error}`);
    console.error('❌ Erro na simulação:', error);
  }

  return result;
};

// Simular múltiplos usuários ativos
export const simulateMultipleActiveUsers = async (userCount: number = 3): Promise<SimulationResult[]> => {
  console.log(`👥 Simulando ${userCount} usuários ativos...`);
  
  const results: SimulationResult[] = [];
  
  for (let i = 0; i < userCount; i++) {
    console.log(`\n👤 Simulando usuário ${i + 1}/${userCount}...`);
    
    // Simular diferentes páginas
    const pages = ['/', '/servicos', '/contato', '/blog'];
    const currentPage = pages[i % pages.length];
    
    // Simular navegação
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', currentPage);
    }
    
    const result = await simulateActiveUser();
    results.push(result);
    
    // Aguardar entre usuários
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
};

// Simular comportamento realista de usuário
export const simulateRealisticUserBehavior = async (): Promise<SimulationResult> => {
  console.log('🎭 Simulando comportamento realista de usuário...');
  
  const result: SimulationResult = {
    success: false,
    eventsSent: 0,
    errors: [],
    details: {
      gtmConnection: false,
      ga4Configured: false,
      eventsTracked: [],
      sessionData: null
    }
  };

  try {
    // Verificar conexão
    const gtmTest = testGTMConnection();
    result.details.gtmConnection = gtmTest.gtmLoaded;
    result.details.ga4Configured = gtmTest.ga4Configured;

    if (!gtmTest.gtmLoaded) {
      result.errors.push('GTM não está carregado');
      return result;
    }

    // Simular navegação realista
    const navigationSteps = [
      { page: '/', action: 'landing', delay: 2000 },
      { page: '/servicos', action: 'browse_services', delay: 3000 },
      { page: '/case-de-sucesso', action: 'view_cases', delay: 2500 },
      { page: '/contato', action: 'contact_intent', delay: 4000 },
      { page: '/blog', action: 'read_content', delay: 5000 }
    ];

    for (const step of navigationSteps) {
      console.log(`📄 Navegando para: ${step.page}`);
      
      // Simular mudança de página
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', step.page);
      }

      // Iniciar sessão se necessário
      if (step.page === '/') {
        trackSession({
          user_agent: 'RealisticSimulator/1.0',
          referrer: 'https://google.com',
          landing_page: '/'
        });
        result.eventsSent++;
        result.details.eventsTracked.push('session_start');
      }

      // Simular atividade na página
      await simulatePageActivity(step.action, result);

      // Aguardar tempo realista
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }

    result.success = true;
    result.details.sessionData = {
      session_id: sessionStorage.getItem('session_id'),
      session_start: sessionStorage.getItem('session_start'),
      events_count: result.eventsSent
    };

    console.log('✅ Simulação realista concluída!');

  } catch (error) {
    result.errors.push(`Erro na simulação realista: ${error}`);
    console.error('❌ Erro na simulação realista:', error);
  }

  return result;
};

// Simular atividade em uma página específica
const simulatePageActivity = async (action: string, result: SimulationResult) => {
  const activities = {
    landing: [
      { type: 'scroll', depth: 25, delay: 1000 },
      { type: 'click', element: 'hero_cta', delay: 2000 },
      { type: 'scroll', depth: 50, delay: 1500 },
      { type: 'click', element: 'feature_tab', delay: 1000 }
    ],
    browse_services: [
      { type: 'scroll', depth: 30, delay: 1000 },
      { type: 'click', element: 'service_card', delay: 2000 },
      { type: 'scroll', depth: 75, delay: 1500 },
      { type: 'click', element: 'contact_button', delay: 1000 }
    ],
    view_cases: [
      { type: 'scroll', depth: 40, delay: 1000 },
      { type: 'click', element: 'case_study', delay: 3000 },
      { type: 'scroll', depth: 90, delay: 2000 },
      { type: 'click', element: 'download_case', delay: 1000 }
    ],
    contact_intent: [
      { type: 'scroll', depth: 20, delay: 1000 },
      { type: 'click', element: 'contact_form', delay: 2000 },
      { type: 'input', field: 'name', delay: 1000 },
      { type: 'input', field: 'email', delay: 1000 },
      { type: 'click', element: 'submit_form', delay: 2000 }
    ],
    read_content: [
      { type: 'scroll', depth: 25, delay: 1000 },
      { type: 'click', element: 'blog_post', delay: 2000 },
      { type: 'scroll', depth: 60, delay: 3000 },
      { type: 'click', element: 'share_button', delay: 1000 }
    ]
  };

  const pageActivities = activities[action as keyof typeof activities] || [];
  
  for (const activity of pageActivities) {
    await new Promise(resolve => setTimeout(resolve, activity.delay));
    
    trackUserActivity(`${action}_${activity.type}`, {
      element: activity.element || activity.field,
      depth: activity.depth,
      page: typeof window !== 'undefined' ? window.location.pathname : '/'
    });
    
    result.eventsSent++;
    result.details.eventsTracked.push(`${action}_${activity.type}`);
    
    // Simular usuário ativo
    trackActiveUser();
    result.eventsSent++;
    result.details.eventsTracked.push('user_engagement');
  }
};

// Verificar se os eventos estão sendo enviados corretamente
export const verifyEventDelivery = (): boolean => {
  if (typeof window === 'undefined') return false;

  const dataLayer = (window as any).dataLayer;
  if (!dataLayer) {
    console.log('❌ DataLayer não encontrado');
    return false;
  }

  const recentEvents = dataLayer.slice(-20);
  const activeUserEvents = recentEvents.filter((event: any) => 
    event && (
      event.event === 'user_engagement' ||
      event.event === 'active_user_session' ||
      event.event === 'session_start' ||
      event.event === 'user_activity'
    )
  );

  console.log('📊 Verificação de entrega de eventos:');
  console.log(`- Total de eventos recentes: ${recentEvents.length}`);
  console.log(`- Eventos de usuário ativo: ${activeUserEvents.length}`);
  
  if (activeUserEvents.length > 0) {
    console.log('✅ Eventos de usuário ativo detectados!');
    activeUserEvents.forEach((event: any, index: number) => {
      console.log(`  ${index + 1}. ${event.event} - ${new Date().toLocaleTimeString()}`);
    });
    return true;
  } else {
    console.log('❌ Nenhum evento de usuário ativo detectado');
    return false;
  }
};

// Relatório completo de simulação
export const generateSimulationReport = (results: SimulationResult[]): string => {
  const totalEvents = results.reduce((sum, result) => sum + result.eventsSent, 0);
  const successfulSimulations = results.filter(r => r.success).length;
  const totalErrors = results.reduce((sum, result) => sum + result.errors.length, 0);

  const report = `
📊 RELATÓRIO DE SIMULAÇÃO DE USUÁRIOS ATIVOS
===============================================

📈 RESUMO:
- Simulações executadas: ${results.length}
- Simulações bem-sucedidas: ${successfulSimulations}
- Total de eventos enviados: ${totalEvents}
- Total de erros: ${totalErrors}

🔍 DETALHES POR SIMULAÇÃO:
${results.map((result, index) => `
${index + 1}. Simulação ${index + 1}:
   ✅ Sucesso: ${result.success ? 'Sim' : 'Não'}
   📊 Eventos: ${result.eventsSent}
   🔗 GTM: ${result.details.gtmConnection ? 'Conectado' : 'Desconectado'}
   📈 GA4: ${result.details.ga4Configured ? 'Configurado' : 'Não configurado'}
   ❌ Erros: ${result.errors.length}
`).join('')}

🎯 EVENTOS RASTREADOS:
${results.flatMap(r => r.details.eventsTracked).slice(-10).join(', ')}

⚠️ ERROS ENCONTRADOS:
${results.flatMap(r => r.errors).join('\n')}

📋 RECOMENDAÇÕES:
${totalErrors > 0 ? '- Verificar configuração do GTM' : '- Sistema funcionando corretamente'}
${successfulSimulations < results.length ? '- Investigar falhas nas simulações' : '- Todas as simulações bem-sucedidas'}
`;

  console.log(report);
  return report;
}; 