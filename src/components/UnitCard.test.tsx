/**
 * Testes unitários para o componente UnitCard
 * @module UnitCard.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UnitCard } from './UnitCard';
import type { SearchUnit } from '@/types/api';

describe('UnitCard', () => {
  const mockUnit: SearchUnit = {
    id: 1,
    cnes: '0003859',
    name: 'HOSPITAL GERAL ROBERTO SANTOS',
    unit_type_name: 'HOSPITAL GERAL',
    district: 'Pituba',
    match_reason: 'Matched specialty: Ginecologia',
  };

  it('deve renderizar informações da unidade', () => {
    render(<UnitCard unit={mockUnit} />);

    expect(screen.getByText('HOSPITAL GERAL ROBERTO SANTOS')).toBeInTheDocument();
    expect(screen.getByText('HOSPITAL GERAL')).toBeInTheDocument();
    expect(screen.getByText('Pituba')).toBeInTheDocument();
    expect(screen.getByText('Matched specialty: Ginecologia')).toBeInTheDocument();
  });

  it('deve ter link correto para a página de detalhes', () => {
    render(<UnitCard unit={mockUnit} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/unidade/1');
  });

  it('deve renderizar sem bairro quando não informado', () => {
    const unitWithoutDistrict = { ...mockUnit, district: '' };
    render(<UnitCard unit={unitWithoutDistrict} />);

    expect(screen.queryByText('Pituba')).not.toBeInTheDocument();
  });

  it('deve renderizar sem match_reason quando não informado', () => {
    const unitWithoutMatchReason = { ...mockUnit, match_reason: '' };
    render(<UnitCard unit={unitWithoutMatchReason} />);

    expect(screen.queryByText('Matched specialty: Ginecologia')).not.toBeInTheDocument();
  });

  it('deve mostrar texto padrão quando unit_type_name está vazio', () => {
    const unitWithoutType = { ...mockUnit, unit_type_name: '' };
    render(<UnitCard unit={unitWithoutType} />);

    expect(screen.getByText('Unidade de Saúde')).toBeInTheDocument();
  });

  it('deve aplicar classes de estilo corretas', () => {
    render(<UnitCard unit={mockUnit} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('block', 'p-5', 'bg-white', 'border', 'rounded-xl');
  });

  it('deve truncar nome muito longo', () => {
    const unitWithLongName = {
      ...mockUnit,
      name: 'HOSPITAL MUNICIPAL DE SAÚDE DA FAMÍLIA E ESPECIALIDADES DR. JOSÉ SILVA',
    };
    render(<UnitCard unit={unitWithLongName} />);

    expect(screen.getByText(unitWithLongName.name)).toBeInTheDocument();
  });
});