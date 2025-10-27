
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogContentFormProps {
  content: string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BlogContentForm: React.FC<BlogContentFormProps> = ({
  content,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conteúdo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content">Conteúdo do Post *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
            rows={12}
            required
            placeholder="Escreva o conteúdo completo do post..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogContentForm;
