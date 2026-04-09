# Boas Práticas do MeuSUS

Este documento descreve as boas práticas de desenvolvimento aplicadas no projeto MeuSUS.

## Sumário

1. [Arquitetura](#arquitetura)
2. [TypeScript](#typescript)
3. [Componentes React](#componentes-react)
4. [Testes](#testes)
5. [Acessibilidade](#acessibilidade)
6. [Performance](#performance)
7. [Código Limpo](#código-limpo)

---

## Arquitetura

### Separação de Responsabilidades

```
src/
├── components/     # Componentes de UI (React)
├── layouts/        # Layouts do Astro
├── lib/            # Lógica de negócio (API, utils)
├── types/          # Tipagens TypeScript
├── pages/          # Rotas do Astro
└── test/           # Configuração e mocks de teste
```

### Princípios Aplicados

- **Single Responsibility**: Cada arquivo tem uma única responsabilidade
- **DRY (Don't Repeat Yourself)**: Componentes reutilizáveis
- **KISS (Keep It Simple)**: Código simples e direto

---

## TypeScript

### Strict Mode Habilitado

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Tipagens Explícitas

```typescript
// ✅ Bom
interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading }) => {
  // ...
};

// ❌ Evitar
const SearchBox = (props) => {
  // ...
};
```

### Tipos vs Interfaces

- Use `interface` para objetos que serão estendidos
- Use `type` para uniões, interseções e tipos complexos

---

## Componentes React

### Estrutura de Componentes

```tsx
/**
 * Descrição do componente
 * @example
 * ```tsx
 * <Component prop="value" />
 * ```
 */
import React from 'react';

export interface ComponentProps {
  /** Descrição da prop */
  prop: string;
  /** Prop opcional */
  optional?: boolean;
}

export const Component: React.FC<ComponentProps> = ({ prop, optional = false }) => {
  // Lógica do componente
  
  return (
    // JSX
  );
};

export default Component;
```

### Hooks

```tsx
// ✅ Use useCallback para funções passadas como props
const handleSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  onSearch(query);
}, [query, onSearch]);

// ✅ Use useId para IDs únicos (acessibilidade)
const inputId = useId();

// ✅ Use useMemo para cálculos pesados
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

### Props

```tsx
// ✅ Props desestruturadas com valores padrão
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  disabled = false,
  onClick 
}) => {
  // ...
};

// ✅ Props opcionais marcadas com ?
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}
```

---

## Testes

### Estrutura de Testes

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ComponentName', () => {
  it('deve descrever o comportamento esperado', async () => {
    // Arrange
    const user = userEvent.setup();
    const handler = vi.fn();
    
    // Act
    render(<Component onAction={handler} />);
    await user.click(screen.getByRole('button'));
    
    // Assert
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
```

### Padrões de Teste

1. **AAA**: Arrange, Act, Assert
2. **Nomenclatura**: `deve [comportamento esperado]`
3. **Independência**: Cada teste é isolado
4. **Mocks**: Use MSW para APIs

### Cobertura Mínima

- Componentes: Render, interações, edge cases
- APIs: Sucesso, erro, timeout, validação
- Utils: Todos os cenários de entrada

---

## Acessibilidade

### Regras Aplicadas

```tsx
// ✅ Labels para inputs
<label htmlFor={inputId} className="sr-only">Buscar</label>
<input id={inputId} aria-label="Campo de busca" />

// ✅ Roles semânticas
<form role="search" aria-label="Buscar unidades">

// ✅ Estados dinâmicos
<button aria-busy={isLoading} aria-disabled={isDisabled}>

// ✅ Mensagens de estado
<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Checklist A11y

- [ ] Todos os inputs têm labels
- [ ] Botões têm textos descritivos
- [ ] Estados de loading são anunciados
- [ ] Erros são anunciados via `aria-live`
- [ ] Contraste de cores adequado
- [ ] Navegação por teclado funciona

---

## Performance

### Otimizações

```tsx
// ✅ Lazy loading de componentes
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ Memoização
const MemoizedComponent = memo(Component);

// ✅ useCallback para funções
const handleClick = useCallback(() => {
  // ...
}, [deps]);

// ✅ useMemo para cálculos
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### API

```typescript
// ✅ Timeout nas requisições
const controller = new AbortController();
setTimeout(() => controller.abort(), 30000);

// ✅ Retry automático
if (retryCount < MAX_RETRIES) {
  return fetchWithRetry(url, options, retryCount + 1);
}
```

---

## Código Limpo

### Nomenclatura

```typescript
// ✅ Variáveis descritivas
const isLoading = true;
const searchResults = [];
const handleSubmit = () => {};

// ❌ Evitar abreviações
const ld = true;
const res = [];
const submit = () => {};
```

### Funções

```typescript
// ✅ Funções pequenas e focadas
function formatPhone(phone: string): string {
  // Apenas formatação
}

function validateEmail(email: string): boolean {
  // Apenas validação
}

// ❌ Evitar funções grandes
function processEverything(data: Data) {
  // Muitas responsabilidades
}
```

### Comentários

```typescript
/**
 * Busca unidades de saúde por termo
 * @param query - Termo de busca
 * @returns Promise com resultados da busca
 * @throws ApiRequestError se a busca falhar
 * 
 * @example
 * ```typescript
 * const results = await searchUnits('pediatra');
 * ```
 */
export async function searchUnits(query: string): Promise<SearchResponse> {
  // ...
}
```

### Imports

```typescript
// ✅ Ordenação: externos → internos → tipos
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { Button } from '@/components/Button';

import type { SearchResponse } from '@/types/api';
```

---

## ESLint

### Regras Configuradas

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

### Comandos

```bash
npm run lint      # Verificar problemas
npm run lint:fix  # Corrigir problemas automaticamente
```

---

## Checklist de Code Review

Antes de fazer merge:

- [ ] Código passa no `npm run lint`
- [ ] Código passa no `npm run typecheck`
- [ ] Todos os testes passam (`npm run test`)
- [ ] Cobertura de testes > 80%
- [ ] Componentes têm props tipadas
- [ ] Funções têm retorno tipado
- [ ] Não há `any` desnecessário
- [ ] Acessibilidade verificada
- [ ] Código está documentado (JSDoc)

---

## Referências

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/docs/)
- [A11y Project](https://www.a11yproject.com/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)