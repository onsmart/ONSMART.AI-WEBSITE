
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ExpectativasForm = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-gray-100">Suas Expectativas</CardTitle>
        <CardDescription className="dark:text-gray-300">
          Ajude-nos a entender melhor seus objetivos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="meta-mensal" className="dark:text-gray-200">Meta de Indicações por Mês</Label>
          <Select>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Quantas empresas pretende indicar?" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="1-2" className="dark:text-gray-100">1-2 empresas</SelectItem>
              <SelectItem value="3-5" className="dark:text-gray-100">3-5 empresas</SelectItem>
              <SelectItem value="6-10" className="dark:text-gray-100">6-10 empresas</SelectItem>
              <SelectItem value="10+" className="dark:text-gray-100">10+ empresas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="motivacao" className="dark:text-gray-200">Principal Motivação</Label>
          <Select>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="O que te motiva?" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="renda-extra" className="dark:text-gray-100">Renda extra</SelectItem>
              <SelectItem value="renda-principal" className="dark:text-gray-100">Tornar fonte de renda principal</SelectItem>
              <SelectItem value="network" className="dark:text-gray-100">Expandir network</SelectItem>
              <SelectItem value="conhecimento" className="dark:text-gray-100">Conhecer sobre IA</SelectItem>
              <SelectItem value="ajudar" className="dark:text-gray-100">Ajudar empresas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpectativasForm;
