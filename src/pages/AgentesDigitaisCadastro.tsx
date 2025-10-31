
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import AgentesDigitaisHeader from '@/components/agentes-digitais/cadastro/AgentesDigitaisHeader';
import DadosPessoaisForm from '@/components/agentes-digitais/cadastro/DadosPessoaisForm';
import InformacoesProfissionaisForm from '@/components/agentes-digitais/cadastro/InformacoesProfissionaisForm';
import DadosPagamentoForm from '@/components/agentes-digitais/cadastro/DadosPagamentoForm';
import ExpectativasForm from '@/components/agentes-digitais/cadastro/ExpectativasForm';
import TermosCondicoesForm from '@/components/agentes-digitais/cadastro/TermosCondicoesForm';

const AgentesDigitaisCadastro = () => {
  const { toast } = useToast();
  const { t } = useTranslation(['agentesDigitaisCadastro', 'common']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: t('toast.title'),
      description: t('toast.description'),
    });
    
    setIsSubmitting(false);
  };

  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <AgentesDigitaisHeader />

          <form onSubmit={handleSubmit} className="space-y-8">
            <DadosPessoaisForm />
            <InformacoesProfissionaisForm />
            <DadosPagamentoForm />
            <ExpectativasForm />
            <TermosCondicoesForm />

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 px-12"
              >
                {isSubmitting ? (
                  t('submit.processing')
                ) : (
                  t('submit.button')
                )}
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                {t('submit.helper')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgentesDigitaisCadastro;
