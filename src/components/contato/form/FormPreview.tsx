
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building, Briefcase, Phone, MessageSquare, Target } from "lucide-react";
import { ContactFormValues } from "./ContactFormSchema";

interface FormPreviewProps {
  formData: ContactFormValues;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formData }) => {
  const getInterestAreaLabel = (value: string) => {
    const areas = {
      implementacao: "Implementação de Agentes de IA",
      consultoria: "Consultoria Estratégica em IA",
      treinamento: "Treinamento e Capacitação",
      desenvolvimento: "Desenvolvimento Personalizado",
      outros: "Outros"
    };
    return areas[value as keyof typeof areas] || value;
  };

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Revisar Informações
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Confira os dados antes de enviar sua solicitação
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Informações Básicas - Estilo Homepage */}
        <div>
          <div className="text-center mb-4">
            {/* Badge Superior - Estilo Homepage */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-brand-blue/20">
              <User className="h-3 w-3" />
              Dados da Empresa
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
                Informações
              </span> Básicas
            </h3>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500">Nome:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500">E-mail:</span>
                <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Área de Interesse */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Área de Interesse
          </h3>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {getInterestAreaLabel(formData.interestArea)}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Informações Adicionais */}
        {(formData.company || formData.position || formData.phone || formData.message) && (
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              Informações Adicionais
            </h3>
            <div className="grid gap-3">
              {formData.company && (
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <Building className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500">Empresa:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.company}</p>
                  </div>
                </div>
              )}
              
              {formData.position && (
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500">Cargo:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.position}</p>
                  </div>
                </div>
              )}
              
              {formData.phone && (
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-500">Telefone:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                  </div>
                </div>
              )}
              
              {formData.message && (
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <MessageSquare className="h-4 w-4 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-500">Mensagem:</span>
                    <p className="font-medium text-gray-900 dark:text-white whitespace-pre-wrap">{formData.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Informações de Envio */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-primary mb-2"> Destino do E-mail</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sua solicitação será enviada para: <strong>atendimento.ai@onsmart.com.br</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Você receberá uma confirmação no e-mail informado e nossa equipe entrará em contato em até 24 horas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormPreview;
