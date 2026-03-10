/**
 * Vercel Serverless: stub para /api/docker/* (Docker não disponível em serverless).
 * Responde 200 + JSON compatível com dockerMonitoringService para não quebrar a UI.
 */
const NOT_AVAILABLE = { available: false, message: 'Docker não disponível neste ambiente (serverless).' };

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const pathSegments = Array.isArray(req.query.path) ? req.query.path : (req.query.path ? [req.query.path] : []);
  const path = pathSegments.join('/');

  // GET /api/docker/status → frontend espera data.dockerRunning
  if (req.method === 'GET' && (path === 'status' || path.startsWith('status'))) {
    return res.status(200).json({ dockerRunning: false, ...NOT_AVAILABLE });
  }

  // GET /api/docker/containers → data.containers (array)
  if (req.method === 'GET' && path === 'containers') {
    return res.status(200).json({ containers: [], ...NOT_AVAILABLE });
  }

  // GET /api/docker/containers/:name/logs → data.logs (array)
  if (req.method === 'GET' && path.match(/^containers\/[^/]+\/logs$/)) {
    return res.status(200).json({ logs: [], ...NOT_AVAILABLE });
  }

  // POST /api/docker/containers/:name/:action (start|stop|restart) → frontend só checa response.ok
  if (req.method === 'POST' && path.match(/^containers\/[^/]+\/(start|stop|restart)$/)) {
    return res.status(200).json({ ok: true, ...NOT_AVAILABLE });
  }

  // GET /api/docker/system → data.systemInfo
  if (req.method === 'GET' && (path === 'system' || path.startsWith('system'))) {
    return res.status(200).json({
      systemInfo: {
        containers: 0,
        running: 0,
        paused: 0,
        stopped: 0,
        images: 0,
        volumes: 0,
        networks: 0,
      },
      ...NOT_AVAILABLE,
    });
  }

  // GET /api/docker/ollama → containerRunning, models, apiAvailable
  if (req.method === 'GET' && (path === 'ollama' || path.startsWith('ollama'))) {
    return res.status(200).json({
      containerRunning: false,
      models: [],
      apiAvailable: false,
      ...NOT_AVAILABLE,
    });
  }

  // Qualquer outro path sob /api/docker/*
  return res.status(200).json(NOT_AVAILABLE);
}
