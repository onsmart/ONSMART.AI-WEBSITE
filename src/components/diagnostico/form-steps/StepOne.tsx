
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DiagnosticoFormData } from "../types";

interface StepOneProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const StepOne: React.FC<StepOneProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Informações Pessoais</h3>
        <p className="text-gray-600">Vamos começar com seus dados básicos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="nome"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo *</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Seu nome completo" 
                    className="pl-10 min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Validação em tempo real
                      if (e.target.value.length >= 2) {
                        form.clearErrors("nome");
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Profissional *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10 min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Validação em tempo real
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (emailRegex.test(e.target.value)) {
                        form.clearErrors("email");
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="telefone"
        rules={{ required: "Telefone é obrigatório" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone/WhatsApp *</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="(11) 99999-9999"
                  className="pl-10 min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // Validação em tempo real
                    if (e.target.value.length >= 10) {
                      form.clearErrors("telefone");
                    }
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepOne;
