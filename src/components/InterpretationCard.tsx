/**
 * Card de exibição da interpretação da busca
 * Mostra grupo, intenção e targets encontrados
 */

import React from 'react';
import { Lightbulb, Target, FolderOpen } from 'lucide-react';
import type { SearchInterpretation } from '@/types/api';

interface InterpretationCardProps {
  interpretation: SearchInterpretation;
}

export const InterpretationCard: React.FC<InterpretationCardProps> = ({ 
  interpretation 
}) => {
  const { group, intent, targets } = interpretation;

  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={18} className="text-teal-600" />
        <span className="text-sm font-medium text-teal-800">
          Entendemos sua busca como:
        </span>
      </div>
      
      <div className="space-y-3">
        {/* Grupo e Intenção */}
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 
                          bg-white border border-teal-200 rounded-lg">
            <FolderOpen size={14} className="text-teal-600" />
            <span className="text-sm text-gray-700">
              <span className="font-medium">Grupo:</span> {group.name}
            </span>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 
                          bg-white border border-teal-200 rounded-lg">
            <Target size={14} className="text-teal-600" />
            <span className="text-sm text-gray-700">
              <span className="font-medium">Intenção:</span> {intent.name}
            </span>
          </div>
        </div>
        
        {/* Targets */}
        {targets && targets.length > 0 && (
          <div className="pt-2 border-t border-teal-100">
            <span className="text-xs text-teal-600 font-medium uppercase tracking-wide">
              Termos relacionados:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {targets.map((target, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 text-xs
                             bg-white border border-gray-200 rounded-full text-gray-600"
                  title={`Confiança: ${Math.round(target.weight * 100)}%`}
                >
                  {target.official_name}
                  <span className="ml-1.5 text-gray-400">
                    ({Math.round(target.weight * 100)}%)
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterpretationCard;