
import { WhatsAppMessage, Customer, AIAgent, Conversation, AgentAction, ConversationContext } from '@/types/whatsappAgents';

class WhatsAppAgentService {
  private agents: Map<string, AIAgent> = new Map();
  private conversations: Map<string, Conversation> = new Map();
  private customers: Map<string, Customer> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    // Agente de Triagem
    this.agents.set('triagem-001', {
      id: 'triagem-001',
      name: 'Sofia - Triagem Inteligente',
      type: 'triagem',
      status: 'online',
      capabilities: ['qualificacao_leads', 'roteamento', 'coleta_informacoes'],
      currentConversations: 0,
      maxConversations: 20,
      priority: 1,
      performance: {
        totalConversations: 0,
        successfulLeads: 0,
        averageResponseTime: 2000,
        customerSatisfaction: 4.8,
        conversionRate: 0.85
      }
    });

    // Agente Comercial
    this.agents.set('comercial-001', {
      id: 'comercial-001',
      name: 'Carlos - Especialista Comercial',
      type: 'comercial',
      status: 'online',
      capabilities: ['vendas', 'demonstracoes', 'propostas', 'negociacao'],
      currentConversations: 0,
      maxConversations: 8,
      priority: 2,
      performance: {
        totalConversations: 0,
        successfulLeads: 0,
        averageResponseTime: 3000,
        customerSatisfaction: 4.9,
        conversionRate: 0.72
      }
    });

    // Agente Técnico
    this.agents.set('tecnico-001', {
      id: 'tecnico-001',
      name: 'Ana - Especialista Técnica',
      type: 'tecnico',
      status: 'online',
      capabilities: ['implementacao', 'suporte_tecnico', 'integracao', 'treinamento'],
      currentConversations: 0,
      maxConversations: 6,
      priority: 3,
      performance: {
        totalConversations: 0,
        successfulLeads: 0,
        averageResponseTime: 4000,
        customerSatisfaction: 4.7,
        conversionRate: 0.68
      }
    });

    // Agente Supervisor
    this.agents.set('supervisor-001', {
      id: 'supervisor-001',
      name: 'Roberto - Supervisor Sênior',
      type: 'supervisor',
      status: 'online',
      capabilities: ['escalacao', 'casos_complexos', 'fechamento_vendas', 'relacionamento'],
      currentConversations: 0,
      maxConversations: 4,
      priority: 4,
      performance: {
        totalConversations: 0,
        successfulLeads: 0,
        averageResponseTime: 5000,
        customerSatisfaction: 4.95,
        conversionRate: 0.88
      }
    });
  }

  async processIncomingMessage(message: WhatsAppMessage): Promise<void> {
    const customer = await this.getOrCreateCustomer(message.from);
    const conversation = await this.getOrCreateConversation(customer.id, message);
    
    // Analisar intenção e contexto
    const context = await this.analyzeMessageContext(message, conversation);
    conversation.context = { ...conversation.context, ...context };

    // Determinar agente apropriado
    const targetAgent = await this.determineTargetAgent(conversation, customer);
    
    if (conversation.assignedAgentId !== targetAgent.id) {
      await this.transferConversation(conversation.id, targetAgent.id);
    }

    // Processar resposta do agente
    await this.generateAgentResponse(conversation, targetAgent, message);
  }

  private async getOrCreateCustomer(phone: string): Promise<Customer> {
    if (this.customers.has(phone)) {
      return this.customers.get(phone)!;
    }

    const newCustomer: Customer = {
      id: `customer-${Date.now()}`,
      phone,
      segment: 'pequena',
      leadScore: 0,
      lastInteraction: new Date(),
      status: 'novo'
    };

    this.customers.set(phone, newCustomer);
    return newCustomer;
  }

  private async getOrCreateConversation(customerId: string, message: WhatsAppMessage): Promise<Conversation> {
    const existingConv = Array.from(this.conversations.values())
      .find(conv => conv.customerId === customerId && conv.status === 'active');

    if (existingConv) {
      existingConv.messages.push(message);
      existingConv.lastActivity = new Date();
      return existingConv;
    }

    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      customerId,
      assignedAgentId: 'triagem-001', // Sempre inicia com triagem
      status: 'active',
      priority: 'medium',
      startTime: new Date(),
      lastActivity: new Date(),
      messages: [message],
      context: {
        customerIntent: '',
        productInterest: [],
        painPoints: [],
        nextSteps: []
      },
      tags: []
    };

    this.conversations.set(newConversation.id, newConversation);
    return newConversation;
  }

  private async analyzeMessageContext(message: WhatsAppMessage, conversation: Conversation): Promise<Partial<ConversationContext>> {
    const text = message.body.toLowerCase();
    const context: Partial<ConversationContext> = {};

    // Detectar intenção
    if (text.includes('preço') || text.includes('custo') || text.includes('valor')) {
      context.customerIntent = 'pricing_inquiry';
    } else if (text.includes('demonstração') || text.includes('demo') || text.includes('apresentação')) {
      context.customerIntent = 'demo_request';
    } else if (text.includes('implementação') || text.includes('como funciona')) {
      context.customerIntent = 'technical_inquiry';
    } else if (text.includes('contrato') || text.includes('proposta')) {
      context.customerIntent = 'proposal_request';
    }

    // Detectar produtos de interesse
    const products = [];
    if (text.includes('agente') || text.includes('ia') || text.includes('inteligência artificial')) {
      products.push('Agentes de IA');
    }
    if (text.includes('automação') || text.includes('processo')) {
      products.push('Automação de Processos');
    }
    if (text.includes('chatbot') || text.includes('atendimento')) {
      products.push('Chatbot Inteligente');
    }
    context.productInterest = products;

    return context;
  }

  private async determineTargetAgent(conversation: Conversation, customer: Customer): Promise<AIAgent> {
    const context = conversation.context;
    
    // Regras de roteamento baseadas em contexto e perfil do cliente
    if (context.customerIntent === 'technical_inquiry' || 
        context.productInterest?.includes('Automação de Processos')) {
      return this.getAvailableAgent('tecnico') || this.getAvailableAgent('comercial')!;
    }

    if (context.customerIntent === 'proposal_request' || 
        customer.leadScore > 80 || 
        customer.segment === 'enterprise') {
      return this.getAvailableAgent('supervisor') || this.getAvailableAgent('comercial')!;
    }

    if (context.customerIntent === 'pricing_inquiry' || 
        context.customerIntent === 'demo_request' ||
        customer.status === 'qualificado') {
      return this.getAvailableAgent('comercial') || this.getAvailableAgent('triagem')!;
    }

    // Padrão: triagem
    return this.getAvailableAgent('triagem')!;
  }

  private getAvailableAgent(type: AIAgent['type']): AIAgent | null {
    const agents = Array.from(this.agents.values())
      .filter(agent => 
        agent.type === type && 
        agent.status === 'online' && 
        agent.currentConversations < agent.maxConversations
      )
      .sort((a, b) => a.currentConversations - b.currentConversations);

    return agents[0] || null;
  }

  private async transferConversation(conversationId: string, newAgentId: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;

    const oldAgent = this.agents.get(conversation.assignedAgentId);
    const newAgent = this.agents.get(newAgentId);

    if (oldAgent) oldAgent.currentConversations--;
    if (newAgent) newAgent.currentConversations++;

    conversation.assignedAgentId = newAgentId;

    // Enviar mensagem de transição se necessário
    if (oldAgent && newAgent && oldAgent.type !== newAgent.type) {
      await this.sendTransferMessage(conversation, oldAgent, newAgent);
    }
  }

  private async sendTransferMessage(conversation: Conversation, oldAgent: AIAgent, newAgent: AIAgent): Promise<void> {
    const customer = this.customers.get(conversation.customerId);
    if (!customer) return;

    const transferMessages = {
      'triagem_to_comercial': `Olá! Sou o ${newAgent.name}, especialista comercial da onsmart. Vou dar continuidade ao seu atendimento e ajudar você com todas as informações sobre nossos Agentes de IA. 😊`,
      'comercial_to_tecnico': `Oi! Aqui é a ${newAgent.name}, especialista técnica. Vou esclarecer todos os detalhes técnicos sobre a implementação dos Agentes de IA na sua empresa. `,
      'any_to_supervisor': `Olá! Sou o ${newAgent.name}, supervisor sênior da onsmart. Assumo pessoalmente seu atendimento para garantir a melhor experiência. 👨‍💼`
    };

    const messageKey = `${oldAgent.type}_to_${newAgent.type}` as keyof typeof transferMessages;
    const message = transferMessages[messageKey] || transferMessages.any_to_supervisor;

    await this.sendWhatsAppMessage(customer.phone, message);
  }

  private async generateAgentResponse(conversation: Conversation, agent: AIAgent, incomingMessage: WhatsAppMessage): Promise<void> {
    const customer = this.customers.get(conversation.customerId);
    if (!customer) return;

    let response = '';

    switch (agent.type) {
      case 'triagem':
        response = await this.generateTriagemResponse(conversation, incomingMessage);
        break;
      case 'comercial':
        response = await this.generateComercialResponse(conversation, incomingMessage);
        break;
      case 'tecnico':
        response = await this.generateTecnicoResponse(conversation, incomingMessage);
        break;
      case 'supervisor':
        response = await this.generateSupervisorResponse(conversation, incomingMessage);
        break;
    }

    if (response) {
      await this.sendWhatsAppMessage(customer.phone, response);
    }
  }

  private async generateTriagemResponse(conversation: Conversation, message: WhatsAppMessage): Promise<string> {
    const context = conversation.context;
    
    if (message.body.toLowerCase().includes('olá') || message.body.toLowerCase().includes('oi')) {
      return `Olá! 👋 Sou a Sofia da onsmart.AI! 

Que bom ter você aqui! Somos especialistas em Agentes de IA que podem transformar sua empresa e aumentar a produtividade em até 420%.

Para te ajudar melhor, me conta:
🏢 Qual o nome da sua empresa?
👤 Qual seu cargo/função?
🎯 O que te trouxe até nós hoje?`;
    }

    if (context.customerIntent === 'demo_request') {
      return `Perfeito! Uma demonstração é a melhor forma de ver como nossos Agentes de IA podem revolucionar sua empresa! 

Vou te conectar com nosso especialista comercial que pode:
✅ Fazer uma demo personalizada
✅ Mostrar cases do seu setor
✅ Calcular o ROI específico para sua empresa

Um momento, por favor...`;
    }

    return `Entendi! Vou te conectar com nosso especialista que pode te ajudar da melhor forma. 

Enquanto isso, saiba que já implementamos Agentes de IA em 350+ empresas com resultados incríveis:
📈 420% de ROI médio
 30 dias para implementação completa
🎯 98% de taxa de sucesso

Um momento...`;
  }

  private async generateComercialResponse(conversation: Conversation, message: WhatsAppMessage): Promise<string> {
    const text = message.body.toLowerCase();

    if (text.includes('preço') || text.includes('valor') || text.includes('custo')) {
      return `Excelente pergunta! 💰

Nossos Agentes de IA têm um ROI médio de 420% em 6 meses, então o investimento se paga rapidamente.

O valor varia conforme:
🔹 Tamanho da empresa
🔹 Processos a serem automatizados  
🔹 Quantidade de agentes
🔹 Nível de customização

Que tal eu fazer uma proposta personalizada? Preciso de algumas informações:

1️⃣ Quantos funcionários sua empresa tem?
2️⃣ Qual o principal processo que gostaria de automatizar?
3️⃣ Qual seu orçamento aproximado para inovação/tecnologia?`;
    }

    if (text.includes('demo') || text.includes('demonstração')) {
      return `Vamos agendar sua demonstração personalizada! 🎯

Posso te mostrar:
✅ Agentes de IA funcionando em tempo real
✅ Cases de sucesso do seu setor
✅ Simulação dos resultados na sua empresa
✅ Cronograma de implementação

Qual o melhor dia e horário para você:
📅 Hoje à tarde (14h-18h)?
📅 Amanhã de manhã (9h-12h)?
📅 Outro horário de sua preferência?

A demo dura cerca de 30 minutos e é 100% gratuita!`;
    }

    return `Perfeito! Como especialista comercial, posso te ajudar com:

🎯 Demonstrações personalizadas
💰 Propostas sob medida
📊 Análise de ROI específica
 Plano de implementação

O que você gostaria de saber primeiro sobre nossos Agentes de IA?`;
  }

  private async generateTecnicoResponse(conversation: Conversation, message: WhatsAppMessage): Promise<string> {
    const text = message.body.toLowerCase();

    if (text.includes('como funciona') || text.includes('implementação')) {
      return `Ótima pergunta! 🔧 Nossa implementação segue a metodologia LÍDER:

**L**evantamento (3 dias)
- Análise dos processos atuais
- Identificação de oportunidades
- Mapeamento de integrações

**Í**mplementação (15 dias)
- Desenvolvimento dos agentes
- Testes e ajustes
- Treinamento da equipe

**D**eployment (3 dias)
- Go-live monitorado
- Suporte dedicado
- Ajustes finais

🔗 **Integrações**: CRM, ERP, WhatsApp, Email, Sistemas internos
 **Tempo total**: 30 dias úteis
🛡️ **Garantia**: 90 dias de suporte total

Tem algum sistema específico que precisa integrar?`;
    }

    return `Como especialista técnica, posso esclarecer:

🔧 Aspectos técnicos da implementação
🔗 Integrações com seus sistemas
⚙️ Configurações personalizadas
📚 Treinamento da equipe
🛠️ Suporte e manutenção

Qual aspecto técnico te interessa mais?`;
  }

  private async generateSupervisorResponse(conversation: Conversation, message: WhatsAppMessage): Promise<string> {
    return `Olá! Assumo pessoalmente seu atendimento. 👨‍💼

Como supervisor sênior, tenho autoridade para:
💎 Condições especiais de investimento
🎯 Implementação prioritária
🤝 Garantias estendidas
 Linha direta comigo

Posso agendar uma reunião estratégica ainda hoje para:
✅ Apresentação estratégica personalizada
✅ Proposta com condições especiais
✅ Cronograma VIP de implementação

Qual o melhor horário para uma conversa de 15 minutos?`;
  }

  private async sendWhatsAppMessage(to: string, message: string): Promise<void> {
    // Simulação do envio - aqui você integraria com a API real do WhatsApp
    console.log(`Enviando para ${to}: ${message}`);
    
    // Integração real seria algo como:
    // await fetch('/api/whatsapp/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ to, message })
    // });
  }

  // Métodos públicos para o dashboard
  getAgents(): AIAgent[] {
    return Array.from(this.agents.values());
  }

  getActiveConversations(): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(conv => conv.status === 'active');
  }

  getConversationsByAgent(agentId: string): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(conv => conv.assignedAgentId === agentId);
  }

  async executeAgentAction(action: AgentAction): Promise<void> {
    switch (action.type) {
      case 'transfer':
        await this.transferConversation(action.conversationId, action.data?.targetAgentId);
        break;
      case 'escalate':
        const supervisorAgent = this.getAvailableAgent('supervisor');
        if (supervisorAgent) {
          await this.transferConversation(action.conversationId, supervisorAgent.id);
        }
        break;
      // Implementar outras ações conforme necessário
    }
  }
}

export const whatsappAgentService = new WhatsAppAgentService();
