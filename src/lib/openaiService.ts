import { getSystemPrompt } from './soniaPrompts';
import i18n from '../i18n/config'; // Importar instância do i18n para pegar idioma atual

// Configurações da API usando proxy seguro
const OPENAI_CONFIG = {
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
  temperature: parseFloat(import.meta.env.VITE_OPENAI_TEMPERATURE || '0.7'),
  maxTokens: parseInt(import.meta.env.VITE_OPENAI_MAX_TOKENS || '150'),
  // Use Vercel API route (works in both dev and production when deployed to Vercel)
  // If testing locally without Vercel, you can temporarily use: 'http://localhost:3001/api/openai-proxy'
  apiUrl: import.meta.env.VITE_OPENAI_API_URL || '/api/openai-proxy'
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  // Método privado para obter o prompt do sistema no idioma atual
  private getCurrentSystemPrompt(): string {
    // Pega o idioma atual do i18n (pt, en, es)
    const currentLanguage = i18n.language || 'pt';
    // Normaliza para código de 2 letras (pt-BR → pt)
    const langCode = currentLanguage.split('-')[0];
    return getSystemPrompt(langCode);
  }
  
  // Inicializa mensagens com prompt traduzido
  private initializeMessages(): ChatMessage[] {
    return [
    {
      role: 'system',
        content: this.getCurrentSystemPrompt()
      }
    ];
  }
  
  private messages: ChatMessage[] = [];

  // Constructor para inicializar com prompt traduzido
  constructor() {
    this.messages = this.initializeMessages();
  }

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
      // Lembrete traduzido conforme o idioma
      const addedReminder = messagesToUse.length > 5;
      if (addedReminder) {
        const langCode = (i18n.language || 'pt').split('-')[0];
        const reminders: Record<string, string> = {
          pt: 'LEMBRE-SE: Resposta MÁXIMO 2-3 frases curtas SEM emojis, SEM formatação markdown (**,*,_). Apenas texto simples. Termine com pergunta!',
          en: 'REMEMBER: Response MAXIMUM 2-3 short sentences NO emojis, NO markdown formatting (**,*,_). Simple text only. Always end with a question!',
          es: 'RECUERDA: Respuesta MÁXIMO 2-3 frases cortas SIN emojis, SIN formato markdown (**,*,_). Solo texto simple. ¡Siempre termina con una pregunta!'
        };
        messagesToUse.push({
          role: 'system',
          content: reminders[langCode] || reminders.pt
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

  // Respostas de fallback traduzidas
  // Essas são usadas quando a API falha ou há erro de conexão
  private getFallbackResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();
    const langCode = (i18n.language || 'pt').split('-')[0];
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ricardo-palomar-onsmartai/30min';
    
    // Fallbacks por idioma
    const fallbacks: Record<string, Record<string, string>> = {
      pt: {
        price: 'Nossos Agentes de IA são personalizados para cada empresa.\nOs investimentos variam conforme suas necessidades específicas.\n\nQuer agendar uma demonstração gratuita?',
        how: 'Nossos Agentes funcionam como assistentes virtuais inteligentes.\nEles automatizam vendas, atendimento, RH e muito mais.\n\nQual área você gostaria de automatizar?',
        demo: `Perfeito! Você pode agendar uma demonstração diretamente pelo nosso Calendly.\nAcesse: ${calendlyUrl}\n\nEm que posso ajudar mais?`,
        schedule: `Perfeito! Você pode agendar uma reunião diretamente pelo nosso Calendly.\nAcesse: ${calendlyUrl}\n\nEm que posso ajudar mais?`,
        timeline: 'Implementamos em apenas 30 dias.\nNossa equipe cuida de toda a integração.\n\nGostaria de conhecer nosso processo?',
        sales: 'Nossa Automação de Vendas transforma seu processo comercial.\nSDRs virtuais que trabalham 24/7 com +300% de conversão.\n\nQuer saber mais sobre como funciona?',
        support: 'Nosso Atendimento Inteligente revoluciona o suporte ao cliente.\nChatbots multicanal com +95% de satisfação.\n\nGostaria de ver uma demonstração?',
        products: 'Oferecemos seis categorias de soluções em IA:\n\n• Automação de Vendas: SDRs virtuais e qualificação de leads\n• Atendimento Inteligente: Chatbots multicanal e assistentes virtuais\n• RH Inteligente: Recrutamento automatizado e analytics de workforce\n• BI & Analytics: Business Intelligence preditivo em tempo real\n• Automação de Processos: RPA inteligente com IA avançada\n• Voz & Linguagem: NLP otimizado para português brasileiro\n\nQual solução você gostaria de explorar mais a fundo?',
        default: 'Estou com algumas dificuldades técnicas no momento.\nMas posso te conectar com nossa equipe comercial.\n\nQuer agendar uma conversa?'
      },
      en: {
        price: 'Our AI Agents are customized for each company.\nInvestments vary according to your specific needs.\n\nWould you like to schedule a free demonstration?',
        how: 'Our Agents work as intelligent virtual assistants.\nThey automate sales, support, HR and much more.\n\nWhich area would you like to automate first?',
        demo: `Perfect! You can schedule a demonstration directly through our Calendly.\nAccess: ${calendlyUrl}\n\nHow else can I help?`,
        schedule: `Perfect! You can schedule a meeting directly through our Calendly.\nAccess: ${calendlyUrl}\n\nHow else can I help?`,
        timeline: 'We implement in just 30 days.\nOur team takes care of the entire integration.\n\nWould you like to know our process?',
        sales: 'Our Sales Automation transforms your commercial process.\nVirtual SDRs that work 24/7 with +300% conversion.\n\nWant to know more about how it works?',
        support: 'Our Intelligent Support revolutionizes customer service.\nMultichannel chatbots with +95% satisfaction.\n\nWould you like to see a demonstration?',
        products: 'We offer six categories of AI solutions:\n\n• Sales Automation: Virtual SDRs and lead qualification\n• Intelligent Support: Multichannel chatbots and virtual assistants\n• Intelligent HR: Automated recruitment and workforce analytics\n• BI & Analytics: Predictive and real-time Business Intelligence\n• Process Automation: Intelligent RPA with advanced AI\n• Voice & Language: NLP optimized for Brazilian Portuguese\n\nWhich solution would you like to explore further?',
        default: 'I\'m experiencing some technical difficulties at the moment.\nBut I can connect you with our sales team.\n\nWould you like to schedule a conversation?'
      },
      es: {
        price: 'Nuestros Agentes de IA están personalizados para cada empresa.\nLas inversiones varían según sus necesidades específicas.\n\n¿Quieres agendar una demostración gratuita?',
        how: 'Nuestros Agentes funcionan como asistentes virtuales inteligentes.\nAutomatizan ventas, atención, RRHH y mucho más.\n\n¿Qué área te gustaría automatizar primero?',
        demo: `¡Perfecto! Puedes agendar una demostración directamente por nuestro Calendly.\nAccede: ${calendlyUrl}\n\n¿En qué más puedo ayudar?`,
        schedule: `¡Perfecto! Puedes agendar una reunión directamente por nuestro Calendly.\nAccede: ${calendlyUrl}\n\n¿En qué más puedo ayudar?`,
        timeline: 'Implementamos en solo 30 días.\nNuestro equipo se encarga de toda la integración.\n\n¿Te gustaría conocer nuestro proceso?',
        sales: 'Nuestra Automatización de Ventas transforma tu proceso comercial.\nSDRs virtuales que trabajan 24/7 con +300% de conversión.\n\n¿Quieres saber más sobre cómo funciona?',
        support: 'Nuestra Atención Inteligente revoluciona el servicio al cliente.\nChatbots multicanal con +95% de satisfacción.\n\n¿Te gustaría ver una demostración?',
        products: 'Ofrecemos seis categorías de soluciones de IA:\n\n• Automatización de Ventas: SDRs virtuales y cualificación de leads\n• Atención Inteligente: Chatbots multicanal y asistentes virtuales\n• RRHH Inteligente: Reclutamiento automatizado y analytics de fuerza laboral\n• BI & Analytics: Business Intelligence predictivo y en tiempo real\n• Automatización de Procesos: RPA inteligente con IA avanzada\n• Voz & Lenguaje: NLP optimizado para portugués brasileño\n\n¿Qué solución te gustaría explorar más a fondo?',
        default: 'Estoy experimentando algunas dificultades técnicas en este momento.\nPero puedo conectarte con nuestro equipo comercial.\n\n¿Te gustaría agendar una conversación?'
      }
    };
    
    const fallback = fallbacks[langCode] || fallbacks.pt;
    
    // Detectar intenção da mensagem (palavras-chave multilingues)
    if (msg.includes('preço') || msg.includes('custo') || msg.includes('valor') || 
        msg.includes('price') || msg.includes('cost') || msg.includes('pricing') ||
        msg.includes('precio') || msg.includes('costo')) {
      return fallback.price;
    }
    
    if (msg.includes('como funciona') || msg.includes('funciona') || 
        msg.includes('how does') || msg.includes('how it works') ||
        msg.includes('cómo funciona')) {
      return fallback.how;
    }
    
    // Detectar agendamento/demonstração (unificado para garantir que sempre retorne o link)
    if (msg.includes('demonstração') || msg.includes('demo') || msg.includes('teste') ||
        msg.includes('demonstration') || msg.includes('demo') ||
        msg.includes('demostración') || 
        msg.includes('agendar') || msg.includes('reunião') || msg.includes('marcar') || msg.includes('calendário') ||
        msg.includes('schedule') || msg.includes('meeting') || msg.includes('calendar') ||
        msg.includes('agendar') || msg.includes('reunión')) {
      return fallback.schedule; // Sempre retorna o fallback.schedule que tem o link do Calendly
    }
    
    if (msg.includes('implementação') || msg.includes('tempo') || msg.includes('prazo') ||
        msg.includes('implementation') || msg.includes('timeline') || msg.includes('time') ||
        msg.includes('implementación') || msg.includes('plazo')) {
      return fallback.timeline;
    }
    
    if (msg.includes('automação de vendas') || msg.includes('vendas') ||
        msg.includes('sales automation') || msg.includes('sales') ||
        msg.includes('automatización de ventas') || msg.includes('ventas')) {
      return fallback.sales;
    }
    
    if (msg.includes('atendimento') || msg.includes('chatbot') ||
        msg.includes('support') || msg.includes('customer service') ||
        msg.includes('atención') || msg.includes('soporte')) {
      return fallback.support;
    }
    
    if (msg.includes('produtos') || msg.includes('soluções') || msg.includes('quais') ||
        msg.includes('products') || msg.includes('solutions') || msg.includes('what') ||
        msg.includes('productos') || msg.includes('soluciones')) {
      return fallback.products;
    }
    
    return fallback.default;
  }

  // Método para resetar a conversa - atualiza com prompt no idioma atual
  resetConversation(): void {
    // Recarrega o prompt do sistema no idioma atual
    this.messages = this.initializeMessages();
  }
  
  // Método para atualizar o prompt quando o idioma mudar (chamado externamente)
  updateLanguage(): void {
    // Atualiza o system prompt se já tiver mensagens
    if (this.messages.length > 0 && this.messages[0].role === 'system') {
      this.messages[0].content = this.getCurrentSystemPrompt();
    } else {
      // Se não tiver mensagens, reinicializa
      this.messages = this.initializeMessages();
    }
  }

  // Método para obter o histórico de mensagens (sem o system prompt)
  getConversationHistory(): ChatMessage[] {
    return this.messages.slice(1); // Remove o system prompt
  }
}

// Instância singleton do serviço
export const openAIService = new OpenAIService();
