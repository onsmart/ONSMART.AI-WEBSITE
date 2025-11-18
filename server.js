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

// Evolution API Proxy (para funcionar localmente)
// NOTA: Em produção, use as funções serverless em /api/evolution-api.js
app.all('/api/evolution-api', async (req, res) => {
  const { EVOLUTION_API_URL, EVOLUTION_API_KEY } = process.env;

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    return res.status(500).json({ 
      error: 'Evolution API não configurada. Configure EVOLUTION_API_URL e EVOLUTION_API_KEY nas variáveis de ambiente do Vercel (produção) ou .env.local (desenvolvimento).' 
    });
  }

  try {
    const { action, instanceName, ...body } = req.body || {};
    const { instance, ...queryParams } = req.query;

    const targetInstance = instanceName || instance || 'sonia';
    let url = '';
    let method = req.method;
    let requestBody = null;

    switch (action || req.query.action) {
      case 'create':
        url = `${EVOLUTION_API_URL}/instance/create`;
        method = 'POST';
        requestBody = {
          instanceName: targetInstance,
          qrcode: true,
          integration: 'WHATSAPP-BAILEYS'
        };
        break;
      case 'qrcode':
      case 'connect':
        url = `${EVOLUTION_API_URL}/instance/connect/${targetInstance}`;
        method = 'GET';
        break;
      case 'status':
        url = `${EVOLUTION_API_URL}/instance/fetchInstances`;
        method = 'GET';
        break;
      case 'send':
        url = `${EVOLUTION_API_URL}/message/sendText/${targetInstance}`;
        method = 'POST';
        requestBody = {
          number: body.number,
          text: body.text
        };
        break;
      case 'delete':
        url = `${EVOLUTION_API_URL}/instance/delete/${targetInstance}`;
        method = 'DELETE';
        break;
      case 'restart':
        url = `${EVOLUTION_API_URL}/instance/restart/${targetInstance}`;
        method = 'PUT';
        break;
      case 'logout':
        url = `${EVOLUTION_API_URL}/instance/logout/${targetInstance}`;
        method = 'DELETE';
        break;
      default:
        const path = req.query.path || '';
        url = `${EVOLUTION_API_URL}${path}`;
        requestBody = Object.keys(body).length > 0 ? body : null;
    }

    const headers = {
      'apikey': EVOLUTION_API_KEY,
      'Content-Type': 'application/json'
    };

    const fetchOptions = {
      method,
      headers
    };

    if (requestBody && method !== 'GET') {
      fetchOptions.body = JSON.stringify(requestBody);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || data.error || 'Erro na Evolution API',
        details: data 
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro na Evolution API proxy:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
});

// Evolution Webhook (para funcionar localmente)
// NOTA: Em produção, use a função serverless em /api/evolution-webhook.js
app.all('/api/evolution-webhook', async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    console.log('📨 Webhook Evolution API recebido:', JSON.stringify(payload, null, 2));

    const event = payload.event || payload.type || payload.action;
    const isMessageEvent = event === 'MESSAGES_UPSERT' || 
                          event === 'messages.upsert' || 
                          event === 'messages' ||
                          payload.data?.key ||
                          payload.key;
    
    if (isMessageEvent) {
      const messageData = payload.data || payload;
      const messageKey = messageData.key || payload.key;
      const messageContent = messageData.message || messageData;
      
      if (messageKey?.fromMe === true) {
        return res.status(200).json({ status: 'ignored', reason: 'self-message' });
      }
      
      if (!messageKey) {
        return res.status(200).json({ status: 'ignored', reason: 'no-key' });
      }

      const from = messageKey.remoteJid || messageKey.participant || messageData.from;
      if (!from) {
        return res.status(200).json({ status: 'ignored', reason: 'no-sender' });
      }

      const cleanFrom = from.split('@')[0];
      
      let messageText = '';
      if (messageContent.conversation) {
        messageText = messageContent.conversation;
      } else if (messageContent.extendedTextMessage?.text) {
        messageText = messageContent.extendedTextMessage.text;
      } else if (typeof messageContent === 'string') {
        messageText = messageContent;
      } else if (messageData.body) {
        messageText = messageData.body;
      }

      if (!messageText || messageText.trim() === '') {
        return res.status(200).json({ status: 'ignored', reason: 'no-text' });
      }

      console.log(`💬 Mensagem recebida de ${cleanFrom}: ${messageText}`);

      // Processar com a Sonia
      const soniaResponse = await processMessageWithSonia(cleanFrom, messageText);

      if (soniaResponse) {
        await sendWhatsAppMessage(cleanFrom, soniaResponse);
      }

      return res.status(200).json({ 
        status: 'processed',
        from: cleanFrom,
        message: messageText,
        response: soniaResponse
      });
    }

    return res.status(200).json({ status: 'received', event });

  } catch (error) {
    console.error('❌ Erro no webhook Evolution API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Função para processar mensagem com a Sonia
async function processMessageWithSonia(from, message) {
  try {
    const baseUrl = `http://localhost:${process.env.PORT || 3001}`;
    
    const response = await fetch(`${baseUrl}/api/openai-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: getSoniaSystemPrompt()
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.message || 'Desculpe, não consegui processar sua mensagem.';
  } catch (error) {
    console.error('❌ Erro ao processar mensagem com Sonia:', error);
    return 'Olá! Sou a Sonia, assistente de IA da onsmart AI. Estou com algumas dificuldades técnicas no momento, mas posso te ajudar. Como posso te auxiliar hoje?';
  }
}

// Função para obter o prompt do sistema da Sonia
function getSoniaSystemPrompt() {
  return `Você é Sonia, assistente de IA da onsmart AI, uma empresa brasileira especializada em Agentes de IA corporativos.

INFORMAÇÕES DA EMPRESA:
- Nome: onsmart AI
- Especialidade: Agentes de IA proprietários para empresas brasileiras
- Localização: Brasil
- Foco: Soluções de IA desenvolvidas baseadas nas principais demandas do mercado brasileiro

CATEGORIAS DE SOLUÇÕES (NOSSOS PRODUTOS):
1. Automação de Vendas - SDRs virtuais e qualificação automatizada de leads
2. Atendimento Inteligente - Chatbots multicanal e assistentes virtuais
3. RH Inteligente - Recrutamento automatizado e analytics de workforce
4. BI & Analytics - Business Intelligence preditivo e em tempo real
5. Automação de Processos - RPA inteligente com IA avançada
6. Voz & Linguagem - NLP otimizado para português brasileiro

ESTATÍSTICAS DA EMPRESA:
- 500+ Empresas Atendidas
- 98% Taxa de Sucesso
- 30 dias Tempo Médio de Implementação

INSTRUÇÕES DE COMPORTAMENTO:
- Seja sempre cordial e profissional
- Responda em português brasileiro
- MÁXIMO 2-3 frases por resposta - seja CONCISA
- NÃO USE EMOJIS - mantenha texto limpo e profissional
- NÃO USE FORMATAÇÃO MARKDOWN (**, *, _, etc) - apenas texto simples
- Foque na solução específica para a pergunta do cliente
- Sempre termine com uma pergunta ou call-to-action
- Se não souber algo específico, direcione para a equipe comercial
- Use pontos simples (•) para listas quando necessário
- Evite parágrafos longos - prefira frases curtas e diretas`;
}

// Função para enviar mensagem via Evolution API
async function sendWhatsAppMessage(to, message) {
  const { EVOLUTION_API_URL, EVOLUTION_API_KEY } = process.env;
  const instanceName = process.env.EVOLUTION_INSTANCE_NAME || 'sonia';

  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.error('❌ Evolution API não configurada');
    return false;
  }

  try {
    let formattedNumber = to.replace(/\D/g, '');
    if (!formattedNumber.includes('@')) {
      formattedNumber = `${formattedNumber}@s.whatsapp.net`;
    }

    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instanceName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      },
      body: JSON.stringify({
        number: formattedNumber,
        text: message
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Erro ao enviar mensagem:', error);
      return false;
    }

    console.log(`✅ Mensagem enviada para ${to} com sucesso`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem via Evolution API:', error);
    return false;
  }
}

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 OpenAI proxy available at http://localhost:${PORT}/api/openai-proxy`);
  console.log(`🎙️  ElevenLabs config available at http://localhost:${PORT}/api/elevenlabs-config`);
  console.log(`📱 Evolution API proxy available at http://localhost:${PORT}/api/evolution-api`);
  console.log(`📨 Evolution Webhook available at http://localhost:${PORT}/api/evolution-webhook`);
  
  if (process.env.EVOLUTION_API_URL) {
    console.log(`\n✅ Evolution API configurada: ${process.env.EVOLUTION_API_URL}`);
    console.log(`💡 Para testar o webhook, use ngrok: ngrok http ${PORT}`);
  } else {
    console.log(`\n⚠️  Evolution API não configurada. Configure EVOLUTION_API_URL no .env.local`);
  }
});
