/**
 * Testes unitários para o componente EmptyState
 * @module EmptyState.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('deve renderizar título e descrição', () => {
    render(<EmptyState />);

    expect(screen.getByText('Nenhuma unidade encontrada')).toBeInTheDocument();
    expect(screen.getByText(/não encontramos unidades para sua busca/i)).toBeInTheDocument();
  });

  it('deve mostrar query quando fornecida', () => {
    render(<EmptyState query="xyz123" />);

    expect(screen.getByText(/"xyz123"/)).toBeInTheDocument();
  });

  it('deve mostrar botão de voltar quando onBack é fornecido', () => {
    render(<EmptyState onBack={vi.fn()} />);

    expect(screen.getByRole('button', { name: /voltar para busca/i })).toBeInTheDocument();
  });

  it('não deve mostrar botão de voltar quando onBack não é fornecido', () => {
    render(<EmptyState />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('deve chamar onBack ao clicar no botão', async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    render(<EmptyState onBack={onBack} />);

    const button = screen.getByRole('button', { name: /voltar para busca/i });
    await user.click(button);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar ícone de busca vazia', () => {
    render(<EmptyState />);

    const icon = document.querySelector('.text-gray-400');
    expect(icon).toBeInTheDocument();
  });

  it('deve ter estrutura correta', () => {
    const { container } = render(<EmptyState />);

    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
  });
});