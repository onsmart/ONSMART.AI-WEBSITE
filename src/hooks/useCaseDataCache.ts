
import { useMemo } from 'react';
import { technologyCases } from '../components/case-de-sucesso/data/technologyCases';
import { financeCases } from '../components/case-de-sucesso/data/financeCases';
import { healthcareCases } from '../components/case-de-sucesso/data/healthcareCases';
import { retailCases } from '../components/case-de-sucesso/data/retailCases';
import { educationCases } from '../components/case-de-sucesso/data/educationCases';

export const useCaseDataCache = () => {
  return useMemo(() => {
    return {
      technology: technologyCases,
      finance: financeCases,
      healthcare: healthcareCases,
      retail: retailCases,
      education: educationCases
    };
  }, []);
};
