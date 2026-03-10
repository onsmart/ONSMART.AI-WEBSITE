/**
 * Vercel Serverless Function: expõe o tRPC do marketing em /api/trpc e /api/trpc/*.
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

    let path = (req.url || '/').replace(/^\//, '');
    const prefix = 'api/trpc';
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length).replace(/^\//, '') || '/';
    }
    // Rewrite /api/trpc -> /api/trpc/_ envia path "_"; tratar como /
    const pathOnly = path.split('?')[0];
    const query = path.includes('?') ? '?' + path.slice(path.indexOf('?') + 1) : '';
    req.url = ((pathOnly === '_' || pathOnly === '') ? '/' : '/' + pathOnly) + query;

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
