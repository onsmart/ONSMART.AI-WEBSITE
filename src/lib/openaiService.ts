import { SYSTEM_PROMPT } from './soniaPrompts';

// Configurações da API usando proxy seguro
const OPENAI_CONFIG = {
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
  temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
  maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '150'),
  // Use local backend server in development, Vercel proxy in production
  apiUrl: import.meta.env.DEV ? 'http://localhost:3001/api/openai-proxy' : '/api/openai-proxy'
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  private messages: ChatMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT
    }
  ];

  async sendMessage(userMessage: string, customMessages?: ChatMessage[]): Promise<string> {
    try {
      // Usar mensagens customizadas se fornecidas, senão usar o histórico padrão
      const messagesToUse = customMessages || this.messages;
      
      // Adiciona a mensagem do usuário ao histórico
      messagesToUse.push({
        role: 'user',
        content: userMessage
      });

      // Adiciona um lembrete de concisão se a conversa estiver longa
      const addedReminder = messagesToUse.length > 5;
      if (addedReminder) {
        messagesToUse.push({
          role: 'system',
          content: 'LEMBRE-SE: Resposta MÁXIMO 2-3 frases curtas SEM emojis, SEM formatação markdown (**,*,_). Apenas texto simples. Termine com pergunta!'
        });
      }

      // Prepara a requisição para o proxy seguro
      const response = await fetch(OPENAI_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messagesToUse
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.message;

      if (!assistantMessage) {
        throw new Error('No response from OpenAI');
      }

      // Remove o lembrete se foi adicionado
      if (addedReminder) {
        messagesToUse.pop(); // Remove o lembrete
      }

      // Adiciona a resposta da IA ao histórico (apenas se não for mensagem customizada)
      if (!customMessages) {
        this.messages.push({
          role: 'assistant',
          content: assistantMessage
        });

        // Limita o histórico a 20 mensagens para evitar tokens excessivos
        if (this.messages.length > 21) { // 1 system + 20 mensagens
          this.messages = [
            this.messages[0], // Mantém o system prompt
            ...this.messages.slice(-20) // Últimas 20 mensagens
          ];
        }
      }

      return assistantMessage;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fallback para respostas pré-definidas em caso de erro
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('preço') || msg.includes('custo') || msg.includes('valor')) {
      return 'Nossos Agentes de IA são personalizados para cada empresa.\nOs investimentos variam conforme suas necessidades específicas.\n\nQuer agendar uma demonstração gratuita?';
    }
    
    if (msg.includes('como funciona') || msg.includes('funciona')) {
      return 'Nossos Agentes funcionam como assistentes virtuais inteligentes.\nEles automatizam vendas, atendimento, RH e muito mais.\n\nQual área você gostaria de automatizar?';
    }
    
    if (msg.includes('demonstração') || msg.includes('demo') || msg.includes('teste')) {
      return 'Claro! Adoro mostrar nossos Agentes de IA em ação.\nNossa equipe pode fazer uma demo personalizada.\n\nQue tipo de solução mais te interessa?';
    }
    
    if (msg.includes('agendar') || msg.includes('reunião') || msg.includes('marcar') || msg.includes('calendário')) {
      return `Perfeito! Você pode agendar uma reunião diretamente pelo nosso Calendly.\nAcesse: ${import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ricardo-palomar-onsmartai/30min'}\n\nEm que posso ajudar mais?`;
    }
    
    if (msg.includes('implementação') || msg.includes('tempo') || msg.includes('prazo')) {
      return 'Implementamos em apenas 30 dias.\nNossa equipe cuida de toda a integração.\n\nGostaria de conhecer nosso processo?';
    }
    
    if (msg.includes('automação de vendas') || msg.includes('vendas')) {
      return 'Nossa Automação de Vendas transforma seu processo comercial.\nSDRs virtuais que trabalham 24/7 com +300% de conversão.\n\nQuer saber mais sobre como funciona?';
    }
    
    if (msg.includes('atendimento') || msg.includes('chatbot')) {
      return 'Nosso Atendimento Inteligente revoluciona o suporte ao cliente.\nChatbots multicanal com +95% de satisfação.\n\nGostaria de ver uma demonstração?';
    }
    
    if (msg.includes('produtos') || msg.includes('soluções') || msg.includes('quais')) {
      return 'Oferecemos seis categorias de soluções em IA:\n\n• Automação de Vendas: SDRs virtuais e qualificação de leads\n• Atendimento Inteligente: Chatbots multicanal e assistentes virtuais\n• RH Inteligente: Recrutamento automatizado e analytics de workforce\n• BI & Analytics: Business Intelligence preditivo em tempo real\n• Automação de Processos: RPA inteligente com IA avançada\n• Voz & Linguagem: NLP otimizado para português brasileiro\n\nQual solução você gostaria de explorar mais a fundo?';
    }
    
    return 'Estou com algumas dificuldades técnicas no momento.\nMas posso te conectar com nossa equipe comercial.\n\nQuer agendar uma conversa?';
  }

  // Método para resetar a conversa
  resetConversation(): void {
    this.messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      }
    ];
  }

  // Método para obter o histórico de mensagens (sem o system prompt)
  getConversationHistory(): ChatMessage[] {
    return this.messages.slice(1); // Remove o system prompt
  }
}

// Instância singleton do serviço
export const openAIService = new OpenAIService();
