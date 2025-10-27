
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';

const KeyboardShortcutsGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: 'Alt + M', description: 'Ir para o conteúdo principal' },
    { keys: 'Alt + N', description: 'Ir para a navegação' },
    { keys: 'Alt + F', description: 'Ir para o rodapé' },
    { keys: 'Alt + S', description: 'Focar no campo de busca' },
    { keys: 'Esc', description: 'Fechar modais e dropdowns' },
    { keys: 'Tab', description: 'Navegar entre elementos' },
    { keys: 'Shift + Tab', description: 'Navegar para trás' },
    { keys: 'Enter', description: 'Ativar botões e links' },
    { keys: 'Espaço', description: 'Ativar botões' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 z-50 bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
          aria-label="Abrir guia de atalhos do teclado"
        >
          <Keyboard className="h-4 w-4 mr-2" />
          Atalhos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atalhos do Teclado</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
              <span className="text-sm text-gray-600">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                {shortcut.keys}
              </kbd>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>Dica: Use Tab para navegar entre elementos interativos na página.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsGuide;
