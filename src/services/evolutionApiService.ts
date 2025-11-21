// Serviço removido

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
    phone?: string;
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
  async initialize() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async createInstance() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async getQRCode() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async getInstanceStatus() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async sendMessage() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async deleteInstance() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async restartInstance() {
    throw new Error('Evolution API foi removido do projeto');
  }
  async logoutInstance() {
    throw new Error('Evolution API foi removido do projeto');
  }
  isConfigured() {
    return false;
  }
  getConfig() {
    return null;
  }
}

export const evolutionApiService = new EvolutionApiService();
