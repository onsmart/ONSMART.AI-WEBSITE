
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MessageSquare, Clock, Shield, CheckCircle } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { DiagnosticoFormData } from "../types";

interface StepThreeProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const StepThree: React.FC<StepThreeProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Detalhes do Diagnóstico</h3>
        <p className="text-gray-600">Conte-nos sobre seus desafios e objetivos</p>
      </div>

      <FormField
        control={form.control}
        name="mensagem"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Principais Desafios e Objetivos</FormLabel>
            <FormControl>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Textarea
                  placeholder="Descreva os principais desafios da sua empresa e como a IA poderia ajudar..."
                  className="pl-10 pt-3 min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Trust Signals */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          O que você receberá:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-700">Análise personalizada dos seus processos</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-700">Roadmap de implementação de IA</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-700">Estimativa de ROI para sua empresa</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-700">Sessão de consultoria de 30 minutos</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Resposta garantida em até 24 horas</span>
          </div>
        </div>
      </div>

      {/* Garantia */}
      <div className="text-center text-sm text-gray-600 bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-800">100% Gratuito e Sem Compromisso</span>
        </div>
        <p>Diagnóstico completo sem custo. Você decide se quer prosseguir após ver os resultados.</p>
      </div>
    </div>
  );
};

export default StepThree;
