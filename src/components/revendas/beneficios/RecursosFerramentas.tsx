
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Trophy } from 'lucide-react';

const RecursosFerramentas = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-gray-100">
            🛠️ Recursos Enterprise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ferramentas especializadas para vendas B2B de alto valor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center bg-white dark:bg-gray-800">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="dark:text-gray-100">Material Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Apresentações para C-Level</li>
                <li>• Cases de empresas R$ 50M-1B</li>
                <li>• ROI calculators setoriais</li>
                <li>• White papers técnicos</li>
                <li>• Demonstrações interativas</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800">
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="dark:text-gray-100">Proteção de Territorio</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Exclusividade regional/setorial</li>
                <li>• Proteção de prospects qualificados</li>
                <li>• Lead sharing estruturado</li>
                <li>• Registro de oportunidades enterprise</li>
                <li>• Política anti-conflito clara</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800">
            <CardHeader>
              <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="dark:text-gray-100">Programas de Incentivo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Concursos anuais</li>
                <li>• Prêmios por performance enterprise</li>
                <li>• Eventos exclusivos de networking</li>
                <li>• Reconhecimento público</li>
                <li>• Certificações avançadas</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecursosFerramentas;
