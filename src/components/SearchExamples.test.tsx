/**
 * Testes unitários para o componente SearchExamples
 * @module SearchExamples.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchExamples } from './SearchExamples';

describe('SearchExamples', () => {
  it('deve renderizar exemplos padrão', () => {
    render(<SearchExamples onExampleClick={vi.fn()} />);

    expect(screen.getByText('Exemplos:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'preventivo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'pé torcido' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'raio x' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'pediatra' })).toBeInTheDocument();
  });

  it('deve renderizar exemplos customizados', () => {
    const customExamples = ['hospital', 'clínica', 'posto'];
    render(<SearchExamples onExampleClick={vi.fn()} examples={customExamples} />);

    expect(screen.getByRole('button', { name: 'hospital' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'clínica' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'posto' })).toBeInTheDocument();
  });

  it('deve chamar onExampleClick ao clicar em um exemplo', async () => {
    const onExampleClick = vi.fn();
    const user = userEvent.setup();

    render(<SearchExamples onExampleClick={onExampleClick} />);

    const button = screen.getByRole('button', { name: 'preventivo' });
    await user.click(button);

    expect(onExampleClick).toHaveBeenCalledWith('preventivo');
    expect(onExampleClick).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onExampleClick com o exemplo correto', async () => {
    const onExampleClick = vi.fn();
    const user = userEvent.setup();

    render(<SearchExamples onExampleClick={onExampleClick} />);

    await user.click(screen.getByRole('button', { name: 'raio x' }));
    expect(onExampleClick).toHaveBeenCalledWith('raio x');

    await user.click(screen.getByRole('button', { name: 'pediatra' }));
    expect(onExampleClick).toHaveBeenCalledWith('pediatra');
  });

  it('deve renderizar array vazio sem erro', () => {
    render(<SearchExamples onExampleClick={vi.fn()} examples={[]} />);

    expect(screen.getByText('Exemplos:')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('todos os botões devem ter a classe de estilo correta', () => {
    render(<SearchExamples onExampleClick={vi.fn()} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('px-3', 'py-1', 'rounded-full');
    });
  });
});