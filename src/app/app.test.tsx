import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';

describe('Landing page', () => {
  it('mantém uma hierarquia semântica e não inventa um contato comercial', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Solicitar orçamento' })).toBeDisabled();
  });
  it('atualiza o contexto da timeline', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /03\s*Revisão/ }));
    expect(screen.getByRole('heading', { name: 'Revisão' })).toBeInTheDocument();
  });
});
