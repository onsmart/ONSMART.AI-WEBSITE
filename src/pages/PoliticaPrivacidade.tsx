import React from 'react';
import { useTranslation } from 'react-i18next';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const PoliticaPrivacidade = () => {
  const { t } = useTranslation(['politicaPrivacidade', 'common']);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {t('title')}
          </h1>
          
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>{t('lastUpdate')}</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.1.title')}</h2>
              <p>{t('sections.1.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.2.title')}</h2>
              <h3 className="text-xl font-medium mb-2">{t('sections.2.subtitle1')}</h3>
              <p>{t('sections.2.subtitle1Content')}</p>
              <ul className="list-disc ml-6 mb-4">
                {(t('sections.2.personalInfo', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-medium mb-2">{t('sections.2.subtitle2')}</h3>
              <ul className="list-disc ml-6">
                {(t('sections.2.technicalInfo', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.3.title')}</h2>
              <p>{t('sections.3.content')}</p>
              <ul className="list-disc ml-6">
                {(t('sections.3.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.4.title')}</h2>
              <p>{t('sections.4.content')}</p>
              <ul className="list-disc ml-6">
                {(t('sections.4.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.5.title')}</h2>
              <p>{t('sections.5.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.6.title')}</h2>
              <p>{t('sections.6.content')}</p>
              <ul className="list-disc ml-6">
                {(t('sections.6.rights', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.7.title')}</h2>
              <p>{t('sections.7.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.8.title')}</h2>
              <p>{t('sections.8.content')}</p>
              <ul className="list-none ml-0">
                <li><strong>{t('sections.8.contact.email')}</strong> atendimento.ai@onsmart.com.br</li>
                <li><strong>{t('sections.8.contact.phone')}</strong> +55 (11) 5093-1495</li>
                <li><strong>{t('sections.8.contact.whatsapp')}</strong> +55 (11) 99666-9247</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
