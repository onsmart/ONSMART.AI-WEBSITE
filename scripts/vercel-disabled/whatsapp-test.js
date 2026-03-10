/**
 * Cópia guardada: api/whatsapp/test.js (desativada no deploy Vercel - limite 12 funções).
 * Endpoint de teste do webhook WhatsApp. Ver scripts/vercel-disabled/README.md.
 */
export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Webhook endpoint está acessível!',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development'
  });
}
