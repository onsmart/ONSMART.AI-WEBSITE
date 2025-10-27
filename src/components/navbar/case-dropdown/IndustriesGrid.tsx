
import React from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Building, 
  Stethoscope, 
  ShoppingBag, 
  GraduationCap, 
  ArrowRight,
  Zap,
  LineChart,
  Users,
  ShieldCheck,
  Clock,
  BarChart4,
  Brain,
  HeartPulse,
  Microscope,
  BadgePercent,
  ShoppingCart,
  Store,
  BookOpen,
  Presentation,
  Library
} from "lucide-react";
import IndustryCategory from "./IndustryCategory";

interface IndustriesGridProps {
  onMenuItemClick?: () => void;
}

const IndustriesGrid: React.FC<IndustriesGridProps> = ({ onMenuItemClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <IndustryCategory
        icon={Briefcase}
        name="Tecnologia"
        description="Impacto da IA em empresas de tecnologia e desenvolvimento"
        features={[
          { icon: Zap, text: "Automação de processos" },
          { icon: LineChart, text: "+300% de produtividade" },
          { icon: Users, text: "Equipes mais eficientes" }
        ]}
        caseCount={5}
        path="/case-de-sucesso?tab=technology"
        bgColor="bg-primary"
        onClick={onMenuItemClick}
      />
      
      <IndustryCategory
        icon={Building}
        name="Finanças"
        description="Soluções para instituições financeiras e fintechs"
        features={[
          { icon: ShieldCheck, text: "Detecção de fraudes" },
          { icon: Clock, text: "Decisões mais rápidas" },
          { icon: BarChart4, text: "Análise preditiva" }
        ]}
        caseCount={3}
        path="/case-de-sucesso?tab=finance"
        bgColor="bg-primary"
        onClick={onMenuItemClick}
      />
      
      <IndustryCategory
        icon={Stethoscope}
        name="Saúde"
        description="Transformação digital do setor de saúde"
        features={[
          { icon: Brain, text: "Diagnósticos precisos" },
          { icon: HeartPulse, text: "Monitoramento contínuo" },
          { icon: Microscope, text: "Pesquisa avançada" }
        ]}
        caseCount={4}
        path="/case-de-sucesso?tab=healthcare"
        bgColor="bg-red-500"
        onClick={onMenuItemClick}
      />
      
      <IndustryCategory
        icon={ShoppingBag}
        name="Varejo"
        description="Inovação no comércio e experiência do cliente"
        features={[
          { icon: BadgePercent, text: "+52% em conversões" },
          { icon: ShoppingCart, text: "Personalização em tempo real" },
          { icon: Store, text: "Gestão de estoque otimizada" }
        ]}
        caseCount={3}
        path="/case-de-sucesso?tab=retail"
        bgColor="bg-purple-600"
        onClick={onMenuItemClick}
      />
      
      <IndustryCategory
        icon={GraduationCap}
        name="Educação"
        description="Transformando o aprendizado e a gestão educacional"
        features={[
          { icon: BookOpen, text: "Aprendizado personalizado" },
          { icon: Presentation, text: "Automação administrativa" },
          { icon: Library, text: "Recursos adaptativos" }
        ]}
        caseCount={2}
        path="/case-de-sucesso?tab=education"
        bgColor="bg-secondary"
        onClick={onMenuItemClick}
      />
      
      <Link 
        to="/case-de-sucesso"
        onClick={onMenuItemClick}
        className="flex flex-col justify-center items-center h-full border border-dashed border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center p-4"
      >
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
          <ArrowRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Ver todos os setores</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Explore nossos cases</span>
      </Link>
    </div>
  );
};

export default IndustriesGrid;
