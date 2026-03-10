/**
 * Health check para deploy (ex.: Vercel). Confirma que as funções /api estão no ar.
 */
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    status: 'OK',
    message: 'API disponível',
    trpc: 'Use /api/trpc para a API do marketing (login, conteúdos, etc.).',
  });
}
