// Webhook para receber mensagens da Evolution API
// Este endpoint recebe mensagens do WhatsApp e processa com a Sonia

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verificação do webhook (GET) - Evolution API pode fazer verificação
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    console.log('Webhook Evolution API recebido:', JSON.stringify(payload, null, 2));

    // Evolution API envia eventos em diferentes formatos
    // Verificar se é uma mensagem recebida
    const event = payload.event || payload.type || payload.action;
    
    // Processar apenas mensagens recebidas (não enviadas)
    // Evolution API pode enviar: MESSAGES_UPSERT, messages.upsert, etc
    const isMessageEvent = event === 'MESSAGES_UPSERT' || 
                          event === 'messages.upsert' || 
                          event === 'messages' ||
                          payload.data?.key ||
                          payload.key;
    
    if (isMessageEvent) {
      // Extrair dados da mensagem (Evolution API pode enviar em diferentes formatos)
      const messageData = payload.data || payload;
      const messageKey = messageData.key || payload.key;
      const messageContent = messageData.message || messageData;
      
      // Verificar se a mensagem foi enviada por nós (ignorar)
      if (messageKey?.fromMe === true) {
        return res.status(200).json({ status: 'ignored', reason: 'self-message' });
      }
      
      if (!messageKey) {
        return res.status(200).json({ status: 'ignored', reason: 'no-key' });
      }

      // Extrair número do remetente
      const from = messageKey.remoteJid || messageKey.participant || messageData.from;
      if (!from) {
        return res.status(200).json({ status: 'ignored', reason: 'no-sender' });
      }

      // Limpar o número (remover @s.whatsapp.net se presente)
      const cleanFrom = from.split('@')[0];
      
      // Extrair texto da mensagem
      let messageText = '';
      if (messageContent.conversation) {
        messageText = messageContent.conversation;
      } else if (messageContent.extendedTextMessage?.text) {
        messageText = messageContent.extendedTextMessage.text;
      } else if (typeof messageContent === 'string') {
        messageText = messageContent;
      } else if (messageData.body) {
        messageText = messageData.body;
      }

      if (!messageText || messageText.trim() === '') {
        // Ignorar mensagens sem texto (imagens, áudios, etc)
        return res.status(200).json({ status: 'ignored', reason: 'no-text' });
      }

      console.log(`Mensagem recebida de ${cleanFrom}: ${messageText}`);

      // Processar mensagem com a Sonia
      // Chamar o serviço que integra com a OpenAI
      const soniaResponse = await processMessageWithSonia(cleanFrom, messageText);

      if (soniaResponse) {
        // Enviar resposta via Evolution API
        await sendWhatsAppMessage(cleanFrom, soniaResponse);
      }

      return res.status(200).json({ 
        status: 'processed',
        from: cleanFrom,
        message: messageText,
        response: soniaResponse
      });
    }

    // Outros tipos de eventos (conexão, status, etc)
    return res.status(200).json({ status: 'received', event });

  } catch (error) {
    console.error('Erro no webhook Evolution API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Função para processar mensagem com a Sonia (OpenAI)
async function processMessageWithSonia(from, message) {
  try {
    // Detectar URL base (Vercel ou local)
    // No Vercel, podemos usar a URL do deployment atual
    let baseUrl;
    
    // No Vercel, podemos chamar a função serverless diretamente
    // ou usar a URL do deployment atual
    if (process.env.VERCEL_URL) {
      // Produção no Vercel - usar a URL do deployment atual
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      // Fallback - tentar usar a URL do projeto
      // No Vercel, podemos usar a mesma função serverless
      baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'https://onsmart-website.vercel.app';
    }
    
    // Chamar a API da OpenAI através do proxy
    const response = await fetch(`${baseUrl}/api/openai-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: getSoniaSystemPrompt()
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.message || 'Desculpe, não consegui processar sua mensagem.';
  } catch (error) {
    console.error('Erro ao processar mensagem com Sonia:', error);
    // Retornar resposta padrão em caso de erro
    return 'Olá! Sou a Sonia, assistente de IA da onsmart AI. Estou com algumas dificuldades técnicas no momento, mas posso te ajudar. Como posso te auxiliar hoje?';
  }
}

// Função para obter o prompt do sistema da Sonia
function getSoniaSystemPrompt() {
  return `Você é Sonia, assistente de IA da onsmart AI, uma empresa brasileira especializada em Agentes de IA corporativos.

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
- Evite parágrafos longos - prefira frases curtas e diretas`;
}

// Função para enviar mensagem via Evolution API
async function sendWhatsAppMessage(to, message) {
  const { EVOLUTION_API_URL, EVOLUTION_API_KEY } = process.env;
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'sonia';

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.error('Evolution API não configurada');
    return false;
  }

  try {
    // Formatar número (adicionar @s.whatsapp.net se necessário)
    let formattedNumber = to.replace(/\D/g, '');
    if (!formattedNumber.includes('@')) {
      formattedNumber = `${formattedNumber}@s.whatsapp.net`;
    }

    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      },
      body: JSON.stringify({
        number: formattedNumber,
        text: message
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erro ao enviar mensagem:', error);
      return false;
    }

    console.log(`Mensagem enviada para ${to} com sucesso`);
    return true;
  } catch (error) {
    console.error('Erro ao enviar mensagem via Evolution API:', error);
    return false;
  }
}

