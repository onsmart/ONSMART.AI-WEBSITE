import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Shield, Users, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export default function AICodeAssistant() {
  const navigate = useNavigate();
  const { t } = useTranslation(["aiCodeAssistant", "common"]);
  
  // Contadores animados
  const productivityCount = useCountUp(90, 1500);
  const accuracyCount = useCountUp(95, 2000);
  const efficiencyCount = useCountUp(3, 1800);
  const projectsCount = useCountUp(500, 2500);
  const developersCount = useCountUp(200, 2200);
  const bugsCount = useCountUp(99, 2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">


      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <img 
                    src="https://images-onsmart.vercel.app/onsmart.ai/ai-code-assistant.png" 
                    alt={t('aiCodeAssistant:hero.title')}
                    className="w-16 h-16"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 dark:border-gray-700 dark:text-gray-300">{t('aiCodeAssistant:hero.badge')}</Badge>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:hero.title')}</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {t('aiCodeAssistant:hero.subtitle')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={productivityCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
                    {productivityCount.count}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('aiCodeAssistant:statsTop.devTime')}</div>
                </div>
                <div className="text-center" ref={accuracyCount.ref}>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 transition-all duration-300">
                    {accuracyCount.count}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('aiCodeAssistant:statsTop.bugAccuracy')}</div>
                </div>
                <div className="text-center" ref={efficiencyCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-300">
                    {efficiencyCount.count}x
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('aiCodeAssistant:statsTop.productivity')}</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/contato')}
              >
                <Send className="mr-2 h-5 w-5" />
                {t('cta.requestDemo')}
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('aiCodeAssistant:features.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:features.generation.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:features.generation.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:features.bugDetection.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:features.bugDetection.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:features.performance.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:features.performance.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:features.refactor.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:features.refactor.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('aiCodeAssistant:advanced.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aiCodeAssistant:advanced.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.realtime.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.realtime.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.security.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.security.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.collab.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.collab.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.debug.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.debug.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.tests.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.tests.desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="dark:text-gray-100">{t('aiCodeAssistant:advanced.deploy.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:advanced.deploy.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('aiCodeAssistant:numbers.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aiCodeAssistant:numbers.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg" ref={projectsCount.ref}>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-all duration-300">
                {projectsCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('aiCodeAssistant:numbers.projects')}</div>
              <div className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:numbers.projectsDesc')}</div>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg" ref={developersCount.ref}>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 transition-all duration-300">
                {developersCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('aiCodeAssistant:numbers.developers')}</div>
              <div className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:numbers.developersDesc')}</div>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg" ref={bugsCount.ref}>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 transition-all duration-300">
                {bugsCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('aiCodeAssistant:numbers.bugs')}</div>
              <div className="text-gray-600 dark:text-gray-300">{t('aiCodeAssistant:numbers.bugsDesc')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">{t('aiCodeAssistant:cta.title')}</h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            {t('aiCodeAssistant:cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/contato')}
            >
              <Send className="mr-2 h-5 w-5" />
              {t('cta.requestDemo')}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="font-medium px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/produtos')}
            >
              {t('aiCodeAssistant:cta.viewOthers')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 