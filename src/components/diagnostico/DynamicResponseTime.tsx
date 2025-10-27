import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Phone, MessageCircle } from "lucide-react";
import { DiagnosticoFormData } from "./types";

interface DynamicResponseTimeProps {
  formData: DiagnosticoFormData;
  currentStep: number;
}

const DynamicResponseTime: React.FC<DynamicResponseTimeProps> = ({
  formData,
  currentStep
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const calculateResponseTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isBusinessHours = currentHour >= 9 && currentHour <= 18 && !isWeekend;
    
    // Base response time calculation
    let baseHours = isBusinessHours ? 2 : 8;
    
    // Adjust based on form completeness
    const completionScore = calculateCompletionScore();
    if (completionScore > 0.8) baseHours = Math.max(1, baseHours - 2); // Priority for complete forms
    
    // Adjust based on urgency indicators in message
    if (formData.mensagem) {
      const urgencyKeywords = ['urgente', 'rápido', 'imediato', 'hoje', 'agora'];
      const hasUrgency = urgencyKeywords.some(keyword => 
        formData.mensagem!.toLowerCase().includes(keyword)
      );
      if (hasUrgency) baseHours = Math.max(1, baseHours - 1);
    }
    
    // Calculate actual response time
    const responseDate = new Date(now.getTime() + baseHours * 60 * 60 * 1000);
    
    // If it falls outside business hours, adjust to next business day
    if (responseDate.getHours() > 18 || responseDate.getDay() === 0 || responseDate.getDay() === 6) {
      const nextBusinessDay = getNextBusinessDay(responseDate);
      nextBusinessDay.setHours(9, 0, 0, 0);
      return {
        hours: baseHours,
        responseDate: nextBusinessDay,
        priority: completionScore > 0.8 ? 'alta' : 'normal',
        isBusinessHours
      };
    }
    
    return {
      hours: baseHours,
      responseDate,
      priority: completionScore > 0.8 ? 'alta' : 'normal',
      isBusinessHours
    };
  };

  const calculateCompletionScore = () => {
    const fields = ['nome', 'email', 'telefone', 'empresa', 'setor', 'mensagem'];
    const filledFields = fields.filter(field => {
      const value = formData[field as keyof DiagnosticoFormData];
      return value && value.toString().trim() !== '';
    });
    return filledFields.length / fields.length;
  };

  const getNextBusinessDay = (date: Date) => {
    const result = new Date(date);
    while (result.getDay() === 0 || result.getDay() === 6) {
      result.setDate(result.getDate() + 1);
    }
    return result;
  };

  const formatTimeUntilResponse = (responseDate: Date) => {
    const now = new Date();
    const diffMs = responseDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "em alguns minutos";
    if (diffHours === 1) return "em 1 hora";
    if (diffHours < 24) return `em ${diffHours} horas`;
    
    const diffDays = Math.ceil(diffHours / 24);
    if (diffDays === 1) return "amanhã";
    return `em ${diffDays} dias`;
  };

  const responseInfo = calculateResponseTime();
  const completionScore = calculateCompletionScore();
  const hasMinimumData = formData.nome && formData.email;

  if (!hasMinimumData) {
    return (
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Preencha nome e email para ver o tempo de resposta estimado</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-scale-in">
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100/50">
        <CardContent className="p-4 space-y-3">
          {/* Response Time Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Tempo de Resposta</span>
            </div>
            <Badge 
              variant={responseInfo.priority === 'alta' ? 'default' : 'secondary'}
              className={responseInfo.priority === 'alta' ? 'bg-orange-100 text-orange-700' : ''}
            >
              Prioridade {responseInfo.priority}
            </Badge>
          </div>

          {/* Main Response Time */}
          <div className="text-center p-3 bg-white rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {formatTimeUntilResponse(responseInfo.responseDate)}
            </div>
            <div className="text-sm text-green-600">
              {responseInfo.responseDate.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="h-3 w-3" />
              <span>
                {responseInfo.isBusinessHours ? 'Horário comercial' : 'Fora do horário'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MessageCircle className="h-3 w-3" />
              <span>
                Formulário {Math.round(completionScore * 100)}% completo
              </span>
            </div>
          </div>

          {/* Contact Options */}
          {responseInfo.isBusinessHours && (
            <div className="flex items-center gap-2 p-2 bg-brand-blue/10 rounded border border-brand-blue/20">
              <Phone className="h-4 w-4 text-brand-blue" />
              <span className="text-sm text-brand-blue">
                <strong>Urgente?</strong> Ligue agora: (11) 99999-9999
              </span>
            </div>
          )}

          {/* Completion Incentive */}
          {completionScore < 0.8 && (
            <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-200">
              💡 <strong>Dica:</strong> Complete mais campos para prioridade alta e resposta mais rápida!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicResponseTime;
