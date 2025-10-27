/**
 * Utility functions for handling scroll behavior with sticky header
 */

export const getHeaderHeight = (): number => {
  const header = document.getElementById('navigation');
  return header ? header.offsetHeight : 80; // fallback to 80px if header not found
};

export const scrollToElement = (
  elementId: string, 
  fallbackSelector?: string,
  offset: number = 20 // Additional offset for better UX
) => {
  const headerHeight = getHeaderHeight();
  
  const scrollToTarget = (element: Element) => {
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - headerHeight - offset;
    
    window.scrollTo({
      top: Math.max(0, offsetPosition), // Ensure we don't scroll above page top
      behavior: 'smooth'
    });
  };

  // Try primary ID first
  let targetElement = document.getElementById(elementId);
  if (targetElement) {
    scrollToTarget(targetElement);
    return;
  }

  // Try fallback selector if provided
  if (fallbackSelector) {
    targetElement = document.querySelector(fallbackSelector);
    if (targetElement) {
      scrollToTarget(targetElement);
      return;
    }
  }

  // Final fallback: try data attribute
  targetElement = document.querySelector(`[data-form-section="true"]`);
  if (targetElement) {
    scrollToTarget(targetElement);
  }
};

export const scrollToForm = () => {
  // Try multiple selectors to find the form
  const formSelectors = [
    'form',
    '#contact-form',
    '#diagnostico-form',
    '[data-form-section="true"]',
    '.contact-form',
    '.diagnostico-form'
  ];
  
  const headerHeight = getHeaderHeight();
  
  for (const selector of formSelectors) {
    const formElement = document.querySelector(selector);
    if (formElement) {
      const elementTop = formElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerHeight - 20;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      return;
    }
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
