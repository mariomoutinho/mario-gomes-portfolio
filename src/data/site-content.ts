import { portfolioCategories } from './portfolio-categories';
export const siteContent = {
  name: 'Mário Gomes',
  whatsapp: '',
  message:
    'Olá, Mário! Conheci seu portfólio e gostaria de conversar sobre um projeto de edição de vídeo.',
  steps: [
    {
      title: 'Briefing',
      position: 8,
      description: 'Uma conversa para entender a ideia, a intenção e os materiais do projeto.',
    },
    {
      title: 'Edição',
      position: 38,
      description: 'O material ganha sequência, ritmo e uma narrativa visual.',
    },
    {
      title: 'Revisão',
      position: 70,
      description: 'Um momento para alinhar os ajustes e refinar o resultado.',
    },
    {
      title: 'Entrega',
      position: 94,
      description: 'A versão final é preparada no formato combinado para o projeto.',
    },
  ],
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
