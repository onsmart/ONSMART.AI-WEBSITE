
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

interface ContentRatingProps {
  contentId: string;
  currentRating?: number;
  onRatingSubmit: (rating: number, comment?: string) => void;
}

const ContentRating: React.FC<ContentRatingProps> = ({ 
  contentId, 
  currentRating, 
  onRatingSubmit 
}) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Por favor, selecione uma avaliação');
      return;
    }

    setIsSubmitting(true);
    try {
      await onRatingSubmit(rating, comment);
      toast.success('Avaliação enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar avaliação');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium">Avalie este material</h3>
      
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-colors"
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-gray-600">
            {rating === 1 && 'Péssimo'}
            {rating === 2 && 'Ruim'}
            {rating === 3 && 'Regular'}
            {rating === 4 && 'Bom'}
            {rating === 5 && 'Excelente'}
          </span>
        )}
      </div>

      <Textarea
        placeholder="Compartilhe sua experiência com este material (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />

      <Button 
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        size="sm"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
      </Button>
    </div>
  );
};

export default ContentRating;
