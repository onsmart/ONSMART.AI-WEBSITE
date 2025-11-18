import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Settings, MessageCircle, CheckCircle, AlertCircle, RefreshCw, QrCode, Trash2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { evolutionApiService, type EvolutionApiConfig as EvolutionApiConfigType } from '@/services/evolutionApiService';

const EvolutionApiConfig: React.FC = () => {
  const [config, setConfig] = useState<EvolutionApiConfigType>({
    apiUrl: '',
    apiKey: '',
    instanceName: 'sonia'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [instanceStatus, setInstanceStatus] = useState<'open' | 'close' | 'connecting' | 'qrcode' | 'unknown'>('unknown');
  const [isPolling, setIsPolling] = useState(false);
  const [autoReconnect, setAutoReconnect] = useState(true);
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousStatusRef = useRef<'open' | 'close' | 'connecting' | 'qrcode' | 'unknown'>('unknown');

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (isConfigured && instanceStatus === 'qrcode') {
      startPollingQRCode();
    } else {
      stopPollingQRCode();
    }

    return () => {
      stopPollingQRCode();
    };
  }, [isConfigured, instanceStatus]);

  // Monitoramento contínuo e reconexão automática
  useEffect(() => {
    if (isConfigured && autoReconnect) {
      startContinuousMonitoring();
    } else {
      stopContinuousMonitoring();
    }

    return () => {
      stopContinuousMonitoring();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured, autoReconnect]);

  const loadConfig = () => {
    // Tentar carregar das variáveis de ambiente primeiro (se disponíveis no frontend)
    // Nota: A API key deve estar apenas no backend (Vercel), não no frontend
    const envApiUrl = import.meta.env.VITE_EVOLUTION_API_URL;
    const envInstanceName = import.meta.env.VITE_EVOLUTION_INSTANCE_NAME || 'sonia';

    if (envApiUrl) {
      // Se temos a URL, podemos usar (a API key está no backend)
      const envConfig: EvolutionApiConfigType = {
        apiUrl: envApiUrl,
        apiKey: '', // API key não é necessária no frontend, está no backend
        instanceName: envInstanceName
      };
      setConfig(envConfig);
      setIsConfigured(true);
      // Não inicializamos o serviço aqui porque a API key está no backend
      // O serviço usará a API route do Vercel que tem a API key
      checkInstanceStatus();
      return;
    }

    // Fallback para localStorage
    const savedConfig = localStorage.getItem('evolution_api_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(parsed);
        setIsConfigured(true);
        // Não precisamos da API key no frontend, está no backend
        checkInstanceStatus();
      } catch (error) {
        console.error('Erro ao carregar configuração:', error);
      }
    }
  };

  const saveConfig = async () => {
    if (!config.apiUrl || !config.instanceName) {
      toast.error('Preencha a URL da API e o nome da instância');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validar URL da API
      try {
        new URL(config.apiUrl);
      } catch {
        throw new Error('URL da API inválida');
      }

      // Nota: A API key está no backend (Vercel), não precisamos dela aqui
      // Criar config sem API key (será usada do backend)
      const configToSave = {
        ...config,
        apiKey: '' // Não armazenamos a API key no frontend
      };
      
      // Inicializar serviço (a API key real está no backend)
      await evolutionApiService.initialize(configToSave);
      
      // Salvar no localStorage (sem API key)
      localStorage.setItem('evolution_api_config', JSON.stringify(configToSave));
      
      setIsConfigured(true);
      toast.success('Configuração salva com sucesso!');
      
      // Verificar status da instância
      await checkInstanceStatus();
    } catch (error: any) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configuração', {
        description: error.message || 'Verifique os dados e tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkInstanceStatus = async () => {
    if (!isConfigured) return;

    try {
      const status = await evolutionApiService.getInstanceStatus();
      if (status) {
        const newStatus = status.instance.status;
        setInstanceStatus(newStatus);
        previousStatusRef.current = newStatus;
        if (status.instance.qrcode?.base64) {
          setQrCode(status.instance.qrcode.base64);
        }
      } else {
        setInstanceStatus('close');
        previousStatusRef.current = 'close';
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setInstanceStatus('unknown');
      previousStatusRef.current = 'unknown';
    }
  };

  const createInstance = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await evolutionApiService.createInstance();
      if (success) {
        toast.success('Instância criada! Buscando QR Code...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Aguardar 2s
        await getQRCode();
      } else {
        toast.error('Erro ao criar instância');
      }
    } catch (error: any) {
      console.error('Erro ao criar instância:', error);
      toast.error('Erro ao criar instância', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getQRCode = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    setIsLoading(true);
    
    try {
      const qrData = await evolutionApiService.getQRCode();
      if (qrData && qrData.base64) {
        setQrCode(qrData.base64);
        setInstanceStatus('qrcode');
        toast.success('QR Code gerado! Escaneie com o WhatsApp.');
      } else {
        toast.error('Não foi possível obter o QR Code');
        setInstanceStatus('close');
      }
    } catch (error: any) {
      console.error('Erro ao obter QR Code:', error);
      toast.error('Erro ao obter QR Code', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startPollingQRCode = () => {
    if (isPolling) return;
    
    setIsPolling(true);
    const interval = setInterval(async () => {
      const status = await evolutionApiService.getInstanceStatus();
      if (status) {
        const newStatus = status.instance.status;
        setInstanceStatus(newStatus);
        
        if (newStatus === 'open') {
          clearInterval(interval);
          setIsPolling(false);
          setQrCode(null);
          toast.success('WhatsApp conectado com sucesso!');
        } else if (newStatus === 'qrcode' && status.instance.qrcode?.base64) {
          setQrCode(status.instance.qrcode.base64);
        } else if (newStatus !== 'qrcode') {
          clearInterval(interval);
          setIsPolling(false);
        }
      }
    }, 5000); // Verificar a cada 5 segundos

    // Limpar após 5 minutos
    setTimeout(() => {
      clearInterval(interval);
      setIsPolling(false);
    }, 300000);
  };

  const stopPollingQRCode = () => {
    setIsPolling(false);
  };

  // Monitoramento contínuo do status da instância
  const startContinuousMonitoring = () => {
    if (monitoringIntervalRef.current) return;

    const interval = setInterval(async () => {
      if (!isConfigured) return;

      try {
        const status = await evolutionApiService.getInstanceStatus();
        if (status) {
          const newStatus = status.instance.status;
          const previousStatus = previousStatusRef.current;
          
          // Atualizar status
          if (newStatus !== previousStatus) {
            setInstanceStatus(newStatus);
            previousStatusRef.current = newStatus;
            
            // Se estava conectado e agora está desconectado, tentar reconectar
            if (previousStatus === 'open' && (newStatus === 'close' || newStatus === 'connecting')) {
              console.log('⚠️ WhatsApp desconectado! Tentando reconectar...');
              toast.warning('WhatsApp desconectado. Tentando reconectar automaticamente...');
              
              // Tentar reiniciar a instância
              setTimeout(async () => {
                await restartInstance();
              }, 2000);
            }
            
            // Se estava em QR Code e agora está conectado
            if (previousStatus === 'qrcode' && newStatus === 'open') {
              toast.success('WhatsApp reconectado com sucesso!');
              setQrCode(null);
            }
          }
        }
      } catch (error) {
        console.error('Erro no monitoramento:', error);
      }
    }, 30000); // Verificar a cada 30 segundos

    monitoringIntervalRef.current = interval;
  };

  const stopContinuousMonitoring = () => {
    if (monitoringIntervalRef.current) {
      clearInterval(monitoringIntervalRef.current);
      monitoringIntervalRef.current = null;
    }
  };

  const restartInstance = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await evolutionApiService.restartInstance();
      if (success) {
        toast.success('Instância reiniciada!');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await checkInstanceStatus();
      } else {
        toast.error('Erro ao reiniciar instância');
      }
    } catch (error: any) {
      console.error('Erro ao reiniciar instância:', error);
      toast.error('Erro ao reiniciar instância', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logoutInstance = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    if (!confirm('Tem certeza que deseja fazer logout? Você precisará escanear o QR Code novamente.')) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await evolutionApiService.logoutInstance();
      if (success) {
        toast.success('Logout realizado!');
        setQrCode(null);
        setInstanceStatus('close');
      } else {
        toast.error('Erro ao fazer logout');
      }
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInstance = async () => {
    if (!isConfigured) {
      toast.error('Configure a API primeiro');
      return;
    }

    if (!confirm('Tem certeza que deseja deletar a instância? Esta ação não pode ser desfeita.')) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await evolutionApiService.deleteInstance();
      if (success) {
        toast.success('Instância deletada!');
        setQrCode(null);
        setInstanceStatus('close');
      } else {
        toast.error('Erro ao deletar instância');
      }
    } catch (error: any) {
      console.error('Erro ao deletar instância:', error);
      toast.error('Erro ao deletar instância', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (instanceStatus) {
      case 'open':
        return <Badge className="bg-green-500">Conectado</Badge>;
      case 'qrcode':
        return <Badge className="bg-yellow-500">Aguardando QR Code</Badge>;
      case 'connecting':
        return <Badge className="bg-blue-500">Conectando...</Badge>;
      case 'close':
        return <Badge variant="destructive">Desconectado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold">Configuração Evolution API (WhatsApp)</h1>
        {isConfigured && getStatusBadge()}
      </div>

      {/* Status da Configuração */}
      <Alert>
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-orange-600" />
          )}
          <AlertDescription>
            {isConfigured 
              ? instanceStatus === 'open'
                ? 'WhatsApp conectado e pronto para uso! A Sonia pode receber e enviar mensagens.'
                : 'Evolution API configurada. Configure a conexão do WhatsApp abaixo.'
              : 'Configure a Evolution API para ativar o WhatsApp da Sonia.'
            }
          </AlertDescription>
        </div>
      </Alert>

      {/* Configurações da API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Credenciais da Evolution API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">URL da API</Label>
              <Input
                id="apiUrl"
                type="url"
                placeholder="https://api.evolutionapi.com"
                value={config.apiUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, apiUrl: e.target.value }))}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                URL base da sua instalação da Evolution API
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key (Backend)</Label>
              <Input
                id="apiKey"
                type="text"
                placeholder="Configurada no Vercel (variável EVOLUTION_API_KEY)"
                value="*** Configurada no backend ***"
                disabled={true}
                className="bg-gray-100"
              />
              <p className="text-xs text-muted-foreground">
                A API Key deve ser configurada no Vercel como variável de ambiente (EVOLUTION_API_KEY). Não é necessário configurar aqui.
              </p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instanceName">Nome da Instância</Label>
              <Input
                id="instanceName"
                placeholder="sonia"
                value={config.instanceName}
                onChange={(e) => setConfig(prev => ({ ...prev, instanceName: e.target.value }))}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Nome único para identificar esta instância do WhatsApp
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={saveConfig} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Salvando...' : 'Salvar Configuração'}
            </Button>
            
            {isConfigured && (
              <Button variant="outline" onClick={checkInstanceStatus} disabled={isLoading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Verificar Status
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento da Instância */}
      {isConfigured && (
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento da Instância</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {instanceStatus === 'close' && (
                <Button onClick={createInstance} disabled={isLoading}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Criar Instância
                </Button>
              )}
              
              {(instanceStatus === 'close' || instanceStatus === 'qrcode') && (
                <Button variant="outline" onClick={getQRCode} disabled={isLoading}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Obter QR Code
                </Button>
              )}
              
              {instanceStatus === 'open' && (
                <>
                  <Button variant="outline" onClick={restartInstance} disabled={isLoading}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reiniciar
                  </Button>
                  
                  <Button variant="outline" onClick={logoutInstance} disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                  
                  <Button variant="destructive" onClick={deleteInstance} disabled={isLoading}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar Instância
                  </Button>
                </>
              )}
            </div>

            {/* QR Code Display */}
            {qrCode && instanceStatus === 'qrcode' && (
              <div className="mt-6 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4">Escaneie o QR Code com o WhatsApp</h3>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src={`data:image/png;base64,${qrCode}`} 
                    alt="QR Code WhatsApp" 
                    className="w-64 h-64"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Abra o WhatsApp no seu celular → Menu → Aparelhos conectados → Conectar um aparelho
                </p>
                {isPolling && (
                  <p className="text-xs text-blue-600 mt-2">
                    Aguardando conexão... (verificando automaticamente)
                  </p>
                )}
              </div>
            )}

            {/* Status da Conexão */}
            {instanceStatus === 'open' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  WhatsApp conectado com sucesso! A Sonia está pronta para receber e enviar mensagens.
                </AlertDescription>
              </Alert>
            )}

            {/* Configuração de Reconexão Automática */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Reconexão Automática</h4>
                  <p className="text-xs text-muted-foreground">
                    {autoReconnect 
                      ? 'Monitoramento ativo. O sistema verificará a conexão a cada 30 segundos e reconectará automaticamente se necessário.'
                      : 'Monitoramento desativado. A conexão não será verificada automaticamente.'
                    }
                  </p>
                </div>
                <Button
                  variant={autoReconnect ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoReconnect(!autoReconnect)}
                  className="ml-4"
                >
                  {autoReconnect ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
              {autoReconnect && monitoringIntervalRef.current && (
                <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Monitorando conexão...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>Instruções de Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Configure a URL da sua instalação da Evolution API</li>
            <li>Adicione sua API Key (gerada na instalação da Evolution API)</li>
            <li>Defina um nome único para a instância (ex: "sonia")</li>
            <li>Clique em "Salvar Configuração"</li>
            <li>Clique em "Criar Instância" ou "Obter QR Code"</li>
            <li>Escaneie o QR Code com o WhatsApp no seu celular</li>
            <li>Aguarde a conexão ser estabelecida (status mudará para "Conectado")</li>
          </ol>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Importante:</p>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Certifique-se de que a Evolution API está rodando e acessível</li>
              <li>Verifique se a API Key está correta e tem permissões adequadas</li>
              <li>O QR Code expira após alguns minutos - gere um novo se necessário</li>
              <li>Não compartilhe sua API Key publicamente</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvolutionApiConfig;

