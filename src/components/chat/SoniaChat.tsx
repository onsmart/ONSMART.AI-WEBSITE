import React, { useState, useRef, useEffect } from 'react';
import { Send, X, User, Minimize2, Maximize2, Sparkles, RefreshCw, Mic, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Hook para traduções
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { openAIService } from '@/lib/openaiService';
import { getConversationStarters } from '@/lib/soniaPrompts'; // Função que retorna starters traduzidos
import { useSoniaChat } from '@/hooks/useSoniaChat';
import VoiceChat from './VoiceChat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sonia';
  timestamp: Date;
  audioUrl?: string; // Para armazenar URL do áudio quando disponível
}

interface SoniaChatProps {
  className?: string;
}

const SoniaChat: React.FC<SoniaChatProps> = ({ className = '' }) => {
  // Hook de tradução - namespace 'chat' contém todas as traduções do chat
  const { t, i18n } = useTranslation('chat');
  const { isOpen, isMinimized, chatMode, closeChat, minimizeChat, maximizeChat, setChatMode } = useSoniaChat();
  const [message, setMessage] = useState('');
  
  // Mensagem de boas-vindas traduzida - usa o idioma atual
  const getWelcomeMessage = () => t('welcome');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(),
      sender: 'sonia',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(180);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const WHATSAPP_NUMBER = '551150931836';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá [SRC=ONSMART]')}`;
  
  // Ajustar tamanho do QR Code baseado no tamanho da tela
  useEffect(() => {
    const updateQrCodeSize = () => {
      if (window.innerWidth < 640) {
        setQrCodeSize(160); // Mobile
      } else if (window.innerWidth < 768) {
        setQrCodeSize(180); // Tablet
      } else {
        setQrCodeSize(200); // Desktop
      }
    };
    
    updateQrCodeSize();
    window.addEventListener('resize', updateQrCodeSize);
    return () => window.removeEventListener('resize', updateQrCodeSize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:text-brand-blue/80 underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    console.log('handleSendMessage called');
    console.log('Current message:', message);
    console.log('isTyping:', isTyping);
    
    if (!message.trim() || isTyping) {
      console.log('Message empty or already typing, returning');
      return;
    }

    console.log('Creating user message...');
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    console.log('Adding user message to chat:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    try {
      console.log('Calling OpenAI API with message:', currentMessage);
      // Chama a API da OpenAI
      const soniaResponse = await openAIService.sendMessage(currentMessage);
      
      console.log('Received response from Sonia:', soniaResponse);
      const soniaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: soniaResponse,
        sender: 'sonia',
        timestamp: new Date()
      };
      
      console.log('Adding Sonia response to chat:', soniaMessage);
      setMessages(prev => [...prev, soniaMessage]);
    } catch (error) {
      console.error('Error getting response from Sonia:', error);
      
      // Fallback em caso de erro - mensagem traduzida
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('error'), // Traduz automaticamente conforme o idioma
        sender: 'sonia',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Função para resetar a conversa - atualiza mensagem de boas-vindas quando idioma muda
  const handleResetConversation = () => {
    openAIService.resetConversation();
    setMessages([
      {
        id: '1',
        text: getWelcomeMessage(), // Sempre usa o idioma atual
        sender: 'sonia',
        timestamp: new Date()
      }
    ]);
  };
  
  // Atualizar mensagem de boas-vindas e prompt da IA quando o idioma mudar
  useEffect(() => {
    // Atualizar prompt da IA no serviço
    openAIService.updateLanguage();
    
    // Se for a mensagem inicial de boas-vindas, atualizar
    if (messages.length === 1 && messages[0].sender === 'sonia' && messages[0].id === '1') {
      setMessages([{
        id: '1',
        text: getWelcomeMessage(),
        sender: 'sonia',
        timestamp: new Date()
      }]);
    }
  }, [i18n.language]); // Reexecuta quando o idioma muda

  // Função para enviar sugestões rápidas
  const handleQuickSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChat = () => {
    console.log('🔵 Botão da Sonia clicado!');
    console.log('Estado atual - isOpen:', isOpen, 'isMinimized:', isMinimized);
    maximizeChat();
    console.log('✅ maximizeChat() chamado');
  };

  if (!isOpen) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-[9999]"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={handleOpenChat}
          onTouchEnd={handleOpenChat}
          className="h-16 w-16 rounded-full bg-emerald-500 active:bg-emerald-600 hover:bg-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center relative"
          aria-label={t('button.openChat')}
          type="button"
          style={{ 
            pointerEvents: 'auto',
            touchAction: 'manipulation'
          }}
        >
          {/* Pulse rings - atrás do botão */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" style={{ zIndex: -1, pointerEvents: 'none' }}></div>
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" style={{ zIndex: -2, pointerEvents: 'none' }}></div>
          
          {/* Chat icon */}
          <img 
            src="/images/chat.png" 
            alt="Chat com Sonia" 
            className="h-7 w-7"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
              {t('tooltip.talkToSonia')}
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-[9999] ${className}`}>
      <div className={`bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-400 ease-out transform ${
        isMinimized ? 'w-72 h-12' : 'w-72 sm:w-80 h-[400px] max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)]'
      } backdrop-blur-sm bg-white/95 animate-in slide-in-from-bottom-1 fade-in-0 zoom-in-98 duration-400`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-emerald-500 rounded-t-xl relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-7 h-7 rounded-full overflow-hidden shadow-md relative group border-2 border-white">
              <img 
                src="/images/sonia.png" 
                alt="Sonia" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-xs">{t('header.title')}</h3>
                <Sparkles className="h-3 w-3 text-yellow-300 animate-pulse" />
              </div>
              <div className="text-white/80 text-[10px] flex items-center gap-1 -ml-0.5">
                <div className="h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>{t('header.subtitle')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatMode(chatMode === 'text' ? 'voice' : 'text')}
              className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              title={chatMode === 'text' ? t('header.switchToVoice') : t('header.switchToText')}
            >
              {chatMode === 'text' ? (
                <Mic className="h-3 w-3" />
              ) : (
                <MessageSquare className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              title={t('header.whatsapp')}
            >
              <WhatsAppIcon className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetConversation}
              className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              title={t('header.newConversation')}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isMinimized ? maximizeChat() : minimizeChat()}
              className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              title={isMinimized ? t('header.maximize') : t('header.minimize')}
            >
              {isMinimized ? (
                <Maximize2 className="h-3 w-3" />
              ) : (
                <Minimize2 className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => closeChat()}
              className="h-6 w-6 p-0 text-white hover:bg-red-500/20 hover:text-red-100 rounded-full transition-all duration-300 hover:scale-110"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {chatMode === 'voice' ? (
              <VoiceChat 
                onBackToText={() => setChatMode('text')}
                className="h-[360px]"
              />
            ) : (
              <>
                {/* Messages */}
                    <div className="flex-1 p-3 h-[280px] overflow-y-auto bg-gradient-to-b from-gray-50/50 to-blue-50/30 relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  
                  <div className="space-y-4 relative z-10">
                    {messages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                            msg.sender === 'user'
                              ? 'bg-emerald-500 text-white shadow-lg hover:shadow-xl'
                              : 'bg-white text-gray-800 border border-gray-200 shadow-md hover:shadow-lg hover:border-emerald-500/20'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {msg.sender === 'sonia' && (
                              <div className="relative">
                                <div className="w-4 h-4 rounded-full overflow-hidden mt-0.5 flex-shrink-0 border border-gray-200">
                                  <img 
                                    src="/images/sonia.png" 
                                    alt="Sonia" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                              </div>
                            )}
                            {msg.sender === 'user' && (
                              <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed whitespace-pre-line">
                                {renderTextWithLinks(msg.text)}
                              </p>
                              {msg.audioUrl && (
                                <div className="mt-2">
                                  <audio controls className="w-full h-8">
                                    <source src={msg.audioUrl} type="audio/mpeg" />
                                    {t('audio.notSupported')}
                                  </audio>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start animate-in slide-in-from-bottom-2">
                        <div className="bg-white text-gray-800 border border-gray-200 shadow-md p-3 rounded-xl relative overflow-hidden">
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent -skew-x-12 animate-pulse"></div>
                          
                          <div className="flex items-center gap-2 relative z-10">
                            <div className="relative">
                              <div className="w-4 h-4 rounded-full overflow-hidden animate-pulse border border-gray-200">
                                <img 
                                  src="/images/sonia.png" 
                                  alt="Sonia" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                            </div>
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                              <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                              <div className="w-2 h-2 bg-emerald-500/60 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                            <span className="text-xs text-gray-500 animate-pulse">{t('typing')}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Quick suggestions - only show when conversation is minimal */}
                    {messages.length === 1 && !isTyping && (
                      <div className="mt-4 animate-in slide-in-from-bottom-2">
                        <p className="text-xs text-gray-500 mb-2 text-center">{t('suggestions.title')}</p>
                        <div className="space-y-2">
                          {/* Usa função que retorna starters traduzidos baseado no idioma atual */}
                          {getConversationStarters(i18n.language).slice(0, 3).map((starter, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickSuggestion(starter)}
                              className="w-full text-left p-2 text-xs bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 hover:border-emerald-300 transition-all duration-200 text-gray-600 hover:text-emerald-600"
                            >
                              {starter}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                    <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('placeholder')}
                        className="text-sm border border-gray-200 focus:border-emerald-500 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md focus:shadow-lg pr-10"
                      />
                      {/* Sparkle icon when typing */}
                      {message.trim() && (
                        <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500 animate-pulse" />
                      )}
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isTyping}
                      size="sm"
                      className="bg-emerald-500 hover:bg-emerald-600 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {isTyping ? (
                        <div className="h-4 w-4 relative z-10">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        </div>
                      ) : (
                        <Send className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      {/* WhatsApp Modal */}
      <Dialog open={isWhatsAppModalOpen} onOpenChange={setIsWhatsAppModalOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-1 sm:px-0">
            <DialogTitle className="text-base sm:text-lg font-semibold">{t('whatsapp.modalTitle')}</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm mt-1 sm:mt-2">
              {t('whatsapp.modalDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 sm:gap-6 py-2 sm:py-4">
            {/* QR Code */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
              <div className="p-3 sm:p-4 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <QRCodeSVG
                  value={WHATSAPP_URL}
                  size={qrCodeSize}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 text-center px-2 max-w-sm">
                {t('whatsapp.qrCodeLabel')}
              </p>
            </div>
            
            {/* Divider */}
            <div className="flex items-center w-full gap-2 px-2 sm:px-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-500 whitespace-nowrap px-2">{t('whatsapp.or')}</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            {/* WhatsApp Button */}
            <Button
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-white font-semibold py-4 sm:py-6 text-sm sm:text-base md:text-lg gap-2 sm:gap-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-h-[48px] sm:min-h-[56px]"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <span className="whitespace-nowrap">{t('whatsapp.openButton')}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
};

export default SoniaChat;
