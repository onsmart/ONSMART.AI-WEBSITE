
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, BookOpen, FileText } from 'lucide-react';

const BlogHero: React.FC = () => {
  const { t } = useTranslation('blog');

  return (
    <section className="relative py-20 md:py-24 px-4 md:px-6 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black">
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/20 to-blue-600/20 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-brand-blue/30 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Conteúdo Exclusivo</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {t('hero.title')}
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <FileText className="h-5 w-5 text-brand-blue" />
            <span className="text-white font-semibold">Artigos</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <BookOpen className="h-5 w-5 text-green-400" />
            <span className="text-white font-semibold">E-books</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
