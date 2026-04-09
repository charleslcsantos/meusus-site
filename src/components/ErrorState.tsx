/**
 * Componente de estado de erro
 */

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Ocorreu um erro ao buscar os dados.',
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Algo deu errado
      </h3>
      
      <p className="text-gray-600 text-center max-w-md mb-6">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 
                     bg-teal-600 text-white font-medium rounded-lg
                     hover:bg-teal-700 focus:outline-none focus:ring-2 
                     focus:ring-teal-500 focus:ring-offset-2
                     transition-colors duration-200"
        >
          <RefreshCw size={18} />
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorState;