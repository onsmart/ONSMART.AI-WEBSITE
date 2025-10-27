// API Route para ElevenLabs Widget (Vercel)
export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    
    if (!agentId) {
      return res.status(404).json({ error: 'ElevenLabs not configured' });
    }

    // Return widget HTML with embedded configuration (no Agent ID exposed)
    const widgetHtml = `
      <elevenlabs-convai 
        agent-id="${agentId}" 
        auto-start="false" 
        show-ui="true" 
        language="pt-BR"
        style="width: 100%; height: 100%;"
      ></elevenlabs-convai>
    `;
    
    res.status(200).json({ 
      widgetHtml,
      isConfigured: true,
      // Don't expose agentId in response
      config: {
        language: 'pt-BR',
        autoStart: false,
        showUI: true
      }
    });
  } catch (error) {
    console.error('Error creating ElevenLabs widget:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
