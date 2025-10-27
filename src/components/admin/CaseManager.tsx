
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCMSCases } from '@/hooks/useCMSCases';
import CaseList from './CaseList';
import CaseForm from './CaseForm';

const CaseManager = () => {
  const { cases, loading, createCase, updateCase, deleteCase } = useCMSCases();
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState(null);

  const handleCreate = () => {
    setEditingCase(null);
    setShowForm(true);
  };

  const handleEdit = (caseItem) => {
    setEditingCase(caseItem);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCase(null);
  };

  const handleSave = async (data) => {
    let result;
    
    if (editingCase) {
      result = await updateCase(editingCase.id, data);
    } else {
      result = await createCase(data);
    }

    if (result.success) {
      handleCloseForm();
    }
    
    return result;
  };

  if (showForm) {
    return (
      <CaseForm
        caseData={editingCase}
        onSave={handleSave}
        onCancel={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Cases ({cases.length})</h3>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Case
        </Button>
      </div>

      <CaseList
        cases={cases}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteCase}
      />
    </div>
  );
};

export default CaseManager;
