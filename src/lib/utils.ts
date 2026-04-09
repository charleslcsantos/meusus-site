/**
 * Utilitários diversos para o MeuSUS
 */

/**
 * Formata um número de telefone brasileiro
 */
export function formatPhone(phone: string): string {
  if (!phone || phone.length === 0) return 'Não informado';
  
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem o tamanho esperado
  if (cleaned.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    // Celular: (XX) XXXXX-XXXX
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  // Retorna original se não conseguir formatar
  return phone;
}

/**
 * Formata um CEP brasileiro
 */
export function formatCEP(cep: string): string {
  if (!cep || cep.length === 0) return '';
  
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  
  return cep;
}

/**
 * Formata um endereço completo
 */
export function formatAddress(
  street: string, 
  number: string, 
  district: string, 
  city: string, 
  state: string,
  cep: string
): string {
  const parts: string[] = [];
  
  if (street) {
    const streetWithNumber = number ? `${street}, ${number}` : street;
    parts.push(streetWithNumber);
  }
  
  if (district) parts.push(district);
  
  const cityState = [city, state].filter(Boolean).join(' - ');
  if (cityState) parts.push(cityState);
  
  if (cep) parts.push(formatCEP(cep));
  
  return parts.length > 0 ? parts.join(' • ') : 'Endereço não informado';
}

/**
 * Trunca um texto se exceder o tamanho máximo
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Capitaliza a primeira letra de cada palavra
 */
export function capitalizeWords(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Debounce para delays em inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Gera uma URL de busca no Google Maps
 */
export function getGoogleMapsUrl(name: string, city: string, state: string): string {
  const query = encodeURIComponent(`${name} ${city} ${state}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Verifica se está rodando no cliente (browser)
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}