// Serviço para Conversational AI do ElevenLabs (modo seguro)
export interface ConversationalAIResponse {
  message: string;
  audioUrl?: string;
}

export class ElevenLabsConversationalAI {
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

  // Obter HTML do widget (sem Agent ID exposto)
  async getWidgetHtml(): Promise<string> {
    const config = await this.getConfig();
    return config.widgetHtml;
  }

  // Inicializar widget do ElevenLabs Conversational AI
  async initializeWidget(): Promise<void> {
    const config = await this.getConfig();
    if (!config.isConfigured) {
      throw new Error('ElevenLabs widget não configurado');
    }
    // Widget será inicializado pelo componente React
  }

  // Criar elemento do widget
  async createWidgetElement(): Promise<HTMLElement> {
    const config = await this.getConfig();
    if (!config.isConfigured) {
      throw new Error('ElevenLabs widget não configurado');
    }

    // Criar div temporário para inserir HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = config.widgetHtml;
    return tempDiv.firstElementChild as HTMLElement;
  }

  // Iniciar conversa
  async startConversation(): Promise<void> {
    const config = await this.getConfig();
    if (!config.isConfigured) {
      throw new Error('Agent ID não configurado');
    }
    // Conversa será iniciada pelo widget
  }

  // Parar conversa
  stopConversation(): void {
    const widgets = document.querySelectorAll('elevenlabs-convai');
    widgets.forEach(widget => widget.remove());
  }
}

// Instância singleton do serviço
export const elevenLabsConvAI = new ElevenLabsConversationalAI();
