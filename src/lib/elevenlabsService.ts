// Serviço para integração com ElevenLabs API - Modo Seguro (backend)
export interface ElevenLabsVoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export class ElevenLabsService {
  private baseUrl: string;
  private config: { widgetHtml: string; isConfigured: boolean; config: any } | null = null;

  constructor() {
    // Detect environment and set correct base URL
    if (import.meta.env.DEV) {
      this.baseUrl = 'http://localhost:3001';
    } else {
      // In production, use relative URL to avoid duplication
      this.baseUrl = '';
    }
    
    console.log('ElevenLabs service inicializado (modo seguro)');
  }

  // Buscar configurações do backend de forma segura
  private async getConfig(): Promise<{ widgetHtml: string; isConfigured: boolean; config: any }> {
    if (this.config) {
      return this.config;
    }

    try {
      // Build URL correctly for each environment
      const url = import.meta.env.DEV 
        ? `${this.baseUrl}/api/elevenlabs-widget`
        : '/api/elevenlabs-widget';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ElevenLabs widget: ${response.status}`);
      }

      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error fetching ElevenLabs widget:', error);
      return { widgetHtml: '', isConfigured: false, config: {} };
    }
  }

  // Verificar se está configurado
  async isConfigured(): Promise<boolean> {
    const config = await this.getConfig();
    return config.isConfigured;
  }

  // Verificar se tem Agent ID (para Conversational AI)
  async hasAgentId(): Promise<boolean> {
    const config = await this.getConfig();
    return config.isConfigured;
  }

  // Obter HTML do widget (sem Agent ID exposto)
  async getWidgetHtml(): Promise<string> {
    const config = await this.getConfig();
    return config.widgetHtml;
  }

  // Método completo: texto -> áudio -> reprodução (não usado com Conversational AI)
  async speakText(text: string): Promise<void> {
    console.log('ElevenLabs Conversational AI gerencia a síntese de voz automaticamente');
    // O Conversational AI gerencia tudo automaticamente
  }
}

export const elevenLabsService = new ElevenLabsService();