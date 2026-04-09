/**
 * Componente de resultados de busca
 * Faz a chamada à API e gerencia os estados
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { searchUnits, ApiRequestError } from '@/lib/api';
import type { SearchResponse, LoadingState } from '@/types/api';

import SearchBox from './SearchBox';
import SearchExamples from './SearchExamples';
import InterpretationCard from './InterpretationCard';
import UnitCard from './UnitCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

interface SearchResultsProps {
  initialQuery?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>('');

  // Função para executar a busca
  const executeSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setLoadingState('idle');
      return;
    }

    setLoadingState('loading');
    setError('');
    setQuery(searchQuery);

    // Atualiza a URL sem recarregar a página
    const newUrl = `/busca?q=${encodeURIComponent(searchQuery)}`;
    window.history.replaceState({}, '', newUrl);

    try {
      const data = await searchUnits(searchQuery);
      setResults(data);
      setLoadingState('success');
    } catch (err) {
      console.error('Erro na busca:', err);
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError('Erro ao buscar unidades. Tente novamente.');
      }
      setLoadingState('error');
    }
  }, []);

  // Executa a busca inicial se houver query
  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery, executeSearch]);

  // Handler para nova busca
  const handleSearch = useCallback((newQuery: string) => {
    executeSearch(newQuery);
  }, [executeSearch]);

  // Handler para clicar em exemplo
  const handleExampleClick = useCallback((example: string) => {
    executeSearch(example);
  }, [executeSearch]);

  // Handler para retry
  const handleRetry = useCallback(() => {
    if (query) {
      executeSearch(query);
    }
  }, [query, executeSearch]);

  // Handler para voltar
  const handleBack = useCallback(() => {
    window.location.href = '/';
  }, []);

  // Renderiza o estado inicial (sem busca)
  if (loadingState === 'idle' && !results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Buscar unidades de saúde
          </h1>
          
          <SearchBox 
            onSearch={handleSearch}
            placeholder="O que você precisa?"
          />
          
          <SearchExamples onExampleClick={handleExampleClick} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header com busca */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 
                       rounded-lg transition-colors flex-shrink-0"
            title="Voltar para página inicial"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1">
            <SearchBox 
              onSearch={handleSearch}
              initialValue={query}
              isLoading={loadingState === 'loading'}
              placeholder="Nova busca..."
            />
          </div>
        </div>
        
        <div className="mt-3 pl-11">
          <SearchExamples 
            onExampleClick={handleExampleClick}
            examples={['preventivo', 'pé torcido', 'raio x', 'pediatra']}
          />
        </div>
      </div>

      {/* Estado de loading */}
      {loadingState === 'loading' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <LoadingState message={`Buscando unidades para "${query}"...`} />
        </div>
      )}

      {/* Estado de erro */}
      {loadingState === 'error' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <ErrorState 
            message={error} 
            onRetry={handleRetry}
          />
        </div>
      )}

      {/* Resultados */}
      {loadingState === 'success' && results && (
        <div className="animate-fade-in">
          {/* Header dos resultados */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Resultados para "{results.query}"
              </h1>
              <p className="text-sm text-gray-500">
                {results.found 
                  ? `${results.units.length} unidade${results.units.length !== 1 ? 's' : ''} encontrada${results.units.length !== 1 ? 's' : ''}`
                  : 'Nenhuma unidade encontrada'
                }
              </p>
            </div>
          </div>

          {/* Interpretação da busca */}
          {results.found && results.interpretation && (
            <InterpretationCard interpretation={results.interpretation} />
          )}

          {/* Lista de unidades ou estado vazio */}
          {results.found && results.units.length > 0 ? (
            <div className="space-y-3">
              {results.units.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <EmptyState 
                query={query}
                onBack={handleBack}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;