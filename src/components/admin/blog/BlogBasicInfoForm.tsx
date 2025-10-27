
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogBasicInfoFormProps {
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image_url: string;
    read_time: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  generateSlug: (title: string) => string;
  post?: any;
}

const BlogBasicInfoForm: React.FC<BlogBasicInfoFormProps> = ({
  formData,
  setFormData,
  generateSlug,
  post
}) => {
  const categories = [
    'Inteligência Artificial',
    'Automação',
    'Tecnologia',
    'Marketing Digital',
    'Inovação',
    'Cases de Sucesso',
    'Tendências',
    'Dicas e Tutoriais'
  ];

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !post ? generateSlug(title) : prev.slug
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL) *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}
            required
            placeholder="url-amigavel-do-post"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL final: /blog/{formData.slug}
          </p>
        </div>
        <div>
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
            rows={3}
            placeholder="Breve resumo do post..."
          />
        </div>
        <div>
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({...prev, image_url: e.target.value}))}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label htmlFor="read_time">Tempo de Leitura</Label>
          <Input
            id="read_time"
            value={formData.read_time}
            onChange={(e) => setFormData(prev => ({...prev, read_time: e.target.value}))}
            placeholder="ex: 5 min"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogBasicInfoForm;
