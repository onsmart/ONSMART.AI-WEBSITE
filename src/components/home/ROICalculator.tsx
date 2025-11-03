import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const { t, i18n } = useTranslation('home');
  const [employees, setEmployees] = useState(100);
  const [averageSalary, setAverageSalary] = useState(8000);
  const [automationRate, setAutomationRate] = useState(30);
  const [manualHours, setManualHours] = useState(4);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    savings: 0,
    roi: 0,
    payback: 0,
    productivity: 0
  });

  // Animação dos valores
  const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = start + (end - start) * progress;
      callback(Math.round(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResults(false);
    
    setTimeout(() => {
      // Cálculos do ROI
      const annualSalaryCost = employees * averageSalary * 12;
      const hoursAutomated = manualHours * (automationRate / 100);
      const dailySavings = employees * hoursAutomated * (averageSalary / 22 / 8); // 22 dias úteis, 8h/dia
      const monthlySavings = dailySavings * 22;
      const annualSavings = monthlySavings * 12;
      
      // Investimento estimado (baseado no número de funcionários)
      const estimatedInvestment = employees * 800; // R$ 800 por funcionário
      
      const roi = ((annualSavings - estimatedInvestment) / estimatedInvestment) * 100;
      const paybackMonths = estimatedInvestment / monthlySavings;
      const productivityIncrease = automationRate * 1.4; // Fator de produtividade

      const finalValues = {
        savings: Math.round(annualSavings),
        roi: Math.round(roi),
        payback: paybackMonths,
        productivity: Math.round(productivityIncrease)
      };

      // Animar os valores
      animateValue(0, finalValues.savings, 1500, (value) => {
        setAnimatedValues(prev => ({ ...prev, savings: value }));
      });
      
      setTimeout(() => {
        animateValue(0, finalValues.roi, 1000, (value) => {
          setAnimatedValues(prev => ({ ...prev, roi: value }));
        });
      }, 200);
      
      setTimeout(() => {
        animateValue(0, finalValues.payback, 1000, (value) => {
          setAnimatedValues(prev => ({ ...prev, payback: value }));
        });
      }, 400);
      
      setTimeout(() => {
        animateValue(0, finalValues.productivity, 1000, (value) => {
          setAnimatedValues(prev => ({ ...prev, productivity: value }));
        });
      }, 600);

      setShowResults(true);
      setIsCalculating(false);
    }, 1500);
  };

  const monthlySavings = animatedValues.savings / 12;

  const formatCurrency = (value: number): string => {
    const localeMap: Record<string, string> = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'es': 'es-ES'
    };
    const locale = localeMap[i18n.language.split('-')[0]] || 'pt-BR';
    const currencyMap: Record<string, string> = {
      'pt': 'BRL',
      'en': 'USD',
      'es': 'EUR'
    };
    const currency = currencyMap[i18n.language.split('-')[0]] || 'BRL';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            {t('roi.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">ROI</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            {t('roi.subtitle')}
          </p>
        </div>
        
        {/* Calculadora Minimalista */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            {/* Estado: Calculando */}
            {isCalculating && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-4"></div>
                <p className="text-brand-blue font-medium">{t('roi.calculating')}</p>
              </div>
            )}

            {/* Estado: Resultados */}
            {!isCalculating && showResults && (
              <div className="p-6">
                {/* Resultado Principal */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{t('roi.results.monthlySavings')}</p>
                  <p className="text-3xl font-bold text-brand-blue mb-4">
                    {formatCurrency(monthlySavings)}
                  </p>
                </div>

                {/* Métricas Simples */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{t('roi.results.annualROI')}</p>
                    <p className="text-lg font-bold text-brand-blue">{animatedValues.roi}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{t('roi.results.payback')}</p>
                    <p className="text-lg font-bold text-brand-blue">{animatedValues.payback.toFixed(1)}{t('roi.results.paybackUnit')}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{t('roi.results.annualSavings')}</p>
                    <p className="text-sm font-bold text-brand-blue">{formatCurrency(animatedValues.savings)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{t('roi.results.productivity')}</p>
                    <p className="text-lg font-bold text-brand-blue">+{animatedValues.productivity}%</p>
                  </div>
                </div>

                {/* Botões */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => window.location.href = '/contato'} 
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white py-3 rounded-lg"
                  >
                    {t('roi.results.cta.consultancy')}
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/diagnostico'} 
                    variant="outline" 
                    className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white py-3 rounded-lg"
                  >
                    {t('roi.results.cta.diagnostic')}
                  </Button>
                </div>

                {/* Botão Recalcular */}
                <div className="text-center mt-4">
                  <Button 
                    onClick={() => {
                      setShowResults(false);
                      setAnimatedValues({ savings: 0, roi: 0, payback: 0, productivity: 0 });
                    }}
                    variant="ghost" 
                    className="text-sm text-brand-blue hover:text-blue-600"
                  >
                    {t('roi.results.recalculate')}
                  </Button>
                </div>
              </div>
            )}

            {/* Estado: Configuração */}
            {!isCalculating && !showResults && (
              <div className="p-6">
                {/* Campos */}
                <div className="space-y-4 mb-6">
                  {/* Funcionários */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('roi.fields.employees')}</Label>
                    <div className="text-center">
                      <div className="text-xl font-bold text-brand-blue mb-1">{employees}</div>
                      <Slider
                        min={10} max={1000} step={10}
                        value={[employees]}
                        onValueChange={(value) => setEmployees(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Salário */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('roi.fields.averageSalary')}</Label>
                    <div className="text-center">
                      <div className="text-xl font-bold text-brand-blue mb-1">{formatCurrency(averageSalary)}</div>
                      <Slider
                        min={2000} max={25000} step={500}
                        value={[averageSalary]}
                        onValueChange={(value) => setAverageSalary(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Automação */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('roi.fields.automationRate')}</Label>
                    <div className="text-center">
                      <div className="text-xl font-bold text-brand-blue mb-1">{automationRate}%</div>
                      <Slider
                        min={15} max={70} step={5}
                        value={[automationRate]}
                        onValueChange={(value) => setAutomationRate(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Horas */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('roi.fields.manualHours')}</Label>
                    <div className="text-center">
                      <div className="text-xl font-bold text-brand-blue mb-1">{manualHours}{t('roi.fields.hoursUnit')}</div>
                      <Slider
                        min={1} max={8} step={0.5}
                        value={[manualHours]}
                        onValueChange={(value) => setManualHours(value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Botão Calcular */}
                <div className="text-center">
                  <Button 
                    onClick={handleCalculate} 
                    disabled={isCalculating}
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
                  >
                    {t('roi.calculateButton')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;