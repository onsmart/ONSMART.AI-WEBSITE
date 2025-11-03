import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Shield, Users, Clock, Send, Bot, Brain, Zap, Target, MessageCircle, Mic, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { openSoniaChat } from "@/hooks/useSoniaChat";
import { useTranslation } from 'react-i18next';

// Hook para contador animado
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
};

export default function SoniaAssistenteIA() {
  const navigate = useNavigate();
  const { t } = useTranslation('sonia');
  
  // Contadores animados
  const empresasCount = useCountUp(500, 2500);
  const sucessoCount = useCountUp(98, 1800);
  const implementacaoCount = useCountUp(30, 2000);
  const conversaoCount = useCountUp(300, 1500);
  const satisfacaoCount = useCountUp(95, 2200);
  const eficienciaCount = useCountUp(500, 1800);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-emerald-50">
                  <img 
                    src="/images/sonia.png" 
                    alt={t('hero.title')} 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">{t('hero.badge')}</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">{t('hero.title')}</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Companies */}
                <div className="text-center" ref={empresasCount.ref}>
                  <div className="text-3xl font-bold text-emerald-600">{empresasCount.count}+</div>
                  <div className="text-sm text-gray-600">{t('stats.companies')}</div>
                </div>
                {/* Success */}
                <div className="text-center" ref={sucessoCount.ref}>
                  <div className="text-3xl font-bold text-emerald-600">{sucessoCount.count}%</div>
                  <div className="text-sm text-gray-600">{t('stats.success')}</div>
                </div>
                {/* Implementation */}
                <div className="text-center" ref={implementacaoCount.ref}>
                  <div className="text-3xl font-bold text-emerald-600">{implementacaoCount.count}</div>
                  <div className="text-sm text-gray-600">{t('stats.implementation')}</div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('features.voiceProspecting.title')}</h3>
                  <p className="text-gray-600">{t('features.voiceProspecting.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('features.omnichannel.title')}</h3>
                  <p className="text-gray-600">{t('features.omnichannel.description')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('features.learning.title')}</h3>
                  <p className="text-gray-600">{t('features.learning.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => openSoniaChat()}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('cta.talkToSonia')}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="font-medium px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/agentes-ia')}
            >
              {t('cta.viewOthers')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
