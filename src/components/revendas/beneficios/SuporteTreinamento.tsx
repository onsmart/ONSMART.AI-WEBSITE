
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones } from 'lucide-react';

const SuporteTreinamento = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-gray-100">
            🎓 Suporte e Treinamento Enterprise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Capacitação especializada para vendas B2B complexas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="dark:text-gray-100">Treinamentos Especializados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="dark:text-gray-300">Certificação em Metodologia LÍDER (40h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="dark:text-gray-300">Vendas B2B para empresas R$ 50M-1B</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="dark:text-gray-300">ROI de IA para diferentes setores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="dark:text-gray-300">Workshops mensais de atualização</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <Headphones className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle className="dark:text-gray-100">Suporte Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="dark:text-gray-300">Gerente de contas dedicado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="dark:text-gray-300">Suporte técnico especializado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="dark:text-gray-300">Acompanhamento em reuniões C-Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="dark:text-gray-300">Portal exclusivo de recursos enterprise</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuporteTreinamento;
