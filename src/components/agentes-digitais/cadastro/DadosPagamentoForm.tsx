
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

const DadosPagamentoForm = () => {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-gray-100">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          Dados para Pagamento
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Informações para recebimento das comissões
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tipo-conta" className="dark:text-gray-200">Tipo de Conta *</Label>
          <Select required>
            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Como prefere receber?" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="pessoa-fisica" className="dark:text-gray-100">Pessoa Física (CPF)</SelectItem>
              <SelectItem value="pessoa-juridica" className="dark:text-gray-100">Pessoa Jurídica (CNPJ)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="banco" className="dark:text-gray-200">Banco Preferencial</Label>
            <Input 
              id="banco" 
              placeholder="Ex: Nubank, Bradesco, etc." 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="pix" className="dark:text-gray-200">Chave PIX</Label>
            <Input 
              id="pix" 
              placeholder="CPF, email ou telefone" 
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Nota:</strong> Os dados bancários completos serão solicitados apenas quando você realizar sua primeira indicação.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DadosPagamentoForm;
