import React, { useEffect, useRef, useState } from 'react';
import { elevenLabsConfigService } from '@/lib/elevenlabsConfigService';

interface ElevenLabsWidgetProps {
  className?: string;
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ className = '' }) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  useEffect(() => {
    const initializeWidget = async () => {
      try {
        // Buscar HTML do widget do backend (sem Agent ID exposto)
        const widgetHtml = await elevenLabsConfigService.getWidgetHtml();
        
        if (!widgetHtml) {
          // Servidor offline - modo silencioso
          return;
        }

        if (!widgetRef.current) return;

        // Limpar conteúdo anterior
        widgetRef.current.innerHTML = '';

        // Inserir HTML do widget diretamente (Agent ID já está embedado no HTML)
        widgetRef.current.innerHTML = widgetHtml;

        console.log('✅ ElevenLabs Conversational AI widget carregado');
        setIsWidgetReady(true);
      } catch (error) {
        // Erro silencioso - servidor offline
      }
    };

    // Aguardar o script carregar
    const checkScript = () => {
      if (window.customElements && window.customElements.get('elevenlabs-convai')) {
        initializeWidget();
      } else {
        setTimeout(checkScript, 500);
      }
    };

    // Inicializar após um pequeno delay para garantir que o script foi carregado
    setTimeout(checkScript, 1000);

    return () => {
      // Limpar widget ao desmontar
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={`elevenlabs-widget-container ${className}`}>
      {!isWidgetReady && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-emerald-600">Carregando Sonia...</p>
          </div>
        </div>
      )}
      <div ref={widgetRef} className="w-full h-full max-w-xs mx-auto">
        {/* O widget do ElevenLabs será renderizado aqui via HTML do backend */}
      </div>
    </div>
  );
};

export default ElevenLabsWidget;
