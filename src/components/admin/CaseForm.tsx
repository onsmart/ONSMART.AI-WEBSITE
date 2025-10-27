
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { CMSCaseStudy } from '@/hooks/useCMSCases';
import CaseBasicInfoForm from './case/CaseBasicInfoForm';
import CaseChallengeForm from './case/CaseChallengeForm';
import CaseResultsManager from './case/CaseResultsManager';
import CaseMetricsForm from './case/CaseMetricsForm';
import CaseTestimonialForm from './case/CaseTestimonialForm';
import CasePublishingSettings from './case/CasePublishingSettings';

interface CaseFormProps {
  caseData?: CMSCaseStudy | null;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ caseData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    sector: '',
    challenge: '',
    solution: '',
    results: [] as string[],
    timeline: '',
    investment: '',
    roi: '',
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_position: '',
    testimonial_company: '',
    image_url: '',
    is_featured: false,
    is_published: false
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (caseData) {
      setFormData({
        company: caseData.company,
        industry: caseData.industry,
        sector: caseData.sector,
        challenge: caseData.challenge,
        solution: caseData.solution,
        results: caseData.results,
        timeline: caseData.timeline || '',
        investment: caseData.investment || '',
        roi: caseData.roi || '',
        testimonial_quote: caseData.testimonial_quote || '',
        testimonial_author: caseData.testimonial_author || '',
        testimonial_position: caseData.testimonial_position || '',
        testimonial_company: caseData.testimonial_company || '',
        image_url: caseData.image_url || '',
        is_featured: caseData.is_featured,
        is_published: caseData.is_published
      });
    }
  }, [caseData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
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
          {caseData ? 'Editar Case de Sucesso' : 'Novo Case de Sucesso'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CaseBasicInfoForm
          formData={formData}
          setFormData={setFormData}
        />

        <CaseChallengeForm
          formData={formData}
          setFormData={setFormData}
        />

        <CaseResultsManager
          results={formData.results}
          setFormData={setFormData}
        />

        <CaseMetricsForm
          formData={formData}
          setFormData={setFormData}
        />

        <CaseTestimonialForm
          formData={formData}
          setFormData={setFormData}
        />

        <CasePublishingSettings
          formData={formData}
          setFormData={setFormData}
        />

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

export default CaseForm;
