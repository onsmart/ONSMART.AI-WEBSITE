
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Sparkles, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BlogNewsletter: React.FC = () => {
  const { t } = useTranslation('blog');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="relative w-full">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-10 px-4 md:py-12 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon with animation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-brand-blue/20 to-blue-600/20 p-3 rounded-full border border-brand-blue/30">
                <Mail className="h-6 w-6 text-brand-blue" />
              </div>
            </div>
          </div>

          {/* Title with gradient */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
            {t('newsletterSection.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            {t('newsletterSection.subtitle')}
          </p>

          {/* Success message */}
          {submitted ? (
            <div className="flex flex-col items-center gap-3 p-5 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <CheckCircle className="h-10 w-10 text-green-400" />
              <p className="text-green-300 font-medium text-base">
                {t('newsletterSection.success', { defaultValue: 'Inscrição realizada com sucesso!' })}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletterSection.placeholder')}
                  className="w-full h-11 md:h-12 bg-white/95 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-white/20 focus:border-brand-blue rounded-xl px-4 pr-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base transition-all duration-300 focus:ring-2 focus:ring-brand-blue/50"
                  required
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <Button 
                type="submit"
                className="h-11 md:h-12 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white font-semibold px-6 md:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('newsletterSection.button')}
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </form>
          )}

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>{t('newsletterSection.trust.noSpam', { defaultValue: 'Sem spam' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>{t('newsletterSection.trust.unsubscribe', { defaultValue: 'Cancele quando quiser' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>{t('newsletterSection.trust.weekly', { defaultValue: 'Conteúdo semanal' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewsletter;
