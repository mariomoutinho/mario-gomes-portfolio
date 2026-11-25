import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PortfolioVideoPlayer } from './portfolio-video-player';
import { portfolioWorks } from '../../data/portfolio';

describe('Visualização de portfólio', () => {
  it('identifica a imagem ilustrativa e oferece fechamento', () => {
    const close = vi.fn();
    render(<PortfolioVideoPlayer work={portfolioWorks[0]!} onClose={close} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Não é um trabalho de Mário Gomes/)).toBeInTheDocument();
    expect(document.querySelector('video')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Fechar visualização' }));
    expect(close).toHaveBeenCalledOnce();
  });
  it('recebe vídeo e legendas apenas no player ampliado', () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    const work = {
      ...portfolioWorks[0]!,
      videoSrc: '/test-only.mp4',
      isPlaceholder: false,
      captions: [{ src: '/test-only.vtt', language: 'pt-BR', label: 'Português' }],
    };
    const { unmount } = render(<PortfolioVideoPlayer work={work} onClose={() => {}} />);
    expect(document.querySelectorAll('video')).toHaveLength(1);
    expect(document.querySelector('video')).toHaveAttribute('controls');
    expect(document.querySelector('source')).toHaveAttribute('src', '/test-only.mp4');
    expect(document.querySelector('track')).toHaveAttribute('srclang', 'pt-BR');
    unmount();
    expect(pause).toHaveBeenCalled();
    pause.mockRestore();
  });
});
