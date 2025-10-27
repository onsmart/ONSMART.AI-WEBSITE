
import { useEffect, useState } from 'react';
import { realTimeWhatsAppService } from '@/services/realTimeWhatsappService';

export const useWhatsAppService = () => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeService = async () => {
      try {
        await realTimeWhatsAppService.initialize();
        setIsReady(realTimeWhatsAppService.isReady());
      } catch (error) {
        console.error('Erro ao inicializar WhatsApp Service:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeService();
  }, []);

  return {
    isReady,
    isLoading,
    service: realTimeWhatsAppService
  };
};
