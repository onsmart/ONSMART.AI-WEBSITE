
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ExpectativasForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suas Expectativas</CardTitle>
        <CardDescription>
          Ajude-nos a entender melhor seus objetivos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="meta-mensal">Meta de Indicações por Mês</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Quantas empresas pretende indicar?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 empresas</SelectItem>
              <SelectItem value="3-5">3-5 empresas</SelectItem>
              <SelectItem value="6-10">6-10 empresas</SelectItem>
              <SelectItem value="10+">10+ empresas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="motivacao">Principal Motivação</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="O que te motiva?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="renda-extra">Renda extra</SelectItem>
              <SelectItem value="renda-principal">Tornar fonte de renda principal</SelectItem>
              <SelectItem value="network">Expandir network</SelectItem>
              <SelectItem value="conhecimento">Conhecer sobre IA</SelectItem>
              <SelectItem value="ajudar">Ajudar empresas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpectativasForm;
