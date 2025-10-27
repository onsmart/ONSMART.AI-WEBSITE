import React from 'react';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SectorData } from '@/data/sectorsData';

interface SectorSolutionsProps {
  sector: SectorData;
}

const SectorSolutions: React.FC<SectorSolutionsProps> = ({ sector }) => {
  const navigate = useNavigate();

  const handleSolutionClick = (solutionTitle: string) => {
    // Track solution interest
  };

  const handleCTAClick = () => {
    navigate('/contato');
  };

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto max-w-6xl">
        {/* Interest - Solution Presentation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="h-4 w-4" />
            Soluções Especializadas
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Como Resolvemos os Problemas em {sector.name}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossas soluções de IA foram desenvolvidas especificamente para superar os desafios únicos do seu setor
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sector.solutions.map((solution, index) => (
            <div 
              key={index}
              onClick={() => handleSolutionClick(solution.title)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {solution.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-2">
                {solution.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pronto para Transformar Seu {sector.name}?
          </h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Descubra como nossas soluções podem resolver os problemas específicos da sua empresa
          </p>
          
          <Button 
            onClick={handleCTAClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Solicitar Consultoria Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SectorSolutions;