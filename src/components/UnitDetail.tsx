/**
 * Componente de detalhe da unidade
 * Faz a chamada à API e exibe os detalhes completos
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Stethoscope,
  ClipboardList,
  Activity,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import { getUnitDetail, ApiRequestError } from '@/lib/api';
import { formatPhone, formatAddress, getGoogleMapsUrl } from '@/lib/utils';
import type { UnitDetailResponse, LoadingState } from '@/types/api';

import ErrorState from './ErrorState';

interface UnitDetailProps {
  unitId: number;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({ unitId }) => {
  const [data, setData] = useState<UnitDetailResponse | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [error, setError] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoadingState('loading');
    setError('');

    try {
      const response = await getUnitDetail(unitId);
      setData(response);
      setLoadingState('success');
    } catch (err) {
      console.error('Erro ao carregar unidade:', err);
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError('Erro ao carregar detalhes da unidade.');
      }
      setLoadingState('error');
    }
  }, [unitId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const handleRetry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Estado de loading
  if (loadingState === 'loading') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 size={40} className="text-teal-600 animate-spin mb-4" />
            <p className="text-gray-600">Carregando detalhes da unidade...</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (loadingState === 'error') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <ErrorState message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  // Sem dados
  if (!data || !data.found || !data.unit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-gray-400" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Unidade não encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            Não encontramos uma unidade com o ID informado.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white 
                       font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const { unit, specialties, services, procedures } = data;
  const hasLocationData = unit.latitude && unit.longitude;
  const mapsUrl = getGoogleMapsUrl(unit.name, unit.city_name, unit.state);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Botão voltar */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 
                   transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        <span>Voltar para resultados</span>
      </button>

      {/* Card principal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Tipo da unidade */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 
                              bg-white/20 rounded-full text-sm mb-3">
                <Building2 size={14} />
                <span>{unit.unit_type_name || 'Unidade de Saúde'}</span>
              </div>
              
              {/* Nome */}
              <h1 className="text-2xl font-bold leading-tight">
                {unit.name}
              </h1>
              
              {/* Razão social */}
              {unit.legal_name && unit.legal_name !== unit.name && (
                <p className="text-teal-100 text-sm mt-1">
                  {unit.legal_name}
                </p>
              )}
              
              {/* Localização */}
              <div className="flex items-center gap-2 mt-3 text-teal-100">
                <MapPin size={16} />
                <span>
                  {unit.city_name}, {unit.state}
                  {unit.district && ` • ${unit.district}`}
                </span>
              </div>
            </div>
            
            {/* Badge SUS */}
            <div className="flex-shrink-0">
              {unit.attends_sus ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 
                                bg-green-500/30 rounded-full text-sm">
                  <CheckCircle2 size={14} />
                  <span>Atende SUS</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 
                                bg-white/20 rounded-full text-sm">
                  <XCircle size={14} />
                  <span>Não atende SUS</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Informações de contato */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Informações de contato
            </h2>
            
            <div className="space-y-2">
              {/* Endereço */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    {formatAddress(
                      unit.street,
                      unit.number,
                      unit.district,
                      unit.city_name,
                      unit.state,
                      unit.zip_code
                    )}
                  </p>
                  
                  {/* Link Google Maps */}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-teal-600 
                               hover:text-teal-700 mt-1"
                  >
                    <ExternalLink size={14} />
                    <span>Ver no Google Maps</span>
                  </a>
                </div>
              </div>
              
              {/* Telefone */}
              {unit.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400 flex-shrink-0" />
                  <a 
                    href={`tel:${unit.phone.replace(/\D/g, '')}`}
                    className="text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    {formatPhone(unit.phone)}
                  </a>
                </div>
              )}
              
              {/* Email */}
              {unit.email && (
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${unit.email}`}
                    className="text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    {unit.email}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Especialidades */}
          {specialties && specialties.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Stethoscope size={20} className="text-teal-600" />
                Especialidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm"
                  >
                    {specialty.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Serviços */}
          {services && services.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ClipboardList size={20} className="text-teal-600" />
                Serviços
              </h2>
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Procedimentos */}
          {procedures && procedures.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Activity size={20} className="text-teal-600" />
                Procedimentos
              </h2>
              <div className="flex flex-wrap gap-2">
                {procedures.map((procedure, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm"
                  >
                    {procedure.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Informações adicionais */}
          <section className="pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">CNES:</span> {unit.cnes}
              </div>
              {unit.source_competence && (
                <div>
                  <span className="font-medium">Fonte:</span> {unit.source_competence}
                </div>
              )}
              <div>
                <span className="font-medium">Status:</span>{' '}
                {unit.is_active ? (
                  <span className="text-green-600">Ativa</span>
                ) : (
                  <span className="text-red-600">Inativa</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Botão voltar (bottom) */}
      <div className="mt-6 text-center">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 
                     font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar para resultados
        </button>
      </div>
    </div>
  );
};

export default UnitDetail;