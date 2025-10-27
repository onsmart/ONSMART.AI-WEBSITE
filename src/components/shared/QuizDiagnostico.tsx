
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { useQuizDiagnostico } from '@/hooks/useQuizDiagnostico';
import QuizResults from './quiz/QuizResults';
import QuizQuestion from './quiz/QuizQuestion';

const QuizDiagnostico: React.FC = () => {
  const {
    currentStep,
    questions,
    showResults,
    handleAnswer,
    getResultsData
  } = useQuizDiagnostico();

  if (showResults) {
    return <QuizResults results={getResultsData()} />;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4"> Descubra Seu Potencial de IA em 60 Segundos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Responda 4 perguntas rápidas e veja quanto sua empresa pode economizar e crescer com Agentes de IA
          </p>
        </div>

        <QuizQuestion
          question={questions[currentStep]}
          currentStep={currentStep}
          totalSteps={questions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </section>
  );
};

export default QuizDiagnostico;
