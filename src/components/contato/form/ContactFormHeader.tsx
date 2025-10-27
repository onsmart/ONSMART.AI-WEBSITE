
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp } from 'lucide-react';

const ContactFormHeader: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 rounded-xl">
      <CardHeader className="text-center pb-4">
        {/* Badge Superior - Estilo Homepage */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
          <Users className="h-3 w-3" />
          Consultoria Especializada
        </div>
        
        {/* Título - Estilo Homepage */}
        <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          <span className="text-gray-900 dark:text-white">Fale com Nossos </span>
          <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
            Especialistas
          </span>
        </CardTitle>
        
        <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Converse com <span className="font-bold text-brand-blue">especialistas em IA</span> e descubra como transformar sua empresa em{" "}
          <span className="font-bold text-brand-blue">30 dias</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Stats Cards - Estilo Homepage */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900">30 dias</p>
            <p className="text-xs text-gray-600">Implementação</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900">350+</p>
            <p className="text-xs text-gray-600">Empresas</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900">420%</p>
            <p className="text-xs text-gray-600">ROI Médio</p>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>✓ Resposta em 2h</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>✓ 100% Gratuito</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactFormHeader;
