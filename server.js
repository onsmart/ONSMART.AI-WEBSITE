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

// Middleware
app.use(cors());
app.use(express.json());

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
    res.json({
      dockerRunning: false,
      version: null,
      error: error.message,
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
    res.status(500).json({ 
      error: 'Erro ao listar containers',
      details: error.message 
    });
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
    res.status(500).json({ 
      error: 'Erro ao obter informações do sistema',
      details: error.message 
    });
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
    res.status(500).json({ 
      error: 'Erro ao verificar status do Ollama',
      details: error.message 
    });
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
    res.status(500).json({ 
      error: `Erro ao ${req.params.action} container`,
      details: error.message 
    });
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
    res.status(500).json({ 
      error: 'Erro ao obter logs do container',
      details: error.message 
    });
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
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`OpenAI proxy available at http://localhost:${PORT}/api/openai-proxy`);
  console.log(`ElevenLabs config available at http://localhost:${PORT}/api/elevenlabs-config`);
});
