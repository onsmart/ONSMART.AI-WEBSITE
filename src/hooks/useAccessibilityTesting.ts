
import { useEffect, useCallback } from 'react';

interface AccessibilityIssue {
  type: 'error' | 'warning';
  message: string;
  element?: HTMLElement;
  recommendation: string;
}

export const useAccessibilityTesting = (enabled: boolean = process.env.NODE_ENV === 'development') => {
  const checkAccessibility = useCallback((): AccessibilityIssue[] => {
    const issues: AccessibilityIssue[] = [];

    // Verificar se imagens têm alt text
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-label') && !img.getAttribute('role')) {
        issues.push({
          type: 'error',
          message: 'Imagem sem texto alternativo',
          element: img,
          recommendation: 'Adicione atributo alt ou aria-label para descrever a imagem'
        });
      }
    });

    // Verificar se botões têm texto acessível
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute('aria-label');
      const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
      
      if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
        issues.push({
          type: 'error',
          message: 'Botão sem texto acessível',
          element: button,
          recommendation: 'Adicione texto visível, aria-label ou aria-labelledby'
        });
      }
    });

    // Verificar se formulários têm labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        issues.push({
          type: 'error',
          message: 'Campo de formulário sem label',
          element: input as HTMLElement,
          recommendation: 'Adicione um label associado, aria-label ou aria-labelledby'
        });
      }
    });

    // Verificar heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        issues.push({
          type: 'warning',
          message: 'Hierarquia de headings pode estar incorreta',
          element: heading as HTMLElement,
          recommendation: 'Mantenha uma sequência lógica de headings (h1 → h2 → h3...)'
        });
      }
      lastLevel = level;
    });

    // Verificar se elementos interativos têm indicadores de foco
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    interactiveElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const outlineStyle = styles.getPropertyValue('outline-style');
      
      if (outlineStyle === 'none' && !element.classList.contains('focus-visible')) {
        issues.push({
          type: 'warning',
          message: 'Elemento interativo pode não ter indicador de foco visível',
          element: element as HTMLElement,
          recommendation: 'Adicione estilos de foco visíveis ou use a classe focus-visible'
        });
      }
    });

    // Verificar se existem skip links
    const skipLinks = document.querySelectorAll('.skip-link, [href="#main-content"]');
    if (skipLinks.length === 0) {
      issues.push({
        type: 'warning',
        message: 'Página sem skip links para navegação',
        recommendation: 'Adicione skip links para permitir que usuários pulem para o conteúdo principal'
      });
    }

    return issues;
  }, []);

  const logAccessibilityIssues = useCallback((issues: AccessibilityIssue[]) => {
    if (issues.length === 0) {
      console.log('✅ Nenhum problema de acessibilidade detectado');
      return;
    }

    console.group('🔍 Problemas de Acessibilidade Detectados');
    issues.forEach((issue, index) => {
      const icon = issue.type === 'error' ? '❌' : '⚠️';
      console.group(`${icon} ${issue.type.toUpperCase()} ${index + 1}`);
      console.log('Problema:', issue.message);
      console.log('Recomendação:', issue.recommendation);
      if (issue.element) {
        console.log('Elemento:', issue.element);
      }
      console.groupEnd();
    });
    console.groupEnd();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const runAccessibilityCheck = () => {
      const issues = checkAccessibility();
      logAccessibilityIssues(issues);
    };

    // Executar verificação após carregamento da página
    setTimeout(runAccessibilityCheck, 1000);

    // Executar verificação quando o DOM muda
    const observer = new MutationObserver(() => {
      setTimeout(runAccessibilityCheck, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [enabled, checkAccessibility, logAccessibilityIssues]);

  return { checkAccessibility, logAccessibilityIssues };
};
