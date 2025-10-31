
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, DollarSign, TrendingUp, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useTranslation } from 'react-i18next';

const AgentesDigitais = () => {
  const { t } = useTranslation(['agentesDigitais', 'common']);
  
  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="agente digital, programa indicação, comissões vendas, indicar clientes, renda extra"
        pageType="service"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserCheck className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  {t('hero.buttons.becomeAgent')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/agentes-digitais/comissoes">
                  {t('hero.buttons.viewCommissions')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Como Funciona o Programa
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Um processo simples em 4 passos para você começar a ganhar dinheiro indicando clientes
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Cadastre-se</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Faça seu cadastro gratuito e receba seu link exclusivo de indicação
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Indique Empresas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Compartilhe seu link com empresas que podem se beneficiar da IA
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Acompanhe</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nossa equipe faz todo o trabalho de vendas e implementação
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">Receba</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ganhe sua comissão quando o cliente fechar contrato conosco
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vantagens */}
        <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que ser um Agente Digital?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Múltiplas vantagens para maximizar seus ganhos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle>Comissões Atrativas</CardTitle>
                  <CardDescription>10% a 25% por indicação</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ganhe de R$ 5.000 a R$ 50.000+ por cliente que você indicar, dependendo do tamanho do contrato.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
                  <CardTitle>Renda Recorrente</CardTitle>
                  <CardDescription>Ganhos mensais</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Além da comissão inicial, ganhe 2% de tudo que o cliente pagar mensalmente durante 12 meses.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <Users className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Suporte Total</CardTitle>
                  <CardDescription>Sem trabalho de vendas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Você só indica. Nossa equipe faz apresentação, demonstração, negociação e fechamento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Perfil Ideal */}
        <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perfil Ideal de Agente Digital
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Profissionais de TI</h3>
                      <p className="text-gray-600 dark:text-gray-300">Desenvolvedores, analistas, consultores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Empresários e Executivos</h3>
                      <p className="text-gray-600 dark:text-gray-300">Com network empresarial ativo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Vendedores Experientes</h3>
                      <p className="text-gray-600 dark:text-gray-300">Que conhecem o mercado B2B</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Influenciadores Digitais</h3>
                      <p className="text-gray-600 dark:text-gray-300">Com audiência empresarial</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Requisitos Simples</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Maior de 18 anos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>CPF ou CNPJ válido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Conhecimento básico sobre IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Network de empresas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Conta bancária para recebimentos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O que dizem nossos Agentes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Histórias de sucesso reais de quem já está ganhando conosco
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "Já ganhei R$ 45.000 em comissões indicando apenas 3 clientes. O processo é simples e a onsmartAI realmente entrega resultados."
                  </p>
                  <div className="font-semibold">Carlos Silva</div>
                  <div className="text-sm text-gray-500">Consultor de TI - São Paulo</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "A renda recorrente é o melhor. Todo mês recebo das empresas que indiquei. Já são R$ 8.000 mensais fixos!"
                  </p>
                  <div className="font-semibold">Ana Costa</div>
                  <div className="text-sm text-gray-500">Empresária - Rio de Janeiro</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "Suporte incrível! Eles fazem todo o trabalho pesado. Eu só indico e acompanho os pagamentos chegando."
                  </p>
                  <div className="font-semibold">Roberto Santos</div>
                  <div className="text-sm text-gray-500">Desenvolvedor - Belo Horizonte</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Comece a Ganhar Hoje Mesmo
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cadastro gratuito, sem taxas e sem compromisso. Comece a indicar e ganhar ainda hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Cadastrar-se Gratuitamente
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 border-2 border-white hover:border-gray-100">
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

export default AgentesDigitais;
