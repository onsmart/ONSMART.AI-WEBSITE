
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { CMSContentItem } from '@/hooks/useCMSContent';

interface ContentFormProps {
  content?: CMSContentItem | null;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

type DifficultyLevel = 'iniciante' | 'intermediario' | 'avancado';

const ContentForm: React.FC<ContentFormProps> = ({ content, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    content: '',
    category: '',
    tags: [] as string[],
    difficulty: 'iniciante' as DifficultyLevel,
    read_time: 5,
    file_url: '',
    preview_url: '',
    file_size: '',
    prerequisites: [] as string[],
    learning_objectives: [] as string[],
    is_published: false
  });

  const [tagsInput, setTagsInput] = useState('');
  const [prerequisitesInput, setPrerequisitesInput] = useState('');
  const [objectivesInput, setObjectivesInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData({
        type: content.type,
        title: content.title,
        description: content.description || '',
        content: content.content || '',
        category: content.category,
        tags: content.tags,
        difficulty: content.difficulty,
        read_time: content.read_time,
        file_url: content.file_url || '',
        preview_url: content.preview_url || '',
        file_size: content.file_size || '',
        prerequisites: content.prerequisites,
        learning_objectives: content.learning_objectives,
        is_published: content.is_published
      });
      setTagsInput(content.tags.join(', '));
      setPrerequisitesInput(content.prerequisites.join(', '));
      setObjectivesInput(content.learning_objectives.join(', '));
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag),
      prerequisites: prerequisitesInput.split(',').map(item => item.trim()).filter(item => item),
      learning_objectives: objectivesInput.split(',').map(item => item.trim()).filter(item => item)
    };

    await onSave(data);
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
          {content ? 'Editar Conteúdo' : 'Novo Conteúdo'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="artigo">Artigo</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="calculadora">Calculadora</SelectItem>
                    <SelectItem value="infografico">Infográfico</SelectItem>
                    <SelectItem value="caso">Caso de Estudo</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Conteúdo Completo</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                rows={6}
                placeholder="Descreva o conteúdo completo..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                    <SelectItem value="estrategico">Estratégico</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="difficulty">Dificuldade</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: DifficultyLevel) => 
                    setFormData(prev => ({...prev, difficulty: value}))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="read_time">Tempo de Leitura (min)</Label>
                <Input
                  id="read_time"
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData(prev => ({...prev, read_time: parseInt(e.target.value) || 5}))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="ia-empresarial, automacao, produtividade"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Arquivos e Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="file_url">URL do Arquivo</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData(prev => ({...prev, file_url: e.target.value}))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="preview_url">URL de Preview</Label>
                <Input
                  id="preview_url"
                  value={formData.preview_url}
                  onChange={(e) => setFormData(prev => ({...prev, preview_url: e.target.value}))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="file_size">Tamanho do Arquivo</Label>
                <Input
                  id="file_size"
                  value={formData.file_size}
                  onChange={(e) => setFormData(prev => ({...prev, file_size: e.target.value}))}
                  placeholder="5.2 MB"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes Educacionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="prerequisites">Pré-requisitos (separados por vírgula)</Label>
              <Input
                id="prerequisites"
                value={prerequisitesInput}
                onChange={(e) => setPrerequisitesInput(e.target.value)}
                placeholder="Conhecimento básico de IA, Experiência em gestão"
              />
            </div>
            <div>
              <Label htmlFor="objectives">Objetivos de Aprendizado (separados por vírgula)</Label>
              <Input
                id="objectives"
                value={objectivesInput}
                onChange={(e) => setObjectivesInput(e.target.value)}
                placeholder="Implementar IA, Calcular ROI, Otimizar processos"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData(prev => ({...prev, is_published: checked}))}
              />
              <Label htmlFor="is_published">Publicar conteúdo</Label>
            </div>
          </CardContent>
        </Card>

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

export default ContentForm;
