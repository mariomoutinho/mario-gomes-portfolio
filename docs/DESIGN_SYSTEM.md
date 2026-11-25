# Design system — implementação autorizada

Especificação fornecida pelo usuário em 25/11/2026, reproduzida abaixo como fonte única da direção visual.

## Estado da integração

- Paleta, tipografia e movimento centralizados em `src/styles/tokens.css`. Manrope variável e IBM Plex Mono regular servidas localmente em `public/fonts`, acompanhadas das licenças OFL obtidas no repositório oficial google/fonts.
- Composição mobile first, margens de 16/20/32/64px, conteúdo até 1280px e cortes entre superfícies claras e escuras.
- Componentes: Header com dialog modal, CinematicAmbientLight, CinematicLightFlow, CinematicReveal, ResponsiveVideo, PortfolioGallery, ServiceAccordion, ProductionTimeline e RippleLink.
- Movimento ambiental controlado por IntersectionObserver, visibilidade do documento, preferência de movimento reduzido e pausa global. Revelações executadas uma vez; conteúdo permanece disponível sem observer.
- Não há material audiovisual, fotografia, marca, lista de projetos ou contato no repositório. Os espaços correspondentes são identificados como pendentes. Nenhuma imagem genérica ou projeto fictício foi adicionado.
- `src/data/media.ts` recebe showreel, fotografia e projetos reais; `src/data/site-content.ts` recebe serviços, etapas e WhatsApp. Somente edição de vídeo foi incluída como serviço, por ser a atividade fornecida no pedido. Etapas e textos do processo são provisórios e exigem validação profissional.
- Sem mídia, não há reprodução na página atual, modal ampliado ou parallax aplicado. O player integrado está preparado para vídeo inline, mute, reprodução manual, pausa dos demais vídeos, progresso, poster e descrição textual. Autoplay só é tentado sem redução de movimento e sem conexão econômica/lenta detectada. Legendas precisam ser avaliadas por vídeo antes de integrar material com fala.
- CTA final indisponível até informar WhatsApp real. Ripple e borda animada são implementados no link comercial que aparece ao configurar o número.
- FAQ, ferramentas e prova social omitidos por ausência de conteúdo verificado. Logotipo substituído apenas pelo nome tipográfico permitido. Favicon de marca e imagem OG aguardam material aprovado; domínio, canonical, sitemap e indexação aguardam publicação autorizada.
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
