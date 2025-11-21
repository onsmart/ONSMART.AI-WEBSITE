// Endpoint removido
export default async function handler(req, res) {
  return res.status(404).json({ 
    error: 'Endpoint desabilitado',
    message: 'Evolution API foi removido do projeto.'
  });
}
