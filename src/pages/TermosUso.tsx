import React from 'react';
import { useTranslation } from 'react-i18next';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

/**
 * Termos de uso — estrutura explícita (evita falhas com returnObjects / chaves dinâmicas no i18n).
 */
const TermosUso = () => {
  const { t } = useTranslation(['termosUso', 'common']);

  const items3 = t('sections.3.items', { returnObjects: true });
  const items4 = t('sections.4.items', { returnObjects: true });
  const list3 = Array.isArray(items3) ? items3 : [];
  const list4 = Array.isArray(items4) ? items4 : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <UnifiedSEO
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
      />

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('title')}</h1>

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
              <p>{t('sections.2.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.3.title')}</h2>
              <p>{t('sections.3.content')}</p>
              <ul className="list-disc ml-6">
                {list3.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.4.title')}</h2>
              <p>{t('sections.4.content')}</p>
              <ul className="list-disc ml-6">
                {list4.map((item, idx) => (
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
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.7.title')}</h2>
              <p>{t('sections.7.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.8.title')}</h2>
              <p>{t('sections.8.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.9.title')}</h2>
              <p>{t('sections.9.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('sections.10.title')}</h2>
              <p>{t('sections.10.content')}</p>
              <ul className="list-none ml-0 mt-4">
                <li>
                  <strong>{t('sections.10.contact.email')}</strong> atendimento.ai@onsmart.com.br
                </li>
                <li>
                  <strong>{t('sections.10.contact.phone')}</strong> +55 (11) 5093-1495
                </li>
                <li>
                  <strong>{t('sections.10.contact.whatsapp')}</strong> +55 (11) 99666-9247
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermosUso;
