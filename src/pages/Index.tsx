import React, { Suspense, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import { useConversionMetrics } from "@/hooks/useConversionMetrics";
import MicroConversionTracker from "@/components/home/MicroConversionTracker";

// Critical components - load immediately
import HeroSection from "@/components/home/HeroSection";
import VideoAboutSection from "@/components/home/VideoAboutSection";
import LiderModel from "@/components/home/LiderModel";
import ROICalculator from "@/components/home/ROICalculator";

// Non-critical components - lazy load (simplified approach)
const FeaturesTabs = lazy(() => import("@/components/home/FeaturesTabs"));
const ResultsCarousel = lazy(() => import("@/components/home/ResultsCarousel"));
const WhyAIAgents = lazy(() => import("@/components/shared/WhyAIAgents"));
const FAQ = lazy(() => import("@/components/home/FAQ"));
const CasesDeSucessoSection = lazy(() => import("@/components/home/CasesDeSucessoSection"));

const ComponentFallback = () => (
  <div className="py-4">
    <LoadingSkeleton variant="card" className="h-32 mb-2" />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['index', 'common']);
  const { trackFunnelStep } = useConversionMetrics();


  const handleContactClick = () => {
    trackFunnelStep('contact_click', 'homepage_hero');
    navigate('/contato');
  };

  const handleLearnMoreClick = () => {
    trackFunnelStep('learn_more_click', 'homepage_hero');
    const liderSection = document.querySelector('#lider-model');
    if (liderSection) {
      const elementTop = liderSection.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight = document.getElementById('navigation')?.offsetHeight || 80;
      const offsetPosition = elementTop - headerHeight - 20;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <MicroConversionTracker>
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: t('seo.title'),
          description: t('seo.description')
        }}
      />
      
      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        {/* Essential content only - minimal approach */}
        <div className="relative" style={{ zIndex: 10 }}>
          <HeroSection 
            handleContactClick={handleContactClick}
            handleLearnMoreClick={handleLearnMoreClick}
          />
          
          <VideoAboutSection />
          
          <LiderModel />
          
          {/* ROI Calculator - Essential for conversions */}
          <div id="roi-calculator" data-component="roi-calculator">
            <ROICalculator />
          </div>

          {/* Cases de Sucesso */}
          <Suspense fallback={<ComponentFallback />}>
            <CasesDeSucessoSection />
          </Suspense>
          
          {/* Why AI Agents Section */}
          <Suspense fallback={<ComponentFallback />}>
            <WhyAIAgents />
          </Suspense>
          
          {/* Essential FAQ for conversion */}
          <Suspense fallback={<ComponentFallback />}>
            <FAQ />
          </Suspense>
        </div>
      </div>
    </MicroConversionTracker>
  );
};

export default Index;