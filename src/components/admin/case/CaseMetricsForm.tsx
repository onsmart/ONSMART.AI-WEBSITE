
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseMetricsFormProps {
  formData: {
    timeline: string;
    investment: string;
    roi: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CaseMetricsForm: React.FC<CaseMetricsFormProps> = ({
  formData,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas do Projeto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({...prev, timeline: e.target.value}))}
              placeholder="ex: 3 meses"
            />
          </div>
          <div>
            <Label htmlFor="investment">Investimento</Label>
            <Input
              id="investment"
              value={formData.investment}
              onChange={(e) => setFormData(prev => ({...prev, investment: e.target.value}))}
              placeholder="ex: R$ 50.000"
            />
          </div>
          <div>
            <Label htmlFor="roi">ROI</Label>
            <Input
              id="roi"
              value={formData.roi}
              onChange={(e) => setFormData(prev => ({...prev, roi: e.target.value}))}
              placeholder="ex: 300%"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseMetricsForm;
