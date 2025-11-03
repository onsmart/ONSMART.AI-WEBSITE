
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

const InformacoesProfissionaisForm = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-gray-100">
          <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Informações Profissionais
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Conte-nos sobre sua experiência e rede de contatos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="profissao" className="dark:text-gray-200">Profissão/Área de Atuação *</Label>
            <Select required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione sua área" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="ti" className="dark:text-gray-100">Tecnologia da Informação</SelectItem>
                <SelectItem value="vendas" className="dark:text-gray-100">Vendas/Comercial</SelectItem>
                <SelectItem value="consultoria" className="dark:text-gray-100">Consultoria</SelectItem>
                <SelectItem value="marketing" className="dark:text-gray-100">Marketing Digital</SelectItem>
                <SelectItem value="empresario" className="dark:text-gray-100">Empresário</SelectItem>
                <SelectItem value="executivo" className="dark:text-gray-100">Executivo</SelectItem>
                <SelectItem value="freelancer" className="dark:text-gray-100">Freelancer</SelectItem>
                <SelectItem value="outros" className="dark:text-gray-100">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experiencia" className="dark:text-gray-200">Experiência em Vendas *</Label>
            <Select required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="iniciante" className="dark:text-gray-100">Iniciante (menos de 1 ano)</SelectItem>
                <SelectItem value="intermediario" className="dark:text-gray-100">Intermediário (1-3 anos)</SelectItem>
                <SelectItem value="experiente" className="dark:text-gray-100">Experiente (3-5 anos)</SelectItem>
                <SelectItem value="expert" className="dark:text-gray-100">Expert (5+ anos)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="network" className="dark:text-gray-200">Tamanho da sua Rede de Contatos Empresariais *</Label>
          <Select required>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Quantas empresas você conhece?" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="pequena" className="dark:text-gray-100">Pequena (1-20 empresas)</SelectItem>
              <SelectItem value="media" className="dark:text-gray-100">Média (21-50 empresas)</SelectItem>
              <SelectItem value="grande" className="dark:text-gray-100">Grande (51-100 empresas)</SelectItem>
              <SelectItem value="muito-grande" className="dark:text-gray-100">Muito Grande (100+ empresas)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sobre" className="dark:text-gray-200">Conte mais sobre você *</Label>
          <Textarea 
            id="sobre" 
            placeholder="Descreva sua experiência, rede de contatos, motivação para ser um Agente Digital..."
            rows={4}
            required 
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="linkedin" className="dark:text-gray-200">LinkedIn (Opcional)</Label>
          <Input 
            id="linkedin" 
            placeholder="https://linkedin.com/in/seuperfil" 
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InformacoesProfissionaisForm;
