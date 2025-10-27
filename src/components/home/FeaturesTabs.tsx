
import React from 'react';
import { Tabs, TabsList } from "@/components/ui/tabs";
import { 
  Brain, 
  Network, 
  Zap, 
  Users, 
  BarChart3, 
  Settings
} from 'lucide-react';
import FeaturesHeader from './features/FeaturesHeader';
import FeatureTab from './features/FeatureTab';
import FeatureTabContent from './features/FeatureTabContent';

const FeaturesTabs = () => {
  const features = [
    {
      id: "cognitividade",
      label: "Cognitividade",
      icon: Brain,
      title: "Inteligência Cognitiva Avançada",
      description: "Agentes com capacidade de raciocínio, aprendizado e tomada de decisão autônoma.",
      benefits: [
        "Processamento de linguagem natural",
        "Análise contextual inteligente", 
        "Aprendizado contínuo",
        "Decisões baseadas em dados"
      ],
      impact: {
        productivity: "+350%",
        costReduction: "-45%",
        implementationTime: "14 dias",
        roi: "650%"
      }
    },
    {
      id: "interfaces",
      label: "Interfaces",
      icon: Network,
      title: "Interfaces Intuitivas e Conectadas",
      description: "Comunicação fluida entre sistemas, pessoas e processos empresariais.",
      benefits: [
        "APIs robustas e flexíveis",
        "Integração com sistemas existentes",
        "Interface de usuário intuitiva",
        "Comunicação multicanal"
      ],
      impact: {
        productivity: "+280%",
        costReduction: "-35%",
        implementationTime: "7 dias",
        roi: "450%"
      }
    },
    {
      id: "otimizacao",
      label: "Otimização",
      icon: Zap,
      title: "Otimização Contínua de Processos",
      description: "Melhoria constante da eficiência e produtividade empresarial.",
      benefits: [
        "Automação inteligente",
        "Redução de custos operacionais",
        "Aumento de produtividade",
        "Monitoramento em tempo real"
      ],
      impact: {
        productivity: "+520%",
        costReduction: "-70%",
        implementationTime: "30 dias",
        roi: "950%"
      }
    },
    {
      id: "escalabilidade",
      label: "Escalabilidade",
      icon: Users,
      title: "Crescimento Sem Limites",
      description: "Solução que cresce junto com seu negócio, mantendo a qualidade.",
      benefits: [
        "Arquitetura cloud-native",
        "Expansão automática de recursos",
        "Performance consistente",
        "Suporte a múltiplos usuários"
      ],
      impact: {
        productivity: "+180%",
        costReduction: "-25%",
        implementationTime: "3 dias",
        roi: "300%"
      }
    },
    {
      id: "orquestracao",
      label: "Orquestração",
      icon: BarChart3,
      title: "Orquestração Empresarial",
      description: "Coordenação inteligente de todos os processos e departamentos.",
      benefits: [
        "Workflow automatizado",
        "Sincronização de processos",
        "Governança corporativa",
        "Visibilidade end-to-end"
      ],
      impact: {
        productivity: "+420%",
        costReduction: "-55%",
        implementationTime: "28 dias",
        roi: "780%"
      }
    },
    {
      id: "interoperabilidade",
      label: "Interoperabilidade",
      icon: Settings,
      title: "Conexão Total de Sistemas",
      description: "Integração perfeita com qualquer sistema ou plataforma existente.",
      benefits: [
        "Conectores pré-construídos",
        "Padrões de integração",
        "Migração sem interrupção",
        "Compatibilidade universal"
      ],
      impact: {
        productivity: "+240%",
        costReduction: "-40%",
        implementationTime: "10 dias",
        roi: "520%"
      }
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-brand-blue/5 via-blue-50/40 to-white dark:bg-gradient-to-br dark:from-brand-blue/10 dark:via-blue-900/20 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <FeaturesHeader />

        <div className="mt-8 sm:mt-10 md:mt-12">
          <Tabs defaultValue="cognitividade" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6 sm:mb-8 h-auto p-2 bg-transparent">
              {features.map((feature) => (
                <FeatureTab 
                  key={feature.id}
                  id={feature.id}
                  label={feature.label}
                  icon={feature.icon}
                />
              ))}
            </TabsList>

            {features.map((feature) => (
              <FeatureTabContent
                key={feature.id}
                id={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                benefits={feature.benefits}
                impact={feature.impact}
              />
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTabs;
