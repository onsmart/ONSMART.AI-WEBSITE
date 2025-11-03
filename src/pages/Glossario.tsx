
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import { useTranslation } from 'react-i18next';

const Glossario = () => {
  const { t } = useTranslation(['glossario', 'common']);
  const [searchTerm, setSearchTerm] = useState("");

  const termos = [
    {
      termo: t('terms.aiAgents.termo'),
      definicao: t('terms.aiAgents.definicao')
    },
    {
      termo: t('terms.machineLearning.termo'),
      definicao: t('terms.machineLearning.definicao')
    },
    {
      termo: t('terms.nlp.termo'),
      definicao: t('terms.nlp.definicao')
    },
    {
      termo: t('terms.rpa.termo'),
      definicao: t('terms.rpa.definicao')
    },
    {
      termo: t('terms.deepLearning.termo'),
      definicao: t('terms.deepLearning.definicao')
    },
    {
      termo: t('terms.api.termo'),
      definicao: t('terms.api.definicao')
    },
    {
      termo: t('terms.bigData.termo'),
      definicao: t('terms.bigData.definicao')
    },
    {
      termo: t('terms.roi.termo'),
      definicao: t('terms.roi.definicao')
    }
  ];

  const termosFiltrados = termos.filter(item =>
    item.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="glossário ia, termos inteligencia artificial, definições ia, machine learning conceitos, vocabulário ia"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black dark:text-gray-100 mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('hero.description')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6">
              {termosFiltrados.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-brand-blue dark:text-brand-blue">
                      <BookOpen className="h-5 w-5" />
                      {item.termo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.definicao}
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              {termosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Nenhum termo encontrado para "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tem dúvidas sobre IA na sua empresa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Agende uma consultoria gratuita com nossos especialistas
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Glossario;
