export interface PortfolioWork {
  id: string;
  title: string;
  category: string;
  orientation: 'portrait' | 'landscape';
  posterSrc: string;
  posterAlt: string;
  videoSrc: string | null;
  isPlaceholder: boolean;
  sourceCredit?: { url: string; license: string; label: string };
  captions?: { src: string; language: string; label: string }[];
}
const examples = [
  [
    'documentary-portrait',
    'Presença',
    'Retrato documental',
    'portrait',
    'Retrato de um homem diante de um fundo escuro.',
    '1506794778202-cad84cf45f1d',
  ],
  [
    'abstract-motion',
    'Frequência',
    'Motion Design abstrato',
    'portrait',
    'Composição abstrata de luz e cor.',
    '1550859492-d5da9d8e45f3',
  ],
  [
    'digital-content',
    'Conexões',
    'Conteúdo digital',
    'portrait',
    'Mãos apontando para a tela de um notebook.',
    '1516321318423-f06f85e504b3',
  ],
  [
    'product-story',
    'Essência',
    'Publicidade de produto',
    'portrait',
    'Relógio em uma composição limpa de produto.',
    '1523275335684-37898b6baf30',
  ],
  [
    'urban-narrative',
    'Entre ruas',
    'Narrativa urbana',
    'portrait',
    'Arquitetura urbana iluminada ao anoitecer.',
    '1519608487953-e999c86e7455',
  ],
  [
    'creative-production',
    'Ponto de vista',
    'Produção criativa',
    'portrait',
    'Câmera fotográfica em um enquadramento de detalhes.',
    '1516035069371-29a1b244cc32',
  ],
  [
    'cinematic-landscape',
    'Horizontes',
    'Paisagem cinematográfica',
    'landscape',
    'Montanhas e árvores refletidas em um lago.',
    '1470770841072-f978cf4d019e',
  ],
  [
    'institutional-space',
    'Espaços',
    'Produção institucional',
    'landscape',
    'Corredor de um ambiente de trabalho com salas envidraçadas.',
    '1497366216548-37526070297c',
  ],
  [
    'documentary-interview',
    'Vozes',
    'Entrevista documental',
    'landscape',
    'Microfone de estúdio em primeiro plano.',
    '1478737270239-2f02b77fc618',
  ],
  [
    'commercial-story',
    'Ritual',
    'Publicidade comercial',
    'landscape',
    'Mãos segurando três xícaras de café em uma composição de produto.',
    '1495474472287-4d71bcdd2085',
  ],
  [
    'human-narrative',
    'Laços',
    'Narrativa humana',
    'landscape',
    'Grupo de pessoas abraçadas ao ar livre, de costas para o pôr do sol.',
    '1511632765486-a01980e01a18',
  ],
  [
    'artistic-production',
    'Luz em cena',
    'Produção artística',
    'landscape',
    'Mãos segurando uma claquete em uma gravação ao ar livre.',
    '1485846234645-a62644f84728',
  ],
] as const;
// Imagens de referência: estes títulos e categorias NÃO descrevem trabalhos de Mário Gomes.
export const portfolioWorks: PortfolioWork[] = examples.map(
  ([id, title, category, orientation, posterAlt, photo]) => ({
    id,
    title,
    category,
    orientation,
    posterAlt,
    posterSrc: `/media/portfolio/${id}.webp`,
    videoSrc: null,
    isPlaceholder: true,
    sourceCredit: {
      url: `https://images.unsplash.com/photo-${photo}`,
      license: 'https://unsplash.com/license',
      label: 'Imagem ilustrativa / Unsplash',
    },
  }),
);
