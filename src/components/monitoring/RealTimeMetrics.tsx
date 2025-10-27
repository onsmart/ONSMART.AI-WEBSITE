
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Wifi, MemoryStick, AlertTriangle } from 'lucide-react';
import { useRealTimeMonitoring } from '@/hooks/useRealTimeMonitoring';

const RealTimeMetrics: React.FC = () => {
  const { metrics, alerts, clearAlerts, toggleMonitoring, isMonitoring } = useRealTimeMonitoring();

  if (!metrics && isMonitoring) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 animate-pulse" />
            <span>Coletando métricas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNetworkStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'slow': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Monitoramento Real-Time</h3>
        <div className="flex gap-2">
          <Badge variant={isMonitoring ? 'default' : 'secondary'}>
            {isMonitoring ? 'Ativo' : 'Pausado'}
          </Badge>
          <button 
            onClick={toggleMonitoring}
            className="text-sm text-blue-600 hover:underline"
          >
            {isMonitoring ? 'Pausar' : 'Iniciar'}
          </button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.slice(-3).map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {alert.message}
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </AlertDescription>
            </Alert>
          ))}
          <button 
            onClick={clearAlerts}
            className="text-xs text-gray-500 hover:underline"
          >
            Limpar alertas
          </button>
        </div>
      )}

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getPerformanceColor(metrics.performanceScore)}`}>
                {metrics.performanceScore}
              </div>
              <p className="text-xs text-gray-500">Score geral</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wifi className={`h-4 w-4 ${getNetworkStatusColor(metrics.networkStatus)}`} />
                Rede
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getNetworkStatusColor(metrics.networkStatus)}`}>
                {metrics.networkStatus}
              </div>
              <p className="text-xs text-gray-500">
                {metrics.pageLoadTime ? `${(metrics.pageLoadTime / 1000).toFixed(1)}s` : '-'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MemoryStick className="h-4 w-4" />
                Memória
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metrics.memoryUsage > 85 ? 'text-red-600' : 'text-green-600'}`}>
                {metrics.memoryUsage.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Uso atual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Interações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {metrics.userInteractions}
              </div>
              <p className="text-xs text-gray-500">Esta sessão</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RealTimeMetrics;
