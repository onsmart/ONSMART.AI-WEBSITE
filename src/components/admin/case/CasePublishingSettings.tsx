
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CasePublishingSettingsProps {
  formData: {
    is_featured: boolean;
    is_published: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CasePublishingSettings: React.FC<CasePublishingSettingsProps> = ({
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
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData(prev => ({...prev, is_featured: checked}))}
          />
          <Label htmlFor="is_featured">Case em destaque</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData(prev => ({...prev, is_published: checked}))}
          />
          <Label htmlFor="is_published">Publicar case</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasePublishingSettings;
