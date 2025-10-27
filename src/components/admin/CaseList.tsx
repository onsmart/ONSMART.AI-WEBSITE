
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Star, Eye } from 'lucide-react';
import { CMSCaseStudy } from '@/hooks/useCMSCases';

interface CaseListProps {
  cases: CMSCaseStudy[];
  loading: boolean;
  onEdit: (caseItem: CMSCaseStudy) => void;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const CaseList: React.FC<CaseListProps> = ({ cases, loading, onEdit, onDelete }) => {
  const handleDelete = async (id: string, company: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o case da ${company}?`)) {
      await onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500">
            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum case encontrado</h3>
            <p>Comece criando seu primeiro case de sucesso.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{caseItem.company}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{caseItem.industry}</Badge>
                  <Badge variant="outline">{caseItem.sector}</Badge>
                  {caseItem.is_featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                  <Badge variant={caseItem.is_published ? "default" : "secondary"}>
                    {caseItem.is_published ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(caseItem)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(caseItem.id, caseItem.company)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Deletar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-1">Desafio:</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{caseItem.challenge}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 mb-1">Solução:</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{caseItem.solution}</p>
              </div>
              {caseItem.results && caseItem.results.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-1">Resultados:</h4>
                  <div className="flex flex-wrap gap-1">
                    {caseItem.results.slice(0, 3).map((result, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {result}
                      </Badge>
                    ))}
                    {caseItem.results.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{caseItem.results.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              {(caseItem.timeline || caseItem.roi) && (
                <div className="flex gap-4 text-xs text-gray-500">
                  {caseItem.timeline && <span>Timeline: {caseItem.timeline}</span>}
                  {caseItem.roi && <span>ROI: {caseItem.roi}</span>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CaseList;
