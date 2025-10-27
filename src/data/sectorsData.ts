export interface SectorData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  challenges: string[];
  solutions: {
    title: string;
    description: string;
    benefits: string[];
  }[];
  caseStudy: {
    company: string;
    challenge: string;
    solution: string;
    results: {
      metric: string;
      improvement: string;
    }[];
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  ctaTitle: string;
  ctaSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const sectorsData: SectorData[] = [
  {
    id: "advocacia",
    name: "Advocacia",
    slug: "advocacia",
    icon: "⚖️",
    description: "Automatize processos jurídicos e otimize atendimento com IA especializada em direito",
    heroTitle: "Modernize Seu Escritório de Advocacia com IA",
    heroSubtitle: "Automatize pesquisas jurídicas, geração de petições e atendimento ao cliente com nossa solução especializada para advogados",
    heroImage: "/images/advocacia-hero.jpg",
    challenges: [
      "Pesquisa jurídica manual demorada e custosa",
      "Geração de petições repetitivas consome muito tempo",
      "Acompanhamento de prazos processuais complexo",
      "Atendimento ao cliente sobrecarregado com consultas básicas",
      "Organização de documentos e processos ineficiente"
    ],
    solutions: [
      {
        title: "Assistente de Pesquisa Jurídica",
        description: "IA que realiza pesquisas automatizadas em jurisprudências e doutrinas",
        benefits: [
          "Redução de 80% no tempo de pesquisa",
          "Acesso a base completa de jurisprudências",
          "Sugestões automáticas de argumentos jurídicos"
        ]
      },
      {
        title: "Gerador de Petições Inteligente",
        description: "Sistema que cria petições personalizadas baseado em modelos e contexto",
        benefits: [
          "Criação de petições em minutos",
          "Padronização e qualidade garantida",
          "Biblioteca de modelos sempre atualizada"
        ]
      },
      {
        title: "Controle de Prazos Automatizado",
        description: "Monitoramento inteligente de todos os prazos processuais com alertas",
        benefits: [
          "Zero perda de prazos processuais",
          "Alertas automáticos personalizados",
          "Sincronização com tribunais eletrônicos"
        ]
      }
    ],
    caseStudy: {
      company: "Escritório Advocacia & Direito - Brasília",
      challenge: "Escritório com 12 advogados perdia 50% do tempo com tarefas burocráticas",
      solution: "Implementação completa da IA jurídica em todos os departamentos",
      results: [
        { metric: "Tempo em pesquisas", improvement: "-75%" },
        { metric: "Produtividade geral", improvement: "+180%" },
        { metric: "Casos atendidos", improvement: "+220%" },
        { metric: "Satisfação dos clientes", improvement: "+85%" }
      ]
    },
    features: [
      {
        title: "Integração com Tribunais",
        description: "Conexão direta com sistemas dos principais tribunais",
        icon: "🏛️"
      },
      {
        title: "Análise de Viabilidade",
        description: "IA que analisa chances de sucesso de processos",
        icon: "🎯"
      },
      {
        title: "Segurança Jurídica",
        description: "Proteção total de dados conforme LGPD e sigilo profissional",
        icon: "🛡️"
      }
    ],
    ctaTitle: "Modernize Sua Advocacia com IA",
    ctaSubtitle: "Mais de 45 escritórios já aumentaram sua produtividade em 180% com nossa IA jurídica",
    seoTitle: "IA para Advocacia | Automação Jurídica | onsmartAI",
    seoDescription: "Automatize pesquisas, petições e controle de prazos. Aumente produtividade em 180% e atenda 220% mais casos. Solução completa para advogados.",
    keywords: ["IA advocacia", "automação jurídica", "pesquisa jurídica IA", "petições automáticas", "controle prazos"]
  },
  {
    id: "bancos",
    name: "Bancos",
    slug: "bancos",
    icon: "🏦",
    description: "Revolucione atendimento bancário e análise de crédito com IA avançada",
    heroTitle: "Transforme Seu Banco com IA de Nova Geração",
    heroSubtitle: "Automatize análise de crédito, atendimento ao cliente e detecção de fraudes com nossa solução bancária avançada",
    heroImage: "/images/bancos-hero.jpg",
    challenges: [
      "Análise de crédito manual lenta e sujeita a erros",
      "Atendimento ao cliente sobrecarregado com demandas básicas",
      "Detecção de fraudes reativa e ineficiente",
      "Processos de onboarding demorados e burocráticos",
      "Compliance complexo e custoso de manter"
    ],
    solutions: [
      {
        title: "IA de Análise de Crédito",
        description: "Sistema inteligente que avalia risco e aprova crédito em tempo real",
        benefits: [
          "Aprovação de crédito em menos de 5 minutos",
          "Redução de 60% na inadimplência",
          "Análise de 200+ variáveis automaticamente"
        ]
      },
      {
        title: "Assistente Bancário Virtual",
        description: "Chatbot especializado que resolve 90% das demandas bancárias",
        benefits: [
          "Atendimento 24/7 para todos os clientes",
          "Resolução instantânea de consultas básicas",
          "Redução de 70% na fila de atendimento humano"
        ]
      },
      {
        title: "Sistema Antifraude Inteligente",
        description: "IA que detecta e previne fraudes em tempo real",
        benefits: [
          "Detecção de fraudes com 99.5% de precisão",
          "Redução de 80% em perdas financeiras",
          "Bloqueio automático de transações suspeitas"
        ]
      }
    ],
    caseStudy: {
      company: "Banco Regional do Norte",
      challenge: "Banco com 50 agências tinha alto índice de inadimplência e fraudes",
      solution: "Implementação completa da IA bancária em todas as operações",
      results: [
        { metric: "Tempo de análise de crédito", improvement: "-90%" },
        { metric: "Inadimplência", improvement: "-55%" },
        { metric: "Fraudes detectadas", improvement: "+300%" },
        { metric: "Satisfação dos clientes", improvement: "+120%" }
      ]
    },
    features: [
      {
        title: "Compliance Automatizado",
        description: "Monitoramento contínuo de regulamentações bancárias",
        icon: "📋"
      },
      {
        title: "Open Banking Ready",
        description: "Integração completa com ecossistema de Open Banking",
        icon: "🔗"
      },
      {
        title: "Segurança Bancária",
        description: "Proteção de dados com os mais altos padrões de segurança",
        icon: "🔐"
      }
    ],
    ctaTitle: "Lidere a Transformação Digital Bancária",
    ctaSubtitle: "Bancos parceiros já reduziram inadimplência em 55% e aumentaram aprovações em 200%",
    seoTitle: "IA para Bancos | Análise Crédito Automática | onsmartAI",
    seoDescription: "Automatize análise de crédito, detecte fraudes e melhore atendimento. Reduza inadimplência em 55% e aprove crédito em 5 minutos. Solução bancária completa.",
    keywords: ["IA bancária", "análise crédito automática", "detecção fraudes", "chatbot bancário", "compliance automático"]
  },
  {
    id: "telecomunicacoes",
    name: "Telecomunicações",
    slug: "telecomunicacoes",
    icon: "📡",
    description: "Otimize redes e atendimento com IA especializada em telecomunicações",
    heroTitle: "Revolucione Suas Telecomunicações com IA",
    heroSubtitle: "Otimize redes, automatize suporte técnico e melhore experiência do cliente com nossa IA especializada",
    heroImage: "/images/telecom-hero.jpg",
    challenges: [
      "Suporte técnico sobrecarregado com chamados básicos",
      "Otimização manual de redes ineficiente",
      "Previsão de falhas reativa ao invés de preventiva",
      "Atendimento ao cliente inconsistente entre canais",
      "Análise de performance de rede complexa"
    ],
    solutions: [
      {
        title: "Assistente de Suporte Técnico",
        description: "IA que resolve automaticamente 80% dos problemas técnicos comuns",
        benefits: [
          "Resolução instantânea de problemas básicos",
          "Redução de 75% em chamados para suporte humano",
          "Diagnóstico automático de problemas de rede"
        ]
      },
      {
        title: "Otimizador de Rede Inteligente",
        description: "Sistema que monitora e otimiza performance da rede em tempo real",
        benefits: [
          "Melhoria de 40% na qualidade do sinal",
          "Redução de 60% em interrupções de serviço",
          "Otimização automática baseada em demanda"
        ]
      },
      {
        title: "Preditor de Falhas",
        description: "IA que identifica e previne falhas antes que afetem os clientes",
        benefits: [
          "Prevenção de 85% das falhas de rede",
          "Manutenção preditiva automatizada",
          "Redução de 70% no tempo de inatividade"
        ]
      }
    ],
    caseStudy: {
      company: "TeleConnect Brasil",
      challenge: "Operadora regional com alta taxa de reclamações e problemas de rede",
      solution: "Implementação da IA de telecomunicações em toda a infraestrutura",
      results: [
        { metric: "Chamados de suporte", improvement: "-80%" },
        { metric: "Qualidade da rede", improvement: "+45%" },
        { metric: "Tempo de resolução", improvement: "-65%" },
        { metric: "Satisfação do cliente", improvement: "+90%" }
      ]
    },
    features: [
      {
        title: "5G Ready",
        description: "Preparado para otimização de redes 5G e futuras tecnologias",
        icon: "📶"
      },
      {
        title: "IoT Integration",
        description: "Gerenciamento inteligente de dispositivos IoT conectados",
        icon: "🌐"
      },
      {
        title: "Edge Computing",
        description: "Processamento distribuído para menor latência",
        icon: ""
      }
    ],
    ctaTitle: "Lidere a Próxima Era das Telecomunicações",
    ctaSubtitle: "Operadoras parceiras já melhoraram qualidade de rede em 45% e satisfação em 90%",
    seoTitle: "IA para Telecomunicações | Otimização Redes | onsmartAI",
    seoDescription: "Automatize suporte técnico, otimize redes e previna falhas. Melhore qualidade em 45% e reduza chamados em 80%. Solução completa para telecom.",
    keywords: ["IA telecomunicações", "otimização redes", "suporte técnico automático", "predição falhas", "5G IA"]
  },
  {
    id: "varejo",
    name: "Varejo",
    slug: "varejo",
    icon: "🏪",
    description: "Maximize vendas e experiência do cliente com IA personalizada para varejo",
    heroTitle: "Transforme Seu Varejo com IA Personalizada",
    heroSubtitle: "Aumente conversões, otimize estoque e personalize experiências com nossa solução completa para varejo",
    heroImage: "/images/varejo-hero.jpg",
    challenges: [
      "Personalização limitada da experiência de compra",
      "Gestão de estoque imprecisa e custosa",
      "Análise de comportamento do cliente superficial",
      "Preços não otimizados para maximizar lucro",
      "Campanhas de marketing genéricas e pouco efetivas"
    ],
    solutions: [
      {
        title: "Personalizador de Experiência",
        description: "IA que cria experiências únicas para cada cliente baseado em comportamento",
        benefits: [
          "Aumento de 200% na conversão",
          "Personalização em tempo real",
          "Recomendações com 95% de precisão"
        ]
      },
      {
        title: "Otimizador de Preços Dinâmico",
        description: "Sistema que ajusta preços automaticamente para maximizar vendas e lucro",
        benefits: [
          "Aumento de 35% na margem de lucro",
          "Preços competitivos automaticamente",
          "Otimização baseada em demanda real"
        ]
      },
      {
        title: "Analista de Comportamento",
        description: "IA que mapeia jornada do cliente e identifica oportunidades de venda",
        benefits: [
          "Insights profundos sobre clientes",
          "Identificação de padrões de compra",
          "Campanhas 300% mais efetivas"
        ]
      }
    ],
    caseStudy: {
      company: "MegaStore Shopping - Campinas",
      challenge: "Rede com 15 lojas tinha baixa conversão e muito estoque parado",
      solution: "Implementação completa da IA de varejo em todas as unidades",
      results: [
        { metric: "Taxa de conversão", improvement: "+180%" },
        { metric: "Giro de estoque", improvement: "+250%" },
        { metric: "Margem de lucro", improvement: "+40%" },
        { metric: "Satisfação do cliente", improvement: "+85%" }
      ]
    },
    features: [
      {
        title: "Omnichannel IA",
        description: "Experiência unificada entre loja física e digital",
        icon: "🔄"
      },
      {
        title: "Visual Merchandising",
        description: "IA que otimiza layout e exposição de produtos",
        icon: "🎨"
      },
      {
        title: "Loyalty Program IA",
        description: "Programa de fidelidade inteligente e personalizado",
        icon: "💎"
      }
    ],
    ctaTitle: "Revolucione Seu Varejo com IA",
    ctaSubtitle: "Mais de 200 lojas já aumentaram conversões em 180% e lucro em 40% com nossa IA",
    seoTitle: "IA para Varejo | Personalização Vendas | onsmartAI",
    seoDescription: "Personalize experiências, otimize preços e aumente conversões. Melhore vendas em 180% e lucro em 40%. Solução completa de IA para varejo.",
    keywords: ["IA varejo", "personalização cliente", "otimização preços", "análise comportamento", "omnichannel IA"]
  },
  {
    id: "industria",
    name: "Indústria",
    slug: "industria",
    icon: "🏭",
    description: "Otimize produção e manutenção industrial com IA avançada",
    heroTitle: "Revolucione Sua Indústria com IA 4.0",
    heroSubtitle: "Automatize processos, previna falhas e otimize produção com nossa solução industrial inteligente",
    heroImage: "/images/industria-hero.jpg",
    challenges: [
      "Manutenção reativa custosa e ineficiente",
      "Controle de qualidade manual e inconsistente",
      "Otimização de produção baseada em experiência",
      "Desperdício de materiais e energia",
      "Planejamento de produção pouco preciso"
    ],
    solutions: [
      {
        title: "Manutenção Preditiva IA",
        description: "Sistema que prevê falhas de equipamentos antes que aconteçam",
        benefits: [
          "Redução de 70% em paradas não programadas",
          "Economia de 40% em custos de manutenção",
          "Aumento de 25% na vida útil dos equipamentos"
        ]
      },
      {
        title: "Controle de Qualidade Automático",
        description: "IA que detecta defeitos e anomalias em tempo real",
        benefits: [
          "Detecção de 99.8% dos defeitos",
          "Redução de 90% em produtos rejeitados",
          "Controle de qualidade 24/7"
        ]
      },
      {
        title: "Otimizador de Produção",
        description: "Sistema que maximiza eficiência e minimiza desperdícios",
        benefits: [
          "Aumento de 30% na produtividade",
          "Redução de 25% no consumo de energia",
          "Otimização automática de recursos"
        ]
      }
    ],
    caseStudy: {
      company: "Metalúrgica Industrial S.A.",
      challenge: "Fábrica com altos custos de manutenção e baixa eficiência produtiva",
      solution: "Implementação da Indústria 4.0 com IA em todas as linhas de produção",
      results: [
        { metric: "Paradas não programadas", improvement: "-75%" },
        { metric: "Produtividade geral", improvement: "+35%" },
        { metric: "Custos operacionais", improvement: "-30%" },
        { metric: "Qualidade dos produtos", improvement: "+90%" }
      ]
    },
    features: [
      {
        title: "IIoT Integration",
        description: "Integração completa com sensores e dispositivos industriais",
        icon: "🔗"
      },
      {
        title: "Digital Twin",
        description: "Gêmeo digital da fábrica para simulações e otimizações",
        icon: "🔄"
      },
      {
        title: "Safety IA",
        description: "Sistema inteligente de segurança e prevenção de acidentes",
        icon: "🦺"
      }
    ],
    ctaTitle: "Entre na Era da Indústria 4.0",
    ctaSubtitle: "Indústrias parceiras já aumentaram produtividade em 35% e reduziram custos em 30%",
    seoTitle: "IA para Indústria 4.0 | Manutenção Preditiva | onsmartAI",
    seoDescription: "Automatize manutenção, controle qualidade e otimize produção. Aumente produtividade em 35% e reduza custos em 30%. Solução industrial completa.",
    keywords: ["IA industrial", "indústria 4.0", "manutenção preditiva", "controle qualidade IA", "otimização produção"]
  },
  {
    id: "saude",
    name: "Saúde",
    slug: "saude",
    icon: "🏥",
    description: "Transforme o sistema de saúde com IA especializada em medicina",
    heroTitle: "Revolucione o Sistema de Saúde com IA Médica",
    heroSubtitle: "Automatize diagnósticos, otimize tratamentos e melhore resultados com nossa IA especializada em saúde",
    heroImage: "/images/saude-hero.jpg",
    challenges: [
      "Diagnósticos demorados e sujeitos a erro humano",
      "Análise de exames médicos manual e custosa",
      "Gestão de pacientes complexa e ineficiente",
      "Prescrições não otimizadas para cada paciente",
      "Monitoramento de pacientes limitado"
    ],
    solutions: [
      {
        title: "IA de Diagnóstico Médico",
        description: "Sistema que auxilia médicos em diagnósticos precisos e rápidos",
        benefits: [
          "Aumento de 40% na precisão diagnóstica",
          "Redução de 60% no tempo de diagnóstico",
          "Detecção precoce de doenças críticas"
        ]
      },
      {
        title: "Analisador de Exames Inteligente",
        description: "IA que interpreta exames médicos e sugere diagnósticos",
        benefits: [
          "Análise de exames em minutos",
          "Identificação de 99% das anomalias",
          "Relatórios médicos automatizados"
        ]
      },
      {
        title: "Sistema de Medicina Personalizada",
        description: "IA que personaliza tratamentos baseado no perfil genético do paciente",
        benefits: [
          "Tratamentos 70% mais eficazes",
          "Redução de 50% em efeitos colaterais",
          "Medicina de precisão para cada paciente"
        ]
      }
    ],
    caseStudy: {
      company: "Hospital São Rafael - Salvador",
      challenge: "Hospital com 400 leitos tinha diagnósticos demorados e baixa eficiência",
      solution: "Implementação da IA médica em todos os departamentos",
      results: [
        { metric: "Tempo de diagnóstico", improvement: "-65%" },
        { metric: "Precisão diagnóstica", improvement: "+45%" },
        { metric: "Satisfação dos pacientes", improvement: "+80%" },
        { metric: "Eficiência operacional", improvement: "+90%" }
      ]
    },
    features: [
      {
        title: "HIPAA Compliant",
        description: "Proteção total de dados médicos conforme regulamentações",
        icon: "🔒"
      },
      {
        title: "Telemedicina IA",
        description: "Consultas remotas com suporte de inteligência artificial",
        icon: "💻"
      },
      {
        title: "Research Integration",
        description: "Integração com pesquisas médicas e bases de conhecimento",
        icon: "🔬"
      }
    ],
    ctaTitle: "Lidere a Revolução da Medicina com IA",
    ctaSubtitle: "Hospitais parceiros já melhoraram diagnósticos em 45% e satisfação em 80%",
    seoTitle: "IA para Saúde | Diagnóstico Médico Automático | onsmartAI",
    seoDescription: "Automatize diagnósticos, analise exames e personalize tratamentos. Melhore precisão em 45% e eficiência em 90%. Solução médica completa.",
    keywords: ["IA médica", "diagnóstico automático", "análise exames IA", "medicina personalizada", "telemedicina IA"]
  },
  {
    id: "comercio",
    name: "Comércio",
    slug: "comercio",
    icon: "🛒",
    description: "Otimize vendas, estoque e atendimento ao cliente com IA personalizada",
    heroTitle: "Transforme Seu Comércio com IA Inteligente",
    heroSubtitle: "Automatize vendas, otimize estoque e melhore o atendimento ao cliente com soluções de IA especializadas para o comércio",
    heroImage: "/images/comercio-hero.jpg",
    challenges: [
      "Gestão de estoque ineficiente e custosa",
      "Atendimento ao cliente sobrecarregado",
      "Análise de vendas manual e demorada",
      "Previsão de demanda imprecisa",
      "Processos de vendas não otimizados"
    ],
    solutions: [
      {
        title: "Gestão Inteligente de Estoque",
        description: "IA que prevê demanda e otimiza níveis de estoque automaticamente",
        benefits: [
          "Redução de 40% no custo de estoque",
          "Previsão de demanda com 90% de precisão",
          "Automação completa de reposição"
        ]
      },
      {
        title: "Assistente de Vendas Virtual",
        description: "IA que atende clientes e realiza vendas 24/7",
        benefits: [
          "Atendimento disponível 24 horas",
          "Aumento de 60% nas vendas",
          "Qualificação automática de leads"
        ]
      },
      {
        title: "Análise Preditiva de Vendas",
        description: "Sistema que analisa padrões e prevê tendências de vendas",
        benefits: [
          "Previsão de vendas com 85% de precisão",
          "Identificação de oportunidades",
          "Otimização de campanhas de marketing"
        ]
      }
    ],
    caseStudy: {
      company: "Comércio Digital - São Paulo",
      challenge: "Loja online com gestão de estoque ineficiente e atendimento limitado",
      solution: "Implementação de IA para gestão de estoque e atendimento virtual",
      results: [
        { metric: "Redução de custos", improvement: "-40%" },
        { metric: "Aumento de vendas", improvement: "+60%" },
        { metric: "Satisfação do cliente", improvement: "+80%" }
      ]
    },
    features: [
      {
        title: "Gestão de Estoque",
        description: "Controle inteligente de inventário",
        icon: "📦"
      },
      {
        title: "Atendimento Virtual",
        description: "Assistente de vendas 24/7",
        icon: "🤖"
      },
      {
        title: "Análise de Vendas",
        description: "Insights preditivos de vendas",
        icon: "📊"
      }
    ],
    ctaTitle: "Transforme Seu Comércio com IA",
    ctaSubtitle: "Mais de 300 comerciantes já aumentaram suas vendas com nossa IA",
    seoTitle: "IA para Comércio | Automação de Vendas | onsmartAI",
    seoDescription: "Transforme seu comércio com IA. Aumente vendas em 60%, reduza custos em 40%. Gestão inteligente de estoque e atendimento virtual.",
    keywords: ["IA comércio", "automação vendas", "gestão estoque IA", "atendimento virtual", "análise vendas"]
  },
  {
    id: "setor-imobiliario",
    name: "Setor Imobiliário",
    slug: "setor-imobiliario",
    icon: "🏠",
    description: "Gestão inteligente de propriedades, leads e documentação imobiliária",
    heroTitle: "Revolucione o Setor Imobiliário com IA",
    heroSubtitle: "Automatize gestão de propriedades, qualifique leads e otimize processos com IA especializada em imóveis",
    heroImage: "/images/imobiliario-hero.jpg",
    challenges: [
      "Gestão manual de propriedades e leads",
      "Qualificação de clientes demorada",
      "Documentação imobiliária complexa",
      "Análise de mercado manual",
      "Processos de vendas não otimizados"
    ],
    solutions: [
      {
        title: "Gestão Inteligente de Propriedades",
        description: "IA que gerencia inventário e otimiza apresentações de imóveis",
        benefits: [
          "Gestão automatizada de 1000+ propriedades",
          "Apresentações personalizadas por cliente",
          "Otimização de preços baseada em mercado"
        ]
      },
      {
        title: "Qualificação Automática de Leads",
        description: "Sistema que qualifica e segmenta clientes automaticamente",
        benefits: [
          "Qualificação de leads em tempo real",
          "Segmentação automática por perfil",
          "Aumento de 70% na conversão"
        ]
      },
      {
        title: "Análise Preditiva de Mercado",
        description: "IA que analisa tendências e prevê valores de mercado",
        benefits: [
          "Análise de mercado em tempo real",
          "Previsão de valores com 90% de precisão",
          "Insights estratégicos para investimentos"
        ]
      }
    ],
    caseStudy: {
      company: "Imobiliária Premium - Rio de Janeiro",
      challenge: "Gestão manual de 500 propriedades e qualificação ineficiente de leads",
      solution: "Implementação de IA para gestão de propriedades e qualificação de leads",
      results: [
        { metric: "Propriedades gerenciadas", improvement: "+200%" },
        { metric: "Conversão de leads", improvement: "+70%" },
        { metric: "Tempo de vendas", improvement: "-50%" }
      ]
    },
    features: [
      {
        title: "Gestão de Propriedades",
        description: "Controle inteligente de inventário imobiliário",
        icon: "🏘️"
      },
      {
        title: "Qualificação de Leads",
        description: "Segmentação automática de clientes",
        icon: "🎯"
      },
      {
        title: "Análise de Mercado",
        description: "Insights preditivos do mercado imobiliário",
        icon: "📈"
      }
    ],
    ctaTitle: "Transforme Seu Negócio Imobiliário",
    ctaSubtitle: "Mais de 150 imobiliárias já aumentaram suas vendas com nossa IA",
    seoTitle: "IA para Setor Imobiliário | Gestão de Propriedades | onsmartAI",
    seoDescription: "Transforme seu negócio imobiliário com IA. Aumente vendas em 70%, reduza tempo em 50%. Gestão inteligente de propriedades e leads.",
    keywords: ["IA imobiliário", "gestão propriedades", "qualificação leads", "análise mercado imobiliário", "automação vendas imóveis"]
  }
];

export const getSectorBySlug = (slug: string): SectorData | undefined => {
  return sectorsData.find(sector => sector.slug === slug);
};

export const getSectorById = (id: string): SectorData | undefined => {
  return sectorsData.find(sector => sector.id === id);
};
