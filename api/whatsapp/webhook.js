/**
 * Webhook endpoint para receber eventos da Evolution API v2.x
 * 
 * IMPORTANTE: A estrutura do payload abaixo é uma ESTIMATIVA baseada em padrões comuns.
 * DEVE SER AJUSTADA conforme a documentação oficial da Evolution API v2.x
 * 
 * Documentação a consultar:
 * - Webhooks: https://doc.evolution-api.com/v2/en/configuration/webhooks
 * - Eventos de mensagem: verificar nome exato do evento (ex: MESSAGES_UPSERT)
 */

import { generateSoniaReplyFromSingleMessage } from '../services/soniaBrain.js';
import { sendWhatsAppMessage } from '../services/evolutionApi.js';

// Função auxiliar para detectar idioma (mesma lógica do soniaBrain)
function detectLanguage(message) {
  if (!message || !message.trim()) {
    return 'pt';
  }
  
  const msg = message.toLowerCase().trim();
  
  const englishKeywords = [
    'hello', 'hi', 'hey', 'how', 'what', 'when', 'where', 'why', 'who',
    'the', 'is', 'are', 'can', 'will', 'would', 'could', 'should',
    'please', 'thanks', 'thank you', 'yes', 'no', 'ok', 'okay'
  ];
  
  const spanishKeywords = [
    'hola', 'cómo', 'qué', 'cuándo', 'dónde', 'por qué', 'quién',
    'es', 'son', 'puede', 'gracias', 'por favor', 'sí', 'no'
  ];
  
  const portugueseKeywords = [
    'olá', 'oi', 'como', 'o que', 'quando', 'onde', 'por que', 'quem',
    'é', 'são', 'pode', 'obrigado', 'obrigada', 'por favor', 'sim', 'não'
  ];
  
  const englishCount = englishKeywords.filter(kw => msg.includes(kw)).length;
  const spanishCount = spanishKeywords.filter(kw => msg.includes(kw)).length;
  const portugueseCount = portugueseKeywords.filter(kw => msg.includes(kw)).length;
  
  const spanishPatterns = /[áéíóúñü¿¡]/i;
  const portuguesePatterns = /[áàâãéêíóôõúç]/i;
  const englishPatterns = /\b(the|is|are|can|will|would|could|should)\b/i;
  
  if (spanishPatterns.test(msg) && !portuguesePatterns.test(msg)) {
    return 'es';
  }
  if (portuguesePatterns.test(msg)) {
    return 'pt';
  }
  if (englishPatterns.test(msg) && englishCount >= 2) {
    return 'en';
  }
  
  if (englishCount > spanishCount && englishCount > portugueseCount && englishCount >= 2) {
    return 'en';
  }
  if (spanishCount > englishCount && spanishCount > portugueseCount && spanishCount >= 2) {
    return 'es';
  }
  if (portugueseCount > 0) {
    return 'pt';
  }
  
  return 'pt'; // Padrão
}

/**
 * Handler do webhook
 * Recebe eventos da Evolution API e processa mensagens
 */
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    
    // Log completo do payload recebido (para debug - remover dados sensíveis em produção)
    console.log('📥 Webhook recebido (payload completo):', JSON.stringify(payload, null, 2));
    
    // Log resumido
    console.log('📥 Webhook recebido (resumo):', {
      event: payload.event || payload.type,
      instance: payload.instance || payload.instanceName,
      timestamp: payload.timestamp,
      hasData: !!payload.data,
      hasMessage: !!payload.message,
      keys: Object.keys(payload)
    });

    // IMPORTANTE: A estrutura abaixo é uma ESTIMATIVA
    // AJUSTAR conforme documentação oficial da Evolution API v2.x
    
    // Verificar se é um evento de mensagem recebida
    // Nome do evento pode variar: MESSAGES_UPSERT, messages.upsert, message.received, etc.
    const isMessageEvent = 
      payload.event === 'MESSAGES_UPSERT' ||
      payload.event === 'messages.upsert' ||
      payload.event === 'message.received' ||
      payload.type === 'message' ||
      payload.data?.key || // Se tiver key, provavelmente é uma mensagem
      payload.key || // Pode estar no nível raiz
      (payload.data && Array.isArray(payload.data) && payload.data.length > 0); // Array de mensagens

    if (!isMessageEvent) {
      // Ignorar outros tipos de eventos
      console.log('ℹ️ Evento ignorado (não é mensagem):', payload.event || payload.type || 'unknown');
      return res.status(200).json({ success: true, message: 'Event ignored' });
    }

    // Extrair informações da mensagem
    // Estrutura pode variar - Evolution API v2.3.6 pode enviar array ou objeto
    let messageData;
    
    // Se payload.data é um array, pegar o primeiro item
    if (Array.isArray(payload.data) && payload.data.length > 0) {
      messageData = payload.data[0];
    } else if (payload.data) {
      messageData = payload.data;
    } else if (payload.message) {
      messageData = payload.message;
    } else {
      messageData = payload;
    }
    
    console.log('📦 Dados da mensagem extraídos:', JSON.stringify({
      hasKey: !!messageData.key,
      hasMessage: !!messageData.message,
      messageType: messageData.messageType || messageData.type,
      keys: Object.keys(messageData)
    }));
    
    // Verificar se é mensagem de texto (ignorar mídias por enquanto)
    // Verificar se é mensagem enviada por nós (fromMe: true) - ignorar
    if (messageData.key?.fromMe === true || messageData.fromMe === true) {
      console.log('ℹ️ Mensagem ignorada (enviada por nós):', messageData.key?.id);
      return res.status(200).json({ success: true, message: 'Message from us ignored' });
    }
    
    const messageType = messageData.messageType || messageData.type || 
                       (messageData.message?.conversation ? 'conversation' : null) ||
                       (messageData.message?.extendedTextMessage ? 'extendedTextMessage' : null);
    
    const isTextMessage = 
      messageType === 'conversation' ||
      messageType === 'text' ||
      messageType === 'extendedTextMessage' ||
      !!messageData.message?.conversation ||
      !!messageData.message?.extendedTextMessage?.text ||
      !!messageData.text;

    if (!isTextMessage) {
      // Responder com mensagem padrão para mídias
      const from = extractPhoneNumber(messageData);
      if (from) {
        const fallbackMessage = 'Olá! Por enquanto, só consigo processar mensagens de texto. Por favor, envie sua dúvida por escrito.';
        await sendWhatsAppMessage(from, fallbackMessage);
      }
      return res.status(200).json({ success: true, message: 'Media message ignored' });
    }

    // Extrair número do remetente (userId)
    const from = extractPhoneNumber(messageData);
    if (!from) {
      console.error('❌ Não foi possível extrair número do remetente');
      console.error('❌ Estrutura do payload:', JSON.stringify(messageData, null, 2).substring(0, 500));
      // Retornar 200 para não causar retentativas infinitas, mas logar o erro
      return res.status(200).json({ 
        success: false, 
        error: 'Could not extract sender phone number',
        debug: 'Check logs for payload structure'
      });
    }

    // Extrair texto da mensagem
    // Estrutura pode variar - Evolution API v2.3.6
    const messageText = 
      messageData.message?.conversation ||
      messageData.message?.extendedTextMessage?.text ||
      messageData.text ||
      messageData.body ||
      messageData.messageText ||
      messageData.content?.text;

    if (!messageText || !messageText.trim()) {
      console.error('❌ Mensagem vazia ou inválida');
      console.error('❌ Estrutura do payload:', JSON.stringify(messageData, null, 2).substring(0, 500));
      // Retornar 200 para não causar retentativas infinitas, mas logar o erro
      return res.status(200).json({ 
        success: false, 
        error: 'Empty or invalid message',
        debug: 'Check logs for payload structure'
      });
    }

    console.log(`💬 Mensagem recebida de ${from}: ${messageText.substring(0, 50)}...`);

    // Gerar resposta da Sonia usando o mesmo "cérebro" (SEM histórico)
    // Detectar idioma antes de chamar
    const detectedLanguage = detectLanguage(messageText);
    console.log(`🌐 Idioma detectado para mensagem: ${detectedLanguage}`);
    console.log(`📝 Texto completo: ${messageText}`);
    
    try {
      const reply = await generateSoniaReplyFromSingleMessage({
        message: messageText,
        channel: 'whatsapp',
        language: detectedLanguage // Usar idioma detectado
      });

      console.log(`🤖 Resposta da Sonia (${detectedLanguage}): ${reply.substring(0, 100)}...`);

      // Enviar resposta via Evolution API
      await sendWhatsAppMessage(from, reply);

      // Retornar sucesso
      return res.status(200).json({ 
        success: true,
        message: 'Message processed successfully',
        language: detectedLanguage,
        reply: reply.substring(0, 100) // Log parcial
      });
    } catch (error) {
      console.error('❌ Erro ao gerar resposta da Sonia:', error);
      console.error('❌ Stack:', error.stack);
      
      // Enviar mensagem de erro amigável
      const errorMessage = `Desculpe, estou com algumas dificuldades técnicas no momento. Por favor, tente novamente em alguns instantes.`;
      await sendWhatsAppMessage(from, errorMessage);
      
      return res.status(200).json({ 
        success: false,
        error: error.message,
        language: detectedLanguage
      });
    }

  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

/**
 * Extrai o número de telefone do payload
 * A estrutura pode variar - AJUSTAR conforme doc oficial
 */
function extractPhoneNumber(messageData) {
  // Tentar diferentes estruturas comuns
  // Evolution API v2.3.6 pode usar diferentes formatos
  let phoneNumber = null;
  
  // Tentar key.remoteJid (mais comum)
  if (messageData.key?.remoteJid) {
    phoneNumber = messageData.key.remoteJid
      .replace('@s.whatsapp.net', '')
      .replace('@c.us', '')
      .replace('@g.us', ''); // Grupos
  }
  
  // Tentar from
  if (!phoneNumber && messageData.from) {
    phoneNumber = messageData.from
      .replace('@s.whatsapp.net', '')
      .replace('@c.us', '')
      .replace('@g.us', '');
  }
  
  // Tentar remoteJid direto
  if (!phoneNumber && messageData.remoteJid) {
    phoneNumber = messageData.remoteJid
      .replace('@s.whatsapp.net', '')
      .replace('@c.us', '')
      .replace('@g.us', '');
  }
  
  // Tentar outros campos
  if (!phoneNumber) {
    phoneNumber = messageData.phoneNumber || 
                  messageData.fromNumber ||
                  messageData.number;
  }
  
  // Tentar participant (para grupos)
  if (!phoneNumber && messageData.key?.participant) {
    phoneNumber = messageData.key.participant
      .replace('@s.whatsapp.net', '')
      .replace('@c.us', '');
  }

  if (!phoneNumber) {
    console.warn('⚠️ Estrutura do payload não reconhecida para extrair número');
    console.warn('⚠️ Keys disponíveis:', Object.keys(messageData));
    if (messageData.key) {
      console.warn('⚠️ Keys em messageData.key:', Object.keys(messageData.key));
    }
  }

  return phoneNumber;
}


