export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorBio?: string; // Add the missing authorBio property as optional
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  category: string;
  image?: string;
  slug: string;
  views: number;
  likes: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "agentes-ia-produtividade-empresarial",
    title: "Como os Agentes de IA estão revolucionando a produtividade corporativa",
    excerpt: "Descubra como empresas estão aumentando sua eficiência em 200% com implementação estratégica de agentes de IA.",
    content: `
      <p>A inteligência artificial não é mais uma tecnologia do futuro - ela está transformando empresas hoje. Agentes de IA estão sendo implementados em organizações de todos os tamanhos, gerando resultados impressionantes de produtividade e eficiência.</p>
      
      <h2>O que são Agentes de IA?</h2>
      <p>Agentes de IA são sistemas autônomos capazes de realizar tarefas complexas, tomar decisões baseadas em dados e aprender continuamente. Diferentemente de chatbots simples, esses agentes podem interagir com múltiplos sistemas e executar workflows completos.</p>
      
      <h2>Casos de Uso Transformadores</h2>
      <ul>
        <li>Automação de processos administrativos</li>
        <li>Análise preditiva de vendas</li>
        <li>Atendimento ao cliente 24/7</li>
        <li>Gestão inteligente de recursos</li>
      </ul>
      
      <h2>Resultados Mensuráveis</h2>
      <p>Empresas que implementaram agentes de IA relatam aumentos médios de 200% na produtividade, redução de 60% em tarefas repetitivas e melhoria de 85% na satisfação dos funcionários.</p>
    `,
    author: "Maria Silva",
    authorRole: "Especialista em IA Empresarial",
    date: "2024-01-15",
    readTime: "8 min",
    featured: true,
    tags: ["Agentes de IA", "Produtividade", "Automação", "ROI"],
    category: "tendencias",
    views: 1250,
    likes: 89,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "2",
    slug: "implementacao-agentes-ia-passo-passo",
    title: "Guia Completo: Implementando Agentes de IA em sua Empresa",
    excerpt: "Um roadmap prático para implementar agentes de IA, desde o planejamento até a medição de resultados.",
    content: `
      <p>A implementação bem-sucedida de agentes de IA requer planejamento estratégico e execução cuidadosa. Este guia oferece um roadmap comprovado.</p>
      
      <h2>Fase 1: Diagnóstico e Planejamento</h2>
      <p>Antes de implementar qualquer solução de IA, é crucial entender os processos atuais e identificar oportunidades de melhoria.</p>
      
      <h2>Fase 2: Desenvolvimento e Configuração</h2>
      <p>Desenvolvimento customizado dos agentes baseado nas necessidades específicas da empresa.</p>
      
      <h2>Fase 3: Implementação e Treinamento</h2>
      <p>Rollout gradual com treinamento completo da equipe e monitoramento contínuo.</p>
    `,
    author: "João Santos",
    authorRole: "Consultor em Transformação Digital",
    date: "2024-01-12",
    readTime: "12 min",
    featured: false,
    tags: ["Implementação", "Guia Prático", "Transformação Digital"],
    category: "implementacao",
    views: 980,
    likes: 67,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "3",
    slug: "case-sucesso-financeira-agentes-ia",
    title: "Case de Sucesso: Como a FinTech Brasil economizou R$ 2 milhões com Agentes de IA",
    excerpt: "História completa de transformação: processos, desafios, soluções e resultados mensuráveis.",
    content: `
      <p>A FinTech Brasil enfrentava desafios críticos de escalabilidade. Com o crescimento acelerado, processos manuais se tornaram gargalos operacionais.</p>
      
      <h2>O Desafio</h2>
      <p>Análise manual de crédito consumia 4 horas por processo, limitando a capacidade de crescimento.</p>
      
      <h2>A Solução</h2>
      <p>Implementação de agentes de IA para análise automática de risco, processamento de documentos e tomada de decisão.</p>
      
      <h2>Resultados</h2>
      <ul>
        <li>Redução de 4 horas para 15 minutos no processo de análise</li>
        <li>Economia anual de R$ 2 milhões</li>
        <li>Aumento de 300% na capacidade de processamento</li>
      </ul>
    `,
    author: "Ana Costa",
    authorRole: "Analista de Cases de Sucesso",
    date: "2024-01-10",
    readTime: "10 min",
    featured: false,
    tags: ["Case de Sucesso", "FinTech", "ROI", "Análise de Crédito"],
    category: "casos",
    views: 1450,
    likes: 112,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "4",
    slug: "futuro-trabalho-agentes-ia-2024",
    title: "O Futuro do Trabalho: Como os Agentes de IA vão transformar carreiras em 2024",
    excerpt: "Análise das tendências emergentes e como profissionais podem se preparar para a revolução da IA.",
    content: `
      <p>O mercado de trabalho está passando por uma transformação sem precedentes. Agentes de IA não estão apenas automatizando tarefas - estão criando novas oportunidades.</p>
      
      <h2>Novas Profissões Emergentes</h2>
      <p>Especialistas em prompt engineering, treinadores de IA e orquestradores de agentes são algumas das profissões mais demandadas.</p>
      
      <h2>Habilidades do Futuro</h2>
      <ul>
        <li>Colaboração humano-IA</li>
        <li>Pensamento crítico amplificado</li>
        <li>Gestão de sistemas inteligentes</li>
      </ul>
      
      <h2>Como se Preparar</h2>
      <p>Investimento em aprendizado contínuo e desenvolvimento de habilidades complementares à IA.</p>
    `,
    author: "Pedro Oliveira",
    authorRole: "Futurista Digital",
    date: "2024-01-08",
    readTime: "15 min",
    featured: false,
    tags: ["Futuro do Trabalho", "Carreiras", "Tendências", "Upskilling"],
    category: "futuro",
    views: 2100,
    likes: 156,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "5",
    slug: "agentes-ia-atendimento-cliente-24h",
    title: "Agentes de IA para Atendimento ao Cliente: Disponibilidade 24/7 com Qualidade Humana",
    excerpt: "Como implementar atendimento automatizado que mantém a qualidade e satisfação do cliente.",
    content: `
      <p>O atendimento ao cliente evoluiu dramaticamente com agentes de IA capazes de fornecer suporte 24/7 mantendo qualidade humana.</p>
      
      <h2>Benefícios Imediatos</h2>
      <ul>
        <li>Disponibilidade 24 horas por dia</li>
        <li>Respostas consistentes e precisas</li>
        <li>Redução de 70% no tempo de espera</li>
        <li>Escalabilidade ilimitada</li>
      </ul>
      
      <h2>Implementação Estratégica</h2>
      <p>A chave está na integração inteligente entre agentes de IA e atendentes humanos, criando uma experiência híbrida otimizada.</p>
    `,
    author: "Carla Mendes",
    authorRole: "Especialista em Customer Success",
    date: "2024-01-06",
    readTime: "7 min",
    featured: false,
    tags: ["Atendimento ao Cliente", "Customer Success", "Automação"],
    category: "implementacao",
    views: 890,
    likes: 54,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "6",
    slug: "roi-agentes-ia-calculo-retorno-investimento",
    title: "Calculando o ROI de Agentes de IA: Métricas e Metodologias Comprovadas",
    excerpt: "Framework completo para medir e maximizar o retorno do investimento em agentes de IA.",
    content: `
      <p>Medir o ROI de agentes de IA vai além de métricas tradicionais. É necessário considerar benefícios tangíveis e intangíveis.</p>
      
      <h2>Métricas Principais</h2>
      <ul>
        <li>Redução de custos operacionais</li>
        <li>Aumento de produtividade</li>
        <li>Melhoria na qualidade</li>
        <li>Satisfação do cliente</li>
      </ul>
      
      <h2>Framework de Cálculo</h2>
      <p>Metodologia estruturada para quantificar benefícios e calcular payback period realista.</p>
    `,
    author: "Roberto Lima",
    authorRole: "Analista Financeiro",
    date: "2024-01-04",
    readTime: "11 min",
    featured: false,
    tags: ["ROI", "Métricas", "Análise Financeira", "KPIs"],
    category: "tendencias",
    views: 1100,
    likes: 78,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
  }
];

export const blogCategories = {
  recentes: "Artigos Recentes",
  tendencias: "Tendências em IA",
  casos: "Cases de Sucesso",
  implementacao: "Guias de Implementação",
  futuro: "Futuro da IA"
};

export const allTags = [
  "Agentes de IA",
  "Produtividade", 
  "Automação",
  "ROI",
  "Implementação",
  "Transformação Digital",
  "Case de Sucesso",
  "FinTech",
  "Atendimento ao Cliente",
  "Customer Success",
  "Futuro do Trabalho",
  "Carreiras",
  "Tendências",
  "Upskilling",
  "Métricas",
  "Análise Financeira",
  "KPIs",
  "Guia Prático"
];
