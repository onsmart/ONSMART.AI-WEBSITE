
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseTestimonialFormProps {
  formData: {
    testimonial_quote: string;
    testimonial_author: string;
    testimonial_position: string;
    testimonial_company: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CaseTestimonialForm: React.FC<CaseTestimonialFormProps> = ({
  formData,
  setFormData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Depoimento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="testimonial_quote">Citação</Label>
          <Textarea
            id="testimonial_quote"
            value={formData.testimonial_quote}
            onChange={(e) => setFormData(prev => ({...prev, testimonial_quote: e.target.value}))}
            rows={3}
            placeholder="Depoimento do cliente..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="testimonial_author">Autor</Label>
            <Input
              id="testimonial_author"
              value={formData.testimonial_author}
              onChange={(e) => setFormData(prev => ({...prev, testimonial_author: e.target.value}))}
              placeholder="Nome completo"
            />
          </div>
          <div>
            <Label htmlFor="testimonial_position">Posição</Label>
            <Input
              id="testimonial_position"
              value={formData.testimonial_position}
              onChange={(e) => setFormData(prev => ({...prev, testimonial_position: e.target.value}))}
              placeholder="Cargo"
            />
          </div>
          <div>
            <Label htmlFor="testimonial_company">Empresa do Depoimento</Label>
            <Input
              id="testimonial_company"
              value={formData.testimonial_company}
              onChange={(e) => setFormData(prev => ({...prev, testimonial_company: e.target.value}))}
              placeholder="Nome da empresa"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseTestimonialForm;
