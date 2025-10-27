
import React from "react";
import { Award, TrendingUp } from "lucide-react";
import CaseItem from "./CaseItem";

interface FeaturedCasesProps {
  onMenuItemClick?: () => void;
}

const FeaturedCases: React.FC<FeaturedCasesProps> = ({ onMenuItemClick }) => {
  return (
    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
      <h2 className="font-semibold text-sm text-gray-500 mb-3 px-2 flex items-center">
        <Award className="h-4 w-4 mr-2 text-primary" />
        Cases em Destaque
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-1">
          <CaseItem
            icon={Award}
            title="TechSolutions"
            sector="Desenvolvimento de Software"
            result="+300% de produtividade"
            path="/case-de-sucesso?tab=technology"
            color="bg-primary"
            onClick={onMenuItemClick}
            isNew={true}
          />
        </div>
        <div className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 rounded-lg p-1">
          <CaseItem
            icon={TrendingUp}
            title="Banco Nacional"
            sector="Detecção de Fraudes"
            result="+78% na detecção"
            path="/case-de-sucesso?tab=finance"
            color="bg-blue-500"
            onClick={onMenuItemClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedCases;
