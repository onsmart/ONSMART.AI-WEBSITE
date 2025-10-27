
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const Revendas = () => {
  return (
    <>
      <UnifiedSEO 
        title="Seja uma Revenda onsmartAI - Programa de Parceria Comercial"
        description="Torne-se um parceiro comercial da onsmartAI. Revenda soluções de IA empresarial com suporte completo, treinamento e margens atrativas. Programa exclusivo para empresas."
        keywords="revenda ia, parceria comercial, distribuidor ia, agentes ia revenda, programa parceiros, negócio ia"
        pageType="service"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingCart className="h-4 w-4" />
              Programa de Revendas
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Seja uma Revenda onsmartAI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Torne-se um parceiro comercial estratégico e revenda soluções de IA para empresas de médio e grande porte
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/revendas/cadastro">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Quero ser Revenda
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/revendas/beneficios">
                  Ver Benefícios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Por que ser Revenda */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que ser uma Revenda onsmartAI?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                O mercado de IA empresarial cresce 40% ao ano. Focamos em empresas de R$ 50M a R$ 1B de faturamento, todos os setores.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Mercado em Crescimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    IA empresarial cresce 40% ao ano no Brasil. Empresas de R$ 50M-1B têm orçamento e necessidade real de automação.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <Award className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>ROI Comprovado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Metodologia LÍDER exclusiva, ROI médio de 420% em 12 meses para empresas de médio-grande porte.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <Users className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Suporte Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Treinamento especializado, material enterprise e acompanhamento dedicado para vendas complexas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Perfil Ideal */}
        <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perfil Ideal de Revenda
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Integradoras e VAR</h3>
                      <p className="text-gray-600 dark:text-gray-300">Com relacionamento em empresas de médio-grande porte</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Consultorias Especializadas</h3>
                      <p className="text-gray-600 dark:text-gray-300">Focadas em transformação digital e processos empresariais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Distribuidores Enterprise</h3>
                      <p className="text-gray-600 dark:text-gray-300">Com portfolio em empresas R$ 50M+ de todos os setores</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Requisitos para Parceria</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Empresa estabelecida há mais de 2 anos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Equipe comercial B2B experiente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Portfolio com empresas R$ 50M+ faturamento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Relacionamento em múltiplos setores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Compromisso com meta anual de R$ 1M+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cliente Ideal */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nosso Cliente Ideal
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Empresas com perfil ideal para implementação de IA empresarial
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle>Perfil Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Faturamento:</strong> R$ 50 milhões a R$ 1 bilhão/ano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Funcionários:</strong> 200 a 5.000 colaboradores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Maturidade:</strong> Processos estruturados e complexos</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle>Setores de Atuação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Manufatura e Indústria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Serviços Financeiros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Saúde e Hospitalares</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Varejo e E-commerce</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Logística e Supply Chain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>E muito mais...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se ao programa de revendas e seja parte da revolução da IA empresarial para empresas de médio e grande porte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/revendas/cadastro">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Candidatar-se Agora
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-2 border-white hover:border-gray-100">
                <Link to="/contato">
                  Falar com Consultor
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Revendas;
