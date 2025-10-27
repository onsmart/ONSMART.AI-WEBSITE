#!/usr/bin/env node

// Script para monitoramento do Docker via linha de comando
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class DockerMonitor {
  constructor() {
    this.refreshInterval = 5000; // 5 segundos
    this.isRunning = false;
  }

  async checkDockerStatus() {
    try {
      const { stdout } = await execAsync('docker version --format "{{.Server.Version}}"');
      return {
        running: stdout.trim().length > 0,
        version: stdout.trim()
      };
    } catch (error) {
      return {
        running: false,
        version: null,
        error: error.message
      };
    }
  }

  async getContainers() {
    try {
      const { stdout } = await execAsync(`
        docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.State}}\t{{.Ports}}"
      `);
      
      const lines = stdout.trim().split('\n').slice(1);
      return lines.map(line => {
        const parts = line.split('\t');
        return {
          id: parts[0],
          name: parts[1],
          image: parts[2],
          status: parts[3],
          state: parts[4],
          ports: parts[5] || ''
        };
      });
    } catch (error) {
      console.error('Erro ao listar containers:', error.message);
      return [];
    }
  }

  async getOllamaStatus() {
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
          const { stdout: modelsOutput } = await execAsync(`
            docker exec ollama ollama list --format json
          `);
          
          const modelsData = JSON.parse(modelsOutput);
          models = modelsData.models || [];
          apiAvailable = true;
        } catch (ollamaError) {
          console.log('Ollama API não disponível');
        }
      }

      return {
        containerRunning,
        models,
        apiAvailable
      };
    } catch (error) {
      return {
        containerRunning: false,
        models: [],
        apiAvailable: false,
        error: error.message
      };
    }
  }

  formatStatus(status) {
    const colors = {
      running: '\x1b[32m', // Verde
      exited: '\x1b[31m',  // Vermelho
      paused: '\x1b[33m',  // Amarelo
      reset: '\x1b[0m'     // Reset
    };

    if (status.includes('running')) return `${colors.running}● Rodando${colors.reset}`;
    if (status.includes('exited')) return `${colors.exited}● Parado${colors.reset}`;
    if (status.includes('paused')) return `${colors.paused}● Pausado${colors.reset}`;
    return `${colors.reset}● Desconhecido${colors.reset}`;
  }

  clearScreen() {
    console.clear();
  }

  displayHeader() {
    console.log('🐳 Docker Monitor - OnSmart AI');
    console.log('═'.repeat(50));
    console.log(`📅 ${new Date().toLocaleString('pt-BR')}`);
    console.log('');
  }

  async displayDockerStatus() {
    const status = await this.checkDockerStatus();
    
    console.log('🔧 Status do Docker:');
    if (status.running) {
      console.log(`   ✅ Docker ativo (v${status.version})`);
    } else {
      console.log('   ❌ Docker inativo');
      if (status.error) {
        console.log(`   ⚠️  Erro: ${status.error}`);
      }
    }
    console.log('');
  }

  async displayContainers() {
    const containers = await this.getContainers();
    
    console.log('📦 Containers:');
    if (containers.length === 0) {
      console.log('   Nenhum container encontrado');
    } else {
      containers.forEach(container => {
        const status = this.formatStatus(container.status);
        console.log(`   ${status} ${container.name}`);
        console.log(`      📋 Imagem: ${container.image}`);
        console.log(`      🆔 ID: ${container.id.substring(0, 12)}`);
        if (container.ports) {
          console.log(`      🔌 Portas: ${container.ports}`);
        }
        console.log('');
      });
    }
  }

  async displayOllamaStatus() {
    const ollamaStatus = await this.getOllamaStatus();
    
    console.log('🤖 Status do Ollama:');
    if (ollamaStatus.containerRunning) {
      console.log('   ✅ Container rodando');
      if (ollamaStatus.apiAvailable) {
        console.log('   ✅ API disponível');
        console.log(`   📚 Modelos: ${ollamaStatus.models.length}`);
        if (ollamaStatus.models.length > 0) {
          ollamaStatus.models.forEach(model => {
            console.log(`      • ${model.name}`);
          });
        }
      } else {
        console.log('   ⚠️  API não disponível');
      }
    } else {
      console.log('   ❌ Container parado');
    }
    console.log('');
  }

  async update() {
    this.clearScreen();
    this.displayHeader();
    await this.displayDockerStatus();
    await this.displayContainers();
    await this.displayOllamaStatus();
    
    console.log('💡 Comandos úteis:');
    console.log('   • Ctrl+C para sair');
    console.log('   • docker ps -a (listar containers)');
    console.log('   • docker logs ollama (logs do Ollama)');
    console.log('   • docker exec -it ollama ollama list (modelos)');
    console.log('');
    console.log('🔄 Atualizando a cada 5 segundos...');
  }

  start() {
    this.isRunning = true;
    console.log('🚀 Iniciando monitor Docker...');
    
    // Atualização inicial
    this.update();
    
    // Atualizações periódicas
    const interval = setInterval(() => {
      if (this.isRunning) {
        this.update();
      }
    }, this.refreshInterval);

    // Capturar Ctrl+C
    process.on('SIGINT', () => {
      this.isRunning = false;
      clearInterval(interval);
      console.log('\n👋 Monitor Docker finalizado.');
      process.exit(0);
    });
  }

  // Método para execução única (sem loop)
  async runOnce() {
    this.displayHeader();
    await this.displayDockerStatus();
    await this.displayContainers();
    await this.displayOllamaStatus();
  }
}

// Execução do script
const monitor = new DockerMonitor();

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);

if (args.includes('--once') || args.includes('-o')) {
  // Execução única
  monitor.runOnce();
} else {
  // Monitoramento contínuo
  monitor.start();
}

module.exports = DockerMonitor;

