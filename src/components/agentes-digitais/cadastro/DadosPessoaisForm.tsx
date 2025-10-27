
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

const DadosPessoaisForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-purple-600" />
          Dados Pessoais
        </CardTitle>
        <CardDescription>
          Informações básicas para seu cadastro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input id="nome" placeholder="Seu nome completo" required />
          </div>
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input id="cpf" placeholder="000.000.000-00" required />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div>
            <Label htmlFor="telefone">WhatsApp *</Label>
            <Input id="telefone" placeholder="(11) 99999-9999" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cidade">Cidade *</Label>
            <Input id="cidade" placeholder="São Paulo" required />
          </div>
          <div>
            <Label htmlFor="estado">Estado *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="mg">Minas Gerais</SelectItem>
                <SelectItem value="pr">Paraná</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                <SelectItem value="sc">Santa Catarina</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DadosPessoaisForm;
