
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calculator, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const AgentesDigitaisComissoes = () => {
  return (
    <>
      <UnifiedSEO 
        title="Comissões Agentes Digitais onsmartAI - Tabela de Comissões e Ganhos"
        description="Conheça a tabela de comissões do programa de Agentes Digitais onsmartAI. Ganhe de R$ 5.000 a R$ 50.000+ por indicação + renda recorrente."
        keywords="comissões agente digital, tabela comissões, ganhos indicação, renda recorrente, programa afiliados"
        pageType="service"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4" />
              Tabela de Comissões
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Comissões dos Agentes Digitais
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Descubra quanto você pode ganhar indicando empresas para a onsmartAI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Tornar-se Agente
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/agentes-digitais">
                  Ver Programa Completo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tabela de Comissões */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Estrutura de Comissões
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Quanto maior o valor do contrato, maior sua comissão
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-xl">Contratos Básicos</CardTitle>
                  <CardDescription>R$ 5.000 a R$ 25.000/mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">10%</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comissão sobre o valor do primeiro ano
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>R$ 5.000/mês:</span>
                      <span className="font-semibold">R$ 6.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 15.000/mês:</span>
                      <span className="font-semibold">R$ 18.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 25.000/mês:</span>
                      <span className="font-semibold">R$ 30.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl">Contratos Médios</CardTitle>
                  <CardDescription>R$ 25.000 a R$ 50.000/mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15%</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comissão sobre o valor do primeiro ano
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>R$ 25.000/mês:</span>
                      <span className="font-semibold">R$ 45.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 35.000/mês:</span>
                      <span className="font-semibold">R$ 63.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 50.000/mês:</span>
                      <span className="font-semibold">R$ 90.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl">Contratos Enterprise</CardTitle>
                  <CardDescription>R$ 50.000+/mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comissão sobre o valor do primeiro ano
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>R$ 50.000/mês:</span>
                      <span className="font-semibold">R$ 150.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 100.000/mês:</span>
                      <span className="font-semibold">R$ 300.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R$ 200.000/mês:</span>
                      <span className="font-semibold">R$ 600.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Renda Recorrente */}
        <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Renda Recorrente Garantida
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Além da comissão inicial, você ganha 2% de tudo que o cliente pagar mensalmente durante 12 meses.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Cliente R$ 10.000/mês</h3>
                      <p className="text-gray-600 dark:text-gray-300">R$ 200/mês por 12 meses = R$ 2.400 adicional</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Cliente R$ 50.000/mês</h3>
                      <p className="text-gray-600 dark:text-gray-300">R$ 1.000/mês por 12 meses = R$ 12.000 adicional</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Cliente R$ 100.000/mês</h3>
                      <p className="text-gray-600 dark:text-gray-300">R$ 2.000/mês por 12 meses = R$ 24.000 adicional</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Exemplo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Cliente R$ 30.000/mês</span>
                      <span className="font-semibold">15% tier</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span>Comissão inicial:</span>
                      <span className="font-bold text-green-600">R$ 54.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Renda recorrente (12x):</span>
                      <span className="font-bold text-green-600">R$ 7.200</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Total no primeiro ano:</span>
                      <span className="font-bold text-green-600">R$ 61.200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculadora Simples */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Calcule seus Ganhos
            </h2>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <Calculator className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <CardTitle>Simulador de Comissões</CardTitle>
                <CardDescription>
                  Digite o valor mensal do contrato para ver sua comissão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor mensal do contrato (R$)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 25000"
                      className="w-full p-3 border rounded-lg text-center text-lg"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Calcular Comissão
                  </Button>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Preencha o valor acima para ver sua comissão estimada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para Começar a Ganhar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cadastre-se gratuitamente e receba seu link exclusivo para começar a indicar clientes hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Cadastrar-se Agora
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 border-2 border-white hover:border-gray-100">
                <Link to="/contato">
                  Tirar Dúvidas
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentesDigitaisComissoes;
