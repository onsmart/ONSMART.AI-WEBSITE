import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, HardDrive, Zap, Shield, Users, Scale, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function StorageCeph() {
  const navigate = useNavigate();
  const { t } = useTranslation('storageCeph');

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
  const capacityCount = useCountUp(1, 1500);
  const availabilityCount = useCountUp(99, 2000);
  const opensourceCount = useCountUp(100, 1800);

  // Contadores para seção adicional
  const petabyteCount = useCountUp(1000, 2500);
  const enterpriseCount = useCountUp(600, 2200);
  const performanceCount = useCountUp(99, 2000);

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
                    src="https://images-onsmart.vercel.app/onsmart.ai/storage.png" 
                    alt={t('hero.title')} 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain scale-150"
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
                <div className="text-center" ref={capacityCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {capacityCount.count}EB+
                  </div>
                  <div className="text-sm text-gray-600">{t('numbers.capacity')}</div>
                </div>
                <div className="text-center" ref={availabilityCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {availabilityCount.count}.9%
                  </div>
                  <div className="text-sm text-gray-600">{t('statsTop.availability')}</div>
                </div>
                <div className="text-center" ref={opensourceCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {opensourceCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Open Source</div>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('features.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('features.object.title')}</h4>
                      <p className="text-gray-600">{t('features.object.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('features.block.title')}</h4>
                      <p className="text-gray-600">{t('features.block.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('features.file.title')}</h4>
                      <p className="text-gray-600">{t('features.file.desc')}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('advanced.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('advanced.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <HardDrive className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('advanced.replication')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('advanced.replicationDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t('advanced.automation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('advanced.automationDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{t('advanced.security')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('advanced.securityDesc')}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('numbers.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('numbers.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={petabyteCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {petabyteCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('numbers.capacity')}</div>
              <div className="text-gray-600">{t('numbers.capacityDesc')}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={enterpriseCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {enterpriseCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('numbers.clusters')}</div>
              <div className="text-gray-600">{t('numbers.clustersDesc')}</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={performanceCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {performanceCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{t('numbers.iops')}</div>
              <div className="text-gray-600">{t('numbers.iopsDesc')}</div>
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