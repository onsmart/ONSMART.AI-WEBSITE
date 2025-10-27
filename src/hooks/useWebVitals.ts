

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const useWebVitals = () => {
  useEffect(() => {
    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // Log para desenvolvimento
      console.log('Web Vitals Metric:', metric);
      
      // Enviar para Google Analytics se disponível
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.value),
          custom_map: { metric_rating: metric.rating }
        });
      }

      // Enviar para Google Tag Manager se disponível
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'web_vitals',
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_delta: metric.delta,
          metric_id: metric.id
        });
      }

      // Armazenar localmente para relatórios
      const webVitalsData = JSON.parse(localStorage.getItem('webVitals') || '[]');
      webVitalsData.push({
        ...metric,
        timestamp: Date.now(),
        url: window.location.pathname
      });
      
      // Manter apenas os últimos 100 registros
      if (webVitalsData.length > 100) {
        webVitalsData.splice(0, webVitalsData.length - 100);
      }
      
      localStorage.setItem('webVitals', JSON.stringify(webVitalsData));
    };

    // Configurar métricas Core Web Vitals usando funções disponíveis
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics); // INP substitui FID nas versões mais recentes

  }, []);

  const getWebVitalsReport = () => {
    return JSON.parse(localStorage.getItem('webVitals') || '[]');
  };

  const clearWebVitalsData = () => {
    localStorage.removeItem('webVitals');
  };

  return {
    getWebVitalsReport,
    clearWebVitalsData
  };
};

