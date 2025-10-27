
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Target } from 'lucide-react';

const BeneficiosFinanceiros = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            💰 Benefícios Financeiros
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Margens competitivas focadas em vendas enterprise de alto valor
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <DollarSign className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Margens Competitivas</CardTitle>
              <CardDescription>25% a 35% de margem</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Margens sólidas que variam conforme volume e especialização em empresas de médio-grande porte.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Bonificações por Meta</CardTitle>
              <CardDescription>Até 5% adicional</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Bonificações progressivas para revendas que atingem metas anuais com clientes qualificados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <Target className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Revenue Recorrente</CardTitle>
              <CardDescription>Participação no MRR</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Participe da receita recorrente mensal dos clientes enterprise que você conquistar.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BeneficiosFinanceiros;
