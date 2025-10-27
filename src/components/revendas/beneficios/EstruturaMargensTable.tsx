
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EstruturaMargensTable = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            📊 Estrutura de Margens Enterprise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Margens progressivas baseadas em volume e especialização
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-4">Nível de Revenda</th>
                    <th className="text-left py-4">Volume Anual</th>
                    <th className="text-left py-4">Margem Base</th>
                    <th className="text-left py-4">Bonificação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4"><Badge variant="outline">Iniciante</Badge></td>
                    <td className="py-4">R$ 1M - R$ 2M</td>
                    <td className="py-4 font-semibold text-green-600">25%</td>
                    <td className="py-4">1%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4"><Badge className="bg-gray-400">Especialista</Badge></td>
                    <td className="py-4">R$ 2M - R$ 3M</td>
                    <td className="py-4 font-semibold text-green-600">28%</td>
                    <td className="py-4">2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4"><Badge className="bg-yellow-500">Enterprise</Badge></td>
                    <td className="py-4">R$ 3M - R$ 5M</td>
                    <td className="py-4 font-semibold text-green-600">32%</td>
                    <td className="py-4">3%</td>
                  </tr>
                  <tr>
                    <td className="py-4"><Badge className="bg-purple-600">Strategic</Badge></td>
                    <td className="py-4">R$ 5M+</td>
                    <td className="py-4 font-semibold text-green-600">35%</td>
                    <td className="py-4">5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Nota:</strong> Margens calculadas sobre vendas para empresas de R$ 50M-1B de faturamento. 
                Bonificações pagas trimestralmente mediante atingimento de metas qualificadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EstruturaMargensTable;
