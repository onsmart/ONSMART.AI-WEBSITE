
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface QuizOption {
  value: string;
  label: string;
  multiplier: number;
}

interface QuizQuestionData {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  currentStep: number;
  totalSteps: number;
  onAnswer: (questionId: string, value: string, multiplier: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentStep,
  totalSteps,
  onAnswer
}) => {
  return (
    <Card className="max-w-2xl mx-auto border-2 border-brand-blue/20 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            Pergunta {currentStep + 1} de {totalSteps}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% completo
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="opacity-0 animate-fade-in">
          <h3 className="text-xl font-semibold mb-6 text-center">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option.value}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-brand-blue hover:bg-brand-blue/5 transition-all hover-scale opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onAnswer(question.id, option.value, option.multiplier)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
