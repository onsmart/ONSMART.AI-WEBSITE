
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Download, Star, Users, Calendar, Target } from "lucide-react";
import { ContentItem } from './types';

interface ContentPreviewProps {
  item: ContentItem;
  children: React.ReactNode;
  onDownload: () => void;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ item, children, onDownload }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <item.icon className={`h-6 w-6 ${item.iconColor}`} />
            {item.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Cabeçalho com métricas */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{item.rating}</span>
              <span>({item.totalRatings} avaliações)</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{item.downloadCount?.toLocaleString()} downloads</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{item.readTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Publicado em {new Date(item.lastUpdated || '').toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {item.difficulty}
            </Badge>
            <Badge variant="secondary">
              {item.type}
            </Badge>
            <Badge variant="outline">
              {item.fileSize}
            </Badge>
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold mb-2">Sobre este material</h3>
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>

          {/* Pré-requisitos */}
          {item.prerequisites && item.prerequisites.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pré-requisitos
              </h3>
              <ul className="space-y-1">
                {item.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Objetivos de aprendizado */}
          {item.learningObjectives && item.learningObjectives.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                O que você vai aprender
              </h3>
              <ul className="space-y-2">
                {item.learningObjectives.map((objective, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview visual */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <item.icon className={`h-16 w-16 ${item.iconColor} mx-auto mb-4`} />
            <p className="text-gray-600 mb-4">Preview do conteúdo disponível após download</p>
            <div className="bg-white rounded border-2 border-dashed border-gray-300 p-4">
              <p className="text-sm text-gray-500">
                Visualização completa disponível após download
              </p>
            </div>
          </div>

          {/* Ação de download */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={onDownload} 
              className="flex-1"
              variant={item.actionVariant}
            >
              <Download className="h-4 w-4 mr-2" />
              {item.actionText}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPreview;
