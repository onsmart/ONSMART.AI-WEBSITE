
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Clock, Target, Award } from 'lucide-react';

const MethodologyInfographic = () => {
  const phases = [
    {
      phase: "1",
      title: "Diagnóstico",
      duration: "1-2 semanas",
      icon: Target,
      color: "bg-blue-500",
      activities: [
        "Análise de processos atuais",
        "Identificação de oportunidades",
        "Mapeamento de stakeholders",
        "Avaliação de maturidade"
      ]
    },
    {
      phase: "2", 
      title: "Estratégia",
      duration: "2-3 semanas",
      icon: Clock,
      color: "bg-green-500",
      activities: [
        "Definição de roadmap",
        "Seleção de tecnologias",
        "Planejamento de recursos",
        "Cronograma detalhado"
      ]
    },
    {
      phase: "3",
      title: "Implementação",
      duration: "4-8 semanas",
      icon: CheckCircle,
      color: "bg-orange-500",
      activities: [
        "Desenvolvimento de soluções",
        "Integração com sistemas",
        "Testes e validação",
        "Treinamento da equipe"
      ]
    },
    {
      phase: "4",
      title: "Otimização",
      duration: "Contínuo",
      icon: Award,
      color: "bg-purple-500",
      activities: [
        "Monitoramento de performance",
        "Ajustes e melhorias",
        "Suporte técnico",
        "Evolução da solução"
      ]
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <h3 className="text-2xl font-bold text-center mb-8">Nossa Metodologia Comprovada</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div key={phase.phase} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3`}>
                        {phase.phase}
                      </div>
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <h4 className="font-bold text-lg mb-2">{phase.title}</h4>
                    <p className="text-sm text-gray-500 mb-4">{phase.duration}</p>
                    
                    <ul className="space-y-2">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MethodologyInfographic;
