
import { useState, useEffect } from 'react';

interface ABTestVariant {
  id: string;
  headline: string;
  subheadline: string;
  weight: number;
}

interface ABTestConfig {
  testName: string;
  variants: ABTestVariant[];
  enabled: boolean;
}

const HEADLINE_TESTS: Record<string, ABTestConfig> = {
  hero_headlines: {
    testName: 'hero_headlines_v1',
    enabled: true,
    variants: [
      {
        id: 'control',
        headline: 'Transforme sua empresa em uma Potência de IA em 30 dias',
        subheadline: 'Implemente Agentes de IA Especializados que trabalham 24/7, nunca pedem aumento e aumentam sua produtividade em até 400%',
        weight: 25
      },
      {
        id: 'urgency_focused',
        headline: 'Sua concorrência já está usando IA. Você vai ficar para trás?',
        subheadline: 'Implemente Agentes de IA em 30 dias e multiplique sua produtividade por 4x enquanto reduz custos operacionais',
        weight: 25
      },
      {
        id: 'roi_focused',
        headline: 'ROI de 420% em 6 meses com Agentes de IA',
        subheadline: 'Descubra como 350+ empresas aumentaram receita, reduziram custos e dominaram seus mercados com nossa metodologia LÍDER',
        weight: 25
      },
      {
        id: 'outcome_focused',
        headline: 'De empresa tradicional para líder de mercado em 90 dias',
        subheadline: 'Agentes de IA que automatizam processos, aumentam vendas e reduzem custos - implementação garantida ou dinheiro de volta',
        weight: 25
      }
    ]
  },
  contato_headlines: {
    testName: 'contato_headlines_v1',
    enabled: true,
    variants: [
      {
        id: 'control',
        headline: 'Transforme sua empresa em uma máquina de resultados com IA',
        subheadline: 'Enquanto seus concorrentes gastam fortunas contratando, você multiplica produtividade por 10x sem aumentar custos',
        weight: 50
      },
      {
        id: 'guarantee_focused',
        headline: 'Garantimos 300% de ROI em 90 dias ou devolvemos seu dinheiro + R$ 10.000',
        subheadline: 'Junte-se às 350+ empresas que transformaram seus resultados com Agentes de IA especializados',
        weight: 50
      }
    ]
  }
};

export const useABTestHeadlines = (testKey: keyof typeof HEADLINE_TESTS) => {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const test = HEADLINE_TESTS[testKey];
    if (!test || !test.enabled) {
      setVariant(test.variants[0]); // Use control if test disabled
      setIsLoading(false);
      return;
    }

    // Check if user already has assigned variant
    const storageKey = `ab_test_${test.testName}`;
    const existingVariant = localStorage.getItem(storageKey);
    
    if (existingVariant) {
      const foundVariant = test.variants.find(v => v.id === existingVariant);
      if (foundVariant) {
        setVariant(foundVariant);
        setIsLoading(false);
        return;
      }
    }

    // Assign new variant based on weights
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    let selectedVariant = test.variants[0]; // fallback
    
    for (const testVariant of test.variants) {
      currentWeight += testVariant.weight;
      if (random <= currentWeight) {
        selectedVariant = testVariant;
        break;
      }
    }

    // Store assignment
    localStorage.setItem(storageKey, selectedVariant.id);
    
    // Track assignment for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_assignment', {
        test_name: test.testName,
        variant_id: selectedVariant.id,
        custom_parameter_1: testKey
      });
    }

    setVariant(selectedVariant);
    setIsLoading(false);
  }, [testKey]);

  const trackConversion = (conversionType: string) => {
    if (!variant) return;

    const test = HEADLINE_TESTS[testKey];
    
    // Track conversion for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_conversion', {
        test_name: test.testName,
        variant_id: variant.id,
        conversion_type: conversionType,
        custom_parameter_1: testKey
      });
    }

    // Store local conversion data
    const conversionData = {
      testName: test.testName,
      variantId: variant.id,
      conversionType,
      timestamp: Date.now()
    };

    const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
    conversions.push(conversionData);
    localStorage.setItem('ab_test_conversions', JSON.stringify(conversions));

    console.log('AB Test Conversion:', conversionData);
  };

  return {
    variant,
    isLoading,
    trackConversion,
    isControl: variant?.id === 'control'
  };
};

// Hook para relatórios de A/B Test
export const useABTestReports = () => {
  const getTestResults = () => {
    const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
    const assignments = Object.keys(HEADLINE_TESTS).map(testKey => {
      const test = HEADLINE_TESTS[testKey as keyof typeof HEADLINE_TESTS];
      const storageKey = `ab_test_${test.testName}`;
      const variant = localStorage.getItem(storageKey);
      return { testName: test.testName, variant };
    });

    return { conversions, assignments };
  };

  return { getTestResults };
};
