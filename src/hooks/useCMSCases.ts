
import { useState, useEffect } from 'react';
import { supabaseHelpers } from '@/integrations/supabase/client';

export interface CMSCaseStudy {
  id: string;
  company: string;
  industry: string;
  sector: string;
  challenge: string;
  solution: string;
  results: string[];
  timeline?: string;
  investment?: string;
  roi?: string;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_position?: string;
  testimonial_company?: string;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSCases = () => {
  const [cases, setCases] = useState<CMSCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async (publishedOnly = true) => {
    try {
      setLoading(true);
      
      if (!supabaseHelpers.isConfigured()) {
        console.warn('Supabase not configured, using empty data');
        setCases([]);
        setError(null);
        return;
      }

      // Mock implementation - replace with actual Supabase query when configured
      setCases([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cases');
    } finally {
      setLoading(false);
    }
  };

  const createCase = async (caseData: Omit<CMSCaseStudy, 'id' | 'created_at' | 'updated_at'>) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }
    
    return { 
      success: false, 
      error: 'Funcionalidade não implementada' 
    };
  };

  const updateCase = async (id: string, updates: Partial<CMSCaseStudy>) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }
    
    return { 
      success: false, 
      error: 'Funcionalidade não implementada' 
    };
  };

  const deleteCase = async (id: string) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }
    
    return { 
      success: false, 
      error: 'Funcionalidade não implementada' 
    };
  };

  const getCasesBySector = (sector: string) => {
    return cases.filter(caseItem => caseItem.sector === sector && caseItem.is_published);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return {
    cases,
    loading,
    error,
    fetchCases,
    createCase,
    updateCase,
    deleteCase,
    getCasesBySector
  };
};
