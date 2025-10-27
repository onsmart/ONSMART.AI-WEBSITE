
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogPublishingSettingsProps {
  formData: {
    featured: boolean;
    is_published: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BlogPublishingSettings: React.FC<BlogPublishingSettingsProps> = ({
  formData,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Publicação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({...prev, featured: checked}))}
          />
          <Label htmlFor="featured">Post em destaque</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData(prev => ({...prev, is_published: checked}))}
          />
          <Label htmlFor="is_published">Publicar post</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPublishingSettings;
