
import React from 'react';
import { useTranslation } from 'react-i18next';
import AgentsDashboard from '@/components/whatsapp-agents/AgentsDashboard';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const WhatsappAgents: React.FC = () => {
  const { t } = useTranslation(['whatsappAgents', 'common']);
  
  return (
    <>
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: t('seo.title'),
          description: t('seo.description')
        }}
      />
      <AgentsDashboard />
    </>
  );
};

export default WhatsappAgents;
