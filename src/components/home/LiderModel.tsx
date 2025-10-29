import React from "react";
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  ChartBarIncreasing,
  Smartphone, 
  Briefcase 
} from "lucide-react";

const LiderModel = () => {
  const { t } = useTranslation('home');
  return (
    <section id="lider-model" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            {t('lider.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            {t('lider.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">LÍDER</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl">
            {t('lider.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {(t('lider.pillars', { returnObjects: true }) as Array<{
            name: string;
            description: string;
          }>).map((pillar, index) => {
            const colors = [
              'text-brand-blue',
              'text-green-600',
              'text-orange-600',
              'text-purple-600',
              'text-cyan-600',
              'text-indigo-600'
            ];
            return (
              <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <h3 className={`font-bold ${colors[index]} mb-2 sm:mb-3 text-base sm:text-lg`}>{pillar.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiderModel;
