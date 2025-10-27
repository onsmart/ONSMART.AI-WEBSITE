
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Eye, Users, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { ContentItem, UserProgress } from './types';
import ContentPreview from './ContentPreview';
import ContentRating from './ContentRating';

interface ContentCardProps {
  item: ContentItem;
  userProgress?: UserProgress;
  onDownload?: (contentId: string) => void;
  onRating?: (contentId: string, rating: number, comment?: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  userProgress,
  onDownload,
  onRating 
}) => {
  const [showRating, setShowRating] = useState(false);
  const IconComponent = item.icon;
  
  const handleDownload = () => {
    console.log('ContentCard: Download clicked for', item.id);
    
    onDownload?.(item.id);
    toast.success(`Download iniciado: ${item.title}`);
    
    // Mostrar avaliação após download se não avaliado
    if (!userProgress?.rating) {
      setTimeout(() => setShowRating(true), 2000);
    }
  };

  const handlePreview = () => {
    console.log('ContentCard: Preview clicked for', item.id);
  };

  const handleRatingSubmit = (rating: number, comment?: string) => {
    console.log('ContentCard: Rating submitted', { rating, comment });
    onRating?.(item.id, rating, comment);
    setShowRating(false);
  };

  const isCompleted = userProgress?.completed;
  const hasRated = userProgress?.rating;

  return (
    <Card className={`hover-scale glass-card overflow-hidden border-t-4 ${item.borderColor} relative group hover:shadow-lg transition-all duration-300 ${isCompleted ? 'bg-green-50/50' : ''}`}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      
      {/* Badge de status */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
      )}

      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <span className={`inline-block px-2 py-1 ${item.iconColor}/20 ${item.iconColor} text-xs font-medium rounded`}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          <Badge variant="outline" className="text-xs capitalize">
            {item.difficulty}
          </Badge>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors text-base leading-tight">
          {item.title}
        </CardTitle>
        <CardDescription className="text-sm">{item.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`bg-gradient-to-br ${item.backgroundFrom} ${item.backgroundTo} rounded-md h-32 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
          <IconComponent className={`h-12 w-12 ${item.iconColor} absolute z-10`} />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 animate-pulse"></div>
        </div>

        {/* Métricas do conteúdo */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>{item.rating || 5}</span>
            <span>({item.totalRatings || 0})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{item.downloadCount?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{item.readTime || 5} min</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {item.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="space-y-3">
        <div className="flex gap-2 w-full">
          <ContentPreview item={item} onDownload={handleDownload}>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </ContentPreview>
          
          <Button 
            variant={item.actionVariant} 
            size="sm"
            className={`flex-1 ${item.actionVariant === "default" ? "bg-primary hover:bg-primary/90" : ""}`}
            onClick={handleDownload}
          >
            {item.actionVariant === "default" && <Download className="h-4 w-4 mr-1" />}
            {isCompleted ? 'Baixar Novamente' : item.actionText}
          </Button>
        </div>

        {/* Sistema de avaliação */}
        {showRating && (
          <ContentRating
            contentId={item.id}
            currentRating={userProgress?.rating}
            onRatingSubmit={handleRatingSubmit}
          />
        )}

        {hasRated && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Sua avaliação:</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < (userProgress?.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
