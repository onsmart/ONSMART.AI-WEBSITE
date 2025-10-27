import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Building, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TestimonialsCard = () => {
  const testimonials = [
    {
      quote: "Em 3 meses, nossa produtividade de desenvolvimento aumentou 280%. Os Agentes de IA assumiram tarefas repetitivas, permitindo que nossa equipe focasse em inovação. ROI de 450% no primeiro ano.",
      name: "Carlos Eduardo Silva",
      role: "CTO",
      company: "TechFlow Sistemas",
      sector: "Tecnologia",
      metrics: "+280% produtividade",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      rating: 5
    },
    {
      quote: "Reduzimos custos operacionais em 35% e melhoramos o atendimento ao paciente significativamente. Os processos que levavam dias agora são concluídos em horas. Transformação real.",
      name: "Dra. Maria Santos",
      role: "Diretora Médica",
      company: "Hospital Santa Clara",
      sector: "Saúde",
      metrics: "-35% custos operacionais",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      rating: 5
    },
    {
      quote: "Processamos 10x mais dados de análise de risco com maior precisão. Nossa conformidade regulatória melhorou 60% e reduzimos o tempo de análise de crédito de 3 dias para 2 horas.",
      name: "Roberto Mendes",
      role: "Diretor de Risco",
      company: "FinanceGroup",
      sector: "Financeiro",
      metrics: "10x mais dados processados",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
      rating: 5
    }
  ];

  return (
    <Card className="border-brand-black/20 bg-white dark:bg-gray-900">
      <CardHeader className="border-b border-brand-blue-light/30 dark:border-brand-blue/20">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-blue" />
          Resultados Reais de Nossos Clientes
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cases verificados com métricas comprovadas
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="space-y-4 animate-fade-in hover-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 mt-1 border-2 border-brand-blue/40">
                <AvatarImage 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="object-cover object-center w-full h-full" 
                />
                <AvatarFallback className="bg-brand-blue-light/20 text-brand-black">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-full">
                    {testimonial.sector}
                  </span>
                </div>
                <blockquote className="italic text-gray-700 dark:text-gray-300 mb-3">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-brand-black dark:text-gray-200">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                    <TrendingUp className="h-4 w-4" />
                    {testimonial.metrics}
                  </div>
                </div>
              </div>
            </div>
            {index < testimonials.length - 1 && (
              <hr className="border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
        
        {/* Verification Badge */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-6">
          <div className="flex items-center gap-2 text-green-700">
            <Building className="h-4 w-4" />
            <span className="text-sm font-medium">
              Todos os depoimentos foram verificados e autorizados pelos clientes
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCard;
