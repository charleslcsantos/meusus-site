/**
 * Testes unitários para o componente InterpretationCard
 * @module InterpretationCard.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InterpretationCard } from './InterpretationCard';
import type { SearchInterpretation } from '@/types/api';

describe('InterpretationCard', () => {
  const mockInterpretation: SearchInterpretation = {
    group: {
      slug: 'saude_mulher',
      name: 'Saúde da Mulher',
    },
    intent: {
      slug: 'preventivo_rastreamento',
      name: 'Preventivo e Rastreamento',
    },
    targets: [
      {
        target_type: 'specialty',
        official_name: 'Ginecologia',
        weight: 0.93,
      },
      {
        target_type: 'procedure',
        official_name: 'Coleta Citopatológica',
        weight: 0.91,
      },
    ],
  };

  it('deve renderizar título', () => {
    render(<InterpretationCard interpretation={mockInterpretation} />);

    expect(screen.getByText(/entendemos sua busca como/i)).toBeInTheDocument();
  });

  it('deve renderizar grupo', () => {
    render(<InterpretationCard interpretation={mockInterpretation} />);

    expect(screen.getByText(/grupo:/i)).toBeInTheDocument();
    expect(screen.getByText('Saúde da Mulher')).toBeInTheDocument();
  });

  it('deve renderizar intenção', () => {
    render(<InterpretationCard interpretation={mockInterpretation} />);

    expect(screen.getByText(/intenção:/i)).toBeInTheDocument();
    expect(screen.getByText('Preventivo e Rastreamento')).toBeInTheDocument();
  });

  it('deve renderizar targets com pesos', () => {
    render(<InterpretationCard interpretation={mockInterpretation} />);

    expect(screen.getByText(/termos relacionados/i)).toBeInTheDocument();
    expect(screen.getByText('Ginecologia')).toBeInTheDocument();
    expect(screen.getByText('Coleta Citopatológica')).toBeInTheDocument();
    expect(screen.getByText('(93%)')).toBeInTheDocument();
    expect(screen.getByText('(91%)')).toBeInTheDocument();
  });

  it('deve renderizar sem targets quando array está vazio', () => {
    const interpretationWithoutTargets = {
      ...mockInterpretation,
      targets: [],
    };
    render(<InterpretationCard interpretation={interpretationWithoutTargets} />);

    expect(screen.queryByText(/termos relacionados/i)).not.toBeInTheDocument();
  });

  it('deve ter estrutura correta', () => {
    const { container } = render(<InterpretationCard interpretation={mockInterpretation} />);

    expect(container.firstChild).toHaveClass('bg-gradient-to-r', 'rounded-xl');
  });
});