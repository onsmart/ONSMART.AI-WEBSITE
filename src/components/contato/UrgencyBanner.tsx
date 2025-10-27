
import React from "react";

const UrgencyBanner = () => {
  return (
    <div className="mt-6 bg-brand-blue-light/20 dark:bg-brand-blue/30 border border-brand-blue-light dark:border-brand-blue rounded-lg p-4 text-center">
      <p className="text-brand-black dark:text-brand-blue-light font-medium">
        <span className="font-bold">Agendamento prioritário!</span> Os primeiros 10 contatos do mês recebem uma análise gratuita das oportunidades de implementação de Agentes de IA em sua empresa.
      </p>
    </div>
  );
};

export default UrgencyBanner;
