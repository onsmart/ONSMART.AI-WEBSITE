
import React, { useState, useEffect } from 'react';
import { useWebVitals } from '@/hooks/useWebVitals';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WebVitalsTab from './WebVitalsTab';
import LighthouseTab from './LighthouseTab';
import PageSpeedTab from './PageSpeedTab';
import { LighthouseReport } from './types';

const PerformanceMonitor: React.FC = () => {
  const { getWebVitalsReport, clearWebVitalsData } = useWebVitals();
  const [webVitalsData, setWebVitalsData] = useState<any[]>([]);
  const [lighthouseReport, setLighthouseReport] = useState<LighthouseReport | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);

  useEffect(() => {
    setWebVitalsData(getWebVitalsReport());
  }, [getWebVitalsReport]);

  const runLighthouseAudit = async () => {
    setIsRunningAudit(true);
    
    try {
      // Simular auditoria Lighthouse (em produção, isso seria feito via API)
      const mockReport: LighthouseReport = {
        performance: Math.floor(Math.random() * 40) + 60, // 60-100
        accessibility: Math.floor(Math.random() * 30) + 70, // 70-100
        bestPractices: Math.floor(Math.random() * 25) + 75, // 75-100
        seo: Math.floor(Math.random() * 20) + 80, // 80-100
        pwa: Math.floor(Math.random() * 50) + 50, // 50-100
        audits: {
          'largest-contentful-paint': {
            score: 0.8,
            numericValue: 2.5,
            displayValue: '2.5 s',
            description: 'Largest Contentful Paint marks the time at which the largest text or image is painted.'
          },
          'first-input-delay': {
            score: 0.9,
            numericValue: 13,
            displayValue: '13 ms',
            description: 'First Input Delay measures the time from when a user first interacts with a page.'
          },
          'cumulative-layout-shift': {
            score: 0.95,
            numericValue: 0.1,
            displayValue: '0.1',
            description: 'Cumulative Layout Shift measures the movement of visible elements within the viewport.'
          }
        }
      };
      
      setLighthouseReport(mockReport);
    } catch (error) {
      console.error('Erro ao executar auditoria Lighthouse:', error);
    } finally {
      setIsRunningAudit(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monitoramento de Performance</h2>
        <div className="space-x-2">
          <Button onClick={runLighthouseAudit} disabled={isRunningAudit}>
            {isRunningAudit ? 'Executando...' : 'Executar Auditoria Lighthouse'}
          </Button>
          <Button variant="outline" onClick={clearWebVitalsData}>
            Limpar Dados
          </Button>
        </div>
      </div>

      <Tabs defaultValue="webvitals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="webvitals">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="lighthouse">Lighthouse Audit</TabsTrigger>
          <TabsTrigger value="pagespeed">PageSpeed Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="webvitals" className="space-y-4">
          <WebVitalsTab webVitalsData={webVitalsData} />
        </TabsContent>

        <TabsContent value="lighthouse" className="space-y-4">
          <LighthouseTab lighthouseReport={lighthouseReport} />
        </TabsContent>

        <TabsContent value="pagespeed" className="space-y-4">
          <PageSpeedTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitor;
