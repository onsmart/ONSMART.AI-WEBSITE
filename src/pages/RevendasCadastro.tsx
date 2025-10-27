import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useToast } from '@/hooks/use-toast';
import RevendasCadastroHeader from '@/components/revendas/cadastro/RevendasCadastroHeader';
import EmpresaInfoForm from '@/components/revendas/cadastro/EmpresaInfoForm';
import PerformanceComercialForm from '@/components/revendas/cadastro/PerformanceComercialForm';
import ResponsavelForm from '@/components/revendas/cadastro/ResponsavelForm';
import ComprometimentoForm from '@/components/revendas/cadastro/ComprometimentoForm';

const RevendasCadastro = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/xjkrqezw", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSuccess(true);
      form.reset();
    } else {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua candidatura. Tente novamente.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <UnifiedSEO 
        title="Cadastro Revenda onsmartAI - Candidatar-se ao Programa"
        description="Candidate-se ao programa de revendas onsmartAI. Preencha o formulário e nossa equipe entrará em contato para avaliar sua candidatura."
        keywords="cadastro revenda, candidatura parceria, formulário revenda, aplicar programa"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <RevendasCadastroHeader />

          <form onSubmit={handleSubmit} className="space-y-8">
            <EmpresaInfoForm />
            <PerformanceComercialForm />
            <ResponsavelForm />
            <ComprometimentoForm />
            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 px-12"
              >
                {isSubmitting ? (
                  "Enviando Candidatura..."
                ) : (
                  "Enviar Candidatura Enterprise"
                )}
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Nossa equipe especializada entrará em contato em até 24 horas para avaliar sua candidatura
              </p>
            </div>
          </form>

          {success && (
            <div className="flex flex-col items-center justify-center bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg mt-8 shadow animate-fade-in">
              <svg className="w-8 h-8 mb-2 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="font-bold text-lg">Candidatura enviada com sucesso!</span>
              <span className="text-sm mt-1">Nossa equipe entrará em contato em até 24 horas.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RevendasCadastro;
