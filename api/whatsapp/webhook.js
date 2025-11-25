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
    
    // Log do payload recebido (parcialmente anonimizado para debug)
    console.log('📥 Webhook recebido:', JSON.stringify({
      event: payload.event || payload.type,
      instance: payload.instance,
      timestamp: payload.timestamp
    }));

    // IMPORTANTE: A estrutura abaixo é uma ESTIMATIVA
    // AJUSTAR conforme documentação oficial da Evolution API v2.x
    
    // Verificar se é um evento de mensagem recebida
    // Nome do evento pode variar: MESSAGES_UPSERT, messages.upsert, message.received, etc.
    // CONFIRMAR o nome exato na documentação v2
    const isMessageEvent = 
      payload.event === 'MESSAGES_UPSERT' ||
      payload.event === 'messages.upsert' ||
      payload.event === 'message.received' ||
      payload.type === 'message' ||
      payload.data?.key; // Se tiver key, provavelmente é uma mensagem

    if (!isMessageEvent) {
      // Ignorar outros tipos de eventos
      console.log('ℹ️ Evento ignorado (não é mensagem):', payload.event || payload.type);
      return res.status(200).json({ success: true, message: 'Event ignored' });
    }

    // Extrair informações da mensagem
    // Estrutura pode variar - AJUSTAR conforme doc oficial
    let messageData = payload.data || payload.message || payload;
    
    // Verificar se é mensagem de texto (ignorar mídias por enquanto)
    const messageType = messageData.messageType || messageData.type || messageData.message?.conversation;
    const isTextMessage = 
      messageType === 'conversation' ||
      messageType === 'text' ||
      messageData.message?.conversation ||
      messageData.text;

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
      return res.status(400).json({ error: 'Could not extract sender phone number' });
    }

    // Extrair texto da mensagem
    // Estrutura pode variar - AJUSTAR conforme doc oficial
    const messageText = 
      messageData.message?.conversation ||
      messageData.text ||
      messageData.body ||
      messageData.message?.extendedTextMessage?.text ||
      messageData.messageText;

    if (!messageText || !messageText.trim()) {
      console.error('❌ Mensagem vazia ou inválida');
      return res.status(400).json({ error: 'Empty or invalid message' });
    }

    console.log(`💬 Mensagem recebida de ${from}: ${messageText.substring(0, 50)}...`);

    // Gerar resposta da Sonia usando o mesmo "cérebro" (SEM histórico)
    const reply = await generateSoniaReplyFromSingleMessage({
      message: messageText,
      channel: 'whatsapp',
      language: undefined // Detectar automaticamente
    });

    console.log(`🤖 Resposta da Sonia: ${reply.substring(0, 50)}...`);

    // Enviar resposta via Evolution API
    await sendWhatsAppMessage(from, reply);

    // Retornar sucesso
    return res.status(200).json({ 
      success: true,
      message: 'Message processed successfully',
      reply: reply.substring(0, 100) // Log parcial
    });

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
  // IMPORTANTE: CONFIRMAR a estrutura exata na documentação v2
  const phoneNumber = 
    messageData.key?.remoteJid?.replace('@s.whatsapp.net', '').replace('@c.us', '') ||
    messageData.from?.replace('@s.whatsapp.net', '').replace('@c.us', '') ||
    messageData.remoteJid?.replace('@s.whatsapp.net', '').replace('@c.us', '') ||
    messageData.phoneNumber ||
    messageData.fromNumber ||
    messageData.key?.fromMe === false ? messageData.key?.participant?.replace('@s.whatsapp.net', '') : null;

  if (!phoneNumber) {
    console.warn('⚠️ Estrutura do payload não reconhecida:', JSON.stringify(messageData).substring(0, 200));
  }

  return phoneNumber;
}


