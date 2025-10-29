import React, { useEffect } from "react";
import { ArrowRight, Clock, Users, Star, TrendingUp, Zap } from "lucide-react";
import { useTranslation } from "react-i18next"; // Hook para traduções
import { Button } from "@/components/ui/button";
import AnimatedButton from "@/components/ui/animated-button";
import DynamicVisualElements from "./DynamicVisualElements";
import { useConversionMetrics } from "@/hooks/useConversionMetrics";
import { getUrgencyMessage } from "@/utils/urgencyMessages";
import TypewriterText from "@/components/ui/TypewriterText";

interface HeroSectionProps {
  handleContactClick: () => void;
  handleLearnMoreClick: () => void;
}

const HeroSection = ({ handleContactClick, handleLearnMoreClick }: HeroSectionProps) => {
  // Hook useTranslation: fornece função 't' para traduzir e 'i18n' para controlar idioma
  // Usamos namespace 'home' porque nossos textos estão em home.json
  const { t } = useTranslation('home');
  const { trackConversion } = useConversionMetrics();

  // Mouse tracking for grid effect in hero section
  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    
    // Set initial position to center
    if (heroSection) {
      heroSection.style.setProperty('--mouse-x', '50%');
      heroSection.style.setProperty('--mouse-y', '50%');
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Only track mouse when it's over the hero section
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          // Calculate position as percentage relative to the hero section
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          heroSection.style.setProperty('--mouse-x', `${x}%`);
          heroSection.style.setProperty('--mouse-y', `${y}%`);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  const handleCtaClick = () => {
    trackConversion({
      component: 'hero_section',
      action: 'primary_cta_click',
      funnel_step: 'conversion_intent',
      value: 1
    });
    handleContactClick();
  };

  const handleSecondaryClick = () => {
    trackConversion({
      component: 'hero_section',
      action: 'secondary_cta_click',
      funnel_step: 'information_seeking'
    });
    handleLearnMoreClick();
  };

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-white min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center" id="hero-section">
      
      {/* Grid Background with cursor effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          backgroundImage: `
            linear-gradient(to right, #9ca3af 1px, transparent 1px),
            linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.3,
          maskImage: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)'
        }}
      ></div>

      {/* Background elements - Responsive */}
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 md:-top-20 md:-right-20 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-brand-blue/15 rounded-full blur-blob z-2"></div>
      <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-10 md:-left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 bg-brand-blue-light/20 rounded-full blur-blob z-2"></div>
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="text-center animate-fade-in">
          {/* Badge minimalista */}
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            {t('hero.badge')}
          </div>
          
          {/* Headline principal - Hero (maior que outras seções) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight px-2 sm:px-0">
            <div className="mb-2 sm:mb-3">
              {t('hero.titleStart')}
            </div>
            <div className="mb-2 sm:mb-3">
              <TypewriterText 
                texts={t('hero.typewriterTexts', { returnObjects: true }) as string[]}
                className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent"
                speed={120}
                deleteSpeed={60}
                pauseTime={2000}
              />
            </div>
            <div className="text-gray-900">
              {t('hero.titleEnd')} <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{t('hero.days')}</span>
            </div>
          </h1>
          
          {/* Subheadline compacto */}
          {/* Usamos dangerouslySetInnerHTML porque o JSON tem tags <strong> */}
          <p 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-2 md:px-0"
            dangerouslySetInnerHTML={{ __html: t('hero.subtitle', { count: 350 }) }}
          />

          {/* Stats minimalistas */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-3xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base text-gray-600">
            <div className="text-center">
              <span className="font-bold text-brand-blue">350+</span> {t('hero.stats.companies', { count: 350 })}
            </div>
            <div className="text-center">
              <span className="font-bold text-green-600">420%</span> {t('hero.stats.increase', { percent: 420 })}
            </div>
            <div className="text-center">
              <span className="font-bold text-orange-600">30</span> {t('hero.stats.implementation', { days: 30 })}
            </div>
          </div>
          
          {/* CTA Section compacta */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <AnimatedButton 
              onClick={handleCtaClick} 
              animation="glow"
              className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue/90 hover:to-blue-600/90 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-lg shadow-lg hover:shadow-xl transition-all group"
            >
              <span className="flex items-center">
                <span className="hidden sm:inline">{t('hero.cta.primary')}</span>
                <span className="sm:hidden">{t('hero.cta.primaryMobile')}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </AnimatedButton>
            
            <Button 
              onClick={handleSecondaryClick}
              variant="outline" 
              className="group relative border-2 border-brand-blue/30 text-brand-blue hover:border-brand-blue/60 font-semibold px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-lg transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-brand-blue/20"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Text content */}
              <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                {t('hero.cta.secondary')}
                <svg 
                  className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out" />
            </Button>
          </div>

          {/* Trust indicators minimalistas */}
          <div className="text-sm sm:text-base text-gray-500 space-x-4 sm:space-x-6">
            <span>{t('hero.trust.freeDiagnostic')}</span>
            <span>•</span>
            <span>{t('hero.trust.noCommitment')}</span>
            <span>•</span>
            <span>{t('hero.trust.results')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
