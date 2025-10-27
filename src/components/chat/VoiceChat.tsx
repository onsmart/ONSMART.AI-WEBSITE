import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { openAIService } from '@/lib/openaiService';
import ElevenLabsWidget from './ElevenLabsWidget';

interface VoiceChatProps {
  onBackToText?: () => void;
  className?: string;
}

interface VoiceMessage {
  id: string;
  text: string;
  sender: 'user' | 'sonia';
  timestamp: Date;
  audioUrl?: string;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ onBackToText, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  // Verificar se Web Speech APIs estão disponíveis
  const isWebSpeechAvailable = () => {
    return typeof window !== 'undefined' && 
           ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) &&
           ('speechSynthesis' in window);
  };

  // Inicializar APIs de voz
  const initializeVoiceAPIs = () => {
    if (!isWebSpeechAvailable()) {
      console.error('Web Speech APIs not available for speech recognition');
      return false;
    }

    try {
      console.log('Inicializando Web Speech API para reconhecimento de voz');
      
      // Configurar reconhecimento de voz
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice recognized:', transcript);
        
        // Adicionar mensagem do usuário
        const userMessage: VoiceMessage = {
          id: Date.now().toString(),
          text: transcript,
          sender: 'user',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsListening(false);
        
        // Processar resposta da Sonia
        processSoniaResponse(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      console.log('Voice APIs initialized successfully');
      setIsInitialized(true);
      return true;
    } catch (error) {
      console.error('Failed to initialize voice APIs:', error);
      return false;
    }
  };

  // Processar resposta da Sonia com resposta mais rápida e humanizada
  const processSoniaResponse = async (userMessage: string) => {
    try {
      setIsProcessing(true);
      
      // Criar prompt mais humanizado para voz da Karen
      const humanizedPrompt = `Você é a Sonia, assistente de IA da OnSmart AI. Responda de forma natural, calorosa e profissional. Seja rápida e direta (máximo 2 frases). Sempre termine com uma pergunta para manter a conversa fluindo. Não use emojis nem formatação markdown.`;
      
      // Obter resposta da Sonia com prompt humanizado
      const soniaResponse = await openAIService.sendMessage(userMessage, [{ role: 'system', content: humanizedPrompt }]);
      
      // Adicionar resposta da Sonia ao chat
      const soniaMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: soniaResponse,
        sender: 'sonia',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, soniaMessage]);
      
      // O ElevenLabs Conversational AI widget gerencia a síntese de voz automaticamente
      console.log('Resposta da Sonia:', soniaResponse);
      
    } catch (error) {
      console.error('Error getting response from Sonia:', error);
      
      const errorMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, estou com algumas dificuldades técnicas no momento. Tente novamente em alguns instantes.',
        sender: 'sonia',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };


  // Iniciar/parar escuta
  const toggleListening = () => {
    if (!isInitialized) return;
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };


  useEffect(() => {
    const success = initializeVoiceAPIs();
    if (!success) {
      console.error('Failed to initialize voice chat');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b from-gray-50/50 to-blue-50/30 relative ${className}`}>
      {/* Background pattern igual ao chat por texto */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* ElevenLabs Widget - Interface Completa com largura ajustada */}
      <div className="flex-1 flex justify-center items-start pt-4 relative z-10">
        <div className="w-32 h-full"> {/* Largura ainda mais compacta para não tampar o nome da Sonia */}
          <ElevenLabsWidget 
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
