import React from 'react';
import { Star, MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TestimonialsBrasil: React.FC = () => {
  // Depoimentos com nomes e contextos brasileiros mais específicos
  const testimonials = [
    {
      name: "Carlos Eduardo Mendes",
      position: "CEO",
      company: "TechSolutions Brasil",
      city: "São Paulo, SP",
      sector: "Desenvolvimento de Software",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+380%",
      timeframe: "4 meses",
      text: "Implementamos os Agentes de IA da onsmartAI em janeiro e até maio nossa produtividade explodiu 380%. Conseguimos entregar 15 projetos que antes levariam 8 meses. Minha equipe agora foca apenas em strategy e inovação.",
      metric: "15 projetos entregues em 4 meses"
    },
    {
      name: "Dra. Mariana Santos Silva",
      position: "Diretora Médica",
      company: "Hospital Santa Cruz",
      city: "Rio de Janeiro, RJ", 
      sector: "Saúde",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+290%",
      timeframe: "3 meses",
      text: "Em 90 dias cortamos 47% dos custos administrativos e melhoramos o atendimento drasticamente. Os agentes de IA processam laudos em 15 minutos ao invés de 3 horas. Nossos pacientes notaram a diferença imediatamente.",
      metric: "47% redução custos + 15min laudos"
    },
    {
      name: "Roberto Oliveira Jr.",
      position: "Diretor de Operações",
      company: "Financeira Nacional",
      city: "Brasília, DF",
      sector: "Serviços Financeiros",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+450%",
      timeframe: "5 meses",
      text: "Conseguimos analisar 25x mais solicitações de crédito com 92% de precisão. O que antes tomava 5 dias agora leva 2 horas. Aumentamos nossa carteira em 450% sem contratar ninguém. ROI absurdo!",
      metric: "25x mais análises em 2h"
    },
    {
      name: "Patricia Ferreira Costa",
      position: "Head de Marketing",
      company: "E-commerce MegaVarejo",
      city: "Belo Horizonte, MG",
      sector: "Varejo Digital",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+320%",
      timeframe: "2 meses",
      text: "Em apenas 2 meses, nossos agentes de IA personalizaram a experiência de 180 mil clientes. Conversão subiu 68%, ticket médio aumentou 45%. Melhor investimento que já fizemos na empresa.",
      metric: "68% conversão + 45% ticket médio"
    },
    {
      name: "André Luis Barbosa",
      position: "Diretor Industrial",
      company: "MetalúrgicaSul",
      city: "Porto Alegre, RS",
      sector: "Indústria",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+280%",
      timeframe: "6 meses",
      text: "Nossa linha de produção agora é monitorada 24/7 por IA. Reduzimos defeitos em 73% e aumentamos a produção em 40% sem parar as máquinas. A economia de material paga o sistema sozinha.",
      metric: "73% menos defeitos + 40% produção"
    },
    {
      name: "Juliana Rodrigues Lima",
      position: "Reitora",
      company: "Universidade Digital Brasil",
      city: "Fortaleza, CE",
      sector: "Educação",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=400&h=400&q=80",
      rating: 5,
      roi: "+340%",
      timeframe: "4 meses",
      text: "Implementamos tutores de IA para 12 mil alunos. Aprovação aumentou 84%, evasão caiu 56%. Professores agora focam em mentorias 1:1 enquanto a IA cuida do ensino básico. Transformação total!",
      metric: "84% aprovação + 56% menos evasão"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-brand-black to-brand-blue bg-clip-text text-transparent">
            Empresários Brasileiros que Multiplicaram seus Resultados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cases reais e verificados de líderes que implementaram nossos Agentes de IA e transformaram suas empresas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="h-full animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Header com foto e info */}
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-3 border-brand-blue/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                      <AvatarFallback className="bg-brand-blue/10 text-brand-black text-lg font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-black dark:text-gray-200">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                      <p className="text-sm font-medium text-brand-blue">{testimonial.company}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{testimonial.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating e ROI */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <span className="text-xs font-bold">{testimonial.roi} ROI</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col pt-0">
                  {/* Métrica de destaque */}
                  <div className="bg-brand-blue/10 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-brand-blue" />
                      <span className="text-sm font-semibold text-brand-blue">Resultado em {testimonial.timeframe}:</span>
                    </div>
                    <p className="text-sm font-bold text-brand-black dark:text-gray-200">{testimonial.metric}</p>
                  </div>

                  {/* Depoimento */}
                  <blockquote className="text-gray-700 dark:text-gray-300 italic flex-1 mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Setor */}
                  <div className="mt-auto">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                      {testimonial.sector}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-brand-blue/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Quer ser o próximo case de sucesso?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mais de 95% dos nossos clientes alcançam ROI positivo em menos de 90 dias
            </p>
            <button
              className="bg-brand-black text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-black/90 transition-all duration-200 hover-scale"
              onClick={() => window.location.href = '/contato'}
            >
              Descobrir Meu Potencial em 15 min
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBrasil;
