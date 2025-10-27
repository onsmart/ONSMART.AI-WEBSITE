
import { useState, useEffect } from 'react';
import { supabase, supabaseHelpers } from '@/integrations/supabase/client';

export interface CMSContentItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  content?: string;
  category: string;
  tags: string[];
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  read_time: number;
  rating: number;
  total_ratings: number;
  download_count: number;
  file_url?: string;
  preview_url?: string;
  file_size?: string;
  prerequisites: string[];
  learning_objectives: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSContent = () => {
  const [content, setContent] = useState<CMSContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (publishedOnly = true) => {
    try {
      setLoading(true);
      
      if (!supabaseHelpers.isConfigured()) {
        console.warn('Supabase not configured, using empty data');
        setContent([]);
        setError(null);
        return;
      }

      const result = await supabaseHelpers.safeQuery(async () => {
        let query = supabase.from('content_items').select('*');
        
        if (publishedOnly) {
          query = query.eq('is_published', true);
        }
        
        return await query.order('created_at', { ascending: false });
      });
      
      if (result.error) {
        setError('Erro ao carregar conteúdo');
      } else {
        setContent(result.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar conteúdo');
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<CMSContentItem, 'id' | 'created_at' | 'updated_at'>) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }

    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert([contentData])
        .select()
        .single();

      if (error) throw error;
      
      setContent(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao criar conteúdo' 
      };
    }
  };

  const updateContent = async (id: string, updates: Partial<CMSContentItem>) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }

    try {
      const { data, error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setContent(prev => prev.map(item => item.id === id ? data : item));
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao atualizar conteúdo' 
      };
    }
  };

  const deleteContent = async (id: string) => {
    if (!supabaseHelpers.isConfigured()) {
      return { 
        success: false, 
        error: 'Sistema CMS requer configuração do Supabase' 
      };
    }

    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContent(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao deletar conteúdo' 
      };
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    fetchContent,
    createContent,
    updateContent,
    deleteContent
  };
};
