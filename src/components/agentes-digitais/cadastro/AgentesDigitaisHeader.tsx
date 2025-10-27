
import React from 'react';
import { UserCheck } from 'lucide-react';

const AgentesDigitaisHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <UserCheck className="h-4 w-4" />
        Cadastro de Agente Digital
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Torne-se um Agente Digital
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Cadastro 100% gratuito. Comece a ganhar comissões indicando empresas para a onsmartAI
      </p>
    </div>
  );
};

export default AgentesDigitaisHeader;
