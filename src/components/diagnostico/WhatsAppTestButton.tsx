import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511996669247?text=Ol%C3%A1!%20Quero%20testar%20os%20Agentes%20de%20IA%20da%20onsmart.';

const WhatsAppTestButton: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-green-600" />
          <Bot className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          🤖 Teste Nossos Agentes de IA do WhatsApp
        </h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        Experimente agora mesmo como nossos agentes de IA atendem clientes no WhatsApp. 
        Teste diferentes cenários e veja o roteamento inteligente em ação!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <MessageCircle className="mr-2 h-4 w-4" />
            Testar Agentes de IA
          </Button>
        </a>
        <div className="text-sm text-gray-500 flex items-center">
          ✨ Simulador completo • Sem configuração necessária
        </div>
      </div>
    </div>
  );
};

export default WhatsAppTestButton;
