
import { useEffect, useState } from 'react';
import { realTimeWhatsAppService } from '@/services/realTimeWhatsappService';
import { whatsappAgentService } from '@/services/whatsappAgentService';
import { AIAgent, Conversation, WhatsAppMessage } from '@/types/whatsappAgents';
import { supabaseHelpers } from '@/integrations/supabase/client';

export const useRealTimeAgents = () => {
  const [isServiceReady, setIsServiceReady] = useState(false);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeServices();
    setupRealtimeSubscriptions();
  }, []);

  const initializeServices = async () => {
    try {
      // Inicializar serviço WhatsApp
      await realTimeWhatsAppService.initialize();
      setIsServiceReady(realTimeWhatsAppService.isReady());
      
      // Carregar agentes e conversas
      updateAgentData();
    } catch (error) {
      console.error('Erro ao inicializar serviços:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Escutar novas mensagens
    supabase
      .channel('whatsapp_realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'whatsapp_messages' }, 
        handleNewMessage
      )
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'whatsapp_conversations' }, 
        handleNewConversation
      )
      .subscribe();
  };

  const handleNewMessage = async (payload: any) => {
    console.log('Nova mensagem recebida:', payload.new);
    
    // Processar mensagem com o serviço de agentes
    const message: WhatsAppMessage = {
      id: payload.new.message_id,
      from: payload.new.from_number,
      to: payload.new.to_number || '+5511996669247',
      body: payload.new.message_body,
      timestamp: new Date(payload.new.timestamp),
      type: 'text',
      status: 'delivered'
    };

    try {
      await whatsappAgentService.processIncomingMessage(message);
      updateAgentData();
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  };

  const handleNewConversation = () => {
    updateAgentData();
  };

  const updateAgentData = () => {
    setAgents(whatsappAgentService.getAgents());
    setConversations(whatsappAgentService.getActiveConversations());
  };

  const sendMessage = async (to: string, message: string): Promise<boolean> => {
    if (!isServiceReady) {
      console.error('Serviço WhatsApp não está pronto');
      return false;
    }

    try {
      const success = await realTimeWhatsAppService.sendMessage(to, message);
      if (success) {
        updateAgentData();
      }
      return success;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return false;
    }
  };

  return {
    isServiceReady,
    isLoading,
    agents,
    conversations,
    sendMessage,
    updateAgentData
  };
};
