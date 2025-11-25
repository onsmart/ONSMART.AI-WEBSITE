/**
 * Função simplificada para gerar resposta da Sonia SEM histórico
 * Usada no webhook do WhatsApp - cada mensagem é tratada independentemente
 * 
 * Esta função reutiliza o "cérebro" da Sonia (prompt e lógica) mas sem persistência
 */

/**
 * Obtém o prompt do sistema da Sonia no idioma especificado
 * Versão simplificada baseada em soniaPrompts.ts
 * 
 * NOTA: Em produção, idealmente importar de soniaPrompts.ts, mas para evitar
 * problemas de importação em ambiente serverless, mantemos uma versão inline aqui
 */
function getSystemPrompt(language = 'pt') {
  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/ricardo-palomar-onsmartai/30min';
  
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
- REGRA CRÍTICA: Se o cliente mencionar agendamento/demonstração/reunião, SEMPRE inclua o link do Calendly: ${calendlyUrl}`,
    
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
- CRITICAL RULE: If the client mentions scheduling/demonstration/meeting, ALWAYS include the Calendly link: ${calendlyUrl}`,
    
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
- REGLA CRÍTICA: Si el cliente menciona agendamiento/demostración/reunión, SIEMPRE incluye el enlace del Calendly: ${calendlyUrl}`
  };
  
  return prompts[language] || prompts.pt;
}

/**
 * Detecta o idioma da mensagem do usuário
 * Versão melhorada com mais palavras-chave e lógica mais robusta
 */
function detectLanguage(message) {
  if (!message || !message.trim()) {
    return 'pt'; // Padrão
  }
  
  const msg = message.toLowerCase().trim();
  
  // Palavras-chave em inglês (mais abrangente)
  const englishKeywords = [
    'hello', 'hi', 'hey', 'how', 'what', 'when', 'where', 'why', 'who',
    'the', 'is', 'are', 'can', 'will', 'would', 'could', 'should',
    'please', 'thanks', 'thank you', 'yes', 'no', 'ok', 'okay',
    'help', 'information', 'about', 'tell me', 'explain', 'show me'
  ];
  
  // Palavras-chave em espanhol
  const spanishKeywords = [
    'hola', 'cómo', 'qué', 'cuándo', 'dónde', 'por qué', 'quién',
    'es', 'son', 'puede', 'será', 'puedo', 'gracias', 'por favor',
    'sí', 'no', 'ayuda', 'información', 'sobre', 'dime', 'explica', 'muéstrame',
    'buenos días', 'buenas tardes', 'buenas noches'
  ];
  
  // Palavras-chave em português (para evitar falsos positivos)
  const portugueseKeywords = [
    'olá', 'oi', 'como', 'o que', 'quando', 'onde', 'por que', 'quem',
    'é', 'são', 'pode', 'será', 'obrigado', 'obrigada', 'por favor',
    'sim', 'não', 'ajuda', 'informação', 'sobre', 'me fale', 'explique', 'mostre',
    'bom dia', 'boa tarde', 'boa noite', 'tudo bem', 'tudo bom'
  ];
  
  // Contar ocorrências
  const englishCount = englishKeywords.filter(kw => msg.includes(kw)).length;
  const spanishCount = spanishKeywords.filter(kw => msg.includes(kw)).length;
  const portugueseCount = portugueseKeywords.filter(kw => msg.includes(kw)).length;
  
  // Detectar padrões específicos
  // Inglês: palavras comuns como "the", "is", "are" no início ou meio
  const englishPatterns = /\b(the|is|are|can|will|would|could|should|this|that|these|those)\b/i;
  const hasEnglishPattern = englishPatterns.test(msg);
  
  // Espanhol: acentos e padrões específicos
  const spanishPatterns = /[áéíóúñü¿¡]/i;
  const hasSpanishPattern = spanishPatterns.test(msg);
  
  // Português: acentos e padrões específicos
  const portuguesePatterns = /[áàâãéêíóôõúç]/i;
  const hasPortuguesePattern = portuguesePatterns.test(msg);
  
  // Lógica de decisão melhorada
  // Se tem padrão de acentos, priorizar
  if (hasSpanishPattern && !hasPortuguesePattern) {
    return 'es';
  }
  if (hasPortuguesePattern) {
    return 'pt';
  }
  
  // Se tem padrão inglês forte
  if (hasEnglishPattern && englishCount >= 2) {
    return 'en';
  }
  
  // Comparar contagens
  if (englishCount > spanishCount && englishCount > portugueseCount && englishCount >= 2) {
    return 'en';
  }
  if (spanishCount > englishCount && spanishCount > portugueseCount && spanishCount >= 2) {
    return 'es';
  }
  if (portugueseCount > 0) {
    return 'pt';
  }
  
  // Se tem pelo menos uma palavra-chave
  if (englishCount > 0 && englishCount >= spanishCount) {
    return 'en';
  }
  if (spanishCount > 0) {
    return 'es';
  }
  
  // Padrão: português (mais comum no contexto brasileiro)
  return 'pt';
}

/**
 * Obtém resposta de fallback quando a API falha
 * Reutiliza lógica do openaiService.ts
 */
function getFallbackResponse(message, language = 'pt') {
  const msg = message.toLowerCase();
  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/ricardo-palomar-onsmartai/30min';
  
  const fallbacks = {
    pt: {
      price: 'Nossos Agentes de IA são personalizados para cada empresa.\nOs investimentos variam conforme suas necessidades específicas.\n\nQuer agendar uma demonstração gratuita?',
      how: 'Nossos Agentes funcionam como assistentes virtuais inteligentes.\nEles automatizam vendas, atendimento, RH e muito mais.\n\nQual área você gostaria de automatizar?',
      schedule: `Perfeito! Você pode agendar uma reunião diretamente pelo nosso Calendly.\nAcesse: ${calendlyUrl}\n\nEm que posso ajudar mais?`,
      timeline: 'Implementamos em apenas 30 dias.\nNossa equipe cuida de toda a integração.\n\nGostaria de conhecer nosso processo?',
      sales: 'Nossa Automação de Vendas transforma seu processo comercial.\nSDRs virtuais que trabalham 24/7 com +300% de conversão.\n\nQuer saber mais sobre como funciona?',
      support: 'Nosso Atendimento Inteligente revoluciona o suporte ao cliente.\nChatbots multicanal com +95% de satisfação.\n\nGostaria de ver uma demonstração?',
      products: 'Oferecemos seis categorias de soluções em IA:\n\n• Automação de Vendas: SDRs virtuais e qualificação de leads\n• Atendimento Inteligente: Chatbots multicanal e assistentes virtuais\n• RH Inteligente: Recrutamento automatizado e analytics de workforce\n• BI & Analytics: Business Intelligence preditivo em tempo real\n• Automação de Processos: RPA inteligente com IA avançada\n• Voz & Linguagem: NLP otimizado para português brasileiro\n\nQual solução você gostaria de explorar mais a fundo?',
      default: 'Estou com algumas dificuldades técnicas no momento.\nMas posso te conectar com nossa equipe comercial.\n\nQuer agendar uma conversa?'
    },
    en: {
      price: 'Our AI Agents are customized for each company.\nInvestments vary according to your specific needs.\n\nWould you like to schedule a free demonstration?',
      how: 'Our Agents work as intelligent virtual assistants.\nThey automate sales, support, HR and much more.\n\nWhich area would you like to automate first?',
      schedule: `Perfect! You can schedule a meeting directly through our Calendly.\nAccess: ${calendlyUrl}\n\nHow else can I help?`,
      timeline: 'We implement in just 30 days.\nOur team takes care of the entire integration.\n\nWould you like to know our process?',
      sales: 'Our Sales Automation transforms your commercial process.\nVirtual SDRs that work 24/7 with +300% conversion.\n\nWant to know more about how it works?',
      support: 'Our Intelligent Support revolutionizes customer service.\nMultichannel chatbots with +95% satisfaction.\n\nWould you like to see a demonstration?',
      products: 'We offer six categories of AI solutions:\n\n• Sales Automation: Virtual SDRs and lead qualification\n• Intelligent Support: Multichannel chatbots and virtual assistants\n• Intelligent HR: Automated recruitment and workforce analytics\n• BI & Analytics: Predictive and real-time Business Intelligence\n• Process Automation: Intelligent RPA with advanced AI\n• Voice & Language: NLP optimized for Brazilian Portuguese\n\nWhich solution would you like to explore further?',
      default: 'I\'m experiencing some technical difficulties at the moment.\nBut I can connect you with our sales team.\n\nWould you like to schedule a conversation?'
    },
    es: {
      price: 'Nuestros Agentes de IA están personalizados para cada empresa.\nLas inversiones varían según sus necesidades específicas.\n\n¿Quieres agendar una demostración gratuita?',
      how: 'Nuestros Agentes funcionan como asistentes virtuales inteligentes.\nAutomatizan ventas, atención, RRHH y mucho más.\n\n¿Qué área te gustaría automatizar primero?',
      schedule: `¡Perfecto! Puedes agendar una reunión directamente por nuestro Calendly.\nAccede: ${calendlyUrl}\n\n¿En qué más puedo ayudar?`,
      timeline: 'Implementamos en solo 30 días.\nNuestro equipo se encarga de toda la integración.\n\n¿Te gustaría conocer nuestro proceso?',
      sales: 'Nuestra Automatización de Ventas transforma tu proceso comercial.\nSDRs virtuales que trabajan 24/7 con +300% de conversión.\n\n¿Quieres saber más sobre cómo funciona?',
      support: 'Nuestra Atención Inteligente revoluciona el servicio al cliente.\nChatbots multicanal con +95% de satisfacción.\n\n¿Te gustaría ver una demostración?',
      products: 'Ofrecemos seis categorías de soluciones de IA:\n\n• Automatización de Ventas: SDRs virtuales y cualificación de leads\n• Atención Inteligente: Chatbots multicanal y asistentes virtuales\n• RRHH Inteligente: Reclutamiento automatizado y analytics de fuerza laboral\n• BI & Analytics: Business Intelligence predictivo y en tiempo real\n• Automatización de Processos: RPA inteligente con IA avanzada\n• Voz & Lenguaje: NLP optimizado para portugués brasileño\n\n¿Qué solución te gustaría explorar más a fondo?',
      default: 'Estoy experimentando algunas dificultades técnicas en este momento.\nPero puedo conectarte con nuestro equipo comercial.\n\n¿Te gustaría agendar una conversación?'
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
  
  if (msg.includes('implementação') || msg.includes('tempo') || msg.includes('prazo') ||
      msg.includes('implementation') || msg.includes('timeline') || msg.includes('time') ||
      msg.includes('implementación') || msg.includes('plazo')) {
    return fallback.timeline;
  }
  
  if (msg.includes('automação de vendas') || msg.includes('vendas') ||
      msg.includes('sales automation') || msg.includes('sales') ||
      msg.includes('automatización de ventas') || msg.includes('ventas')) {
    return fallback.sales;
  }
  
  if (msg.includes('atendimento') || msg.includes('chatbot') ||
      msg.includes('support') || msg.includes('customer service') ||
      msg.includes('atención') || msg.includes('soporte')) {
    return fallback.support;
  }
  
  if (msg.includes('produtos') || msg.includes('soluções') || msg.includes('quais') ||
      msg.includes('products') || msg.includes('solutions') || msg.includes('what') ||
      msg.includes('productos') || msg.includes('soluciones')) {
    return fallback.products;
  }
  
  return fallback.default;
}

/**
 * Gera resposta da Sonia a partir de uma única mensagem (SEM histórico)
 * 
 * @param {Object} options - Opções para gerar a resposta
 * @param {string} options.message - Mensagem do usuário
 * @param {string} [options.channel='whatsapp'] - Canal de comunicação ('web' | 'whatsapp')
 * @param {string} [options.language] - Idioma ('pt' | 'en' | 'es'). Se não fornecido, será detectado automaticamente
 * @returns {Promise<string>} Resposta da Sonia em texto
 * 
 * NOTA: Esta função NÃO persiste histórico. Cada chamada é independente.
 * Futuramente, se necessário, pode-se adicionar um conversationStore aqui.
 */
export async function generateSoniaReplyFromSingleMessage(options) {
  const {
    message,
    channel = 'whatsapp',
    language: providedLanguage
  } = options;

  if (!message || !message.trim()) {
    throw new Error('Message is required');
  }

  // Detectar idioma se não fornecido
  const language = providedLanguage || detectLanguage(message);

  try {
    // Obter system prompt da Sonia no idioma correto
    const systemPrompt = getSystemPrompt(language);

    // Montar array mínimo de mensagens: apenas system prompt + mensagem atual
    // SEM histórico de mensagens anteriores
    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: message.trim()
      }
    ];

    // Determinar URL base do proxy OpenAI
    // Em ambiente serverless (Vercel), usar URL relativa ou absoluta conforme disponível
    const isServerless = process.env.VERCEL || process.env.VERCEL_URL;
    let baseUrl;
    
    if (isServerless) {
      // Em produção na Vercel - tentar usar URL relativa primeiro (mais confiável)
      // Se estiver na mesma Vercel, usar URL relativa
      baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'https://onsmart-website.vercel.app';
    } else {
      // Em desenvolvimento local
      baseUrl = process.env.OPENAI_API_URL || 'http://localhost:3001';
    }

    const proxyUrl = `${baseUrl}/api/openai-proxy`;
    console.log(`🔗 Chamando OpenAI proxy: ${proxyUrl}`);
    console.log(`🌐 Idioma detectado: ${language}`);

    // Chamar OpenAI através do proxy
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ OpenAI API error: ${response.status} - ${errorText}`);
      console.error(`❌ URL usada: ${proxyUrl}`);
      console.error(`❌ Variáveis de ambiente:`, {
        VERCEL: !!process.env.VERCEL,
        VERCEL_URL: process.env.VERCEL_URL,
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY
      });
      throw new Error(`OpenAI API error: ${response.status} - ${errorText.substring(0, 200)}`);
    }
    
    const data = await response.json();
    const assistantMessage = data.message;
    
    if (!assistantMessage) {
      console.error(`❌ Resposta vazia da OpenAI. Data recebida:`, JSON.stringify(data).substring(0, 200));
      throw new Error('No response from OpenAI');
    }
    
    // Log para debug (opcional, pode ser removido em produção)
    if (channel === 'whatsapp') {
      console.log(`✅ Sonia reply generated for WhatsApp (${language}): ${assistantMessage.substring(0, 50)}...`);
    }
    
    return assistantMessage;
  } catch (error) {
    console.error('Error generating Sonia reply:', error);
    
    // Retornar fallback em caso de erro
    return getFallbackResponse(message, language);
  }
}
