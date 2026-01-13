import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, BarChart3, TrendingUp, Users, Shield, Zap, Target, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PlanningAnalytics() {
  const navigate = useNavigate();
  const { t } = useTranslation(["planningAnalytics", "common"]);

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

  // Contadores animados
  const accuracyCount = useCountUp(95, 1500);
  const speedCount = useCountUp(10, 2000);
  const collaborationCount = useCountUp(100, 1800);

  // Contadores para seção adicional
  const usersCount = useCountUp(50000, 2500);
  const enterpriseCount = useCountUp(800, 2200);
  const efficiencyCount = useCountUp(85, 2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">


      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-blue-50">
                  <img 
                    src="https://images-onsmart.vercel.app/onsmart.ai/planning analytics.png" 
                    alt={t('planningAnalytics:hero.title')} 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">{t('planningAnalytics:hero.badge')}</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">{t('planningAnalytics:hero.title')}</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t('planningAnalytics:hero.subtitle')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={accuracyCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {accuracyCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">{t('planningAnalytics:statsTop.accuracy')}</div>
                </div>
                <div className="text-center" ref={speedCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {speedCount.count}x
                  </div>
                  <div className="text-sm text-gray-600">{t('planningAnalytics:statsTop.speed')}</div>
                </div>
                <div className="text-center" ref={collaborationCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {collaborationCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">{t('planningAnalytics:statsTop.collaboration')}</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/contato')}
              >
                <Send className="mr-2 h-5 w-5" />
                {t('cta.requestDemo', { ns: 'common' })}
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('planningAnalytics:features.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('planningAnalytics:features.corporate.title')}</h4>
                      <p className="text-gray-600">{t('planningAnalytics:features.corporate.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('planningAnalytics:features.predictive.title')}</h4>
                      <p className="text-gray-600">{t('planningAnalytics:features.predictive.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('planningAnalytics:features.realtime.title')}</h4>
                      <p className="text-gray-600">{t('planningAnalytics:features.realtime.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('planningAnalytics:features.optimization.title')}</h4>
                      <p className="text-gray-600">{t('planningAnalytics:features.optimization.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('planningAnalytics:advanced.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('planningAnalytics:advanced.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.modeling.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.modeling.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.forecasting.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.forecasting.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.workflow.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.workflow.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.governance.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.governance.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.automation.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.automation.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>{t('planningAnalytics:advanced.dashboard.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('planningAnalytics:advanced.dashboard.desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('planningAnalytics:numbers.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('planningAnalytics:numbers.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={usersCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {usersCount.count.toLocaleString()}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('planningAnalytics:numbers.users')}</div>
              <div className="text-gray-600">{t('planningAnalytics:numbers.usersDesc')}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={enterpriseCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {enterpriseCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('planningAnalytics:numbers.enterprises')}</div>
              <div className="text-gray-600">{t('planningAnalytics:numbers.enterprisesDesc')}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={efficiencyCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {efficiencyCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('planningAnalytics:numbers.efficiency')}</div>
              <div className="text-gray-600">{t('planningAnalytics:numbers.efficiencyDesc')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t('planningAnalytics:cta.title')}</h2>
          <p className="text-xl mb-8 text-gray-600">
            {t('planningAnalytics:cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/contato')}
            >
              <Send className="mr-2 h-5 w-5" />
              {t('cta.requestDemo', { ns: 'common' })}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="font-medium px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/produtos')}
            >
              {t('cta.viewOthers', { ns: 'common' })}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 