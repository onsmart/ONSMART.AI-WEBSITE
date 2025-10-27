
import { useState } from 'react';

interface QuizOption {
  value: string;
  label: string;
  multiplier: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const useQuizDiagnostico = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 'employees',
      question: 'Quantos funcionários sua empresa tem?',
      options: [
        { value: '10-50', label: '10-50 funcionários', multiplier: 1 },
        { value: '51-200', label: '51-200 funcionários', multiplier: 2 },
        { value: '201-500', label: '201-500 funcionários', multiplier: 3 },
        { value: '500+', label: 'Mais de 500 funcionários', multiplier: 4 }
      ]
    },
    {
      id: 'processes',
      question: 'Quantos processos repetitivos existem na sua empresa?',
      options: [
        { value: 'few', label: 'Poucos (1-5)', multiplier: 1 },
        { value: 'some', label: 'Alguns (6-15)', multiplier: 2 },
        { value: 'many', label: 'Muitos (16-30)', multiplier: 3 },
        { value: 'tons', label: 'Centenas', multiplier: 4 }
      ]
    },
    {
      id: 'manual_work',
      question: 'Quanto tempo sua equipe gasta em tarefas manuais por dia?',
      options: [
        { value: '1-2h', label: '1-2 horas', multiplier: 1 },
        { value: '3-4h', label: '3-4 horas', multiplier: 2 },
        { value: '5-6h', label: '5-6 horas', multiplier: 3 },
        { value: '7h+', label: 'Mais de 7 horas', multiplier: 4 }
      ]
    },
    {
      id: 'urgency',
      question: 'Qual a urgência para aumentar produtividade?',
      options: [
        { value: 'planning', label: 'Planejando para o futuro', multiplier: 1 },
        { value: 'interested', label: 'Interessado em melhorias', multiplier: 2 },
        { value: 'urgent', label: 'Precisamos urgentemente', multiplier: 3 },
        { value: 'critical', label: 'Situação crítica', multiplier: 4 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string, multiplier: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getResultsData = () => {
    const totalMultiplier = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      return sum + (option?.multiplier || 1);
    }, 0);

    return {
      roi: `${totalMultiplier * 100}%`,
      monthlySavings: (totalMultiplier * 25000).toLocaleString('pt-BR'),
      timeReduction: `${Math.min(totalMultiplier * 20, 80)}%`,
      paybackMonths: Math.max(1, Math.ceil(6 - totalMultiplier))
    };
  };

  return {
    currentStep,
    questions,
    answers,
    showResults,
    handleAnswer,
    getResultsData
  };
};
