
import React from 'react';
import ServiceCard from './ServiceCard';
import { Briefcase, Code, LineChart, MessageSquare, FileText, Users } from 'lucide-react';

interface ServicesTabProps {
  handleContactClick: () => void;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ handleContactClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      <ServiceCard
        icon={Briefcase}
        title="Aceleração de Adoção de IA"
        description="Estratégias personalizadas para implementar IA de forma eficiente em sua organização."
        features={[
          "Diagnóstico de oportunidades de implementação",
          "Roadmap personalizado para sua empresa",
          "Avaliação e seleção de ferramentas ideais",
          "Projetos piloto com resultados rápidos"
        ]}
        color="primary"
        handleContactClick={handleContactClick}
        animationDelay="0.1s"
      />

      <ServiceCard
        icon={Code}
        title="Implementação Técnica"
        description="Desenvolvimento e integração de soluções de IA adaptadas ao seu negócio."
        features={[
          "Desenvolvimento de agentes de IA customizados",
          "Integração com seus sistemas existentes",
          "Configuração e fine-tuning de LLMs",
          "Automação de processos com IA"
        ]}
        color="secondary"
        handleContactClick={handleContactClick}
        animationDelay="0.2s"
      />

      <ServiceCard
        icon={LineChart}
        title="Análise de Dados Avançada"
        description="Transformamos seus dados em insights acionáveis para decisões estratégicas."
        features={[
          "Dashboards interativos em tempo real",
          "Modelos preditivos para seu negócio",
          "Visualização de dados complexos",
          "Sistemas de relatórios automatizados"
        ]}
        color="accent"
        handleContactClick={handleContactClick}
        animationDelay="0.3s"
      />
      
      <ServiceCard
        icon={MessageSquare}
        title="Treinamento em IA"
        description="Capacitação completa para que sua equipe aproveite ao máximo as soluções de IA."
        features={[
          "Workshops personalizados por departamento",
          "Treinamento prático hands-on",
          "Certificação de colaboradores-chave",
          "Mentoria contínua pós-implementação"
        ]}
        color="primary"
        handleContactClick={handleContactClick}
        animationDelay="0.4s"
      />
      
      <ServiceCard
        icon={Users}
        title="Gestão de Mudança"
        description="Facilitamos a adoção cultural e técnica das novas tecnologias em sua organização."
        features={[
          "Estratégias para adoção efetiva pelos times",
          "Planos de comunicação interna",
          "Gestão de expectativas e resistências",
          "Avaliação contínua de resultados"
        ]}
        color="secondary"
        handleContactClick={handleContactClick}
        animationDelay="0.5s"
      />

      <ServiceCard
        icon={FileText}
        title="Consultoria Estratégica"
        description="Orientamos sua organização na transformação digital com foco em resultados."
        features={[
          "Análise do cenário atual e benchmarking",
          "Desenvolvimento de estratégia de IA",
          "Definição de métricas e KPIs",
          "Planejamento de escalabilidade"
        ]}
        color="accent"
        handleContactClick={handleContactClick}
        animationDelay="0.6s"
      />
    </div>
  );
};

export default ServicesTab;
