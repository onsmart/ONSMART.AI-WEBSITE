
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LighthouseAudit {
  score: number;
  numericValue?: number;
  displayValue?: string;
  description: string;
}

interface LighthouseReport {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  audits: {
    [key: string]: LighthouseAudit;
  };
}

interface LighthouseTabProps {
  lighthouseReport: LighthouseReport | null;
}

const LighthouseTab: React.FC<LighthouseTabProps> = ({ lighthouseReport }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lighthouse Audit Results</CardTitle>
      </CardHeader>
      <CardContent>
        {lighthouseReport ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries({
                Performance: lighthouseReport.performance,
                Accessibility: lighthouseReport.accessibility,
                'Best Practices': lighthouseReport.bestPractices,
                SEO: lighthouseReport.seo,
                PWA: lighthouseReport.pwa
              }).map(([category, score]) => (
                <Card key={category}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-16 h-16 rounded-full ${getScoreColor(score)} mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                      {score}
                    </div>
                    <span className="text-sm font-medium">{category}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Core Web Vitals Audits</h3>
              {Object.entries(lighthouseReport.audits).map(([key, audit]) => (
                <Card key={key}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium capitalize">
                          {key.replace(/-/g, ' ')}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {audit.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {audit.displayValue}
                        </div>
                        <div className={`w-12 h-2 rounded ${getScoreColor(audit.score * 100)} mt-1`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            Clique em "Executar Auditoria Lighthouse" para começar a análise.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LighthouseTab;
