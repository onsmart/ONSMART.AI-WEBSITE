import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TestImageProps {
  src: string;
  alt: string;
  title: string;
}

const TestImage: React.FC<TestImageProps> = ({ src, alt, title }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageLoad = () => {
    setImageStatus('loaded');
    console.log('✅ Imagem carregada:', src);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageStatus('error');
    setErrorMessage('Erro ao carregar imagem');
    console.error('❌ Erro ao carregar imagem:', {
      src,
      title,
      error: e
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center">
            {imageStatus === 'loading' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Carregando...</p>
              </div>
            )}
            {imageStatus === 'loaded' && (
              <img
                src={src}
                alt={alt}
                className="w-full h-48 object-cover rounded"
              />
            )}
            {imageStatus === 'error' && (
              <div className="text-center text-red-500">
                <p className="text-sm">❌ Erro ao carregar</p>
                <p className="text-xs mt-1">{errorMessage}</p>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500 break-all">
            <strong>URL:</strong> {src}
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setImageStatus('loading');
                setErrorMessage('');
              }}
            >
              Recarregar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(src, '_blank')}
            >
              Abrir URL
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestImage;

