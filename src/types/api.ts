/**
 * Tipagens para as APIs do MeuSUS
 * Base URL: https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx
 */

// ============================================
// BUSCA DE UNIDADES - /units/search?q=TERMO
// ============================================

export interface SearchTarget {
  target_type: 'specialty' | 'procedure' | 'service';
  official_name: string;
  weight: number;
}

export interface SearchInterpretationGroup {
  slug: string;
  name: string;
}

export interface SearchInterpretationIntent {
  slug: string;
  name: string;
}

export interface SearchInterpretation {
  group: SearchInterpretationGroup;
  intent: SearchInterpretationIntent;
  targets: SearchTarget[];
}

export interface SearchUnit {
  id: number;
  cnes: string;
  name: string;
  unit_type_name: string;
  district: string;
  match_reason: string;
}

export interface SearchResponse {
  query: string;
  found: boolean;
  interpretation: SearchInterpretation;
  units: SearchUnit[];
}

// ============================================
// DETALHE DA UNIDADE - /units/{id}
// ============================================

export interface UnitDetail {
  id: number;
  cnes: string;
  name: string;
  legal_name: string;
  unit_type_code: string;
  unit_type_name: string;
  city_ibge_code: string;
  city_name: string;
  state: string;
  district: string;
  street: string;
  number: string;
  zip_code: string;
  phone: string;
  email: string;
  latitude: number | null;
  longitude: number | null;
  attends_sus: boolean;
  is_active: boolean;
  source_competence: string;
}

export interface Specialty {
  name: string;
  code: string;
}

export interface Service {
  name: string;
  code: string;
}

export interface Procedure {
  name: string;
  code: string;
}

export interface UnitDetailResponse {
  found: boolean;
  unit: UnitDetail;
  specialties: Specialty[];
  services: Service[];
  procedures: Procedure[];
}

// ============================================
// ESTADOS DA UI
// ============================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}