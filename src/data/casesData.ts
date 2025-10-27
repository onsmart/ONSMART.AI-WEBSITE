export interface CaseData {
  id: string;
  name: string;
  slug: string;
  industry: string;
  company: string;
  icon: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  challenge: string;
  solution: string;
  implementation: {
    phase: string;
    description: string;
    duration: string;
  }[];
  results: {
    metric: string;
    improvement: string;
    description: string;
  }[];
  technologies: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  };
  keyFeatures: {
    title: string;
    description: string;
    impact: string;
  }[];
  ctaTitle: string;
  ctaSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const casesData: CaseData[] = [
  {
    id: "clinica-bem-estar",
    name: "Transformação Digital Clínica Bem Estar",
    slug: "clinica-bem-estar",
    industry: "Saúde",
    company: "Clínica Bem Estar",
    icon: "🏥",
    description: "Como uma clínica de 5 médicos automatizou 70% dos processos administrativos",
    heroTitle: "Clínica Bem Estar: 70% Menos Tempo Administrativo",
    heroSubtitle: "Descubra como a Clínica Bem Estar revolucionou o atendimento e aumentou a receita em 45% com IA",
    heroImage: "/images/case-clinica-bem-estar.jpg",
    challenge: "A Clínica Bem Estar, com 5 médicos especializados em São Paulo, enfrentava um grande desafio: 40% do tempo da equipe era consumido por tarefas administrativas como agendamentos manuais, controle de prontuários e comunicação com pacientes. Isso resultava em menor tempo disponível para consultas, filas de espera longas e pacientes insatisfeitos. Além disso, a alta taxa de faltas não justificadas (35%) impactava diretamente a receita da clínica.",
    solution: "Implementamos uma solução completa de IA em 30 dias, incluindo: Agente de Agendamento Inteligente via WhatsApp que funciona 24/7, Assistente de Prontuário Digital que organiza e analisa históricos médicos automaticamente, e Sistema de Comunicação Automatizada para lembretes, receitas e cuidados pós-consulta. A solução foi integrada aos sistemas existentes da clínica sem interromper as operações.",
    implementation: [
      {
        phase: "Diagnóstico e Planejamento",
        description: "Análise completa dos processos atuais e identificação de gargalos",
        duration: "5 dias"
      },
      {
        phase: "Desenvolvimento e Configuração",
        description: "Criação dos agentes de IA personalizados para a clínica",
        duration: "10 dias"
      },
      {
        phase: "Integração e Testes",
        description: "Integração com sistemas existentes e testes com casos reais",
        duration: "3 dias"
      },
      {
        phase: "Treinamento e Go-live",
        description: "Capacitação da equipe e início das operações com IA",
        duration: "3 dias"
      }
    ],
    results: [
      {
        metric: "Tempo administrativo",
        improvement: "-70%",
        description: "Redução drástica no tempo gasto com tarefas burocráticas"
      },
      {
        metric: "Satisfação dos pacientes",
        improvement: "+85%",
        description: "Melhoria significativa na experiência do paciente"
      },
      {
        metric: "Receita mensal",
        improvement: "+45%",
        description: "Aumento da receita com mais consultas e menos faltas"
      },
      {
        metric: "Faltas em consultas",
        improvement: "-60%",
        description: "Redução nas faltas através de lembretes automáticos"
      },
      {
        metric: "Tempo de agendamento",
        improvement: "-80%",
        description: "Agendamentos instantâneos via WhatsApp 24/7"
      }
    ],
    technologies: [
      "WhatsApp Business API",
      "Processamento de Linguagem Natural",
      "Integração com prontuário eletrônico",
      "Automação de fluxos de trabalho",
      "Dashboard de analytics"
    ],
    testimonial: {
      quote: "A implementação da IA foi transformadora para nossa clínica. Conseguimos focar no que realmente importa: cuidar dos nossos pacientes. O retorno do investimento veio em menos de 2 meses.",
      author: "Dr. Ricardo Santos",
      position: "Diretor Médico",
      company: "Clínica Bem Estar",
      avatar: "/images/testimonial-dr-ricardo.jpg"
    },
    keyFeatures: [
      {
        title: "Agendamento Inteligente 24/7",
        description: "Sistema automatizado que gerencia consultas via WhatsApp",
        impact: "80% menos tempo gasto com agendamentos"
      },
      {
        title: "Prontuário Digital Inteligente",
        description: "IA que organiza e analisa históricos médicos automaticamente",
        impact: "Acesso instantâneo ao histórico completo do paciente"
      },
      {
        title: "Comunicação Automatizada",
        description: "Lembretes e orientações enviados automaticamente",
        impact: "60% menos faltas e maior adesão ao tratamento"
      }
    ],
    ctaTitle: "Transforme Sua Clínica Como a Bem Estar",
    ctaSubtitle: "Agende uma demonstração e veja como podemos revolucionar sua clínica em 30 dias",
    seoTitle: "Case Clínica Bem Estar | Automação Médica com IA | onsmartAI",
    seoDescription: "Descubra como a Clínica Bem Estar reduziu tempo administrativo em 70% e aumentou receita em 45% com IA. Case completo de transformação digital médica.",
    keywords: ["case clínica IA", "automação médica", "transformação digital saúde", "agendamento automático", "prontuário digital"]
  },
  {
    id: "contabil-excelencia",
    name: "Automação Contábil Excelência",
    slug: "contabil-excelencia",
    industry: "Contabilidade",
    company: "Contábil Excelência",
    icon: "📊",
    description: "Escritório contábil aumentou capacidade em 120% automatizando processamento fiscal",
    heroTitle: "Contábil Excelência: +120% de Capacidade de Atendimento",
    heroSubtitle: "Veja como este escritório contábil automatizou 85% do processamento de documentos e dobrou sua margem de lucro",
    heroImage: "/images/case-contabil-excelencia.jpg",
    challenge: "A Contábil Excelência, escritório com 200 clientes em Belo Horizonte, enfrentava sobrecarga operacional severa. 60% do tempo da equipe era consumido por tarefas repetitivas como classificação de documentos fiscais, cálculos manuais e atendimento a dúvidas básicas dos clientes. Isso limitava a capacidade de crescimento e impactava a qualidade do serviço, com prazos apertados e risco constante de erros humanos.",
    solution: "Desenvolvemos uma solução completa de IA contábil incluindo: Agente de Processamento Fiscal que classifica e processa documentos automaticamente com 99.8% de precisão, Assistente de Atendimento ao Cliente especializado em dúvidas contábeis que funciona 24/7, e Sistema de Compliance Automatizado que monitora mudanças na legislação e mantém processos sempre atualizados. A implementação foi feita gradualmente para não impactar as operações existentes.",
    implementation: [
      {
        phase: "Auditoria de Processos",
        description: "Mapeamento completo dos fluxos contábeis e identificação de automações",
        duration: "7 dias"
      },
      {
        phase: "Desenvolvimento dos Agentes",
        description: "Criação de IA especializada em processamento fiscal e atendimento",
        duration: "14 dias"
      },
      {
        phase: "Integração com ERPs",
        description: "Conexão com sistemas contábeis existentes do escritório",
        duration: "5 dias"
      },
      {
        phase: "Treinamento e Rollout",
        description: "Capacitação da equipe e implementação gradual por departamento",
        duration: "7 dias"
      }
    ],
    results: [
      {
        metric: "Processamento de documentos",
        improvement: "-85%",
        description: "Redução drástica no tempo de processamento manual"
      },
      {
        metric: "Capacidade de atendimento",
        improvement: "+120%",
        description: "Dobrou a quantidade de clientes que consegue atender"
      },
      {
        metric: "Margem de lucro",
        improvement: "+65%",
        description: "Aumento significativo da rentabilidade do escritório"
      },
      {
        metric: "Satisfação dos clientes",
        improvement: "+90%",
        description: "Clientes mais satisfeitos com agilidade e precisão"
      },
      {
        metric: "Erros de classificação",
        improvement: "-95%",
        description: "Praticamente eliminou erros humanos no processamento"
      }
    ],
    technologies: [
      "OCR avançado para documentos fiscais",
      "Machine Learning para classificação",
      "Integração com ERPs contábeis",
      "Chatbot especializado em contabilidade",
      "Sistema de monitoramento de compliance"
    ],
    testimonial: {
      quote: "A IA transformou completamente nosso escritório. Conseguimos atender mais que o dobro de clientes com a mesma equipe, e com muito mais qualidade. Foi o melhor investimento que já fizemos.",
      author: "Carlos Mendes",
      position: "Sócio-Diretor",
      company: "Contábil Excelência",
      avatar: "/images/testimonial-carlos-mendes.jpg"
    },
    keyFeatures: [
      {
        title: "Processamento Fiscal Automático",
        description: "IA que classifica e processa documentos fiscais com alta precisão",
        impact: "99.8% de precisão e 85% menos tempo de processamento"
      },
      {
        title: "Atendimento 24/7 Especializado",
        description: "Chatbot que resolve 80% das dúvidas contábeis automaticamente",
        impact: "Clientes atendidos a qualquer hora com respostas precisas"
      },
      {
        title: "Compliance Automatizado",
        description: "Monitoramento contínuo da legislação e adequação automática",
        impact: "Zero multas por descumprimento de prazos"
      }
    ],
    ctaTitle: "Multiplique a Capacidade do Seu Escritório",
    ctaSubtitle: "Descubra como podemos automatizar seus processos contábeis em 30 dias",
    seoTitle: "Case Contábil Excelência | Automação Contábil IA | onsmartAI",
    seoDescription: "Veja como a Contábil Excelência aumentou capacidade em 120% e margem de lucro em 65% com automação de IA. Case completo de transformação contábil.",
    keywords: ["case escritório contábil", "automação contábil", "IA contabilidade", "processamento fiscal automático", "transformação digital contábil"]
  },
  {
    id: "imobiliaria-premium",
    name: "Vendas Inteligentes Imobiliária Premium",
    slug: "imobiliaria-premium",
    industry: "Imobiliário",
    company: "Imobiliária Premium",
    icon: "🏠",
    description: "Imobiliária aumentou vendas em 250% com qualificação automática de leads",
    heroTitle: "Imobiliária Premium: +250% em Vendas com IA",
    heroSubtitle: "Descubra como esta imobiliária transformou 8 corretores em uma máquina de vendas com IA",
    heroImage: "/images/case-imobiliaria-premium.jpg",
    challenge: "A Imobiliária Premium no Rio de Janeiro enfrentava um gargalo crítico: sua equipe de 8 corretores conseguia acompanhar adequadamente apenas 50 leads por mês. A qualificação manual era demorada, muitos leads frios eram perdidos por falta de follow-up, e o agendamento de visitas era caótico, com conflitos constantes de horários. Isso resultava em baixa conversão e oportunidades perdidas em um mercado altamente competitivo.",
    solution: "Implementamos uma solução completa de IA imobiliária: Agente de Qualificação de Leads que identifica e qualifica prospects automaticamente via WhatsApp e redes sociais, Assistente de Agendamento que coordena visitas evitando conflitos e otimizando rotas, e CRM Imobiliário Inteligente com acompanhamento automatizado do funil de vendas e insights preditivos. A solução integrou-se perfeitamente aos processos existentes da imobiliária.",
    implementation: [
      {
        phase: "Análise do Funil de Vendas",
        description: "Mapeamento completo do processo de vendas e identificação de gargalos",
        duration: "5 dias"
      },
      {
        phase: "Desenvolvimento dos Agentes IA",
        description: "Criação de agentes especializados em qualificação e agendamento",
        duration: "12 dias"
      },
      {
        phase: "Integração com CRM",
        description: "Conexão com sistema de gestão de leads existente",
        duration: "4 dias"
      },
      {
        phase: "Treinamento da Equipe",
        description: "Capacitação dos corretores nas novas ferramentas de IA",
        duration: "4 dias"
      }
    ],
    results: [
      {
        metric: "Leads acompanhados",
        improvement: "+400%",
        description: "De 50 para 250 leads acompanhados simultaneamente"
      },
      {
        metric: "Taxa de conversão",
        improvement: "+180%",
        description: "Melhoria dramática na conversão de leads em vendas"
      },
      {
        metric: "Vendas mensais",
        improvement: "+250%",
        description: "Crescimento explosivo no volume de vendas"
      },
      {
        metric: "Tempo por venda",
        improvement: "-50%",
        description: "Redução significativa no ciclo de vendas"
      },
      {
        metric: "Satisfação dos clientes",
        improvement: "+95%",
        description: "Clientes mais satisfeitos com o atendimento personalizado"
      }
    ],
    technologies: [
      "WhatsApp Business API",
      "Integração com redes sociais",
      "CRM com IA preditiva",
      "Otimização de rotas",
      "Analytics avançado de vendas"
    ],
    testimonial: {
      quote: "A IA revolucionou nossa imobiliária. Conseguimos acompanhar 5x mais leads com a mesma equipe e nossas vendas triplicaram. O ROI foi incrível, se pagou em apenas 2 meses.",
      author: "Marina Silva",
      position: "Diretora Comercial",
      company: "Imobiliária Premium",
      avatar: "/images/testimonial-marina-silva.jpg"
    },
    keyFeatures: [
      {
        title: "Qualificação Automática 24/7",
        description: "IA que identifica e qualifica leads em tempo real",
        impact: "400% mais leads acompanhados simultaneamente"
      },
      {
        title: "Agendamento Inteligente",
        description: "Sistema que otimiza visitas e evita conflitos de horários",
        impact: "Zero conflitos de agenda e rotas otimizadas"
      },
      {
        title: "CRM Preditivo",
        description: "Insights sobre probabilidade de fechamento de cada lead",
        impact: "85% de precisão na previsão de vendas"
      }
    ],
    ctaTitle: "Multiplique Suas Vendas Imobiliárias",
    ctaSubtitle: "Veja como podemos transformar sua equipe de vendas em 30 dias",
    seoTitle: "Case Imobiliária Premium | IA Vendas Imóveis | onsmartAI",
    seoDescription: "Descubra como a Imobiliária Premium aumentou vendas em 250% e leads acompanhados em 400% com IA. Case completo de transformação imobiliária.",
    keywords: ["case imobiliária IA", "vendas imóveis IA", "qualificação leads automática", "CRM imobiliário", "automação vendas"]
  },
  {
    id: "loja-fashion-style",
    name: "Personalização Inteligente Fashion Style",
    slug: "loja-fashion-style",
    industry: "Varejo",
    company: "Loja Fashion Style",
    icon: "🛍️",
    description: "Rede de lojas aumentou ticket médio em 160% com personalização por IA",
    heroTitle: "Fashion Style: +160% no Ticket Médio com IA",
    heroSubtitle: "Veja como esta rede de moda transformou 3 lojas em referência de vendas com personalização inteligente",
    heroImage: "/images/case-fashion-style.jpg",
    challenge: "A Fashion Style, rede com 3 unidades em São Paulo, enfrentava desafios típicos do varejo: baixo ticket médio, muito produto parado no estoque, atendimento inconsistente entre canais e dificuldade para personalizar ofertas. Os vendedores não conseguiam acompanhar as preferências de cada cliente, resultando em oportunidades perdidas de cross-sell e up-sell. O giro de estoque era baixo e a margem de lucro estava sendo pressionada.",
    solution: "Desenvolvemos uma solução completa de IA para varejo: Assistente de Vendas Inteligente que personaliza ofertas baseado no histórico e preferências do cliente, Chatbot Multicanal para atendimento unificado via WhatsApp, site e redes sociais, e Sistema de Gestão Inteligente que controla estoque, preços e promoções automaticamente. A solução criou uma experiência omnichannel verdadeiramente personalizada.",
    implementation: [
      {
        phase: "Auditoria de Vendas",
        description: "Análise completa dos processos de venda e comportamento dos clientes",
        duration: "6 dias"
      },
      {
        phase: "Desenvolvimento da IA",
        description: "Criação de sistema de recomendação e chatbot multicanal",
        duration: "15 dias"
      },
      {
        phase: "Integração Omnichannel",
        description: "Conexão entre loja física, e-commerce e redes sociais",
        duration: "5 dias"
      },
      {
        phase: "Treinamento e Go-live",
        description: "Capacitação da equipe de vendas nas 3 unidades",
        duration: "4 dias"
      }
    ],
    results: [
      {
        metric: "Ticket médio",
        improvement: "+160%",
        description: "Aumento significativo no valor médio por venda"
      },
      {
        metric: "Giro de estoque",
        improvement: "+200%",
        description: "Estoque girando muito mais rapidamente"
      },
      {
        metric: "Conversão de leads",
        improvement: "+140%",
        description: "Mais visitantes se tornando compradores"
      },
      {
        metric: "Satisfação do cliente",
        improvement: "+95%",
        description: "Clientes encantados com atendimento personalizado"
      },
      {
        metric: "Cross-sell",
        improvement: "+300%",
        description: "Aumento dramático em vendas de produtos complementares"
      }
    ],
    technologies: [
      "Sistema de recomendação por IA",
      "Chatbot omnichannel",
      "Análise de comportamento do cliente",
      "Otimização dinâmica de preços",
      "Integração loja física + online"
    ],
    testimonial: {
      quote: "A IA transformou completamente nossa operação. Nossos clientes ficam impressionados com as recomendações personalizadas, e nosso ticket médio mais que dobrou. Foi uma virada de jogo total.",
      author: "Ana Paula Rodrigues",
      position: "Proprietária",
      company: "Loja Fashion Style",
      avatar: "/images/testimonial-ana-paula.jpg"
    },
    keyFeatures: [
      {
        title: "Recomendações Personalizadas",
        description: "IA que sugere produtos baseado no perfil de cada cliente",
        impact: "160% de aumento no ticket médio"
      },
      {
        title: "Atendimento Omnichannel",
        description: "Experiência consistente em todos os pontos de contato",
        impact: "85% das dúvidas resolvidas automaticamente"
      },
      {
        title: "Gestão Inteligente de Estoque",
        description: "Otimização automática de preços e promoções",
        impact: "40% menos produtos parados no estoque"
      }
    ],
    ctaTitle: "Revolucione Seu Varejo com IA",
    ctaSubtitle: "Descubra como podemos personalizar a experiência dos seus clientes",
    seoTitle: "Case Fashion Style | IA Varejo Personalização | onsmartAI",
    seoDescription: "Veja como a Fashion Style aumentou ticket médio em 160% e giro de estoque em 200% com personalização por IA. Case completo de transformação no varejo.",
    keywords: ["case varejo IA", "personalização cliente", "omnichannel IA", "recomendação produtos", "automação vendas varejo"]
  },
  {
    id: "banco-regional-norte",
    name: "Transformação Digital Banco Regional",
    slug: "banco-regional-norte",
    industry: "Financeiro",
    company: "Banco Regional do Norte",
    icon: "🏦",
    description: "Banco reduziu inadimplência em 55% e aprovou crédito em 5 minutos com IA",
    heroTitle: "Banco Regional: -55% Inadimplência com IA",
    heroSubtitle: "Descubra como este banco transformou análise de crédito e reduziu fraudes em 80%",
    heroImage: "/images/case-banco-regional.jpg",
    challenge: "O Banco Regional do Norte, com 50 agências, enfrentava sérios desafios operacionais: análise de crédito demorada (até 15 dias), alta taxa de inadimplência (12%), detecção de fraudes reativa e ineficiente, processos de onboarding burocráticos que afastavam clientes, e custos elevados de compliance. Isso impactava a competitividade e a rentabilidade da instituição em um mercado cada vez mais digital.",
    solution: "Implementamos uma solução bancária completa com IA: Sistema de Análise de Crédito que avalia risco e aprova em tempo real usando 200+ variáveis, Assistente Bancário Virtual que resolve 90% das demandas dos clientes, e Sistema Antifraude Inteligente que detecta e previne fraudes em tempo real com 99.5% de precisão. A solução foi integrada aos core banking systems existentes.",
    implementation: [
      {
        phase: "Auditoria de Processos Bancários",
        description: "Mapeamento completo dos fluxos de crédito, atendimento e segurança",
        duration: "10 dias"
      },
      {
        phase: "Desenvolvimento IA Bancária",
        description: "Criação de modelos específicos para análise de crédito e detecção de fraudes",
        duration: "20 dias"
      },
      {
        phase: "Integração Core Banking",
        description: "Conexão com sistemas centrais do banco e teste de segurança",
        duration: "8 dias"
      },
      {
        phase: "Rollout Gradual",
        description: "Implementação faseada em 10 agências piloto, depois expansão",
        duration: "12 dias"
      }
    ],
    results: [
      {
        metric: "Tempo de análise de crédito",
        improvement: "-90%",
        description: "De 15 dias para menos de 5 minutos"
      },
      {
        metric: "Inadimplência",
        improvement: "-55%",
        description: "Redução significativa na taxa de calote"
      },
      {
        metric: "Fraudes detectadas",
        improvement: "+300%",
        description: "Detecção proativa muito mais eficiente"
      },
      {
        metric: "Satisfação dos clientes",
        improvement: "+120%",
        description: "Clientes mais satisfeitos com agilidade"
      },
      {
        metric: "Custos operacionais",
        improvement: "-40%",
        description: "Redução significativa nos custos de operação"
      }
    ],
    technologies: [
      "Machine Learning para análise de crédito",
      "IA para detecção de fraudes em tempo real",
      "Processamento de linguagem natural",
      "Integração com Bureau de Crédito",
      "Sistema de compliance automatizado"
    ],
    testimonial: {
      quote: "A IA revolucionou nossa operação bancária. Conseguimos aprovar crédito em minutos com muito mais segurança, e nossos clientes ficaram encantados com a agilidade. O ROI foi excepcional.",
      author: "Roberto Lima",
      position: "Diretor de Tecnologia",
      company: "Banco Regional do Norte",
      avatar: "/images/testimonial-roberto-lima.jpg"
    },
    keyFeatures: [
      {
        title: "Análise de Crédito Instantânea",
        description: "IA que avalia risco usando 200+ variáveis em tempo real",
        impact: "Aprovação em menos de 5 minutos com 55% menos inadimplência"
      },
      {
        title: "Detecção de Fraudes Avançada",
        description: "Sistema que identifica padrões suspeitos automaticamente",
        impact: "99.5% de precisão e 80% menos perdas financeiras"
      },
      {
        title: "Atendimento Bancário 24/7",
        description: "Assistente virtual que resolve 90% das demandas dos clientes",
        impact: "120% mais satisfação e 70% menos fila de atendimento"
      }
    ],
    ctaTitle: "Transforme Seu Banco com IA",
    ctaSubtitle: "Veja como podemos revolucionar sua operação bancária em 60 dias",
    seoTitle: "Case Banco Regional | IA Bancária Análise Crédito | onsmartAI",
    seoDescription: "Descubra como o Banco Regional reduziu inadimplência em 55% e aprova crédito em 5 minutos com IA. Case completo de transformação digital bancária.",
    keywords: ["case banco IA", "análise crédito automática", "detecção fraudes IA", "transformação digital bancária", "IA financeira"]
  }
];

export const getCaseBySlug = (slug: string): CaseData | undefined => {
  return casesData.find(caseItem => caseItem.slug === slug);
};

export const getCaseById = (id: string): CaseData | undefined => {
  return casesData.find(caseItem => caseItem.id === id);
};

export const getCasesByIndustry = (industry: string): CaseData[] => {
  return casesData.filter(caseItem => caseItem.industry === industry);
};

