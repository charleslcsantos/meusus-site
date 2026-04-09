/**
 * Componente de busca com input e botão
 * Usado na página inicial
 * 
 * @example
 * ```tsx
 * <SearchBox 
 *   onSearch={(query) => console.log(query)}
 *   placeholder="Buscar unidades..."
 * />
 * ```
 */

import React, { useState, useCallback, useId } from 'react';
import { Search, Loader2 } from 'lucide-react';

export interface SearchBoxProps {
  /** Callback chamado quando o usuário submete a busca */
  onSearch?: (query: string) => void;
  /** Valor inicial do input */
  initialValue?: string;
  /** Estado de loading */
  isLoading?: boolean;
  /** Placeholder do input */
  placeholder?: string;
  /** Label acessível para o input */
  ariaLabel?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  initialValue = '',
  isLoading = false,
  placeholder = 'O que você precisa? (ex: pediatra, raio x...)',
  ariaLabel = 'Campo de busca por unidades de saúde',
}) => {
  const [query, setQuery] = useState(initialValue);
  const inputId = useId();
  const buttonId = useId();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        window.location.href = `/busca?q=${encodeURIComponent(query.trim())}`;
      }
    }
  }, [query, isLoading, onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const isSubmitDisabled = isLoading || !query.trim();

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto"
      role="search"
      aria-label="Buscar unidades de saúde"
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400" aria-hidden="true">
          <Search size={20} />
        </div>
        
        <label htmlFor={inputId} className="sr-only">
          {ariaLabel}
        </label>
        
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          aria-label={ariaLabel}
          aria-describedby={buttonId}
          aria-busy={isLoading}
          className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-200 rounded-xl 
                     focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     transition-all duration-200"
          autoFocus
          autoComplete="off"
        />
        
        <button
          id={buttonId}
          type="submit"
          disabled={isSubmitDisabled}
          aria-disabled={isSubmitDisabled}
          aria-label={isLoading ? 'Buscando...' : 'Buscar unidades'}
          className="absolute right-2 px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg
                     hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>Buscando...</span>
            </>
          ) : (
            <span>Buscar</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBox;