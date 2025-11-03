import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

const PerformanceComercialForm = () => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-gray-100">
          <DollarSign className="h-5 w-5 text-green-600" />
          Performance Comercial Enterprise
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Dados sobre sua atuação no mercado enterprise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="faturamento" className="dark:text-gray-200">Faturamento Anual da Empresa *</Label>
            <Select name="faturamento_anual" required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione a faixa" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="ate-1m">Até R$ 1M</SelectItem>
                <SelectItem value="1m-5m">R$ 1M - R$ 5M</SelectItem>
                <SelectItem value="5m-10m">R$ 5M - R$ 10M</SelectItem>
                <SelectItem value="10m-20m">R$ 10M - R$ 20M</SelectItem>
                <SelectItem value="20m+">R$ 20M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="clientes-enterprise" className="dark:text-gray-200">Clientes Enterprise Ativos *</Label>
            <Select name="clientes_enterprise_ativos" required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Empresas R$ 50M+" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="1-5">1-5 clientes enterprise</SelectItem>
                <SelectItem value="6-15">6-15 clientes enterprise</SelectItem>
                <SelectItem value="16-30">16-30 clientes enterprise</SelectItem>
                <SelectItem value="31+">31+ clientes enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="setores" className="dark:text-gray-200">Setores de Atuação Enterprise *</Label>
          <Textarea 
            id="setores" 
            name="setores_atuacao"
            placeholder="Liste os principais setores onde atua (manufatura, serviços financeiros, saúde, varejo, etc.) e cite alguns clientes enterprise de referência..."
            rows={3}
            required
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="experiencia-ia" className="dark:text-gray-200">Experiência com Tecnologias de IA/Automação</Label>
          <Textarea 
            id="experiencia-ia" 
            name="experiencia_ia"
            placeholder="Descreva projetos anteriores com IA, automação, RPA ou tecnologias correlatas em clientes enterprise..."
            rows={3}
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="meta-ia" className="dark:text-gray-200">Meta de Vendas IA (Primeiro Ano) *</Label>
          <Select name="meta_vendas_ia" required>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Qual sua meta?" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="1m-2m">R$ 1M - R$ 2M</SelectItem>
              <SelectItem value="2m-3m">R$ 2M - R$ 3M</SelectItem>
              <SelectItem value="3m-5m">R$ 3M - R$ 5M</SelectItem>
              <SelectItem value="5m+">R$ 5M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceComercialForm;
