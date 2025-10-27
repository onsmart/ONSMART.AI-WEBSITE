import React from 'react';
import { Helmet } from 'react-helmet-async';
import DockerStatus from '@/components/monitoring/DockerStatus';

const DockerMonitor: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Monitor Docker - OnSmart AI</title>
        <meta name="description" content="Monitoramento em tempo real do Docker e containers" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              🐳 Monitor Docker
            </h1>
            <p className="mt-2 text-gray-600">
              Acompanhe o status do Docker, containers e Ollama em tempo real
            </p>
          </div>

          <DockerStatus />
        </div>
      </div>
    </>
  );
};

export default DockerMonitor;

