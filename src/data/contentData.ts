export interface ContentData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  category: 'blog' | 'material' | 'ferramenta' | 'university';
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  features?: {
    title: string;
    description: string;
    benefits: string[];
  }[];
  topics?: string[];
  downloadUrl?: string;
  accessUrl?: string;
  duration?: string;
  level?: 'Iniciante' | 'Intermediário' | 'Avançado';
  ctaTitle: string;
  ctaSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const contentData: ContentData[] = [
  // Blog Content
  {
    id: "blog-ia-negocios",
    name: "IA nos Negócios",
    slug: "blog-ia-negocios",
    icon: "📝",
    description: "Artigos sobre como a IA está transformando o mundo dos negócios",
    category: 'blog',
    heroTitle: "Blog onsmartAI: IA nos Negócios",
    heroSubtitle: "Insights, tendências e estratégias para implementar IA com sucesso na sua empresa",
    heroImage: "/images/blog-ia-negocios.jpg",
    topics: [
      "Estratégias de implementação de IA",
      "Cases de sucesso empresariais",
      "Tendências tecnológicas",
      "ROI em projetos de IA",
      "Transformação digital"
    ],
    ctaTitle: "Mantenha-se Atualizado",
    ctaSubtitle: "Receba os melhores insights sobre IA diretamente no seu email",
    seoTitle: "Blog IA nos Negócios | Insights e Estratégias | onsmartAI",
    seoDescription: "Descubra como implementar IA com sucesso na sua empresa. Cases reais, estratégias práticas e tendências do mercado. Conteúdo atualizado semanalmente.",
    keywords: ["blog IA", "IA negócios", "estratégias IA", "cases IA", "transformação digital"]
  },
  {
    id: "blog-tecnologia-ia",
    name: "Tecnologia e Inovação",
    slug: "blog-tecnologia-ia",
    icon: "🔬",
    description: "Conteúdo técnico sobre as mais recentes inovações em IA",
    category: 'blog',
    heroTitle: "Tecnologia e Inovação em IA",
    heroSubtitle: "Explore as mais recentes inovações e desenvolvimentos tecnológicos em inteligência artificial",
    heroImage: "/images/blog-tecnologia.jpg",
    topics: [
      "Machine Learning avançado",
      "Deep Learning e redes neurais",
      "Processamento de linguagem natural",
      "Computer Vision",
      "MLOps e infraestrutura"
    ],
    ctaTitle: "Explore a Tecnologia",
    ctaSubtitle: "Aprofunde-se nas tecnologias que estão moldando o futuro",
    seoTitle: "Blog Tecnologia IA | Inovações e Tendências | onsmartAI",
    seoDescription: "Explore as mais recentes inovações em IA. Machine learning, deep learning, NLP e computer vision. Conteúdo técnico para profissionais de tecnologia.",
    keywords: ["tecnologia IA", "machine learning", "deep learning", "inovação IA", "tendências tecnológicas"]
  },

  // Materiais Gratuitos
  {
    id: "guia-implementacao-ia",
    name: "Guia de Implementação de IA",
    slug: "guia-implementacao-ia",
    icon: "📚",
    description: "Guia completo para implementar IA na sua empresa do zero",
    category: 'material',
    heroTitle: "Guia Completo de Implementação de IA",
    heroSubtitle: "Tudo que você precisa saber para implementar IA na sua empresa com sucesso",
    heroImage: "/images/guia-implementacao.jpg",
    features: [
      {
        title: "Planejamento Estratégico",
        description: "Como criar um roadmap eficaz de implementação",
        benefits: [
          "Framework de avaliação de maturidade",
          "Templates de planejamento",
          "Checklist de pré-requisitos"
        ]
      },
      {
        title: "Seleção de Tecnologias",
        description: "Critérios para escolher as melhores soluções",
        benefits: [
          "Matriz de comparação de ferramentas",
          "Guia de fornecedores",
          "Análise custo-benefício"
        ]
      },
      {
        title: "Gestão de Mudanças",
        description: "Como conduzir a transformação organizacional",
        benefits: [
          "Estratégias de comunicação",
          "Plano de treinamento",
          "Métricas de sucesso"
        ]
      }
    ],
    downloadUrl: "/downloads/guia-implementacao-ia.pdf",
    ctaTitle: "Baixe o Guia Gratuito",
    ctaSubtitle: "Mais de 5.000 downloads e nota 4.8/5 pelos usuários",
    seoTitle: "Guia Implementação IA Gratuito | Como Implementar IA | onsmartAI",
    seoDescription: "Baixe grátis o guia completo para implementar IA na sua empresa. 50+ páginas com frameworks, templates e checklists. Mais de 5.000 downloads.",
    keywords: ["guia IA", "implementação IA", "material gratuito IA", "como implementar IA", "estratégia IA"]
  },
  {
    id: "ebook-roi-ia",
    name: "E-book: ROI em Projetos de IA",
    slug: "ebook-roi-ia",
    icon: "💰",
    description: "Como calcular e maximizar o retorno sobre investimento em IA",
    category: 'material',
    heroTitle: "ROI em Projetos de IA",
    heroSubtitle: "Aprenda a calcular, medir e maximizar o retorno dos seus investimentos em inteligência artificial",
    heroImage: "/images/ebook-roi.jpg",
    features: [
      {
        title: "Métricas Essenciais",
        description: "KPIs fundamentais para medir sucesso em IA",
        benefits: [
          "Dashboard de métricas",
          "Benchmarks da indústria",
          "Calculadora de ROI"
        ]
      },
      {
        title: "Cases Reais",
        description: "Exemplos práticos de ROI em diferentes setores",
        benefits: [
          "10+ cases detalhados",
          "Análise de resultados",
          "Lições aprendidas"
        ]
      },
      {
        title: "Frameworks de Avaliação",
        description: "Metodologias para avaliar projetos de IA",
        benefits: [
          "Matriz de priorização",
          "Análise de viabilidade",
          "Gestão de riscos"
        ]
      }
    ],
    downloadUrl: "/downloads/ebook-roi-ia.pdf",
    ctaTitle: "Baixe o E-book Gratuito",
    ctaSubtitle: "Descubra como empresas estão obtendo ROI de 300%+ com IA",
    seoTitle: "E-book ROI IA Gratuito | Como Calcular ROI IA | onsmartAI",
    seoDescription: "E-book gratuito sobre ROI em projetos de IA. Aprenda a calcular, medir e maximizar retorno. Cases reais com ROI de 300%+. Download grátis.",
    keywords: ["ROI IA", "retorno investimento IA", "ebook gratuito", "métricas IA", "casos sucesso IA"]
  },

  // Ferramentas Gratuitas
  {
    id: "calculadora-roi-ia",
    name: "Calculadora de ROI para IA",
    slug: "calculadora-roi-ia",
    icon: "🧮",
    description: "Ferramenta gratuita para calcular o ROI dos seus projetos de IA",
    category: 'ferramenta',
    heroTitle: "Calculadora de ROI para Projetos de IA",
    heroSubtitle: "Calcule o retorno sobre investimento dos seus projetos de IA de forma rápida e precisa",
    heroImage: "/images/calculadora-roi.jpg",
    features: [
      {
        title: "Cálculo Automático",
        description: "Insira os dados e obtenha o ROI instantaneamente",
        benefits: [
          "Fórmulas validadas pela indústria",
          "Múltiplos cenários de análise",
          "Relatório detalhado em PDF"
        ]
      },
      {
        title: "Comparação de Projetos",
        description: "Compare diferentes iniciativas de IA",
        benefits: [
          "Análise side-by-side",
          "Ranking de prioridades",
          "Matriz de decisão"
        ]
      },
      {
        title: "Projeções Futuras",
        description: "Estime o ROI ao longo do tempo",
        benefits: [
          "Projeções de 1-5 anos",
          "Análise de sensibilidade",
          "Cenários otimista/pessimista"
        ]
      }
    ],
    accessUrl: "/ferramentas/calculadora-roi-ia",
    ctaTitle: "Use a Calculadora Gratuita",
    ctaSubtitle: "Mais de 10.000 cálculos realizados com nossa ferramenta",
    seoTitle: "Calculadora ROI IA Gratuita | Calcule Retorno IA | onsmartAI",
    seoDescription: "Calculadora gratuita de ROI para projetos de IA. Calcule retorno, compare projetos e gere relatórios. Mais de 10.000 cálculos realizados. Use agora!",
    keywords: ["calculadora ROI IA", "ferramenta gratuita IA", "calcular retorno IA", "ROI projetos IA", "análise investimento IA"]
  },
  {
    id: "diagnostico-maturidade-ia",
    name: "Diagnóstico de Maturidade em IA",
    slug: "diagnostico-maturidade-ia",
    icon: "📊",
    description: "Avalie o nível de maturidade da sua empresa em inteligência artificial",
    category: 'ferramenta',
    heroTitle: "Diagnóstico de Maturidade em IA",
    heroSubtitle: "Descubra em que estágio sua empresa está na jornada de IA e receba recomendações personalizadas",
    heroImage: "/images/diagnostico-maturidade.jpg",
    features: [
      {
        title: "Avaliação Completa",
        description: "Questionário abrangente baseado em frameworks reconhecidos",
        benefits: [
          "50+ perguntas estratégicas",
          "5 dimensões de maturidade",
          "Benchmarking com mercado"
        ]
      },
      {
        title: "Relatório Personalizado",
        description: "Análise detalhada com recomendações específicas",
        benefits: [
          "Score de maturidade",
          "Gaps identificados",
          "Roadmap recomendado"
        ]
      },
      {
        title: "Comparação Setorial",
        description: "Veja como sua empresa se compara ao seu setor",
        benefits: [
          "Benchmarks da indústria",
          "Análise competitiva",
          "Oportunidades de diferenciação"
        ]
      }
    ],
    accessUrl: "/ferramentas/diagnostico-maturidade-ia",
    ctaTitle: "Faça o Diagnóstico Gratuito",
    ctaSubtitle: "Mais de 3.000 empresas já descobriram seu nível de maturidade em IA",
    seoTitle: "Diagnóstico Maturidade IA Gratuito | Avalie sua Empresa | onsmartAI",
    seoDescription: "Avalie gratuitamente o nível de maturidade da sua empresa em IA. Questionário completo, relatório personalizado e recomendações. 3.000+ empresas avaliadas.",
    keywords: ["diagnóstico maturidade IA", "avaliação IA empresa", "ferramenta gratuita", "nível maturidade IA", "assessment IA"]
  },

  // onsmartAI University
  {
    id: "ia-basico",
    name: "Inteligência Artificial Básico",
    slug: "ia-basico",
    icon: "🎯",
    description: "Introdução aos conceitos fundamentais de IA para iniciantes",
    category: 'university',
    heroTitle: "Curso: Inteligência Artificial Básico",
    heroSubtitle: "Domine os conceitos fundamentais de IA e prepare-se para a transformação digital",
    heroImage: "/images/curso-ia-basico.jpg",
    duration: "20 horas",
    level: "Iniciante",
    features: [
      {
        title: "Fundamentos Teóricos",
        description: "Base sólida em conceitos essenciais de IA",
        benefits: [
          "História e evolução da IA",
          "Tipos de inteligência artificial",
          "Machine Learning vs Deep Learning"
        ]
      },
      {
        title: "Aplicações Práticas",
        description: "Exemplos reais de uso de IA nos negócios",
        benefits: [
          "Cases de diferentes indústrias",
          "Demonstrações interativas",
          "Exercícios práticos"
        ]
      },
      {
        title: "Preparação Estratégica",
        description: "Como preparar sua organização para IA",
        benefits: [
          "Avaliação de oportunidades",
          "Planejamento de implementação",
          "Gestão de mudanças"
        ]
      }
    ],
    topics: [
      "Introdução à Inteligência Artificial",
      "Machine Learning Fundamentals",
      "Processamento de Linguagem Natural",
      "Computer Vision Básico",
      "IA nos Negócios",
      "Ética em IA",
      "Futuro da Inteligência Artificial"
    ],
    accessUrl: "/university/ia-basico",
    ctaTitle: "Comece Sua Jornada em IA",
    ctaSubtitle: "Mais de 5.000 alunos já se capacitaram com este curso",
    seoTitle: "Curso IA Básico | Aprenda Inteligência Artificial | onsmartAI University",
    seoDescription: "Curso básico de IA para iniciantes. 20h de conteúdo, certificado incluso, exemplos práticos. Mais de 5.000 alunos formados. Comece hoje!",
    keywords: ["curso IA básico", "aprender IA", "inteligência artificial iniciantes", "onsmartAI university", "certificação IA"]
  },
  {
    id: "agentes-ia",
    name: "Agentes de IA na Prática",
    slug: "agentes-ia",
    icon: "🤖",
    description: "Passo a passo para implementar agentes de IA no seu negócio",
    category: 'university',
    heroTitle: "Curso: Agentes de IA na Prática",
    heroSubtitle: "Aprenda a criar e implementar agentes de IA que transformam processos empresariais",
    heroImage: "/images/curso-agentes-ia.jpg",
    duration: "30 horas",
    level: "Intermediário",
    features: [
      {
        title: "Desenvolvimento Hands-on",
        description: "Construa agentes reais durante o curso",
        benefits: [
          "Projetos práticos",
          "Código reutilizável",
          "Portfolio de agentes"
        ]
      },
      {
        title: "Integração Empresarial",
        description: "Como integrar agentes aos sistemas existentes",
        benefits: [
          "APIs e webhooks",
          "Fluxos de trabalho",
          "Monitoramento e manutenção"
        ]
      },
      {
        title: "Casos Avançados",
        description: "Agentes especializados por setor",
        benefits: [
          "Agentes conversacionais",
          "Automação de processos",
          "Análise preditiva"
        ]
      }
    ],
    topics: [
      "Arquitetura de Agentes de IA",
      "Processamento de Linguagem Natural",
      "Integração com APIs",
      "Treinamento de Modelos",
      "Deployment e Monitoramento",
      "Agentes Conversacionais",
      "Automação de Processos",
      "Casos de Uso Empresariais"
    ],
    accessUrl: "/university/agentes-ia",
    ctaTitle: "Domine os Agentes de IA",
    ctaSubtitle: "Mais de 2.000 profissionais já implementaram agentes com sucesso",
    seoTitle: "Curso Agentes IA | Implementação Prática | onsmartAI University",
    seoDescription: "Curso prático de agentes de IA. 30h de conteúdo hands-on, projetos reais, certificado. 2.000+ profissionais formados. Implemente agentes hoje!",
    keywords: ["agentes IA", "curso prático IA", "implementação agentes", "automação processos", "chatbots empresariais"]
  }
];

export const getContentBySlug = (slug: string): ContentData | undefined => {
  return contentData.find(content => content.slug === slug);
};

export const getContentById = (id: string): ContentData | undefined => {
  return contentData.find(content => content.id === id);
};

export const getContentByCategory = (category: ContentData['category']): ContentData[] => {
  return contentData.filter(content => content.category === category);
};

