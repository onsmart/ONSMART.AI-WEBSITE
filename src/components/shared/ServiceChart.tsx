import React from 'react';

interface ServiceChartProps {
  type: 'bar' | 'line' | 'pie' | 'growth';
  data?: any;
  title?: string;
}

const ServiceChart: React.FC<ServiceChartProps> = ({ type, data, title }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
            <div className="flex items-end justify-between h-full space-x-2">
              <div className="flex flex-col items-center">
                <div className="w-8 bg-blue-500 rounded-t h-16 mb-2"></div>
                <span className="text-xs text-gray-600">Antes</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-500 rounded-t h-24 mb-2"></div>
                <span className="text-xs text-gray-600">Depois</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-purple-500 rounded-t h-20 mb-2"></div>
                <span className="text-xs text-gray-600">Meta</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-orange-500 rounded-t h-28 mb-2"></div>
                <span className="text-xs text-gray-600">ROI</span>
              </div>
            </div>
          </div>
        );
      
      case 'line':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4">
            <div className="relative h-full">
              <svg className="w-full h-full" viewBox="0 0 300 200">
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  points="20,180 60,140 100,120 140,80 180,60 220,40 260,20"
                />
                <circle cx="20" cy="180" r="4" fill="#10b981" />
                <circle cx="60" cy="140" r="4" fill="#10b981" />
                <circle cx="100" cy="120" r="4" fill="#10b981" />
                <circle cx="140" cy="80" r="4" fill="#10b981" />
                <circle cx="180" cy="60" r="4" fill="#10b981" />
                <circle cx="220" cy="40" r="4" fill="#10b981" />
                <circle cx="260" cy="20" r="4" fill="#10b981" />
              </svg>
            </div>
          </div>
        );
      
      case 'pie':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-4">
            <div className="flex items-center justify-center h-full">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray="62.83 125.66"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="31.42 125.66"
                    strokeDashoffset="-62.83"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="8"
                    strokeDasharray="15.71 125.66"
                    strokeDashoffset="-94.25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray="15.71 125.66"
                    strokeDashoffset="-110"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">100%</div>
                    <div className="text-xs text-gray-600">Certificados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'growth':
        return (
          <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-red-100 rounded-lg p-4">
            <div className="flex items-end justify-center h-full space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-6 bg-orange-400 rounded-t h-8 mb-2"></div>
                <span className="text-xs text-gray-600">Mês 1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 bg-orange-500 rounded-t h-12 mb-2"></div>
                <span className="text-xs text-gray-600">Mês 2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 bg-orange-600 rounded-t h-16 mb-2"></div>
                <span className="text-xs text-gray-600">Mês 3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 bg-red-500 rounded-t h-20 mb-2"></div>
                <span className="text-xs text-gray-600">Mês 4</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 bg-red-600 rounded-t h-24 mb-2"></div>
                <span className="text-xs text-gray-600">Mês 5</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 flex items-center justify-center">
            <span className="text-gray-500">Gráfico não disponível</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {title}
        </h3>
      )}
      {renderChart()}
    </div>
  );
};

export default ServiceChart;
