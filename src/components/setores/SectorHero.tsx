import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectorData } from '@/data/sectorsData';
import ServiceChart from '@/components/shared/ServiceChart';

interface SectorHeroProps {
  sector: SectorData;
}

const SectorHero: React.FC<SectorHeroProps> = ({ sector }) => {
  const navigate = useNavigate();

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
  };

  const handleContatoClick = () => {
    navigate('/contato');
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/95 via-secondary/90 to-accent/95">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Attention - Urgency Banner */}
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse shadow-lg">
            <Calendar className="h-4 w-4" />
            <span>Diagnóstico Gratuito para {sector.name}</span>
          </div>

          {/* Interest - Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {sector.heroTitle}
          </h1>
          
          {/* Interest - Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
            {sector.heroSubtitle}
          </p>

          {/* Desire - Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>500+ empresas transformadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Implementação em 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              <span>ROI garantido</span>
            </div>
          </div>

          {/* Action - CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={handleDiagnosticoClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all hover:scale-105"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Diagnóstico Gratuito - {sector.name}
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={handleContatoClick}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105"
            >
              Falar com Especialista
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-sm text-white/70">
            <div className="flex items-center justify-center gap-6">
              <span>✓ Implementação garantida</span>
              <span>✓ Suporte especializado</span>
              <span>✓ ROI garantido em 90 dias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorHero;