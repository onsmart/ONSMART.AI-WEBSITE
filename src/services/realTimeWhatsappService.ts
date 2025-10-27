
import { supabaseHelpers } from '@/integrations/supabase/client';
import { WhatsAppMessage, Customer, Conversation } from '@/types/whatsappAgents';

class RealTimeWhatsAppService {
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    // Verificar se a configuração existe
    const { data: config } = await supabase
      .from('whatsapp_config')
      .select('*')
      .eq('is_active', true)
      .single();

    if (config) {
      this.isInitialized = true;
      console.log('WhatsApp Service inicializado com sucesso');
      
      // Escutar novas mensagens em tempo real
      this.subscribeToMessages();
    } else {
      console.warn('WhatsApp não configurado. Configure em /admin/whatsapp');
    }
  }

  private subscribeToMessages() {
    supabase
      .channel('whatsapp_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'whatsapp_messages' 
        }, 
        (payload) => {
          console.log('Nova mensagem recebida:', payload.new);
          this.handleNewMessage(payload.new as any);
        }
      )
      .subscribe();
  }

  private async handleNewMessage(message: any) {
    // Lógica para processar mensagem já está nas Edge Functions
    console.log('Processando mensagem:', message.message_id);
  }

  async sendMessage(to: string, message: string): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('WhatsApp Service não inicializado');
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-whatsapp-message', {
        body: { to, message }
      });

      if (error) {
        console.error('Erro ao enviar mensagem:', error);
        return false;
      }

      console.log('Mensagem enviada:', data);
      return true;
    } catch (error) {
      console.error('Erro na chamada da função:', error);
      return false;
    }
  }

  async getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('whatsapp_customers')
      .select('*')
      .order('last_interaction', { ascending: false });

    if (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }

    return data.map(customer => ({
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      company: customer.company,
      email: customer.email,
      segment: customer.segment as 'pequena' | 'media' | 'grande' | 'enterprise',
      leadScore: customer.lead_score,
      lastInteraction: new Date(customer.last_interaction),
      status: customer.status as 'novo' | 'qualificado' | 'interessado' | 'proposta' | 'cliente' | 'perdido'
    }));
  }

  async getConversations(customerId?: string): Promise<Conversation[]> {
    let query = supabase
      .from('whatsapp_conversations')
      .select(`
        *,
        whatsapp_customers (*)
      `)
      .order('timestamp', { ascending: false });

    if (customerId) {
      query = query.eq('customer_id', customerId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar conversas:', error);
      return [];
    }

    return data.map(conv => ({
      id: conv.id,
      customerId: conv.customer_id,
      assignedAgentId: conv.agent_type,
      status: 'active' as const,
      priority: 'medium' as const,
      startTime: new Date(conv.timestamp),
      lastActivity: new Date(conv.timestamp),
      messages: [],
      context: conv.context || {},
      tags: []
    }));
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

export const realTimeWhatsAppService = new RealTimeWhatsAppService();
