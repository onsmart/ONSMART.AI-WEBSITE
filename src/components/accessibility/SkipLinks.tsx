
import React, { useEffect } from 'react';

const SkipLinks: React.FC = () => {
  useEffect(() => {
    // Check if skip links already exist to avoid duplication
    if (document.getElementById('skip-links')) return;

    const skipLinks = document.createElement('div');
    skipLinks.id = 'skip-links';
    skipLinks.className = 'fixed top-0 left-0 z-[200] p-2 bg-white border border-gray-300 shadow-lg transform -translate-y-full focus-within:translate-y-0 transition-transform duration-200';
    
    skipLinks.innerHTML = `
      <div class="flex flex-col gap-2">
        <a href="#main-content" class="skip-link bg-brand-blue text-white px-4 py-2 rounded font-medium hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Pular para o conteúdo principal</a>
        <a href="#navigation" class="skip-link bg-brand-blue text-white px-4 py-2 rounded font-medium hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Pular para a navegação</a>
        <a href="#footer" class="skip-link bg-brand-blue text-white px-4 py-2 rounded font-medium hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Pular para o rodapé</a>
      </div>
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }, []);

  return null;
};

export default SkipLinks;
