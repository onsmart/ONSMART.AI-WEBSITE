/**
 * Função para enviar mensagens via Evolution API v2.x
 * 
 * IMPORTANTE: A estrutura abaixo é uma ESTIMATIVA baseada em padrões comuns.
 * DEVE SER AJUSTADA conforme a documentação oficial da Evolution API v2.x
 * 
 * Documentação a consultar:
 * - Send Text: https://doc.evolution-api.com/v2/en/messages/send-text
 * - Endpoints: verificar URL exata do endpoint de envio
 */

/**
 * Envia uma mensagem de texto via Evolution API v2.x
 * 
 * @param {string} to - Número do destinatário (formato: 551150931836 ou +551150931836)
 * @param {string} text - Texto da mensagem
 * @returns {Promise<Object>} Resposta da Evolution API
 */
export async function sendWhatsAppMessage(to, text) {
  try {
    // Obter configurações da Evolution API
    const baseUrl = process.env.EVOLUTION_API_BASE_URL;
    const apiKey = process.env.EVOLUTION_API_APIKEY;
    const instanceId = process.env.EVOLUTION_API_INSTANCE_ID;

    if (!baseUrl || !apiKey || !instanceId) {
      throw new Error('Evolution API configuration missing. Check EVOLUTION_API_BASE_URL, EVOLUTION_API_APIKEY, and EVOLUTION_API_INSTANCE_ID environment variables.');
    }

    // Normalizar número (remover caracteres especiais, adicionar @s.whatsapp.net se necessário)
    const normalizedNumber = normalizePhoneNumber(to);

    // IMPORTANTE: A URL e payload abaixo são ESTIMATIVAS
    // AJUSTAR conforme documentação oficial da Evolution API v2.x
    // 
    // Possíveis formatos de endpoint (CONFIRMAR na doc v2):
    // - /message/sendText/{instance}
    // - /v2/message/sendText/{instance}
    // - /instance/{instance}/message/sendText
    // - /message/send-text/{instance}
    
    const endpoint = `${baseUrl}/message/sendText/${instanceId}`;
    
    // IMPORTANTE: O payload abaixo é uma ESTIMATIVA
    // AJUSTAR conforme documentação oficial
    // 
    // Possíveis estruturas (CONFIRMAR na doc v2):
    // { number: "...", text: "..." }
    // { to: "...", message: { text: "..." } }
    // { phoneNumber: "...", textMessage: { text: "..." } }
    
    const payload = {
      number: normalizedNumber,
      text: text
    };

    console.log(`📤 Enviando mensagem para ${normalizedNumber} via Evolution API...`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // IMPORTANTE: Nome do header pode variar - CONFIRMAR na doc v2
        // Possíveis opções:
        'apikey': apiKey, // Mais comum
        // 'Authorization': `Bearer ${apiKey}`,
        // 'X-API-Key': apiKey,
        // 'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`,
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro ao enviar mensagem: ${response.status} - ${errorText}`);
      throw new Error(`Evolution API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Mensagem enviada com sucesso:`, data);

    return data;
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem via Evolution API:', error);
    throw error;
  }
}

/**
 * Normaliza o número de telefone para o formato esperado pela Evolution API
 * 
 * @param {string} phoneNumber - Número em qualquer formato
 * @returns {string} - Número normalizado (sem @s.whatsapp.net, sem +, sem espaços)
 */
function normalizePhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    throw new Error('Phone number is required');
  }

  // Remover @s.whatsapp.net ou @c.us se presente
  let normalized = phoneNumber
    .replace('@s.whatsapp.net', '')
    .replace('@c.us', '')
    .trim();

  // Remover caracteres especiais (+, -, espaços, parênteses)
  normalized = normalized.replace(/[\+\-\(\)\s]/g, '');

  // Garantir que começa com código do país (se não começar com número, assumir Brasil 55)
  if (!/^\d/.test(normalized)) {
    normalized = '55' + normalized;
  }

  return normalized;
}






