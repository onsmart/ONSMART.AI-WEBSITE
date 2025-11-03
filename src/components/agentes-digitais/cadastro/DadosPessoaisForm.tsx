
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';

const DadosPessoaisForm = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-gray-100">
          <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Dados Pessoais
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Informações básicas para seu cadastro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome" className="dark:text-gray-200">Nome Completo *</Label>
            <Input 
              id="nome" 
              placeholder="Seu nome completo" 
              required 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="cpf" className="dark:text-gray-200">CPF *</Label>
            <Input 
              id="cpf" 
              placeholder="000.000.000-00" 
              required 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="dark:text-gray-200">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com" 
              required 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="telefone" className="dark:text-gray-200">WhatsApp *</Label>
            <Input 
              id="telefone" 
              placeholder="(11) 99999-9999" 
              required 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cidade" className="dark:text-gray-200">Cidade *</Label>
            <Input 
              id="cidade" 
              placeholder="São Paulo" 
              required 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="estado" className="dark:text-gray-200">Estado *</Label>
            <Select required>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="sp" className="dark:text-gray-100">São Paulo</SelectItem>
                <SelectItem value="rj" className="dark:text-gray-100">Rio de Janeiro</SelectItem>
                <SelectItem value="mg" className="dark:text-gray-100">Minas Gerais</SelectItem>
                <SelectItem value="pr" className="dark:text-gray-100">Paraná</SelectItem>
                <SelectItem value="rs" className="dark:text-gray-100">Rio Grande do Sul</SelectItem>
                <SelectItem value="sc" className="dark:text-gray-100">Santa Catarina</SelectItem>
                <SelectItem value="outros" className="dark:text-gray-100">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DadosPessoaisForm;
