
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

const DadosPagamentoForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Dados para Pagamento
        </CardTitle>
        <CardDescription>
          Informações para recebimento das comissões
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tipo-conta">Tipo de Conta *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Como prefere receber?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pessoa-fisica">Pessoa Física (CPF)</SelectItem>
              <SelectItem value="pessoa-juridica">Pessoa Jurídica (CNPJ)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="banco">Banco Preferencial</Label>
            <Input id="banco" placeholder="Ex: Nubank, Bradesco, etc." />
          </div>
          <div>
            <Label htmlFor="pix">Chave PIX</Label>
            <Input id="pix" placeholder="CPF, email ou telefone" />
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
