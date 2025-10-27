
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star, BookOpen, Calendar, Eye } from 'lucide-react';
import { CMSBlogPost } from '@/hooks/useCMSBlog';

interface BlogListProps {
  posts: CMSBlogPost[];
  loading: boolean;
  onEdit: (post: CMSBlogPost) => void;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const BlogList: React.FC<BlogListProps> = ({ posts, loading, onEdit, onDelete }) => {
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o post "${title}"?`)) {
      await onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum post encontrado</h3>
            <p>Comece criando seu primeiro post do blog.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                <div className="flex gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                  <Badge variant={post.is_published ? "default" : "secondary"}>
                    {post.is_published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Por: {post.author}</span>
                  {post.read_time && <span>Leitura: {post.read_time}</span>}
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.views} visualizações</span>
                  </div>
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(post.id, post.title)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Deletar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {post.excerpt && (
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Resumo:</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Tags:</h4>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 5).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 5} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              <div className="text-xs text-gray-400">
                Slug: /{post.slug}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
