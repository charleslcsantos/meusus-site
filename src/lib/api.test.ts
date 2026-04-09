/**
 * Testes unitários para a camada de API
 * @module api.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchUnits, getUnitDetail, checkApiHealth, ApiRequestError } from './api';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('API Layer', () => {
  const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx';

  describe('searchUnits', () => {
    it('deve retornar resultados quando a busca é bem-sucedida', async () => {
      const result = await searchUnits('preventivo');

      expect(result).toBeDefined();
      expect(result.query).toBe('preventivo');
      expect(result.found).toBe(true);
      expect(result.units).toHaveLength(2);
      expect(result.interpretation).toBeDefined();
      expect(result.interpretation.group.name).toBe('Saúde da Mulher');
    });

    it('deve retornar array vazio quando não há resultados', async () => {
      const result = await searchUnits('naoexiste');

      expect(result.found).toBe(false);
      expect(result.units).toHaveLength(0);
    });

    it('deve lançar erro quando query está vazia', async () => {
      await expect(searchUnits('')).rejects.toThrow(ApiRequestError);
      await expect(searchUnits('')).rejects.toThrow('Termo de busca não pode estar vazio');
    });

    it('deve lançar erro quando query contém apenas espaços', async () => {
      await expect(searchUnits('   ')).rejects.toThrow(ApiRequestError);
    });

    it('deve codificar caracteres especiais na URL', async () => {
      const result = await searchUnits('pé torcido');
      expect(result.query).toBe('pé torcido');
    });

    it('deve tratar erro de rede', async () => {
      // Simula erro de rede
      server.use(
        http.get(`${API_BASE_URL}/search`, () => {
          return HttpResponse.error();
        })
      );

      await expect(searchUnits('teste')).rejects.toThrow(ApiRequestError);
    });

    it('deve tratar erro 500 do servidor', async () => {
      server.use(
        http.get(`${API_BASE_URL}/search`, () => {
          return HttpResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 }
          );
        })
      );

      await expect(searchUnits('teste')).rejects.toThrow(ApiRequestError);
    });
  });

  describe('getUnitDetail', () => {
    it('deve retornar detalhes da unidade quando encontrada', async () => {
      const result = await getUnitDetail(2);

      expect(result).toBeDefined();
      expect(result.found).toBe(true);
      expect(result.unit).toBeDefined();
      expect(result.unit.id).toBe(2);
      expect(result.unit.name).toBe('HOSPITAL GERAL ROBERTO SANTOS');
      expect(result.specialties).toBeDefined();
      expect(result.specialties.length).toBeGreaterThan(0);
      expect(result.services).toBeDefined();
      expect(result.procedures).toBeDefined();
    });

    it('deve lançar erro quando ID é inválido', async () => {
      await expect(getUnitDetail(0)).rejects.toThrow(ApiRequestError);
      await expect(getUnitDetail(0)).rejects.toThrow('ID da unidade inválido');
    });

    it('deve lançar erro quando ID é negativo', async () => {
      await expect(getUnitDetail(-1)).rejects.toThrow(ApiRequestError);
    });

    it('deve lançar erro quando ID é NaN', async () => {
      await expect(getUnitDetail(NaN)).rejects.toThrow(ApiRequestError);
    });

    it('deve tratar unidade não encontrada', async () => {
      await expect(getUnitDetail(999)).rejects.toThrow(ApiRequestError);
    });

    it('deve tratar erro de rede', async () => {
      server.use(
        http.get(`${API_BASE_URL}/units/:id`, () => {
          return HttpResponse.error();
        })
      );

      await expect(getUnitDetail(1)).rejects.toThrow(ApiRequestError);
    });
  });

  describe('checkApiHealth', () => {
    it('deve retornar true quando API está online', async () => {
      const isHealthy = await checkApiHealth();
      expect(isHealthy).toBe(true);
    });

    it('deve retornar false quando API está offline', async () => {
      server.use(
        http.get(`${API_BASE_URL}/search`, () => {
          return HttpResponse.error();
        })
      );

      const isHealthy = await checkApiHealth();
      expect(isHealthy).toBe(false);
    });
  });

  describe('ApiRequestError', () => {
    it('deve criar erro com mensagem, status e code', () => {
      const error = new ApiRequestError('Mensagem de erro', 404, 'NOT_FOUND');

      expect(error.message).toBe('Mensagem de erro');
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.name).toBe('ApiRequestError');
    });

    it('deve criar erro apenas com mensagem', () => {
      const error = new ApiRequestError('Erro simples');

      expect(error.message).toBe('Erro simples');
      expect(error.status).toBeUndefined();
      expect(error.code).toBeUndefined();
    });
  });
});