
import React from 'react';
import { Button } from "@/components/ui/button";
import IconBox from './IconBox';
import { 
  Briefcase, 
  Building, 
  Stethoscope, 
  ShoppingBag, 
  GraduationCap,
  Users, 
  LineChart, 
  Code 
} from 'lucide-react';

interface SectorsTabProps {
  handleContactClick: () => void;
}

const SectorsTab: React.FC<SectorsTabProps> = ({ handleContactClick }) => {
  const sectors = [
    { icon: Briefcase, title: "Tecnologia", color: "primary" },
    { icon: Building, title: "Finanças", color: "secondary" },
    { icon: Stethoscope, title: "Saúde", color: "accent" },
    { icon: ShoppingBag, title: "Varejo", color: "primary" },
    { icon: GraduationCap, title: "Educação", color: "secondary" },
    { icon: Users, title: "Recursos Humanos", color: "accent" },
    { icon: LineChart, title: "Marketing", color: "primary" },
    { icon: Code, title: "Desenvolvimento", color: "secondary" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800/30 rounded-xl p-8 shadow-sm animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-center">Setores de Atuação</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sectors.map((sector, index) => (
          <div key={index} style={{ animationDelay: `${0.1 * index}s` }} className="animate-fade-in">
            <IconBox icon={sector.icon} title={sector.title} color={sector.color as string} />
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-lg mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>Nossa solução se adapta às necessidades específicas de cada setor.</p>
        <Button 
          onClick={handleContactClick} 
          className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:translate-y-[-2px] transition-all duration-300 font-semibold px-6 py-3 animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          Consulte nossa experiência no seu setor
        </Button>
      </div>
    </div>
  );
};

export default SectorsTab;
