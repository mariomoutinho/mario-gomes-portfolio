import { portfolioCategories } from './portfolio-categories';
export const siteContent = {
  name: 'Mário Gomes',
  whatsapp: '',
  message:
    'Olá, Mário! Conheci seu portfólio e gostaria de conversar sobre um projeto de edição de vídeo.',
};
export const contactUrl = siteContent.whatsapp
  ? `https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(siteContent.message)}`
  : undefined;

export const serviceFormats = portfolioCategories;

export const about = {
  presentation: 'Sou Mário Gomes, tenho 33 anos e sou de Juazeiro do Norte, no Ceará.',
  story:
    'Há seis anos trabalho com edição de vídeos, criando histórias personalizadas que respeitam a identidade de cada pessoa e projeto. Atendo clientes de todo o Brasil.',
  highlights: ['6 anos de experiência', 'Atendimento em todo o Brasil'],
};
