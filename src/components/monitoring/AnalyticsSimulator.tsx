import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  simulateActiveUser, 
  simulateMultipleActiveUsers, 
  simulateRealisticUserBehavior,
  verifyEventDelivery,
  generateSimulationReport,
  SimulationResult 
} from '@/utils/analyticsSimulator';

interface SimulationState {
  isRunning: boolean;
  progress: number;
  currentStep: string;
  results: SimulationResult[];
  report: string;
  eventDelivery: boolean;
}

export const AnalyticsSimulator: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    progress: 0,
    currentStep: '',
    results: [],
    report: '',
    eventDelivery: false
  });

  const [activeTab, setActiveTab] = useState<'single' | 'multiple' | 'realistic' | 'verify'>('single');

  // Verificar entrega de eventos periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.isRunning) {
        const delivery = verifyEventDelivery();
        setState(prev => ({ ...prev, eventDelivery: delivery }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [state.isRunning]);

  const runSimulation = async (type: 'single' | 'multiple' | 'realistic') => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      progress: 0,
      currentStep: 'Iniciando simulação...',
      results: [],
      report: ''
    }));

    try {
      let results: SimulationResult[] = [];

      switch (type) {
        case 'single':
          setState(prev => ({ ...prev, currentStep: 'Simulando usuário único...' }));
          const singleResult = await simulateActiveUser();
          results = [singleResult];
          setState(prev => ({ ...prev, progress: 100 }));
          break;

        case 'multiple':
          setState(prev => ({ ...prev, currentStep: 'Simulando múltiplos usuários...' }));
          results = await simulateMultipleActiveUsers(3);
          setState(prev => ({ ...prev, progress: 100 }));
          break;

        case 'realistic':
          setState(prev => ({ ...prev, currentStep: 'Simulando comportamento realista...' }));
          const realisticResult = await simulateRealisticUserBehavior();
          results = [realisticResult];
          setState(prev => ({ ...prev, progress: 100 }));
          break;
      }

      const report = generateSimulationReport(results);
      const delivery = verifyEventDelivery();

      setState(prev => ({
        ...prev,
        isRunning: false,
        results,
        report,
        eventDelivery: delivery,
        currentStep: 'Simulação concluída!'
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isRunning: false,
        currentStep: `Erro: ${error}`,
        results: []
      }));
    }
  };

  const getStatusColor = (success: boolean) => {
    return success ? 'bg-green-500' : 'bg-red-500';
  };

  const getGTMStatus = (connected: boolean) => {
    return connected ? 'Conectado' : 'Desconectado';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧪 Simulador de Analytics
            <Badge variant={state.eventDelivery ? "default" : "destructive"}>
              {state.eventDelivery ? 'Eventos OK' : 'Eventos NOK'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button
              onClick={() => runSimulation('single')}
              disabled={state.isRunning}
              className="w-full"
            >
              👤 Usuário Único
            </Button>
            <Button
              onClick={() => runSimulation('multiple')}
              disabled={state.isRunning}
              className="w-full"
            >
              👥 Múltiplos Usuários
            </Button>
            <Button
              onClick={() => runSimulation('realistic')}
              disabled={state.isRunning}
              className="w-full"
            >
              🎭 Comportamento Realista
            </Button>
            <Button
              onClick={() => {
                const delivery = verifyEventDelivery();
                setState(prev => ({ ...prev, eventDelivery: delivery }));
              }}
              variant="outline"
              className="w-full"
            >
              🔍 Verificar Eventos
            </Button>
          </div>

          {state.isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{state.currentStep}</span>
                <span>{state.progress}%</span>
              </div>
              <Progress value={state.progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {state.results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Resultados da Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Simulação {index + 1}</h4>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(result.success)}>
                        {result.success ? '✅ Sucesso' : '❌ Falha'}
                      </Badge>
                      <Badge variant="outline">
                        {result.eventsSent} eventos
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">GTM:</span>
                      <Badge variant={result.details.gtmConnection ? "default" : "destructive"} className="ml-2">
                        {getGTMStatus(result.details.gtmConnection)}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">GA4:</span>
                      <Badge variant={result.details.ga4Configured ? "default" : "destructive"} className="ml-2">
                        {result.details.ga4Configured ? 'Configurado' : 'Não configurado'}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Erros:</span>
                      <Badge variant="destructive" className="ml-2">
                        {result.errors.length}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Sessão:</span>
                      <span className="ml-2 text-xs">
                        {result.details.sessionData?.session_id ? 'Ativa' : 'Não iniciada'}
                      </span>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <Alert className="mt-2">
                      <AlertDescription>
                        <strong>Erros encontrados:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {result.errors.map((error, errorIndex) => (
                            <li key={errorIndex} className="text-xs">{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {result.details.eventsTracked.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium text-sm">Eventos rastreados:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.details.eventsTracked.slice(-5).map((event, eventIndex) => (
                          <Badge key={eventIndex} variant="secondary" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {state.report && (
        <Card>
          <CardHeader>
            <CardTitle>📋 Relatório Completo</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
              {state.report}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>🔍 Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {state.eventDelivery ? '✅' : '❌'}
              </div>
              <div className="text-sm font-medium">Entrega de Eventos</div>
              <div className="text-xs text-gray-500">
                {state.eventDelivery ? 'Funcionando' : 'Problemas detectados'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {state.results.length > 0 ? state.results.filter(r => r.success).length : 0}
              </div>
              <div className="text-sm font-medium">Simulações Bem-sucedidas</div>
              <div className="text-xs text-gray-500">
                de {state.results.length} total
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {state.results.reduce((sum, r) => sum + r.eventsSent, 0)}
              </div>
              <div className="text-sm font-medium">Total de Eventos</div>
              <div className="text-xs text-gray-500">
                enviados nas simulações
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 