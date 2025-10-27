
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

const QuickPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Só mostrar em desenvolvimento
    if (process.env.NODE_ENV !== 'development') return;

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setMetrics({
          lcp: navigation.loadEventEnd - navigation.loadEventStart,
          fid: 0, // Será atualizado por eventos
          cls: 0, // Será calculado
          ttfb: navigation.responseStart - navigation.requestStart
        });
      }
    };

    // Coletar métricas após carregamento
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    // Mostrar monitor após 5 segundos
    const timer = setTimeout(() => setIsVisible(true), 5000);

    return () => {
      window.removeEventListener('load', collectMetrics);
      clearTimeout(timer);
    };
  }, []);

  const getMetricColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'bg-green-500';
    if (value <= thresholds[1]) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!isVisible || !metrics || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Performance Monitor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs">TTFB</span>
            <Badge className={getMetricColor(metrics.ttfb, [100, 300])}>
              {metrics.ttfb.toFixed(0)}ms
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">LCP</span>
            <Badge className={getMetricColor(metrics.lcp, [2500, 4000])}>
              {metrics.lcp.toFixed(0)}ms
            </Badge>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-xs text-gray-500 hover:text-gray-700 w-full text-center"
          >
            Ocultar
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickPerformanceMonitor;
