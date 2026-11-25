import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  it('monta a raiz sem antecipar conteúdo comercial', () => {
    render(<App />);

    expect(screen.getByRole('main', { name: 'Base técnica do portfólio' })).toBeEmptyDOMElement();
  });

  it('permite desmontar e montar novamente sem estado residual', () => {
    const { unmount } = render(<App />);
    unmount();
    expect(screen.queryByRole('main')).not.toBeInTheDocument();

    render(<App />);
    expect(screen.getAllByRole('main')).toHaveLength(1);
  });
});
