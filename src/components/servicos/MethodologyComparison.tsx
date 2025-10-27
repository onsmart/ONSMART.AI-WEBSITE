
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Users, Target } from 'lucide-react';

const MethodologyComparison = () => {
  const comparisons = [
    {
      aspect: "Tempo de Implementação",
      traditional: "6-12 meses",
      onsmart: "4-8 semanas", 
      icon: Clock,
      advantage: "onsmart"
    },
    {
      aspect: "Envolvimento da Equipe",
      traditional: "Limitado aos TI",
      onsmart: "Toda organização",
      icon: Users,
      advantage: "onsmart"
    },
    {
      aspect: "Foco em Resultados",
      traditional: "Tecnologia primeiro",
      onsmart: "Negócio primeiro",
      icon: Target,
      advantage: "onsmart"
    },
    {
      aspect: "Adaptação às Mudanças",
      traditional: "Processo rígido",
      onsmart: "Metodologia ágil",
      icon: CheckCircle,
      advantage: "onsmart"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Por Que Nossa Metodologia é Diferente?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comparamos nossa abordagem com métodos tradicionais de implementação de IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                Abordagem Tradicional
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {comparisons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{item.aspect}</div>
                      <div className="text-red-600 dark:text-red-400">{item.traditional}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="bg-primary/10">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Metodologia onsmartAI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {comparisons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{item.aspect}</div>
                      <div className="text-green-600 dark:text-green-400 font-medium">{item.onsmart}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Resultados 3x mais rápidos com nossa metodologia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyComparison;
