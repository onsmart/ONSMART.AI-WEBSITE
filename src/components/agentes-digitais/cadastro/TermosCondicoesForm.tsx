
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const TermosCondicoesForm = () => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="termos" required />
          <div className="space-y-1 leading-none">
            <Label htmlFor="termos" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Aceito os termos e condições do programa de Agentes Digitais *
            </Label>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Declaro que as informações são verdadeiras e aceito as regras do programa.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="marketing" />
          <div className="space-y-1 leading-none">
            <Label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Aceito receber materiais de apoio e novidades por email
            </Label>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Materiais exclusivos, dicas de vendas e atualizações do programa.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TermosCondicoesForm;
