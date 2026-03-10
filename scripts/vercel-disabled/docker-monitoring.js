// Cópia guardada: api/docker-monitoring.js (desativada no deploy Vercel para ficar sob o limite de 12 funções).
// API para monitoramento do Docker - útil apenas em ambiente com Node + Docker (ex.: server.js local).
// Ver scripts/vercel-disabled/README.md.
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { action, containerName } = req.query;
  try {
    switch (action) {
      case 'status': return await handleDockerStatus(req, res);
      case 'containers': return await handleContainers(req, res);
      case 'system': return await handleSystemInfo(req, res);
      case 'ollama': return await handleOllamaStatus(req, res);
      case 'logs': return await handleContainerLogs(req, res, containerName);
      case 'start': return await handleContainerAction(req, res, containerName, 'start');
      case 'stop': return await handleContainerAction(req, res, containerName, 'stop');
      case 'restart': return await handleContainerAction(req, res, containerName, 'restart');
      default: return res.status(400).json({ error: 'Ação não especificada' });
    }
  } catch (error) {
    console.error('Erro na API Docker:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}

async function handleDockerStatus(req, res) {
  try {
    const { stdout } = await execAsync('docker version --format "{{.Server.Version}}"');
    const dockerRunning = stdout.trim().length > 0;
    res.status(200).json({ dockerRunning, version: dockerRunning ? stdout.trim() : null, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(200).json({ dockerRunning: false, version: null, error: error.message, timestamp: new Date().toISOString() });
  }
}

async function handleContainers(req, res) {
  try {
    const { stdout } = await execAsync(`docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.State}}\t{{.Ports}}\t{{.CreatedAt}}\t{{.Command}}"`);
    const lines = stdout.trim().split('\n').slice(1);
    const containers = lines.map(line => {
      const parts = line.split('\t');
      return { id: parts[0], name: parts[1], image: parts[2], status: parts[3], state: parts[4], ports: parts[5] ? parts[5].split(',') : [], created: parts[6], command: parts[7] || '' };
    });
    res.status(200).json({ containers });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar containers', details: error.message });
  }
}

async function handleSystemInfo(req, res) {
  try {
    const [c, i, v, n] = await Promise.all([
      execAsync('docker ps -a --format "{{.State}}"'),
      execAsync('docker images --format "{{.Repository}}"'),
      execAsync('docker volume ls --format "{{.Name}}"'),
      execAsync('docker network ls --format "{{.Name}}"')
    ]);
    const states = c.stdout.trim().split('\n').filter(Boolean);
    res.status(200).json({
      systemInfo: {
        containers: states.length,
        running: states.filter(s => s === 'running').length,
        paused: states.filter(s => s === 'paused').length,
        stopped: states.filter(s => s === 'exited').length,
        images: i.stdout.trim().split('\n').filter(Boolean).length,
        volumes: v.stdout.trim().split('\n').filter(Boolean).length,
        networks: n.stdout.trim().split('\n').filter(Boolean).length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter informações do sistema', details: error.message });
  }
}

async function handleOllamaStatus(req, res) {
  try {
    const { stdout } = await execAsync(`docker ps --filter "name=ollama" --format "{{.State}}"`);
    const containerRunning = stdout.trim() === 'running';
    let models = []; let apiAvailable = false;
    if (containerRunning) {
      try {
        const { stdout: m } = await execAsync('docker exec ollama ollama list --format json');
        const d = JSON.parse(m); models = d.models || []; apiAvailable = true;
      } catch (_) {}
    }
    res.status(200).json({ containerRunning, models, apiAvailable, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar status do Ollama', details: error.message });
  }
}

async function handleContainerLogs(req, res, containerName) {
  if (!containerName) return res.status(400).json({ error: 'Nome do container não especificado' });
  try {
    const lines = req.query.lines || 100;
    const { stdout } = await execAsync(`docker logs --tail ${lines} ${containerName}`);
    res.status(200).json({ logs: stdout.trim().split('\n') });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter logs', details: error.message });
  }
}

async function handleContainerAction(req, res, containerName, action) {
  if (!containerName) return res.status(400).json({ error: 'Nome do container não especificado' });
  try {
    await execAsync(`docker ${action} ${containerName}`);
    res.status(200).json({ success: true, message: `Container ${containerName} ${action} executado com sucesso`, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: `Erro ao ${action} container`, details: error.message });
  }
}
