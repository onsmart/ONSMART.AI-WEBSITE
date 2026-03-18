// API Proxy para OpenAI - Protege a chave API no servidor
// CORS: em produção defina OPENAI_PROXY_ALLOWED_ORIGIN (ex.: https://onsmart.ai ou múltiplas origens separadas por vírgula).
// Rate limiting: recomenda-se configurar no edge (ex.: Vercel Rate Limit) ou com store externo (Redis).

const MAX_MESSAGE_LENGTH = 8000;
const MAX_MESSAGES_COUNT = 50;

function getAllowedOrigin(req) {
  const raw = process.env.OPENAI_PROXY_ALLOWED_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (!raw) return '*';
  const allowed = raw.split(',').map(o => o.trim()).map(o => o.startsWith('http') ? o : `https://${o}`);
  const requestOrigin = (req.headers?.origin || '').trim();
  if (requestOrigin && allowed.includes(requestOrigin)) return requestOrigin;
  return allowed[0];
}

export default async function handler(req, res) {
  const origin = getAllowedOrigin(req);
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, messages } = req.body || {};

    if (!message && !messages) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message && typeof message === 'string' && message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message too long' });
    }

    const msgList = Array.isArray(messages) ? messages : null;
    if (msgList && msgList.length > MAX_MESSAGES_COUNT) {
      return res.status(400).json({ error: 'Too many messages' });
    }

    for (const m of msgList || []) {
      if (m && typeof m.content === 'string' && m.content.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ error: 'Message content too long' });
      }
    }

    // Usar a chave API do servidor (sem prefixo VITE_)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ [openai-proxy] OpenAI API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Preparar mensagens para a API
    const apiMessages = messages || [
      {
        role: 'system',
        content: 'Você é a Sonia, assistente de IA da OnSmart AI. Responda de forma concisa (máximo 2-3 frases) e sempre termine com uma pergunta. Não use emojis nem formatação markdown.'
      },
      {
        role: 'user',
        content: message
      }
    ];

    // Chamar a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: apiMessages,
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
        max_tokens: 150,
        stream: false,
        presence_penalty: 0.6,
        frequency_penalty: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ [openai-proxy] OpenAI API error:', response.status, errorData.substring(0, 200));
      return res.status(502).json({
        error: 'Service temporarily unavailable',
        message: 'Desculpe, estou com dificuldades técnicas no momento. Nossa equipe comercial pode esclarecer suas dúvidas sobre nossos Agentes de IA. Gostaria que eu te conectasse com eles?'
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    return res.status(200).json({ 
      message: assistantMessage,
      usage: data.usage 
    });

  } catch (error) {
    console.error('❌ [openai-proxy] Proxy error:', error?.message ?? String(error));
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Desculpe, estou com dificuldades técnicas no momento. Mas posso te ajudar! Nossa equipe comercial pode esclarecer todas suas dúvidas sobre nossos Agentes de IA. Gostaria que eu te conectasse com eles?'
    });
  }
}
