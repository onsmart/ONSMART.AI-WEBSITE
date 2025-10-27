
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Briefcase } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiagnosticoFormData } from "../types";
import { useAnnouncement } from "@/components/accessibility/ScreenReaderAnnouncements";

interface CompanyInfoFieldsProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const CompanyInfoFields: React.FC<CompanyInfoFieldsProps> = ({ form }) => {
  const { announce } = useAnnouncement();
  
  const handleFieldBlur = (fieldName: string) => {
    const fieldError = form.formState.errors[fieldName as keyof DiagnosticoFormData];
    if (fieldError) {
      announce(`Campo ${fieldName}: ${fieldError.message}`, 'assertive');
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="setor"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel htmlFor="setor-field" className="required">
              Setor de Atuação
              <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                <Input 
                  id="setor-field"
                  placeholder="Ex.: Saúde, Finanças, Educação, etc." 
                  className="pl-10"
                  required 
                  aria-describedby="setor-error"
                  aria-invalid={!!form.formState.errors.setor}
                  onBlur={() => handleFieldBlur('setor')}
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage id="setor-error" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="mensagem"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="mensagem-field">Conte-nos sobre suas expectativas</FormLabel>
            <FormDescription id="mensagem-description">
              Compartilhe brevemente quais são os principais desafios que você gostaria de resolver com IA
            </FormDescription>
            <FormControl>
              <Textarea 
                id="mensagem-field"
                placeholder="Descreva aqui os principais desafios ou objetivos da sua empresa..." 
                rows={4} 
                aria-describedby="mensagem-description mensagem-error"
                onBlur={() => handleFieldBlur('mensagem')}
                {...field} 
              />
            </FormControl>
            <FormMessage id="mensagem-error" />
          </FormItem>
        )}
      />
    </>
  );
};

export default CompanyInfoFields;
