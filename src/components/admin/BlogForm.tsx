
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { CMSBlogPost } from '@/hooks/useCMSBlog';
import BlogBasicInfoForm from './blog/BlogBasicInfoForm';
import BlogContentForm from './blog/BlogContentForm';
import BlogTagsManager from './blog/BlogTagsManager';
import BlogAuthorForm from './blog/BlogAuthorForm';
import BlogPublishingSettings from './blog/BlogPublishingSettings';

interface BlogFormProps {
  post?: CMSBlogPost | null;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    author_role: '',
    author_bio: '',
    category: '',
    tags: [] as string[],
    image_url: '',
    featured: false,
    read_time: '',
    is_published: false
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        author: post.author,
        author_role: post.author_role || '',
        author_bio: post.author_bio || '',
        category: post.category,
        tags: post.tags,
        image_url: post.image_url || '',
        featured: post.featured,
        read_time: post.read_time || '',
        is_published: post.is_published
      });
    }
  }, [post]);

  // Gerar slug automaticamente baseado no título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplos
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h3 className="text-xl font-semibold">
          {post ? 'Editar Post do Blog' : 'Novo Post do Blog'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BlogBasicInfoForm
          formData={formData}
          setFormData={setFormData}
          generateSlug={generateSlug}
          post={post}
        />

        <BlogContentForm
          content={formData.content}
          setFormData={setFormData}
        />

        <BlogTagsManager
          tags={formData.tags}
          setFormData={setFormData}
        />

        <BlogAuthorForm
          formData={formData}
          setFormData={setFormData}
        />

        <BlogPublishingSettings
          formData={formData}
          setFormData={setFormData}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
