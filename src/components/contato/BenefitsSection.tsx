
import React from "react";
import { Rocket, TrendingUp, Users } from "lucide-react";

const BenefitsSection = () => {
  const beneficios = [
    {
      icon: <Rocket className="h-6 w-6 text-white" />,
      title: "Implementação Rápida",
      description: "Agentes de IA funcionando em sua empresa em 30 dias.",
      gradient: "from-brand-blue to-blue-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Resultados Garantidos",
      description: "ROI comprovado de 420% em 6 meses de implementação.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Suporte Especializado",
      description: "Acompanhamento completo com especialistas em IA.",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <div className="mb-8">
      {/* Header - Estilo Homepage */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-brand-blue/20">
          <Rocket className="h-3 w-3" />
          Por Que Escolher a onsmart AI
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
            Especialistas
          </span> em IA Empresarial
        </h2>
      </div>
      
      {/* Cards - Estilo Homepage */}
      <div className="space-y-4">
        {beneficios.map((item, index) => (
          <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;

