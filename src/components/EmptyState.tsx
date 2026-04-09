/**
 * Componente de estado vazio (sem resultados)
 */

import React from 'react';
import { SearchX, ArrowLeft } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
  onBack?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  query,
  onBack 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Nenhuma unidade encontrada
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-2">
        {query ? (
          <>
            Não encontramos unidades para <strong>"{query}"</strong>.
          </>
        ) : (
          'Não encontramos unidades para sua busca.'
        )}
      </p>
      
      <p className="text-gray-500 text-center max-w-md mb-6">
        Tente usar termos diferentes como "hospital", "posto de saúde", 
        "consulta", ou o nome de uma especialidade médica.
      </p>
      
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 
                     bg-gray-100 text-gray-700 font-medium rounded-lg
                     hover:bg-gray-200 focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2
                     transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Voltar para busca
        </button>
      )}
    </div>
  );
};

export default EmptyState;