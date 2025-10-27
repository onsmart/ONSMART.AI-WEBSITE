
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  context: 'form' | 'navigation' | 'content' | 'chart' | 'api';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class FormErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${this.props.context} Error:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private getContextualMessage() {
    switch (this.props.context) {
      case 'form':
        return {
          title: "Erro no Formulário",
          description: "Ocorreu um problema ao processar o formulário. Seus dados foram preservados.",
          action: "Tentar Enviar Novamente"
        };
      case 'navigation':
        return {
          title: "Erro de Navegação",
          description: "Problema ao carregar a página. Tente navegar novamente.",
          action: "Recarregar Navegação"
        };
      case 'content':
        return {
          title: "Erro de Conteúdo",
          description: "Não foi possível carregar este conteúdo no momento.",
          action: "Recarregar Conteúdo"
        };
      case 'chart':
        return {
          title: "Erro no Gráfico",
          description: "Os dados não puderam ser visualizados. Tentando novamente...",
          action: "Recarregar Dados"
        };
      case 'api':
        return {
          title: "Erro de Conexão",
          description: "Problema na comunicação com o servidor. Verifique sua conexão.",
          action: "Tentar Novamente"
        };
      default:
        return {
          title: "Erro Inesperado",
          description: "Algo deu errado. Nossa equipe foi notificada.",
          action: "Tentar Novamente"
        };
    }
  }

  public render() {
    if (this.state.hasError) {
      const contextMessage = this.getContextualMessage();

      return (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl">{contextMessage.title}</CardTitle>
            <CardDescription>{contextMessage.description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button onClick={this.handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              {contextMessage.action}
            </Button>
            
            {this.props.context === 'form' && (
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/contato'}>
                <Mail className="mr-2 h-4 w-4" />
                Contato Direto
              </Button>
            )}
            
            <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/'}>
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Componentes específicos para cada contexto
export const FormErrorBoundaryWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <FormErrorBoundary context="form">{children}</FormErrorBoundary>
);

export const NavigationErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <FormErrorBoundary context="navigation">{children}</FormErrorBoundary>
);

export const ContentErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <FormErrorBoundary context="content">{children}</FormErrorBoundary>
);

export const ChartErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <FormErrorBoundary context="chart">{children}</FormErrorBoundary>
);

export const APIErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <FormErrorBoundary context="api">{children}</FormErrorBoundary>
);
