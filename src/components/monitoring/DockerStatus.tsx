import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Square, RotateCcw, Terminal, Server, HardDrive, Network } from 'lucide-react';
import { dockerMonitoringService, type DockerContainer, type DockerSystemInfo } from '@/services/dockerMonitoringService';

interface DockerStatusProps {
  className?: string;
}

const DockerStatus: React.FC<DockerStatusProps> = ({ className = '' }) => {
  const [dockerRunning, setDockerRunning] = useState<boolean>(false);
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const [systemInfo, setSystemInfo] = useState<DockerSystemInfo | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [dockerStatus, containersData, systemData, ollamaData] = await Promise.all([
        dockerMonitoringService.checkDockerStatus(),
        dockerMonitoringService.getContainers(),
        dockerMonitoringService.getSystemInfo(),
        dockerMonitoringService.getOllamaStatus()
      ]);

      setDockerRunning(dockerStatus);
      setContainers(containersData);
      setSystemInfo(systemData);
      setOllamaStatus(ollamaData);
    } catch (err) {
      setError('Erro ao carregar dados do Docker');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleContainerAction = async (containerName: string, action: 'start' | 'stop' | 'restart') => {
    try {
      let success = false;
      
      switch (action) {
        case 'start':
          success = await dockerMonitoringService.startContainer(containerName);
          break;
        case 'stop':
          success = await dockerMonitoringService.stopContainer(containerName);
          break;
        case 'restart':
          success = await dockerMonitoringService.restartContainer(containerName);
          break;
      }

      if (success) {
        // Recarregar dados após ação
        setTimeout(fetchData, 1000);
      }
    } catch (err) {
      console.error(`Erro ao ${action} container:`, err);
    }
  };

  const handleViewLogs = async (containerName: string) => {
    try {
      const containerLogs = await dockerMonitoringService.getContainerLogs(containerName, 50);
      setLogs(containerLogs);
      setSelectedContainer(containerName);
    } catch (err) {
      console.error('Erro ao obter logs:', err);
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes('running')) return 'bg-green-500';
    if (status.includes('exited')) return 'bg-red-500';
    if (status.includes('paused')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    if (status.includes('running')) return 'Rodando';
    if (status.includes('exited')) return 'Parado';
    if (status.includes('paused')) return 'Pausado';
    return 'Desconhecido';
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Carregando status do Docker...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <p>{error}</p>
              <Button onClick={fetchData} className="mt-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Status Geral do Docker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2" />
            Status do Docker
          </CardTitle>
          <CardDescription>
            Informações gerais do sistema Docker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={dockerRunning ? "default" : "destructive"}>
                {dockerRunning ? 'Docker Ativo' : 'Docker Inativo'}
              </Badge>
              {systemInfo && (
                <div className="flex space-x-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <HardDrive className="h-4 w-4 mr-1" />
                    {systemInfo.containers} containers
                  </span>
                  <span className="flex items-center">
                    <Network className="h-4 w-4 mr-1" />
                    {systemInfo.images} imagens
                  </span>
                </div>
              )}
            </div>
            <Button onClick={fetchData} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status do Ollama */}
      {ollamaStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Status do Ollama</CardTitle>
            <CardDescription>
              Monitoramento específico do Ollama
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Container:</span>
                <Badge variant={ollamaStatus.containerRunning ? "default" : "destructive"}>
                  {ollamaStatus.containerRunning ? 'Rodando' : 'Parado'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>API:</span>
                <Badge variant={ollamaStatus.apiAvailable ? "default" : "destructive"}>
                  {ollamaStatus.apiAvailable ? 'Disponível' : 'Indisponível'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Modelos:</span>
                <span className="text-sm text-gray-600">
                  {ollamaStatus.models.length} modelos carregados
                </span>
              </div>
              {ollamaStatus.models.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Modelos disponíveis:</p>
                  <div className="flex flex-wrap gap-1">
                    {ollamaStatus.models.map((model: any, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {model.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Containers */}
      <Card>
        <CardHeader>
          <CardTitle>Containers</CardTitle>
          <CardDescription>
            Lista de todos os containers Docker
          </CardDescription>
        </CardHeader>
        <CardContent>
          {containers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum container encontrado</p>
          ) : (
            <div className="space-y-3">
              {containers.map((container) => (
                <div key={container.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{container.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(container.status)} text-white`}
                      >
                        {getStatusText(container.status)}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewLogs(container.name)}
                      >
                        <Terminal className="h-4 w-4" />
                      </Button>
                      {container.status.includes('running') ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContainerAction(container.name, 'stop')}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleContainerAction(container.name, 'start')}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleContainerAction(container.name, 'restart')}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Imagem:</strong> {container.image}</p>
                    <p><strong>ID:</strong> {container.id.substring(0, 12)}</p>
                    {container.ports.length > 0 && (
                      <p><strong>Portas:</strong> {container.ports.join(', ')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logs Modal */}
      {selectedContainer && logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Logs - {selectedContainer}</CardTitle>
            <CardDescription>
              Últimas 50 linhas de log
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedContainer(null);
                  setLogs([]);
                }}
              >
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DockerStatus;

