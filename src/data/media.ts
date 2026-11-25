import type { VideoSource } from '../components/media/responsive-video';

export const showreel: VideoSource = {
  src: `${import.meta.env.BASE_URL}media/videos/casamento.mp4`,
  poster: `${import.meta.env.BASE_URL}media/posters/casamento.webp`,
  description: 'Filme de casamento, exibido na horizontal.',
  rotateToLandscape: true,
};
export const portrait = {
  src: `${import.meta.env.BASE_URL}media/images/mario-gomes.png`,
  alt: 'Retrato em preto e branco de Mário Gomes olhando para o alto.',
  width: 791,
  height: 788,
};
