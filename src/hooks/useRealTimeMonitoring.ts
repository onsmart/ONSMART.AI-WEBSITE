
import { useEffect, useCallback, useState } from 'react';
import { useRealUserMonitoring } from './useRealUserMonitoring';

interface RealTimeMetrics {
  pageLoadTime: number;
  memoryUsage: number;
  networkStatus: 'online' | 'offline' | 'slow';
  userInteractions: number;
  errorCount: number;
  performanceScore: number;
  timestamp: number;
}

interface SystemAlerts {
  type: 'performance' | 'memory' | 'network' | 'error';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
}

export const useRealTimeMonitoring = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);
  const [alerts, setAlerts] = useState<SystemAlerts[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const { getSessionData, collectPerformanceMetrics } = useRealUserMonitoring();

  const collectRealTimeMetrics = useCallback((): RealTimeMetrics => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const memory = (performance as any).memory;
    const sessionData = getSessionData();
    const performanceData = collectPerformanceMetrics();

    const pageLoadTime = navigation 
      ? navigation.loadEventEnd - navigation.loadEventStart 
      : 0;

    const memoryUsage = memory 
      ? memory.usedJSHeapSize / memory.totalJSHeapSize 
      : 0;

    const networkStatus = navigator.onLine 
      ? (performanceData?.request_response || 0) > 3000 ? 'slow' : 'online'
      : 'offline';

    // Calcular performance score baseado em múltiplos fatores
    let performanceScore = 100;
    if (pageLoadTime > 3000) performanceScore -= 20;
    if (memoryUsage > 0.8) performanceScore -= 15;
    if (networkStatus === 'slow') performanceScore -= 10;
    if (networkStatus === 'offline') performanceScore -= 30;

    return {
      pageLoadTime,
      memoryUsage: memoryUsage * 100,
      networkStatus,
      userInteractions: sessionData.interactions,
      errorCount: sessionData.errors,
      performanceScore: Math.max(0, performanceScore),
      timestamp: Date.now()
    };
  }, [getSessionData, collectPerformanceMetrics]);

  const checkForAlerts = useCallback((currentMetrics: RealTimeMetrics) => {
    const newAlerts: SystemAlerts[] = [];

    // Alert de performance
    if (currentMetrics.pageLoadTime > 5000) {
      newAlerts.push({
        type: 'performance',
        message: `Tempo de carregamento alto: ${(currentMetrics.pageLoadTime / 1000).toFixed(2)}s`,
        severity: 'high',
        timestamp: Date.now()
      });
    }

    // Alert de memória
    if (currentMetrics.memoryUsage > 85) {
      newAlerts.push({
        type: 'memory',
        message: `Uso de memória crítico: ${currentMetrics.memoryUsage.toFixed(1)}%`,
        severity: 'critical',
        timestamp: Date.now()
      });
    }

    // Alert de rede
    if (currentMetrics.networkStatus === 'offline') {
      newAlerts.push({
        type: 'network',
        message: 'Conexão offline detectada',
        severity: 'high',
        timestamp: Date.now()
      });
    }

    // Alert de erros
    if (currentMetrics.errorCount > 3) {
      newAlerts.push({
        type: 'error',
        message: `Múltiplos erros detectados: ${currentMetrics.errorCount}`,
        severity: 'high',
        timestamp: Date.now()
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...prev, ...newAlerts].slice(-10)); // Manter apenas os últimos 10 alerts
    }
  }, []);

  const updateMetrics = useCallback(() => {
    if (!isMonitoring) return;

    try {
      const newMetrics = collectRealTimeMetrics();
      setMetrics(newMetrics);
      checkForAlerts(newMetrics);

      // Enviar métricas para analytics se disponível
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'real_time_metrics', {
          performance_score: newMetrics.performanceScore,
          page_load_time: newMetrics.pageLoadTime,
          memory_usage: newMetrics.memoryUsage
        });
      }
    } catch (error) {
      console.warn('Erro ao coletar métricas real-time:', error);
    }
  }, [isMonitoring, collectRealTimeMetrics, checkForAlerts]);

  useEffect(() => {
    if (!isMonitoring) return;

    // Coletar métricas iniciais
    updateMetrics();

    // Configurar coleta periódica (a cada 10 segundos)
    const interval = setInterval(updateMetrics, 10000);

    // Coletar métricas em eventos importantes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateMetrics();
      }
    };

    const handleOnline = () => updateMetrics();
    const handleOffline = () => updateMetrics();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isMonitoring, updateMetrics]);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const toggleMonitoring = useCallback(() => {
    setIsMonitoring(prev => !prev);
  }, []);

  return {
    metrics,
    alerts,
    isMonitoring,
    clearAlerts,
    toggleMonitoring,
    updateMetrics
  };
};
