/**
 * Testes unitários para o componente LoadingState
 * @module LoadingState.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('deve renderizar com mensagem padrão', () => {
    render(<LoadingState />);

    expect(screen.getByText('Buscando unidades de saúde...')).toBeInTheDocument();
  });

  it('deve renderizar com mensagem customizada', () => {
    render(<LoadingState message="Carregando dados..." />);

    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });

  it('deve renderizar ícone de loading', () => {
    render(<LoadingState />);

    const loader = document.querySelector('.animate-spin');
    expect(loader).toBeInTheDocument();
  });

  it('deve ter estrutura correta', () => {
    const { container } = render(<LoadingState />);

    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
  });
});