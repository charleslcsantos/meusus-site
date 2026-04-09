/**
 * Componente com exemplos de busca clicáveis
 */

import React from 'react';

interface SearchExamplesProps {
  onExampleClick?: (example: string) => void;
  examples?: string[];
}

const DEFAULT_EXAMPLES = [
  'preventivo',
  'pé torcido',
  'raio x',
  'pediatra'
];

export const SearchExamples: React.FC<SearchExamplesProps> = ({
  onExampleClick,
  examples = DEFAULT_EXAMPLES
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      <span className="text-sm text-gray-500">Exemplos:</span>
      {examples.map((example) => (
        <button
          key={example}
          onClick={() => {
            if (onExampleClick) {
              onExampleClick(example);
            } else {
              window.location.href = `/busca?q=${encodeURIComponent(example)}`;
            }
          }}
          className="px-3 py-1 text-sm text-teal-700 bg-teal-50 border border-teal-200 
                     rounded-full hover:bg-teal-100 hover:border-teal-300
                     transition-colors duration-200"
        >
          {example}
        </button>
      ))}
    </div>
  );
};

export default SearchExamples;