/**
 * Endpoint de teste simples para verificar se o webhook está acessível
 * Acesse: /api/whatsapp/test
 */
export default async function handler(req, res) {
  console.log('🧪 [test] Endpoint de teste chamado!');
  console.log('🧪 [test] Method:', req.method);
  console.log('🧪 [test] Timestamp:', new Date().toISOString());
  
  return res.status(200).json({
    success: true,
    message: 'Webhook endpoint está acessível!',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development'
  });
}

