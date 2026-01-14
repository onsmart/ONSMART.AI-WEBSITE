import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Shield, 
  Users, 
  Activity,
  Brain,
  GitBranch
} from 'lucide-react';

const WhyAIAgents: React.FC = () => {
  const { t } = useTranslation('home');
  
  const benefits = t('whyAIAgents.items', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
  }>;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    Clock,
    TrendingUp,
    Shield,
    Users,
    BarChart3: Activity,
    Activity,
    Brain,
    Network: GitBranch,
    GitBranch,
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="text-brand-blue text-xs sm:text-sm md:text-base font-medium mb-3 sm:mb-4 md:mb-6">
            {t('whyAIAgents.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-gray-100 px-2">
            {t('whyAIAgents.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('whyAIAgents.titleHighlight')}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            {t('whyAIAgents.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            // Get icon name and map to component
            const iconName = benefit.icon.trim();
            let IconComponent: React.ComponentType<{ className?: string }> = Brain;
            
            // Direct mapping with fallbacks
            switch (iconName) {
              case 'Zap':
                IconComponent = Zap;
                break;
              case 'Clock':
                IconComponent = Clock;
                break;
              case 'TrendingUp':
                IconComponent = TrendingUp;
                break;
              case 'Shield':
                IconComponent = Shield;
                break;
              case 'Users':
                IconComponent = Users;
                break;
              case 'BarChart3':
                IconComponent = Activity;
                break;
              case 'Brain':
                IconComponent = Brain;
                break;
              case 'Network':
                IconComponent = GitBranch;
                break;
              default:
                IconComponent = iconMap[iconName] || Brain;
            }
            
            return (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 group overflow-hidden h-full flex flex-col"
              >
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0 rounded-lg sm:rounded-xl animate-gradient-border"
                    style={{
                      background: 'linear-gradient(90deg, #3b82f6, #2563eb, #1d4ed8, #2563eb, #3b82f6)',
                      backgroundSize: '200% 100%',
                      padding: '2px'
                    }}
                  >
                    <div className="absolute inset-[2px] rounded-lg sm:rounded-xl bg-white dark:bg-gray-800"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${benefit.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white flex-shrink-0" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAIAgents;

