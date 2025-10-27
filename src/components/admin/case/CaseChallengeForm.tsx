
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseChallengeFormProps {
  formData: {
    challenge: string;
    solution: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CaseChallengeForm: React.FC<CaseChallengeFormProps> = ({
  formData,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desafio e Solução</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="challenge">Desafio *</Label>
          <Textarea
            id="challenge"
            value={formData.challenge}
            onChange={(e) => setFormData(prev => ({...prev, challenge: e.target.value}))}
            rows={4}
            required
          />
        </div>
        <div>
          <Label htmlFor="solution">Solução *</Label>
          <Textarea
            id="solution"
            value={formData.solution}
            onChange={(e) => setFormData(prev => ({...prev, solution: e.target.value}))}
            rows={4}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseChallengeForm;
