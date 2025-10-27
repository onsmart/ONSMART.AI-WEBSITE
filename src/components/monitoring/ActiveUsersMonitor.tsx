import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  checkActiveUsersInGA, 
  verifyAnalyticsEvents, 
  testGTMConnection,
  monitorAnalyticsEvents 
} from '@/utils/analyticsConfig';

interface ActiveUsersMonitorProps {
  className?: string;
}

const ActiveUsersMonitor: React.FC<ActiveUsersMonitorProps> = ({ className }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  const runDiagnostics = () => {
    console.log('🔍 Iniciando diagnóstico de usuários ativos...');
    
    // Testar conexão GTM
    const gtmResults = testGTMConnection();
    setTestResults(gtmResults);
    
    // Verificar eventos do GA
    verifyAnalyticsEvents();
    
    // Verificar usuários ativos
    checkActiveUsersInGA();
    
    setLastCheck(new Date());
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    monitorAnalyticsEvents();
    console.log('📊 Monitoramento de eventos ativado');
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    console.log('📊 Monitoramento de eventos desativado');
  };

  const checkDataLayer = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      const recentEvents = (window as any).dataLayer.slice(-10);
      setEvents(recentEvents);
      console.log('📋 Últimos eventos no dataLayer:', recentEvents);
    }
  };

  useEffect(() => {
    // Verificar automaticamente ao montar o componente
    runDiagnostics();
    
    // Verificar a cada 30 segundos se o monitoramento estiver ativo
    const interval = setInterval(() => {
      if (isMonitoring) {
        checkDataLayer();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Monitor de Usuários Ativos
          <Badge variant={testResults?.ga4Configured ? "default" : "destructive"}>
            {testResults?.ga4Configured ? "Conectado" : "Desconectado"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status do GTM */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Status do GTM</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${testResults?.gtmLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
                GTM Carregado: {testResults?.gtmLoaded ? '✅' : '❌'}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${testResults?.dataLayerExists ? 'bg-green-500' : 'bg-red-500'}`}></span>
                DataLayer: {testResults?.dataLayerExists ? '✅' : '❌'}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${testResults?.gtagExists ? 'bg-green-500' : 'bg-red-500'}`}></span>
                gtag: {testResults?.gtagExists ? '✅' : '❌'}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${testResults?.ga4Configured ? 'bg-green-500' : 'bg-red-500'}`}></span>
                GA4 Configurado: {testResults?.ga4Configured ? '✅' : '❌'}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Informações</h4>
            <div className="space-y-1 text-sm">
              <div>ID do GA: G-384496JX74</div>
              <div>URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
              {lastCheck && (
                <div>Última verificação: {lastCheck.toLocaleTimeString()}</div>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button onClick={runDiagnostics} variant="outline" size="sm">
            🔍 Executar Diagnóstico
          </Button>
          <Button 
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
            size="sm"
          >
            {isMonitoring ? '⏹️ Parar Monitoramento' : '📊 Iniciar Monitoramento'}
          </Button>
          <Button onClick={checkDataLayer} variant="outline" size="sm">
            📋 Verificar DataLayer
          </Button>
        </div>

        {/* Eventos Recentes */}
        {events.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Eventos Recentes</h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {events.map((event, index) => (
                <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                  <div className="font-mono">
                    {JSON.stringify(event, null, 2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instruções */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">📋 Como Verificar Usuários Ativos no GA</h4>
          <ol className="text-sm space-y-1">
            <li>1. Abra o Google Analytics</li>
            <li>2. Vá para "Relatórios" → "Engajamento"</li>
            <li>3. Verifique "Usuários ativos" e "Sessões engajadas"</li>
            <li>4. Em "Eventos", procure por: user_engagement, active_user_session</li>
            <li>5. Use "Relatórios em tempo real" para ver atividade atual</li>
          </ol>
        </div>

        {/* Troubleshooting */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">🔧 Troubleshooting</h4>
          <ul className="text-sm space-y-1">
            <li>• Se não aparecer "Conectado", verifique se o GTM está carregado</li>
            <li>• Se eventos não aparecem, verifique bloqueadores de anúncios</li>
            <li>• Aguarde 24-48h para ver dados no GA</li>
            <li>• Use modo incógnito para testar sem cache</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersMonitor; 