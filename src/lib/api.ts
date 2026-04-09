/**
 * Camada de integração com a API Xano do MeuSUS
 * Base URL: https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx
 */

import type { 
  SearchResponse, 
  UnitDetailResponse, 
  ApiError 
} from '@/types/api';

// URL base da API - usa variável de ambiente ou fallback
const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx';

/**
 * Classe de erro customizada para erros da API
 */
export class ApiRequestError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Configurações da API
 */
const API_CONFIG = {
  timeout: 30000, // 30 segundos
  retries: 1,
  retryDelay: 1000, // 1 segundo
} as const;

/**
 * Cria um AbortController com timeout
 */
function createTimeoutController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller;
}

/**
 * Função base para fazer requisições HTTP
 * Implementa timeout e retry logic
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = createTimeoutController(API_CONFIG.timeout);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    signal: controller.signal,
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new ApiRequestError(
        'Resposta da API não está em formato JSON',
        response.status,
        'INVALID_CONTENT_TYPE'
      );
    }

    const data = await response.json();

    // Se a resposta não foi OK, trata o erro
    if (!response.ok) {
      throw new ApiRequestError(
        data.message || `Erro ${response.status}: ${response.statusText}`,
        response.status,
        data.code || 'API_ERROR'
      );
    }

    return data as T;
  } catch (error) {
    // Se já é um ApiRequestError, propaga
    if (error instanceof ApiRequestError) {
      throw error;
    }

    // Erro de timeout
    if (error instanceof DOMException && error.name === 'AbortError') {
      // Tenta novamente se ainda há retries disponíveis
      if (retryCount < API_CONFIG.retries) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
        return fetchApi<T>(endpoint, options, retryCount + 1);
      }
      
      throw new ApiRequestError(
        'A requisição demorou muito. Tente novamente.',
        undefined,
        'TIMEOUT_ERROR'
      );
    }

    // Erro de rede ou outro erro
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiRequestError(
        'Erro de conexão. Verifique sua internet e tente novamente.',
        undefined,
        'NETWORK_ERROR'
      );
    }

    // Erro genérico
    throw new ApiRequestError(
      error instanceof Error ? error.message : 'Erro desconhecido',
      undefined,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Busca unidades de saúde por termo
 * GET /units/search?q=TERMO
 */
export async function searchUnits(query: string): Promise<SearchResponse> {
  if (!query || query.trim().length === 0) {
    throw new ApiRequestError(
      'Termo de busca não pode estar vazio',
      400,
      'EMPTY_QUERY'
    );
  }

  const encodedQuery = encodeURIComponent(query.trim());
  return fetchApi<SearchResponse>(`/search?q=${encodedQuery}`);
}

/**
 * Obtém detalhes de uma unidade específica
 * GET /units/{id}
 */
export async function getUnitDetail(id: number): Promise<UnitDetailResponse> {
  if (!id || isNaN(id) || id <= 0) {
    throw new ApiRequestError(
      'ID da unidade inválido',
      400,
      'INVALID_ID'
    );
  }

  return fetchApi<UnitDetailResponse>(`/units/${id}`);
}

/**
 * Verifica se a API está respondendo
 * Útil para health checks
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    // Faz uma busca simples para verificar se a API está online
    await searchUnits('teste');
    return true;
  } catch (error) {
    // Se o erro for de "não encontrado", a API está online
    if (error instanceof ApiRequestError && error.status === 404) {
      return true;
    }
    return false;
  }
}