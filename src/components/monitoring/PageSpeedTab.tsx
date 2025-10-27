
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PageSpeedTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Google PageSpeed Insights Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Para integração completa com Google PageSpeed Insights, acesse:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm">
              https://developers.google.com/speed/pagespeed/insights/?url={window.location.href}
            </code>
          </div>
          <Button 
            onClick={() => window.open(`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="w-full"
          >
            Abrir PageSpeed Insights
          </Button>

          <div className="mt-6 space-y-2">
            <h4 className="font-medium">Métricas Recomendadas para Monitorar:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>First Contentful Paint (FCP) - Objetivo: &lt; 1.8s</li>
              <li>Largest Contentful Paint (LCP) - Objetivo: &lt; 2.5s</li>
              <li>First Input Delay (FID) - Objetivo: &lt; 100ms</li>
              <li>Cumulative Layout Shift (CLS) - Objetivo: &lt; 0.1</li>
              <li>Time to First Byte (TTFB) - Objetivo: &lt; 600ms</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSpeedTab;
