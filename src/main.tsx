
import React from 'react';
import { createRoot } from 'react-dom/client';
// Importar configuração do i18n ANTES do App
// Isso garante que as traduções estejam disponíveis quando os componentes renderarem
import './i18n/config';
import App from './App.tsx';
import './index.css';

// ============================================================================
// DEBUG TEMPORÁRIO: MutationObserver + verificação periódica para capturar parênteses
// Este código será removido após identificar a origem do problema
// 
// COMO REPRODUZIR O BUG:
// 1. Execute o projeto em modo desenvolvimento: npm run dev
// 2. Abra o site com o DevTools FECHADO (janela em largura total)
// 3. Interaja com a navbar: passe o mouse sobre itens com dropdown (Produtos, 
//    Serviços, Conteúdo, Setores) e depois tire o mouse
// 4. Quando o () aparecer, abra o DevTools (F12) e vá na aba Console
// 5. Os logs do MutationObserver já estarão lá, pois ele observa o DOM o tempo todo
// ============================================================================
if (import.meta.env.DEV) {
  const logs: any[] = [];
  
  const logNodePath = (node: Node) => {
    if (!(node instanceof HTMLElement)) return '';
    const parts: string[] = [];
    let current: HTMLElement | null = node;
    while (current && parts.length < 10) {
      const tag = current.tagName.toLowerCase();
      const id = current.id ? `#${current.id}` : '';
      const cls = current.className
        ? '.' + String(current.className).trim().replace(/\s+/g, '.').substring(0, 100)
        : '';
      parts.unshift(`${tag}${id}${cls}`);
      current = current.parentElement;
    }
    return parts.join(' > ');
  };

  const checkForParentheses = (element: HTMLElement, context: string) => {
    const text = element.textContent?.trim() || '';
    const innerText = element.innerText?.trim() || '';
    const display = window.getComputedStyle(element).display;
    const visibility = window.getComputedStyle(element).visibility;
    const opacity = window.getComputedStyle(element).opacity;
    
    if (text === '(' || text === ')' || text === '()' || text.match(/^[()]+$/)) {
      const logData = {
        context,
        text,
        innerText,
        tag: element.tagName,
        className: element.className,
        id: element.id,
        display,
        visibility,
        opacity,
        outerHTML: element.outerHTML.substring(0, 500),
        domPath: logNodePath(element),
        parent: element.parentElement?.tagName,
        parentClassName: element.parentElement?.className,
        element: element,
      };
      
      logs.push(logData);
      console.log('[DEBUG] Parênteses detectados:', logData);
      return true;
    }
    return false;
  };

  // Verificação periódica de elementos visíveis na navbar
  const periodicCheck = () => {
    const navs = document.querySelectorAll('nav');
    navs.forEach((nav) => {
      const allElements = nav.querySelectorAll('*');
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const style = window.getComputedStyle(el);
          const isVisible = style.display !== 'none' && 
                           style.visibility !== 'hidden' && 
                           parseFloat(style.opacity) > 0;
          
          if (isVisible) {
            checkForParentheses(el, 'periodic-check-visible');
          }
          
          // Verificar também pseudo-elementos
          try {
            const beforeContent = style.getPropertyValue('content') || 
                                 window.getComputedStyle(el, '::before').content;
            const afterContent = window.getComputedStyle(el, '::after').content;
            
            if (beforeContent && beforeContent !== 'none' && beforeContent !== 'normal' && beforeContent.includes('(')) {
              console.log('[DEBUG] Pseudo-elemento ::before com parênteses:', {
                element: el,
                tag: el.tagName,
                className: el.className,
                beforeContent,
                domPath: logNodePath(el),
              });
            }
            
            if (afterContent && afterContent !== 'none' && afterContent !== 'normal' && afterContent.includes(')')) {
              console.log('[DEBUG] Pseudo-elemento ::after com parênteses:', {
                element: el,
                tag: el.tagName,
                className: el.className,
                afterContent,
                domPath: logNodePath(el),
              });
            }
          } catch (e) {
            // Ignorar erros
          }
        }
      });
    });
  };

  // MutationObserver para mudanças no DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Verificar nós de texto adicionados
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = (node.textContent || '').trim();
          if (text === '(' || text === ')' || text === '()' || text.match(/^[()]+$/)) {
            const parent = node.parentElement;
            if (parent) {
              const logData = {
                context: 'text-node-added',
                text,
                nodeValue: node.nodeValue,
                parentTag: parent.tagName,
                parentClassName: parent.className,
                parentId: parent.id,
                parentOuterHTML: parent.outerHTML.substring(0, 500),
                domPath: logNodePath(parent),
                element: parent,
              };
              logs.push(logData);
              console.log('[DEBUG] Texto com parênteses detectado:', logData);
            }
          }
        }
        // Verificar elementos que já chegam com texto dentro
        if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
          checkForParentheses(node, 'element-added');
        }
      });
      
      // Verificar mudanças em atributos (class, style, data-state)
      if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
        // Verificar se o elemento ou seus filhos têm parênteses
        if (checkForParentheses(mutation.target, `attribute-changed-${mutation.attributeName}`)) {
          console.log('[DEBUG] Atributo alterado:', {
            attributeName: mutation.attributeName,
            oldValue: mutation.oldValue,
            newValue: mutation.target.getAttribute(mutation.attributeName),
          });
        }
        
        // Verificar filhos também
        mutation.target.querySelectorAll('*').forEach((child) => {
          if (child instanceof HTMLElement) {
            checkForParentheses(child, `attribute-changed-child-${mutation.attributeName}`);
          }
        });
      }
    }
  });

  // Iniciar observer imediatamente (antes do React renderizar)
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-state', 'data-radix-state'],
      attributeOldValue: true,
    });
    console.log('[DEBUG] MutationObserver iniciado imediatamente');
  } else {
    // Se body ainda não existe, aguardar
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'data-state', 'data-radix-state'],
        attributeOldValue: true,
      });
      console.log('[DEBUG] MutationObserver iniciado após DOMContentLoaded');
    });
  }

  // Verificação periódica a cada 500ms
  setInterval(periodicCheck, 500);

  // Função para capturar "foto" do que está visível na navbar
  const captureVisibleElements = () => {
    const navs = document.querySelectorAll('nav');
    const visibleElements: Array<{
      element: HTMLElement;
      rect: DOMRect;
      text: string;
      styles: any;
    }> = [];
    
    navs.forEach((nav) => {
      const navRect = nav.getBoundingClientRect();
      const allElements = Array.from(nav.querySelectorAll('*'));
      
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const isVisible = rect.width > 0 && 
                           rect.height > 0 && 
                           style.display !== 'none' && 
                           style.visibility !== 'hidden' && 
                           parseFloat(style.opacity) > 0;
          
          if (isVisible) {
            const text = el.textContent?.trim() || '';
            // Capturar qualquer elemento que contenha parênteses OU que esteja visível na área da navbar
            if (text.includes('(') || text.includes(')') || 
                (rect.top >= navRect.top && rect.bottom <= navRect.bottom + 100)) {
              visibleElements.push({
                element: el,
                rect,
                text,
                styles: {
                  display: style.display,
                  visibility: style.visibility,
                  opacity: style.opacity,
                  position: style.position,
                  left: style.left,
                  top: style.top,
                  width: style.width,
                  height: style.height,
                  beforeContent: window.getComputedStyle(el, '::before').content,
                  afterContent: window.getComputedStyle(el, '::after').content,
                  beforeDisplay: window.getComputedStyle(el, '::before').display,
                  afterDisplay: window.getComputedStyle(el, '::after').display,
                },
              });
            }
          }
        }
      });
    });
    
    return visibleElements;
  };

  // Verificação após eventos de mouse na navbar
  document.addEventListener('mouseleave', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('nav')) {
      setTimeout(() => {
        console.log('[DEBUG] ========================================');
        console.log('[DEBUG] 🎯 CAPTURA APÓS MOUSELEAVE');
        console.log('[DEBUG] ========================================');
        
        // Capturar elementos visíveis
        const visible = captureVisibleElements();
        console.log(`[DEBUG] Elementos visíveis capturados: ${visible.length}`);
        
        visible.forEach((item, idx) => {
          if (item.text.includes('(') || item.text.includes(')')) {
            console.log(`[DEBUG] 🚨 ELEMENTO VISÍVEL ${idx + 1} COM PARÊNTESES:`, {
              text: item.text,
              tag: item.element.tagName,
              className: item.element.className,
              id: item.element.id,
              rect: {
                top: item.rect.top,
                left: item.rect.left,
                width: item.rect.width,
                height: item.rect.height,
              },
              styles: item.styles,
              outerHTML: item.element.outerHTML.substring(0, 500),
              domPath: logNodePath(item.element),
              element: item.element,
            });
          }
        });
        
        // Verificar também elementos que podem estar entre os itens da navbar
        const navs = document.querySelectorAll('nav');
        navs.forEach((nav) => {
          const navRect = nav.getBoundingClientRect();
          // Verificar elementos que estão na mesma linha vertical da navbar
          const allPageElements = document.querySelectorAll('*');
          allPageElements.forEach((el) => {
            if (el instanceof HTMLElement && !nav.contains(el)) {
              const rect = el.getBoundingClientRect();
              const text = el.textContent?.trim() || '';
              
              // Se está na mesma área vertical da navbar e tem parênteses
              if ((text === '()' || text === '(' || text === ')') &&
                  rect.top >= navRect.top - 50 && 
                  rect.bottom <= navRect.bottom + 50) {
                const style = window.getComputedStyle(el);
                console.log('[DEBUG] 🚨 ELEMENTO FORA DA NAVBAR MAS NA MESMA ÁREA:', {
                  text,
                  tag: el.tagName,
                  className: el.className,
                  rect: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                  },
                  display: style.display,
                  visibility: style.visibility,
                  opacity: style.opacity,
                  outerHTML: el.outerHTML.substring(0, 500),
                  domPath: logNodePath(el),
                  element: el,
                });
              }
            }
          });
        });
        
        periodicCheck();
      }, 200);
    }
  }, true);
  
  // Listener específico para mudanças de hover na navbar
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('nav')) {
      setTimeout(() => {
        const navs = document.querySelectorAll('nav');
        navs.forEach((nav) => {
          const allElements = nav.querySelectorAll('*');
          allElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              const text = el.textContent?.trim() || '';
              if (text === '()' || text === '(' || text === ')') {
                const style = window.getComputedStyle(el);
                console.log('[DEBUG] Elemento com parênteses durante hover:', {
                  text,
                  tag: el.tagName,
                  className: el.className,
                  display: style.display,
                  visibility: style.visibility,
                  opacity: style.opacity,
                  outerHTML: el.outerHTML,
                  domPath: logNodePath(el),
                });
              }
            }
          });
        });
      }, 50);
    }
  }, true);

  // Expor função para verificar manualmente
  (window as any).debugCheckParentheses = () => {
    console.log('[DEBUG] ========================================');
    console.log('[DEBUG] Verificação manual iniciada...');
    console.log('[DEBUG] ========================================');
    
    periodicCheck();
    
    // Verificação adicional manual - texto no DOM
    const navs = document.querySelectorAll('nav');
    console.log('[DEBUG] Navbars encontradas:', navs.length);
    
    navs.forEach((nav, navIndex) => {
      console.log(`[DEBUG] --- Navbar ${navIndex + 1} ---`);
      const allElements = Array.from(nav.querySelectorAll('*'));
      console.log(`[DEBUG] Total de elementos: ${allElements.length}`);
      
      const elementsWithParentheses: HTMLElement[] = [];
      
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const text = el.textContent?.trim() || '';
          const innerText = el.innerText?.trim() || '';
          const style = window.getComputedStyle(el);
          
          if (text === '()' || text === '(' || text === ')' || 
              innerText === '()' || innerText === '(' || innerText === ')') {
            elementsWithParentheses.push(el);
          }
        }
      });
      
      if (elementsWithParentheses.length > 0) {
        console.log(`[DEBUG] ⚠️ ${elementsWithParentheses.length} elementos com parênteses encontrados:`);
        elementsWithParentheses.forEach((el, idx) => {
          const style = window.getComputedStyle(el);
          console.log(`[DEBUG] Elemento ${idx + 1}:`, {
            textContent: el.textContent,
            innerText: el.innerText,
            tag: el.tagName,
            className: el.className,
            id: el.id,
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            position: style.position,
            left: style.left,
            top: style.top,
            width: style.width,
            height: style.height,
            outerHTML: el.outerHTML.substring(0, 500),
            domPath: logNodePath(el),
            element: el,
          });
        });
      } else {
        console.log('[DEBUG] ✅ Nenhum elemento com parênteses encontrado no texto');
      }
      
      // VERIFICAÇÃO ESPECÍFICA: Pseudo-elementos CSS
      console.log(`[DEBUG] --- Verificando pseudo-elementos CSS na Navbar ${navIndex + 1} ---`);
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          try {
            const style = window.getComputedStyle(el);
            const beforeContent = window.getComputedStyle(el, '::before').content;
            const afterContent = window.getComputedStyle(el, '::after').content;
            const beforeDisplay = window.getComputedStyle(el, '::before').display;
            const afterDisplay = window.getComputedStyle(el, '::after').display;
            
            // Verificar se tem conteúdo com parênteses
            if (beforeContent && beforeContent !== 'none' && beforeContent !== 'normal' && 
                (beforeContent.includes('(') || beforeContent.includes(')') || beforeContent === '"("' || beforeContent === '")"')) {
              console.log(`[DEBUG] 🚨 PSEUDO-ELEMENTO ::before COM PARÊNTESES:`, {
                element: el,
                tag: el.tagName,
                className: el.className,
                id: el.id,
                beforeContent,
                beforeDisplay,
                domPath: logNodePath(el),
                outerHTML: el.outerHTML.substring(0, 300),
              });
            }
            
            if (afterContent && afterContent !== 'none' && afterContent !== 'normal' && 
                (afterContent.includes('(') || afterContent.includes(')') || afterContent === '"("' || afterContent === '")"')) {
              console.log(`[DEBUG] 🚨 PSEUDO-ELEMENTO ::after COM PARÊNTESES:`, {
                element: el,
                tag: el.tagName,
                className: el.className,
                id: el.id,
                afterContent,
                afterDisplay,
                domPath: logNodePath(el),
                outerHTML: el.outerHTML.substring(0, 300),
              });
            }
            
            // Verificar variáveis CSS
            const beforeContentVar = style.getPropertyValue('--before-content');
            const afterContentVar = style.getPropertyValue('--after-content');
            if (beforeContentVar && (beforeContentVar.includes('(') || beforeContentVar.includes(')'))) {
              console.log(`[DEBUG] 🚨 VARIÁVEL CSS --before-content COM PARÊNTESES:`, {
                element: el,
                tag: el.tagName,
                className: el.className,
                '--before-content': beforeContentVar,
                domPath: logNodePath(el),
              });
            }
            if (afterContentVar && (afterContentVar.includes('(') || afterContentVar.includes(')'))) {
              console.log(`[DEBUG] 🚨 VARIÁVEL CSS --after-content COM PARÊNTESES:`, {
                element: el,
                tag: el.tagName,
                className: el.className,
                '--after-content': afterContentVar,
                domPath: logNodePath(el),
              });
            }
          } catch (e) {
            // Ignorar erros
          }
        }
      });
    });
    
    // Verificar também elementos FORA da navbar que possam estar relacionados
    console.log('[DEBUG] --- Verificando elementos relacionados à navbar (header, etc) ---');
    const header = document.querySelector('header');
    if (header) {
      const headerElements = header.querySelectorAll('*');
      headerElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const text = el.textContent?.trim() || '';
          if (text === '()' || text === '(' || text === ')') {
            const style = window.getComputedStyle(el);
            console.log(`[DEBUG] 🚨 Elemento FORA de <nav> mas dentro de <header> com parênteses:`, {
              text,
              tag: el.tagName,
              className: el.className,
              display: style.display,
              visibility: style.visibility,
              opacity: style.opacity,
              outerHTML: el.outerHTML.substring(0, 300),
              domPath: logNodePath(el),
            });
          }
        }
      });
    }
    
    console.log('[DEBUG] Total de logs acumulados:', logs.length);
    if (logs.length > 0) {
      console.log('[DEBUG] Todos os logs históricos:', logs);
    }
    console.log('[DEBUG] ========================================');
  };
  
  // Função para inspecionar um elemento específico
  (window as any).debugInspectElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) {
      console.log('[DEBUG] Elemento não encontrado:', selector);
      return;
    }
    
    const htmlEl = element as HTMLElement;
    const style = window.getComputedStyle(htmlEl);
    
    console.log('[DEBUG] Inspeção do elemento:', {
      selector,
      tag: htmlEl.tagName,
      className: htmlEl.className,
      id: htmlEl.id,
      textContent: htmlEl.textContent,
      innerText: htmlEl.innerText,
      outerHTML: htmlEl.outerHTML,
      domPath: logNodePath(htmlEl),
      computedStyles: {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        position: style.position,
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
      },
      beforeContent: window.getComputedStyle(htmlEl, '::before').content,
      afterContent: window.getComputedStyle(htmlEl, '::after').content,
      element: htmlEl,
    });
  };
  
  // Função para capturar elementos visíveis AGORA
  (window as any).debugCaptureVisible = () => {
    console.log('[DEBUG] ========================================');
    console.log('[DEBUG] 🎯 CAPTURA DE ELEMENTOS VISÍVEIS AGORA');
    console.log('[DEBUG] ========================================');
    const visible = captureVisibleElements();
    console.log(`[DEBUG] Total de elementos visíveis: ${visible.length}`);
    
    visible.forEach((item, idx) => {
      console.log(`[DEBUG] Elemento ${idx + 1}:`, {
        text: item.text,
        tag: item.element.tagName,
        className: item.element.className,
        rect: item.rect,
        styles: item.styles,
        outerHTML: item.element.outerHTML.substring(0, 300),
      });
    });
    
    return visible;
  };

  console.log('[DEBUG] ========================================');
  console.log('[DEBUG] Sistema de debug iniciado');
  console.log('[DEBUG] ========================================');
  console.log('[DEBUG] Comandos disponíveis:');
  console.log('[DEBUG]   - window.debugCheckParentheses() - Verificar elementos com parênteses');
  console.log('[DEBUG]   - window.debugInspectElement("seletor") - Inspecionar elemento específico');
  console.log('[DEBUG] ========================================');
  
  // Criar botão de debug na página
  const createDebugButton = () => {
    const button = document.createElement('button');
    button.textContent = '🔍 Debug Parênteses';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: system-ui, -apple-system, sans-serif;
    `;
    button.onclick = () => {
      console.log('[DEBUG] ========================================');
      console.log('[DEBUG] Botão de debug clicado!');
      console.log('[DEBUG] ========================================');
      (window as any).debugCheckParentheses();
    };
    button.onmouseover = () => {
      button.style.background = '#ff5252';
    };
    button.onmouseout = () => {
      button.style.background = '#ff6b6b';
    };
    document.body.appendChild(button);
    console.log('[DEBUG] Botão de debug criado no canto inferior direito');
  };
  
  // Criar botão após o DOM estar pronto
  if (document.body) {
    createDebugButton();
  } else {
    window.addEventListener('load', createDebugButton);
  }
}

// Inicializar tema antes do React renderizar para evitar flash
// FORÇADO PARA SEMPRE MODO CLARO (dark mode não finalizado)
(function initTheme() {
  // Sempre força modo claro - ignora localStorage e preferência do sistema
  document.documentElement.classList.remove('dark');
  // Limpa qualquer preferência dark salva anteriormente
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
  }
})();


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
