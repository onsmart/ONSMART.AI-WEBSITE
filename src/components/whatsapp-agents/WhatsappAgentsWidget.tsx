
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsappAgentsWidget: React.FC = () => {
  const navigate = useNavigate();

  // Dados simulados - em produção viriam do serviço
  const stats = {
    activeConversations: 24,
    agentsOnline: 4,
    conversionRate: 84,
    responseTime: 3
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-green-600" />
            <CardTitle className="text-lg">Agentes IA WhatsApp</CardTitle>
          </div>
          <Badge variant="default" className="bg-green-500">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Sistema de múltiplos agentes de IA especializados em vendas operando 24/7
        </p>

        {/* Status Rápido */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.activeConversations}</div>
            <div className="text-xs text-muted-foreground">Conversas Ativas</div>
          </div>
          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.agentsOnline}</div>
            <div className="text-xs text-muted-foreground">Agentes Online</div>
          </div>
        </div>

        {/* Métricas de Performance */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Taxa de Conversão</span>
            <span className="text-sm font-semibold text-green-600">{stats.conversionRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Tempo de Resposta</span>
            <span className="text-sm font-semibold text-blue-600">{stats.responseTime}s</span>
          </div>
        </div>

        {/* Agentes Ativos */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">AGENTES ATIVOS:</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>🎯 Sofia - Triagem</span>
              <Badge variant="outline" className="text-xs">15 conversas</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>💼 Carlos - Comercial</span>
              <Badge variant="outline" className="text-xs">8 conversas</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>🔧 Ana - Técnica</span>
              <Badge variant="outline" className="text-xs">6 conversas</Badge>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/whatsapp-agents')}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Acessar Dashboard Completo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default WhatsappAgentsWidget;
