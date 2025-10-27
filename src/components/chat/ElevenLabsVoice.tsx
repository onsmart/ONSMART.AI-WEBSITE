import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
import { ELEVENLABS_CONFIG, loadElevenLabsScript } from '@/lib/elevenlabsConfig';

interface ElevenLabsVoiceProps {
  agentId: string;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
  onCallStateChange?: (isInCall: boolean) => void;
  onSendMessage?: (message: string) => void; // Nova prop para enviar mensagem para o chat
  className?: string;
}

const ElevenLabsVoice: React.FC<ElevenLabsVoiceProps> = ({
  agentId,
  onMessage,
  onError,
  onCallStateChange,
  onSendMessage,
  className = ''
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const widgetRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Verificar se Web Speech API está disponível
  const isWebSpeechAvailable = () => {
    return typeof window !== 'undefined' && 
           ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  };

  // Inicializar Web Speech API como fallback
  const initializeWebSpeech = () => {
    try {
      if (!isWebSpeechAvailable()) {
        console.error('Web Speech API not available');
        return false;
      }

      console.log('Initializing Web Speech API...');
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Mostrar resultado intermediário no console
        if (interimTranscript) {
          console.log('Interim speech:', interimTranscript);
        }
        
        // Processar resultado final
        if (finalTranscript) {
          console.log('Final speech recognized:', finalTranscript);
          
          // Enviar mensagem para o chat da Sonia
          if (onSendMessage) {
            onSendMessage(finalTranscript.trim());
          }
          
          // Também chamar o callback de mensagem se existir
          onMessage?.({ text: finalTranscript.trim() });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onError?.(new Error(`Speech recognition error: ${event.error}`));
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        if (isInCall) {
          // Reiniciar reconhecimento se ainda estiver em chamada
          setTimeout(() => {
            if (isInCall && !isMuted) {
              console.log('Restarting speech recognition...');
              recognitionRef.current?.start();
            }
          }, 100);
        }
      };

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
      };

      console.log('Web Speech API initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Web Speech API:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeWidget = async () => {
      try {
        setIsLoading(true);
        console.log('Initializing voice functionality...');
        
        // Primeiro, tentar ElevenLabs
        let elevenLabsSuccess = false;
        try {
          console.log('Trying ElevenLabs...');
          await loadElevenLabsScript();
          
          if (window.elevenLabsConvAI) {
            console.log('ElevenLabs script loaded, initializing widget...');
            
            widgetRef.current = window.elevenLabsConvAI.init({
              agentId: agentId || ELEVENLABS_CONFIG.agentId,
              onMessage: (message: any) => {
                console.log('ElevenLabs message received:', message);
                onMessage?.(message);
              },
              onError: (error: any) => {
                console.error('ElevenLabs error:', error);
                onError?.(error);
              },
              ...ELEVENLABS_CONFIG.settings
            });
            
            console.log('ElevenLabs widget initialized successfully');
            setIsInitialized(true);
            setUseFallback(false);
            elevenLabsSuccess = true;
          }
        } catch (elevenLabsError) {
          console.warn('ElevenLabs failed:', elevenLabsError);
        }
        
        // Se ElevenLabs falhou, tentar Web Speech API
        if (!elevenLabsSuccess) {
          console.log('ElevenLabs failed, trying Web Speech API fallback...');
          
          if (initializeWebSpeech()) {
            console.log('Web Speech API initialized as fallback');
            setIsInitialized(true);
            setUseFallback(true);
          } else {
            throw new Error('Both ElevenLabs and Web Speech API failed');
          }
        }
      } catch (error) {
        console.error('Failed to initialize voice functionality:', error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWidget();

    return () => {
      if (widgetRef.current?.destroy) {
        widgetRef.current.destroy();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [agentId, onMessage, onError]);

  const toggleCall = () => {
    if (!isInitialized) return;

    if (isInCall) {
      // Encerrar chamada
      if (useFallback) {
        recognitionRef.current?.stop();
      } else {
        widgetRef.current?.endCall?.();
      }
      setIsInCall(false);
      onCallStateChange?.(false);
    } else {
      // Iniciar chamada de voz
      if (useFallback) {
        recognitionRef.current?.start();
      } else {
        widgetRef.current?.startCall?.();
      }
      setIsInCall(true);
      onCallStateChange?.(true);
    }
  };

  const handleToggleMute = () => {
    if (!isInitialized || !isInCall) return;
    
    if (useFallback) {
      if (isMuted) {
        recognitionRef.current?.start();
      } else {
        recognitionRef.current?.stop();
      }
    } else {
      widgetRef.current?.toggleMute?.();
    }
    
    setIsMuted(!isMuted);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCall}
        disabled={!isInitialized || isLoading}
        className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${
          isInCall 
            ? 'text-red-500 hover:bg-red-500/20 animate-pulse' 
            : isInitialized 
              ? 'text-emerald-500 hover:bg-emerald-500/20' 
              : 'text-gray-400 cursor-not-allowed'
        }`}
        title={
          isLoading 
            ? "Carregando..." 
            : !isInitialized 
              ? "Voz não disponível" 
              : isInCall 
                ? "Encerrar chamada" 
                : "Iniciar chamada de voz"
        }
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : isInCall ? (
          <PhoneOff className="h-4 w-4" />
        ) : (
          <Phone className="h-4 w-4" />
        )}
      </Button>
      
      {isInCall && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleMute}
          className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${
            isMuted 
              ? 'text-gray-500 hover:bg-gray-500/20' 
              : 'text-blue-500 hover:bg-blue-500/20'
          }`}
          title={isMuted ? "Ativar microfone" : "Desativar microfone"}
        >
          {isMuted ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}
      
      {/* Status indicator */}
      {!isInitialized && !isLoading && (
        <div className="text-xs text-red-500 flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          Voz indisponível
        </div>
      )}
      
      {isLoading && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
          Carregando...
        </div>
      )}
      
      {isInitialized && !isInCall && (
        <div className="text-xs text-emerald-500 flex items-center gap-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          {useFallback ? "Voz (Web Speech)" : "Voz (ElevenLabs)"}
        </div>
      )}
      
      {isInCall && (
        <div className="text-xs text-blue-500 flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          {useFallback ? "Ouvindo..." : "Em chamada"}
        </div>
      )}
    </div>
  );
};

export default ElevenLabsVoice;