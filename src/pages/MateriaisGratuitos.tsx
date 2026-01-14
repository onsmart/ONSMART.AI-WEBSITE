import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import ContentInDevelopment from "@/components/shared/ContentInDevelopment";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MateriaisGratuitos = () => {
  const { t } = useTranslation(['materiaisGratuitos', 'common']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="materiais gratuitos ia, e-books ia, guias inteligencia artificial, templates ia, metodologia líder"
      />
      
      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 rounded-full border border-brand-blue/20 mb-6">
            <span className="text-brand-blue font-medium text-sm">{t('hero.badge')}</span>
          </div>
          
          {/* Main title with gradient */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('hero.title')}{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Enhanced Materials Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ContentInDevelopment 
            namespace="materiaisGratuitos"
          />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/20 to-blue-600/20 rounded-full border border-brand-blue/30 mb-6">
            <span className="text-brand-blue font-medium text-sm">{t('exclusive.badge')}</span>
          </div>
          
          {/* Main title with gradient */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('exclusive.title')}{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue bg-clip-text text-transparent">
              {t('exclusive.titleHighlight')}
            </span>
            {t('exclusive.titleEnd')}
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('exclusive.description')}
          </p>
          
          {/* CTA buttons */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white px-8 py-3"
              onClick={() => navigate('/diagnostico')}
            >
              <Users className="mr-2 h-5 w-5" />
              {t('exclusive.scheduleDiagnostic')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MateriaisGratuitos;