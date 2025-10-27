
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIAgent } from '@/types/whatsappAgents';
import { Clock, TrendingUp, Users, Star } from 'lucide-react';

interface AgentPerformanceCardProps {
  agent: AIAgent;
  onClick?: () => void;
  isSelected?: boolean;
}

const AgentPerformanceCard: React.FC<AgentPerformanceCardProps> = ({ 
  agent, 
  onClick, 
  isSelected = false 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'triagem': return '🎯';
      case 'comercial': return '💼';
      case 'tecnico': return '🔧';
      case 'supervisor': return '👨‍💼';
      default: return '🤖';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getTypeIcon(agent.type)}</span>
            <div>
              <CardTitle className="text-base">{agent.name}</CardTitle>
              <p className="text-sm text-muted-foreground capitalize">{agent.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <Badge variant={agent.status === 'online' ? 'default' : 'secondary'}>
              {agent.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Workload */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Users className="h-3 w-3" />
              Conversas
            </span>
            <span className="text-sm">{agent.currentConversations}/{agent.maxConversations}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ 
                width: `${(agent.currentConversations / agent.maxConversations) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Resposta</span>
            </div>
            <p className="font-medium">
              {Math.round(agent.performance.averageResponseTime / 1000)}s
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>Conversão</span>
            </div>
            <p className="font-medium">
              {Math.round(agent.performance.conversionRate * 100)}%
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-3 w-3" />
              <span>Satisfação</span>
            </div>
            <p className="font-medium">
              {agent.performance.customerSatisfaction.toFixed(1)}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>Total</span>
            </div>
            <p className="font-medium">
              {agent.performance.totalConversations}
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Especialidades:</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.capabilities.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceCard;
