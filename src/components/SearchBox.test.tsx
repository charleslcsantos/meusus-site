/**
 * Testes unitários para o componente SearchBox
 * @module SearchBox.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  it('deve renderizar corretamente', () => {
    render(<SearchBox onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('O que você precisa? (ex: pediatra, raio x...)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('deve renderizar com valor inicial', () => {
    render(<SearchBox onSearch={vi.fn()} initialValue="pediatra" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('pediatra');
  });

  it('deve chamar onSearch ao submeter o formulário', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hospital');

    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('hospital');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onSearch ao pressionar Enter', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'raio x{enter}');

    expect(onSearch).toHaveBeenCalledWith('raio x');
  });

  it('não deve chamar onSearch com query vazia', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('não deve chamar onSearch com query contendo apenas espaços', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '   ');

    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('deve mostrar estado de loading', () => {
    render(<SearchBox onSearch={vi.fn()} isLoading={true} />);

    expect(screen.getByText(/buscando/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('deve desabilitar botão quando não há query', () => {
    render(<SearchBox onSearch={vi.fn()} />);

    const button = screen.getByRole('button', { name: /buscar/i });
    expect(button).toBeDisabled();
  });

  it('deve habilitar botão quando há query', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'teste');

    const button = screen.getByRole('button', { name: /buscar/i });
    expect(button).not.toBeDisabled();
  });

  it('deve aplicar placeholder customizado', () => {
    render(<SearchBox onSearch={vi.fn()} placeholder="Buscar unidades..." />);

    expect(screen.getByPlaceholderText('Buscar unidades...')).toBeInTheDocument();
  });

  it('deve focar no input quando autoFocus é true', () => {
    render(<SearchBox onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('deve trimar a query antes de chamar onSearch', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, '  hospital  ');

    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('hospital');
  });
});