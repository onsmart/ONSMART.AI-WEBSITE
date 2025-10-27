
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/utils/scrollUtils";
import { Search, Clock, Users, CheckCircle, Zap, Target } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";

const DiagnosticoHero = () => {
  const scrollToForm = () => {
    scrollToElement('diagnostico-form', '#diagnostico-form-section');
  };

  // Mouse tracking for grid effect
  useEffect(() => {
    const heroSection = document.getElementById('diagnostico-hero-section');
    
    if (heroSection) {
      heroSection.style.setProperty('--mouse-x', '50%');
      heroSection.style.setProperty('--mouse-y', '50%');
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
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

  return (
    <section className="relative py-8 sm:py-10 md:py-12 overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 min-h-[75vh] flex items-center" id="diagnostico-hero-section">
      
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

      {/* Background elements */}
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 md:-top-20 md:-right-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 md:-bottom-10 md:-left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <div className="text-center animate-fade-in">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <Search className="h-3 w-3" />
            Diagnóstico Personalizado
          </div>

          {/* Headline principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-gray-900 leading-tight px-2 sm:px-0">
            <div className="mb-2">
              <span className="text-gray-900">Descubra o </span>
              <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Potencial Real</span>
            </div>
            <div className="text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              da IA em sua Empresa
            </div>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
            Análise <span className="font-bold text-brand-blue">100% gratuita</span> e <span className="font-bold text-brand-blue">personalizada</span> dos seus processos. Descubra oportunidades de automação e o ROI potencial da IA em seu negócio.
          </p>

          {/* Stats visuais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">100% Gratuito</div>
              <div className="text-xs text-gray-500">Sem custos ocultos</div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-brand-blue mb-1">45 Minutos</div>
              <div className="text-xs text-gray-500">Análise completa</div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">ROI Calculado</div>
              <div className="text-xs text-gray-500">Retorno estimado</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <AnimatedButton 
              onClick={scrollToForm} 
              animation="glow"
              className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue/90 hover:to-blue-600/90 text-white font-semibold px-6 py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all group"
            >
              <span className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Solicitar Diagnóstico Gratuito
              </span>
            </AnimatedButton>
            
            <Button 
              onClick={() => {
                const benefitsSection = document.querySelector('#benefits-section');
                if (benefitsSection) {
                  benefitsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline" 
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-6 py-3 text-base rounded-xl transition-all"
            >
              Como Funciona
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>✓ Sem compromisso</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>✓ Especialista dedicado</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>✓ Relatório personalizado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticoHero;
