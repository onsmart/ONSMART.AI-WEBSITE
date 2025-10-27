import { useCallback, useEffect, useState } from 'react';
import { useConversionMetrics } from './useConversionMetrics';

interface LeadScoringEvent {
  action: string;
  points: number;
  category: 'content' | 'engagement' | 'intent' | 'demographic';
  metadata?: Record<string, any>;
}

interface LeadProfile {
  totalScore: number;
  categoryScores: Record<string, number>;
  lastActivity: string;
  engagementLevel: 'cold' | 'warm' | 'hot' | 'qualified';
  activities: LeadScoringEvent[];
}

const SCORING_RULES = {
  // Content engagement
  blog_read: 10,
  blog_time_spent_30s: 5,
  blog_time_spent_2min: 15,
  case_study_viewed: 20,
  case_study_details_viewed: 30,
  content_downloaded: 25,
  multiple_articles_read: 35,
  
  // Intent signals
  pricing_page_viewed: 40,
  contact_form_started: 50,
  diagnostic_form_started: 60,
  demo_requested: 80,
  whatsapp_clicked: 45,
  
  // Engagement depth
  return_visitor: 15,
  multiple_sessions: 20,
  referral_traffic: 10,
  direct_traffic: 25,
  
  // Demographic
  enterprise_email: 30,
  target_industry: 20,
  company_size_qualified: 25
};

export const useLeadScoring = () => {
  const { trackConversion } = useConversionMetrics();
  const [leadProfile, setLeadProfile] = useState<LeadProfile>(() => {
    const stored = localStorage.getItem('lead_profile');
    return stored ? JSON.parse(stored) : {
      totalScore: 0,
      categoryScores: { content: 0, engagement: 0, intent: 0, demographic: 0 },
      lastActivity: new Date().toISOString(),
      engagementLevel: 'cold' as const,
      activities: []
    };
  });

  const scoreAction = useCallback((action: string, metadata?: Record<string, any>) => {
    const points = SCORING_RULES[action as keyof typeof SCORING_RULES] || 0;
    if (points === 0) return;

    const category = getCategoryForAction(action);
    const event: LeadScoringEvent = {
      action,
      points,
      category,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      }
    };

    setLeadProfile(prev => {
      const newProfile = {
        ...prev,
        totalScore: prev.totalScore + points,
        categoryScores: {
          ...prev.categoryScores,
          [category]: (prev.categoryScores[category] || 0) + points
        },
        lastActivity: new Date().toISOString(),
        activities: [...prev.activities.slice(-49), event] // Keep last 50 activities
      };

      newProfile.engagementLevel = calculateEngagementLevel(newProfile.totalScore);
      
      localStorage.setItem('lead_profile', JSON.stringify(newProfile));
      
      // Track for analytics
      trackConversion({
        component: 'LeadScoring',
        action: 'score_increase',
        funnel_step: 'qualification',
        value: points,
        metadata: {
          action,
          total_score: newProfile.totalScore,
          engagement_level: newProfile.engagementLevel,
          category
        }
      });

      return newProfile;
    });
  }, [trackConversion]);

  const getCategoryForAction = (action: string): LeadScoringEvent['category'] => {
    if (action.includes('blog') || action.includes('content') || action.includes('case')) {
      return 'content';
    }
    if (action.includes('form') || action.includes('demo') || action.includes('pricing') || action.includes('whatsapp')) {
      return 'intent';
    }
    if (action.includes('visitor') || action.includes('session') || action.includes('traffic')) {
      return 'engagement';
    }
    return 'demographic';
  };

  const calculateEngagementLevel = (score: number): LeadProfile['engagementLevel'] => {
    if (score >= 150) return 'qualified';
    if (score >= 100) return 'hot';
    if (score >= 50) return 'warm';
    return 'cold';
  };

  const getRecommendedActions = useCallback(() => {
    const { totalScore, categoryScores, engagementLevel } = leadProfile;
    
    if (engagementLevel === 'qualified') {
      return [
        { action: 'demo_request', priority: 'high', text: 'Agende uma Demo Personalizada' },
        { action: 'direct_contact', priority: 'high', text: 'Fale Diretamente com Especialista' }
      ];
    }
    
    if (engagementLevel === 'hot') {
      return [
        { action: 'diagnostic_form', priority: 'high', text: 'Diagnóstico Gratuito' },
        { action: 'case_study', priority: 'medium', text: 'Ver Cases Similares' }
      ];
    }
    
    if (engagementLevel === 'warm') {
      return [
        { action: 'content_upgrade', priority: 'medium', text: 'Download Gratuito' },
        { action: 'webinar', priority: 'medium', text: 'Participe do Webinar' }
      ];
    }
    
    return [
      { action: 'content_consumption', priority: 'low', text: 'Explore Nosso Conteúdo' },
      { action: 'newsletter', priority: 'low', text: 'Receba Updates' }
    ];
  }, [leadProfile]);

  return {
    leadProfile,
    scoreAction,
    getRecommendedActions,
    isQualified: leadProfile.engagementLevel === 'qualified',
    isHot: leadProfile.engagementLevel === 'hot'
  };
};
