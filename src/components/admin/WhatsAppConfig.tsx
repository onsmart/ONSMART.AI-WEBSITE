
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Settings, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const WhatsAppConfig: React.FC = () => {
  const [config, setConfig] = useState({
    access_token: '',
    phone_number_id: '',
    verify_token: '',
    business_account_id: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    loadConfig();
    generateWebhookUrl();
  }, []);

  const generateWebhookUrl = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl) {
      setWebhookUrl(`${supabaseUrl}/functions/v1/whatsapp-webhook`);
    }
  };

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .eq('is_active', true)
        .single();

      if (data && !error) {
        setConfig({
          access_token: data.access_token || '',
          phone_number_id: data.phone_number_id || '',
          verify_token: data.verify_token || '',
          business_account_id: data.business_account_id || ''
        });
        setIsConfigured(true);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const saveConfig = async () => {
    setIsLoading(true);
    
    try {
      // Desativar configurações antigas
      await supabase
        .from('whatsapp_config')
        .update({ is_active: false })
        .eq('is_active', true);

      // Inserir nova configuração
      const { error } = await supabase
        .from('whatsapp_config')
        .insert({
          ...config,
          is_active: true
        });

      if (error) throw error;

      setIsConfigured(true);
      toast.success('Configuração salva com sucesso!', {
        description: 'A API do WhatsApp Business está configurada e ativa.'
      });
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configuração', {
        description: 'Verifique os dados e tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    if (!config.access_token || !config.phone_number_id) {
      toast.error('Configuração incompleta');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${config.phone_number_id}`, {
        headers: {
          'Authorization': `Bearer ${config.access_token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Conexão estabelecida!', {
          description: `Número verificado: ${data.display_phone_number}`
        });
      } else {
        toast.error('Falha na conexão', {
          description: 'Verifique o token de acesso e ID do número'
        });
      }
    } catch (error) {
      toast.error('Erro ao testar conexão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold">Configuração WhatsApp Business API</h1>
        {isConfigured && <Badge variant="default" className="bg-green-500">Configurado</Badge>}
      </div>

      {/* Status da Configuração */}
      <Alert>
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-orange-600" />
          )}
          <AlertDescription>
            {isConfigured 
              ? 'WhatsApp Business API configurado e ativo. Os agentes de IA estão prontos para atender clientes em tempo real.'
              : 'Configure a API do WhatsApp Business para ativar o atendimento automático via agentes de IA.'
            }
          </AlertDescription>
        </div>
      </Alert>

      {/* Configurações da API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Credenciais da API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="access_token">Token de Acesso</Label>
              <Input
                id="access_token"
                type="password"
                placeholder="EAAxxxxxxxxxxxxx"
                value={config.access_token}
                onChange={(e) => setConfig(prev => ({ ...prev, access_token: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number_id">ID do Número de Telefone</Label>
              <Input
                id="phone_number_id"
                placeholder="1234567890123456"
                value={config.phone_number_id}
                onChange={(e) => setConfig(prev => ({ ...prev, phone_number_id: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="verify_token">Token de Verificação</Label>
              <Input
                id="verify_token"
                placeholder="meu_token_secreto_123"
                value={config.verify_token}
                onChange={(e) => setConfig(prev => ({ ...prev, verify_token: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business_account_id">ID da Conta Business</Label>
              <Input
                id="business_account_id"
                placeholder="1234567890123456"
                value={config.business_account_id}
                onChange={(e) => setConfig(prev => ({ ...prev, business_account_id: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={saveConfig} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Salvando...' : 'Salvar Configuração'}
            </Button>
            
            <Button variant="outline" onClick={testConnection} disabled={isLoading}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Testar Conexão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* URL do Webhook */}
      <Card>
        <CardHeader>
          <CardTitle>URL do Webhook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Configure esta URL no Facebook Developers:</Label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(webhookUrl);
                  toast.success('URL copiada!');
                }}
              >
                Copiar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Use o token de verificação configurado acima no campo "Verify Token" do Facebook.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>Instruções de Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Acesse o <strong>Facebook Developers</strong> e crie um app Business</li>
            <li>Adicione o produto <strong>WhatsApp Business API</strong></li>
            <li>Obtenha o <strong>Token de Acesso</strong> e <strong>ID do Número</strong></li>
            <li>Configure o <strong>Webhook</strong> com a URL fornecida acima</li>
            <li>Defina um <strong>Token de Verificação</strong> personalizado</li>
            <li>Salve as configurações e teste a conexão</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppConfig;
