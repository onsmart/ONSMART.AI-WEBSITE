import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Cookie parser for marketing tRPC (httpOnly cookies)
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// Middleware (limite do body para upload de PDF/imagem em base64 via tRPC; configurável por BODY_LIMIT_MB no .env)
const bodyLimitMb = process.env.BODY_LIMIT_MB || '15';
app.use(express.json({ limit: `${bodyLimitMb}mb` }));

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Docker Monitoring endpoints
app.get('/api/docker/status', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const { stdout } = await execAsync('docker version --format "{{.Server.Version}}"');
    const dockerRunning = stdout.trim().length > 0;
    
    res.json({
      dockerRunning,
      version: dockerRunning ? stdout.trim() : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[docker/status]', error?.message ?? error);
    res.json({
      dockerRunning: false,
      version: null,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/docker/containers', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const { stdout } = await execAsync(`
      docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.State}}\t{{.Ports}}\t{{.CreatedAt}}\t{{.Command}}"
    `);
    
    const lines = stdout.trim().split('\n').slice(1);
    const containers = lines.map(line => {
      const parts = line.split('\t');
      return {
        id: parts[0],
        name: parts[1],
        image: parts[2],
        status: parts[3],
        state: parts[4],
        ports: parts[5] ? parts[5].split(',') : [],
        created: parts[6],
        command: parts[7] || ''
      };
    });

    res.json({ containers });
  } catch (error) {
    console.error('[docker/containers]', error?.message ?? error);
    res.status(500).json({ error: 'Erro ao listar containers' });
  }
});

app.get('/api/docker/system', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const [containersResult, imagesResult, volumesResult, networksResult] = await Promise.all([
      execAsync('docker ps -a --format "{{.State}}"'),
      execAsync('docker images --format "{{.Repository}}"'),
      execAsync('docker volume ls --format "{{.Name}}"'),
      execAsync('docker network ls --format "{{.Name}}"')
    ]);

    const containerStates = containersResult.stdout.trim().split('\n').filter(s => s);
    const running = containerStates.filter(state => state === 'running').length;
    const paused = containerStates.filter(state => state === 'paused').length;
    const stopped = containerStates.filter(state => state === 'exited').length;

    const systemInfo = {
      containers: containerStates.length,
      running,
      paused,
      stopped,
      images: imagesResult.stdout.trim().split('\n').filter(s => s).length,
      volumes: volumesResult.stdout.trim().split('\n').filter(s => s).length,
      networks: networksResult.stdout.trim().split('\n').filter(s => s).length
    };

    res.json({ systemInfo });
  } catch (error) {
    console.error('[docker/system]', error?.message ?? error);
    res.status(500).json({ error: 'Erro ao obter informações do sistema' });
  }
});

app.get('/api/docker/ollama', async (req, res) => {
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const { stdout: containerStatus } = await execAsync(`
      docker ps --filter "name=ollama" --format "{{.State}}"
    `);
    
    const containerRunning = containerStatus.trim() === 'running';
    
    let models = [];
    let apiAvailable = false;

    if (containerRunning) {
      try {
        const { stdout: modelsOutput } = await execAsync(`
          docker exec ollama ollama list --format json
        `);
        
        const modelsData = JSON.parse(modelsOutput);
        models = modelsData.models || [];
        apiAvailable = true;
      } catch (ollamaError) {
        console.log('Ollama API não disponível:', ollamaError.message);
      }
    }

    res.json({
      containerRunning,
      models,
      apiAvailable,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[docker/ollama]', error?.message ?? error);
    res.status(500).json({ error: 'Erro ao verificar status do Ollama' });
  }
});

app.post('/api/docker/containers/:containerName/:action', async (req, res) => {
  try {
    const { containerName, action } = req.params;
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    await execAsync(`docker ${action} ${containerName}`);
    res.json({ 
      success: true,
      message: `Container ${containerName} ${action} executado com sucesso`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[docker/containers action]', error?.message ?? error);
    res.status(500).json({ error: `Erro ao ${req.params.action} container` });
  }
});

app.get('/api/docker/containers/:containerName/logs', async (req, res) => {
  try {
    const { containerName } = req.params;
    const lines = req.query.lines || 100;
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const { stdout } = await execAsync(`
      docker logs --tail ${lines} ${containerName}
    `);
    
    const logs = stdout.trim().split('\n');
    res.json({ logs });
  } catch (error) {
    console.error('[docker/logs]', error?.message ?? error);
    res.status(500).json({ error: 'Erro ao obter logs do container' });
  }
});

// OpenAI Proxy endpoint
app.post('/api/openai-proxy', async (req, res) => {
  try {
    const { message, messages } = req.body;

    if (!message && !messages) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use OpenAI API key from environment
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Prepare messages for API
    const apiMessages = messages || [
      {
        role: 'system',
        content: 'Você é a Sonia, assistente de IA da OnSmart AI. Responda de forma concisa (máximo 2-3 frases) e sempre termine com uma pergunta. Não use emojis nem formatação markdown.'
      },
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: apiMessages,
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
        max_tokens: 150,
        stream: false,
        presence_penalty: 0.6,
        frequency_penalty: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return res.status(response.status).json({
        error: `OpenAI API error: ${response.status}`
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error in OpenAI proxy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Format plain text to responsive HTML using GPT (for marketing content editor)
app.post('/api/openai-format-html', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Campo "text" é obrigatório' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API OpenAI não configurada' });
    }

    const systemPrompt = `Você é um editor que transforma texto em HTML para artigos de site. O resultado será exibido com CSS "prose" e pode usar CSS inline no atributo style para deixar o documento mais profissional (espaçamento, tipografia, hierarquia visual).

HIERARQUIA OBRIGATÓRIA (siga à risca):

1. TÍTULO DE SEÇÃO PRINCIPAL → sempre <h2>
   Qualquer frase que for o título de uma seção (ex.: "Pequenas Mudanças", "O processo", "A conclusão") deve ser <h2>texto</h2>.
   NUNCA use h1 (o título do artigo já existe na página).

2. SUBTÍTULO / TÍTULO DE SUBSEÇÃO → sempre <h3>
   Frases curtas que introduzem um bloco (ex.: "O começo", "O processo") devem ser <h3>texto</h3>, NÃO <strong> nem texto solto.

3. PARÁGRAFOS
   Todo texto contínuo em <p>...</p>. Separe ideias em parágrafos distintos; parágrafos curtos (2–4 frases) são melhores.

4. LISTAS
   Marcadores → <ul><li>...</li></ul>. Numeradas → <ol><li>...</li></ol>.

5. ÊNFASE
   <strong> para termos importantes. <em> para citações. <a href="URL">texto</a> para links (ex.: href="/contato").

6. CALL-TO-ACTION NO FINAL
   Convite à ação em <p> com <strong> e, se houver, <a href="/contato">...</a>.

CSS INLINE (use para deixar o documento mais profissional):
- Pode e deve usar o atributo style nas tags. Use APENAS estas propriedades (seguras): margin, margin-top, margin-bottom, padding, padding-bottom, line-height, color, font-size, font-weight, text-align, letter-spacing, border-bottom, max-width.
- Valores: use unidades como rem, em, px ou % (ex.: 1.5rem, 1.6). Cores em hex (#374151) ou rgb/rgba.
- Sugestões:
  • h2: style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;"
  • h3: style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;"
  • h4: style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: #374151; font-weight: 600;"
  • p: style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;"
  • Primeiro parágrafo após título: style="line-height: 1.75; margin-bottom: 1rem; color: #374151; font-size: 1.0625rem;"
- NÃO use: url(), expression(), behavior, javascript, ou propriedades que carreguem recursos externos.

TAGS PERMITIDAS: p, h2, h3, h4, ul, ol, li, strong, em, a, br. Atributos permitidos: href, style. Sem script, div ou atributos event (onclick, etc.).

EXEMPLO COM CSS INLINE (estrutura + estilo profissional):
<h2 style="margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; color: #111827; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Pequenas Mudanças</h2>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">O começo</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Às vezes, grandes resultados começam com ajustes simples.</p>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">O processo</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">Nem toda evolução acontece rápido.</p>
<h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; font-weight: 600;">A conclusão</h3>
<p style="line-height: 1.75; margin-bottom: 1rem; color: #4b5563;">No fim, o que parece pequeno pode fazer diferença.</p>

REGRAS FINAIS:
- Mantenha a ordem e o conteúdo do texto original. Não invente nem remova trechos.
- Todo título ou subtítulo reconhecível deve ser h2 ou h3, nunca só negrito.
- Use tags com caracteres < e > reais. NUNCA use entidades &lt; ou &gt;.
- Se o texto já tiver HTML, preserve e respeite; apenas ajuste estrutura e estilos se necessário.
- Aplique style inline em h2, h3, h4 e p para um visual consistente e profissional.
- Retorne SOMENTE o HTML, sem explicação, sem markdown, sem \`\`\` ou texto extra.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        temperature: 0.15,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenAI format-html error:', response.status, errText);
      return res.status(response.status).json({ error: 'Erro ao formatar com IA' });
    }

    const data = await response.json();
    let html = data.choices?.[0]?.message?.content?.trim();
    if (!html) return res.status(500).json({ error: 'Resposta vazia da IA' });
    html = html.replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/i, '').trim();
    // Decodificar entidades HTML para que o frontend renderize as tags (não mostre como texto)
    html = html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');

    res.json({ html });
  } catch (error) {
    console.error('Error in openai-format-html:', error);
    res.status(500).json({ error: 'Erro interno ao formatar' });
  }
});

// ElevenLabs Widget endpoint (completely secure - no API calls needed)
app.get('/api/elevenlabs-widget', (req, res) => {
  try {
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    
    if (!agentId) {
      // Return not configured status instead of 404 error
      return res.json({ 
        widgetHtml: '', 
        isConfigured: false, 
        config: { hasVoiceSupport: false },
        message: 'ElevenLabs não configurado. Chat funcionará apenas em modo texto.'
      });
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
    
    res.json({ 
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
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Marketing tRPC (mount after build:server). Em produção, garantir que npm run build:server foi executado e que as requisições /api/* chegam a este servidor Node.
let trpcLoaded = false;
try {
  const { createMarketingTrpcMiddleware, runBackfillIfEnabled, runMarketingSeedIfEnabled } = await import('./dist-server/index.js');
  app.use('/api/trpc', createMarketingTrpcMiddleware());
  trpcLoaded = true;
  runMarketingSeedIfEnabled().catch((err) => console.error('[marketing] Seed:', err));
  runBackfillIfEnabled().catch((err) => console.error('[marketing] Backfill:', err));
} catch (e) {
  console.warn('Marketing tRPC not loaded (run npm run build:server):', e.message);
  // Fallback: /api/trpc retorna JSON para o cliente não interpretar como HTML
  app.use('/api/trpc', (req, res) => {
    res.status(503).json({
      error: 'Backend não disponível',
      code: 'TRPC_NOT_LOADED',
      message: 'O servidor da API não foi carregado. No deploy, execute "npm run build:server" e inicie com "node server.js" (ou "npm start").',
    });
  });
}

// Rota para verificar se a API está no ar (útil para proxy/deploy)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    trpcLoaded,
    message: trpcLoaded ? 'API disponível' : 'API parcial: tRPC não carregado (execute npm run build:server)',
  });
});

// Catch all handler: must be last route - redireciona todas as rotas para index.html
// Isso é necessário para SPAs que usam React Router
app.get('*', (req, res) => {
  // Ignorar requisições de API para evitar conflitos
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 OpenAI proxy available at http://localhost:${PORT}/api/openai-proxy`);
  console.log(`🎙️  ElevenLabs config available at http://localhost:${PORT}/api/elevenlabs-config`);
});
