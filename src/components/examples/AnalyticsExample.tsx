import React, { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsExample = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    trackEvent,
    trackButtonClick,
    trackForm,
    trackUserActivity,
    trackPerformance,
    trackJarvisInteraction,
    trackEngagement
  } = useAnalytics();

  const handleButtonClick = (buttonText: string) => {
    // Rastrear clique no botão
    trackButtonClick(buttonText, 'analytics_example_page');
    
    // Rastrear atividade do usuário
    trackUserActivity('button_interaction', { button: buttonText });
    
    console.log(`Botão "${buttonText}" clicado`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const startTime = Date.now();
    
    try {
      // Simular envio de formulário
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rastrear sucesso do formulário
      trackForm('contact_form', true);
      
      // Rastrear performance
      const responseTime = Date.now() - startTime;
      trackPerformance('form_submission_time', responseTime);
      
      // Rastrear engajamento
      trackEngagement('form_completion', responseTime);
      
      console.log('Formulário enviado com sucesso');
      setFormData({ name: '', email: '' });
      
    } catch (error) {
      // Rastrear erro do formulário
      trackForm('contact_form', false);
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJarvisCommand = (command: string) => {
    const startTime = Date.now();
    
    // Simular processamento do comando
    setTimeout(() => {
      const responseTime = Date.now() - startTime;
      
      // Rastrear interação com Jarvis
      trackJarvisInteraction('command_executed', {
        command,
        responseTime
      });
      
      console.log(`Comando Jarvis executado: ${command}`);
    }, 500);
  };

  const handleCustomEvent = () => {
    // Rastrear evento customizado
    trackEvent({
      category: 'custom_interaction',
      action: 'example_event',
      label: 'analytics_demo',
      value: 1
    });
    
    console.log('Evento customizado rastreado');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📊 Exemplo de Analytics - GA4 + React</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Este componente demonstra como implementar analytics de forma consistente usando react-ga4.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção de Botões */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 Rastreamento de Botões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleButtonClick('CTA Principal')}
              className="w-full"
            >
              CTA Principal
            </Button>
            <Button 
              onClick={() => handleButtonClick('Botão Secundário')}
              variant="outline"
              className="w-full"
            >
              Botão Secundário
            </Button>
            <Button 
              onClick={() => handleButtonClick('Botão de Ação')}
              variant="secondary"
              className="w-full"
            >
              Botão de Ação
            </Button>
          </CardContent>
        </Card>

        {/* Seção de Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>📝 Rastreamento de Formulário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <Input
                placeholder="Nome"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Enviando...' : 'Enviar Formulário'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Seção Jarvis AI */}
        <Card>
          <CardHeader>
            <CardTitle>🤖 Eventos Jarvis AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleJarvisCommand('open_document')}
              variant="outline"
              className="w-full"
            >
              Abrir Documento
            </Button>
            <Button 
              onClick={() => handleJarvisCommand('send_email')}
              variant="outline"
              className="w-full"
            >
              Enviar Email
            </Button>
            <Button 
              onClick={() => handleJarvisCommand('schedule_meeting')}
              variant="outline"
              className="w-full"
            >
              Agendar Reunião
            </Button>
          </CardContent>
        </Card>

        {/* Seção de Eventos Customizados */}
        <Card>
          <CardHeader>
            <CardTitle>🎨 Eventos Customizados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={handleCustomEvent}
              variant="secondary"
              className="w-full"
            >
              Evento Customizado
            </Button>
            <Button 
              onClick={() => trackUserActivity('page_interaction', { section: 'analytics_demo' })}
              variant="secondary"
              className="w-full"
            >
              Rastrear Atividade
            </Button>
            <Button 
              onClick={() => trackEngagement('demo_interaction', 5000)}
              variant="secondary"
              className="w-full"
            >
              Rastrear Engajamento
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Como Verificar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>1. Console do Navegador:</strong> Abra DevTools (F12) e veja os logs de eventos
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>2. Network Tab:</strong> Filtre por "google-analytics" para ver as requisições
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>3. GA4 DebugView:</strong> Configure seu email como usuário de debug no GA4
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>4. dataLayer:</strong> Digite <code>console.log(window.dataLayer)</code> no console
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsExample; 