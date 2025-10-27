
import { useState, useEffect } from 'react';

interface PersonalizationData {
  sector: string;
  companySize: string;
  role: string;
  interests: string[];
}

interface PersonalizedContent {
  headline: string;
  benefits: string[];
  caseStudies: string[];
  ctaText: string;
  socialProof: string;
}

const SECTOR_CONTENT: Record<string, PersonalizedContent> = {
  technology: {
    headline: 'Acelere seu desenvolvimento com Agentes de IA especializados em Tech',
    benefits: [
      'Automatize code reviews e testing',
      'IA para DevOps e deploy contínuo',
      'Agentes especializados em arquitetura de software'
    ],
    caseStudies: ['tech-startup-case', 'saas-company-case'],
    ctaText: 'Implementar IA no meu time Tech',
    socialProof: '120+ empresas de tecnologia já transformaram seus processos'
  },
  healthcare: {
    headline: 'Revolucione a gestão médica com IA segura e certificada',
    benefits: [
      'Automatize agendamentos e prontuários',
      'IA para análise de exames e diagnósticos',
      'Gestão inteligente de estoque médico'
    ],
    caseStudies: ['hospital-case', 'clinic-management-case'],
    ctaText: 'Modernizar minha instituição de saúde',
    socialProof: '50+ instituições de saúde confiam em nossa IA'
  },
  finance: {
    headline: 'Domine o mercado financeiro com IA de alta performance',
    benefits: [
      'Automatize análise de crédito e risco',
      'IA para detecção de fraudes em tempo real',
      'Agentes especializados em trading e investimentos'
    ],
    caseStudies: ['bank-automation-case', 'fintech-growth-case'],
    ctaText: 'Otimizar operações financeiras com IA',
    socialProof: '80+ instituições financeiras aumentaram ROI em 400%'
  },
  retail: {
    headline: 'Multiplique suas vendas com IA personalizada para varejo',
    benefits: [
      'Automatize gestão de estoque e pricing',
      'IA para recomendações personalizadas',
      'Agentes de atendimento 24/7 para e-commerce'
    ],
    caseStudies: ['ecommerce-boost-case', 'retail-chain-case'],
    ctaText: 'Aumentar vendas com IA no varejo',
    socialProof: '200+ lojas já aumentaram vendas em 250% com nossa IA'
  },
  education: {
    headline: 'Transforme a educação com IA pedagógica avançada',
    benefits: [
      'Automatize correção e feedback personalizado',
      'IA para gestão acadêmica inteligente',
      'Agentes tutores adaptativos para alunos'
    ],
    caseStudies: ['university-digital-case', 'online-school-case'],
    ctaText: 'Modernizar educação com IA',
    socialProof: '150+ instituições educacionais já adotaram nossa metodologia'
  },
  manufacturing: {
    headline: 'Otimize produção industrial com IA de última geração',
    benefits: [
      'Automatize controle de qualidade e manutenção',
      'IA para previsão de demanda e supply chain',
      'Agentes especializados em otimização de processos'
    ],
    caseStudies: ['factory-automation-case', 'supply-chain-case'],
    ctaText: 'Otimizar produção industrial',
    socialProof: '75+ indústrias reduziram custos em 35% e aumentaram produção'
  }
};

const COMPANY_SIZE_CONTENT: Record<string, Partial<PersonalizedContent>> = {
  startup: {
    headline: 'Da startup ao unicórnio: escale com IA desde o dia 1',
    socialProof: 'Startups que implementaram IA cresceram 300% mais rápido'
  },
  small: {
    headline: 'Compete com gigantes: pequenas empresas dominando com IA',
    socialProof: 'PMEs com IA superam concorrentes 5x maiores'
  },
  medium: {
    headline: 'Da média empresa à líder de mercado com IA estratégica',
    socialProof: 'Empresas médias com IA se tornaram líderes em seus setores'
  },
  large: {
    headline: 'Mantenha liderança: grandes corporações inovando com IA',
    socialProof: 'Corporações com nossa IA mantiveram vantagem competitiva'
  }
};

export const usePersonalization = () => {
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar dados de personalização salvos
    const savedData = localStorage.getItem('user_personalization');
    if (savedData) {
      try {
        setPersonalizationData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading personalization data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const updatePersonalization = (data: Partial<PersonalizationData>) => {
    const newData = { ...personalizationData, ...data } as PersonalizationData;
    setPersonalizationData(newData);
    localStorage.setItem('user_personalization', JSON.stringify(newData));
  };

  const getPersonalizedContent = (): PersonalizedContent => {
    if (!personalizationData?.sector) {
      // Default content se não houver personalização
      return {
        headline: 'Transforme sua empresa em uma Potência de IA em 30 dias',
        benefits: [
          'Automatize processos críticos',
          'Aumente produtividade em 400%',
          'Reduza custos operacionais'
        ],
        caseStudies: ['general-case-1', 'general-case-2'],
        ctaText: 'Implementar IA na minha empresa',
        socialProof: '500+ empresas já transformaram seus resultados'
      };
    }

    const sectorContent = SECTOR_CONTENT[personalizationData.sector];
    const sizeContent = COMPANY_SIZE_CONTENT[personalizationData.companySize];

    return {
      ...sectorContent,
      ...sizeContent,
      headline: sizeContent?.headline || sectorContent.headline,
      socialProof: sizeContent?.socialProof || sectorContent.socialProof
    };
  };

  const detectSectorFromForm = (formData: any) => {
    const sectorKeywords = {
      technology: ['tech', 'software', 'desenvolvimento', 'programação', 'sistema'],
      healthcare: ['saúde', 'médico', 'hospital', 'clínica', 'farmácia'],
      finance: ['banco', 'financeira', 'investimento', 'crédito', 'fintech'],
      retail: ['varejo', 'loja', 'ecommerce', 'vendas', 'comércio'],
      education: ['educação', 'escola', 'universidade', 'ensino', 'curso'],
      manufacturing: ['indústria', 'fábrica', 'produção', 'manufatura', 'industrial']
    };

    const text = `${formData.empresa || ''} ${formData.setor || ''} ${formData.mensagem || ''}`.toLowerCase();
    
    for (const [sector, keywords] of Object.entries(sectorKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        updatePersonalization({ sector });
        return sector;
      }
    }

    return null;
  };

  const trackPersonalizationEvent = (eventType: string, data: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'personalization', {
        event_type: eventType,
        sector: personalizationData?.sector,
        company_size: personalizationData?.companySize,
        custom_parameter_1: JSON.stringify(data)
      });
    }
  };

  return {
    personalizationData,
    isLoading,
    updatePersonalization,
    getPersonalizedContent,
    detectSectorFromForm,
    trackPersonalizationEvent
  };
};
