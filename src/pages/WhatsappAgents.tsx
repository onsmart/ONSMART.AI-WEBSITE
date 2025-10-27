
import React from 'react';
import AgentsDashboard from '@/components/whatsapp-agents/AgentsDashboard';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const WhatsappAgents: React.FC = () => {
  return (
    <>
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: "Sistema de Agentes IA para WhatsApp - onsmart.AI",
          description: "Dashboard completo para gerenciar múltiplos agentes de IA especializados em atendimento de vendas via WhatsApp. Automação inteligente, roteamento automático e analytics em tempo real."
        }}
      />
      <AgentsDashboard />
    </>
  );
};

export default WhatsappAgents;
