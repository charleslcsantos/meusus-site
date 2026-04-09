/**
 * Testes unitários para o componente ErrorState
 * @module ErrorState.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('deve renderizar com mensagem padrão', () => {
    render(<ErrorState />);

    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Ocorreu um erro ao buscar os dados.')).toBeInTheDocument();
  });

  it('deve renderizar com mensagem customizada', () => {
    render(<ErrorState message="Erro de conexão com o servidor" />);

    expect(screen.getByText('Erro de conexão com o servidor')).toBeInTheDocument();
  });

  it('deve renderizar ícone de erro', () => {
    render(<ErrorState />);

    const icon = document.querySelector('.text-red-500');
    expect(icon).toBeInTheDocument();
  });

  it('deve mostrar botão de retry quando onRetry é fornecido', () => {
    render(<ErrorState onRetry={vi.fn()} />);

    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
  });

  it('não deve mostrar botão de retry quando onRetry não é fornecido', () => {
    render(<ErrorState />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('deve chamar onRetry ao clicar no botão', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(<ErrorState onRetry={onRetry} />);

    const button = screen.getByRole('button', { name: /tentar novamente/i });
    await user.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('deve ter estrutura correta', () => {
    const { container } = render(<ErrorState />);

    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
  });
});