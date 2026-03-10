/**
 * Vercel Serverless Function: expõe o tRPC do marketing em /api/trpc/*.
 * Arquivo [...trpc].js (catch-all) para /api/trpc/qualquer-coisa.
 * Requer "npm run build && npm run build:server" no Build Command.
 */
export default async function handler(req, res) {
  const origin = req.headers?.origin;
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { createMarketingTrpcMiddleware } = await import('../../dist-server/index.js');
    const middleware = createMarketingTrpcMiddleware();

    const originalUrl = req.url || '/';
    const pathPrefix = '/api/trpc';
    req.url = originalUrl.startsWith(pathPrefix)
      ? originalUrl.slice(pathPrefix.length) || '/'
      : originalUrl;

    return new Promise((resolve) => {
      middleware(req, res, (err) => {
        if (err) {
          res.status(500).json({ error: 'tRPC handler error', message: err?.message });
        }
        resolve();
      });
    });
  } catch (err) {
    console.error('[api/trpc] Failed to load tRPC:', err?.message || err);
    return res.status(503).json({
      error: 'Backend não disponível',
      code: 'TRPC_NOT_LOADED',
      message: 'No build, rode "npm run build && npm run build:server" no Build Command da Vercel.',
    });
  }
}
