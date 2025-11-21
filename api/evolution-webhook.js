// Webhook para receber mensagens da Evolution API
// Este endpoint recebe mensagens do WhatsApp e processa com a Sonia

import { processSoniaMessage } from './services/soniaService.js';

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

      // Processar mensagem com a Sonia usando o serviço compartilhado (com histórico)
      const soniaResponse = await processSoniaMessage(
        cleanFrom,        // userId (número do WhatsApp)
        messageText,      // mensagem
        { 
          channel: 'whatsapp', 
          language: 'pt'  // TODO: detectar idioma do usuário se necessário
        }
      );

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

// Função removida - agora usamos processSoniaMessage do soniaService.js

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

