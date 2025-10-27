export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  features: {
    title: string;
    description: string;
    benefits: string[];
  }[];
  process: {
    step: number;
    title: string;
    description: string;
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
  pricing: {
    tier: string;
    price: string;
    features: string[];
  }[];
  ctaTitle: string;
  ctaSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "diagnostico-ia",
    name: "Diagnóstico de IA",
    slug: "diagnostico-ia",
    icon: "",
    description: "Avaliação completa do potencial de IA",
    heroTitle: "Descubra o Potencial de IA da Sua Empresa",
    heroSubtitle: "Avaliação completa e gratuita para identificar oportunidades específicas de implementação de IA nos seus processos",
    heroImage: "/images/diagnostico-ia-hero.jpg",
    features: [
      {
        title: "Análise de Processos",
        description: "Mapeamento completo dos processos atuais da sua empresa",
        benefits: [
          "Identificação de gargalos operacionais",
          "Análise de eficiência atual",
          "Oportunidades de automação"
        ]
      },
      {
        title: "Avaliação de Dados",
        description: "Análise da qualidade e disponibilidade dos seus dados",
        benefits: [
          "Auditoria de dados existentes",
          "Identificação de lacunas",
          "Estratégia de coleta de dados"
        ]
      },
      {
        title: "Roadmap Personalizado",
        description: "Plano estratégico para implementação de IA",
        benefits: [
          "Priorização de projetos",
          "Cronograma de implementação",
          "Estimativa de ROI"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Questionário Inicial",
        description: "Preenchimento de questionário sobre processos e objetivos"
      },
      {
        step: 2,
        title: "Análise Técnica",
        description: "Avaliação da infraestrutura e dados existentes"
      },
      {
        step: 3,
        title: "Relatório Detalhado",
        description: "Entrega do relatório com recomendações"
      }
    ],
    caseStudy: {
      company: "Empresa Exemplo - São Paulo",
      challenge: "Empresa queria entender como IA poderia melhorar seus processos",
      solution: "Diagnóstico completo identificou 15 oportunidades de IA",
      results: [
        { metric: "Oportunidades identificadas", improvement: "15 projetos" },
        { metric: "Potencial de economia", improvement: "R$ 500k/ano" },
        { metric: "Tempo de implementação", improvement: "6 meses" }
      ]
    },
    pricing: [
      {
        tier: "Diagnóstico Básico",
        price: "Gratuito",
        features: [
          "Questionário de avaliação",
          "Relatório básico",
          "Recomendações iniciais",
          "Consultoria de 30 min"
        ]
      },
      {
        tier: "Diagnóstico Completo",
        price: "Sob consulta",
        features: [
          "Análise detalhada",
          "Relatório executivo",
          "Roadmap personalizado",
          "Consultoria de 2 horas"
        ]
      },
      {
        tier: "Diagnóstico Enterprise",
        price: "Sob consulta",
        features: [
          "Análise completa",
          "Relatório estratégico",
          "Plano de implementação",
          "Suporte contínuo"
        ]
      }
    ],
    ctaTitle: "Descubra o Potencial de IA da Sua Empresa",
    ctaSubtitle: "Mais de 500 empresas já descobriram suas oportunidades de IA",
    seoTitle: "Diagnóstico de IA Gratuito | Avaliação Empresarial | onsmartAI",
    seoDescription: "Descubra o potencial de IA da sua empresa com nosso diagnóstico gratuito. Identifique oportunidades específicas e crie um roadmap personalizado.",
    keywords: ["diagnóstico IA", "avaliação IA", "potencial IA", "roadmap IA", "consultoria IA"]
  },
  {
    id: "aceleracao-adocao-ia",
    name: "Aceleração de Adoção de IA",
    slug: "aceleracao-adocao-ia",
    icon: "",
    description: "Implementação estratégica de IA",
    heroTitle: "Acelere a Transformação Digital da Sua Empresa",
    heroSubtitle: "Implementamos IA de forma estratégica e gradual, garantindo adoção bem-sucedida em toda organização",
    heroImage: "/images/aceleracao-ia-hero.jpg",
    features: [
      {
        title: "Diagnóstico Completo",
        description: "Análise profunda dos processos atuais e identificação de oportunidades de IA",
        benefits: [
          "Mapeamento de 100+ processos empresariais",
          "Identificação de gargalos e ineficiências",
          "Priorização baseada em ROI potencial"
        ]
      },
      {
        title: "Roadmap Estratégico",
        description: "Plano detalhado de implementação com marcos e métricas claras",
        benefits: [
          "Cronograma realista de 6-18 meses",
          "Marcos mensuráveis de progresso",
          "Estratégia de change management"
        ]
      },
      {
        title: "Implementação Gradual",
        description: "Rollout faseado para garantir adoção e minimizar resistência",
        benefits: [
          "Piloto com departamento estratégico",
          "Expansão controlada por fases",
          "Suporte contínuo durante transição"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Avaliação Inicial",
        description: "Workshop de descoberta para entender necessidades e objetivos"
      },
      {
        step: 2,
        title: "Diagnóstico Detalhado",
        description: "Análise técnica e estratégica dos processos atuais"
      },
      {
        step: 3,
        title: "Roadmap Personalizado",
        description: "Criação do plano estratégico de implementação"
      },
      {
        step: 4,
        title: "Implementação Piloto",
        description: "Execução do projeto piloto no departamento selecionado"
      },
      {
        step: 5,
        title: "Expansão Controlada",
        description: "Rollout gradual para outros departamentos"
      },
      {
        step: 6,
        title: "Otimização Contínua",
        description: "Monitoramento e melhorias constantes"
      }
    ],
    caseStudy: {
      company: "TechCorp Indústrias - São Paulo",
      challenge: "Empresa com 500 funcionários queria implementar IA mas não sabia por onde começar",
      solution: "Programa completo de aceleração de adoção de IA em 12 meses",
      results: [
        { metric: "Processos automatizados", improvement: "+85%" },
        { metric: "Produtividade geral", improvement: "+65%" },
        { metric: "Redução de custos", improvement: "-40%" },
        { metric: "Satisfação dos funcionários", improvement: "+70%" }
      ]
    },
    pricing: [
      {
        tier: "Starter",
        price: "R$ 15.000/mês",
        features: [
          "Diagnóstico básico",
          "Roadmap simplificado",
          "1 projeto piloto",
          "Suporte por email"
        ]
      },
      {
        tier: "Professional",
        price: "R$ 35.000/mês",
        features: [
          "Diagnóstico completo",
          "Roadmap detalhado",
          "3 projetos piloto",
          "Suporte dedicado",
          "Change management"
        ]
      },
      {
        tier: "Enterprise",
        price: "Sob consulta",
        features: [
          "Diagnóstico enterprise",
          "Roadmap multi-departamental",
          "Projetos ilimitados",
          "Equipe dedicada",
          "Treinamento executivo"
        ]
      }
    ],
    ctaTitle: "Acelere Sua Transformação Digital",
    ctaSubtitle: "Mais de 150 empresas já aceleraram sua adoção de IA conosco",
    seoTitle: "Aceleração de Adoção de IA | Consultoria Estratégica | onsmartAI",
    seoDescription: "Acelere a implementação de IA na sua empresa com nossa consultoria especializada. Aumente produtividade em 65% e reduza custos em 40%. Resultados garantidos.",
    keywords: ["aceleração IA", "consultoria IA", "implementação IA", "transformação digital", "estratégia IA"]
  },
  {
    id: "implementacao-tecnica",
    name: "Implementação Técnica",
    slug: "implementacao-tecnica",
    icon: "⚙️",
    description: "Desenvolvimento de soluções IA",
    heroTitle: "Implementação Técnica de IA de Classe Mundial",
    heroSubtitle: "Desenvolvemos e integramos soluções de IA robustas e escaláveis ao seu ambiente tecnológico",
    heroImage: "/images/implementacao-tecnica-hero.jpg",
    features: [
      {
        title: "Desenvolvimento Custom",
        description: "Soluções de IA desenvolvidas especificamente para suas necessidades",
        benefits: [
          "Algoritmos personalizados",
          "Integração com sistemas existentes",
          "Escalabilidade garantida"
        ]
      },
      {
        title: "Arquitetura Robusta",
        description: "Infraestrutura preparada para alta performance e disponibilidade",
        benefits: [
          "99.9% de uptime garantido",
          "Auto-scaling automático",
          "Segurança enterprise"
        ]
      },
      {
        title: "Integração Seamless",
        description: "Conexão perfeita com seus sistemas e fluxos de trabalho atuais",
        benefits: [
          "APIs RESTful e GraphQL",
          "Webhooks em tempo real",
          "Sincronização bidirecional"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Análise Técnica",
        description: "Auditoria completa da infraestrutura e sistemas atuais"
      },
      {
        step: 2,
        title: "Arquitetura da Solução",
        description: "Design da arquitetura técnica e escolha das tecnologias"
      },
      {
        step: 3,
        title: "Desenvolvimento MVP",
        description: "Criação do produto mínimo viável para validação"
      },
      {
        step: 4,
        title: "Testes e Validação",
        description: "Testes extensivos de performance e segurança"
      },
      {
        step: 5,
        title: "Deploy Produção",
        description: "Implementação em ambiente de produção"
      },
      {
        step: 6,
        title: "Monitoramento",
        description: "Monitoramento contínuo e otimizações"
      }
    ],
    caseStudy: {
      company: "FinTech Solutions - Rio de Janeiro",
      challenge: "Precisava de sistema de análise de risco em tempo real para 10M+ transações/dia",
      solution: "Implementação de IA para detecção de fraudes com arquitetura de microserviços",
      results: [
        { metric: "Tempo de resposta", improvement: "-95%" },
        { metric: "Detecção de fraudes", improvement: "+300%" },
        { metric: "Falsos positivos", improvement: "-80%" },
        { metric: "Disponibilidade", improvement: "99.99%" }
      ]
    },
    pricing: [
      {
        tier: "MVP",
        price: "R$ 25.000",
        features: [
          "Análise técnica básica",
          "MVP funcional",
          "Documentação técnica",
          "3 meses de suporte"
        ]
      },
      {
        tier: "Production Ready",
        price: "R$ 75.000",
        features: [
          "Análise técnica completa",
          "Solução production-ready",
          "Testes automatizados",
          "12 meses de suporte",
          "Monitoramento 24/7"
        ]
      },
      {
        tier: "Enterprise",
        price: "R$ 150.000+",
        features: [
          "Arquitetura enterprise",
          "Alta disponibilidade",
          "Segurança avançada",
          "Suporte dedicado",
          "SLA personalizado"
        ]
      }
    ],
    ctaTitle: "Implemente IA de Classe Mundial",
    ctaSubtitle: "Mais de 80 projetos técnicos entregues com sucesso",
    seoTitle: "Implementação Técnica de IA | Desenvolvimento Custom | onsmartAI",
    seoDescription: "Desenvolvemos soluções de IA robustas e escaláveis. 99.9% uptime, integração seamless e arquitetura enterprise. Projetos de R$ 25k a R$ 150k+.",
    keywords: ["implementação IA", "desenvolvimento IA", "integração IA", "arquitetura IA", "soluções custom IA"]
  },
  {
    id: "analise-dados",
    name: "Análise de Dados",
    slug: "analise-dados",
    icon: "📊",
    description: "Análise inteligente de dados",
    heroTitle: "Transforme Dados em Vantagem Competitiva",
    heroSubtitle: "Extraia insights valiosos dos seus dados com nossas soluções avançadas de análise e IA",
    heroImage: "/images/analise-dados-hero.jpg",
    features: [
      {
        title: "Data Mining Avançado",
        description: "Descoberta de padrões ocultos em grandes volumes de dados",
        benefits: [
          "Análise de petabytes de dados",
          "Identificação de padrões complexos",
          "Insights não óbvios revelados"
        ]
      },
      {
        title: "Análise Preditiva",
        description: "Previsões precisas baseadas em machine learning",
        benefits: [
          "Previsões com 90%+ de precisão",
          "Antecipação de tendências",
          "Otimização de recursos"
        ]
      },
      {
        title: "Dashboards Inteligentes",
        description: "Visualizações interativas e insights em tempo real",
        benefits: [
          "Dashboards personalizados",
          "Alertas automáticos",
          "Análise self-service"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Auditoria de Dados",
        description: "Avaliação da qualidade e estrutura dos dados existentes"
      },
      {
        step: 2,
        title: "Preparação dos Dados",
        description: "Limpeza, normalização e estruturação dos dados"
      },
      {
        step: 3,
        title: "Modelagem Analítica",
        description: "Desenvolvimento de modelos de machine learning"
      },
      {
        step: 4,
        title: "Validação e Testes",
        description: "Validação estatística e testes de performance"
      },
      {
        step: 5,
        title: "Implementação",
        description: "Deploy dos modelos em ambiente de produção"
      },
      {
        step: 6,
        title: "Monitoramento",
        description: "Monitoramento contínuo da performance dos modelos"
      }
    ],
    caseStudy: {
      company: "RetailMax - Belo Horizonte",
      challenge: "Rede com 50 lojas não conseguia prever demanda e otimizar estoque",
      solution: "Sistema de análise preditiva para otimização de estoque e pricing",
      results: [
        { metric: "Precisão de previsão", improvement: "+85%" },
        { metric: "Redução de estoque parado", improvement: "-60%" },
        { metric: "Aumento de margem", improvement: "+35%" },
        { metric: "Satisfação do cliente", improvement: "+50%" }
      ]
    },
    pricing: [
      {
        tier: "Analytics Basic",
        price: "R$ 8.000/mês",
        features: [
          "Análise de até 1M registros",
          "5 dashboards personalizados",
          "Relatórios mensais",
          "Suporte por email"
        ]
      },
      {
        tier: "Analytics Pro",
        price: "R$ 20.000/mês",
        features: [
          "Análise de até 10M registros",
          "Dashboards ilimitados",
          "Análise preditiva",
          "Suporte prioritário",
          "Alertas em tempo real"
        ]
      },
      {
        tier: "Analytics Enterprise",
        price: "R$ 50.000/mês",
        features: [
          "Dados ilimitados",
          "Machine learning avançado",
          "API personalizada",
          "Equipe dedicada",
          "SLA 99.9%"
        ]
      }
    ],
    ctaTitle: "Transforme Seus Dados em Insights",
    ctaSubtitle: "Mais de 200 empresas já otimizaram suas operações com nossa análise de dados",
    seoTitle: "Análise de Dados com IA | Business Intelligence | onsmartAI",
    seoDescription: "Transforme dados em insights acionáveis com IA. Aumente margem em 35%, reduza estoque parado em 60%. Análise preditiva com 90%+ de precisão.",
    keywords: ["análise de dados", "business intelligence", "análise preditiva", "data mining", "dashboards IA"]
  },
  {
    id: "treinamento-ia",
    name: "Treinamento em IA",
    slug: "treinamento-ia",
    icon: "🎓",
    description: "Treinamento especializado IA",
    heroTitle: "Capacite Sua Equipe para a Era da IA",
    heroSubtitle: "Programas de treinamento personalizados para acelerar a adoção de IA na sua organização",
    heroImage: "/images/treinamento-ia-hero.jpg",
    features: [
      {
        title: "Treinamento Personalizado",
        description: "Conteúdo adaptado ao nível e necessidades da sua equipe",
        benefits: [
          "Currículo customizado por função",
          "Casos práticos do seu setor",
          "Hands-on com suas ferramentas"
        ]
      },
      {
        title: "Metodologia Prática",
        description: "Aprendizado baseado em projetos reais e casos práticos",
        benefits: [
          "70% prática, 30% teoria",
          "Projetos com dados reais",
          "Mentorias individuais"
        ]
      },
      {
        title: "Certificação Reconhecida",
        description: "Certificados validados pela indústria",
        benefits: [
          "Certificação onsmartAI",
          "Badge LinkedIn",
          "Reconhecimento no mercado"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Assessment Inicial",
        description: "Avaliação do nível atual de conhecimento da equipe"
      },
      {
        step: 2,
        title: "Currículo Personalizado",
        description: "Desenvolvimento do programa de treinamento customizado"
      },
      {
        step: 3,
        title: "Treinamento Intensivo",
        description: "Execução do programa com aulas teóricas e práticas"
      },
      {
        step: 4,
        title: "Projetos Práticos",
        description: "Desenvolvimento de projetos reais supervisionados"
      },
      {
        step: 5,
        title: "Avaliação Final",
        description: "Avaliação de conhecimento e certificação"
      },
      {
        step: 6,
        title: "Suporte Contínuo",
        description: "Mentoria e suporte pós-treinamento"
      }
    ],
    caseStudy: {
      company: "TechBank - Brasília",
      challenge: "Equipe de 100 desenvolvedores precisava se capacitar em IA para novos produtos",
      solution: "Programa intensivo de 3 meses com projetos práticos em IA bancária",
      results: [
        { metric: "Profissionais certificados", improvement: "100%" },
        { metric: "Projetos de IA entregues", improvement: "+500%" },
        { metric: "Time-to-market", improvement: "-50%" },
        { metric: "Satisfação da equipe", improvement: "+80%" }
      ]
    },
    pricing: [
      {
        tier: "Individual",
        price: "R$ 2.500/pessoa",
        features: [
          "40h de treinamento",
          "Material didático",
          "Certificado de conclusão",
          "Suporte por 30 dias"
        ]
      },
      {
        tier: "Equipe (5-20 pessoas)",
        price: "R$ 2.000/pessoa",
        features: [
          "60h de treinamento",
          "Projetos em grupo",
          "Mentoria dedicada",
          "Suporte por 90 dias",
          "Certificação avançada"
        ]
      },
      {
        tier: "Corporativo (20+ pessoas)",
        price: "R$ 1.500/pessoa",
        features: [
          "80h de treinamento",
          "Currículo personalizado",
          "Projetos com dados reais",
          "Mentoria executiva",
          "Suporte por 6 meses"
        ]
      }
    ],
    ctaTitle: "Capacite Sua Equipe em IA",
    ctaSubtitle: "Mais de 2.000 profissionais já foram certificados pelos nossos programas",
    seoTitle: "Treinamento em IA | Capacitação Empresarial | onsmartAI",
    seoDescription: "Capacite sua equipe em IA com nossos treinamentos personalizados. 2.000+ profissionais certificados. Aumente produtividade em 80% e acelere time-to-market em 50%.",
    keywords: ["treinamento IA", "capacitação IA", "curso IA", "certificação IA", "educação corporativa IA"]
  },
  {
    id: "suporte-continuo",
    name: "Suporte Contínuo",
    slug: "suporte-continuo",
    icon: "",
    description: "Acompanhamento e otimização contínua",
    heroTitle: "Suporte Técnico 24/7 para Suas Soluções de IA",
    heroSubtitle: "Acompanhamento contínuo e otimização das soluções implementadas com suporte técnico especializado",
    heroImage: "/images/suporte-continuo-hero.jpg",
    features: [
      {
        title: "Monitoramento 24/7",
        description: "Acompanhamento contínuo da performance das suas soluções de IA",
        benefits: [
          "Monitoramento em tempo real",
          "Alertas automáticos",
          "Relatórios de performance"
        ]
      },
      {
        title: "Otimizações Contínuas",
        description: "Melhorias constantes baseadas em dados e feedback",
        benefits: [
          "Análise de performance",
          "Ajustes automáticos",
          "Melhorias incrementais"
        ]
      },
      {
        title: "Suporte Especializado",
        description: "Equipe técnica dedicada para resolver suas necessidades",
        benefits: [
          "Suporte técnico especializado",
          "Resposta rápida a incidentes",
          "Consultoria contínua"
        ]
      }
    ],
    process: [
      {
        step: 1,
        title: "Monitoramento Ativo",
        description: "Acompanhamento contínuo da performance"
      },
      {
        step: 2,
        title: "Análise de Dados",
        description: "Análise dos dados de performance e uso"
      },
      {
        step: 3,
        title: "Otimizações",
        description: "Implementação de melhorias identificadas"
      }
    ],
    caseStudy: {
      company: "Empresa Exemplo - Rio de Janeiro",
      challenge: "Empresa precisava de suporte contínuo para suas soluções de IA",
      solution: "Implementação de suporte técnico 24/7 com monitoramento proativo",
      results: [
        { metric: "Uptime das soluções", improvement: "99.9%" },
        { metric: "Tempo de resposta", improvement: "< 1 hora" },
        { metric: "Satisfação do cliente", improvement: "95%" }
      ]
    },
    pricing: [
      {
        tier: "Suporte Básico",
        price: "Sob consulta",
        features: [
          "Monitoramento básico",
          "Suporte por email",
          "Relatórios mensais",
          "Horário comercial"
        ]
      },
      {
        tier: "Suporte Pro",
        price: "Sob consulta",
        features: [
          "Monitoramento 24/7",
          "Suporte prioritário",
          "Relatórios semanais",
          "Suporte por telefone"
        ]
      },
      {
        tier: "Suporte Enterprise",
        price: "Sob consulta",
        features: [
          "Monitoramento avançado",
          "Suporte dedicado",
          "Relatórios em tempo real",
          "Suporte 24/7"
        ]
      }
    ],
    ctaTitle: "Garanta o Sucesso Contínuo das Suas Soluções",
    ctaSubtitle: "Mais de 200 empresas confiam em nosso suporte técnico",
    seoTitle: "Suporte Técnico IA | Monitoramento 24/7 | onsmartAI",
    seoDescription: "Suporte técnico especializado 24/7 para suas soluções de IA. Monitoramento contínuo, otimizações e suporte dedicado.",
    keywords: ["suporte técnico IA", "monitoramento IA", "suporte 24/7", "manutenção IA", "otimização IA"]
  }
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServiceById = (id: string): ServiceData | undefined => {
  return servicesData.find(service => service.id === id);
};

