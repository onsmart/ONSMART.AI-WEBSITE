
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseBasicInfoFormProps {
  formData: {
    company: string;
    industry: string;
    sector: string;
    image_url: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CaseBasicInfoForm: React.FC<CaseBasicInfoFormProps> = ({
  formData,
  setFormData
}) => {
  const sectors = ['tecnologia', 'saude', 'educacao', 'financas', 'varejo'];
  const industries = [
    'Tecnologia', 'Saúde', 'Educação', 'Finanças', 'Varejo', 'Manufatura',
    'Agronegócio', 'Energia', 'Telecomunicações', 'Logística', 'Imobiliário',
    'Serviços', 'Governo', 'ONGs', 'Consultoria'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Empresa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Empresa *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
              required
            />
          </div>
          <div>
            <Label htmlFor="industry">Indústria *</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => setFormData(prev => ({...prev, industry: value}))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a indústria" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="sector">Setor *</Label>
          <Select
            value={formData.sector}
            onValueChange={(value) => setFormData(prev => ({...prev, sector: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector.charAt(0).toUpperCase() + sector.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({...prev, image_url: e.target.value}))}
            placeholder="https://..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseBasicInfoForm;
