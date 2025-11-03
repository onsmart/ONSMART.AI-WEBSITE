
import React, { useEffect, useState, useRef } from "react";
import { 
  TrendingUp, 
  Rocket, 
  Users, 
  Target,
  ArrowRight
} from "lucide-react";

const ResultsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = [
    {
      id: 1,
      title: "Produtividade +300%",
      description: "Aumento significativo de produtividade com Agentes de IA implementados em todas as áreas da organização, otimizando processos críticos e maximizando resultados empresariais de forma consistente e escalável.",
      icon: TrendingUp,
      color: "blue",
      bgColor: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-900/20",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      iconBg: "bg-blue-100",
      percentage: "+300%",
      metric: "Eficiência Operacional"
    },
    {
      id: 2,
      title: "Inovação Acelerada",
      description: "Capacidade de inovar mais rapidamente com Agentes de IA implementados em todas as frentes do negócio, desenvolvendo soluções disruptivas e altamente competitivas no mercado global.",
      icon: Rocket,
      color: "green",
      bgColor: "from-green-500 to-green-600",
      lightBg: "bg-green-50",
      darkBg: "dark:bg-green-900/20",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      iconBg: "bg-green-100",
      percentage: "+250%",
      metric: "Velocidade de Inovação"
    },
    {
      id: 3,
      title: "Engajamento Superior",
      description: "Colaboradores mais satisfeitos e altamente engajados trabalhando em sinergia com Agentes de IA, criando um ambiente de trabalho colaborativo e produtivo com tecnologia avançada.",
      icon: Users,
      color: "purple",
      bgColor: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      darkBg: "dark:bg-purple-900/20",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      iconBg: "bg-purple-100",
      percentage: "+180%",
      metric: "Satisfação dos Colaboradores"
    },
    {
      id: 4,
      title: "Resposta ao Mercado",
      description: "Capacidade de resposta ao mercado multiplicada exponencialmente com Agentes de IA, reagindo instantaneamente às demandas e oportunidades de negócio emergentes no cenário atual.",
      icon: Target,
      color: "orange",
      bgColor: "from-orange-500 to-orange-600",
      lightBg: "bg-orange-50",
      darkBg: "dark:bg-orange-900/20",
      borderColor: "border-orange-200",
      textColor: "text-orange-600",
      iconBg: "bg-orange-100",
      percentage: "+400%",
      metric: "Velocidade de Resposta"
    }
  ];

  // Navigation functions with animation
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % results.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + results.length) % results.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const currentResult = results[currentSlide];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/30 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900/20 dark:to-brand-blue/10 relative overflow-hidden">
      {/* Background Pattern Melhorado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes de fundo flutuantes */}
        <div className="absolute top-1/4 left-1/4 w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 sm:w-24 md:w-36 h-16 sm:h-24 md:h-36 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 sm:w-20 md:w-32 h-12 sm:h-20 md:h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Linhas decorativas */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header estilo HeroSection */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 px-4 sm:px-0 animate-fade-in">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <TrendingUp className="h-3 w-3" />
            Performance Comprovada
          </div>
          
          {/* Título principal */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 text-gray-900 dark:text-white leading-tight">
            Resultados <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Extraordinários</span>
          </h2>
          
          {/* Descrição */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
            Empresas que implementaram <span className="font-bold text-brand-blue">Agentes de IA</span> estão experimentando transformações sem precedentes:
          </p>
        </div>

        {/* Main Result Display - Melhorado */}
        <div 
          ref={containerRef}
          className="max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-${currentResult.color}-300/50 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} min-h-[320px] relative overflow-hidden animate-in slide-in-from-bottom-5 duration-700`}>
            
            {/* Efeito de brilho animado */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${currentResult.color}-100/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-center h-full">
              
              {/* Left Side - Content */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-4 animate-in slide-in-from-left-3 duration-500">
                  <div className={`w-14 h-14 bg-gradient-to-br ${currentResult.bgColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <currentResult.icon className="h-7 w-7 text-white group-hover:animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-blue transition-colors duration-300">
                      {currentResult.title}
                    </h3>
                    <div className={`text-sm font-semibold ${currentResult.textColor} opacity-80`}>
                      Transformação Digital Comprovada
                    </div>
                  </div>
                </div>
                
                <div className="min-h-[80px] flex items-center">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed animate-in slide-in-from-left-3 duration-500 delay-200">
                    {currentResult.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 animate-in slide-in-from-left-3 duration-500 delay-400">
                  <div className={`group/metric bg-gradient-to-br ${currentResult.lightBg} dark:bg-gray-700 to-white dark:to-gray-800 p-4 rounded-xl border border-${currentResult.color}-200/50 dark:border-gray-600/50 flex-shrink-0 hover:shadow-md hover:scale-105 transition-all duration-300 min-w-[140px]`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${currentResult.textColor} leading-tight mb-1 group-hover/metric:scale-110 transition-transform`}>
                        {currentResult.percentage}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight font-medium">
                        {currentResult.metric}
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className={`h-5 w-5 ${currentResult.textColor} flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300`} />
                  
                  <div className="bg-gray-50/80 dark:bg-gray-700/80 p-4 rounded-xl border border-gray-200/50 dark:border-gray-600/50 text-center flex-shrink-0 hover:bg-gray-100/80 dark:hover:bg-gray-700 transition-colors duration-300">
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Implementação</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">30 dias</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Visual Metric Melhorado */}
              <div className="lg:col-span-2 relative flex items-center justify-center animate-in slide-in-from-right-3 duration-500 delay-300">
                <div className={`group/visual relative w-full max-w-[200px] h-48 bg-gradient-to-br ${currentResult.bgColor} rounded-2xl flex flex-col items-center justify-center shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 border-2 border-white/20`}>
                  
                  {/* Padrão de fundo animado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-4 w-6 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
                  
                  <div className="relative text-center text-white z-10 p-4">
                    <currentResult.icon className="h-12 w-12 mx-auto mb-3 group-hover/visual:animate-bounce" />
                    <div className="text-3xl md:text-4xl font-bold mb-2 group-hover/visual:scale-110 transition-transform duration-300">
                      {currentResult.percentage}
                    </div>
                    <div className="text-sm font-semibold opacity-90 leading-tight">
                      {currentResult.metric}
                    </div>
                    <div className="mt-2 text-xs opacity-75">
                      Resultado Comprovado
                    </div>
                  </div>
                  
                  {/* Efeito de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/visual:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots - Melhorados */}
        <div className="flex justify-center mt-8 animate-in fade-in-0 duration-500 delay-500">
          <div className="flex gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`group relative transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue ${
                  index === currentSlide 
                    ? 'scale-125' 
                    : 'hover:scale-105'
                } ${isAnimating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                aria-label={`Ir para slide ${index + 1}: ${result.title}`}
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `bg-gradient-to-br ${result.bgColor} shadow-lg ring-2 ring-white ring-offset-1` 
                    : 'bg-gray-300 group-hover:bg-gray-400 group-hover:shadow-md'
                }`}>
                  {index === currentSlide && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse"></div>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {result.title}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResultsCarousel;
