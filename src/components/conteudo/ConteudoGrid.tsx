
import React, { useState } from 'react';
import ContentCard from './ContentCard';
import ContentEmptyState from './ContentEmptyState';
import SimpleLoadMoreButton from './SimpleLoadMoreButton';
import LearningProgress from './LearningProgress';
import YouTubeFeed from './YouTubeFeed';
import GoogleSheetsFeed from './GoogleSheetsFeed';
import EbooksGoogleSheetsFeed from './EbooksGoogleSheetsFeed';
import { filterContent } from './utils/filterContent';
import { useCMSContent } from '@/hooks/useCMSContent';
import { ConteudoGridProps, UserProgress } from './types';
import { mockUserProgress } from './contentData';

const ConteudoGrid: React.FC<ConteudoGridProps> = ({ selectedCategory }) => {
  const { content: cmsContent, loading } = useCMSContent();
  const [userProgress, setUserProgress] = useState<UserProgress[]>(mockUserProgress);
  
  console.log('ConteudoGrid rendering', { selectedCategory, contentItemsCount: cmsContent.length });
  
  const handleDownload = (contentId: string) => {
    console.log('Download initiated for content:', contentId);
    
    // Atualizar progresso do usuário
    setUserProgress(prev => {
      const existing = prev.find(p => p.contentId === contentId);
      if (existing) {
        return prev; // Já baixado
      }
      
      return [...prev, {
        userId: 'current-user',
        contentId,
        completed: false,
        downloadedAt: new Date().toISOString()
      }];
    });

    // Simular download
    setTimeout(() => {
      console.log('Download concluído!');
      
      // Marcar como concluído automaticamente para demonstração
      setUserProgress(prev => 
        prev.map(p => 
          p.contentId === contentId 
            ? { ...p, completed: true, completedAt: new Date().toISOString() }
            : p
        )
      );
    }, 2000);
  };

  const handleRating = (contentId: string, rating: number, comment?: string) => {
    console.log('Rating submitted', { contentId, rating, comment });
    
    setUserProgress(prev => 
      prev.map(p => 
        p.contentId === contentId 
          ? { ...p, rating }
          : p
      )
    );
    
    console.log('Obrigado pela sua avaliação!');
  };

  const getUserProgress = (contentId: string) => {
    return userProgress.find(p => p.contentId === contentId);
  };

  // Converter dados do CMS para o formato esperado pelo ContentCard
  const convertCMSToContentItem = (cmsItem: any) => ({
    id: cmsItem.id,
    type: cmsItem.type,
    title: cmsItem.title,
    description: cmsItem.description || '',
    content: cmsItem.content || '',
    category: cmsItem.category,
    tags: cmsItem.tags || [],
    difficulty: cmsItem.difficulty,
    readTime: cmsItem.read_time,
    rating: cmsItem.rating,
    totalRatings: cmsItem.total_ratings,
    downloadCount: cmsItem.download_count,
    previewUrl: cmsItem.preview_url,
    fileSize: cmsItem.file_size,
    lastUpdated: cmsItem.updated_at,
    prerequisites: cmsItem.prerequisites || [],
    learningObjectives: cmsItem.learning_objectives || [],
    // Adicionar propriedades necessárias para ContentCard
    icon: require('lucide-react').FileText, // Ícone padrão
    iconColor: 'text-primary',
    borderColor: 'border-t-primary',
    backgroundFrom: 'from-primary/5',
    backgroundTo: 'to-secondary/5',
    actionText: 'Baixar Conteúdo',
    actionVariant: 'default' as const
  });

  // Filter content based on selected category
  const filteredContent = filterContent(
    cmsContent.map(convertCMSToContentItem), 
    selectedCategory
  );
  
  console.log('Filtered content', { filteredContentCount: filteredContent.length });

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6 bg-white dark:bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-8">
            <p className="text-lg">Carregando conteúdos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6 bg-white dark:bg-gray-800/30">
      <div className="container mx-auto max-w-6xl space-y-8">
        
        {/* Progresso de aprendizado */}
        {userProgress.length > 0 && selectedCategory !== 'videos' && selectedCategory !== 'artigos' && selectedCategory !== 'ebooks' && (
          <LearningProgress 
            userProgress={userProgress}
            contentItems={filteredContent}
          />
        )}

        {/* Renderizar feeds específicos para categorias */}
        {selectedCategory === 'videos' ? (
          <YouTubeFeed />
        ) : selectedCategory === 'artigos' ? (
          <GoogleSheetsFeed />
        ) : selectedCategory === 'ebooks' ? (
          <EbooksGoogleSheetsFeed />
        ) : (
          <>
        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <ContentCard 
              key={item.id} 
              item={item}
              userProgress={getUserProgress(item.id)}
              onDownload={handleDownload}
              onRating={handleRating}
            />
          ))}
        </div>

        {filteredContent.length > 0 && <SimpleLoadMoreButton />}
        
        {filteredContent.length === 0 && <ContentEmptyState />}
          </>
        )}
      </div>
    </section>
  );
};

export default ConteudoGrid;
