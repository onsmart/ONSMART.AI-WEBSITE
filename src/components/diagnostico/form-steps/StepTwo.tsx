
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Building, Briefcase } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DiagnosticoFormData } from "../types";

interface StepTwoProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const StepTwo: React.FC<StepTwoProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Informações da Empresa</h3>
        <p className="text-gray-600">Conte-nos sobre sua empresa</p>
      </div>

      <FormField
        control={form.control}
        name="empresa"
        rules={{ required: "Nome da empresa é obrigatório" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da Empresa *</FormLabel>
            <FormControl>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Nome da sua empresa"
                  className="pl-10 min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value.length >= 2) {
                      form.clearErrors("empresa");
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
        name="setor"
        rules={{ required: "Setor é obrigatório" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Setor da Empresa *</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                form.clearErrors("setor");
              }} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="min-h-[48px] transition-all duration-200 focus:ring-2 focus:ring-brand-blue/20">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="varejo">Varejo</SelectItem>
                <SelectItem value="manufatura">Manufatura</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="consultoria">Consultoria</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepTwo;
