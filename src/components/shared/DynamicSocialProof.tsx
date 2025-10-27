
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, CheckCircle, Star } from "lucide-react";

interface SocialProofMetric {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const DynamicSocialProof: React.FC = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const metrics: SocialProofMetric[] = [
    {
      id: "companies",
      label: "Empresas Transformadas",
      value: "350+",
      icon: <Users className="h-5 w-5" />,
      trend: "+12 esta semana",
      color: "bg-blue-500"
    },
    {
      id: "roi",
      label: "ROI Médio Alcançado",
      value: "420%",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "em 6 meses",
      color: "bg-green-500"
    },
    {
      id: "satisfaction",
      label: "Taxa de Satisfação",
      value: "98%",
      icon: <Star className="h-5 w-5" />,
      trend: "dos clientes",
      color: "bg-yellow-500"
    },
    {
      id: "implementation",
      label: "Implementações Bem-sucedidas",
      value: "100%",
      icon: <CheckCircle className="h-5 w-5" />,
      trend: "nos últimos 12 meses",
      color: "bg-purple-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMetric((prev) => (prev + 1) % metrics.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [metrics.length]);

  const current = metrics[currentMetric];

  return (
    <Card className="border-2 border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${current.color} text-white`}>
              {current.icon}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-brand-black mb-1">
                {current.value}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {current.label}
              </div>
              {current.trend && (
                <Badge variant="secondary" className="text-xs">
                  {current.trend}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Indicadores de progresso */}
        <div className="flex gap-1 mt-4">
          {metrics.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                index === currentMetric ? 'bg-brand-blue' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicSocialProof;
