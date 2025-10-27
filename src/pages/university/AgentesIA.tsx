
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Play, Download, CheckCircle, Star } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const AgentesIA = () => {
  return (
    <>
      <UnifiedSEO 
        title="Agentes de IA - Curso Avançado de Implementação | onsmartAI University"
        description="Domine a implementação de Agentes de IA empresarial. Curso avançado com metodologia LÍDER e casos práticos reais."
        keywords="curso agentes ia, implementação agentes ia, metodologia líder, ia empresarial avançado"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              onsmartAI University - Avançado
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              Agentes de IA
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Domine a implementação de Agentes de IA como força de trabalho autônoma na sua empresa
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-3 text-gray-600 text-lg font-medium">4.9/5 (127 avaliações)</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-brand-blue/90 hover:via-blue-600/90 hover:to-brand-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Iniciar Curso
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Download className="mr-2 h-5 w-5" />
                Syllabus Completo
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Conteúdo do Curso */}
        <section className="py-20 px-4 md:px-6 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-brand-blue/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-4xl font-bold mb-10">Currículo <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Completo</span></h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <CardTitle>Fundamentos dos Agentes de IA</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Entenda a arquitetura e funcionamento dos Agentes de IA empresarial.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Tipos de agentes (reativos, cognitivos, colaborativos)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Arquitetura de sistemas multi-agente
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Comunicação entre agentes
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <CardTitle>Metodologia LÍDER</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Nossa metodologia proprietária para implementação estruturada de IA.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          L - Levantamento de processos
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Í - Identificação de oportunidades
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          D - Desenvolvimento dos agentes
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          E - Execução e implementação
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          R - Refinamento contínuo
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <CardTitle>Implementação Prática</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Casos reais de implementação com hands-on em ferramentas.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Agente de atendimento ao cliente
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Agente de análise de dados
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Agente de automação de processos
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                        <CardTitle>Monitoramento e Otimização</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Como medir performance e otimizar continuamente seus agentes.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          KPIs e métricas de sucesso
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Dashboards de monitoramento
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Processo de melhoria contínua
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                      <p className="font-semibold">8 horas</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nível</p>
                      <p className="font-semibold">Avançado</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Formato</p>
                      <p className="font-semibold">Vídeo + Prática + Mentoria</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Certificado</p>
                      <p className="font-semibold">Certificação Profissional</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Suporte</p>
                      <p className="font-semibold">1 ano de suporte</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Você será capaz de</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Projetar arquiteturas de agentes
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Implementar a metodologia LÍDER
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Gerenciar projetos de IA empresarial
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Calcular e apresentar ROI
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Treinar equipes internas
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <CardHeader>
                    <CardTitle>Bônus Exclusivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        Templates de implementação
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        Acesso ao grupo VIP
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        Sessões de mentoria ao vivo
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        Certificação onsmartAI
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentesIA;
