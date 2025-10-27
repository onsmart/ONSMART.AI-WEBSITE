
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { whatsappAgentService } from '@/services/whatsappAgentService';
import { WhatsAppMessage } from '@/types/whatsappAgents';
import { MessageCircle, Send, Phone } from 'lucide-react';

const WhatsappSimulator: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customerPhone] = useState('+5511999999999');

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      from: customerPhone,
      to: '+5511996669247', // Número da onsmart
      body: currentMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Simular processamento do agente
      await whatsappAgentService.processIncomingMessage(userMessage);
      
      // Simular resposta do agente (em produção seria automática)
      setTimeout(() => {
        const agentResponse: WhatsAppMessage = {
          id: `agent-${Date.now()}`,
          from: '+5511996669247',
          to: customerPhone,
          body: getSimulatedResponse(messageText),
          timestamp: new Date(),
          type: 'text',
          status: 'delivered'
        };
        
        setMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setIsTyping(false);
    }
  };

  const getSimulatedResponse = (message: string) => {
    const text = message.toLowerCase();
    
    if (text.includes('olá') || text.includes('oi')) {
      return `Olá! 👋 Sou a Sofia da onsmart.AI!

Que bom ter você aqui! Somos especialistas em Agentes de IA que podem transformar sua empresa e aumentar a produtividade em até 420%.

Para te ajudar melhor, me conta:
🏢 Qual o nome da sua empresa?
👤 Qual seu cargo/função?
🎯 O que te trouxe até nós hoje?`;
    }
    
    if (text.includes('preço') || text.includes('valor')) {
      return `Excelente pergunta! 💰

Nossos Agentes de IA têm um ROI médio de 420% em 6 meses, então o investimento se paga rapidamente.

O valor varia conforme:
🔹 Tamanho da empresa
🔹 Processos a serem automatizados  
🔹 Quantidade de agentes
🔹 Nível de customização

Que tal eu fazer uma proposta personalizada? 

Vou te conectar com nosso especialista comercial...`;
    }
    
    if (text.includes('demo') || text.includes('demonstração')) {
      return `Perfeito! Uma demonstração é a melhor forma de ver como nossos Agentes de IA podem revolucionar sua empresa! 

Vou te conectar com nosso especialista comercial que pode:
✅ Fazer uma demo personalizada
✅ Mostrar cases do seu setor
✅ Calcular o ROI específico para sua empresa

Transferindo para o Carlos...`;
    }
    
    return `Entendi! Vou analisar sua solicitação e te conectar com o agente mais adequado.

Nossos Agentes de IA já transformaram 350+ empresas com resultados incríveis:
📈 420% de ROI médio
 30 dias para implementação
🎯 98% de taxa de sucesso

Um momento...`;
  };

  const startTestConversation = () => {
    const testMessage = "Olá! Gostaria de saber mais sobre os Agentes de IA da onsmart.";
    setCurrentMessage(testMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Simulador WhatsApp</CardTitle>
          </div>
          <Badge variant="default" className="bg-green-500">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>onsmart.AI Agentes</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ScrollArea className="h-80 border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma mensagem ainda</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={startTestConversation}
                >
                  Iniciar Conversa de Teste
                </Button>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.from === customerPhone ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.from === customerPhone 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{message.body}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isTyping}
          />
          <Button onClick={sendMessage} disabled={isTyping || !currentMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Simule uma conversa real com os agentes de IA
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsappSimulator;
