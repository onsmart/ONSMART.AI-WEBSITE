/**
 * Cópia guardada: api/whatsapp/test-config.js (desativada no deploy Vercel - limite 12 funções).
 * Endpoint de teste de configuração WhatsApp/Evolution. Ver scripts/vercel-disabled/README.md.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development',
    vercelUrl: process.env.VERCEL_URL || 'not set',
    checks: {}
  };
  results.checks.openaiApiKey = { configured: !!process.env.OPENAI_API_KEY, status: process.env.OPENAI_API_KEY ? '✅ OK' : '❌ MISSING' };
  results.checks.evolutionBaseUrl = { configured: !!process.env.EVOLUTION_API_BASE_URL, status: process.env.EVOLUTION_API_BASE_URL ? '✅ OK' : '❌ MISSING' };
  results.checks.evolutionApiKey = { configured: !!process.env.EVOLUTION_API_APIKEY, status: process.env.EVOLUTION_API_APIKEY ? '✅ OK' : '❌ MISSING' };
  results.checks.evolutionInstanceId = { configured: !!process.env.EVOLUTION_API_INSTANCE_ID, status: process.env.EVOLUTION_API_INSTANCE_ID ? '✅ OK' : '❌ MISSING' };
  return res.status(200).json(results);
}
