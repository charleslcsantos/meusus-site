/**
 * Setup file for Vitest
 * Configura o ambiente de testes
 */

import '@testing-library/jest-dom';
import { vi, beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server';

// Inicia o MSW server antes de todos os testes
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reseta handlers após cada teste
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

// Fecha o server após todos os testes
afterAll(() => {
  server.close();
});

// Mock do matchMedia (usado por alguns componentes)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock do IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock do scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do import.meta.env
vi.mock('import.meta.env', () => ({
  PUBLIC_API_BASE_URL: 'https://x8ki-letl-twmt.n7.xano.io/api:0ZLogqvx',
}));