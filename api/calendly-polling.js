// Calendly Polling API (Vercel Serverless)
// Endpoint: /api/calendly-polling
// Sistema de polling para verificar novos agendamentos

export default async function handler(req, res) {
  // CORS básico
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apenas POST e GET
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar variáveis de ambiente
    const { CALENDLY_PAT, CALENDLY_USER_URI, CALENDLY_ORG_URI } = process.env;
    
    if (!CALENDLY_PAT || !CALENDLY_USER_URI || !CALENDLY_ORG_URI) {
      console.error('Variáveis de ambiente não configuradas');
      return res.status(500).json({ 
        error: 'Configuração incompleta',
        message: 'Verifique as variáveis CALENDLY_PAT, CALENDLY_USER_URI e CALENDLY_ORG_URI'
      });
    }

    // Buscar eventos recentes (últimas 24 horas)
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const eventsUrl = `https://api.calendly.com/scheduled_events?user=${CALENDLY_USER_URI}&min_start_time=${yesterday.toISOString()}`;
    
    console.log('🔍 Buscando eventos no Calendly...');
    console.log(`📅 Período: ${yesterday.toISOString()} até ${now.toISOString()}`);
    
    const eventsResponse = await fetch(eventsUrl, {
      headers: {
        'Authorization': `Bearer ${CALENDLY_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!eventsResponse.ok) {
      console.error('❌ Erro na API do Calendly:', eventsResponse.status, eventsResponse.statusText);
      console.error('📊 Detalhes do erro:', {
        status: eventsResponse.status,
        statusText: eventsResponse.statusText,
        url: eventsUrl,
        timestamp: new Date().toISOString()
      });
      
      // Retornar erro sem quebrar o sistema
      return res.status(200).json({
        success: false,
        message: 'Erro na API do Calendly - sistema continuará funcionando',
        error: `Calendly API error: ${eventsResponse.status}`,
        timestamp: new Date().toISOString()
      });
    }

    const eventsData = await eventsResponse.json();
    const events = eventsData.collection || [];

    console.log(`📊 Encontrados ${events.length} eventos nas últimas 24h`);

    // Array para controlar eventos já processados nesta execução
    const processedEvents = [];
    
    // Processar cada evento
    const results = [];
    for (const event of events) {
      try {
        // 🛡️ PROTEÇÃO 1: Verificar se evento já foi processado nesta execução
        if (processedEvents.includes(event.uri)) {
          console.log(`⏩ Evento ${event.uri} já processado nesta execução, pulando.`);
          continue;
        }

        // 🛡️ PROTEÇÃO 2: Verificar se é um evento novo (criado nas últimas 2 horas)
        const eventCreated = new Date(event.created_at);
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
        
        if (eventCreated > twoHoursAgo) {
          console.log(`✨ Novo evento encontrado: ${event.uri}`);
          console.log(`📅 Criado em: ${eventCreated.toISOString()}`);
          console.log(`⏰ Status: ${event.status}`);
          console.log(`📝 Nome: ${event.name}`);
          
          // Buscar detalhes do evento
          console.log(`🔍 Buscando detalhes do evento: ${event.uri}`);
          
          const eventDetailsResponse = await fetch(event.uri, {
            headers: {
              'Authorization': `Bearer ${CALENDLY_PAT}`,
              'Content-Type': 'application/json'
            }
          });

          if (eventDetailsResponse.ok) {
            const eventDetails = await eventDetailsResponse.json();
            console.log('✅ Detalhes do evento obtidos com sucesso');
            
            // 🛡️ PROTEÇÃO 3: Filtrar apenas eventos de 30 minutos (evitar duplicatas de 15min)
            if (eventDetails.name && eventDetails.name.includes('30')) {
              console.log('🎯 Evento de 30min detectado - processando');
              
              // Enviar notificação
              await sendNotification(eventDetails);
              
              results.push({
                event_uri: event.uri,
                status: 'notified',
                created_at: event.created_at,
                event_name: eventDetails.name
              });
              
              // Marcar como processado
              processedEvents.push(event.uri);
            } else {
              console.log(`⏭️ Evento ignorado (não é de 30min): ${eventDetails.name}`);
              results.push({
                event_uri: event.uri,
                status: 'ignored',
                reason: 'Not a 30-minute event',
                event_name: eventDetails.name,
                created_at: event.created_at
              });
            }
          } else {
            console.error('❌ Erro ao buscar detalhes do evento:', eventDetailsResponse.status, eventDetailsResponse.statusText);
            console.error('📊 Evento com problema:', {
              uri: event.uri,
              status: eventDetailsResponse.status,
              statusText: eventDetailsResponse.statusText,
              timestamp: new Date().toISOString()
            });
            
            results.push({
              event_uri: event.uri,
              status: 'error',
              error: `Erro ao buscar detalhes: ${eventDetailsResponse.status}`,
              created_at: event.created_at
            });
          }
        }
      } catch (error) {
        console.error(`Erro ao processar evento ${event.uri}:`, error);
        results.push({
          event_uri: event.uri,
          status: 'error',
          error: error.message
        });
      }
    }

    // 📊 Log final detalhado
    const notifiedCount = results.filter(r => r.status === 'notified').length;
    const ignoredCount = results.filter(r => r.status === 'ignored').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    console.log('📊 RESUMO DA EXECUÇÃO:');
    console.log(`✅ Eventos notificados: ${notifiedCount}`);
    console.log(`⏭️ Eventos ignorados: ${ignoredCount}`);
    console.log(`❌ Eventos com erro: ${errorCount}`);
    console.log(`🔄 Total processado: ${results.length}`);

    return res.status(200).json({
      success: true,
      message: 'Polling executado com sucesso',
      timestamp: new Date().toISOString(),
      events_processed: results.length,
      summary: {
        notified: notifiedCount,
        ignored: ignoredCount,
        errors: errorCount
      },
      results: results
    });

  } catch (error) {
    console.error('❌ Erro crítico no polling:', error);
    console.error('📊 Detalhes do erro crítico:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      type: error.constructor.name
    });
    
    return res.status(200).json({
      success: false,
      error: 'Erro interno do sistema',
      message: 'Sistema temporariamente indisponível - tentará novamente em 5 minutos',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Função para enviar notificação
async function sendNotification(eventDetails) {
  try {
    console.log('=== NOVO AGENDAMENTO DETECTADO ===');
    console.log('Evento:', eventDetails.name);
    console.log('Data/Hora:', eventDetails.start_time);
    console.log('Cliente:', eventDetails.invitees_counter?.total_count || 'N/A');
    console.log('Status:', eventDetails.status);
    console.log('================================');
    
    // Log do novo agendamento (Calendly já envia emails automaticamente)
    console.log('✅ Novo agendamento detectado e processado');
    
    return true;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return false;
  }
}

// Sistema simplificado - Calendly já envia emails automaticamente
// Este endpoint serve para monitoramento e analytics
