# Design system — contrato pendente

Nenhuma direção artística foi definida nesta fase. O nome comercial é Mário Gomes; o nome conceitual é Beyond the Frame. Esses nomes não autorizam inferir paleta, tipografia, composição, efeitos ou narrativa visual.

## Pontos de extensão preparados

- `src/styles/tokens.css`: entrada futura de CSS Custom Properties.
- CSS Modules junto de cada componente: isolamento de estilos.
- `components/ui`, `layout`, `media` e `motion`: reservas de responsabilidade, sem componentes provisórios.
- `public/media/brand`: reserva para marca aprovada; nenhum logotipo criado.

## Decisões que aguardam especificação

Cores e contraste; fontes e respectivas licenças; escalas de espaçamento/tipografia; grids e breakpoints; estados de foco/hover/erro; componentes; ícones; composição e conteúdo; animações e alternativas com movimento reduzido; formatos e tratamento da mídia.

Após aprovação, registrar nome, finalidade e valor de cada token; derivar componentes de necessidades reais; manter conteúdo pt-BR e identificadores em inglês.

## Critérios para a próxima fase

HTML semântico, operação por teclado, foco visível, texto legível, contraste verificável, layout responsivo e respeito a prefers-reduced-motion. Não usar placeholders comerciais como se fossem material aprovado. A folha motion.css apenas reserva o tratamento da preferência, sem animação instalada ou implementada.
