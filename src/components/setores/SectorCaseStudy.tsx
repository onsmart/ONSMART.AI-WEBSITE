import React from 'react';
import { TrendingUp, Building, Target, Award } from 'lucide-react';
import { SectorData } from '@/data/sectorsData';

interface SectorCaseStudyProps {
  sector: SectorData;
}

const SectorCaseStudy: React.FC<SectorCaseStudyProps> = ({ sector }) => {
  const { caseStudy } = sector;

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto max-w-6xl">
        {/* Desire - Social Proof */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4" />
            Caso de Sucesso Real
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Como Transformamos uma Empresa do Setor
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Veja os resultados reais alcançados por uma empresa que implementou nossa solução de IA
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Company Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{caseStudy.company}</h3>
                <p className="text-purple-100">Empresa do setor {sector.name}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Challenge */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-red-600" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Desafio Inicial
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Nossa Solução
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Results */}
            <div>
              <h4 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                Resultados Alcançados
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.results.map((result, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {result.improvement}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
              <div className="text-center">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Tempo de Implementação
                </h5>
                <div className="text-2xl font-bold text-purple-600 mb-2">30 dias</div>
                <p className="text-gray-600 dark:text-gray-300">
                  Da contratação aos primeiros resultados mensuráveis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Sua empresa pode ser a próxima!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Resultados similares são possíveis para qualquer empresa do setor {sector.name}
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Implementação garantida em 30 dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorCaseStudy;
