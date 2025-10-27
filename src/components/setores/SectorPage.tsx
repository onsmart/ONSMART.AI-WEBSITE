import React from 'react';
import { SectorData } from '@/data/sectorsData';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import SectorHero from './SectorHero';
import SectorChallenges from './SectorChallenges';
import SectorSolutions from './SectorSolutions';
import SectorCaseStudy from './SectorCaseStudy';
import SectorFeatures from './SectorFeatures';
import SectorCTA from './SectorCTA';

interface SectorPageProps {
  sector: SectorData;
}

const SectorPage: React.FC<SectorPageProps> = ({ sector }) => {
  return (
    <>
      {/* SEO Configuration */}
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: sector.seoTitle,
          description: sector.seoDescription,
          keywords: sector.keywords.join(', '),
          image: sector.heroImage,
          url: `/setores/${sector.slug}`
        }}
      />

      <div className="min-h-screen">
        {/* AIDA Structure Implementation */}
        
        {/* ATTENTION - Hero Section */}
        <SectorHero sector={sector} />
        
        {/* ATTENTION - Problem Awareness */}
        <SectorChallenges sector={sector} />
        
        {/* INTEREST - Solution Presentation */}
        <SectorSolutions sector={sector} />
        
        {/* DESIRE - Social Proof */}
        <SectorCaseStudy sector={sector} />
        
        {/* DESIRE - Feature Benefits */}
        <SectorFeatures sector={sector} />
        
        {/* ACTION - Final CTA */}
        <SectorCTA sector={sector} />
      </div>
    </>
  );
};

export default SectorPage;