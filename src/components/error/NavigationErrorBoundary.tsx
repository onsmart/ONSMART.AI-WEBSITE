
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NavigationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Navigation Error Boundary caught an error:', error, errorInfo);
  }

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-800">
              Erro de Navegação
            </h3>
          </div>
          <p className="text-yellow-700 mb-4">
            Ocorreu um erro na navegação. Vamos redirecioná-lo para a página inicial.
          </p>
          <Button 
            onClick={this.handleGoHome}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Ir para Início
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
