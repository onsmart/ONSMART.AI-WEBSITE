
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, LucideIcon, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

interface FeatureTabContentProps {
  id: string;
  title: string;
  description: string | React.ReactNode;
  icon: LucideIcon;
  benefits: string[];
  impact?: {
    productivity: string;
    costReduction: string;
    implementationTime: string;
    roi: string;
  };
}

// Componente para animar números com efeitos impressionantes
const AnimatedMetric: React.FC<{ 
  value: string; 
  delay?: number; 
  icon: LucideIcon;
  label: string;
}> = ({ value, delay = 0, icon: IconComponent, label }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Extrai o número do valor para animação progressiva
  const extractNumber = (str: string) => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const extractUnit = (str: string) => {
    return str.replace(/\d+/, '').trim();
  };

  const targetNumber = extractNumber(value);
  const unit = extractUnit(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
      
      // Animação progressiva do número
      if (targetNumber > 0) {
        let currentNumber = 0;
        const increment = Math.max(1, Math.floor(targetNumber / 30));
        const interval = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            setDisplayValue(value);
            setIsAnimating(false);
            clearInterval(interval);
          } else {
            setDisplayValue(`${unit.includes('+') ? '+' : ''}${unit.includes('-') ? '-' : ''}${currentNumber}${unit.replace(/[+-]/, '')}`);
          }
        }, 50);
        
        return () => clearInterval(interval);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, targetNumber, unit]);

  const getColorClasses = () => {
    if (value.includes('+') || (value.includes('%') && !value.includes('-'))) return 'text-green-500';
    if (value.includes('-') && !value.includes('dias')) return 'text-green-500';
    return 'text-brand-blue';
  };

  // Se não há label, renderiza apenas o valor para os mini-cards
  if (!label) {
    return (
      <div className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        <div className={`text-2xl font-bold transition-all duration-700 leading-none ${getColorClasses()} ${
          isAnimating ? 'animate-pulse' : ''
        } relative text-center`}>
          {displayValue}
          {isAnimating && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-full animate-ping opacity-50"></span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`group flex items-center gap-2 p-2 rounded-lg transition-all duration-700 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:scale-105 ${
      isVisible ? 'opacity-100 transform translate-y-0 translate-x-0' : 'opacity-0 transform translate-y-4 translate-x-2'
    }`}>
      <div className={`p-1.5 rounded-full transition-all duration-500 ${
        isVisible ? 'bg-brand-blue/10 scale-100' : 'bg-transparent scale-0'
      } ${isAnimating ? 'animate-pulse' : ''}`}>
        <IconComponent className={`h-3 w-3 transition-all duration-500 ${getColorClasses()} ${
          isAnimating ? 'animate-bounce' : ''
        } group-hover:scale-110`} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 leading-none">{label}</span>
        <span className={`font-bold text-sm transition-all duration-700 leading-none ${getColorClasses()} ${
          isAnimating ? 'animate-pulse' : ''
        } relative`}>
          {displayValue}
          {isAnimating && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-blue rounded-full animate-ping"></span>
          )}
        </span>
      </div>
    </div>
  );
};

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ 
  id, 
  title, 
  description, 
  icon: IconComponent, 
  benefits,
  impact
}) => {
         return (
     <TabsContent value={id} className="mt-0 pt-4">
       {/* Header estilo HeroSection */}
       <div className="text-center mb-6 animate-fade-in">
         {/* Badge do recurso */}
         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
           <IconComponent className="h-3 w-3" />
           Recurso Avançado
         </div>
         
         {/* Título principal */}
         <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
           <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{title}</span>
         </h3>
         
         {/* Descrição */}
         <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
           {typeof description === 'string' ? description : <div>{description}</div>}
         </p>
       </div>
        
        {/* Cards estilo HeroSection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-green-300/50 animate-in slide-in-from-left-5 duration-700 delay-300 overflow-hidden relative">
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-green-200">
                <CheckCircle className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              
              <div className="text-center mb-6 animate-in fade-in-0 duration-500 delay-500">
                <h4 className="text-lg font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors">Principais Benefícios</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Vantagens comprovadas da implementação</p>
              </div>
              
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-900/20 hover:bg-green-100/70 dark:hover:bg-green-900/30 transition-all duration-300 animate-in slide-in-from-left-3 duration-500 hover:scale-[1.02] hover:shadow-sm group/item" style={{ animationDelay: `${600 + idx * 150}ms` }}>
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-green-200 group-hover/item:scale-110 transition-all duration-300">
                      <ArrowRight className="h-3 w-3 text-green-600 group-hover/item:translate-x-0.5 transition-transform duration-300" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-blue/50 animate-in slide-in-from-right-5 duration-700 delay-400 overflow-hidden relative">
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-200">
                <Target className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              
              <div className="text-center mb-6 animate-in fade-in-0 duration-500 delay-600">
                <h4 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-blue-700 transition-colors">Impacto no Seu Negócio</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Resultados mensuráveis e comprovados</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-green-200/50 dark:border-gray-600/50 text-center hover:shadow-md hover:scale-105 transition-all duration-300 animate-in zoom-in-50 duration-500 delay-700 group/metric overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700"></div>
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover/metric:scale-110 group-hover/metric:rotate-12 transition-all duration-300 relative z-10" />
                  <AnimatedMetric 
                    value={impact?.productivity || "+350%"} 
                    delay={800} 
                    icon={TrendingUp}
                    label=""
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 relative z-10">Produtividade</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-200/50 dark:border-gray-600/50 text-center hover:shadow-md hover:scale-105 transition-all duration-300 animate-in zoom-in-50 duration-500 delay-800 group/metric overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700"></div>
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover/metric:scale-110 group-hover/metric:rotate-12 transition-all duration-300 relative z-10" />
                  <AnimatedMetric 
                    value={impact?.costReduction || "-45%"} 
                    delay={900} 
                    icon={DollarSign}
                    label=""
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 relative z-10">Redução de Custos</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-orange-200/50 dark:border-gray-600/50 text-center hover:shadow-md hover:scale-105 transition-all duration-300 animate-in zoom-in-50 duration-500 delay-900 group/metric overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700"></div>
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover/metric:scale-110 group-hover/metric:rotate-12 transition-all duration-300 relative z-10" />
                  <AnimatedMetric 
                    value={impact?.implementationTime || "14 dias"} 
                    delay={1000} 
                    icon={Clock}
                    label=""
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 relative z-10">Implementação</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-200/50 dark:border-gray-600/50 text-center hover:shadow-md hover:scale-105 transition-all duration-300 animate-in zoom-in-50 duration-500 delay-1000 group/metric overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700"></div>
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover/metric:scale-110 group-hover/metric:rotate-12 transition-all duration-300 relative z-10" />
                  <AnimatedMetric 
                    value={impact?.roi || "650%"} 
                    delay={1100} 
                    icon={Target}
                    label=""
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 relative z-10">ROI Esperado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </TabsContent>
  );
};

export default FeatureTabContent;
