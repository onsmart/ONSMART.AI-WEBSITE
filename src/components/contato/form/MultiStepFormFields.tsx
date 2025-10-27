
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { User, Mail, Building, Briefcase, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactFormValues } from "./ContactFormSchema";

interface MultiStepFormFieldsProps {
  form: UseFormReturn<ContactFormValues>;
  currentStep: number;
  fieldErrors?: Record<string, string>;
  fieldWarnings?: Record<string, string>;
}

const MultiStepFormFields: React.FC<MultiStepFormFieldsProps> = ({ 
  form, 
  currentStep, 
  fieldErrors = {}, 
  fieldWarnings = {} 
}) => {
  const getFieldValidationIcon = (fieldName: string, value: string) => {
    if (!value) return null;
    
    if (fieldErrors[fieldName]) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    if (fieldWarnings[fieldName]) {
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
    
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="space-y-4">
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Header - Estilo Homepage */}
          <div className="text-center mb-6">
            {/* Badge Superior - Estilo Homepage */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Informações Essenciais
            </div>
            
            {/* Título com gradiente */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
                Informações
              </span> Básicas
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Conte-nos sobre sua <span className="font-bold text-brand-blue">empresa</span> para personalizarmos nossa abordagem
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name-field">Nome Completo *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                    <Input 
                      id="name-field"
                      placeholder="Seu nome completo" 
                      className="pl-10 pr-10" 
                      required 
                      aria-describedby="name-error"
                      {...field} 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldValidationIcon("name", field.value)}
                    </div>
                  </div>
                </FormControl>
                <FormMessage id="name-error" />
                {fieldWarnings.name && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {fieldWarnings.name}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email-field">E-mail *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                    <Input 
                      id="email-field"
                      type="email" 
                      placeholder="seu.email@empresa.com" 
                      className="pl-10 pr-10" 
                      required 
                      aria-describedby="email-error"
                      {...field} 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldValidationIcon("email", field.value)}
                    </div>
                  </div>
                </FormControl>
                <FormMessage id="email-error" />
                {fieldWarnings.email && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {fieldWarnings.email}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Área de Interesse
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Como podemos ajudar sua empresa?
            </p>
          </div>

          <FormField
            control={form.control}
            name="interestArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="interest-field">Área de Interesse *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} required>
                    <SelectTrigger id="interest-field" aria-describedby="interest-error">
                      <SelectValue placeholder="Selecione sua área de interesse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="implementacao">Implementação de Agentes de IA</SelectItem>
                      <SelectItem value="consultoria">Consultoria Estratégica em IA</SelectItem>
                      <SelectItem value="treinamento">Treinamento e Capacitação</SelectItem>
                      <SelectItem value="desenvolvimento">Desenvolvimento Personalizado</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage id="interest-error" />
              </FormItem>
            )}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informações Adicionais (Opcional)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nos ajude a personalizar nossa abordagem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="company-field">Nome da Empresa</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                      <Input 
                        id="company-field"
                        placeholder="Nome da sua empresa" 
                        className="pl-10 pr-10" 
                        aria-describedby="company-error"
                        {...field} 
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {getFieldValidationIcon("company", field.value)}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage id="company-error" />
                  {fieldWarnings.company && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      {fieldWarnings.company}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="position-field">Seu Cargo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                      <Input 
                        id="position-field"
                        placeholder="Ex: CEO, CTO, Diretor de TI" 
                        className="pl-10 pr-10" 
                        aria-describedby="position-error"
                        {...field} 
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {getFieldValidationIcon("position", field.value)}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage id="position-error" />
                  {fieldWarnings.position && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      {fieldWarnings.position}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone-field">Telefone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" aria-hidden="true" />
                    <Input 
                      id="phone-field"
                      placeholder="(11) 99999-9999" 
                      className="pl-10 pr-10" 
                      aria-describedby="phone-error"
                      {...field} 
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {getFieldValidationIcon("phone", field.value)}
                    </div>
                  </div>
                </FormControl>
                <FormMessage id="phone-error" />
                {fieldWarnings.phone && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {fieldWarnings.phone}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="message-field">Mensagem</FormLabel>
                <FormDescription>
                  Conte-nos brevemente sobre seus desafios ou objetivos com IA
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-500 h-4 w-4" aria-hidden="true" />
                    <Textarea 
                      id="message-field"
                      placeholder="Descreva seus principais desafios ou objetivos..." 
                      rows={4} 
                      className="pl-10 pt-3 pr-10"
                      aria-describedby="message-description message-error"
                      {...field} 
                    />
                    <div className="absolute right-3 top-3">
                      {getFieldValidationIcon("message", field.value)}
                    </div>
                  </div>
                </FormControl>
                <FormMessage id="message-error" />
                {fieldWarnings.message && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    {fieldWarnings.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default MultiStepFormFields;
