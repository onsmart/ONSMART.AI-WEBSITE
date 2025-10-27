
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WebVitalsTabProps {
  webVitalsData: any[];
}

const WebVitalsTab: React.FC<WebVitalsTabProps> = ({ webVitalsData }) => {
  const getRatingBadge = (rating: string) => {
    const colors = {
      good: 'bg-green-500',
      'needs-improvement': 'bg-yellow-500',
      poor: 'bg-red-500'
    };
    return colors[rating as keyof typeof colors] || 'bg-gray-500';
  };

  const webVitalsChartData = webVitalsData
    .filter(metric => ['LCP', 'FID', 'CLS'].includes(metric.name))
    .map(metric => ({
      name: metric.name,
      value: metric.value,
      rating: metric.rating
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Core Web Vitals Métricas</CardTitle>
      </CardHeader>
      <CardContent>
        {webVitalsData.length > 0 ? (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={webVitalsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {webVitalsData.slice(-3).map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <Badge className={getRatingBadge(metric.rating)}>
                        {metric.rating}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mt-2">
                      {metric.value.toFixed(2)}
                      {metric.name === 'CLS' ? '' : 'ms'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            Nenhum dado de Web Vitals disponível ainda. Navegue pelo site para coletar métricas.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default WebVitalsTab;
