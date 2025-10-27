
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';

const ServiceROICalculator = () => {
  const [formData, setFormData] = useState({
    service: '',
    employees: '',
    currentCost: '',
    timeSpent: '',
    errorRate: ''
  });
  
  const [results, setResults] = useState(null);

  const services = [
    { value: 'aceleracao', label: 'Aceleração de Adoção de IA', multiplier: 3.2 },
    { value: 'implementacao', label: 'Implementação Técnica', multiplier: 4.1 },
    { value: 'analise', label: 'Análise de Dados', multiplier: 2.8 },
    { value: 'treinamento', label: 'Treinamento em IA', multiplier: 2.5 },
    { value: 'gestao', label: 'Gestão de Mudança', multiplier: 3.0 },
    { value: 'consultoria', label: 'Consultoria Estratégica', multiplier: 3.5 }
  ];

  const calculateROI = () => {
    const selectedService = services.find(s => s.value === formData.service);
    if (!selectedService) return;

    const employees = parseInt(formData.employees) || 0;
    const currentCost = parseFloat(formData.currentCost) || 0;
    const timeSpent = parseFloat(formData.timeSpent) || 0;
    const errorRate = parseFloat(formData.errorRate) || 0;

    // Cálculos baseados em métricas reais
    const monthlySavings = (employees * 2000 * (timeSpent / 100)) + (currentCost * (errorRate / 100));
    const annualSavings = monthlySavings * 12;
    const investment = employees * 1500; // Custo médio por funcionário
    const roi = ((annualSavings - investment) / investment) * 100;
    const paybackMonths = investment / monthlySavings;
    const productivityGain = selectedService.multiplier * 10; // Percentual de ganho

    setResults({
      monthlySavings,
      annualSavings,
      investment,
      roi,
      paybackMonths,
      productivityGain
    });
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Calculadora de ROI por Serviço</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Descubra o retorno estimado do investimento para seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Sua Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="service">Serviço de Interesse</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employees">Número de Funcionários</Label>
                <Input
                  id="employees"
                  type="number"
                  placeholder="Ex: 50"
                  value={formData.employees}
                  onChange={(e) => setFormData(prev => ({ ...prev, employees: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="currentCost">Custo Mensal Atual (R$)</Label>
                <Input
                  id="currentCost"
                  type="number"
                  placeholder="Ex: 25000"
                  value={formData.currentCost}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentCost: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="timeSpent">% Tempo em Tarefas Repetitivas</Label>
                <Input
                  id="timeSpent"
                  type="number"
                  placeholder="Ex: 30"
                  value={formData.timeSpent}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="errorRate">% Taxa de Erro Manual</Label>
                <Input
                  id="errorRate"
                  type="number"
                  placeholder="Ex: 5"
                  value={formData.errorRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, errorRate: e.target.value }))}
                />
              </div>

              <Button onClick={calculateROI} className="w-full" disabled={!formData.service}>
                Calcular ROI
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resultados Projetados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {results.roi.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">ROI Anual</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {results.paybackMonths.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Meses Payback</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Economia Mensal:</span>
                    <span className="font-bold">R$ {results.monthlySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Economia Anual:</span>
                    <span className="font-bold">R$ {results.annualSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investimento:</span>
                    <span className="font-bold">R$ {results.investment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ganho de Produtividade:</span>
                    <span className="font-bold text-green-600">+{results.productivityGain.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    * Cálculos baseados em métricas de projetos similares implementados pela onsmartAI
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceROICalculator;
