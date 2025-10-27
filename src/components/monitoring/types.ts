
export interface LighthouseAudit {
  score: number;
  numericValue?: number;
  displayValue?: string;
  description: string;
}

export interface LighthouseReport {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  audits: {
    [key: string]: LighthouseAudit;
  };
}
