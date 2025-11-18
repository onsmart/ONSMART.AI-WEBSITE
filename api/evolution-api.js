// API Route para Evolution API (Vercel Serverless Function)
// Este arquivo faz proxy das requisições para evitar expor a API key no frontend

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { EVOLUTION_API_URL, EVOLUTION_API_KEY } = process.env;

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return res.status(500).json({ 
      error: 'Evolution API não configurada. Configure EVOLUTION_API_URL e EVOLUTION_API_KEY no Vercel.' 
    });
  }

  try {
    const { action, instanceName, ...body } = req.body;
    const { instance, ...queryParams } = req.query;

    // Determinar a instância a ser usada
    const targetInstance = instanceName || instance || 'sonia';

    let url = '';
    let method = req.method;
    let requestBody = null;

    switch (action || req.query.action) {
      case 'create':
        url = `${EVOLUTION_API_URL}/instance/create`;
        method = 'POST';
        requestBody = {
          instanceName: targetInstance,
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS'
        };
        break;

      case 'qrcode':
      case 'connect':
        url = `${EVOLUTION_API_URL}/instance/connect/${targetInstance}`;
        method = 'GET';
        break;

      case 'status':
        url = `${EVOLUTION_API_URL}/instance/fetchInstances`;
        method = 'GET';
        break;

      case 'send':
        url = `${EVOLUTION_API_URL}/message/sendText/${targetInstance}`;
        method = 'POST';
        requestBody = {
          number: body.number,
          text: body.text
        };
        break;

      case 'delete':
        url = `${EVOLUTION_API_URL}/instance/delete/${targetInstance}`;
        method = 'DELETE';
        break;

      case 'restart':
        url = `${EVOLUTION_API_URL}/instance/restart/${targetInstance}`;
        method = 'PUT';
        break;

      case 'logout':
        url = `${EVOLUTION_API_URL}/instance/logout/${targetInstance}`;
        method = 'DELETE';
        break;

      default:
        // Proxy direto para a API
        const path = req.query.path || '';
        url = `${EVOLUTION_API_URL}${path}`;
        requestBody = Object.keys(body).length > 0 ? body : null;
    }

    const headers = {
      'apikey': EVOLUTION_API_KEY,
      'Content-Type': 'application/json'
    };

    const fetchOptions = {
      method,
      headers
    };

    if (requestBody && method !== 'GET') {
      fetchOptions.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || data.error || 'Erro na Evolution API',
        details: data 
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro na Evolution API proxy:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}

