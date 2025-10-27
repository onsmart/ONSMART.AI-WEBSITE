import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Clock, Users, Zap, Target } from "lucide-react";
import { DiagnosticoFormData } from "./types";

interface RealTimeBenefitsPreviewProps {
  formData: DiagnosticoFormData;
  currentStep: number;
}

const RealTimeBenefitsPreview: React.FC<RealTimeBenefitsPreviewProps> = ({ 
  formData, 
  currentStep 
}) => {
  // Calculate benefits based on form data
  const calculateBenefits = () => {
    const { empresa, setor, mensagem } = formData;
    
    let scoreMultiplier = 1;
    let industryMultiplier = 1;
    let complexityMultiplier = 1;

    // Industry-based multipliers
    const industryMultipliers: Record<string, number> = {
      'saúde': 1.5,
      'finanças': 1.4,
      'educação': 1.2,
      'varejo': 1.3,
      'manufatura': 1.4,
      'tecnologia': 1.6,
      'serviços': 1.1,
    };

    // Check if sector matches known high-impact industries
    const sectorLower = setor.toLowerCase();
    Object.keys(industryMultipliers).forEach(industry => {
      if (sectorLower.includes(industry)) {
        industryMultiplier = industryMultipliers[industry];
      }
    });

    // Company size estimation (basic heuristic)
    if (empresa.length > 15) scoreMultiplier *= 1.2; // Larger company names tend to be bigger
    
    // Message complexity analysis
    if (mensagem) {
      const wordCount = mensagem.split(' ').length;
      if (wordCount > 20) complexityMultiplier = 1.3;
      if (wordCount > 50) complexityMultiplier = 1.5;
      
      // Check for keywords that indicate complexity/scale
      const keywords = ['automatizar', 'processos', 'equipe', 'produtividade', 'custos', 'eficiência'];
      const matchedKeywords = keywords.filter(keyword => 
        mensagem.toLowerCase().includes(keyword)
      ).length;
      
      complexityMultiplier *= (1 + matchedKeywords * 0.1);
    }

    const totalMultiplier = scoreMultiplier * industryMultiplier * complexityMultiplier;

    return {
      roiEstimate: Math.min(Math.round(200 * totalMultiplier), 500),
      costReduction: Math.min(Math.round(35 * totalMultiplier), 70),
      timeReduction: Math.min(Math.round(40 * totalMultiplier), 80),
      productivityIncrease: Math.min(Math.round(45 * totalMultiplier), 90),
      implementationScore: Math.min(Math.round(70 * totalMultiplier), 95),
      industryFit: industryMultiplier,
    };
  };

  const benefits = calculateBenefits();
  const hasData = formData.nome || formData.empresa || formData.setor;
  
  if (!hasData) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-6 text-center">
          <Zap className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            Preencha o formulário para ver o preview dos benefícios personalizados
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in" key={currentStep}>
      <Card className="border-2 border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-brand-blue-light/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-black">
            <Target className="h-5 w-5 text-brand-blue" />
            Preview dos Benefícios Personalizados
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-brand-blue/10 text-brand-blue">
              {formData.setor || 'Setor não informado'}
            </Badge>
            {benefits.industryFit > 1.2 && (
              <Badge className="bg-green-100 text-green-700">
                Alto Potencial de IA
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* ROI Estimate */}
          <div className="grid grid-cols-2 gap-4 animate-scale-in">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">ROI Estimado</span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {benefits.roiEstimate}%
              </div>
              <div className="text-xs text-green-600">em 12 meses</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Redução de Custos</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {benefits.costReduction}%
              </div>
              <div className="text-xs text-blue-600">operacionais</div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Economia de Tempo
                </span>
                <span className="font-medium">{benefits.timeReduction}%</span>
              </div>
              <Progress value={benefits.timeReduction} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Aumento de Produtividade
                </span>
                <span className="font-medium">{benefits.productivityIncrease}%</span>
              </div>
              <Progress value={benefits.productivityIncrease} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Adequação para IA
                </span>
                <span className="font-medium">{benefits.implementationScore}%</span>
              </div>
              <Progress value={benefits.implementationScore} className="h-2" />
            </div>
          </div>

          {/* Personalized Message */}
          {formData.empresa && (
            <div className="bg-brand-blue/10 rounded-lg p-3 border border-brand-blue/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm text-brand-black">
                <strong>💡 Insight Personalizado:</strong> Com base no setor de{' '}
                <strong>{formData.setor}</strong> da <strong>{formData.empresa}</strong>, 
                identificamos oportunidades específicas de automação que podem gerar um ROI de{' '}
                <strong>{benefits.roiEstimate}%</strong> no primeiro ano.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeBenefitsPreview;
