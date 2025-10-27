import React, { useState, useEffect } from 'react';
import { X, Gift, Clock, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minuto
  const [isClosing, setIsClosing] = useState(false);
  const { trackCTAClick } = useAnalytics();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsClosing(true);
          setTimeout(() => {
            onClose();
            setIsClosing(false);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTAClick = (action: string) => {
    trackCTAClick(action, 'exit_intent_popup');
    if (action === 'diagnostico') {
      window.location.href = '/diagnostico';
    } else if (action === 'contato') {
      window.location.href = '/contato';
    }
    onClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
          >
            {/* Popup Content */}
            <div
              className={`w-full max-w-lg relative transition-all duration-300 ${
                isClosing ? 'scale-90 opacity-0 translate-y-5' : 'scale-100 opacity-100 translate-y-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-2 border-orange-200 shadow-2xl bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>

                <CardContent className="p-8 relative z-10">
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-20 bg-white/80 rounded-full p-1 hover:bg-white/90"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-block mb-4 animate-pulse">
                      <Gift className="h-14 w-14 text-orange-500 mx-auto drop-shadow-lg" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      🎯 <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Transforme</span> sua empresa em{" "}
                      <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">30 dias</span>
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Junte-se às <span className="font-bold text-brand-blue">350+ empresas</span> que já multiplicaram resultados com <span className="font-bold text-brand-blue">IA</span>
                    </p>
                  </div>

                  {/* Urgency Timer */}
                  <div className={`bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-4 mb-6 text-center shadow-lg ${
                    timeLeft <= 10 ? 'animate-pulse' : ''
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-bold text-lg">
                        Oferta expira em: {formatTime(timeLeft)}
                      </span>
                    </div>
                    {timeLeft <= 10 && (
                      <p className="text-sm mt-1 animate-pulse"> ÚLTIMOS SEGUNDOS!</p>
                    )}
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-600">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">4.9/5 • 250+ empresas transformadas</span>
                  </div>

                  {/* Offer Content */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        🎁 BÔNUS EXCLUSIVO - HOJE APENAS:
                      </h4>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Diagnóstico Gratuito de IA (Valor: R$ 2.500)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Consultoria estratégica de 60min GRÁTIS
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Roadmap personalizado + Análise de ROI
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Implementação prioritária em 30 dias
                        </li>
                      </ul>
                    </div>

                    <div className="text-center bg-white/70 rounded-lg p-4">
                      <p className="text-lg font-semibold text-gray-900">
                        De <span className="line-through text-red-500 text-xl">R$ 2.500</span> por{" "}
                        <span className="text-green-600 text-3xl font-bold bg-yellow-200 px-2 rounded">GRÁTIS</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">🔥 Promoção válida apenas hoje!</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleCTAClick('diagnostico')}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                      size="lg"
                    >
                       QUERO TRANSFORMAR MINHA EMPRESA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    <Button
                      onClick={() => handleCTAClick('contato')}
                      variant="outline"
                      className="w-full border-2 border-orange-500 text-orange-700 hover:bg-orange-50 font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                       Falar com Especialista
                    </Button>
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Setup gratuito
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Sem compromisso
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        ROI garantido
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      🛡️ <strong>Garantia:</strong> 100% gratuito • Resultados em 30 dias ou seu dinheiro de volta
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExitIntentPopup;
