
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';
import { ContentItem, UserProgress } from './types';

interface LearningProgressProps {
  userProgress: UserProgress[];
  contentItems: ContentItem[];
}

const LearningProgress: React.FC<LearningProgressProps> = ({ 
  userProgress, 
  contentItems 
}) => {
  const completedCount = userProgress.filter(p => p.completed).length;
  const totalCount = contentItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const getRecommendedNext = () => {
    const completedIds = userProgress.filter(p => p.completed).map(p => p.contentId);
    const incomplete = contentItems.filter(item => !completedIds.includes(item.id));
    
    // Recomendar por dificuldade crescente
    const byDifficulty = incomplete.sort((a, b) => {
      const difficultyOrder = { 'iniciante': 1, 'intermediario': 2, 'avancado': 3 };
      return (difficultyOrder[a.difficulty || 'iniciante'] || 1) - 
             (difficultyOrder[b.difficulty || 'iniciante'] || 1);
    });

    return byDifficulty.slice(0, 3);
  };

  const getCompletionStreak = () => {
    const completed = userProgress
      .filter(p => p.completed && p.completedAt)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
    
    if (completed.length === 0) return 0;

    let streak = 1;
    for (let i = 1; i < completed.length; i++) {
      const current = new Date(completed[i].completedAt!);
      const previous = new Date(completed[i-1].completedAt!);
      const diffDays = Math.floor((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) { // Considerando sequência semanal
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const recommendedNext = getRecommendedNext();
  const streak = getCompletionStreak();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-6 w-6 text-primary" />
        Seu Progresso de Aprendizado
      </h2>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary">{completedCount}</div>
          <div className="text-sm text-gray-600">Materiais Concluídos</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{streak}</div>
          <div className="text-sm text-gray-600">Sequência de Aprendizado</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
          <div className="text-sm text-gray-600">Progresso Total</div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Progresso Geral</h3>
          <span className="text-sm text-gray-600">{completedCount} de {totalCount}</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>

      {/* Materiais recomendados */}
      {recommendedNext.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Recomendados para Você
          </h3>
          <div className="space-y-2">
            {recommendedNext.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{item.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {item.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.readTime} min
                    </span>
                  </div>
                </div>
                <div className="text-xs text-primary font-medium">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materiais concluídos recentemente */}
      {completedCount > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Concluídos Recentemente
          </h3>
          <div className="space-y-2">
            {userProgress
              .filter(p => p.completed)
              .slice(0, 3)
              .map(progress => {
                const item = contentItems.find(i => i.id === progress.contentId);
                if (!item) return null;
                
                return (
                  <div key={progress.contentId} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        Concluído em {new Date(progress.completedAt!).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    {progress.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-yellow-600">★</span>
                        <span className="text-xs text-gray-600">{progress.rating}</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningProgress;
