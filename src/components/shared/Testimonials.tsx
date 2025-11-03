
import React from 'react';
import { useTranslation } from 'react-i18next';
import CompactTestimonialCard from './CompactTestimonialCard';

const Testimonials: React.FC = () => {
  const { t } = useTranslation('home');
  
  // Obter depoimentos traduzidos
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    position: string;
    company: string;
    sector: string;
    avatar: string;
    rating: number;
    text: string;
  }>;

  const featuredTestimonials = testimonials.slice(0, 3); // Mostrar apenas 3 testimonials

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            {t('testimonials.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            {t('testimonials.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('testimonials.titleHighlight')}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {featuredTestimonials.map((testimonial, index) => (
            <CompactTestimonialCard
              key={index}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
