import React from 'react';
import { useTranslation } from 'react-i18next';

const VideoAboutSection = () => {
  const { t } = useTranslation('home');
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 relative overflow-hidden">
      {/* Background Animation - Simplified */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-brand-blue/3 to-blue-600/3 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-600/3 to-brand-blue/3 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          {/* Simple Badge */}
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-brand-blue to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium">
              {t('videoAbout.badge')}
            </div>
          </div>

          {/* Main Title - Standard Size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {t('videoAbout.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">onsmart AI</span>
          </h2>

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{t('videoAbout.subtitle.start')}</span> {t('videoAbout.subtitle.end')}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/images/onsmart.jpg" 
                alt={t('videoAbout.imageAlt')}
                className="w-full h-80 sm:h-96 md:h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Mission */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-brand-blue rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('videoAbout.mission.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-4 sm:pl-6 text-base sm:text-lg">
                {t('videoAbout.mission.description')}
              </p>
            </div>

            {/* Results */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-blue-600 rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('videoAbout.results.title')}</h3>
              </div>
              <div className="pl-4 sm:pl-6 space-y-2 sm:space-y-3">
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">{t('videoAbout.results.companies.count')}+</span> {t('videoAbout.results.companies.text')}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">{t('videoAbout.results.roi.value')}%</span> {t('videoAbout.results.roi.text')}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-brand-blue">{t('videoAbout.results.implementation.days')} {t('videoAbout.results.implementation.unit')}</span> {t('videoAbout.results.implementation.text')}
                </p>
              </div>
            </div>

            {/* Pioneers Statement */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-1 h-6 sm:h-8 bg-brand-blue rounded-full mr-3 sm:mr-4"></div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{t('videoAbout.pioneers.title')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-4 sm:pl-6 text-base sm:text-lg">
                {t('videoAbout.pioneers.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAboutSection;
