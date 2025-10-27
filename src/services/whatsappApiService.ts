
import { WhatsAppSendMessageRequest, WhatsAppSendMessageResponse, WhatsAppApiConfig } from '@/types/whatsappApi';

class WhatsAppApiService {
  private config: WhatsAppApiConfig | null = null;
  private baseUrl = 'https://graph.facebook.com/v18.0';

  async initialize(config: WhatsAppApiConfig) {
    this.config = config;
  }

  async sendMessage(to: string, message: string): Promise<WhatsAppSendMessageResponse | null> {
    if (!this.config) {
      console.error('WhatsApp API não configurado');
      return null;
    }

    const payload: WhatsAppSendMessageRequest = {
      messaging_product: "whatsapp",
      recipient_type: "individual", 
      to: to.replace('+', ''),
      type: "text",
      text: {
        preview_url: false,
        body: message
      }
    };

    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Erro ao enviar mensagem WhatsApp:', error);
        return null;
      }

      const result = await response.json();
      console.log('Mensagem enviada com sucesso:', result);
      return result;
    } catch (error) {
      console.error('Erro na API do WhatsApp:', error);
      return null;
    }
  }

  async markMessageAsRead(messageId: string): Promise<boolean> {
    if (!this.config) return false;

    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.config !== null;
  }
}

export const whatsappApiService = new WhatsAppApiService();
