/**
 * Testes unitários para funções utilitárias
 * @module utils.test
 */

import { describe, it, expect, vi } from 'vitest';
import {
  formatPhone,
  formatCEP,
  formatAddress,
  truncateText,
  capitalizeWords,
  debounce,
  getGoogleMapsUrl,
  isClient,
} from './utils';

describe('Utils', () => {
  describe('formatPhone', () => {
    it('deve formatar telefone fixo de 10 dígitos', () => {
      expect(formatPhone('7132021234')).toBe('(71) 3202-1234');
    });

    it('deve formatar celular de 11 dígitos', () => {
      expect(formatPhone('71999998888')).toBe('(71) 99999-8888');
    });

    it('deve remover caracteres não numéricos antes de formatar', () => {
      expect(formatPhone('(71) 3202-1234')).toBe('(71) 3202-1234');
      expect(formatPhone('71.3202.1234')).toBe('(71) 3202-1234');
    });

    it('deve retornar "Não informado" para string vazia', () => {
      expect(formatPhone('')).toBe('Não informado');
    });

    it('deve retornar "Não informado" para null/undefined', () => {
      expect(formatPhone(null as unknown as string)).toBe('Não informado');
      expect(formatPhone(undefined as unknown as string)).toBe('Não informado');
    });

    it('deve retornar string original se não conseguir formatar', () => {
      expect(formatPhone('123')).toBe('123');
      expect(formatPhone('123456789012')).toBe('123456789012');
    });
  });

  describe('formatCEP', () => {
    it('deve formatar CEP de 8 dígitos', () => {
      expect(formatCEP('41810000')).toBe('41810-000');
    });

    it('deve remover caracteres não numéricos antes de formatar', () => {
      expect(formatCEP('41810-000')).toBe('41810-000');
      expect(formatCEP('41.810-000')).toBe('41810-000');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(formatCEP('')).toBe('');
    });

    it('deve retornar string original se não tiver 8 dígitos', () => {
      expect(formatCEP('123')).toBe('123');
      expect(formatCEP('123456789')).toBe('123456789');
    });
  });

  describe('formatAddress', () => {
    it('deve formatar endereço completo', () => {
      const result = formatAddress(
        'Av. Octávio Mangabeira',
        '1234',
        'Pituba',
        'Salvador',
        'BA',
        '41810000'
      );
      expect(result).toBe('Av. Octávio Mangabeira, 1234 • Pituba • Salvador - BA • 41810-000');
    });

    it('deve omitir campos vazios', () => {
      const result = formatAddress(
        'Av. Octávio Mangabeira',
        '',
        'Pituba',
        'Salvador',
        'BA',
        ''
      );
      expect(result).toBe('Av. Octávio Mangabeira • Pituba • Salvador - BA');
    });

    it('deve retornar mensagem padrão quando todos os campos estão vazios', () => {
      const result = formatAddress('', '', '', '', '', '');
      expect(result).toBe('Endereço não informado');
    });

    it('deve funcionar com apenas cidade e estado', () => {
      const result = formatAddress('', '', '', 'Salvador', 'BA', '');
      expect(result).toBe('Salvador - BA');
    });
  });

  describe('truncateText', () => {
    it('deve truncar texto que excede o limite', () => {
      const text = 'Este é um texto muito longo que precisa ser truncado';
      expect(truncateText(text, 20)).toBe('Este é um texto muito...');
    });

    it('não deve truncar texto dentro do limite', () => {
      const text = 'Texto curto';
      expect(truncateText(text, 20)).toBe('Texto curto');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('deve truncar exatamente no limite', () => {
      const text = '1234567890';
      expect(truncateText(text, 10)).toBe('1234567890');
    });
  });

  describe('capitalizeWords', () => {
    it('deve capitalizar cada palavra', () => {
      expect(capitalizeWords('hospital geral')).toBe('Hospital Geral');
    });

    it('deve converter para lowercase antes de capitalizar', () => {
      expect(capitalizeWords('HOSPITAL GERAL')).toBe('Hospital Geral');
    });

    it('deve retornar string vazia para input vazio', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('deve lidar com uma única palavra', () => {
      expect(capitalizeWords('hospital')).toBe('Hospital');
    });
  });

  describe('debounce', () => {
    it('deve atrasar a execução da função', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('deve cancelar chamadas anteriores', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('primeiro');
      debouncedFn('segundo');
      debouncedFn('terceiro');

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('terceiro');

      vi.useRealTimers();
    });

    it('deve passar argumentos corretamente', async () => {
      vi.useFakeTimers();
      const fn = vi.fn((a: number, b: number) => a + b);
      const debouncedFn = debounce(fn, 100);

      debouncedFn(2, 3);
      vi.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith(2, 3);

      vi.useRealTimers();
    });
  });

  describe('getGoogleMapsUrl', () => {
    it('deve gerar URL correta para busca', () => {
      const url = getGoogleMapsUrl('Hospital Geral', 'Salvador', 'BA');
      expect(url).toBe('https://www.google.com/maps/search/?api=1&query=Hospital%20Geral%20Salvador%20BA');
    });

    it('deve codificar caracteres especiais', () => {
      const url = getGoogleMapsUrl('Hospital & Clínica', 'São Paulo', 'SP');
      expect(url).toContain(encodeURIComponent('Hospital & Clínica'));
    });

    it('deve funcionar com strings vazias', () => {
      const url = getGoogleMapsUrl('', '', '');
      expect(url).toBe('https://www.google.com/maps/search/?api=1&query=');
    });
  });

  describe('isClient', () => {
    it('deve retornar true quando window está definido', () => {
      expect(isClient()).toBe(true);
    });

    it('deve retornar false quando window não está definido', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Simulando ambiente server-side
      delete global.window;

      expect(isClient()).toBe(false);

      global.window = originalWindow;
    });
  });
});