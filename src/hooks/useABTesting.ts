
import { useState, useEffect, useCallback } from 'react';

interface ABTest {
  name: string;
  variants: string[];
  traffic_allocation?: number;
}

interface ABTestResult {
  test_name: string;
  variant: string;
  user_id: string;
}

export const useABTesting = () => {
  const [activeTests, setActiveTests] = useState<Record<string, string>>({});

  const generateUserId = useCallback(() => {
    let userId = localStorage.getItem('ab_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ab_user_id', userId);
    }
    return userId;
  }, []);

  const assignVariant = useCallback((test: ABTest): string => {
    const userId = generateUserId();
    const existingAssignment = localStorage.getItem(`ab_${test.name}`);
    
    if (existingAssignment) {
      return existingAssignment;
    }

    // Usar hash do user_id para garantir consistência
    const hash = userId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    const variantIndex = Math.abs(hash) % test.variants.length;
    const variant = test.variants[variantIndex];
    
    localStorage.setItem(`ab_${test.name}`, variant);
    
    // Track assignment
    const result: ABTestResult = {
      test_name: test.name,
      variant,
      user_id: userId
    };

    const assignments = JSON.parse(localStorage.getItem('ab_assignments') || '[]');
    assignments.push({
      ...result,
      timestamp: Date.now()
    });
    localStorage.setItem('ab_assignments', JSON.stringify(assignments));

    return variant;
  }, [generateUserId]);

  const getVariant = useCallback((testName: string): string | null => {
    return activeTests[testName] || localStorage.getItem(`ab_${testName}`);
  }, [activeTests]);

  const runTest = useCallback((test: ABTest): string => {
    const variant = assignVariant(test);
    setActiveTests(prev => ({
      ...prev,
      [test.name]: variant
    }));
    return variant;
  }, [assignVariant]);

  const trackConversion = useCallback((testName: string, conversionType: string, value?: number) => {
    const variant = getVariant(testName);
    if (!variant) return;

    const conversion = {
      test_name: testName,
      variant,
      conversion_type: conversionType,
      value,
      user_id: generateUserId(),
      timestamp: Date.now()
    };

    const conversions = JSON.parse(localStorage.getItem('ab_conversions') || '[]');
    conversions.push(conversion);
    localStorage.setItem('ab_conversions', JSON.stringify(conversions));

    // Track no Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_conversion', {
        test_name: testName,
        variant,
        conversion_type: conversionType,
        value
      });
    }
  }, [getVariant, generateUserId]);

  const getTestResults = useCallback((testName: string) => {
    const assignments = JSON.parse(localStorage.getItem('ab_assignments') || '[]');
    const conversions = JSON.parse(localStorage.getItem('ab_conversions') || '[]');

    const testAssignments = assignments.filter((a: any) => a.test_name === testName);
    const testConversions = conversions.filter((c: any) => c.test_name === testName);

    const results = testAssignments.reduce((acc: any, assignment: any) => {
      if (!acc[assignment.variant]) {
        acc[assignment.variant] = {
          users: 0,
          conversions: 0,
          conversion_rate: 0
        };
      }
      acc[assignment.variant].users++;
      return acc;
    }, {});

    testConversions.forEach((conversion: any) => {
      if (results[conversion.variant]) {
        results[conversion.variant].conversions++;
      }
    });

    Object.keys(results).forEach(variant => {
      results[variant].conversion_rate = 
        results[variant].users > 0 
          ? (results[variant].conversions / results[variant].users * 100).toFixed(2)
          : 0;
    });

    return results;
  }, []);

  return {
    runTest,
    getVariant,
    trackConversion,
    getTestResults,
    activeTests
  };
};
