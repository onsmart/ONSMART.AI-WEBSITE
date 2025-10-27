
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Conversation } from '@/types/whatsappAgents';
import { Clock, MessageCircle, User, Filter } from 'lucide-react';

interface ConversationsListProps {
  conversations: Conversation[];
  showFilters?: boolean;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ 
  conversations, 
  showFilters = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.assignedAgentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || conv.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      case 'transferred': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60)),
      'minute'
    );
  };

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Nenhuma conversa ativa no momento</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          
          <Input
            placeholder="Buscar por cliente ou agente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="waiting">Aguardando</SelectItem>
              <SelectItem value="transferred">Transferido</SelectItem>
              <SelectItem value="closed">Fechado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`} />
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{conversation.customerId}</span>
                </div>
                <Badge className={getPriorityColor(conversation.priority)}>
                  {conversation.priority}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTime(conversation.lastActivity)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Agente:</span>{' '}
                  <span className="font-medium capitalize">{conversation.assignedAgentId}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Mensagens:</span>{' '}
                  <span>{conversation.messages.length}</span>
                </p>
                {conversation.context.customerIntent && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Intenção:</span>{' '}
                    <span className="capitalize">{conversation.context.customerIntent}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
                {conversation.status === 'active' && (
                  <Button variant="outline" size="sm">
                    Transferir
                  </Button>
                )}
              </div>
            </div>

            {/* Tags */}
            {conversation.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {conversation.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
