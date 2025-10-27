
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Clock, TrendingUp } from 'lucide-react';

interface Metrics {
  pageViews: number;
  activeUsers: number;
  avgLoadTime: number;
  conversionRate: number;
  lastUpdated: Date;
}

export const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    pageViews: 0,
    activeUsers: 0,
    avgLoadTime: 0,
    conversionRate: 0,
    lastUpdated: new Date()
  });

  useEffect(() => {
    // Simular coleta de métricas
    const collectMetrics = () => {
      const newMetrics: Metrics = {
        pageViews: Math.floor(Math.random() * 1000) + 500,
        activeUsers: Math.floor(Math.random() * 50) + 10,
        avgLoadTime: Math.random() * 2 + 1,
        conversionRate: Math.random() * 10 + 2,
        lastUpdated: new Date()
      };
      setMetrics(newMetrics);
    };

    collectMetrics();
    const interval = setInterval(collectMetrics, 30000); // Atualiza a cada 30s

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(2)}s`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.pageViews.toLocaleString()}</div>
          <Badge variant="secondary" className="mt-1">
            Hoje
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          <Badge variant="secondary" className="mt-1">
            Online
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo de Carregamento</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(metrics.avgLoadTime)}</div>
          <Badge 
            variant={metrics.avgLoadTime < 2 ? "default" : "destructive"} 
            className="mt-1"
          >
            {metrics.avgLoadTime < 2 ? "Bom" : "Lento"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(metrics.conversionRate)}</div>
          <Badge variant="default" className="mt-1">
            Este mês
          </Badge>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Sistema operacional</span>
            <span className="text-xs text-muted-foreground ml-auto">
              Última atualização: {metrics.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
