
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Mail, Phone, User, Building } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DiagnosticoFormData } from "../types";
import { useAnnouncement } from "@/components/accessibility/ScreenReaderAnnouncements";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<DiagnosticoFormData>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  const { announce } = useAnnouncement();
  
  const handleFieldBlur = (fieldName: string) => {
    const fieldError = form.formState.errors[fieldName as keyof DiagnosticoFormData];
    if (fieldError) {
      announce(`Campo ${fieldName}: ${fieldError.message}`, 'assertive');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="nome-field" className="required">
              Nome Completo
              <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                <Input 
                  id="nome-field"
                  placeholder="Seu nome completo" 
                  className="pl-10" 
                  required 
                  aria-describedby="nome-error"
                  aria-invalid={!!form.formState.errors.nome}
                  onBlur={() => handleFieldBlur('nome')}
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage id="nome-error" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email-field" className="required">
              E-mail
              <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                <Input 
                  id="email-field"
                  type="email" 
                  placeholder="seu.email@empresa.com" 
                  className="pl-10" 
                  required 
                  aria-describedby="email-error"
                  aria-invalid={!!form.formState.errors.email}
                  onBlur={() => handleFieldBlur('email')}
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage id="email-error" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="telefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="telefone-field" className="required">
              Telefone
              <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                <Input 
                  id="telefone-field"
                  placeholder="(00) 00000-0000" 
                  className="pl-10" 
                  required 
                  aria-describedby="telefone-error"
                  aria-invalid={!!form.formState.errors.telefone}
                  onBlur={() => handleFieldBlur('telefone')}
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage id="telefone-error" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="empresa"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="empresa-field" className="required">
              Empresa
              <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                <Input 
                  id="empresa-field"
                  placeholder="Nome da sua empresa" 
                  className="pl-10"
                  required 
                  aria-describedby="empresa-error"
                  aria-invalid={!!form.formState.errors.empresa}
                  onBlur={() => handleFieldBlur('empresa')}
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage id="empresa-error" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
