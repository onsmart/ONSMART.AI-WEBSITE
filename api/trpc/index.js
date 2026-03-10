/**
 * Rota exata /api/trpc (sem segmento). Mesma lógica que [...trpc].js.
 */
export default async function handler(req, res) {
  const mod = await import('./[...trpc].js');
  return mod.default(req, res);
}
