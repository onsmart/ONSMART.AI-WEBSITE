/**
 * Webhook endpoint para receber eventos de atualização de conexão da Evolution API v2.x
 * 
 * Este endpoint recebe eventos de CONNECTION_UPDATE (conexão, desconexão, QR Code, etc.)
 * e apenas registra os eventos, sem processar nada.
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
    
    // Log do evento de conexão (para debug)
    console.log('🔌 Evento de conexão recebido:', JSON.stringify({
      event: payload.event || payload.type,
      instance: payload.instance || payload.instanceName,
      status: payload.status || payload.connectionStatus,
      timestamp: payload.timestamp || new Date().toISOString()
    }));

    // Apenas retornar sucesso - não processar nada
    // Isso evita erros 404 que podem estar causando problemas na conexão
    return res.status(200).json({ 
      success: true, 
      message: 'Connection update received' 
    });

  } catch (error) {
    console.error('❌ Erro ao processar evento de conexão:', error);
    
    // Mesmo em caso de erro, retornar 200 para não causar problemas na Evolution API
    return res.status(200).json({ 
      success: false,
      error: error.message 
    });
  }
}






