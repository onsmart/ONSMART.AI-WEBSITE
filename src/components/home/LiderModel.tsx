import React from "react";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  ChartBarIncreasing,
  Smartphone, 
  Briefcase 
} from "lucide-react";

const LiderModel = () => {
  return (
    <section id="lider-model" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            Nossa metodologia
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Modelo <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">LÍDER</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg md:text-xl">
            Framework estruturado para implementar IA empresarial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-brand-blue mb-2 sm:mb-3 text-base sm:text-lg">Laboral</h3>
            <p className="text-gray-600 text-sm sm:text-base">IA como força de trabalho</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-green-600 mb-2 sm:mb-3 text-base sm:text-lg">Investimento</h3>
            <p className="text-gray-600 text-sm sm:text-base">Capacitação da equipe</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-orange-600 mb-2 sm:mb-3 text-base sm:text-lg">Desenvolvimento</h3>
            <p className="text-gray-600 text-sm sm:text-base">Evolução contínua</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-purple-600 mb-2 sm:mb-3 text-base sm:text-lg">Estruturação</h3>
            <p className="text-gray-600 text-sm sm:text-base">Sistemas modulares</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-cyan-600 mb-2 sm:mb-3 text-base sm:text-lg">Reconhecimento</h3>
            <p className="text-gray-600 text-sm sm:text-base">Interfaces intuitivas</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-indigo-600 mb-2 sm:mb-3 text-base sm:text-lg">Execução</h3>
            <p className="text-gray-600 text-sm sm:text-base">Implementação estratégica</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiderModel;
