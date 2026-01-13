import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContentInDevelopmentProps {
  namespace?: string;
  customTitle?: string;
  customDescription?: string;
  customMessage?: string;
}

const ContentInDevelopment: React.FC<ContentInDevelopmentProps> = ({
  namespace = 'common',
  customTitle,
  customDescription,
  customMessage
}) => {
  const { t } = useTranslation(namespace);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon with animation */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-brand-blue/10 to-blue-600/10 p-4 rounded-lg border border-brand-blue/20 group-hover:scale-110 group-hover:border-brand-blue/40 transition-all duration-300">
              <BookOpen className="h-10 w-10 text-brand-blue group-hover:rotate-6 transition-transform duration-300" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300">
            {customTitle || t('contentInDevelopment.title', { defaultValue: 'Conteúdo em Desenvolvimento' })}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
            {customDescription || t('contentInDevelopment.description', { 
              defaultValue: 'Estamos preparando conteúdos exclusivos sobre Growth Marketing, Inteligência Artificial e automação para você.' 
            })}
          </p>

          {/* Bottom message with icon */}
          <div className="flex items-center gap-2 text-brand-blue font-medium text-sm md:text-base">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span>
              {customMessage || t('contentInDevelopment.message', { 
                defaultValue: 'Em breve você encontrará insights valiosos aqui' 
              })}
            </span>
          </div>
        </div>

        {/* Hover effect - progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-b-xl overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ContentInDevelopment;

