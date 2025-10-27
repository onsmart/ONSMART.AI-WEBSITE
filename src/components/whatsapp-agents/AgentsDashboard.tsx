import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { useRealTimeAgents } from '@/hooks/useRealTimeAgents';
import AgentPerformanceCard from './AgentPerformanceCard';
import ConversationsList from './ConversationsList';
import RealTimeMetrics from './RealTimeMetrics';
import WhatsappSimulator from './WhatsappSimulator';

const AgentsDashboard: React.FC = () => {
  const { 
    isServiceReady, 
    isLoading, 
    agents, 
    conversations 
  } = useRealTimeAgents();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Inicializando Agentes de IA...</p>
        </div>
      </div>
    );
  }

  const totalConversations = conversations.length;
  const totalAgentsOnline = agents.filter(agent => agent.status === 'online').length;
  const averageResponseTime = agents.reduce((acc, agent) => acc + agent.performance.averageResponseTime, 0) / agents.length;
  const overallConversionRate = agents.reduce((acc, agent) => acc + agent.performance.conversionRate, 0) / agents.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Agentes IA - WhatsApp
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sistema de atendimento automatizado para vendas
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isServiceReady ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sistema Online</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sistema Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status Alert */}
        {!isServiceReady && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              O sistema WhatsApp não está configurado. Acesse a <a href="/admin/whatsapp" className="underline">configuração</a> para ativar os agentes.
            </AlertDescription>
          </Alert>
        )}

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversas Ativas</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversations}</div>
              <p className="text-xs text-muted-foreground">
                Em tempo real
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agentes Online</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAgentsOnline}/4</div>
              <p className="text-xs text-muted-foreground">
                Agentes ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Resposta</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(averageResponseTime / 1000)}s
              </div>
              <p className="text-xs text-muted-foreground">
                Resposta média
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(overallConversionRate * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Conversão média
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="conversations">Conversas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status dos Agentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Agentes</CardTitle>
                  <CardDescription>
                    Monitoramento em tempo real dos agentes de IA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          agent.status === 'online' ? 'bg-green-500' :
                          agent.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{agent.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {agent.currentConversations}/{agent.maxConversations}
                        </p>
                        <p className="text-xs text-muted-foreground">conversas</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Conversas Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversas Recentes</CardTitle>
                  <CardDescription>
                    Últimas interações com clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConversationsList conversations={conversations.slice(0, 5)} />
                </CardContent>
              </Card>
            </div>

            <RealTimeMetrics />
          </TabsContent>

          
          
          <TabsContent value="agents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <AgentPerformanceCard 
                  key={agent.id} 
                  agent={agent}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Conversas</CardTitle>
                <CardDescription>
                  Gerenciamento completo das conversas ativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConversationsList conversations={conversations} showFilters={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance por Agente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{agent.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(agent.performance.conversionRate * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${agent.performance.conversionRate * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfação do Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex justify-between items-center">
                        <span className="text-sm">{agent.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg"></span>
                          <span className="font-medium">
                            {agent.performance.customerSatisfaction.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teste de Conversas</CardTitle>
                  <CardDescription>
                    Simule conversas com os agentes para testar o funcionamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WhatsappSimulator />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cenários de Teste</CardTitle>
                  <CardDescription>
                    Mensagens pré-definidas para testar diferentes fluxos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Teste de Triagem:</h4>
                    <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      "Olá! Gostaria de saber mais sobre os Agentes de IA da onsmart."
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Teste Comercial:</h4>
                    <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      "Qual o preço dos Agentes de IA? Gostaria de uma proposta."
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Teste Técnico:</h4>
                    <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      "Como funciona a implementação? Preciso integrar com meu sistema."
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Teste Demo:</h4>
                    <p className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      "Gostaria de agendar uma demonstração dos Agentes de IA."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsDashboard;
