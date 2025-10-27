
import { useState, useEffect } from 'react';
import { supabaseHelpers } from '@/integrations/supabase/client';

export interface CMSBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  author_role?: string;
  author_bio?: string;
  category: string;
  tags: string[];
  image_url?: string;
  featured: boolean;
  views: number;
  likes: number;
  read_time?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const useCMSBlog = () => {
  const [posts, setPosts] = useState<CMSBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (publishedOnly = true) => {
    try {
      setLoading(true);
      
      if (!supabaseHelpers.isConfigured()) {
        console.warn('Supabase not configured, using empty data');
        setPosts([]);
        setError(null);
        return;
      }

      // Mock implementation - replace with actual Supabase query when configured
      setPosts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<CMSBlogPost, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...postData,
          views: 0,
          likes: 0,
          published_at: postData.is_published ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;
      
      setPosts(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao criar post' 
      };
    }
  };

  const updatePost = async (id: string, updates: Partial<CMSBlogPost>) => {
    try {
      const updateData = { ...updates };
      
      // Se está publicando pela primeira vez, definir published_at
      if (updates.is_published && !posts.find(p => p.id === id)?.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setPosts(prev => prev.map(item => item.id === id ? data : item));
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao atualizar post' 
      };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPosts(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao deletar post' 
      };
    }
  };

  const getPostBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Post não encontrado' 
      };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug
  };
};
