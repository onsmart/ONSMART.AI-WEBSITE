
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

const InformacoesProfissionaisForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Informações Profissionais
        </CardTitle>
        <CardDescription>
          Conte-nos sobre sua experiência e rede de contatos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profissao">Profissão/Área de Atuação *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                <SelectItem value="vendas">Vendas/Comercial</SelectItem>
                <SelectItem value="consultoria">Consultoria</SelectItem>
                <SelectItem value="marketing">Marketing Digital</SelectItem>
                <SelectItem value="empresario">Empresário</SelectItem>
                <SelectItem value="executivo">Executivo</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experiencia">Experiência em Vendas *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iniciante">Iniciante (menos de 1 ano)</SelectItem>
                <SelectItem value="intermediario">Intermediário (1-3 anos)</SelectItem>
                <SelectItem value="experiente">Experiente (3-5 anos)</SelectItem>
                <SelectItem value="expert">Expert (5+ anos)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="network">Tamanho da sua Rede de Contatos Empresariais *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Quantas empresas você conhece?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pequena">Pequena (1-20 empresas)</SelectItem>
              <SelectItem value="media">Média (21-50 empresas)</SelectItem>
              <SelectItem value="grande">Grande (51-100 empresas)</SelectItem>
              <SelectItem value="muito-grande">Muito Grande (100+ empresas)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sobre">Conte mais sobre você *</Label>
          <Textarea 
            id="sobre" 
            placeholder="Descreva sua experiência, rede de contatos, motivação para ser um Agente Digital..."
            rows={4}
            required 
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn (Opcional)</Label>
          <Input id="linkedin" placeholder="https://linkedin.com/in/seuperfil" />
        </div>
      </CardContent>
    </Card>
  );
};

export default InformacoesProfissionaisForm;
