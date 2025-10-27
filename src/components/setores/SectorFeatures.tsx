import React from 'react';
import { Sparkles } from 'lucide-react';
import { SectorData } from '@/data/sectorsData';

interface SectorFeaturesProps {
  sector: SectorData;
}

const SectorFeatures: React.FC<SectorFeaturesProps> = ({ sector }) => {
  return (
    <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            Recursos Exclusivos
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Tecnologia Especializada para {sector.name}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recursos únicos desenvolvidos especificamente para as necessidades do seu setor
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sector.features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Effect */}
              <div className="mt-6 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Mais que Tecnologia: Uma Parceria Estratégica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-indigo-100">Suporte Especializado</div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">90 dias</div>
                <div className="text-indigo-100">Garantia de Resultados</div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-indigo-100">Personalização</div>
              </div>
            </div>
            
            <p className="text-lg text-indigo-100 mt-8 max-w-3xl mx-auto">
              Nossa equipe de especialistas trabalha lado a lado com você para garantir 
              que a IA seja perfeitamente adaptada aos processos únicos do seu negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorFeatures;
