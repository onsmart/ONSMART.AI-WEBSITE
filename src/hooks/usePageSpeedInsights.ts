
import { useState, useCallback } from 'react';

interface PageSpeedInsightsResult {
  lighthouseResult: {
    categories: {
      performance: { score: number };
      accessibility: { score: number };
      'best-practices': { score: number };
      seo: { score: number };
      pwa: { score: number };
    };
    audits: {
      [key: string]: {
        score: number;
        numericValue?: number;
        displayValue?: string;
        description: string;
      };
    };
  };
  loadingExperience: {
    metrics: {
      [key: string]: {
        percentile: number;
        category: string;
      };
    };
  };
}

export const usePageSpeedInsights = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageSpeedInsightsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runPageSpeedTest = useCallback(async (url: string, strategy: 'desktop' | 'mobile' = 'desktop') => {
    setLoading(true);
    setError(null);

    try {
      // Nota: Em produção, você precisará de uma API key do Google
      const API_KEY = import.meta.env.VITE_GOOGLE_PAGESPEED_API_KEY;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${API_KEY}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

      // Enviar métricas para analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pagespeed_audit', {
          event_category: 'Performance',
          event_label: url,
          performance_score: Math.round(result.lighthouseResult.categories.performance.score * 100),
          accessibility_score: Math.round(result.lighthouseResult.categories.accessibility.score * 100),
          seo_score: Math.round(result.lighthouseResult.categories.seo.score * 100)
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao executar PageSpeed Insights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFieldData = useCallback((metric: string) => {
    if (!data?.loadingExperience?.metrics) return null;
    return data.loadingExperience.metrics[metric];
  }, [data]);

  const getAuditScore = useCallback((auditId: string) => {
    if (!data?.lighthouseResult?.audits) return null;
    return data.lighthouseResult.audits[auditId];
  }, [data]);

  return {
    loading,
    data,
    error,
    runPageSpeedTest,
    getFieldData,
    getAuditScore
  };
};
