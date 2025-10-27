/**
 * Utility functions for dynamic urgency messages
 */

/**
 * Get the current month name in Portuguese
 */
export const getCurrentMonthName = (): string => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const currentDate = new Date();
  return months[currentDate.getMonth()];
};

/**
 * Get the current year
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Get the next month name in Portuguese
 */
export const getNextMonthName = (): string => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const currentDate = new Date();
  const nextMonth = (currentDate.getMonth() + 1) % 12;
  const nextYear = nextMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
  
  return months[nextMonth];
};

/**
 * Get the next year if next month is January
 */
export const getNextMonthYear = (): number => {
  const currentDate = new Date();
  const nextMonth = (currentDate.getMonth() + 1) % 12;
  return nextMonth === 0 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
};

/**
 * Dynamic urgency messages
 */
export const urgencyMessages = {
  /**
   * Standard urgency message with current month implementation
   */
  lastSlots: (discount = '40%'): string => {
    const nextMonth = getNextMonthName();
    const nextYear = getNextMonthYear();
    return ` ÚLTIMAS 12 VAGAS - Implementação ${nextMonth} ${nextYear} com ${discount} OFF`;
  },

  /**
   * Simple urgency message for end of month
   */
  endOfMonth: (): string => {
    return ' ÚLTIMAS VAGAS - Oferta válida até o final do mês';
  },

  /**
   * Urgency message with specific month and discount
   */
  monthlyOffer: (discount = '45%'): string => {
    const nextMonth = getNextMonthName();
    const nextYear = getNextMonthYear();
    return ` ÚLTIMAS 12 VAGAS - Implementação ${nextMonth} ${nextYear} com ${discount} OFF`;
  },

  /**
   * Current month implementation message
   */
  currentMonthImplementation: (discount = '40%'): string => {
    const currentMonth = getCurrentMonthName();
    const currentYear = getCurrentYear();
    return ` ÚLTIMAS 12 VAGAS - Implementação ${currentMonth} ${currentYear} com ${discount} OFF`;
  },

  /**
   * Generic urgency without specific month
   */
  limitedSlots: (): string => {
    return ' VAGAS LIMITADAS - Implementação com desconto especial';
  }
};

/**
 * Get urgency message based on context
 */
export const getUrgencyMessage = (
  type: 'next-month' | 'current-month' | 'end-month' | 'generic' = 'next-month',
  discount = '40%'
): string => {
  switch (type) {
    case 'next-month':
      return urgencyMessages.lastSlots(discount);
    case 'current-month':
      return urgencyMessages.currentMonthImplementation(discount);
    case 'end-month':
      return urgencyMessages.endOfMonth();
    case 'generic':
      return urgencyMessages.limitedSlots();
    default:
      return urgencyMessages.lastSlots(discount);
  }
};
