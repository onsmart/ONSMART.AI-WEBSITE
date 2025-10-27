import React, { useEffect, useRef, useState } from 'react';

interface ConversationalAIProps {
  agentId: string;
  onMessage?: (message: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

const ConversationalAI: React.FC<ConversationalAIProps> = ({ 
  agentId, 
  onMessage, 
  onError, 
  className = '' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeWidget = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Aguardar o script carregar
        const checkScript = () => {
          if (window.customElements && window.customElements.get('elevenlabs-convai')) {
            createWidget();
          } else {
            setTimeout(checkScript, 500);
          }
        };
        
        const createWidget = () => {
          const widgetContainer = widgetRef.current;
          if (!widgetContainer) return;
          
          // Limpar conteúdo anterior
          widgetContainer.innerHTML = '';
          
          // Criar elemento elevenlabs-convai
          const widget = document.createElement('elevenlabs-convai');
          widget.setAttribute('agent-id', agentId);
          widget.setAttribute('auto-start', 'false');
          widget.setAttribute('show-ui', 'false');
          widget.setAttribute('language', 'pt-BR');
          
          // Configurar eventos
          widget.addEventListener('message', (event: any) => {
            console.log('Conversational AI message:', event);
            if (onMessage && event.detail?.message) {
              onMessage(event.detail.message);
            }
          });
          
          widget.addEventListener('error', (event: any) => {
            console.error('Conversational AI error:', event);
            if (onError && event.detail?.error) {
              onError(event.detail.error);
            }
          });
          
          // Adicionar ao container
          widgetContainer.appendChild(widget);
          
          console.log('ElevenLabs Conversational AI widget criado');
          setIsLoading(false);
        };
        
        checkScript();
        
      } catch (error) {
        console.error('Erro ao criar widget Conversational AI:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
        if (onError) {
          onError(`Falha ao criar widget: ${error}`);
        }
        setIsLoading(false);
      }
    };

    if (agentId) {
      // Aguardar um pouco para garantir que o script foi carregado
      setTimeout(initializeWidget, 2000);
    }

    return () => {
      // Limpar widget ao desmontar
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [agentId, onMessage, onError]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-purple-600">Inicializando Conversational AI...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="text-center">
          <p className="text-sm text-red-600">Erro: {error}</p>
          <p className="text-xs text-gray-500 mt-1">Usando fallback para Web Speech API</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`conversational-ai-container ${className}`}>
      <div ref={widgetRef} className="w-full h-full">
        {/* O widget do ElevenLabs será renderizado aqui */}
      </div>
      <div className="text-center text-purple-600 text-xs mt-2">
        ElevenLabs Conversational AI ativo
      </div>
    </div>
  );
};

export default ConversationalAI;
