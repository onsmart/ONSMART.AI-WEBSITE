// Serviço compartilhado para processar mensagens da Sonia
// Funciona no servidor (Vercel) e mantém histórico de conversa por usuário

// Armazenamento simples em memória (em produção, considere Redis ou banco de dados)
const conversationHistory = new Map();

/**
 * Processa uma mensagem com a Sonia, mantendo histórico de conversa
 * @param {string} userId - Identificador único do usuário
 * @param {string} message - Mensagem do usuário
 * @param {object} options - Opções adicionais
 * @param {string} options.channel - Canal de comunicação ('web')
 * @param {string} options.language - Idioma ('pt' | 'en' | 'es')
 * @returns {Promise<string>} Resposta da Sonia
 */
export async function processSoniaMessage(userId, message, options = {}) {
  const { channel = 'web', language = 'pt' } = options;
  
  // Obter histórico do usuário
  let history = conversationHistory.get(userId) || [];
  
  // Se não tem histórico, inicializar com prompt do sistema
  if (history.length === 0) {
    history = [{
      role: 'system',
      content: getSoniaSystemPrompt(language)
    }];
  }
  
  // Adicionar mensagem do usuário
  history.push({
    role: 'user',
    content: message
  });
  
  // Adicionar lembrete de concisão se a conversa estiver longa
  const addedReminder = history.length > 5;
  if (addedReminder) {
    const reminders = {
      pt: 'LEMBRE-SE: Resposta MÁXIMO 2-3 frases curtas SEM emojis, SEM formatação markdown (**,*,_). Apenas texto simples. Termine com pergunta!',
      en: 'REMEMBER: Response MAXIMUM 2-3 short sentences NO emojis, NO markdown formatting (**,*,_). Simple text only. Always end with a question!',
      es: 'RECUERDA: Respuesta MÁXIMO 2-3 frases cortas SIN emojis, SIN formato markdown (**,*,_). Solo texto simple. ¡Siempre termina con una pregunta!'
    };
    history.push({
      role: 'system',
      content: reminders[language] || reminders.pt
    });
  }
  
  // Limitar histórico (últimas 20 mensagens + system prompt)
  if (history.length > 21) {
    history = [
      history[0], // system prompt
      ...history.slice(-20) // últimas 20 mensagens
    ];
  }
  
  // Chamar OpenAI através do proxy
  // IMPORTANTE: Na Vercel, precisamos usar URL absoluta porque estamos em uma serverless function
  let proxyUrl;
  
  // Em produção na Vercel, usar domínio fixo
  if (process.env.VERCEL) {
    // Em produção - usar domínio fixo
    proxyUrl = 'https://onsmart-website.vercel.app/api/openai-proxy';
  } else if (process.env.VERCEL_URL) {
    // Em preview/staging
    proxyUrl = `https://${process.env.VERCEL_URL}/api/openai-proxy`;
  } else {
    // Em desenvolvimento local
    proxyUrl = process.env.OPENAI_API_URL || 'http://localhost:3000/api/openai-proxy';
  }
  
  console.log(`🔗 [soniaService] Chamando OpenAI proxy: ${proxyUrl}`);
  console.log(`📝 [soniaService] Mensagem: ${message.substring(0, 50)}...`);
  console.log(`👤 [soniaService] UserId: ${userId}`);
  
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: history
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ [soniaService] OpenAI API error: ${response.status} - ${errorText.substring(0, 200)}`);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText.substring(0, 200)}`);
    }
    
    const data = await response.json();
    const assistantMessage = data.message;
    
    if (!assistantMessage) {
      console.error(`❌ [soniaService] Resposta vazia da OpenAI. Data recebida:`, JSON.stringify(data).substring(0, 200));
      throw new Error('No response from OpenAI');
    }
    
    console.log(`✅ [soniaService] Resposta recebida: ${assistantMessage.substring(0, 50)}...`);
    
    // Remover lembrete se foi adicionado
    if (addedReminder) {
      history.pop();
    }
    
    // Adicionar resposta ao histórico
    history.push({
      role: 'assistant',
      content: assistantMessage
    });
    
    // Salvar histórico atualizado
    conversationHistory.set(userId, history);
    
    return assistantMessage;
  } catch (error) {
    console.error('❌ [soniaService] Erro ao processar mensagem com Sonia:', error);
    console.error('❌ [soniaService] Stack:', error.stack);
    console.error('❌ [soniaService] UserId:', userId);
    console.error('❌ [soniaService] Mensagem:', message.substring(0, 100));
    console.error('❌ [soniaService] Idioma:', language);
    
    // Retornar fallback em caso de erro
    const fallbackResponse = getFallbackResponse(message, language);
    console.log(`🔄 [soniaService] Usando fallback: ${fallbackResponse.substring(0, 50)}...`);
    return fallbackResponse;
  }
}

/**
 * Obtém o prompt do sistema da Sonia no idioma especificado
 */
function getSoniaSystemPrompt(language = 'pt') {
  const prompts = {
    pt: `Você é Sonia, assistente de IA da onsmart AI, uma empresa brasileira especializada em Agentes de IA corporativos.

INFORMAÇÕES DA EMPRESA:
- Nome: onsmart AI
- Especialidade: Agentes de IA proprietários para empresas brasileiras
- Localização: Brasil
- Foco: Soluções de IA desenvolvidas baseadas nas principais demandas do mercado brasileiro

CATEGORIAS DE SOLUÇÕES (NOSSOS PRODUTOS):
1. Automação de Vendas - SDRs virtuais e qualificação automatizada de leads
2. Atendimento Inteligente - Chatbots multicanal e assistentes virtuais
3. RH Inteligente - Recrutamento automatizado e analytics de workforce
4. BI & Analytics - Business Intelligence preditivo e em tempo real
5. Automação de Processos - RPA inteligente com IA avançada
6. Voz & Linguagem - NLP otimizado para português brasileiro

ESTATÍSTICAS DA EMPRESA:
- 500+ Empresas Atendidas
- 98% Taxa de Sucesso
- 30 dias Tempo Médio de Implementação

INSTRUÇÕES DE COMPORTAMENTO:
- Seja sempre cordial e profissional
- Responda em português brasileiro
- MÁXIMO 2-3 frases por resposta - seja CONCISA
- NÃO USE EMOJIS - mantenha texto limpo e profissional
- NÃO USE FORMATAÇÃO MARKDOWN (**, *, _, etc) - apenas texto simples
- Foque na solução específica para a pergunta do cliente
- Sempre termine com uma pergunta ou call-to-action
- Se não souber algo específico, direcione para a equipe comercial
- Use pontos simples (•) para listas quando necessário
- Evite parágrafos longos - prefira frases curtas e diretas
- REGRA CRÍTICA DE AGENDAMENTO: Se o cliente mencionar agendamento/demonstração/reunião/marcar, SEMPRE envie o link do Calendly DIRETAMENTE. NÃO peça dia ou horário. Envie: ${calendlyUrl}`,
    
    en: `You are Sonia, AI assistant from onsmart AI, a Brazilian company specialized in corporate AI Agents.

COMPANY INFORMATION:
- Name: onsmart AI
- Specialty: Proprietary AI Agents for Brazilian companies
- Location: Brazil
- Focus: AI solutions developed based on main demands of the Brazilian market

SOLUTION CATEGORIES (OUR PRODUCTS):
1. Sales Automation - Virtual SDRs and automated lead qualification
2. Intelligent Support - Multichannel chatbots and virtual assistants
3. Intelligent HR - Automated recruitment and workforce analytics
4. BI & Analytics - Predictive and real-time Business Intelligence
5. Process Automation - Intelligent RPA with advanced AI
6. Voice & Language - NLP optimized for Brazilian Portuguese

COMPANY STATISTICS:
- 500+ Companies Served
- 98% Success Rate
- 30 days Average Implementation Time

BEHAVIOR INSTRUCTIONS:
- Always be cordial and professional
- Respond in English
- MAXIMUM 2-3 sentences per response - be CONCISE
- DO NOT USE EMOJIS - keep text clean and professional
- DO NOT USE MARKDOWN FORMATTING (**, *, _, etc) - simple text only
- Focus on the specific solution for the client's question
- Always end with a question or call-to-action
- If you don't know something specific, direct to the sales team
- Use simple points (•) for lists when necessary
- Avoid long paragraphs - prefer short and direct sentences
- CRITICAL SCHEDULING RULE: If the client mentions scheduling/demonstration/meeting/booking, ALWAYS send the Calendly link DIRECTLY. DO NOT ask for day or time. Send: ${calendlyUrl}`,
    
    es: `Eres Sonia, asistente de IA de onsmart AI, una empresa brasileña especializada en Agentes de IA corporativos.

INFORMACIÓN DE LA EMPRESA:
- Nombre: onsmart AI
- Especialidad: Agentes de IA propietarios para empresas brasileñas
- Ubicación: Brasil
- Enfoque: Soluciones de IA desarrolladas basadas en las principales demandas del mercado brasileño

CATEGORÍAS DE SOLUCIONES (NUESTROS PRODUCTOS):
1. Automatización de Ventas - SDRs virtuales y cualificación automatizada de leads
2. Atención Inteligente - Chatbots multicanal y asistentes virtuales
3. RRHH Inteligente - Reclutamiento automatizado y analytics de fuerza laboral
4. BI & Analytics - Business Intelligence predictivo y en tiempo real
5. Automatización de Procesos - RPA inteligente con IA avanzada
6. Voz & Lenguaje - NLP optimizado para portugués brasileño

ESTADÍSTICAS DE LA EMPRESA:
- 500+ Empresas Atendidas
- 98% Tasa de Éxito
- 30 días Tiempo Promedio de Implementación

INSTRUCCIONES DE COMPORTAMIENTO:
- Sé siempre cordial y profesional
- Responde en español
- MÁXIMO 2-3 frases por respuesta - sé CONCISA
- NO USES EMOJIS - mantén el texto limpio y profesional
- NO USES FORMATEO MARKDOWN (**, *, _, etc) - solo texto simple
- Enfócate en la solución específica para la pregunta del cliente
- Siempre termina con una pregunta o call-to-action
- Si no sabes algo específico, dirige al equipo comercial
- Usa puntos simples (•) para listas cuando sea necesario
- Evita párrafos largos - prefiere frases cortas y directas
- REGLA CRÍTICA DE AGENDAMIENTO: Si el cliente menciona agendamiento/demostración/reunión/marcar, SIEMPRE envía el enlace del Calendly DIRECTAMENTE. NO pidas día u hora. Envía: ${calendlyUrl}`
  };
  
  return prompts[language] || prompts.pt;
}

/**
 * Retorna resposta de fallback quando há erro na API
 */
function getFallbackResponse(message, language = 'pt') {
  const msg = message.toLowerCase();
  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/ricardo-palomar-onsmartai/30min/';
  
  const fallbacks = {
    pt: {
      price: 'Nossos Agentes de IA são personalizados para cada empresa.\nOs investimentos variam conforme suas necessidades específicas.\n\nQuer agendar uma demonstração gratuita?',
      how: 'Nossos Agentes funcionam como assistentes virtuais inteligentes.\nEles automatizam vendas, atendimento, RH e muito mais.\n\nQual área você gostaria de automatizar?',
      schedule: `Perfeito! Você pode agendar uma reunião diretamente pelo nosso Calendly.\nAcesse: ${calendlyUrl}\n\nEm que posso ajudar mais?`,
      default: 'Olá! Sou a Sonia, assistente de IA da onsmart AI. Estou com algumas dificuldades técnicas no momento, mas posso te ajudar. Como posso te auxiliar hoje?'
    },
    en: {
      price: 'Our AI Agents are customized for each company.\nInvestments vary according to your specific needs.\n\nWould you like to schedule a free demonstration?',
      how: 'Our Agents work as intelligent virtual assistants.\nThey automate sales, support, HR and much more.\n\nWhich area would you like to automate first?',
      schedule: `Perfect! You can schedule a meeting directly through our Calendly.\nAccess: ${calendlyUrl}\n\nHow else can I help?`,
      default: 'Hello! I\'m Sonia, AI assistant from onsmart AI. I\'m experiencing some technical difficulties at the moment, but I can help you. How can I assist you today?'
    },
    es: {
      price: 'Nuestros Agentes de IA están personalizados para cada empresa.\nLas inversiones varían según sus necesidades específicas.\n\n¿Quieres agendar una demostración gratuita?',
      how: 'Nuestros Agentes funcionan como asistentes virtuales inteligentes.\nAutomatizan ventas, atención, RRHH y mucho más.\n\n¿Qué área te gustaría automatizar primero?',
      schedule: `¡Perfecto! Puedes agendar una reunión directamente por nuestro Calendly.\nAccede: ${calendlyUrl}\n\n¿En qué más puedo ayudar?`,
      default: '¡Hola! Soy Sonia, asistente de IA de onsmart AI. Estoy experimentando algunas dificultades técnicas en este momento, pero puedo ayudarte. ¿Cómo puedo asistirte hoy?'
    }
  };
  
  const fallback = fallbacks[language] || fallbacks.pt;
  
  // Detectar intenção da mensagem
  if (msg.includes('preço') || msg.includes('custo') || msg.includes('valor') || 
      msg.includes('price') || msg.includes('cost') || msg.includes('pricing') ||
      msg.includes('precio') || msg.includes('costo')) {
    return fallback.price;
  }
  
  if (msg.includes('como funciona') || msg.includes('funciona') || 
      msg.includes('how does') || msg.includes('how it works') ||
      msg.includes('cómo funciona')) {
    return fallback.how;
  }
  
  if (msg.includes('demonstração') || msg.includes('demo') || msg.includes('teste') ||
      msg.includes('demonstration') || msg.includes('demo') ||
      msg.includes('demostración') || 
      msg.includes('agendar') || msg.includes('reunião') || msg.includes('marcar') ||
      msg.includes('schedule') || msg.includes('meeting') || msg.includes('calendar') ||
      msg.includes('agendar') || msg.includes('reunión')) {
    return fallback.schedule;
  }
  
  return fallback.default;
}

/**
 * Reseta o histórico de conversa de um usuário
 */
export function resetConversation(userId) {
  conversationHistory.delete(userId);
}

/**
 * Obtém o histórico de conversa de um usuário (para debug)
 */
export function getConversationHistory(userId) {
  return conversationHistory.get(userId) || [];
}

