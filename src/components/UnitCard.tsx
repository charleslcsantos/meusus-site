/**
 * Card de exibição de uma unidade de saúde
 */

import React from 'react';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import type { SearchUnit } from '@/types/api';

interface UnitCardProps {
  unit: SearchUnit;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
  return (
    <a
      href={`/unidade/${unit.id}`}
      className="block p-5 bg-white border border-gray-200 rounded-xl 
                 hover:border-teal-300 hover:shadow-md hover:shadow-teal-50
                 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Nome da unidade */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-700 
                         transition-colors line-clamp-2">
            {unit.name}
          </h3>
          
          {/* Tipo da unidade */}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Building2 size={16} className="flex-shrink-0" />
            <span>{unit.unit_type_name || 'Unidade de Saúde'}</span>
          </div>
          
          {/* Bairro */}
          {unit.district && (
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin size={16} className="flex-shrink-0" />
              <span>{unit.district}</span>
            </div>
          )}
          
          {/* Motivo do match */}
          {unit.match_reason && (
            <div className="mt-3 inline-flex items-center px-2.5 py-1 text-xs 
                            bg-teal-50 text-teal-700 rounded-full">
              {unit.match_reason}
            </div>
          )}
        </div>
        
        {/* Ícone de seta */}
        <div className="flex-shrink-0 text-gray-300 group-hover:text-teal-500 
                        transition-colors">
          <ArrowRight size={20} />
        </div>
      </div>
    </a>
  );
};

export default UnitCard;