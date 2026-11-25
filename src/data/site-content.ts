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

export const serviceFormats = [
  { title: 'Reels', description: 'Ritmo e cortes para histórias curtas nas redes.' },
  { title: 'Stories', description: 'Sequências verticais para compartilhar cada momento.' },
  { title: 'Casamentos', description: 'Uma narrativa que preserva os detalhes e a emoção.' },
  { title: 'Formaturas', description: 'Conquistas e memórias reunidas em um filme.' },
  { title: 'YouTube', description: 'Estrutura e fluidez para conteúdos mais longos.' },
  { title: 'Institucionais', description: 'Imagens que apresentam a identidade de uma marca.' },
  { title: 'Eventos', description: 'Os momentos que contam a história do encontro.' },
  { title: 'Campanhas', description: 'Edição com intenção para comunicar uma ideia.' },
];
