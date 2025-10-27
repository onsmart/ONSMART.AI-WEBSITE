
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCMSContent } from '@/hooks/useCMSContent';
import ContentList from './ContentList';
import ContentForm from './ContentForm';

const ContentManager = () => {
  const { content, loading, createContent, updateContent, deleteContent } = useCMSContent();
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  const handleCreate = () => {
    setEditingContent(null);
    setShowForm(true);
  };

  const handleEdit = (contentItem) => {
    setEditingContent(contentItem);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingContent(null);
  };

  const handleSave = async (data) => {
    let result;
    
    if (editingContent) {
      result = await updateContent(editingContent.id, data);
    } else {
      result = await createContent(data);
    }

    if (result.success) {
      handleCloseForm();
    }
    
    return result;
  };

  if (showForm) {
    return (
      <ContentForm
        content={editingContent}
        onSave={handleSave}
        onCancel={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Conteúdos</h3>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Conteúdo
        </Button>
      </div>

      <ContentList
        content={content}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteContent}
      />
    </div>
  );
};

export default ContentManager;
