/**
 * MSW Server setup
 * Configuração do servidor de mock para testes
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);