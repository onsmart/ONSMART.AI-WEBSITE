import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Send, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import UnifiedSEO from "@/components/shared/UnifiedSEO";

const ContatoObrigado = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['contato', 'common']);

  return (
    <>
      <UnifiedSEO 
        title={t('success.title')}
        description={t('success.message')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                {t('success.title')}
              </span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200/50">
              <p className="text-gray-700 text-center text-sm sm:text-base">
                <span className="font-bold text-green-600">{t('success.message')}</span><br/>
                {t('success.responseTime')} <span className="font-bold text-brand-blue">{t('success.responseTimeValue')}</span> {t('success.responseTimeEnd')}
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span>{t('success.responseTimeLabel')}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate('/contato')}
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                {t('success.sendAnother')}
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                {t('success.backToHome')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContatoObrigado;

