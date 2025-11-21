interface PageMetaResult {
  title: string;
  description: string;
  keywords: string;
}

export const getPageMeta = (pathname: string, title?: string, description?: string, keywords?: string): PageMetaResult => {
  switch (pathname) {
    case '/':
      return {
        title: title || "onsmartai - Início",
        description: description || "Transforme sua empresa com Agentes de IA e aumente a produtividade em até 420%. Metodologia LÍDER comprovada, implementação em 30 dias e ROI garantido. Diagnóstico gratuito para sua empresa.",
        keywords: keywords || "agentes de ia, inteligência artificial, automação empresarial, transformação digital, ia corporativa, produtividade, metodologia líder, roi inteligencia artificial"
      };
    case '/servicos':
      return {
        title: title || "onsmartai - Serviços",
        description: description || "Descubra nossos serviços especializados em IA empresarial: consultoria estratégica, desenvolvimento de Agentes de IA personalizados, implementação da metodologia LÍDER e suporte 24/7. Resultados em 30 dias.",
        keywords: keywords || "serviços ia, consultoria ia, implementação agentes ia, metodologia líder, automação processos, desenvolvimento ia personalizado, suporte ia empresarial"
      };
    case '/case-de-sucesso':
      return {
        title: title || "onsmartai - Cases de Sucesso",
        description: description || "Conheça cases reais de empresas que transformaram seus resultados com nossos Agentes de IA: aumento de produtividade de até 420%, redução de custos de 60% e implementação em apenas 30 dias. Resultados comprovados em todos os setores.",
        keywords: keywords || "cases sucesso ia, resultados ia, produtividade ia, roi inteligencia artificial, estudos caso, transformação digital, empresas ia, sucesso agentes ia"
      };
    case '/contato':
      return {
        title: title || "onsmartai - Contato",
        description: description || "Fale com nossos especialistas em IA empresarial. Agende seu diagnóstico gratuito e descubra como aumentar sua produtividade em 420%. Consultoria personalizada, implementação rápida e resultados garantidos.",
        keywords: keywords || "contato ia, especialistas ia, diagnóstico gratuito, consultoria ia, implementação agentes, transformação empresarial, especialistas agentes ia"
      };
    case '/diagnostico':
      return {
        title: title || "onsmartai - Diagnóstico",
        description: description || "Receba um diagnóstico completo e gratuito do potencial de IA na sua empresa. Análise personalizada em 24h, roadmap estratégico e estimativa de ROI. Descubra como aumentar sua produtividade em até 420%.",
        keywords: keywords || "diagnóstico ia gratuito, análise potencial ia, avaliação empresa ia, consulta gratuita, roadmap ia, estimativa roi, análise produtividade"
      };
    case '/conteudo':
    case '/materiais-gratuitos':
    case '/ferramentas-gratuitas':
    case '/glossario-ia':
      return {
        title: title || "onsmartai - Conteúdo",
        description: description || "Acesse nosso hub completo de conteúdo sobre IA empresarial: e-books exclusivos, ferramentas gratuitas, glossário especializado e materiais educativos. Tudo que você precisa para entender e implementar IA na sua empresa.",
        keywords: keywords || "conteúdo ia, e-books ia, ferramentas gratuitas, glossário ia, educação empresarial, materiais ia, recursos gratuitos, aprendizado ia"
      };
    case '/blog':
      return {
        title: title || "onsmartai - Blog",
        description: description || "Acompanhe as últimas tendências, insights exclusivos e novidades sobre Inteligência Artificial empresarial. Conteúdo especializado atualizado semanalmente por nossos experts em IA.",
        keywords: keywords || "blog ia, tendências ia, insights inteligencia artificial, novidades ia empresarial, artigos ia, conteúdo especializado, ia corporativa"
      };
    case '/planos':
      return {
        title: title || "onsmartai - Planos",
        description: description || "Conheça nossos planos de implementação de Agentes de IA: desde startups até grandes corporações. Preços transparentes, ROI garantido e metodologia LÍDER comprovada. Consulte condições especiais.",
        keywords: keywords || "planos ia, preços agentes ia, implementação ia empresarial, investimento ia, roi garantido, planos empresariais ia"
      };
    
    // Páginas de Soluções
    case '/solucoes/automacao-vendas':
      return {
        title: title || "onsmartai - Automação de Vendas",
        description: description || "Automatize seu processo de vendas com IA avançada. Aumente conversões, qualifique leads automaticamente e otimize seu funil de vendas com nossa solução inteligente.",
        keywords: keywords || "automação vendas, ia vendas, crm inteligente, qualificação leads, funil vendas, conversão vendas"
      };
    case '/solucoes/atendimento-inteligente':
      return {
        title: title || "onsmartai - Atendimento Inteligente",
        description: description || "Revolucione seu atendimento ao cliente com IA. Chatbots inteligentes, análise de sentimento e atendimento 24/7 para melhorar a experiência do cliente.",
        keywords: keywords || "atendimento inteligente, chatbot ia, atendimento cliente, ia atendimento, suporte automatizado"
      };
    case '/solucoes/rh-inteligente':
      return {
        title: title || "onsmartai - RH Inteligente",
        description: description || "Transforme seu RH com IA. Recrutamento inteligente, análise de performance, gestão de talentos e automação de processos de recursos humanos.",
        keywords: keywords || "rh inteligente, recrutamento ia, gestão talentos, análise performance, automação rh"
      };
    case '/solucoes/bi-analytics':
      return {
        title: title || "onsmartai - BI Analytics",
        description: description || "Transforme dados em insights acionáveis com nossa plataforma de Business Intelligence. Dashboards inteligentes, relatórios automáticos e previsões precisas.",
        keywords: keywords || "bi analytics, business intelligence, dashboards inteligentes, análise dados, relatórios automáticos"
      };
    case '/solucoes/automacao-processos':
      return {
        title: title || "onsmartai - Automação de Processos",
        description: description || "Automatize processos empresariais complexos com IA. Reduza custos operacionais, elimine erros manuais e aumente a eficiência organizacional.",
        keywords: keywords || "automação processos, rpa, processos empresariais, eficiência operacional, otimização processos"
      };
    case '/solucoes/voz-linguagem':
      return {
        title: title || "onsmartai - Voz e Linguagem",
        description: description || "Implemente soluções de processamento de linguagem natural e reconhecimento de voz. Transcrição automática, análise de sentimento e assistentes virtuais.",
        keywords: keywords || "processamento linguagem natural, reconhecimento voz, nlp, transcrição automática, assistentes virtuais"
      };
    
    // Páginas de Produtos IBM
    case '/produtos/ai-code-assistant':
      return {
        title: title || "onsmartai - AI Code Assistant",
        description: description || "Acelere o desenvolvimento de software com assistente de código baseado em IA. Sugestões inteligentes, debugging automático e produtividade máxima para desenvolvedores.",
        keywords: keywords || "ai code assistant, desenvolvimento software, assistente código, ia programação, produtividade desenvolvedor"
      };
    case '/produtos/granite':
      return {
        title: title || "onsmartai - Granite",
        description: description || "Modelo de linguagem empresarial IBM Granite. Soluções de IA generativa para empresas com foco em segurança, privacidade e performance empresarial.",
        keywords: keywords || "granite ibm, modelo linguagem, ia generativa, linguagem natural, modelo empresarial"
      };
    case '/produtos/watsonx-ai':
      return {
        title: title || "onsmartai - WatsonX AI",
        description: description || "Plataforma completa de IA empresarial IBM WatsonX. Desenvolva, treine e implemente modelos de IA com segurança e escalabilidade empresarial.",
        keywords: keywords || "watsonx ai, ibm watson, plataforma ia, desenvolvimento modelos ia, ia empresarial"
      };
    case '/produtos/watsonx-data':
      return {
        title: title || "onsmartai - WatsonX Data",
        description: description || "Gestão inteligente de dados com WatsonX Data. Preparação, governança e análise de dados em escala empresarial com IA avançada.",
        keywords: keywords || "watsonx data, gestão dados, governança dados, preparação dados, análise dados ia"
      };
    case '/produtos/watsonx-orchestrate':
      return {
        title: title || "onsmartai - WatsonX Orchestrate",
        description: description || "Orquestração inteligente de workflows com WatsonX Orchestrate. Automatize processos complexos e coordene sistemas com IA.",
        keywords: keywords || "watsonx orchestrate, orquestração workflows, automação processos, coordenação sistemas"
      };
    case '/produtos/watsonx-governance':
      return {
        title: title || "onsmartai - WatsonX Governance",
        description: description || "Governança completa de IA com WatsonX Governance. Controle, monitoramento e compliance para implementações de IA empresarial.",
        keywords: keywords || "watsonx governance, governança ia, compliance ia, monitoramento ia, controle ia"
      };
    case '/produtos/meta-llama':
      return {
        title: title || "onsmartai - Meta Llama",
        description: description || "Modelo de linguagem Meta Llama para aplicações empresariais. IA generativa de código aberto com foco em performance e flexibilidade.",
        keywords: keywords || "meta llama, modelo linguagem, ia generativa, código aberto, linguagem natural"
      };
    case '/produtos/knowledge-catalog':
      return {
        title: title || "onsmartai - Knowledge Catalog",
        description: description || "Catálogo inteligente de conhecimento empresarial. Organize, descubra e gerencie ativos de dados com IA e metadados avançados.",
        keywords: keywords || "knowledge catalog, catálogo conhecimento, gestão conhecimento, metadados, descoberta dados"
      };
    case '/produtos/data-product-hub':
      return {
        title: title || "onsmartai - Data Product Hub",
        description: description || "Hub centralizado para produtos de dados. Desenvolva, compartilhe e monetize produtos de dados com governança e qualidade garantidas.",
        keywords: keywords || "data product hub, produtos dados, hub dados, monetização dados, produtos analíticos"
      };
    case '/produtos/datastage':
      return {
        title: title || "onsmartai - DataStage",
        description: description || "Plataforma de integração de dados IBM DataStage. ETL/ELT empresarial com alta performance e escalabilidade para grandes volumes de dados.",
        keywords: keywords || "datastage ibm, integração dados, etl, elt, transformação dados, pipeline dados"
      };
    case '/produtos/planning-analytics':
      return {
        title: title || "onsmartai - Planning Analytics",
        description: description || "Planejamento e análise empresarial com IBM Planning Analytics. Orçamento, previsão e análise de cenários com IA e machine learning.",
        keywords: keywords || "planning analytics, planejamento empresarial, orçamento, previsão, análise cenários"
      };
    case '/produtos/mistral':
      return {
        title: title || "onsmartai - Mistral",
        description: description || "Modelo de linguagem Mistral para aplicações empresariais. IA generativa eficiente e precisa para diversos casos de uso corporativo.",
        keywords: keywords || "mistral ai, modelo linguagem, ia generativa, linguagem natural, modelo eficiente"
      };
    case '/produtos/manta-data-lineage':
      return {
        title: title || "onsmartai - Manta Data Lineage",
        description: description || "Rastreamento completo de linhagem de dados com Manta. Visibilidade total do fluxo de dados e impacto de mudanças em sistemas empresariais.",
        keywords: keywords || "manta data lineage, linhagem dados, rastreamento dados, fluxo dados, impacto mudanças"
      };
    case '/produtos/databand':
      return {
        title: title || "onsmartai - Databand",
        description: description || "Observabilidade de dados com Databand. Monitoramento, debugging e otimização de pipelines de dados em tempo real.",
        keywords: keywords || "databand, observabilidade dados, monitoramento dados, debugging dados, pipeline dados"
      };
    case '/produtos/streamsets':
      return {
        title: title || "onsmartai - StreamSets",
        description: description || "Plataforma de integração de dados StreamSets. Conecte, transforme e mova dados entre sistemas com interface visual e automação inteligente.",
        keywords: keywords || "streamsets, integração dados, transformação dados, interface visual, automação dados"
      };
    case '/produtos/guardium-data-security-center':
      return {
        title: title || "onsmartai - Guardium Data Security Center",
        description: description || "Centro de segurança de dados IBM Guardium. Proteção, monitoramento e compliance para dados sensíveis em ambientes híbridos.",
        keywords: keywords || "guardium, segurança dados, proteção dados, compliance dados, monitoramento segurança"
      };
    case '/produtos/storage-ceph':
      return {
        title: title || "onsmartai - Storage Ceph",
        description: description || "Solução de armazenamento distribuído IBM Storage Ceph. Escalabilidade, performance e confiabilidade para grandes volumes de dados.",
        keywords: keywords || "storage ceph, armazenamento distribuído, escalabilidade dados, performance armazenamento"
      };
    case '/produtos/watsonx-code-assistant':
      return {
        title: title || "onsmartai - WatsonX Code Assistant",
        description: description || "Assistente de código WatsonX para desenvolvedores. IA generativa para desenvolvimento, debugging e otimização de código empresarial.",
        keywords: keywords || "watsonx code assistant, assistente código, desenvolvimento software, ia programação"
      };
    
    // Páginas de Revendas
    case '/revendas':
      return {
        title: title || "onsmartai - Revendas",
        description: description || "Torne-se um parceiro revendedor onsmartai. Oportunidades de negócio, comissões atrativas e suporte completo para revenda de soluções de IA.",
        keywords: keywords || "revendas ia, parceiro revendedor, oportunidades negócio, comissões revenda, parceiro ia"
      };
    case '/revendas/beneficios':
      return {
        title: title || "onsmartai - Benefícios Revendas",
        description: description || "Descubra os benefícios de ser um revendedor onsmartai. Comissões competitivas, treinamento especializado e suporte técnico completo.",
        keywords: keywords || "benefícios revendas, comissões revenda, treinamento revendedor, suporte revendas"
      };
    case '/revendas/cadastro':
      return {
        title: title || "onsmartai - Cadastro Revendas",
        description: description || "Cadastre-se como revendedor onsmartai. Preencha o formulário e inicie sua jornada como parceiro de soluções de IA empresarial.",
        keywords: keywords || "cadastro revendas, formulário revendedor, parceiro ia, registro revendas"
      };
    
    // Páginas de Agentes Digitais
    case '/agentes-digitais':
      return {
        title: title || "onsmartai - Agentes Digitais",
        description: description || "Conheça nossa plataforma de Agentes Digitais. Automatize atendimento, vendas e processos com IA conversacional avançada.",
        keywords: keywords || "agentes digitais, ia conversacional, automação atendimento, chatbot avançado, agentes virtuais"
      };
    case '/agentes-digitais/comissoes':
      return {
        title: title || "onsmartai - Comissões Agentes",
        description: description || "Programa de comissões para Agentes Digitais. Ganhe comissões atrativas vendendo soluções de IA conversacional para empresas.",
        keywords: keywords || "comissões agentes, programa comissões, ganhar comissões, vendas agentes ia"
      };
    case '/agentes-digitais/cadastro':
      return {
        title: title || "onsmartai - Cadastro Agentes",
        description: description || "Cadastre-se como Agente Digital onsmartai. Acesse nossa plataforma e comece a vender soluções de IA conversacional.",
        keywords: keywords || "cadastro agentes, registro agentes, plataforma agentes, venda agentes ia"
      };
    
    // Páginas de Setores
    case '/setores':
      return {
        title: title || "onsmartai - Setores",
        description: description || "Soluções de IA especializadas por setor. Descubra como transformar seu segmento com inteligência artificial personalizada.",
        keywords: keywords || "setores ia, soluções setoriais, ia por setor, transformação setorial, especialização setor"
      };
    
    // Páginas de University
    case '/university/ia-basico':
      return {
        title: title || "onsmartai - IA Básico",
        description: description || "Curso básico de Inteligência Artificial. Aprenda os fundamentos da IA empresarial com especialistas e pratique com casos reais.",
        keywords: keywords || "curso ia básico, fundamentos ia, aprendizado ia, educação ia, curso básico ia"
      };
    case '/university/agentes-ia':
      return {
        title: title || "onsmartai - Agentes IA",
        description: description || "Curso especializado em Agentes de IA. Domine a criação e implementação de agentes inteligentes para empresas.",
        keywords: keywords || "curso agentes ia, especialização agentes, criação agentes, implementação agentes ia"
      };
    
    // Páginas Institucionais
    case '/sobre':
      return {
        title: title || "onsmartai - Sobre",
        description: description || "Conheça a história da onsmartai. Pioneiros em IA empresarial no Brasil, transformando empresas com metodologia própria e resultados comprovados.",
        keywords: keywords || "sobre onsmartai, história empresa, pioneiros ia, metodologia própria, empresa ia brasil"
      };
    case '/agentes-ia':
      return {
        title: title || "onsmartai - Agentes IA",
        description: description || "Descubra nossa plataforma de Agentes de IA. Soluções conversacionais inteligentes para automatizar processos empresariais.",
        keywords: keywords || "agentes ia, plataforma agentes, ia conversacional, automação processos, agentes inteligentes"
      };
    case '/ecossistema-ibm':
      return {
        title: title || "onsmartai - Ecossistema IBM",
        description: description || "Parceiro oficial IBM para soluções de IA empresarial. Acesse o ecossistema completo de tecnologias IBM com suporte especializado.",
        keywords: keywords || "ecossistema ibm, parceiro ibm, tecnologias ibm, soluções ibm, parceiro oficial ibm"
      };
    case '/admin':
      return {
        title: title || "onsmartai - Admin",
        description: description || "Área administrativa onsmartai. Painel de controle para gestão de usuários, configurações e monitoramento do sistema.",
        keywords: keywords || "admin onsmartai, painel admin, gestão sistema, controle admin, administração"
      };
    
    // Páginas Legais
    case '/politica-privacidade':
      return {
        title: title || "onsmartai - Política de Privacidade",
        description: description || "Política de Privacidade onsmartai. Conheça como protegemos e tratamos seus dados pessoais com transparência e segurança.",
        keywords: keywords || "política privacidade, proteção dados, privacidade dados, lgpd, segurança dados"
      };
    case '/termos-uso':
      return {
        title: title || "onsmartai - Termos de Uso",
        description: description || "Termos de Uso onsmartai. Condições e regras para uso de nossos serviços e plataforma de IA empresarial.",
        keywords: keywords || "termos uso, condições uso, regras uso, termos serviço, condições plataforma"
      };
    
    // Páginas de Blog
    case '/blog/:slug':
      return {
        title: title || "onsmartai - Blog Post",
        description: description || "Artigo especializado sobre Inteligência Artificial empresarial. Insights exclusivos e tendências do mercado de IA.",
        keywords: keywords || "artigo ia, blog post ia, insights ia, tendências ia, conteúdo especializado"
      };
    
    // Páginas de Serviços Dinâmicos
    case '/servicos/:slug':
      return {
        title: title || "onsmartai - Serviço",
        description: description || "Serviço especializado de IA empresarial. Soluções personalizadas para transformar sua empresa com inteligência artificial.",
        keywords: keywords || "serviço ia, solução ia, implementação ia, consultoria ia, serviço personalizado"
      };
    
    // Páginas de Setores Dinâmicos
    case '/setores/:slug':
      return {
        title: title || "onsmartai - Setor",
        description: description || "Solução de IA especializada para seu setor. Transforme sua empresa com inteligência artificial personalizada para seu segmento.",
        keywords: keywords || "setor ia, solução setorial, ia especializada, transformação setor, personalização setor"
      };
    
    default:
      return {
        title: title || "onsmartai - Página",
        description: description || "Somos especialistas em transformação empresarial com Agentes de IA. Metodologia própria LÍDER, ROI comprovado de 420% e implementação em 30 dias. Transforme sua empresa com IA de forma inteligente e eficaz.",
        keywords: keywords || "agentes ia, inteligência artificial empresarial, automação, transformação digital, líder mercado ia, especialistas ia brasil"
      };
  }
};
