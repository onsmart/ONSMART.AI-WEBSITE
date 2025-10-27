import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';

const ResponsavelForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Dados do Responsável Comercial
        </CardTitle>
        <CardDescription>
          Pessoa responsável pelas vendas enterprise
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input id="nome" name="responsavel_nome" placeholder="Seu nome completo" required />
          </div>
          <div>
            <Label htmlFor="cargo">Cargo/Função *</Label>
            <Input id="cargo" name="responsavel_cargo" placeholder="Diretor Comercial, VP Vendas, etc." required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Corporativo *</Label>
            <Input id="email" name="responsavel_email" type="email" placeholder="seu@empresa.com" required />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone Corporativo *</Label>
            <Input id="telefone" name="responsavel_telefone" placeholder="(11) 99999-9999" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn Profissional</Label>
            <Input id="linkedin" name="responsavel_linkedin" placeholder="https://linkedin.com/in/seuperfil" />
          </div>
          <div>
            <Label htmlFor="experiencia-vendas">Anos de Experiência B2B *</Label>
            <Select name="responsavel_experiencia_b2b" required>
              <SelectTrigger>
                <SelectValue placeholder="Experiência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-5">2-5 anos</SelectItem>
                <SelectItem value="6-10">6-10 anos</SelectItem>
                <SelectItem value="11-15">11-15 anos</SelectItem>
                <SelectItem value="15+">15+ anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsavelForm;
