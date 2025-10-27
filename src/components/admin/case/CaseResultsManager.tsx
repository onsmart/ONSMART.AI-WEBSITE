
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface CaseResultsManagerProps {
  results: string[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CaseResultsManager: React.FC<CaseResultsManagerProps> = ({
  results,
  setFormData
}) => {
  const [newResult, setNewResult] = useState('');

  const addResult = () => {
    if (newResult.trim()) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, newResult.trim()]
      }));
      setNewResult('');
    }
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newResult}
            onChange={(e) => setNewResult(e.target.value)}
            placeholder="Adicionar resultado..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
          />
          <Button type="button" onClick={addResult} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="flex-1">{result}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeResult(index)}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseResultsManager;
