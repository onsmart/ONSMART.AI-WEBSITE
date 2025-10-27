
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useToast } from '@/hooks/use-toast';
import AgentesDigitaisHeader from '@/components/agentes-digitais/cadastro/AgentesDigitaisHeader';
import DadosPessoaisForm from '@/components/agentes-digitais/cadastro/DadosPessoaisForm';
import InformacoesProfissionaisForm from '@/components/agentes-digitais/cadastro/InformacoesProfissionaisForm';
import DadosPagamentoForm from '@/components/agentes-digitais/cadastro/DadosPagamentoForm';
import ExpectativasForm from '@/components/agentes-digitais/cadastro/ExpectativasForm';
import TermosCondicoesForm from '@/components/agentes-digitais/cadastro/TermosCondicoesForm';

const AgentesDigitaisCadastro = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Cadastro Realizado!",
      description: "Bem-vindo ao programa! Você receberá seu link exclusivo por email em alguns minutos.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <>
      <UnifiedSEO 
        title="Cadastro Agente Digital onsmartAI - Torne-se um Indicador"
        description="Cadastre-se gratuitamente como Agente Digital onsmartAI. Receba seu link exclusivo e comece a ganhar comissões indicando clientes hoje mesmo."
        keywords="cadastro agente digital, link indicação, programa afiliados, renda extra"
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
                  "Processando Cadastro..."
                ) : (
                  "Finalizar Cadastro"
                )}
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Você receberá seu link exclusivo por email em alguns minutos
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgentesDigitaisCadastro;
