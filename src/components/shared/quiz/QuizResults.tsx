
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

interface QuizResultsData {
  roi: string;
  monthlySavings: string;
  timeReduction: string;
  paybackMonths: number;
}

interface QuizResultsProps {
  results: QuizResultsData;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results }) => {
  return (
    <Card className="max-w-2xl mx-auto border-2 border-brand-blue/20 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-blue/10 to-brand-blue-light/10 border-b">
        <CardTitle className="text-center text-2xl font-bold text-brand-black">
          🎯 Seu Potencial de Transformação com IA
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6 opacity-0 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{results.roi}</div>
              <div className="text-sm text-green-600">ROI Estimado (1 ano)</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center border-2 border-blue-200">
              <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-700">R$ {results.monthlySavings}</div>
              <div className="text-sm text-blue-600">Economia Mensal</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-200">
              <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{results.timeReduction}</div>
              <div className="text-sm text-purple-600">Redução Tempo Manual</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center border-2 border-orange-200">
              <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{results.paybackMonths} meses</div>
              <div className="text-sm text-orange-600">Retorno do Investimento</div>
            </div>
          </div>

          <div className="bg-brand-blue/10 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3 text-brand-black">💡 Análise Personalizada:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Sua empresa tem alto potencial de automação com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Implementação recomendada: VIBE ENTERPRISE</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>ROI esperado superior à média do mercado</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full bg-brand-black text-white py-6 text-lg hover:bg-brand-black/90"
              onClick={() => window.location.href = '/contato'}
            >
              Agendar Consultoria Gratuita (15 min)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-brand-blue text-brand-blue py-4"
              onClick={() => window.location.href = '/diagnostico'}
            >
              Fazer Diagnóstico Completo
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
            🛡️ <strong>Garantia:</strong> Se não alcançarmos estes resultados em 90 dias, devolvemos 100% do investimento
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;
