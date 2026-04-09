/**
 * Componente de estado de loading
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Buscando unidades de saúde...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default LoadingState;