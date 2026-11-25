# Design system — implementação autorizada

Especificação fornecida pelo usuário em 25/11/2026, reproduzida abaixo como fonte única da direção visual. A atualização Cinematic Portfolio Marquee, ao final deste documento, substitui exclusivamente as regras anteriores do Ato 03; as demais seções são preservadas.

## Estado da integração

- Paleta, tipografia e movimento centralizados em `src/styles/tokens.css`. Manrope variável e IBM Plex Mono regular servidas localmente em `public/fonts`, acompanhadas das licenças OFL obtidas no repositório oficial google/fonts.
- Composição mobile first, margens de 16/20/32/64px, conteúdo até 1280px e cortes entre superfícies claras e escuras.
- Componentes: Header com dialog modal, CinematicAmbientLight, CinematicLightFlow, CinematicReveal, ResponsiveVideo, CinematicPortfolioMarquee, MarqueeTrack, PortfolioMediaCard, PortfolioVideoPlayer, MarqueeControls, ServiceAccordion, ProductionTimeline e RippleLink.
- Movimento ambiental controlado por IntersectionObserver, visibilidade do documento, preferência de movimento reduzido e pausa global. Revelações executadas uma vez; conteúdo permanece disponível sem observer.
- O retrato profissional fornecido pelo usuário está integrado à seção Sobre. O vídeo de casamento e a logo MG fornecidos pelo usuário estão integrados; o contato comercial permanece pendente. A atualização autoriza 12 imagens ilustrativas locais exclusivamente no portfólio; elas não representam trabalhos, clientes ou serviços de Mário Gomes. Os demais espaços permanecem pendentes.
- `src/data/media.ts` recebe showreel e fotografia; `src/data/portfolio.ts` centraliza os itens das esteiras, créditos e futuras fontes de vídeo; `src/data/site-content.ts` recebe serviços, etapas e WhatsApp. Somente edição de vídeo foi incluída como serviço, por ser a atividade fornecida no pedido. Etapas e textos do processo são provisórios e exigem validação profissional.
- Sem vídeos definitivos, a página atual amplia imagens ilustrativas no modal acessível; não há parallax aplicado. O modal oferece vídeo nativo e legendas ao preencher videoSrc e captions. O player integrado está preparado para vídeo inline, mute, reprodução manual, pausa dos demais vídeos, progresso, poster e descrição textual. Autoplay só é tentado sem redução de movimento e sem conexão econômica/lenta detectada. Legendas precisam ser avaliadas por vídeo antes de integrar material com fala.
- CTA final indisponível até informar WhatsApp real. Ripple e borda animada são implementados no link comercial que aparece ao configurar o número.
- FAQ, ferramentas e prova social omitidos por ausência de conteúdo verificado. Logo MG fornecida pelo usuário aplicada ao cabeçalho, menu mobile e rodapé, com apresentação clara por CSS sobre fundo escuro. Favicon de marca e imagem OG aguardam material aprovado; domínio, canonical, sitemap e indexação aguardam publicação autorizada.
- Metas LCP/INP/CLS ainda não foram medidas; dependem também da mídia final. Não há declaração de conformidade completa de acessibilidade.

---

# ESPECIFICAÇÃO DE IMPLEMENTAÇÃO

# Mário Gomes — Beyond the Frame

## 01. Ordem de execução

Implemente a landing page profissional de Mário Gomes, editor de vídeo, seguindo rigorosamente esta especificação de direção artística, design, experiência do usuário e comportamento técnico.

A direção artística já foi elaborada e definida previamente.

Não realize novas explorações conceituais, não proponha alternativas de layout e não desenvolva outras identidades visuais.

Não solicite aprovação intermediária para decisões já estabelecidas neste documento.

Sua autonomia está limitada às decisões de engenharia necessárias para executar a especificação, respeitando a arquitetura existente.

Priorize a implementação funcional e a fidelidade visual.

Evite gastar recursos computacionais com pesquisas extensas, comparações entre frameworks, elaboração de novas propostas artísticas ou documentação redundante.

## 02. Inspeção inicial

Antes de modificar o projeto:

1. Inspecione a estrutura existente do repositório.
2. Identifique a stack e as convenções utilizadas.
3. Localize os materiais de identidade visual.
4. Localize fotografias, vídeos, thumbnails e arquivos de portfólio.
5. Identifique os conteúdos comerciais disponíveis.
6. Identifique os componentes que podem ser reutilizados.
7. Verifique o estado atual do Git.

Preserve funcionalidades existentes que não estejam relacionadas à tarefa.

Não substitua a stack, não reinicialize o projeto e não descarte arquivos existentes sem necessidade técnica.

Caso o projeto esteja vazio, utilize React, TypeScript e Vite, com CSS modular ou a configuração de estilos já disponível.

Não adicione bibliotecas de animação quando CSS e APIs nativas do navegador forem suficientes.

O nome profissional utilizado em toda a interface deverá ser Mário Gomes.

Não utilize Carlos Mário ou outras variações.

## 03. Conceito artístico obrigatório

Nome conceitual: Beyond the Frame — Além do enquadramento.

Direção artística: Editorial Cinematográfica.

A interface deverá combinar:

- Design editorial contemporâneo.
- Composição cinematográfica.
- Iluminação ambiental azul.
- Superfícies de vidro translúcido.
- Formas abstratas orgânicas.
- Movimento controlado.
- Tipografia expressiva.
- Contrastes entre ambientes claros e escuros.
- Imagens e vídeos como elementos protagonistas.

A landing page deverá apresentar a sensação de uma produção audiovisual dividida em atos.

A navegação deverá seguir esta progressão:

Impacto visual → posicionamento profissional → demonstração de qualidade → conexão humana → compreensão dos serviços → confiança no processo → contato comercial.

Não apresente o conceito Beyond the Frame obrigatoriamente como slogan público. Utilize-o como referência interna de direção artística.

## 04. Sistema de identidade visual

### 04.1 Paleta cromática

Utilize os seguintes tokens:

- color-black: #08090D
- color-dark: #0D111B
- color-dark-blue: #101B33
- color-deep-blue: #172E5E
- color-primary: #315DCD
- color-blue-light: #7199F4
- color-blue-glow: #ABC8FF
- color-white: #FFFFFF
- color-editorial: #F4F3F0
- color-text-dark: #151922
- color-text-muted-light: #A7B2C7
- color-text-muted-dark: #575F6C
- color-border-dark: rgba(255,255,255,0.12)
- color-glass: rgba(255,255,255,0.07)

Preserve o preto, o branco e o azul como identidade predominante.

Não introduza roxo, verde fluorescente, rosa ou outros acentos cromáticos nos elementos decorativos.

As imagens e os vídeos do portfólio deverão preservar suas cores originais.

Não aplique filtros azuis indiscriminadamente sobre os trabalhos audiovisuais.

### 04.2 Distribuição cromática por seção

- Cabeçalho: preto profundo ou vidro escuro.
- Abertura: preto profundo com iluminação azul.
- Posicionamento: branco editorial.
- Portfólio: preto profundo.
- Sobre: branco editorial.
- Serviços: preto azulado com gradiente orgânico.
- Processo: azul muito escuro.
- Prova social, quando existente: branco editorial.
- FAQ, quando existente: branco editorial.
- Contato final: composição artística azul sobre preto.
- Rodapé: preto profundo.

As mudanças entre fundos claros e escuros deverão ser intencionais.

Não utilize gradientes para suavizar todas as transições entre seções. Algumas transições deverão ser cortes visuais limpos, semelhantes aos cortes de uma montagem audiovisual.

### 04.3 Tipografia

Utilize Manrope como família principal e IBM Plex Mono para elementos técnicos.

Caso a identidade existente já possua tipografias oficiais, preserve-as.

Manrope deverá ser utilizada em:

- Títulos.
- Textos.
- Botões.
- Navegação.
- Informações comerciais.

IBM Plex Mono deverá ser utilizada exclusivamente em:

- Numeração das seções.
- Marcadores de tempo.
- Informações técnicas.
- Timeline.
- Categorias audiovisuais.
- Indicadores discretos.

Escala tipográfica mobile:

- Display: clamp(36px, 10vw, 48px).
- Título de seção: clamp(30px, 8vw, 38px).
- Título de componente: 20px a 24px.
- Texto principal: 16px.
- Texto secundário: 14px.
- Metadados: 11px a 12px.
- Botões: 15px a 16px.

Escala tipográfica desktop:

- Display: 72px a 96px.
- Título de seção: 48px a 64px.
- Título de componente: 24px a 28px.
- Texto principal: 17px a 18px.

Títulos expressivos deverão utilizar peso entre 600 e 800, entrelinha compacta e letter-spacing discretamente negativo.

Não utilize tipografia excessivamente pequena para criar uma aparência sofisticada.

## 05. Sistema de layout

Utilize uma escala de espaçamento baseada nos seguintes valores:

4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 e 128 pixels.

Margens horizontais:

- Até 359px: 16px.
- De 360px a 767px: 20px.
- De 768px a 1023px: 32px.
- A partir de 1024px: 64px.

Largura máxima do conteúdo: 1280px.

Espaçamento vertical entre seções:

- Mobile: 72px a 96px.
- Desktop: 112px a 144px.

As imagens principais poderão ultrapassar as margens convencionais quando a composição exigir impacto visual.

Utilize predominantemente cantos discretos:

- Imagens e vídeos: 4px a 8px.
- Cards editoriais: 6px a 12px.
- Superfícies de vidro: 8px a 12px.
- Botões comerciais: 6px.
- Botões circulares: exclusivamente controles de mídia e ícones apropriados.

Evite transformar todos os elementos em componentes arredondados.

O design deve possuir uma linguagem editorial, e não a aparência de um painel administrativo ou aplicativo SaaS.

## 06. Cabeçalho

Altura mobile: 64px.

Altura desktop: 80px.

Estrutura mobile:

- Logotipo à esquerda.
- Botão de menu à direita.
- Alinhamento vertical central.
- Área de toque mínima de 44px.

Estrutura desktop:

- Logotipo à esquerda.
- Navegação central ou alinhada à direita.
- Botão de contato na extremidade direita.

Utilize a versão aprovada do logotipo de Mário Gomes presente nos materiais do projeto.

Não redesenhe o símbolo.

Caso o arquivo definitivo não esteja disponível, utilize temporariamente o nome Mário Gomes em uma composição tipográfica simples, sem inventar outro símbolo.

O cabeçalho deverá permanecer transparente ou integrado à abertura enquanto estiver no topo da página.

Após aproximadamente 24px de rolagem, deverá assumir uma superfície de Glassmorphism:

- Background: rgba(8,9,13,0.85).
- Backdrop-filter: blur(12px).
- Borda inferior: 1px solid rgba(255,255,255,0.10).
- Transição: 250ms.

O menu mobile deverá abrir um painel escuro com links organizados verticalmente.

Não utilize uma animação longa de abertura.

O menu deverá possuir controle de fechamento, gerenciamento de foco e fechamento após seleção de um link.

## 07. Ato 01 — Abertura cinematográfica

### Composição

A primeira tela deverá ser predominantemente audiovisual.

Não coloque um título comercial grande, parágrafo descritivo ou conjunto de botões antes das imagens.

No mobile, a primeira área visível deverá apresentar:

- Cabeçalho.
- Enquadramento audiovisual protagonista.
- Controle de reprodução.
- Controle de áudio, quando aplicável.
- Indicador discreto de progresso.
- Indicação visual de continuidade da rolagem.

O conteúdo comercial será apresentado na seção imediatamente seguinte.

Altura de referência da abertura:

- Mobile: calc(100svh - 64px), respeitando a acessibilidade e a disponibilidade de espaço.
- Desktop: entre 78svh e 90svh.

Utilize um showreel real, quando disponível.

Caso exista um vídeo vertical, utilize-o preferencialmente no mobile.

Caso exista apenas vídeo horizontal, preserve os elementos importantes do enquadramento. Não corte rostos, textos ou áreas relevantes simplesmente para preencher toda a tela.

Utilize uma composição de imagem de capa e vídeo quando não houver um enquadramento vertical apropriado.

Não utilize paisagens ou vídeos genéricos como substitutos de portfólio real.

### Reprodução audiovisual

Implemente:

- Poster otimizado.
- Reprodução inline.
- Reprodução automática sem áudio apenas quando permitida e adequada.
- Controle explícito para ativar o som.
- Controle de reprodução e pausa.
- Carregamento adaptado às condições disponíveis.
- Imagem de capa como alternativa caso o vídeo não possa ser reproduzido.

Nunca reproduza áudio automaticamente.

Não bloqueie a renderização da página enquanto o vídeo é carregado.

Quando o usuário solicitar redução de movimento, priorize a imagem de capa estática e permita reprodução manual.

### Efeito visual: iluminação cinematográfica adaptativa

Implemente um componente chamado CinematicAmbientLight.

Esse componente combinará Animated Aurora Background e Ambient Spotlight em uma única composição.

Utilize até três gradientes radiais:

- Azul profundo na região superior esquerda.
- Azul cobalto na região lateral direita.
- Azul luminoso de baixa intensidade na região inferior.

Parâmetros:

- Opacidade individual: entre 0.08 e 0.22.
- Raio aproximado: 35% a 55% da área.
- Duração do movimento: 18 a 24 segundos.
- Deslocamento máximo: 8% da composição.
- Curva: ease-in-out.
- Movimento alternado.
- Sem mudanças bruscas de intensidade.

No mobile, o movimento deverá ser automático e atmosférico.

No desktop, dispositivos com pointer fine e hover disponível poderão utilizar Mouse Spotlight.

Parâmetros desktop:

- Raio: 260px.
- Cor: rgba(113,153,244,0.12).
- Gradiente radial com término transparente.
- Acompanhamento suavizado.
- Desaparecimento após saída do cursor: 500ms.

A iluminação deverá atuar principalmente nas margens e no ambiente visual ao redor do conteúdo audiovisual.

Não clareie permanentemente o vídeo do portfólio.

### Controles em Glassmorphism

O botão de reprodução deverá ser circular:

- Dimensão: 56px no mobile e 72px no desktop.
- Background: rgba(255,255,255,0.14).
- Borda: 1px solid rgba(255,255,255,0.35).
- Backdrop-filter: blur(10px).
- Ícone branco.
- Feedback de pressão por escala de 0.96.

Os demais controles deverão seguir a mesma linguagem visual.

## 08. Ato 02 — Posicionamento profissional

Fundo: #F4F3F0.

Esta seção deverá criar um contraste imediato com a abertura cinematográfica.

Utilize:

- Identificador editorial em fonte monoespaçada.
- Título expressivo.
- Descrição profissional curta.
- Botão para explorar o portfólio.
- Acesso ao contato comercial.

Texto conceitual provisório, caso ainda não exista conteúdo aprovado:

Identificador: MÁRIO GOMES — EDIÇÃO DE VÍDEO

Título:

Imagens ganham sentido.

Descrição:

Edição de vídeo que transforma imagens em narrativas, conectando ritmo, intenção e identidade visual.

CTA principal: Conheça meu trabalho.

CTA secundário: Solicitar orçamento.

Preserve textos comerciais aprovados que já existam.

Composição mobile:

- Alinhamento à esquerda.
- Título dividido naturalmente em duas ou três linhas.
- Espaçamento generoso.
- Uma palavra ou trecho em azul.
- CTA abaixo da descrição.

Composição desktop:

- Título ocupando aproximadamente sete colunas de uma grade de doze.
- Descrição e CTAs ocupando as colunas restantes.
- Alinhamento editorial assimétrico.

Efeito visual: Cinematic Mask Reveal.

Revele as linhas do título com máscaras de overflow hidden, utilizando deslocamento vertical interno de até 100% da altura da linha.

Duração: 600ms.

Intervalo entre linhas: 80ms.

Execute uma única vez.

A descrição deverá entrar com opacidade progressiva e deslocamento vertical de 12px.

Não aplique efeitos de digitação, letras embaralhadas ou movimentos tipográficos contínuos.

## 09. Ato 03 — Portfólio audiovisual

Fundo: #08090D.

Identificador editorial: PORTFÓLIO / TRABALHOS SELECIONADOS.

Título sugerido: Em movimento.

O portfólio será a seção visualmente mais importante depois da abertura.

### Estrutura mobile

Apresente uma sequência editorial vertical.

Cada projeto deverá possuir:

1. Numeração editorial.
2. Imagem de capa ou thumbnail.
3. Controle de reprodução quando houver vídeo.
4. Nome real do projeto.
5. Categoria.
6. Descrição curta, quando disponível.

Alterne proporções de enquadramento de acordo com o formato original dos trabalhos.

Vídeos verticais poderão utilizar proporção 9:16.

Vídeos horizontais poderão utilizar proporção 16:9.

Imagens editoriais poderão utilizar 4:5 ou outras proporções justificadas pelos materiais.

Não force todos os projetos a assumir a mesma proporção.

Não esconda o portfólio inteiro dentro de um carrossel.

### Estrutura desktop

Utilize composição editorial de doze colunas.

Organização:

- Primeiro projeto: destaque de largura total.
- Projetos seguintes: composição assimétrica em sete e cinco colunas quando os formatos permitirem.
- Projetos adicionais: alternância entre imagens amplas e enquadramentos menores.

Não utilize uma grade repetitiva de cards idênticos.

### Animações

Implemente Cinematic Mask Reveal nas imagens.

A imagem deverá ser revelada de baixo para cima por meio de uma máscara.

Utilize duração de aproximadamente 650ms e curva cubic-bezier(0.22,1,0.36,1).

A animação deverá acontecer quando aproximadamente 15% do elemento entrar na área visível.

Execute apenas uma vez.

Aplique parallax exclusivamente em imagens selecionadas:

- Deslocamento máximo mobile: 12px.
- Deslocamento máximo desktop: 28px.
- Não aplique parallax aos textos.
- Não altere a velocidade nativa da rolagem.
- Não utilize scroll hijacking.

### Reprodução

Carregue vídeos adicionais sob demanda.

Ao iniciar um vídeo, pause outros vídeos ativos.

Permita fechar a reprodução ampliada, quando existente, por botão, tecla Escape e mecanismos acessíveis.

Não invente projetos, clientes, categorias ou resultados.

## 10. Ato 04 — Sobre Mário Gomes

Fundo: #F4F3F0.

Título sugerido: Por trás de cada frame.

Utilize a fotografia real do profissional.

### Mobile

Organização vertical:

- Fotografia.
- Identificador editorial.
- Título.
- Apresentação profissional.
- Informações complementares verificadas.

### Desktop

Fotografia ocupando aproximadamente cinco colunas e texto ocupando seis colunas, com uma coluna de separação.

Utilize a imagem em uma composição editorial limpa.

Não aplique formas orgânicas sobre o rosto.

Não adicione efeitos luminosos intensos.

Não utilize Glassmorphism nesta seção.

O objetivo é criar uma pausa visual e estabelecer proximidade humana.

Animação:

- Fotografia: revelação por máscara de 600ms.
- Texto: opacidade e translateY de 12px.
- Duração: 500ms.
- Execução única.

Utilize somente informações profissionais reais.

## 11. Ato 05 — Serviços

Fundo: composição Cinematic Light Flow em preto e azul.

Título sugerido: Possibilidades.

Subtítulo: Soluções audiovisuais para diferentes formas de contar histórias.

Utilize exclusivamente os serviços informados no briefing ou nos materiais existentes.

Não invente especialidades.

### Composição dos serviços

No mobile, organize os serviços em componentes expansíveis com linguagem editorial.

Estado recolhido:

- Numeração monoespaçada.
- Nome do serviço.
- Ícone de expansão.

Estado expandido:

- Descrição.
- Informações complementares.
- Exemplos reais, quando disponíveis.

Apenas um serviço deverá permanecer expandido por vez.

O visitante poderá fechar o serviço ativo.

No desktop, utilize a mesma estrutura em duas colunas quando houver conteúdo suficiente.

### Glassmorphism

Os componentes deverão utilizar:

- Background: rgba(255,255,255,0.07).
- Backdrop-filter: blur(12px).
- Borda: 1px solid rgba(255,255,255,0.16).
- Border-radius: 8px.
- Padding mobile: 20px.
- Padding desktop: 28px.

O componente expandido poderá utilizar:

- Background: rgba(113,153,244,0.12).
- Borda azul translúcida.

Não utilize sombras neon intensas.

### Touch Spotlight

Quando o usuário tocar em um componente, produza uma iluminação radial discreta no ponto de contato.

Parâmetros:

- Raio: 130px.
- Cor: rgba(171,200,255,0.18).
- Camada com pointer-events: none.
- Entrada: 120ms.
- Desaparecimento: 650ms.

Não capture ou bloqueie gestos de rolagem.

Não mantenha a iluminação permanentemente ativa após o toque.

Em desktop, o mesmo componente poderá reagir à passagem do cursor.

### Expansão

Utilize uma animação de expansão de aproximadamente 280ms.

Preserve a acessibilidade dos controles expansíveis.

Utilize aria-expanded e associação adequada entre controle e conteúdo.

## 12. Ato 06 — Processo de trabalho

Fundo: #0D111B.

Título sugerido: Do material bruto ao resultado final.

Implemente uma timeline inspirada na interface de um software de edição audiovisual.

Nome do componente: ProductionTimeline.

### Estrutura visual

A timeline deverá conter:

- Régua temporal decorativa.
- Trilhas identificadas como V2, V1 e A1.
- Segmentos azuis representando etapas.
- Representação gráfica estática de ondas sonoras.
- Playhead vertical luminoso.
- Seletores de etapas.
- Descrição contextual.

Não implemente um editor de vídeo real.

Não implemente arrastar segmentos, cortar arquivos ou manipular mídia.

A representação será exclusivamente uma interface narrativa para explicar o processo comercial.

### Etapas

Utilize as etapas reais fornecidas pelo profissional.

Caso ainda não tenham sido definidas, utilize provisoriamente:

1. Briefing.
2. Edição.
3. Revisão.
4. Entrega.

Centralize esses conteúdos em um arquivo de configuração e registre sua necessidade de validação.

### Comportamento

Ao selecionar uma etapa:

- Atualize o estado ativo.
- Desloque o playhead para o ponto correspondente.
- Destaque visualmente o segmento selecionado.
- Atualize a descrição contextual.
- Atualize os atributos de acessibilidade.

Posições conceituais:

- Briefing: 8%.
- Edição: 38%.
- Revisão: 70%.
- Entrega: 94%.

Transição do playhead: 450ms.

Transição do conteúdo: 200ms.

Não reproduza áudio.

Não utilize um cronômetro real.

Caso existam marcações temporais, deixe evidente seu caráter ilustrativo.

No mobile, organize os seletores em duas colunas e duas linhas, com áreas de toque confortáveis.

A timeline deverá caber na largura disponível sem gerar rolagem horizontal na página.

No desktop, apresente a timeline de um lado e a descrição da etapa do outro.

## 13. Prova social, habilidades e FAQ

Implemente estas seções somente quando houver conteúdo correspondente nos materiais existentes.

Posicione-as após a apresentação do processo e antes do contato final.

Fundo: #F4F3F0.

Direção visual: editorial, clara e estática.

### Prova social

Apresente apenas marcas, clientes e depoimentos reais cuja utilização seja apropriada.

Não invente números, avaliações ou resultados comerciais.

### Ferramentas e habilidades

Apresente as ferramentas efetivamente utilizadas pelo profissional.

Utilize composição tipográfica discreta.

Não transforme essa seção em uma grade excessiva de logotipos.

### FAQ

Utilize perguntas reais ou informações comerciais verificadas.

Implemente componentes expansíveis acessíveis.

Não utilize fundos animados, Spotlight ou Glassmorphism nestas seções.

Elas deverão funcionar como momento de repouso visual antes do encerramento artístico.

## 14. Ato 07 — Contato e encerramento

Esta será a segunda seção de maior expressão artística da landing page.

Título:

Sua próxima história começa aqui.

Descrição provisória:

Da primeira ideia ao último frame.

CTA principal:

Solicitar orçamento.

Utilize os textos comerciais existentes caso já estejam aprovados.

### Composição mobile

- Identificador editorial pequeno.
- Título expressivo dividido em três linhas quando necessário.
- Descrição curta.
- Botão de orçamento ocupando toda a largura disponível.
- Composição abstrata orgânica atrás do conteúdo.
- Uma única superfície de vidro envolvendo o conteúdo.

Padding vertical mínimo da seção: 80px.

Padding interno da superfície de vidro: 24px.

No desktop:

- Composição centralizada.
- Largura máxima da superfície de vidro: 640px.
- Padding interno: 48px a 64px.

### Efeito exclusivo: Cinematic Light Flow

Crie um componente visual reutilizável chamado CinematicLightFlow.

Ele deverá combinar:

1. Animated Mesh Gradient.
2. Organic Blob Morphing.
3. Iluminação ambiente.
4. Film Grain estático.

Essa composição será a adaptação do efeito Florescer para a identidade de Mário Gomes.

Não utilize flores, partículas aleatórias ou estrelas.

A aparência deverá remeter à refração de luz sobre superfícies fluidas, a pigmentos digitais e a formas abstratas cinematográficas.

### Camadas do Cinematic Light Flow

Camada 1 — Fundo:

#08090D.

Camada 2 — Mesh Gradient:

Utilize uma composição semelhante a:

radial-gradient(ellipse at 25% 28%, #1B43A7 0%, transparent 34%),

radial-gradient(ellipse at 71% 50%, #527DC5 0%, transparent 24%),

radial-gradient(ellipse at 45% 80%, #142C6A 0%, transparent 38%).

Animação:

- Duração: 22 segundos.
- Rotação máxima: 20 graus.
- Translação máxima: 5%.
- Escala máxima: 1.08.
- Movimento alternado.
- Curva ease-in-out.

Camada 3 — Forma orgânica principal:

- Largura: aproximadamente 78% da composição.
- Altura: aproximadamente 75%.
- Posicionamento deslocado para a direita.
- Gradiente interno azul translúcido.
- Opacidade moderada.
- Borda luminosa interna muito discreta.

Forma inicial:

border-radius: 68% 32% 55% 45% / 51% 70% 30% 49%.

Forma final:

border-radius: 35% 65% 35% 65% / 65% 40% 60% 35%.

Duração: 20 segundos.

Camada 4 — Forma orgânica secundária:

- Largura aproximada: 65%.
- Posicionamento inferior esquerdo.
- Opacidade inferior à forma principal.
- Animação de 24 segundos.
- Defasagem temporal de 6 segundos em relação à forma principal.

Camada 5 — Film Grain:

Utilize textura estática leve, preferencialmente uma imagem pequena e reutilizável.

Opacidade entre 0.025 e 0.045.

Não anime continuamente o ruído.

Camada 6 — Conteúdo:

Utilize superfície Glassmorphism com:

- Background: rgba(11,19,42,0.35).
- Backdrop-filter: blur(12px).
- Borda: 1px solid rgba(160,186,255,0.25).
- Border-radius: 8px.
- Sombra suave.

Na seção de serviços, reutilize uma versão simplificada do CinematicLightFlow, sem morphing simultâneo de múltiplas formas.

### CTA final

O botão de orçamento deverá possuir fundo branco e texto azul muito escuro.

Não utilize um botão verde genérico apenas por direcionar ao WhatsApp.

Utilize ícone discreto de seta diagonal ou WhatsApp.

Altura mínima: 52px.

Aplique Animated Gradient Border exclusivamente neste botão:

- Espessura: 1px a 2px.
- Gradiente cônico com segmento azul luminoso.
- Duração: 8 segundos.
- Intensidade moderada.
- Sem alteração nas dimensões do botão.

Aplique Ripple Effect como feedback de interação.

A ação deverá ser executada imediatamente, sem aguardar o término da animação.

## 15. Rodapé

Fundo: #08090D.

Utilize:

- Logotipo oficial.
- Nome profissional.
- Links de contato reais.
- Redes sociais reais.
- Navegação complementar quando necessária.
- Informações legais pertinentes.

Não utilize animações contínuas no rodapé.

Mantenha a composição minimalista.

Não adicione endereço, telefone, e-mail ou redes sociais fictícias.

## 16. Sistema global de movimento

Centralize os tokens de animação:

- motion-press: 120ms.
- motion-feedback: 180ms.
- motion-interface: 250ms.
- motion-expand: 280ms.
- motion-content: 500ms.
- motion-reveal: 650ms.
- motion-stagger: 80ms.
- motion-playhead: 450ms.
- motion-ambient: 22s.

Curvas:

- Interações: ease-out.
- Revelações: cubic-bezier(0.22,1,0.36,1).
- Movimento ambiental: ease-in-out.

Utilize Intersection Observer para animações de entrada e controle de visibilidade das animações ambientais.

As animações de entrada deverão acontecer uma única vez.

Pause as animações ambientais quando suas respectivas seções estiverem fora da área visível.

Pause processamento decorativo quando document.visibilityState indicar que a página não está visível.

Não utilize loops JavaScript permanentes para efeitos que podem ser executados por CSS.

Prefira transform e opacity.

Use will-change somente quando necessário e evite manter numerosas camadas permanentemente promovidas.

## 17. Distribuição definitiva dos efeitos

Implemente exatamente esta distribuição:

### Cabeçalho

- Glassmorphism após início da rolagem.

### Abertura

- CinematicAmbientLight.
- Ambient Spotlight integrado à iluminação.
- Mouse Spotlight exclusivamente em dispositivos apropriados.
- Glassmorphism nos controles audiovisuais.

### Posicionamento

- Cinematic Mask Reveal.
- Revelação tipográfica sequencial.

### Portfólio

- Cinematic Mask Reveal.
- Scroll Reveal.
- Parallax seletivo.
- Glassmorphism nos controles de reprodução.

### Sobre

- Scroll Reveal.
- Máscara de revelação fotográfica.

### Serviços

- CinematicLightFlow simplificado.
- Glassmorphism.
- Touch Spotlight.
- Expansão animada.

### Processo

- ProductionTimeline.
- Playhead animado.
- Transições contextuais.

### Prova social e FAQ

- Transições de interface essenciais.
- Sem efeitos decorativos contínuos.

### Contato final

- CinematicLightFlow completo.
- Organic Blob Morphing.
- Mesh Gradient.
- Film Grain.
- Glassmorphism.
- Animated Gradient Border.
- Ripple Effect.

### Rodapé

- Sem animações decorativas.

Não introduza outros efeitos sem necessidade funcional.

Não implemente partículas, cursor customizado, objetos 3D, WebGL, chuva digital, confetes ou efeitos de rolagem bloqueada.

## 18. Adaptação Mobile First

Implemente primeiro o layout para uma viewport de referência de 390px.

Em seguida, valide as larguras de 320px, 360px, 375px e 430px.

Breakpoints de referência:

- Mobile: até 767px.
- Tablet: 768px a 1023px.
- Desktop: a partir de 1024px.
- Desktop amplo: a partir de 1440px.

Não dependa exclusivamente desses breakpoints. Ajuste componentes quando o conteúdo exigir.

Requisitos:

- Ausência de rolagem horizontal involuntária.
- Controles principais com áreas de toque de pelo menos 44px.
- Botões comerciais com altura mínima de 48px.
- Textos principais de pelo menos 16px.
- Navegação confortável com uma única mão.
- Preservação de gestos naturais.
- Respeito às safe areas dos dispositivos.

Não condicione nenhuma funcionalidade essencial a hover.

Detecte recursos de interação utilizando media queries de pointer e hover, e não apenas pela largura da viewport.

O mobile deverá preservar a qualidade artística sem reproduzir todos os efeitos do desktop.

## 19. Acessibilidade e alternativas estáticas

Implemente suporte a prefers-reduced-motion.

Quando ativo:

- Desative parallax.
- Desative movimentos ambientais contínuos.
- Desative Organic Blob Morphing.
- Desative bordas luminosas animadas.
- Remova deslocamentos de revelação.
- Mantenha os gradientes como composições estáticas.
- Preserve todos os conteúdos e funcionalidades.
- Utilize reprodução audiovisual manual como padrão.

Forneça um controle discreto para pausar os movimentos decorativos contínuos da página.

Garanta:

- HTML semântico.
- Hierarquia correta de títulos.
- Um H1 principal acessível.
- Contraste adequado.
- Foco visível.
- Navegação por teclado.
- Textos alternativos.
- Controles acessíveis de vídeo.
- Legendas ou alternativas textuais, quando necessárias.
- Estados acessíveis em componentes expansíveis.

As camadas decorativas deverão utilizar aria-hidden e pointer-events: none quando apropriado.

Caso backdrop-filter não esteja disponível, utilize fundos sólidos ou semitranslúcidos com contraste suficiente.

## 20. Desempenho

Priorize smartphones de entrada e intermediários.

Não utilize Three.js ou WebGL.

Não adicione GSAP, Framer Motion ou outras bibliotecas apenas para implementar efeitos simples que podem ser resolvidos com CSS.

Se uma biblioteca já estiver instalada e integrada ao projeto, avalie sua reutilização antes de implementar mecanismos redundantes.

Otimize:

- Imagens responsivas.
- Formatos WebP e AVIF quando adequados.
- Posters de vídeo.
- Carregamento sob demanda.
- Fontes locais ou otimizadas.
- Dimensões explícitas de imagens e vídeos.
- Lazy loading abaixo da primeira área visível.
- Eventos de interação.
- Limpeza de listeners e observers.

Não utilize lazy loading na imagem principal quando ela for necessária para o LCP.

Evite desfoques animados de tela inteira.

Evite múltiplas superfícies com backdrop-filter sobrepostas.

Se a composição artística causar perda relevante de fluidez, simplifique a quantidade de camadas decorativas sem alterar a direção visual.

Metas:

- LCP: até 2,5 segundos.
- INP: até 200ms.
- CLS: até 0,1.

Essas são metas de experiência real, não resultados presumidos.

Registre separadamente as medições de laboratório.

## 21. Componentização

Adapte os nomes à arquitetura existente sem criar componentes duplicados.

Estrutura de referência:

- Header
- MobileNavigation
- CinematicHero
- ResponsiveVideo
- EditorialIntroduction
- PortfolioGallery
- PortfolioProject
- AboutSection
- ServicesSection
- ServiceAccordion
- ProductionTimeline
- SocialProofSection
- SkillsSection
- FAQSection
- ContactSection
- Footer

Componentes de efeitos:

- CinematicAmbientLight
- AdaptiveSpotlight
- CinematicLightFlow
- GlassSurface
- CinematicReveal
- ParallaxLayer
- AnimatedGradientBorder
- RippleButton

Não crie um componente separado para cada pequena propriedade CSS.

Reutilize os mecanismos visuais quando houver comportamento compartilhado.

Centralize:

- Design tokens.
- Tokens de movimento.
- Conteúdo comercial.
- Projetos do portfólio.
- Serviços.
- Etapas de produção.
- Informações de contato.

## 22. Conversão comercial

A conversão principal será a solicitação de orçamento.

Utilize o WhatsApp real fornecido no briefing.

Configure a mensagem inicial de forma centralizada.

Mensagem sugerida:

Olá, Mário! Conheci seu portfólio e gostaria de conversar sobre um projeto de edição de vídeo.

Não invente o número de telefone.

Distribua os pontos de contato:

- Cabeçalho.
- Posicionamento profissional.
- Encerramento.

No mobile, poderá existir uma barra inferior compacta de contato a partir do momento em que a seção de posicionamento for ultrapassada.

Ela deverá:

- Exibir apenas uma chamada comercial.
- Respeitar a safe area inferior.
- Não cobrir conteúdos ou controles de vídeo.
- Desaparecer quando a seção final de contato estiver visível.
- Permanecer oculta durante a abertura cinematográfica.

Não utilize pop-ups comerciais invasivos.

## 23. SEO

Configure:

- Título da página.
- Meta description.
- Open Graph.
- Imagem de compartilhamento.
- Favicon.
- Hierarquia semântica.
- Links adequados.
- Sitemap e robots.txt quando aplicáveis.

Utilize somente informações verificadas.

O conceito artístico não deverá comprometer a descoberta do conteúdo pelos mecanismos de busca.

## 24. Restrições explícitas

Não:

- Refaça a identidade visual.
- Explore outras direções artísticas.
- Crie um layout SaaS genérico.
- Substitua a abertura audiovisual por uma hero textual convencional.
- Utilize cards idênticos em todas as seções.
- Aplique animações em todos os elementos.
- Utilize cores decorativas fora da paleta.
- Utilize vídeos genéricos como portfólio.
- Invente clientes ou serviços.
- Invente depoimentos.
- Adicione dependências desnecessárias.
- Implemente funcionalidades comerciais não solicitadas.
- Reestruture componentes sem necessidade.
- Realize merge na main.
- Faça push ou publicação sem autorização.

Quando uma decisão de implementação não estiver detalhada, escolha a solução tecnicamente mais simples que preserve a composição estabelecida.

Não interprete lacunas técnicas como autorização para modificar a direção artística.

## 25. Ordem de implementação

Execute nesta sequência:

1. Inspeção do projeto.
2. Configuração dos tokens.
3. Estrutura semântica da página.
4. Layout mobile.
5. Integração dos conteúdos e materiais audiovisuais.
6. Implementação do cabeçalho.
7. Implementação das seções narrativas.
8. Implementação dos componentes de efeitos compartilhados.
9. Aplicação seletiva das animações.
10. Implementação da timeline.
11. Implementação das chamadas comerciais.
12. Adaptação tablet e desktop.
13. Otimização de desempenho.
14. Validação funcional e visual.
15. Correção de problemas encontrados.
16. Documentação concisa.

Não interrompa o fluxo para apresentar planos intermediários extensos.

Execute a tarefa integralmente.

## 26. Validação

Utilize os mecanismos de teste já existentes.

Caso Playwright esteja disponível, utilize-o para validar a página.

Verifique:

- Layout mobile em 320px, 390px e 430px.
- Layout tablet em 768px.
- Layout desktop em 1280px e 1440px.
- Funcionamento do menu.
- Reprodução de vídeos.
- Ativação e desativação de áudio.
- Navegação por teclado.
- Expansão dos serviços.
- Seleção das etapas da timeline.
- Movimento do playhead.
- Links comerciais.
- Touch Spotlight.
- Mouse Spotlight.
- Preferência de redução de movimento.
- Controle de pausa das animações.
- Ausência de overflow horizontal.
- Ausência de erros relevantes no console.
- Preservação do contraste.
- Fluidez da rolagem.

Gere, quando o ambiente permitir, capturas de tela da página completa em 390px e 1440px.

Gere também capturas específicas:

- Abertura.
- Portfólio.
- Serviços.
- Timeline.
- Contato final.

Analise visualmente as capturas e corrija os problemas encontrados antes de concluir.

Não considere a tarefa concluída apenas porque o código compila.

## 27. Critérios de aceitação artística

A página deverá:

- Começar com uma experiência predominantemente audiovisual.
- Apresentar direção editorial cinematográfica.
- Alternar adequadamente fundos claros e escuros.
- Possuir iluminação azul como elemento de identidade.
- Utilizar Glassmorphism seletivamente.
- Apresentar a composição Cinematic Light Flow.
- Priorizar os trabalhos reais de Mário Gomes.
- Possuir uma narrativa visual coerente.
- Apresentar momentos de repouso.
- Utilizar movimento com intenção.
- Transmitir sofisticação sem excesso decorativo.
- Ser confortável e funcional no mobile.
- Facilitar o contato comercial.

O resultado não deverá parecer uma coleção de demonstrações de efeitos CSS.

Os efeitos deverão atuar conjuntamente como linguagem visual de uma única produção artística.

## 28. Relatório final

Ao concluir, apresente apenas:

1. Resumo objetivo da implementação.
2. Arquivos principais criados ou modificados.
3. Componentes visuais implementados.
4. Testes executados e respectivos resultados.
5. Evidências visuais disponíveis.
6. Limitações técnicas identificadas.
7. Conteúdos ou materiais comerciais pendentes.
8. Instruções para execução local.
9. Estado final da branch e dos commits.

Atualize a documentação existente e registre a especificação visual em um único documento, preferencialmente docs/DESIGN_SYSTEM.md.

Evite criar múltiplos documentos com conteúdos repetidos.

Não declare testes, métricas ou resultados que não tenham sido efetivamente verificados.

Implemente agora a landing page conforme esta especificação.

## Integração da atualização Cinematic Portfolio Marquee

- Alteração restrita ao Ato 03. A antiga galeria estática foi substituída; cabeçalho, abertura, posicionamento, sobre, serviços, processo, contato e rodapé não foram redesenhados.
- Componentes na seção de portfólio e modal em components/media. Sem novas dependências. Web Animations API anima somente transform, com tempo calculado pela largura medida / 24 ou 30 px/s, sentidos opostos e interpolação linear. ResizeObserver recalcula tamanho e repetições; não há loop JavaScript por frame.
- Três grupos visuais permitem normalizar a posição sem lacunas. Apenas 12 itens originais ficam na árvore de acessibilidade; cópias não entram na sequência de Tab. Em movimento reduzido há apenas os dois grupos originais, navegáveis horizontalmente.
- Interação usa rolagem horizontal nativa, preserva pan vertical e distingue deslocamentos acima de 8px. A transformação corrente é incorporada à posição de rolagem na pausa manual; a retomada após 2,5s normaliza a fase equivalente. Setas do teclado exploram a esteira focalizada; Tab permite selecionar cada item. Foco de teclado e hover apropriado pausam a trilha; pausa local/global, modal, documento oculto e seção fora da viewport têm prioridade sobre retomada automática.
- Apenas o cabeçalho textual recebe reveal de 600ms/16px. Fundo radial estático, máscara lateral de 16px mobile/40px desktop, cards 9:16 e 16:9 e espaçamento de 16/24px entre trilhas. Não há parallax ou luz animada nesta seção.
- Dados: id/title/category/orientation/posterSrc/posterAlt/videoSrc/isPlaceholder/sourceCredit e captions opcional. Para integrar um trabalho real, substituir título, categoria, capa, alt e crédito, preencher videoSrc e marcar isPlaceholder=false. Legendas VTT em captions quando disponíveis. Imagens das trilhas não carregam vídeo; existe apenas um player no modal selecionado, com controles nativos, volume, Escape, botão de fechar e restauração de foco.
- As 12 imagens WebP totalizam aproximadamente 824 kB. Cópias reutilizam as mesmas URLs locais; loading=lazy. São referências visuais e os títulos são nomes ilustrativos, não nomes de projetos reais.
- Origem dos recursos: imagens oficiais em images.unsplash.com, identificadas individualmente por sourceCredit em src/data/portfolio.ts. Licença consultada: https://unsplash.com/license, que permite baixar, copiar e usar imagens, inclusive comercialmente, sob suas condições; a licença não implica cessão de direitos sobre marcas ou pessoas retratadas. Nenhum material do site de referência foi copiado. Fotografias não receberam filtros uniformes. Downloads em WebP com fit=crop e tamanhos 600×1066/800×450; os 12 enquadramentos foram inspecionados.
- A referência ltaudiovisual.com.br/editorserio não foi acessível pela ferramenta de leitura; o mecanismo segue os parâmetros explícitos da atualização, sem inferência de sua identidade visual.

# ATUALIZAÇÃO DE ESPECIFICAÇÃO VISUAL

## Mário Gomes — Cinematic Portfolio Marquee

### 1. Escopo da alteração

Substitua a composição de galeria estática anteriormente definida para o Ato 03 — Portfólio Audiovisual por uma galeria dinâmica composta por duas esteiras infinitas de conteúdo audiovisual, movimentando-se em sentidos opostos.

Preserve integralmente as demais decisões artísticas, arquiteturais e comerciais estabelecidas na especificação Beyond the Frame.

Não redesenhe outras seções.

Não explore outras propostas de layout para o portfólio.

Implemente exatamente a direção visual especificada neste documento.

### 2. Referência visual

Utilize como referência comportamental a seção de portfólio disponível em:

https://ltaudiovisual.com.br/editorserio

O comportamento desejado é o deslocamento contínuo de duas esteiras de trabalhos audiovisuais em sentidos opostos.

Não reproduza a identidade visual, as cores, os textos, os vídeos ou os elementos comerciais do site de referência.

Adapte exclusivamente o mecanismo de apresentação do portfólio para a identidade de Mário Gomes.

A referência já foi analisada durante o planejamento artístico. Não é necessário realizar uma nova pesquisa extensa.

### 3. Nome do componente

CinematicPortfolioMarquee

Implemente os seguintes componentes, adaptando os nomes às convenções existentes quando necessário:

- PortfolioSection
- CinematicPortfolioMarquee
- MarqueeTrack
- PortfolioMediaCard
- PortfolioVideoPlayer
- MarqueeControls

Evite abstrações desnecessárias.

### 4. Direção artística

Fundo principal da seção: #08090D.

Utilize a linguagem editorial cinematográfica definida anteriormente.

Identificador editorial:

02 / PORTFÓLIO

Título:

Histórias em movimento.

A palavra movimento deverá utilizar o azul luminoso da identidade visual.

Descrição provisória:

Diferentes formatos. Diferentes narrativas. Uma mesma atenção a cada frame.

Preserve os textos comerciais já aprovados, caso existam.

A seção deverá transmitir dinamismo, variedade de estilos audiovisuais e qualidade de composição.

As imagens serão protagonistas.

Não aplique filtros cromáticos uniformes sobre todas as imagens.

### 5. Estrutura visual

A seção será composta por:

1. Identificador editorial.
2. Título.
3. Descrição breve.
4. Esteira superior de trabalhos verticais.
5. Esteira inferior de trabalhos horizontais.
6. Controles de movimento.
7. Indicação provisória de conteúdo ilustrativo.

As duas esteiras deverão ocupar toda a largura disponível da seção.

Permita que os cards sejam parcialmente cortados nas extremidades da viewport, criando uma sensação de continuidade.

O cabeçalho textual deverá respeitar as margens editoriais globais do projeto.

As esteiras deverão utilizar uma composição full-bleed, ultrapassando as margens horizontais do texto.

Não permita que a largura interna das esteiras provoque overflow horizontal na página.

### 6. Esteira superior

Identificador técnico: verticalPortfolioTrack.

Direção: esquerda para direita.

Formato dos cards: 9:16.

Quantidade inicial: seis trabalhos ilustrativos distintos.

Dimensões mobile:

- Largura: 144px.
- Altura: 256px.
- Espaçamento: 12px.

Dimensões desktop:

- Largura: 200px.
- Altura proporcional ao formato 9:16.
- Espaçamento: 20px.

Velocidade de deslocamento: 24 pixels por segundo.

Movimento linear, contínuo e infinito.

Não utilize aceleração e desaceleração periódicas durante o deslocamento normal.

A duração da animação deverá ser calculada com base na largura total do conjunto de cards para preservar uma velocidade consistente.

### 7. Esteira inferior

Identificador técnico: horizontalPortfolioTrack.

Direção: direita para esquerda.

Formato dos cards: 16:9.

Quantidade inicial: seis trabalhos ilustrativos distintos.

Dimensões mobile:

- Largura: 240px.
- Altura: 135px.
- Espaçamento: 12px.

Dimensões desktop:

- Largura: 320px.
- Altura: 180px.
- Espaçamento: 20px.

Velocidade de deslocamento: 30 pixels por segundo.

Movimento linear, contínuo e infinito.

Distância vertical entre as esteiras:

- Mobile: 16px.
- Desktop: 24px.

As velocidades deverão permanecer diferentes para evitar uma simetria mecânica excessiva.

### 8. Loop infinito

Implemente um mecanismo de seamless infinite marquee.

Duplique a sequência visual de cards quando necessário para garantir continuidade.

A transição entre o final e o início da sequência não poderá apresentar:

- Saltos visuais.
- Espaços vazios inesperados.
- Piscadas.
- Reinicializações perceptíveis.
- Mudanças bruscas de velocidade.
- Deslocamentos involuntários do layout.

Calcule a distância do deslocamento considerando a largura real dos cards e seus espaçamentos.

Recalcule as dimensões quando a viewport for redimensionada.

As duplicações deverão ser tratadas como elementos de continuidade visual.

Não duplique desnecessariamente os elementos na árvore de acessibilidade.

Não duplique players de vídeo.

Não utilize bibliotecas de carrossel pesadas quando uma implementação com CSS e JavaScript nativos for suficiente.

### 9. Imagens ilustrativas temporárias

Os vídeos definitivos ainda não estão disponíveis.

Nesta etapa, utilize doze imagens ilustrativas distintas, sendo seis verticais e seis horizontais.

As imagens deverão possuir qualidade visual suficiente para avaliar a composição artística da landing page.

Não utilize retângulos cinzas, skeletons permanentes, imagens com a palavra placeholder ou fundos monocromáticos como substitutos.

Utilize imagens provenientes de materiais autorizados, recursos existentes ou bancos de imagens com licenças compatíveis.

Armazene cópias locais quando a licença permitir, evitando dependência de URLs externas instáveis.

Registre a origem e a licença dos recursos utilizados.

Caso o ambiente não permita obter imagens externas, utilize os materiais ilustrativos disponíveis no projeto ou crie composições vetoriais provisórias, documentando essa limitação.

### 10. Temáticas das imagens verticais

Utilize referências visuais que representem:

1. Retrato documental.
2. Motion Design abstrato.
3. Conteúdo digital para redes sociais.
4. Publicidade de produto.
5. Narrativa urbana.
6. Produção audiovisual criativa.

Esses itens representam categorias ilustrativas de composição, e não serviços comprovadamente prestados pelo profissional.

### 11. Temáticas das imagens horizontais

Utilize referências visuais que representem:

1. Paisagem cinematográfica.
2. Produção institucional.
3. Entrevista documental.
4. Publicidade comercial.
5. Narrativa humana.
6. Produção audiovisual artística.

Explore variedade de enquadramentos, iluminação, contrastes e cores.

Não apresente as imagens ilustrativas como trabalhos reais de Mário Gomes.

### 12. Estrutura de dados

Centralize os trabalhos em um arquivo de dados dedicado.

Cada item deverá possuir os seguintes campos:

- id
- title
- category
- orientation
- posterSrc
- posterAlt
- videoSrc
- isPlaceholder
- sourceCredit, quando aplicável

Valores permitidos para orientation:

- portrait
- landscape

Enquanto o vídeo definitivo não estiver disponível:

- videoSrc deverá ser null.
- isPlaceholder deverá ser true.

A substituição futura das imagens e a inclusão dos vídeos deverão ser realizadas principalmente por meio da atualização desse arquivo de dados.

Não exija alterações na estrutura do carrossel para cadastrar novos trabalhos.

### 13. Composição de cada card

Cada card deverá conter:

- Imagem preenchendo o enquadramento.
- Overlay inferior em gradiente escuro.
- Categoria ou identificação ilustrativa.
- Controle central de reprodução quando o vídeo estiver disponível.
- Identificação discreta de conteúdo provisório quando isPlaceholder for true.

Estilização:

- Border-radius: 8px.
- Borda: 1px solid rgba(255,255,255,0.12).
- Background: #101B33.
- Overflow: hidden.
- Object-fit: cover.

Preserve o enquadramento relevante das imagens.

Não corte rostos, textos ou elementos essenciais sem necessidade.

Não adicione sombras exageradas ou bordas neon aos cards.

### 14. Glassmorphism no controle de reprodução

Quando o vídeo estiver disponível, utilize um botão circular central.

Dimensões:

- Mobile: 44px.
- Desktop: 52px.

Estilização:

- Background: rgba(255,255,255,0.15).
- Backdrop-filter: blur(8px).
- Border: 1px solid rgba(255,255,255,0.35).
- Border-radius: 50%.
- Ícone branco.
- Transição: 180ms.

Durante a fase provisória, poderá existir uma representação visual semelhante ao controle de reprodução, acompanhada de uma indicação de que o vídeo será disponibilizado posteriormente.

Não apresente um botão aparentemente funcional que não execute nenhuma ação.

Ao tocar em um trabalho provisório, permita abrir uma visualização ampliada da imagem, identificando-a claramente como conteúdo ilustrativo.

### 15. Comportamento mobile

O movimento automático deverá funcionar sem depender de hover.

Ao iniciar uma interação por toque:

- Pause a esteira correspondente.
- Permita exploração horizontal manual.
- Preserve a rolagem vertical nativa da página.
- Diferencie gestos horizontais de gestos verticais.
- Evite que pequenos deslocamentos sejam interpretados como seleção de um card.

Após concluir a interação manual, retome suavemente a movimentação automática depois de aproximadamente 2,5 segundos, caso o usuário não tenha solicitado pausa permanente.

A retomada deverá acontecer a partir da posição visual atual, sem saltos.

Não utilize preventDefault indiscriminadamente nos eventos de toque.

Não bloqueie a rolagem vertical da landing page.

Não implemente scroll hijacking.

### 16. Comportamento desktop

Em dispositivos com suporte a hover e ponteiro preciso:

- Pause a esteira correspondente ao posicionar o cursor sobre um card.
- Permita examinar a imagem.
- Aplique um zoom interno discreto de até 1.03.
- Aumente moderadamente a luminosidade do controle de reprodução.
- Retome a movimentação suavemente quando o cursor sair.

Não altere as dimensões externas do card durante o hover.

Não aplique Mouse Spotlight adicional nessa seção.

O movimento das esteiras já constitui o efeito visual protagonista do portfólio.

### 17. Reprodução dos vídeos definitivos

Prepare a estrutura para receber arquivos audiovisuais posteriormente.

Quando videoSrc estiver preenchido, a seleção do trabalho deverá abrir um reprodutor ampliado e acessível.

O reprodutor deverá:

- Respeitar a proporção original do vídeo.
- Possuir controles de reprodução.
- Permitir ajuste de volume.
- Possuir botão de fechamento.
- Permitir fechamento por Escape.
- Gerenciar o foco adequadamente.
- Oferecer suporte a legendas quando disponíveis.

Pause ambas as esteiras durante a reprodução.

Nunca reproduza simultaneamente todos os vídeos das esteiras.

Não carregue arquivos de vídeo pesados apenas para executar a animação dos cards.

Utilize as imagens de capa nas esteiras.

Carregue o vídeo sob demanda quando o visitante selecionar um trabalho.

Ao fechar o reprodutor, restaure o estado anterior de movimentação e o foco do visitante.

### 18. Controle de pausa

Adicione um controle discreto e acessível para pausar ou retomar ambas as esteiras.

Posicione o controle abaixo da segunda esteira, integrado à composição editorial.

Estados:

- Pausar movimento.
- Retomar movimento.

O controle deverá possuir área de toque mínima de 44px.

Utilize um ícone acompanhado de texto.

A pausa solicitada pelo usuário deverá ter prioridade sobre os mecanismos automáticos de retomada.

### 19. Tratamento das extremidades

Aplique uma máscara horizontal discreta nas extremidades das esteiras.

Utilize mask-image com gradiente linear.

A região de transparência deverá ocupar aproximadamente:

- Mobile: 12px a 20px de cada extremidade.
- Desktop: 32px a 48px de cada extremidade.

O efeito deverá suavizar a entrada e saída dos cards.

Não esconda uma parte excessiva das imagens.

Caso a propriedade CSS não esteja disponível, mantenha o recorte natural da esteira.

### 20. Iluminação ambiental

Utilize um gradiente radial estático muito discreto atrás das duas esteiras.

Cor:

rgba(49,93,205,0.08).

O gradiente deverá criar uma leve atmosfera azul sem modificar as cores das imagens.

Não utilize Aurora Background animado nessa seção.

Não utilize Animated Gradient Border nos cards.

Não utilize Organic Blob Morphing atrás do portfólio.

Não utilize parallax adicional.

A movimentação horizontal das duas esteiras será suficiente para estabelecer a personalidade visual da seção.

### 21. Animação de entrada

Aplique Scroll Reveal somente ao cabeçalho textual da seção.

Parâmetros:

- Opacidade inicial: 0.
- Deslocamento vertical inicial: 16px.
- Duração: 600ms.
- Execução única.

As esteiras poderão receber uma transição inicial de opacidade de aproximadamente 400ms.

Não execute animações individuais de entrada em todos os cards duplicados.

### 22. Desempenho

Priorize CSS transform para deslocamento das esteiras.

Utilize JavaScript apenas para os comportamentos que necessitem de controle adicional, incluindo interação manual, cálculo das dimensões e gerenciamento do estado de reprodução.

Utilize Intersection Observer para identificar quando a seção estiver visível.

Pause as animações quando:

- A seção estiver fora da viewport.
- A aba do navegador não estiver visível.
- Um trabalho estiver sendo reproduzido.
- O visitante solicitar pausa.
- A preferência de redução de movimento estiver ativa.

Otimize as imagens em formatos WebP ou AVIF quando apropriado.

Defina dimensões explícitas para os cards.

Evite layout shifts.

Não utilize filtros blur animados nas imagens.

Não implemente renderização por Canvas ou WebGL.

### 23. Acessibilidade

Respeite prefers-reduced-motion.

Quando essa preferência estiver ativa:

- Desative a movimentação automática.
- Remova as duplicações visuais desnecessárias.
- Apresente duas galerias horizontais navegáveis manualmente.
- Preserve todos os trabalhos.
- Mantenha as informações acessíveis.

Garanta:

- Navegação por teclado.
- Foco visível.
- Textos alternativos apropriados.
- Controles acessíveis.
- Pausa do movimento.
- Alternativas à interação por toque.
- Contraste adequado.

As cópias utilizadas para continuidade da animação não deverão criar controles duplicados na navegação por teclado.

### 24. Validação obrigatória

Verifique:

- Movimento da primeira esteira para a direita.
- Movimento da segunda esteira para a esquerda.
- Continuidade infinita sem saltos.
- Velocidades diferentes.
- Proporções corretas dos cards.
- Qualidade das imagens provisórias.
- Ausência de overflow horizontal.
- Funcionamento da pausa.
- Exploração manual por toque.
- Preservação da rolagem vertical.
- Retomada suave após interação.
- Compatibilidade com redução de movimento.
- Ausência de players duplicados.
- Possibilidade de cadastrar novos trabalhos.
- Possibilidade de adicionar os vídeos posteriormente.
- Responsividade em 320px, 390px, 430px, 768px e 1440px.

Execute os testes definidos no AGENTS.md.

Realize os commits e procedimentos de integração com o GitHub conforme a governança previamente estabelecida.

### 25. Restrições finais

Não invente trabalhos, clientes ou resultados comerciais de Mário Gomes.

Não utilize os vídeos pertencentes ao site de referência.

Não apresente imagens ilustrativas como trabalhos efetivamente realizados pelo profissional.

Não redesenhe a identidade visual.

Não modifique outras seções.

Não adicione efeitos visuais que concorram com a movimentação das esteiras.

Não solicite novas decisões artísticas.

Implemente a galeria conforme esta especificação, priorizando fidelidade visual, desempenho mobile e facilidade de substituição futura dos materiais audiovisuais.

## Retrato profissional — atualização de 25/11/2026

Foto fornecida diretamente pelo usuário para uso na seção Sobre, salva sem alteração em public/media/images/mario-gomes.png (791×788px, 516.355 bytes). Nenhuma licença sobre a foto foi presumida além do uso solicitado neste site. Substitui a indicação “Fotografia profissional a adicionar”. Preservados preto e branco, proporção e rosto; imagem com dimensões explícitas e carregamento adiado. Efeitos na interface: máscara de entrada existente, borda discreta e aproximação interna de 2% apenas com hover, ponteiro preciso e sem preferência por movimento reduzido. Sem vidro, formas orgânicas ou iluminação sobre o rosto. Não houve edição generativa ou alteração do arquivo original.

## Cinematic Portfolio Backlight — refinamento de 25/11/2026

Atualização exclusiva da iluminação do Ato 03, posterior à especificação Marquee. CSS em cinematic-portfolio-marquee.module.css; sem alteração da estrutura React, dos dados, das imagens, da tipografia, dos textos, das dimensões, das velocidades, das direções ou dos controles.

- Camada estática por ::before no contêiner das duas esteiras, com position:relative e isolation:isolate. Três fontes radiais azuis: 65%×45% em 25%/35% (#315DCD a 28%); 60%×45% em 85%/70% (rgb(72,123,220) a 18%); 80%×20% em 50%/55% (#7199F4 a 10%). Todas desaparecem em transparência, com máscara vertical adicional nas extremidades superior/inferior para evitar um limite retangular perceptível; a camada é decorativa e não recebe eventos.
- Cards com sombras externas 0/12/28 a 45% de preto, 0/4/10 a 25% de preto e halo azul 0/0/20 a 7%. Borda azul clara a 16% e reflexo interno superior de 1px a 10%, combinados com as sombras externas. Nenhum filtro sobre as imagens.
- Espaço vertical de pintura de 56px no viewport, compensado por margens negativas de mesmo valor dentro de flow-root, preservando posições, dimensões e distância de 16/24px entre os cards das duas trilhas. As áreas transparentes de pintura não capturam eventos; a faixa de conteúdo continua interativa, inclusive nos intervalos entre cards. Mantido o recorte e a máscara horizontal.
- Luz concentrada nas esteiras; cabeçalho e controles inferiores permanecem predominantemente escuros. Sem novas animações, loops JavaScript, Mouse Spotlight, Canvas, bibliotecas ou efeitos neon.
- Capturas anteriores em .cache/backlight-before/marquee-{320,390,430,1440}.png; capturas posteriores geradas pela suíte em test-results/**/marquee-*.png. Ambas são artefatos ignorados, não mídia do site.

## Publicação pública — atualização de 25/11/2026

Repositório público e GitHub Pages autorizados expressamente pelo usuário. URL canônica e og:url: https://mariomoutinho.github.io/mario-gomes-portfolio/. Meta robots alterada para index,follow. As limitações de conteúdo continuam visíveis: imagens do portfólio são ilustrativas, vídeos reais e WhatsApp seguem pendentes. Nenhuma licença geral de código ou de mídia foi inventada pela publicação. A configuração anterior de noindex era relativa às etapas ainda não autorizadas.
