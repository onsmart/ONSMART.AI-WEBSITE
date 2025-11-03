import React from 'react';
import { useTranslation } from 'react-i18next';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const TermosUso = () => {
  const { t } = useTranslation(['termosUso', 'common']);
  
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

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sectionNum) => {
              const sectionKey = `sections.${sectionNum}`;
              const sectionItems = t(`${sectionKey}.items`, { returnObjects: true }) as string[] | undefined;
              const sectionContent = t(`${sectionKey}.content`);
              
              return (
                <section key={sectionNum} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{t(`${sectionKey}.title`)}</h2>
                  <p>{sectionContent}</p>
                  {sectionItems && sectionItems.length > 0 && (
                    <ul className="list-disc ml-6">
                      {sectionItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {sectionNum === 10 && (
                    <ul className="list-none ml-0">
                      <li><strong>{t(`${sectionKey}.contact.email`)}</strong> atendimento.ai@onsmart.com.br</li>
                      <li><strong>{t(`${sectionKey}.contact.phone`)}</strong> +55 (11) 5093-1495</li>
                      <li><strong>{t(`${sectionKey}.contact.whatsapp`)}</strong> +55 (11) 99666-9247</li>
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;
