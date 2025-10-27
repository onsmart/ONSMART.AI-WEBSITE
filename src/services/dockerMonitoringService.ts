// Serviço para monitoramento do Docker e containers
export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  ports: string[];
  created: string;
  command: string;
}

export interface DockerSystemInfo {
  containers: number;
  running: number;
  paused: number;
  stopped: number;
  images: number;
  volumes: number;
  networks: number;
}

export interface OllamaModel {
  name: string;
  size: number;
  modified_at: string;
  digest: string;
}

class DockerMonitoringService {
  private baseUrl: string;

  constructor() {
    // URL base para o servidor de monitoramento
    this.baseUrl = import.meta.env.MODE === 'development'
      ? 'http://localhost:3001/api/docker' 
      : '/api/docker';
  }

  // Verificar se o Docker está rodando
  async checkDockerStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/status`);
      const data = await response.json();
      return data.dockerRunning;
    } catch (error) {
      console.error('Erro ao verificar status do Docker:', error);
      return false;
    }
  }

  // Listar todos os containers
  async getContainers(): Promise<DockerContainer[]> {
    try {
      const response = await fetch(`${this.baseUrl}/containers`);
      const data = await response.json();
      return data.containers || [];
    } catch (error) {
      console.error('Erro ao listar containers:', error);
      return [];
    }
  }

  // Obter informações do sistema Docker
  async getSystemInfo(): Promise<DockerSystemInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/system`);
      const data = await response.json();
      return data.systemInfo || {
        containers: 0,
        running: 0,
        paused: 0,
        stopped: 0,
        images: 0,
        volumes: 0,
        networks: 0
      };
    } catch (error) {
      console.error('Erro ao obter informações do sistema:', error);
      return {
        containers: 0,
        running: 0,
        paused: 0,
        stopped: 0,
        images: 0,
        volumes: 0,
        networks: 0
      };
    }
  }

  // Verificar status específico do Ollama
  async getOllamaStatus(): Promise<{
    containerRunning: boolean;
    models: OllamaModel[];
    apiAvailable: boolean;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/ollama`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao verificar status do Ollama:', error);
      return {
        containerRunning: false,
        models: [],
        apiAvailable: false
      };
    }
  }

  // Iniciar container específico
  async startContainer(containerName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/containers/${containerName}/start`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao iniciar container:', error);
      return false;
    }
  }

  // Parar container específico
  async stopContainer(containerName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/containers/${containerName}/stop`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao parar container:', error);
      return false;
    }
  }

  // Reiniciar container específico
  async restartContainer(containerName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/containers/${containerName}/restart`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao reiniciar container:', error);
      return false;
    }
  }

  // Obter logs de um container
  async getContainerLogs(containerName: string, lines: number = 100): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/containers/${containerName}/logs?lines=${lines}`);
      const data = await response.json();
      return data.logs || [];
    } catch (error) {
      console.error('Erro ao obter logs do container:', error);
      return [];
    }
  }

  // Monitoramento em tempo real (WebSocket)
  startRealTimeMonitoring(callback: (data: any) => void): WebSocket | null {
    try {
      const wsUrl = import.meta.env.MODE === 'development'
        ? 'ws://localhost:3001/ws/docker' 
        : `ws://${window.location.host}/ws/docker`;
      
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('Erro ao processar mensagem WebSocket:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('Erro na conexão WebSocket:', error);
      };

      return ws;
    } catch (error) {
      console.error('Erro ao iniciar monitoramento em tempo real:', error);
      return null;
    }
  }
}

export const dockerMonitoringService = new DockerMonitoringService();
