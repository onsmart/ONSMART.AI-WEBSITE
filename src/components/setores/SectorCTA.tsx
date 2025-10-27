import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectorData } from '@/data/sectorsData';

interface SectorCTAProps {
  sector: SectorData;
}

const SectorCTA: React.FC<SectorCTAProps> = ({ sector }) => {
  const navigate = useNavigate();

  const handleContatoClick = () => {
    navigate('/contato');
  };

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
  };

  return (
    <section className="py-16 px-4 md:px-6 bg-blue-600">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {sector.ctaTitle}
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          {sector.ctaSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleContatoClick}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Solicitar Orçamento
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleDiagnosticoClick}
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium bg-transparent"
          >
            Diagnóstico Gratuito
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SectorCTA;