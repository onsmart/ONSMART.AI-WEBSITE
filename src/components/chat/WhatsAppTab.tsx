import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { evolutionApiService, type InstanceStatus } from '@/services/evolutionApiService';
import { useTranslation } from 'react-i18next';

interface WhatsAppTabProps {
  onBackToText: () => void;
  className?: string;
}

const WhatsAppTab: React.FC<WhatsAppTabProps> = ({ onBackToText, className = '' }) => {
  const { t } = useTranslation('chat');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'qrcode' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [instanceName, setInstanceName] = useState<string>('sonia');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  // Número padrão da Sonia (usado quando não há número conectado)
  const defaultPhoneNumber = import.meta.env.VITE_SONIA_PHONE || '551150931836';

  // Inicializar serviço
  useEffect(() => {
    const initService = async () => {
      // O serviço usa a API route do Vercel (/api/evolution-api) que já tem acesso
      // às variáveis de ambiente do backend (EVOLUTION_API_URL, EVOLUTION_API_KEY)
      // Não precisamos expor a API key no frontend por segurança!
      const instance = import.meta.env.VITE_EVOLUTION_INSTANCE_NAME || 'sonia';
      
      setInstanceName(instance);
      // O serviço não precisa de configuração, ele usa a API route automaticamente
      await checkStatus();
    };

    initService();
  }, []);

  const checkStatus = async () => {
    try {
      setStatus('loading');
      const instanceStatus = await evolutionApiService.getInstanceStatus(instanceName);

      if (!instanceStatus) {
        // Instância não existe, criar
        await createInstance();
        return;
      }

      const currentStatus = instanceStatus.instance?.status;

      if (currentStatus === 'open') {
        setStatus('connected');
        // Tentar obter número do WhatsApp da resposta
        // Se não estiver disponível, usar o número padrão
        const phone = instanceStatus.instance?.phone || defaultPhoneNumber;
        setWhatsappNumber(phone);
      } else if (currentStatus === 'qrcode' || currentStatus === 'connecting') {
        // Quando está "connecting" ou "qrcode", tentar buscar o QR Code
        await fetchQRCode();
      } else if (currentStatus === 'close') {
        // Instância existe mas está fechada, tentar conectar
        await connectInstance();
      } else {
        // Status desconhecido ou instância não existe, tentar criar
        await createInstance();
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setStatus('error');
      setErrorMessage('Erro ao verificar status da instância');
    }
  };

  const connectInstance = async () => {
    try {
      setStatus('loading');
      // Tentar conectar a instância existente
      const qrResponse = await evolutionApiService.getQRCode(instanceName);

      if (qrResponse?.qrcode?.base64 || qrResponse?.base64) {
        // Verificar diferentes formatos de resposta
        if (qrResponse?.qrcode?.base64) {
          const base64Data = qrResponse.qrcode.base64.replace('data:image/png;base64,', '');
          setQrCode(base64Data);
          setStatus('qrcode');
        } else if (qrResponse?.base64) {
          const base64Data = qrResponse.base64.replace('data:image/png;base64,', '');
          setQrCode(base64Data);
          setStatus('qrcode');
        }
      } else {
        // Se não conseguir QR code, tentar criar nova instância
        await createInstance();
      }
    } catch (error) {
      console.error('Erro ao conectar instância:', error);
      // Se falhar ao conectar, tentar criar nova
      await createInstance();
    }
  };

  const createInstance = async () => {
    try {
      setStatus('loading');
      const created = await evolutionApiService.createInstance(instanceName, true);

      if (created) {
        // Aguardar um pouco e buscar QR code
        setTimeout(fetchQRCode, 1000);
      } else {
        // Se falhou ao criar, pode ser que a instância já existe
        // Tentar conectar ao invés de mostrar erro
        console.log('Falha ao criar instância, tentando conectar instância existente...');
        await connectInstance();
      }
    } catch (error: any) {
      console.error('Erro ao criar instância:', error);
      // Se o erro for que a instância já existe, tentar conectar
      if (error?.message?.includes('já existe') || error?.message?.includes('already exists') || error?.message?.includes('already in use')) {
        console.log('Instância já existe, tentando conectar...');
        await connectInstance();
      } else {
        setStatus('error');
        setErrorMessage('Erro ao criar instância do WhatsApp');
      }
    }
  };

  const fetchQRCode = async () => {
    try {
      setStatus('loading');
      const qrResponse = await evolutionApiService.getQRCode(instanceName);

      // Verificar diferentes formatos de resposta
      if (qrResponse?.qrcode?.base64) {
        // Formato: { qrcode: { base64: "data:image/png;base64,..." } }
        const base64Data = qrResponse.qrcode.base64.replace('data:image/png;base64,', '');
        setQrCode(base64Data);
        setStatus('qrcode');
      } else if (qrResponse?.base64) {
        // Formato: { base64: "data:image/png;base64,..." }
        const base64Data = qrResponse.base64.replace('data:image/png;base64,', '');
        setQrCode(base64Data);
        setStatus('qrcode');
      } else if (qrResponse?.qrcode?.code) {
        // Se tiver apenas o code mas não o base64, aguardar um pouco e tentar novamente
        console.log('QR Code ainda não disponível, aguardando...');
        setTimeout(() => {
          fetchQRCode();
        }, 3000);
      } else {
        // Se não tiver QR Code ainda, aguardar e tentar novamente (pode estar gerando)
        console.log('QR Code não disponível ainda, aguardando...');
        setTimeout(() => {
          checkStatus();
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao obter QR Code:', error);
      // Se der erro, aguardar um pouco e tentar verificar status novamente
      setTimeout(() => {
        checkStatus();
      }, 3000);
    }
  };

  const handleRefresh = () => {
    checkStatus();
  };

  const handleOpenWhatsApp = () => {
    // Usar número conectado ou número padrão
    const phoneToUse = whatsappNumber || defaultPhoneNumber;
    const url = `https://wa.me/${phoneToUse.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-emerald-600" />
          <h3 className="font-semibold text-sm">WhatsApp</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToText}
          className="text-xs"
        >
          Voltar
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 overflow-y-auto">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            <p className="text-sm text-gray-600">Carregando...</p>
          </div>
        )}

        {status === 'qrcode' && qrCode && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code WhatsApp"
                className="w-48 h-48 mx-auto"
                onError={(e) => {
                  console.error('Erro ao carregar QR Code');
                  setStatus('error');
                  setErrorMessage('Erro ao exibir QR Code. Tente atualizar.');
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Escaneie o QR Code
              </p>
              <p className="text-xs text-gray-600">
                Abra o WhatsApp no seu celular e escaneie este código
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar QR Code
            </Button>
            <Button
              onClick={handleOpenWhatsApp}
              variant="default"
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Abrir WhatsApp ({defaultPhoneNumber})
            </Button>
          </div>
        )}

        {status === 'connected' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">
                WhatsApp Conectado!
              </p>
              <p className="text-xs text-gray-600 mb-2">
                {whatsappNumber || defaultPhoneNumber}
              </p>
              <p className="text-xs text-gray-600">
                Agora você pode conversar com a Sonia pelo WhatsApp
              </p>
            </div>
            <Button
              onClick={handleOpenWhatsApp}
              variant="default"
              size="sm"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Abrir Conversa
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Erro ao conectar
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {errorMessage || 'Ocorreu um erro ao conectar com o WhatsApp'}
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppTab;

