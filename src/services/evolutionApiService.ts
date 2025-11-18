// Serviço para integração com Evolution API (WhatsApp não oficial)

export interface EvolutionApiConfig {
  apiUrl: string;
  apiKey: string;
  instanceName: string;
}

export interface QRCodeResponse {
  qrcode: {
    code: string;
    base64: string;
  };
  base64?: string;
  code?: string;
}

export interface InstanceStatus {
  instance: {
    instanceName: string;
    status: 'open' | 'close' | 'connecting' | 'qrcode';
    qrcode?: {
      code: string;
      base64: string;
    };
  };
}

export interface SendMessageResponse {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    conversation: string;
  };
  messageTimestamp: number;
}

class EvolutionApiService {
  private config: EvolutionApiConfig | null = null;

  async initialize(config: EvolutionApiConfig) {
    this.config = config;
  }

  /**
   * Cria uma nova instância do WhatsApp
   */
  async createInstance(instanceName?: string, qrcode: boolean = true): Promise<boolean> {
    const instance = instanceName || this.config?.instanceName;
    if (!instance) {
      throw new Error('Nome da instância não especificado');
    }

    try {
      // Usar API route do Vercel para evitar expor a API key no frontend
      const response = await fetch('/api/evolution-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create',
          instanceName: instance
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao criar instância:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro na criação da instância:', error);
      return false;
    }
  }

  /**
   * Obtém o QR Code para conexão
   */
  async getQRCode(instanceName?: string): Promise<QRCodeResponse | null> {
    const instance = instanceName || this.config?.instanceName;
    if (!instance) {
      throw new Error('Nome da instância não especificado');
    }

    try {
      // Usar API route do Vercel
      const response = await fetch(`/api/evolution-api?action=qrcode&instance=${instance}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao obter QR Code:', error);
        return null;
      }

      const data = await response.json();
      
      // Evolution API pode retornar o QR code em diferentes formatos
      if (data.qrcode) {
        return {
          qrcode: data.qrcode,
          base64: data.qrcode.base64,
          code: data.qrcode.code
        };
      } else if (data.base64) {
        return {
          qrcode: {
            code: data.code || '',
            base64: data.base64
          },
          base64: data.base64,
          code: data.code
        };
      }

      return null;
    } catch (error) {
      console.error('Erro ao obter QR Code:', error);
      return null;
    }
  }

  /**
   * Verifica o status da instância
   */
  async getInstanceStatus(instanceName?: string): Promise<InstanceStatus | null> {
    const instance = instanceName || this.config?.instanceName || 'sonia';

    try {
      // Usar API route do Vercel
      const response = await fetch(`/api/evolution-api?action=status&instance=${instance}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao verificar status:', error);
        return null;
      }

      const data = await response.json();
      
      // Buscar a instância específica
      const instances = Array.isArray(data) ? data : (data.instances || []);
      const instanceData = instances.find((inst: any) => 
        inst.instanceName === instance || inst.instance?.instanceName === instance
      );

      if (!instanceData) {
        return null;
      }

      // Normalizar resposta
      if (instanceData.instance) {
        return {
          instance: {
            instanceName: instanceData.instance.instanceName || instance,
            status: instanceData.instance.status || instanceData.status,
            qrcode: instanceData.instance.qrcode
          }
        };
      }

      return {
        instance: {
          instanceName: instance,
          status: instanceData.status || 'close',
          qrcode: instanceData.qrcode
        }
      };
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      return null;
    }
  }

  /**
   * Envia uma mensagem de texto
   */
  async sendMessage(to: string, message: string, instanceName?: string): Promise<SendMessageResponse | null> {
    const instance = instanceName || this.config?.instanceName || 'sonia';
    
    // Formatar número (remover caracteres especiais, adicionar @s.whatsapp.net se necessário)
    let formattedNumber = to.replace(/\D/g, '');
    if (!formattedNumber.includes('@')) {
      formattedNumber = `${formattedNumber}@s.whatsapp.net`;
    }

    try {
      // Usar API route do Vercel
      const response = await fetch('/api/evolution-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send',
          instanceName: instance,
          number: formattedNumber,
          text: message
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao enviar mensagem:', error);
        return null;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return null;
    }
  }

  /**
   * Deleta uma instância
   */
  async deleteInstance(instanceName?: string): Promise<boolean> {
    const instance = instanceName || this.config?.instanceName || 'sonia';

    try {
      // Usar API route do Vercel
      const response = await fetch('/api/evolution-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete',
          instanceName: instance
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao deletar instância:', error);
      return false;
    }
  }

  /**
   * Restarta uma instância
   */
  async restartInstance(instanceName?: string): Promise<boolean> {
    const instance = instanceName || this.config?.instanceName || 'sonia';

    try {
      // Usar API route do Vercel
      const response = await fetch('/api/evolution-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'restart',
          instanceName: instance
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao reiniciar instância:', error);
      return false;
    }
  }

  /**
   * Logout de uma instância
   */
  async logoutInstance(instanceName?: string): Promise<boolean> {
    const instance = instanceName || this.config?.instanceName || 'sonia';

    try {
      // Usar API route do Vercel
      const response = await fetch('/api/evolution-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'logout',
          instanceName: instance
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.config !== null;
  }

  getConfig(): EvolutionApiConfig | null {
    return this.config;
  }
}

export const evolutionApiService = new EvolutionApiService();

