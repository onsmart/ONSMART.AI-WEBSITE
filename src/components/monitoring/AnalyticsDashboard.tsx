import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useConversionMetrics } from '@/hooks/useConversionMetrics';
import { useABTesting } from '@/hooks/useABTesting';
import { useRealUserMonitoring } from '@/hooks/useRealUserMonitoring';
import ActiveUsersMonitor from './ActiveUsersMonitor';
import { AnalyticsSimulator } from './AnalyticsSimulator';

const AnalyticsDashboard: React.FC = () => {
  const { getConversionReport, getFunnelReport } = useConversionMetrics();
  const { getTestResults, activeTests } = useABTesting();
  const { getSessionData } = useRealUserMonitoring();
  
  const [conversions, setConversions] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any>(null);
  const [errorReports, setErrorReports] = useState<any[]>([]);

  useEffect(() => {
    setConversions(getConversionReport());
    setFunnelData(getFunnelReport());
    setSessionData(getSessionData());
    setErrorReports(JSON.parse(localStorage.getItem('error_reports') || '[]'));
  }, [getConversionReport, getFunnelReport, getSessionData]);

  const clearAllData = () => {
    localStorage.removeItem('conversions');
    localStorage.removeItem('error_reports');
    localStorage.removeItem('performance_metrics');
    sessionStorage.removeItem('user_interactions');
    sessionStorage.removeItem('funnel_steps');
    setConversions([]);
    setFunnelData([]);
    setErrorReports([]);
  };

  // Processar dados para gráficos
  const conversionsByComponent = conversions.reduce((acc, conv) => {
    acc[conv.component] = (acc[conv.component] || 0) + 1;
    return acc;
  }, {});

  const conversionChartData = Object.entries(conversionsByComponent).map(([component, count]) => ({
    component,
    conversions: count
  }));

  const funnelStepData = funnelData.reduce((acc, step) => {
    acc[step.step] = (acc[step.step] || 0) + 1;
    return acc;
  }, {});

  const funnelChartData = Object.entries(funnelStepData).map(([step, count]) => ({
    step,
    users: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard de Analytics</h2>
        <Button onClick={clearAllData} variant="outline">
          Limpar Dados
        </Button>
      </div>

      {/* Monitor de Usuários Ativos */}
      <ActiveUsersMonitor />

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{conversions.length}</div>
            <div className="text-sm text-gray-600">Total Conversões</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{errorReports.length}</div>
            <div className="text-sm text-gray-600">Erros Reportados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sessionData?.interactions || 0}</div>
            <div className="text-sm text-gray-600">Interações da Sessão</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{Object.keys(activeTests).length}</div>
            <div className="text-sm text-gray-600">Testes A/B Ativos</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="conversions" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="conversions">Conversões</TabsTrigger>
          <TabsTrigger value="funnel">Funil</TabsTrigger>
          <TabsTrigger value="abtesting">A/B Testing</TabsTrigger>
          <TabsTrigger value="errors">Erros</TabsTrigger>
          <TabsTrigger value="active-users">Usuários Ativos</TabsTrigger>
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
        </TabsList>

        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversões por Componente</CardTitle>
            </CardHeader>
            <CardContent>
              {conversionChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="component" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversions" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  Nenhuma conversão registrada ainda.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {conversions.slice(-10).map((conv, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{conv.component}</span>
                      <span className="text-gray-500 ml-2">{conv.action}</span>
                    </div>
                    <Badge variant="outline">
                      {new Date(conv.timestamp).toLocaleTimeString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Funil</CardTitle>
            </CardHeader>
            <CardContent>
              {funnelChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={funnelChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  Nenhum dado de funil disponível.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abtesting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testes A/B Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(activeTests).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(activeTests).map(([testName, variant]) => (
                    <div key={testName} className="border p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{testName}</h3>
                        <Badge>{variant}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Resultados do teste (simulado):
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="font-medium">Variante A</div>
                          <div className="text-sm">Conv. Rate: 12.5%</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <div className="font-medium">Variante B</div>
                          <div className="text-sm">Conv. Rate: 15.2%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  Nenhum teste A/B ativo.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Erros Reportados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {errorReports.slice(-10).map((error, index) => (
                  <div key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                    <div className="font-medium text-red-800">{error.message}</div>
                    <div className="text-sm text-red-600">{error.stack}</div>
                    <div className="text-xs text-red-500 mt-1">
                      {new Date(error.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-4">
          <AnalyticsSimulator />
        </TabsContent>

        <TabsContent value="active-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações sobre Usuários Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Eventos de Usuários Ativos</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>user_engagement</code>: Rastreado quando usuário interage</li>
                    <li>• <code>active_user_session</code>: Sessão de usuário ativo</li>
                    <li>• <code>session_start</code>: Início de sessão engajada</li>
                    <li>• <code>user_activity</code>: Atividades específicas (scroll, tempo)</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">✅ Como Verificar no Google Analytics</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Acesse o Google Analytics</li>
                    <li>2. Vá para "Relatórios" → "Engajamento"</li>
                    <li>3. Verifique "Usuários ativos" e "Sessões engajadas"</li>
                    <li>4. Em "Eventos", procure pelos eventos listados acima</li>
                    <li>5. Use "Relatórios em tempo real" para ver atividade atual</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Possíveis Problemas</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Bloqueadores de anúncios podem impedir o rastreamento</li>
                    <li>• Configuração incorreta no GTM</li>
                    <li>• Filtros de IP no Google Analytics</li>
                    <li>• Atraso de 24-48h para aparecer nos relatórios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
