import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { CinematicPortfolioMarquee } from './cinematic-portfolio-marquee';
import { portfolioWorks } from '../data/portfolio';
it('aceita um novo trabalho pelo arquivo de dados sem criar players nas esteiras', () => {
  const extra = {
    ...portfolioWorks[0]!,
    id: 'new-work',
    title: 'Novo trabalho',
    videoSrc: '/test-only.mp4',
    isPlaceholder: false,
  };
  const select = vi.fn();
  render(
    <CinematicPortfolioMarquee
      works={[...portfolioWorks, extra]}
      running={false}
      reduced
      onSelect={select}
    />,
  );
  expect(screen.getAllByRole('button')).toHaveLength(13);
  fireEvent.click(screen.getByRole('button', { name: 'Reproduzir Novo trabalho' }));
  expect(select).toHaveBeenCalledWith(extra);
  expect(document.querySelectorAll('video')).toHaveLength(0);
});
