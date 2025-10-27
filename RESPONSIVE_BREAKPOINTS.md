# Sistema de Breakpoints Responsivos

## Mudanças Implementadas

### 1. Configuração do Tailwind CSS (`tailwind.config.ts`)

Foram adicionados breakpoints customizados que cobrem uma gama maior de dispositivos:

```typescript
screens: {
  'xs': '475px',   // Telas muito pequenas (smartphones pequenos)
  'sm': '640px',   // Smartphones grandes e tablets pequenos
  'md': '768px',   // Tablets em modo retrato
  'lg': '1024px',  // Tablets em modo paisagem e laptops pequenos
  'xl': '1280px',  // Laptops e desktops padrão
  '2xl': '1536px', // Desktops grandes
  '3xl': '1920px', // Telas ultra-wide e monitores 4K
}
```

#### Padding Responsivo no Container
O container agora tem padding adaptativo por breakpoint:
- `DEFAULT`: 1rem (16px)
- `sm`: 1.5rem (24px)
- `md`: 2rem (32px)
- `lg`: 2.5rem (40px)
- `xl`: 3rem (48px)

### 2. Hook use-mobile.tsx

Criado um sistema centralizado de breakpoints:

#### Exportado `BREAKPOINTS`
Constante com todos os breakpoints do projeto para uso consistente:
```typescript
import { BREAKPOINTS } from '@/hooks/use-mobile'
```

#### Novo Hook `useBreakpoint`
Hook reutilizável para detectar qualquer breakpoint específico:
```typescript
import { useBreakpoint } from '@/hooks/use-mobile'

function MyComponent() {
  const isTablet = useBreakpoint('md')
  const isDesktop = useBreakpoint('lg')
  
  return (
    <div>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </div>
  )
}
```

### 3. MobileOptimizations.tsx

Atualizado para usar os breakpoints centralizados ao invés de valores hardcoded.

## Como Usar os Breakpoints

### No Tailwind CSS

Use as classes utilitárias do Tailwind:

```jsx
// Mobile first - padrão mobile, depois desktop
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// Padding responsivo
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  Conteúdo
</div>
```

### Com Hooks TypeScript

```typescript
import { useIsMobile, useBreakpoint, BREAKPOINTS } from '@/hooks/use-mobile'

function ResponsiveComponent() {
  const isMobile = useIsMobile()
  const isTablet = useBreakpoint('md')
  const isDesktop = useBreakpoint('lg')
  
  // Lógica condicional
  if (isMobile) {
    return <MobileView />
  }
  
  return <DesktopView />
}
```

### Breakpoints Importados

Você pode importar e usar os valores dos breakpoints diretamente:

```typescript
import { BREAKPOINTS } from '@/hooks/use-mobile'

// Usar em media queries CSS-in-JS
const styles = {
  width: window.innerWidth < BREAKPOINTS.md ? '100%' : '50%'
}

// Usar em media queries
@media (min-width: ${BREAKPOINTS.lg}px) {
  // Estilos para desktop
}
```

## Recomendações de Uso

### 1. Broken Point Coverage (Cobertura de Breakpoints)

Use pelo menos 3-4 breakpoints para garantir boa responsividade:
- **xs** - Muito pequeno (opcional, apenas se necessário)
- **sm** - Smartphones grandes
- **md** - Tablets
- **lg** - Laptops e desktops
- **xl/2xl** - Telas grandes (es gratuito para manter consistência)

### 2. Mobile First

Sempre comece pelo mobile (sem prefixo) e adicione estilos maiores:

```jsx
// ✅ BOM - Mobile first
<div className="p-4 md:p-8 lg:p-12">

// ❌ EVITAR - Desktop first
<div className="p-12 md:p-8 lg:p-4">
```

### 3. Padding e Margens

Use o padding responsivo do container:
```jsx
<div className="container mx-auto">
  {/* Padding automático baseado no tamanho da tela */}
</div>
```

### 4. Grids Responsivos

```jsx
// Exemplo prático - Cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-colscs-4 gap-4">
  {/* Mobile: 1 coluna, Tablet: 2, Desktop: 3, Large: 4 */}
</div>
```

### 5. Textos Responsivos

```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Título responsivo
</h1>
```

## Dispositivos Suportados

| Breakpoint | Largura | Dispositivos Comuns |
|------------|---------|---------------------|
| xs | 475px+ | iPhones pequenos |
| sm | 640px+ | Smartphones grandes (iPhone Pro, Galaxy S) |
| md | 768px+ | Tablets (iPad) em retrato |
| lg | 1024px+ | Tablets (iPad) em paisagem, Laptops pequenos |
| xl | 1280px+ | Laptops e Desktops padrão |
| 2xl | 1536px+ | Desktops grandes |
| 3xl | 1920px+ | Monitores full HD e 4K |

## Testar Responsividade

1. **Chrome DevTools**: F12 > Device Toolbar (Ctrl+Shift+M)
2. **Breakpoints**: Teste cada breakpoint (xs, sm, md, lg, xl, 2xl)
3. **Orientation**: Teste retrato e paisagem em tablets
4. **Real Devices**: Sempre teste em dispositivos reais quando possível

## Arquivos Modificados

1. ✅ `tailwind.config.ts` - Breakpoints e padding responsivo
2. ✅ `src/hooks/use-mobile.tsx` - Sistema centralizado de breakpoints e hooks
3. ✅ `src/components/mobile/MobileOptimizations.tsx` - Usa breakpoints centralizados

## Próximos Passos (Opcional)

- Adicionar breakpoints para orientação (landscape/portrait)
- Criar utilitários para espaçamento responsivo customizado
- Documentar padrões de uso específicos do projeto
- Adicionar testes de responsividade

