
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calculator, UserCheck, ArrowRight, CheckCircle } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useTranslation } from 'react-i18next';

const AgentesDigitaisComissoes = () => {
  const { t } = useTranslation(['agentesDigitaisComissoes', 'common']);
  
  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        pageType="service"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  {t('hero.buttons.becomeAgent')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/agentes-digitais">
                  {t('hero.buttons.viewProgram')}
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
                {t('commissions.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('commissions.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-xl">{t('commissions.basic.title')}</CardTitle>
                  <CardDescription>{t('commissions.basic.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">{t('commissions.basic.percentage')}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('commissions.basic.note')}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('commissions.basic.examples.5000')}</span>
                      <span className="font-semibold">{t('commissions.basic.examples.5000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.basic.examples.15000')}</span>
                      <span className="font-semibold">{t('commissions.basic.examples.15000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.basic.examples.25000')}</span>
                      <span className="font-semibold">{t('commissions.basic.examples.25000Value')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl">{t('commissions.medium.title')}</CardTitle>
                  <CardDescription>{t('commissions.medium.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{t('commissions.medium.percentage')}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('commissions.medium.note')}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('commissions.medium.examples.25000')}</span>
                      <span className="font-semibold">{t('commissions.medium.examples.25000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.medium.examples.35000')}</span>
                      <span className="font-semibold">{t('commissions.medium.examples.35000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.medium.examples.50000')}</span>
                      <span className="font-semibold">{t('commissions.medium.examples.50000Value')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-xl">{t('commissions.enterprise.title')}</CardTitle>
                  <CardDescription>{t('commissions.enterprise.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{t('commissions.enterprise.percentage')}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('commissions.enterprise.note')}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('commissions.enterprise.examples.50000')}</span>
                      <span className="font-semibold">{t('commissions.enterprise.examples.50000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.enterprise.examples.100000')}</span>
                      <span className="font-semibold">{t('commissions.enterprise.examples.100000Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('commissions.enterprise.examples.200000')}</span>
                      <span className="font-semibold">{t('commissions.enterprise.examples.200000Value')}</span>
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
                  {t('recurring.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {t('recurring.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{t('recurring.examples.10000.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('recurring.examples.10000.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{t('recurring.examples.50000.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('recurring.examples.50000.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{t('recurring.examples.100000.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('recurring.examples.100000.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>{t('recurring.realExample.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>{t('recurring.realExample.client')}</span>
                      <span className="font-semibold">{t('recurring.realExample.tier')}</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span>{t('recurring.realExample.initial')}</span>
                      <span className="font-bold text-green-600">R$ 54.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('recurring.realExample.recurring')}</span>
                      <span className="font-bold text-green-600">R$ 7.200</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">{t('recurring.realExample.total')}</span>
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
              {t('calculator.title')}
            </h2>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <Calculator className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <CardTitle>{t('calculator.cardTitle')}</CardTitle>
                <CardDescription>
                  {t('calculator.cardDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('calculator.label')}</label>
                    <input 
                      type="number" 
                      placeholder={t('calculator.placeholder')}
                      className="w-full p-3 border rounded-lg text-center text-lg"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {t('calculator.button')}
                  </Button>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('calculator.helper')}
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
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/agentes-digitais/cadastro">
                  <UserCheck className="mr-2 h-5 w-5" />
                  {t('cta.buttons.signup')}
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 border-2 border-white hover:border-gray-100">
                <Link to="/contato">
                  {t('cta.buttons.contact')}
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
