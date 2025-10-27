import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const ComprometimentoForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comprometimento Enterprise</CardTitle>
        <CardDescription>
          Confirmação de dedicação ao programa de revendas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="dedicacao" name="compromisso_dedicacao" required />
          <div className="space-y-1 leading-none">
            <Label htmlFor="dedicacao" className="text-sm font-medium">
              Comprometimento com vendas enterprise *
            </Label>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Confirmo dedicação mínima de 20h/mês para vendas IA enterprise e meta anual de R$ 1M+
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="treinamento" name="compromisso_treinamento" required />
          <div className="space-y-1 leading-none">
            <Label htmlFor="treinamento" className="text-sm font-medium">
              Participação em treinamentos *
            </Label>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Comprometimento com certificação LÍDER (40h) e workshops mensais
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="termos" name="compromisso_termos" required />
          <div className="space-y-1 leading-none">
            <Label htmlFor="termos" className="text-sm font-medium">
              Termos do programa de revendas *
            </Label>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Aceito os termos e declaro que as informações são verdadeiras
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComprometimentoForm;
