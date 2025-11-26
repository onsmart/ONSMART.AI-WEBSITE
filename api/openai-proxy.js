// API Proxy para OpenAI - Protege a chave API no servidor
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
    const { message, messages } = req.body;

    if (!message && !messages) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Usar a chave API do servidor (sem prefixo VITE_)
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ [openai-proxy] OpenAI API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Log de diagnóstico (sem expor a chave completa)
    console.log('🔑 [openai-proxy] API Key check:', {
      configured: !!apiKey,
      length: apiKey.length,
      startsWith: apiKey.substring(0, 7),
      endsWith: apiKey.substring(apiKey.length - 4)
    });

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
      console.error('❌ [openai-proxy] OpenAI API error:', response.status);
      console.error('❌ [openai-proxy] Error details:', errorData.substring(0, 500));
      console.error('❌ [openai-proxy] API Key info:', {
        configured: !!apiKey,
        length: apiKey.length,
        startsWith: apiKey.substring(0, 7)
      });
      return res.status(response.status).json({ 
        error: 'OpenAI API error',
        status: response.status,
        details: errorData 
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
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Desculpe, estou com dificuldades técnicas no momento. Mas posso te ajudar! Nossa equipe comercial pode esclarecer todas suas dúvidas sobre nossos Agentes de IA. Gostaria que eu te conectasse com eles?'
    });
  }
}
