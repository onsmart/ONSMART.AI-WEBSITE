// Serviço para buscar configurações do ElevenLabs do backend (completamente seguro)
class ElevenLabsConfigService {
  private config: { widgetHtml: string; isConfigured: boolean; config: any } | null = null;
  private baseUrl: string;

  constructor() {
    // Detect environment and set correct base URL
    if (import.meta.env.DEV) {
      this.baseUrl = 'http://localhost:3001';
    } else {
      // In production, use relative URL to avoid duplication
      this.baseUrl = '';
    }
  }

  // Buscar widget HTML do backend (sem expor Agent ID)
  async getWidgetConfig(): Promise<{ widgetHtml: string; isConfigured: boolean; config: any }> {
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
      // Silenciosamente retornar não configurado se o servidor não estiver disponível
      console.warn('⚠️ ElevenLabs não disponível (servidor offline). O chat funcionará apenas em modo texto.');
      return { 
        widgetHtml: '', 
        isConfigured: false, 
        config: {} 
      };
    }
  }

  // Verificar se está configurado
  async isConfigured(): Promise<boolean> {
    const config = await this.getWidgetConfig();
    return config.isConfigured;
  }

  // Obter HTML do widget (sem Agent ID exposto)
  async getWidgetHtml(): Promise<string> {
    const config = await this.getWidgetConfig();
    return config.widgetHtml;
  }
}

export const elevenLabsConfigService = new ElevenLabsConfigService();
