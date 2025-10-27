
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { CMSContentItem } from '@/hooks/useCMSContent';

interface ContentListProps {
  content: CMSContentItem[];
  loading: boolean;
  onEdit: (content: CMSContentItem) => void;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const ContentList: React.FC<ContentListProps> = ({ content, loading, onEdit, onDelete }) => {
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      await onDelete(id);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (content.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum conteúdo encontrado. Clique em "Novo Conteúdo" para começar.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {content.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {item.is_published ? (
                  <Badge variant="default" className="bg-green-500">
                    <Eye className="h-3 w-3 mr-1" />
                    Publicado
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Rascunho
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Badge variant="outline">{item.type}</Badge>
                <Badge variant="outline">{item.category}</Badge>
                <Badge variant="outline">{item.difficulty}</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Deletar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
