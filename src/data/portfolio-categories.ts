export const portfolioCategories = [
  {
    id: 'wedding-film',
    title: 'Wedding Film',
    formats: 'Horizontal',
    description: 'Histórias de casamento com emoção e identidade.',
  },
  {
    id: 'xv-anos',
    title: 'XV Anos',
    formats: 'Horizontal',
    description: 'Uma narrativa única para uma celebração especial.',
  },
  {
    id: 'after-movie',
    title: 'After Movie',
    formats: 'Vertical e horizontal',
    description: 'A energia e os melhores momentos de cada evento.',
  },
  {
    id: 'cultural',
    title: 'Cultural',
    formats: 'Vertical e horizontal',
    description: 'Imagens que valorizam expressões, encontros e identidade.',
  },
  {
    id: 'corporativo-institucional',
    title: 'Corporativo e Institucional',
    formats: 'Vertical e horizontal',
    description: 'Narrativas que comunicam a essência de marcas e organizações.',
  },
] as const;
export type PortfolioCategoryId = (typeof portfolioCategories)[number]['id'];
