
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogAuthorFormProps {
  formData: {
    author: string;
    author_role: string;
    author_bio: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BlogAuthorForm: React.FC<BlogAuthorFormProps> = ({
  formData,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Autor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Nome do Autor *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({...prev, author: e.target.value}))}
              required
            />
          </div>
          <div>
            <Label htmlFor="author_role">Cargo</Label>
            <Input
              id="author_role"
              value={formData.author_role}
              onChange={(e) => setFormData(prev => ({...prev, author_role: e.target.value}))}
              placeholder="ex: Especialista em IA"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="author_bio">Biografia do Autor</Label>
          <Textarea
            id="author_bio"
            value={formData.author_bio}
            onChange={(e) => setFormData(prev => ({...prev, author_bio: e.target.value}))}
            rows={3}
            placeholder="Breve biografia do autor..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogAuthorForm;
