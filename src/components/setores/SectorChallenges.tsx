import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { SectorData } from '@/data/sectorsData';

interface SectorChallengesProps {
  sector: SectorData;
}

const SectorChallenges: React.FC<SectorChallengesProps> = ({ sector }) => {
  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
      <div className="container mx-auto max-w-6xl">
        {/* Attention - Problem Awareness */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <AlertTriangle className="h-4 w-4" />
            Problemas Críticos no Setor
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Desafios que Impedem o Crescimento em {sector.name}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Identifique se sua empresa enfrenta esses obstáculos que limitam produtividade e resultados
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sector.challenges.map((challenge, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                    {challenge}
                  </p>
                </div>
              </div>
              
              {/* Subtle animation on hover */}
              <div className="mt-4 h-1 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Sua empresa enfrenta esses desafios?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nossa IA especializada resolve cada um desses problemas de forma automatizada e eficiente
            </p>
            
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Solução disponível - Implementação em 30 dias
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorChallenges;
