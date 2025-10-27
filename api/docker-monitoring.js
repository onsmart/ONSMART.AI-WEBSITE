// API para monitoramento do Docker
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, containerName } = req.query;

  try {
    switch (action) {
      case 'status':
        return await handleDockerStatus(req, res);
      case 'containers':
        return await handleContainers(req, res);
      case 'system':
        return await handleSystemInfo(req, res);
      case 'ollama':
        return await handleOllamaStatus(req, res);
      case 'logs':
        return await handleContainerLogs(req, res, containerName);
      case 'start':
        return await handleContainerAction(req, res, containerName, 'start');
      case 'stop':
        return await handleContainerAction(req, res, containerName, 'stop');
      case 'restart':
        return await handleContainerAction(req, res, containerName, 'restart');
      default:
        return res.status(400).json({ error: 'Ação não especificada' });
    }
  } catch (error) {
    console.error('Erro na API Docker:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// Verificar se o Docker está rodando
async function handleDockerStatus(req, res) {
  try {
    const { stdout } = await execAsync('docker version --format "{{.Server.Version}}"');
    const dockerRunning = stdout.trim().length > 0;
    
    res.status(200).json({
      dockerRunning,
      version: dockerRunning ? stdout.trim() : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(200).json({
      dockerRunning: false,
      version: null,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Listar containers
async function handleContainers(req, res) {
  try {
    const { stdout } = await execAsync(`
      docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.State}}\t{{.Ports}}\t{{.CreatedAt}}\t{{.Command}}"
    `);
    
    const lines = stdout.trim().split('\n').slice(1); // Remove header
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

    res.status(200).json({ containers });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao listar containers',
      details: error.message 
    });
  }
}

// Informações do sistema Docker
async function handleSystemInfo(req, res) {
  try {
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

    res.status(200).json({ systemInfo });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao obter informações do sistema',
      details: error.message 
    });
  }
}

// Status específico do Ollama
async function handleOllamaStatus(req, res) {
  try {
    // Verificar se o container do Ollama está rodando
    const { stdout: containerStatus } = await execAsync(`
      docker ps --filter "name=ollama" --format "{{.State}}"
    `);
    
    const containerRunning = containerStatus.trim() === 'running';
    
    let models = [];
    let apiAvailable = false;

    if (containerRunning) {
      try {
        // Tentar listar modelos do Ollama
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

    res.status(200).json({
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
}

// Logs de container
async function handleContainerLogs(req, res, containerName) {
  if (!containerName) {
    return res.status(400).json({ error: 'Nome do container não especificado' });
  }

  try {
    const lines = req.query.lines || 100;
    const { stdout } = await execAsync(`
      docker logs --tail ${lines} ${containerName}
    `);
    
    const logs = stdout.trim().split('\n');
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao obter logs do container',
      details: error.message 
    });
  }
}

// Ações em containers (start, stop, restart)
async function handleContainerAction(req, res, containerName, action) {
  if (!containerName) {
    return res.status(400).json({ error: 'Nome do container não especificado' });
  }

  try {
    await execAsync(`docker ${action} ${containerName}`);
    res.status(200).json({ 
      success: true,
      message: `Container ${containerName} ${action} executado com sucesso`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: `Erro ao ${action} container`,
      details: error.message 
    });
  }
}
