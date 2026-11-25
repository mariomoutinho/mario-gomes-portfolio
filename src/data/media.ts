import type { VideoSource } from '../components/media/responsive-video';
export interface PortfolioItem {
  name: string;
  category: string;
  description: string;
  image: string;
  width: number;
  height: number;
  video?: VideoSource;
}
// Preencher somente com mídia real e autorizada, acompanhada de alternativa textual.
export const showreel: VideoSource | null = null;
export const portrait: { src: string; alt: string } | null = null;
export const portfolio: PortfolioItem[] = [];
