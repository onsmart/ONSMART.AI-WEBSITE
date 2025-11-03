import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building } from 'lucide-react';

const EmpresaInfoForm = () => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-gray-100">
          <Building className="h-5 w-5 text-blue-600" />
          Informações da Empresa
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Dados sobre sua empresa e experiência no mercado enterprise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="empresa" className="dark:text-gray-200">Nome da Empresa *</Label>
            <Input id="empresa" name="empresa" placeholder="Sua Empresa Ltda." required className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label htmlFor="cnpj" className="dark:text-gray-200">CNPJ *</Label>
            <Input id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" required className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fundacao" className="dark:text-gray-200">Ano de Fundação *</Label>
            <Select name="ano_fundacao" required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="funcionarios" className="dark:text-gray-200">Número de Funcionários *</Label>
            <Select name="numero_funcionarios" required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione a faixa" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="5-15">5-15 funcionários</SelectItem>
                <SelectItem value="16-50">16-50 funcionários</SelectItem>
                <SelectItem value="51-200">51-200 funcionários</SelectItem>
                <SelectItem value="201+">201+ funcionários</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="segmento" className="dark:text-gray-200">Segmento Principal de Atuação *</Label>
          <Select name="segmento_principal" required>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="integrador">Integrador/VAR de TI</SelectItem>
              <SelectItem value="consultoria">Consultoria Empresarial</SelectItem>
              <SelectItem value="distribuidor">Distribuidor Enterprise</SelectItem>
              <SelectItem value="software">Fornecedor de Software</SelectItem>
              <SelectItem value="sistemas">Implementador de Sistemas</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="descricao" className="dark:text-gray-200">Experiência com Clientes Enterprise *</Label>
          <Textarea 
            id="descricao" 
            name="experiencia_enterprise"
            placeholder="Descreva sua experiência com empresas de médio-grande porte (R$ 50M+), principais clientes e setores de atuação..."
            rows={4}
            required 
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmpresaInfoForm;
