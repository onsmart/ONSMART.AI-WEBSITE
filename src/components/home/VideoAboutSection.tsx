import React from 'react';

const VideoAboutSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Animation - Simplified */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-brand-blue/3 to-blue-600/3 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-600/3 to-brand-blue/3 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          {/* Simple Badge */}
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-brand-blue to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium">
              Pioneiros em IA Empresarial
            </div>
          </div>

          {/* Main Title - Standard Size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            Conheça a <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">onsmart AI</span>
          </h2>

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">Somos pioneiros</span> na transformação empresarial através da inteligência artificial
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/images/onsmart.jpg" 
                alt="Equipe onsmart AI - Pioneiros em IA"
                className="w-full h-80 sm:h-96 md:h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Mission */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-brand-blue rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Nossa Missão</h3>
              </div>
              <p className="text-gray-600 leading-relaxed pl-4 sm:pl-6 text-base sm:text-lg">
                Democratizar a inteligência artificial empresarial, oferecendo soluções que geram resultados mensuráveis e transformação real.
              </p>
            </div>

            {/* Results */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-blue-600 rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Resultados Comprovados</h3>
              </div>
              <div className="pl-4 sm:pl-6 space-y-2 sm:space-y-3">
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">350+</span> empresas transformadas
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">420%</span> ROI médio comprovado
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">30 dias</span> para implementação completa
                </p>
              </div>
            </div>

            {/* Pioneers Statement */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-brand-blue rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Por que Somos Pioneiros</h3>
              </div>
              <p className="text-gray-600 leading-relaxed pl-4 sm:pl-6 text-base sm:text-lg">
                Desde 2020, lideramos a revolução da IA no Brasil, desenvolvendo metodologias próprias e soluções inovadoras que estabelecem novos padrões de excelência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAboutSection;
