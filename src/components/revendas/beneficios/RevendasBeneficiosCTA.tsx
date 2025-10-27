
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RevendasBeneficiosCTA = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Pronto para Começar?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Candidate-se agora e comece a vender IA para empresas de grande porte
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/revendas/cadastro">
            Candidatar-se Agora
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default RevendasBeneficiosCTA;
