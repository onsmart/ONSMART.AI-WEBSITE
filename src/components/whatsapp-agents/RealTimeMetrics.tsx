
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RealTimeMetrics: React.FC = () => {
  // Simulando dados em tempo real
  const metrics = {
    messagesPerHour: 47,
    responseTime: 2.3,
    conversionRate: 76,
    customerSatisfaction: 4.8,
    trends: {
      messagesPerHour: 12,
      responseTime: -0.5,
      conversionRate: 8,
      customerSatisfaction: 0.2
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (trend < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-gray-600" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas em Tempo Real</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Msgs/Hora</span>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trends.messagesPerHour)}
                <span className={`text-xs ${getTrendColor(metrics.trends.messagesPerHour)}`}>
                  {Math.abs(metrics.trends.messagesPerHour)}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold">{metrics.messagesPerHour}</div>
            <Badge variant="outline" className="text-xs">
              Última hora
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tempo Resposta</span>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trends.responseTime)}
                <span className={`text-xs ${getTrendColor(metrics.trends.responseTime)}`}>
                  {Math.abs(metrics.trends.responseTime)}s
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold">{metrics.responseTime}s</div>
            <Badge variant="outline" className="text-xs">
              Médio
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Conversão</span>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trends.conversionRate)}
                <span className={`text-xs ${getTrendColor(metrics.trends.conversionRate)}`}>
                  {Math.abs(metrics.trends.conversionRate)}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <Badge variant="outline" className="text-xs">
              Hoje
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Satisfação</span>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.trends.customerSatisfaction)}
                <span className={`text-xs ${getTrendColor(metrics.trends.customerSatisfaction)}`}>
                  {Math.abs(metrics.trends.customerSatisfaction)}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold flex items-center gap-1">
              <span></span>
              {metrics.customerSatisfaction}
            </div>
            <Badge variant="outline" className="text-xs">
              Média
            </Badge>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium mb-4">Atividade Recente</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">12:34</span>
              <span>Nova conversa iniciada - Cliente #1234</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">12:31</span>
              <span>Transferência: Triagem → Comercial</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-muted-foreground">12:28</span>
              <span>Demo agendada - Cliente #1232</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">12:25</span>
              <span>Proposta enviada - Cliente #1231</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMetrics;
