# Validação

Execução local em **25/11/2026**, no repositório independente `E:\mario-gomes-portfolio`, branch `main`. Node.js 24.19.0, npm 11.17.0, Windows 10.0.19045.

## Comandos e resultados

| Comando                                                                         | Saída | Resultado observado                                                                       |
| ------------------------------------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------- |
| `npm install --fetch-retries=1 --fetch-timeout=30000`                           | 0     | 230 pacotes instalados; auditoria de 231 pacotes reportou 0 vulnerabilidades              |
| `npm run format`                                                                | 0     | Arquivos normalizados pelo Prettier                                                       |
| `npm ci --fetch-retries=1 --fetch-timeout=30000`                                | 0     | Instalação reproduzida pelo lockfile; auditoria reportou 0 vulnerabilidades               |
| `npm run check` (execução final após npm ci)                                    | 0     | Formatação, ESLint sem avisos, 2 testes Vitest, TypeScript estrito e build Vite aprovados |
| `npm run test:e2e:install`                                                      | 0     | Chromium 159.0.8154.6 e ferramentas do Playwright instalados no cache do projeto          |
| `npm run test:e2e`                                                              | 0     | 4 execuções aprovadas: 2 casos em Chromium desktop e mobile                               |
| `npm ls --depth=0`                                                              | 0     | Dependências diretas nas versões exatas, sem conflitos reportados                         |
| `git check-ignore node_modules dist .cache playwright-report test-results .env` | 0     | Todos os caminhos informados ignorados                                                    |
| Busca por padrões de credenciais em arquivos da tarefa                          | 1     | Nenhuma correspondência; código 1 significa ausência de resultados do rg                  |

Para instalar e executar o navegador nesta sessão PowerShell foi definido:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = 'E:\mario-gomes-portfolio\.cache\ms-playwright'
npm run test:e2e:install
npm run test:e2e
```

As chamadas que exigiam rede, processos de navegador ou escrita fora do workspace original foram executadas com a permissão da ferramenta para a pasta solicitada. O cache npm também fica dentro do projeto.

## Cobertura e evidências

Vitest/Testing Library verificam a montagem da região main sem conteúdo comercial e a desmontagem/remontagem sem nós residuais. Playwright serve o build real em loopback e verifica HTTP 200, título, pt-BR, noindex, raiz montada e vazia, ausência de erro de página/console/rede e ausência de overflow horizontal. O segundo caso verifica a montagem com a preferência de movimento reduzido; não constitui validação de animações futuras.

Capturas de desktop e mobile em `test-results/**/foundation.png` foram inspecionadas: ambas exibem a página vazia esperada, sem elementos do template Vite, mídia, branding inventado ou interface comercial. Capturas, relatório HTML, trace de falhas e build são artefatos locais ignorados. O servidor de preview usado pelos testes foi encerrado pelo Playwright.

Build observado: HTML 0,47 kB; CSS 0,27 kB; JS 219,68 kB (68,69 kB gzip). São dados desta fundação com React; não representam orçamento de performance aprovado para o produto.

## Falhas encontradas e corrigidas

- A primeira consulta npm sob sandbox falhou com EACCES de rede; a consulta autorizada funcionou.
- O primeiro `npm run check` terminou com código 1: exactOptionalPropertyTypes rejeitou workers indefinido na configuração Playwright. Corrigido para 2 workers explícitos; a execução final passou.
- Vitest inicialmente avisou sobre import de configuração sem extensão. Corrigido com import .ts e allowImportingTsExtensions no tsconfig; aviso ausente na validação final.
- Mover a pasta inicial de cache trouxe ownership da conta sandbox. Set-Acl não teve autorização do sistema operacional. O diretório raiz foi recriado com a conta do usuário, preservando todos os arquivos e o Git; o Git passou a funcionar normalmente, sem mudança global de safe.directory.
- Playwright emitiu avisos de conflito entre NO_COLOR e FORCE_COLOR herdados do ambiente; as 4 execuções terminaram com código 0.

## Isolamento e integração

Pindorama RPG manteve exatamente suas duas alterações preexistentes em project.godot e scenes/main.tscn; a comparação do diff antes/depois teve o mesmo SHA-256. A pasta temporária criada durante a inspeção foi retirada. Nenhum arquivo do RPG foi editado; comandos Godot não se aplicam à fundação React autorizada e não foram executados sobre o outro projeto.

O Git local usa main e não tem remoto. O workflow de GitHub Actions inclui instalação pelo lockfile, todos os checks locais e E2E do build. As três actions oficiais foram fixadas pelos SHAs das releases estáveis consultadas: checkout v7.0.1, setup-node v7.1.0 e upload-artifact v7.0.2. Sem deploy ou credenciais no workflow.

## Limites e pendências

- GitHub remoto, push, proteção de branch e execução real do workflow permanecem pendentes de conta/organização, visibilidade e autorização de publicação.
- A tela vazia não valida a futura landing page, acessibilidade completa, mídia, animações, conteúdo ou performance comercial.
- Chromium desktop/mobile foi testado; não houve execução em dispositivo físico, Firefox ou WebKit. O ambiente local é Windows 10; a documentação atual do Playwright lista Windows 11 como requisito suportado. A CI em Ubuntu ainda não foi executada.
- O comando `codex app E:\mario-gomes-portfolio` informou que o desktop não estava instalado e abriu o instalador Windows. Foi repetido a pedido do usuário após fechar o instalador. Isso não comprova instalação concluída nem mudança do diretório desta conversa.
- Licença do código, conteúdo comercial, permissões de mídia, direção artística e publicação do site aguardam decisões futuras.

## Landing page — 25/11/2026

Implementação autorizada pela especificação anexada pelo usuário, na branch local `feat/cinematic-landing`. A inspeção inicial encontrou Git limpo e nenhum material em public/media além de .gitkeep. Sem instalação de dependências, alteração de lockfile, remoto, commit, merge, push ou deploy.

### Verificações

- `npm run check`: aprovado, incluindo Prettier, ESLint sem avisos, 2 testes Vitest, TypeScript e build Vite.
- Build final observado: HTML 0,96 kB; CSS 19,41 kB (5,32 kB gzip); JS 242,49 kB (76,14 kB gzip). Fontes locais: Manrope 164.700 bytes e IBM Plex Mono 135.580 bytes, com licenças OFL preservadas.
- `git diff --check`: aprovado.
- `Invoke-WebRequest http://127.0.0.1:5173/`: HTTP 200; servidor de desenvolvimento mantido para visualização local.
- Capturas de página inteira em `test-results/**/landing-390.png` e `landing-1440.png` inspecionadas visualmente, com alternância de fundos, composição responsiva e indicação explícita de materiais pendentes. São artefatos locais ignorados, assim como o relatório Playwright em playwright-report/index.html.

### Correções durante a validação

O ambiente jsdom não implementa os métodos do dialog; o setup de teste fornece substitutos, enquanto a operação real do modal é verificada no Chromium. Corrigidos overflow por largura mínima intrínseca de grid/flex em telas estreitas e ciclo de foco do menu. O teste de pausa foi corrigido para procurar o novo nome acessível depois do clique. Uma tentativa inicial de E2E utilizou um build anterior após falha de teste unitário; seus resultados foram descartados. Rodadas no sandbox concluíram os casos, mas ficaram presas no encerramento do preview e foram interrompidas; a rodada final foi executada com permissão de processos fora do sandbox. Avisos NO_COLOR/FORCE_COLOR foram emitidos pelo ambiente.

### Limites da homologação

Sem vídeos, posters, fotografia ou projetos reais, reprodução, áudio, enquadramento, legendas, desempenho de mídia e parallax de imagens reais não foram homologados. O player e a galeria estão integrados por configuração, mas dependem de materiais autorizados. O CTA de orçamento está desativado por ausência de WhatsApp; não há link comercial externo fictício. A borda/ripple do link de orçamento só aparecem após configurar o número real. Não há favicon de marca ou imagem OG aprovada, domínio ou sitemap de produção. Mantido noindex.

Sem medição de LCP, INP ou CLS; os valores da especificação são metas. Testes em Chromium desktop e emulação mobile não substituem dispositivos físicos ou Safari/Firefox. Biografia, lista completa de serviços, ferramentas, prova social e FAQ aguardam conteúdo. As quatro etapas do processo são as provisórias autorizadas e precisam de validação.

### Resultado final E2E

`$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/ms-playwright"; npm run test:e2e`: saída 0, **24 execuções aprovadas em 52,7s**. Oito larguras (320, 360, 375, 390, 430, 768, 1280 e 1440px) em Chromium desktop e emulação mobile; verificação de HTTP/rede/console, hierarquia, noindex, ausência de overflow, menu/foco/Escape/seleção, serviços por teclado, mudança contextual e deslocamento do playhead, pausa global, redução de movimento e spotlights adaptados ao dispositivo. Preview encerrado normalmente na rodada final. O link de desenvolvimento permanece ativo em http://127.0.0.1:5173/.

## Atualização Cinematic Portfolio Marquee — 25/11/2026

Escopo: somente Ato 03 e sua integração no App, preservando as demais seções. Estado inicial: branch feat/cinematic-landing com a landing anterior ainda sem commit. Essa entrega anterior foi preservada no commit local `21fe935` antes da atualização; os históricos de validação acima continuam como registro das etapas anteriores.

### Implementação e recursos

Duas esteiras full-bleed com capas WebP, formatos 9:16 e 16:9, velocidades 24/30 px/s em sentidos opostos, repetição visual medida com ResizeObserver e transform pela Web Animations API. Pausa local/global, redução de movimento, hover apropriado, foco, visibilidade de seção/documento e modal. Rolagem horizontal nativa por toque e teclado, retomada após 2,5s sem perder a posição equivalente, supressão de seleção após deslocamento acima de 8px. Sem novo pacote npm, player duplicado ou carregamento de vídeo nas trilhas.

Doze imagens ilustrativas em public/media/portfolio, 823.380 bytes no total, com origem individual e licença no campo sourceCredit de src/data/portfolio.ts. A licença oficial Unsplash foi consultada e os arquivos locais foram inspecionados visualmente. Os títulos e categorias são ilustrativos e não são apresentados como projetos reais. Não foi usado material do site de referência, que não abriu pela ferramenta de leitura.

### Comandos e evidências

- `npm run check`: Prettier, ESLint sem avisos, 5 testes Vitest, TypeScript estrito e build aprovados.
- Testes unitários cobrem a manutenção da landing, ampliação ilustrativa, cadastro adicional por dados e estrutura de vídeo/legendas sob demanda com fonte somente de teste, sem download de vídeo real.
- `npm run test:e2e -- tests/e2e/portfolio.spec.ts`: rodada intermediária aprovada com 20 execuções, incluindo touchStart/touchMove/touchEnd reais emulados pelo Chromium. Os gestos horizontais alteram scrollLeft, não abrem o modal e retomam o movimento; gestos verticais alteram scrollY.
- `npm run test:e2e`: regressão intermediária com 44 execuções aprovadas em aproximadamente 1,2 minuto; viewport, menu, teclado, timeline, serviços, preferências de movimento e iluminação anterior preservados. A rodada final após ajuste do espaçamento e hover é registrada abaixo.
- Capturas da seção em `test-results/**/marquee-390.png` e `marquee-1440.png` inspecionadas. Demais evidências em marquee-320/430/768.png e capturas completas da landing. Capturas, traces, relatório e dist permanecem ignorados.
- A checagem inicial de imagens falhou por esperar todas as cópias fora da tela com loading=lazy. A checagem visual força eager apenas dentro do teste para verificar todos os arquivos; a aplicação conserva carregamento adiado. Substitutos de ResizeObserver e matchMedia foram acrescentados ao jsdom; as medições e animações reais são verificadas no navegador.

### Limitações

Vídeos definitivos seguem ausentes. A estrutura aceita videoSrc e captions, e sua montagem é testada; decodificação de vídeo real, sincronização de legendas e controles nativos com mídia definitiva ainda dependem desses arquivos. Sem testes em aparelhos físicos, Safari ou Firefox, sem métricas de campo LCP/INP/CLS. A mudança de visibilidade do documento é simulada por evento no E2E; ela não constitui medição de consumo em uma aba suspensa pelo sistema operacional.

Nenhum remoto Git foi configurado; conta/organização, visibilidade e autorização de publicação continuam pendentes conforme governança existente. Sem push, merge ou deploy.

### Resultado final da atualização

Build final: HTML 0,96 kB; CSS 24,40 kB (6,23 kB gzip); JS 251,60 kB (79,41 kB gzip), além dos recursos locais. `npm run check` terminou com saída 0 e 5 testes aprovados. `$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/ms-playwright"; npm run test:e2e` terminou com saída 0: **44 execuções aprovadas em aproximadamente 1,3 minuto**. Inclui a verificação final de espaçamentos 16/24px, hover independente da outra esteira, recálculo ao redimensionar, sentidos e velocidades, cruzamento da emenda, pausa persistente, simulação de aba oculta, pausa fora da viewport, galeria estática com redução de movimento, foco/Escape e gestos de toque. Os 24 casos anteriores passaram novamente sem alterações nas outras seções.

As capturas finais de 390px e 1440px foram inspecionadas após o último ajuste. `git diff --check` e `npm run format:check` aprovados. HTTP 200 confirmado no servidor de desenvolvimento, mantido em http://127.0.0.1:5173/#trabalhos. Registro local na mesma branch feat/cinematic-landing; sem criação de remoto ou publicação.

## Retrato profissional — 25/11/2026

Foto enviada diretamente pelo usuário e integrada na seção Sobre. Arquivo PNG original de 791×788px, 516.355 bytes, em public/media/images/mario-gomes.png. Mantidos preto e branco e proporção; dimensões explícitas corrigem a antiga reserva 800×1000 e evitam corte fixo em 4:5. O uso foi solicitado para este site; não foi presumida uma licença geral sobre o arquivo.

Efeitos aplicados pela interface, sem editar a foto: máscara de revelação existente, contorno discreto e zoom interno de 2% em hover com ponteiro preciso e movimento reduzido desativado. Sem vidro, cores ou formas sobre o rosto. Alt em pt-BR e carregamento adiado. Demais seções preservadas.

`npm run check`: saída 0; Prettier, ESLint sem avisos, 5 testes Vitest, TypeScript e build aprovados. Build: HTML 0,96 kB; CSS 24,89 kB (6,30 kB gzip); JS 251,93 kB (79,54 kB gzip), além dos arquivos de mídia. `git diff --check` aprovado.

Teste de navegador acrescentado à suíte existente verifica carregamento real da foto, largura natural de 791px, proporção 791/788, ausência do texto provisório e transform desativado com movimento reduzido. Capturas da seção e do contexto completo são gravadas em test-results/**/portrait.png e portrait-context.png. Resultado final E2E e inspeção visual registrados abaixo.

Resultado final: `npm run test:e2e` com PLAYWRIGHT_BROWSERS_PATH no cache do projeto terminou com saída 0, **46 execuções aprovadas em aproximadamente 1,4 minuto**, incluindo a fotografia em desktop e mobile. Capturas portrait.png de ambos os projetos inspecionadas: foto inteira em sua proporção original, composição com texto ao lado no desktop e abaixo no mobile. HTTP 200 confirmado no servidor de desenvolvimento. Nenhuma falha funcional ou overflow foi observado pela suíte. Sem validação em aparelho físico e sem nova medição de performance. Alteração registrada em commit local na branch feat/cinematic-landing, sem push, merge ou deploy.

## Cinematic Portfolio Backlight — 25/11/2026

Escopo de código restrito a src/sections/cinematic-portfolio-marquee.module.css. Sem alteração de dados, imagens, dimensões dos cards, espaçamento entre trilhas, velocidades/direções, controles, estrutura React ou outras seções. O refinamento acrescenta três fontes azuis estáticas atrás das esteiras, sombras ambientais e rim lighting discreto. Nenhuma biblioteca, loop JavaScript ou animação ambiental foi adicionada.

As sombras possuem 56px de espaço vertical de pintura, compensado por margens negativas em flow-root; a faixa de conteúdo recebe os eventos, evitando que as áreas transparentes sobrepostas capturem toques. Permanecem o recorte e a máscara horizontal. A inspeção das primeiras capturas identificou um limite horizontal perceptível no fundo da camada luminosa; foi corrigido com máscara vertical de transparência antes da entrega.

### Validação

- Capturas anteriores preservadas em `.cache/backlight-before/marquee-{320,390,430,1440}.png`, provenientes da última suíte antes do refinamento. Comparação de composição visual, sem pressupor a mesma fase de movimento dos cards.
- `npm run check`: saída 0; Prettier, ESLint sem avisos, 5 testes Vitest, TypeScript e build aprovados. Build final com fade: HTML 0,96 kB; CSS 25,47 kB (6,45 kB gzip); JS 251,94 kB (79,54 kB gzip).
- `npm run test:e2e`: saída 0, 46 execuções aprovadas em aproximadamente 1,9 minuto antes do ajuste final da máscara vertical. Confirma dimensões e espaçamento preservados, velocidades, sentidos e continuidade, pausa, teclado, foco, preferências de movimento, toques horizontais e rolagem vertical, foto e demais seções.
- A suíte específica de portfólio foi repetida no build final após a correção da máscara; resultado e inspeção das capturas registrados abaixo.
- Sem teste em aparelho físico ou medição de FPS, consumo, LCP/INP/CLS. A mudança não acrescenta processamento JavaScript por frame; não foram presumidas métricas de desempenho.

### Destino GitHub autorizado

O usuário autorizou expressamente criar `mariomoutinho/mario-gomes-portfolio` como privado e realizar o push. O repositório foi criado via API com auto_init=false, após verificar a conta autenticada; privacidade confirmada pela resposta. Credencial mantida somente em memória pelo Git Credential Manager, sem inclusão em arquivos ou logs. Origin configurado para https://github.com/mariomoutinho/mario-gomes-portfolio.git e acesso verificado com `git ls-remote --heads origin` (saída 0, sem branches no destino inicial).

Envio previsto das branches locais main (fundação original) e feat/cinematic-landing (implementação atual), preservando sua separação e sem merge ou deploy. O push e a verificação dos SHAs serão confirmados na entrega. Proteção de branch e revisão continuam conforme governança; o push não configura essas políticas.

Resultado final do refinamento: `npm run test:e2e -- tests/e2e/portfolio.spec.ts` terminou com saída 0, **20 execuções aprovadas em 38,8s** no build com fade final. Capturas posteriores de 320, 390, 430 e 1440px inspecionadas: luz concentrada atrás das trilhas, transição suave ao preto, sombras sem corte vertical abrupto, cores das imagens e legibilidade preservadas. A suíte confirma também distância de 16/24px entre cards das trilhas, dimensões e velocidades originais, continuidade, controles, foco e gestos nativos.

`npm run format:check` e `git diff --check` aprovados; HTTP 200 confirmado no servidor local mantido em http://127.0.0.1:5173/#trabalhos. Commit solicitado: `feat: enhance portfolio with cinematic backlight and ambient shadows`. Nenhum benchmark ou resultado de CI no GitHub foi presumido.

## Publicação no GitHub Pages — 25/11/2026

Autorização explícita do usuário para tornar o portfólio/repositório público e acessar pelo GitHub Pages. Repositório alterado para visibility=public e Pages configurado via API com build_type=workflow; resposta retornou https://mariomoutinho.github.io/mario-gomes-portfolio/. Não houve merge na main.

### Preparação e verificações locais

- Vite com base relativa `./`; caminhos das capas e do retrato usam import.meta.env.BASE_URL. O CSS emitido referencia `../fonts/manrope.ttf` e `../fonts/ibm-plex-mono.ttf`; scripts/estilos no HTML usam `./assets/`. Isso evita depender da raiz do domínio ao publicar na subpasta do repositório.
- Meta robots atualizada para index,follow após autorização; canonical e og:url apontam para a URL pública. A suíte foi atualizada para verificar a indexação autorizada.
- Workflow `.github/workflows/pages.yml`: push em feat/cinematic-landing ou disparo manual; npm ci, npm run check, upload de dist e deploy com OIDC. Somente o job deploy recebe pages:write e id-token:write. Actions oficiais fixadas por SHA e verificadas nas APIs dos respectivos repositórios. A configuração do Pages foi verificada contra a documentação oficial https://docs.github.com/en/rest/pages/pages.
- `npm run check`: saída 0; Prettier, ESLint, 5 testes Vitest, TypeScript e build aprovados. HTML 1,14 kB (0,52 kB gzip), CSS 25,48 kB (6,46 kB gzip), JS 251,94 kB (79,54 kB gzip).
- `npm run test:e2e`: 46 execuções aprovadas em aproximadamente 2 minutos, desktop e emulação mobile. Mantidas as verificações de rede, console, mídia, responsividade, menu, foto, controles e movimento.

A mudança de visibilidade e a ativação do Pages usam a autenticação local do Git Credential Manager; nenhuma credencial foi inserida no código ou nos arquivos versionados. Resultado do deploy remoto e homologação pública serão confirmados na entrega. O site ainda possui imagens ilustrativas claramente identificadas e contato comercial pendente; a publicação não transforma esses recursos em projetos reais nem concede licença geral de código/mídia.

### Resultado remoto e homologação pública

Deploy do commit `6e5b84a` concluído com sucesso no workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45645469294. O primeiro job de publicação foi recusado pela política padrão do ambiente github-pages, que não permitia feat/cinematic-landing. Inspecionada a configuração (somente política de branches); foi acrescentada especificamente a branch de implementação permitida, mantendo as demais regras. A repetição do job concluiu com sucesso, assim como o build e npm run check executados no Ubuntu do GitHub.

Homologação em Chromium contra a URL pública, sem autenticação, em 390px e 1440px: HTTP 200; 13 imagens carregadas em cada viewport, nenhuma falha de imagem, fontes Manrope/IBM Plex Mono confirmadas, sem overflow horizontal ou erros de página/respostas HTTP. Menu mobile abriu e fechou por Escape. Capturas completas `.cache/pages-live-390.png` e `.cache/pages-live-1440.png` inspecionadas. A consulta pública da API confirmou private=false e has_pages=true. A fonte publicada corresponde ao site atual, sem merge na main.

Site disponível em https://mariomoutinho.github.io/mario-gomes-portfolio/. O registro de validação posterior é enviado em commit somente de documentação com [skip ci], sem reconstruir o mesmo artefato. As próximas alterações normais na branch de implementação disparam publicação automática.

## Vídeo de casamento na abertura — 25/11/2026

Incluído o arquivo casamento.mp4 fornecido pelo usuário no espaço antes ocupado pelo placeholder frame. A cópia publicada fica em public/media/videos/casamento.mp4; o original na raiz foi preservado e ignorado para evitar duplicação no Git. Arquivo original sem recodificação: 43.764.318 bytes, 720 × 1280, aproximadamente 4min58s. Capa WebP de 20.926 bytes extraída do próprio vídeo no segundo 5, sem imagem substituta.

Enquadramento vertical integral preservado por object-fit: contain, com altura responsiva. Controles de reprodução/pausa e som abaixo da imagem, alvos de 44px e descrição textual. Autoplay sem som somente sem movimento reduzido, economia de dados ou conexão 2G; com essas preferências, preload=none e reprodução manual. Pausa ao sair da viewport ou ocultar a página. Nenhuma dependência adicionada. O filme não recebeu legendas: não foi fornecida transcrição; a descrição identifica a mídia, sem substituir eventual conteúdo falado.

Validação local: npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build); o build foi repetido após o ajuste final dos controles. Os testes das esteiras passaram a verificar ausência de players dentro da própria seção, permitindo o vídeo real na abertura. Novos testes E2E verificam capa, reprodução, dimensões, autoplay mudo, reprodução manual com movimento reduzido, áudio, pausa manual e pausa fora da viewport. Capturas de 390px e 1440px inspecionadas: enquadramento completo e controles legíveis, sem overflow horizontal. Os stubs de mídia no jsdom limitam-se aos testes; a reprodução é exercitada com o MP4 real no Chromium.

Resultado da suíte completa: npm run test:e2e terminou com saída 0, 50 execuções aprovadas em aproximadamente 1,5 minuto, nos projetos Chromium desktop e mobile. Sem teste em aparelho físico ou outros motores de navegador. Publicação seguirá o workflow já autorizado na branch feat/cinematic-landing.

Publicação concluída: commit 3dfa29a enviado para origin/feat/cinematic-landing; workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45648460022 finalizado com sucesso, incluindo npm run check no GitHub. Homologação do site público em Chromium nas larguras 390px e 1440px: HTTP 200, reprodução real avançando, dimensões 720 × 1280 e duração 297,677s confirmadas; controle de áudio e pausa funcionais, sem erro de mídia, erros de página, respostas HTTP >=400 ou overflow horizontal. Capturas da abertura .cache/wedding-live-390.png e .cache/wedding-live-1440.png inspecionadas. Registro posterior enviado como documentação com [skip ci], sem reconstrução do artefato validado.

## Correção da orientação e dos controles do casamento — 25/11/2026

A inspeção de um frame aos 50s confirmou que o conteúdo do arquivo 720 × 1280 estava deitado. A apresentação anterior preservava as dimensões do arquivo, mas deixava as cenas na orientação errada. Corrigido com rotação de -90° do elemento de vídeo e de sua capa, dentro de quadro responsivo 16:9. O MP4 original é preservado sem recodificação, sem corte de imagem e sem exigir rotação do celular. A propriedade rotateToLandscape é explícita na fonte deste filme.

Controles redesenhados segundo as capturas de referência fornecidas: cápsulas com fundo escuro translúcido sobre a imagem, ícones azuis, Ver vídeo/Pausar à esquerda e Clique para ouvir o som/Som ativado à direita. No celular o texto é Ouvir o som. Alvos com altura mínima de 44px, foco visível e nomes acessíveis preservados; barra de progresso de 2px integrada à base do quadro. Removidos os controles circulares e a legenda visual externa. Autoplay mudo, reprodução manual com movimento reduzido e pausa fora da viewport continuam ativos. Altura da abertura ajustada ao vídeo horizontal, evitando o espaço vertical anterior.

npm run check aprovado: formatação, ESLint, 5 testes Vitest, TypeScript e build. Testes E2E ampliados para verificar proporção visual 16:9, rotação -90°, controles dentro do quadro e alvos de toque. Reprodução real, áudio, pausa e ausência de overflow verificados também em preview local a 320px, 390px e 1440px. Capturas .cache/wedding-horizontal-local-{320,390,1440}.png inspecionadas em frame com pessoa: rosto na orientação correta e enquadramento inteiro. Validação em Chromium; sem aparelho físico ou outros motores de navegador.

Suíte completa npm run test:e2e: saída 0, 50 execuções aprovadas em aproximadamente 1,4 minuto no build final, projetos desktop e mobile. git diff --check aprovado. A correção será enviada à branch de implementação e publicada pelo workflow existente, sem merge na main.

Envio concluído: commit df3664f na branch origin/feat/cinematic-landing. O workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45651159325 aprovou o build e npm run check, mas a publicação foi recusada pelo serviço com HTTP 500 ao criar o deploy Pages. Duas tentativas de repetição (somente etapas com falha e somente job Publish site) também retornaram HTTP 500; consulta posterior confirmou run_attempt=1. O painel oficial https://www.githubstatus.com/api/v2/summary.json retornou Partial System Outage, Actions=partial_outage e Pages=degraded_performance. A versão pública corrigida não foi confirmada nem declarada publicada. A correção está disponível na prévia local http://127.0.0.1:5173/ e no código enviado; a publicação depende da recuperação do serviço e de uma repetição bem-sucedida. Este registro é somente documental, com [skip ci], preservando o workflow com falha para repetição posterior.

## Ocultação automática dos controles do vídeo — 25/11/2026

Os botões sobre o vídeo desaparecem após 3 segundos, inclusive na capa pausada. Um toque/clique no quadro ou nos controles volta a exibi-los e reinicia o prazo; movimento do ponteiro e hover não os revelam. O primeiro toque no quadro revela os controles sem alterar reprodução ou som. Os botões continuam na ordem de Tab e ficam visíveis enquanto há foco de teclado, evitando perder acesso ao player. Temporizador cancelado na desmontagem e reiniciado em cada interação; sem dependências novas. A barra fina de progresso permanece.

npm run check aprovado (formatação, lint, 5 testes Vitest, TypeScript e build); build repetido após remover regras CSS redundantes. Novo teste E2E cobre prazo de ocultação, ausência de revelação por hover, toque real na emulação mobile, clique no desktop, reprodução, nova ocultação e visibilidade persistente com foco de teclado. Resultado da suíte completa será registrado após conclusão. Validação em Chromium desktop e mobile emulado; sem teste em aparelho físico.

Resultado: npm run test:e2e aprovado com 52 execuções em aproximadamente 2 minutos, incluindo ocultação/revelação e teclado em ambos os projetos. npm run format:check e git diff --check aprovados após o registro. Consulta ao status oficial do GitHub ainda retornou Actions=partial_outage e Pages=partial_outage; o envio do código continua autorizado, sem pressupor publicação bem-sucedida.

## Harmonização do menu mobile — 25/11/2026

Menu aberto alinhado à identidade do portfólio: preto com iluminação radial azul estática, Manrope e IBM Plex Mono, marca com subtítulo original, divisórias suaves, links com espaçamento e foco azul, fechamento com alvo de 44px e rodapé Imagem. Ritmo. Intenção. Sem animação ambiental ou dependências novas. Mantidos dialog nativo, nomes acessíveis, bloqueio da rolagem de fundo, navegação por âncoras, Escape e restauração do foco. Em telas baixas o espaçamento é compacto; a área do dialog continua rolável quando necessário.

npm run check aprovado: formatação, lint, 5 testes Vitest, tipagem e build. Capturas do menu aberto .cache/menu-refined-{320,390,768}.png verificadas em prévia local; em 320 × 568, 390 × 844 e 768 × 1024, dimensões do dialog iguais à viewport e ausência de overflow horizontal ou vertical desnecessário. Fonte Manrope confirmada no estilo computado; seleção de Contato fecha o dialog e navega para #contato nos três tamanhos. A primeira captura de 320px mostrou o rodapé parcialmente abaixo da dobra; o espaçamento em telas baixas foi corrigido e a inspeção repetida. Suíte E2E completa em execução para verificar também foco, Escape e demais comportamentos do build. Sem teste em aparelho físico.

Resultado final: npm run test:e2e terminou com saída 0, 52 execuções aprovadas em 1,6 minuto no build final (Chromium desktop e mobile). A navegação do menu, Escape e foco passaram nos dois projetos; os demais comportamentos do site seguem aprovados. git diff --check sem erros. Push para a branch de trabalho autorizado de forma permanente; resultado da publicação automática será verificado separadamente.

Publicação confirmada: commit bc2c4ee enviado a origin/feat/cinematic-landing; workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45653461238 finalizado com sucesso, build e deploy aprovados. Homologação contra https://mariomoutinho.github.io/mario-gomes-portfolio/ em 320 × 568, 390 × 844 e 768 × 1024 confirmou o conteúdo novo BEYOND THE FRAME no dialog, fonte Manrope, ausência de overflow e fechamento/navegação ao selecionar Contato. Capturas .cache/menu-live-{320,390,768}.png; captura pública de 390px inspecionada e equivalente à prévia aprovada. Este deploy também contém os commits anteriores da branch que aguardavam publicação durante a indisponibilidade. Registro posterior somente documental enviado com [skip ci].

## Remoção do botão de movimento da abertura — 25/11/2026

Removido o botão Pausar/Retomar movimento abaixo do vídeo, conforme solicitado na captura. A abertura conserva somente Continue a história nesse espaço. Eliminados o estado global, a propriedade globalPaused e os estilos exclusivos do controle removido. Reprodução e som do vídeo, pausa local das esteiras, preferência de movimento reduzido e pausa automática fora da viewport continuam com seus controles próprios. Testes ajustados para conferir a ausência do botão na abertura e manter as verificações de teclado, timeline, visibilidade da página e viewport. Sem dependências novas.

Validação: npm run check aprovado (formatação, ESLint, 5 testes Vitest, TypeScript e build). npm run test:e2e aprovado: 52 execuções em 1,8 minuto em Chromium desktop e mobile, incluindo ausência do botão na abertura, controles do vídeo, menu, movimento reduzido, pausa das esteiras, teclado e gestos. Sem teste em aparelho físico. git diff --check aprovado.

Push do commit 50943fa concluído; deploy https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45654591780 finalizado com sucesso. Verificação no endereço público em 390px e 1440px: HTTP 200, nenhum botão de movimento na abertura, Continue a história visível. Capturas .cache/hero-no-motion-toggle-{390,1440}.png. Registro documental enviado com [skip ci].

## Integração da logo MG — 25/11/2026

Logo fornecida pelo usuário em Logotipo MG para Editor de Vídeo.png (2172 × 724, PNG transparente) aplicada no cabeçalho, menu mobile e rodapé por um componente compartilhado BrandLogo. Asset canônico em public/media/brand/mario-gomes-logo.png; original da raiz preservado e ignorado para evitar duplicação no Git. A fonte é predominantemente escura: invert(1) hue-rotate(180deg) adapta a apresentação ao fundo escuro, sem modificar o PNG, mantendo detalhes em azul claro. Contêiner com proporção 6:1 e object-fit: cover recorta somente as margens transparentes verticais do arquivo; nenhum elemento da marca é cortado. Texto alternativo Mário Gomes — Editor de vídeo e link de início preservados.

npm run check aprovado (formatação, lint, 5 testes Vitest, TypeScript e build). Prévia verificada em 320, 390, 1024 e 1440px: imagem decodificada com largura natural 2172px, sem overflow horizontal. Capturas .cache/logo-header-{320,390,1024,1440}.png e logo-footer-390.png inspecionadas; marca inteira e com contraste no fundo do site. Menu mobile também capturado após abrir e fechar por Escape. Suíte E2E completa do build será executada; sem teste em aparelho físico.

Resultado final: npm run test:e2e aprovado, 52 execuções em 1,5 minuto em Chromium desktop e mobile. git diff --check aprovado. A logo é servida com BASE_URL para funcionar também na subpasta do GitHub Pages. Alteração enviada na branch de trabalho, com publicação pelo workflow existente.

Publicação confirmada: commit f4c0f0d enviado e workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45656072736 concluído com sucesso (build e deploy). Homologação no endereço público em 320, 390, 1024 e 1440px: logo decodificada com largura natural 2172px, cabeçalho e rodapé com imagens carregadas, menu mobile abrindo/fechando por Escape e ausência de overflow horizontal. Capturas .cache/logo-live-header-{320,390,1024,1440}.png e correspondentes menu/rodapé. Registro posterior enviado como documentação com [skip ci], sem reconstruir o artefato validado.

## Botão central único e som habilitado — 25/11/2026

Substituídas as duas cápsulas por um único botão de reprodução/pausa central. Som habilitado por padrão (muted=false), sem botão separado de áudio. A abertura tenta autoplay com som quando as preferências de movimento/dados permitem; a política do navegador pode negar a tentativa. Nesse caso, o poster e o botão permanecem disponíveis para iniciar com um toque, sem fallback silencioso. Após começar a reprodução, o botão desaparece em 1 segundo; toque no quadro permite revelá-lo para pausar. Pausa e bloqueio de autoplay mantêm o botão visível; teclado conserva foco visível. Mantidas orientação horizontal, pausa fora da viewport/aba oculta e exclusividade entre players.

npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build). Capturas antes/depois .cache/central-play-{before,after}-{390,1440}.png verificadas: único botão central, reprodução real com muted=false e opacity=0 após 1,2s, em ambos os tamanhos. Testes E2E atualizados para início manual com áudio, centralização, ocultação, revelação/pausa, bloqueio de autoplay e autoplay autorizado com pausa por teclado. O teste de autoplay autorizado usa explicitamente --autoplay-policy=no-user-gesture-required; o caso bloqueado simula NotAllowedError sem interação e usa reprodução nativa após o toque. Isso verifica os dois caminhos sem presumir autorização automática em todos os navegadores. A primeira execução parou antes dos testes por launchOptions em escopo de describe; configuração movida para o topo do arquivo e suíte repetida. Sem teste em aparelho físico.

Resultado final: npm run test:e2e aprovado com 52 execuções em 1,6 minuto em Chromium desktop e mobile. Os três caminhos do vídeo passaram nos dois projetos, incluindo som ativo, botão central, ocultação após 1s, bloqueio de autoplay e teclado. git diff --check aprovado. Envio e publicação pela branch de trabalho já autorizada.

Publicação confirmada: commit 6c6abb0 enviado; workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45657790901 terminou com sucesso. Verificação do site público em 390px e 1440px: botão único acionado, reprodução avançando, muted=false e botão com opacity=0 após 1,2s. Capturas .cache/central-play-live-{before,after}-{390,1440}.png. Registro documental posterior enviado com [skip ci].

## Esmaecimento do botão central — 25/11/2026

Adicionada transição CSS de opacidade de 350ms ao controle central. O prazo existente de 1 segundo após iniciar a reprodução continua; em seguida o botão esmaece até desaparecer. A reaparição também é suave. Sem mudança em som, reprodução ou temporizador; sem JavaScript/dependências novos. A regra global de prefers-reduced-motion desativa a transição quando a pessoa prefere movimento reduzido.

Validação: npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build); npm run test:e2e -- tests/e2e/hero-video.spec.ts aprovado, 6 execuções em 14,8s, desktop e mobile. Inspeção automatizada com movimento permitido confirmou opacidade intermediária 0,185058 durante a transição e opacidade final 0; não é uma troca abrupta. Sem repetição da suíte das outras seções por se tratar de ajuste CSS isolado no controle. git diff --check aprovado.

Publicação concluída: commit bd7ddb0 enviado e workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45658343590 aprovado. Verificação no site público confirmou opacidade intermediária 0,254362 durante o esmaecimento e final 0. Registro documental posterior enviado com [skip ci].

## Prévia local: descendente do título e câmera ao fundo — 25/11/2026

Solicitação explícita para não fazer push desta alteração. Corrigido o recorte inferior do g de ganham com espaço interno no h1, preservando a animação de revelação e a tipografia existente. Seção de posicionamento recebeu uma câmera decorativa usando a imagem ilustrativa já existente creative-production.webp, sem nova mídia ou dependências. Imagem em tons de cinza, multiplicação suave, máscara radial que esmaece à esquerda e opacidade de 16% no desktop/10% no celular; camada atrás do conteúdo, sem eventos de ponteiro, alt vazio e aria-hidden. Mantida legibilidade dos textos e dos links.

npm run check aprovado: formatação, lint, 5 testes Vitest, TypeScript e build. Capturas locais .cache/positioning-camera-{390,1440,1616}.png inspecionadas: descendente do g inteiro, câmera esmaecida e texto legível; ausência de overflow horizontal. npm run test:e2e -- tests/e2e/foundation.spec.ts aprovado: 26 execuções em 56,2s, desktop e mobile, verificando layout e navegação do build. git diff --check aprovado. Sem teste em aparelho físico. Alteração somente local; sem commit, push ou deploy.

## Prévia local: limpeza abaixo das esteiras — 25/11/2026

Removidos o botão Pausar/Retomar movimento e o informativo abaixo das esteiras, conforme captura fornecida. Eliminados o estado de pausa manual, o componente MarqueeControls e os estilos exclusivos da faixa inferior. Mantidos os rótulos ilustrativos dos cards, a ampliação, a exploração manual, pausa por hover/foco, redução de movimento e pausa fora da viewport/aba oculta. Preservadas as alterações locais anteriores no título e no fundo de câmera. Mantida a solicitação de revisão local: sem commit, push ou deploy.

npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build). npm run test:e2e -- tests/e2e/portfolio.spec.ts aprovado: 20 execuções em 35,1s, desktop e mobile, cobrindo ausência dos elementos removidos, dimensões, velocidade, continuidade, navegação, foco e gestos. git diff --check aprovado; sem teste em aparelho físico.

## Prévia local: serviços de ponta a ponta e esteira de formatos — 25/11/2026

Corrigido o corte preto lateral da seção Serviços: a camada CinematicLightFlow recebia o max-width da regra genérica section > *, limitando o fundo junto com o conteúdo. O fundo agora ocupa toda a largura; textos continuam em contêiner alinhado e a nova esteira ocupa a faixa inteira. Mantidos o accordion Edição de vídeo e as alterações locais anteriores.

Adicionados formatos sugeridos e autorizados pelo pedido: Reels, Stories, Casamentos, Formaturas, YouTube, Institucionais, Eventos e Campanhas, com descrições de edição, sem promessas de captação ou histórico comercial inventado. Oito cards em loop CSS contínuo, duplicação aria-hidden/inert, pausa por hover/foco e fora da viewport/aba oculta. Com movimento reduzido, lista única estática com rolagem horizontal nativa; navegação por teclado disponível. Sem dependências novas. Mantida a revisão local: sem commit, push ou deploy.

npm run check final aprovado (formatação, lint, 5 testes Vitest, tipagem e build). Uma falha na aplicação inicial da edição interrompeu a primeira checagem; o arquivo foi restaurado com as alterações locais anteriores preservadas e a checagem repetida com sucesso. Capturas .cache/services-full-width-{390,1432}.png inspecionadas: fundo com x=0 e largura igual à viewport, sem corte lateral ou overflow horizontal. Novos E2E verificam largura do fundo, oito formatos, duplicação inacessível, rolagem com teclado, accordion, animação e pausas. Sem teste em aparelho físico.

Resultado: npm run test:e2e -- tests/e2e/foundation.spec.ts tests/e2e/services.spec.ts aprovado, 34 execuções em 1,2 minuto, desktop e mobile. git diff --check aprovado. Todas as alterações continuam somente na prévia local para revisão.

## Prévia local: remoção do bloco Edição de vídeo — 25/11/2026

Removido o accordion Edição de vídeo indicado na captura. A seção Serviços apresenta agora o título, a introdução e diretamente a esteira de formatos. Eliminados o componente ServiceAccordion, seu CSS e os dados usados exclusivamente pelo bloco; testes antigos de abertura e spotlight do accordion foram retirados, mantendo timeline, spotlight da abertura e verificações da esteira. Alterações locais anteriores preservadas. Sem commit, push ou deploy.

npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build). Prévia em 390px e 1432px capturada novamente: fundo continua de ponta a ponta, seção mais compacta, sem overflow horizontal. npm run test:e2e -- tests/e2e/foundation.spec.ts tests/e2e/services.spec.ts aprovado: 34 execuções em 1,1 minuto em desktop e mobile, incluindo ausência do bloco removido e navegação. Captura mobile final inspecionada. Sem teste em aparelho físico.

## Publicação das alterações locais revisadas — 25/11/2026

Usuário autorizou expressamente o push após revisar a prévia. O envio reúne correção do g e câmera esmaecida no posicionamento, remoção do controle/informativo abaixo do portfólio, serviços de ponta a ponta com esteira de oito categorias e remoção do accordion Edição de vídeo. Preservadas as verificações registradas em cada etapa; npm run format:check e git diff --check repetidos e aprovados antes do envio. Mantida a branch feat/cinematic-landing, sem merge na main.

Push confirmado: commit 1911015 enviado para origin/feat/cinematic-landing. Workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45718038232 aprovado, build e deploy concluídos. Homologação pública em 390px e 1440px: HTTP 200, oito categorias, câmera decorativa presente, nenhum botão de movimento no portfólio, nenhum accordion de serviço, fundo de serviços com largura da viewport, sem overflow horizontal ou erros de página. Capturas .cache/services-published-{390,1440}.png. Registro posterior enviado como documentação com [skip ci].

## Cinco esteiras por categoria e Sobre mim — 25/11/2026

Pedido autoriza uma esteira para Wedding Film (horizontal), XV Anos (horizontal), After Movie, Cultural e Corporativo e Institucional (verticais e horizontais). Categorias compartilhadas com a seção Serviços; a esteira de serviços agora contém cinco cards e indicação de formato. Portfólio com cinco faixas identificadas, direções alternadas, altura comum por breakpoint e proporção individual preservada. Corrigido cálculo de repetição/fase para somar larguras de cards mistos; observador por esteira pausa as faixas fora da viewport. Mantidos hover, foco, exploração manual, gesto horizontal, rolagem vertical, movimento reduzido e modal único.

Filme de casamento fornecido pelo usuário aparece primeiro em Wedding Film e abre no player com rotação correta, som e botão central já existentes. Sem player embutido nas cópias da esteira. As demais imagens continuam explicitamente ILUSTRATIVO e com créditos; não representam trabalhos reais. Reutilizadas as 12 referências existentes, com uma cópia horizontal ilustrativa adicional na Cultural: 13 cards ilustrativos e um vídeo real, sem mídia nova inventada. Os exemplos visuais não afirmam experiência em projetos específicos das categorias. Legendas do casamento continuam pendentes de transcrição fornecida.

Sobre mim substitui o aviso de apresentação em preparação por texto em primeira pessoa aprovado pelo usuário: 33 anos, Juazeiro do Norte/CE, seis anos na edição, narrativas personalizadas e atendimento em todo o Brasil. Dois destaques discretos reforçam experiência e abrangência. Dados centralizados; sem inferência de data de nascimento.

npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build). Capturas .cache/category-{wedding-film,after-movie,corporativo-institucional}-{390,1440}.png e .cache/about-personal-{390,1440}.png: títulos legíveis, formatos corretos, casamento na horizontal, texto pessoal completo e sem overflow. Suíte E2E completa atualizada para cinco esteiras, formatos mistos, velocidade, continuidade, foco, gestos e vídeo real no modal. Sem teste em aparelho físico.

Resultado final: npm run test:e2e aprovado com 62 execuções em 2,3 minutos, desktop e mobile. Cinco esteiras, 14 cards originais (13 ilustrativos e um vídeo real), formatos corretos por categoria, repetição contínua com cards mistos, sentidos alternados, velocidade, exploração manual, foco, gesto de toque e vídeo real no modal aprovados. npm run format:check e git diff --check serão repetidos antes do push autorizado. A apresentação pessoal e os cinco formatos foram conferidos em capturas locais; correção posterior apenas da descrição neutra do filme, sem mudança de comportamento.

Publicação confirmada: commit a053acb enviado; workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45741732989 aprovado. Homologação pública em 390px e 1440px confirmou cinco esteiras, capas decodificadas, casamento na primeira categoria, apresentação pessoal completa (33 anos, Juazeiro do Norte/CE, seis anos e atendimento nacional) e ausência de overflow horizontal. Capturas .cache/category-live-* e .cache/about-personal-live-*. Formatação e git diff --check aprovados antes do envio. Registro posterior enviado como documentação com [skip ci].

## Movimento das esteiras no celular — 25/11/2026

Reproduzida em Chromium com Pixel 7 emulado a pausa permanente na esteira de Serviços após um toque: o navegador mantém :hover e :focus-within mesmo sem mouse ou navegação por teclado. A pausa por hover agora se aplica somente a dispositivos com mouse preciso e hover real; a pausa por foco usa :focus-visible. Toques deixam a esteira continuar avançando. Mantidas as pausas por aba oculta, seção fora da tela e movimento reduzido do sistema, sem novos controles ou dependências.

Reprodução local confirmou movimento nas cinco categorias sem preferência por movimento reduzido. Acrescentados E2E móveis que verificam avanço real da transformação em cada categoria ao entrar na tela e continuidade da esteira de Serviços depois do toque. Os testes existentes cobrem retomada após gesto horizontal e rolagem vertical. Sem validação em aparelho físico; modelo e navegador foram solicitados ao usuário para eventual investigação específica.

Validação: npm run check aprovado (formatação, lint, 5 testes Vitest, tipagem e build). npm run test:e2e -- tests/e2e/services.spec.ts tests/e2e/portfolio.spec.ts aprovado: 32 execuções passaram em 52,7 segundos; dois casos exclusivos de toque foram ignorados no projeto desktop e aprovados no projeto mobile. Inclui movimento das cinco categorias, retomada após gesto, continuidade após toque nos serviços, foco de teclado, movimento reduzido e pausa em aba oculta.

Publicação confirmada: commit a8279f8 enviado; workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45743982939 aprovado. Conferência no endereço público com Pixel 7 emulado e movimento habilitado: todas as cinco categorias avançaram, e Serviços continuou com playState running após toque mesmo mantendo :hover e foco. Usuário informou Xiaomi Note 14 Pro; navegador e preferência de acessibilidade ainda não informados, sem validação física nesse modelo. Registro posterior enviado com [skip ci].

## Prévia local: retirada das indicações de orientação no Portfólio — 26/11/2026

Removidos os textos Horizontal e Vertical dos cabeçalhos das cinco esteiras da seção Portfólio, junto com o CSS exclusivo dessas legendas. Mantidos os nomes das categorias e as proporções das mídias. Escopo solicitado restrito ao Portfólio. Usuário pediu revisão antes do push: alterações somente locais, sem commit, push ou deploy.

Validação local: npm run check aprovado (formatação, lint, cinco testes Vitest, tipagem e build). npm run test:e2e -- tests/e2e/portfolio.spec.ts --grep "full-bleed" aprovado: dez execuções em 30 segundos, desktop e mobile, larguras de 320, 390, 430, 768 e 1440px. Conferidas as cinco categorias, proporções das mídias, carregamento das imagens e ausência de overflow horizontal. Sem teste em aparelho físico. Sem push ou deploy, aguardando autorização.

## Prévia local: Processo de edição — 26/11/2026

Seção 05 implementada conforme texto e captura enviados: divisão Você grava / Eu edito / Você recebe; aviso permanente de que captação é responsabilidade do cliente e não está inclusa; cinco etapas selecionáveis (Briefing, Envio, Edição, Revisão e Entrega), responsabilidades e playhead; checklist de quatro materiais e CTA contextual. Nenhuma condição comercial ou contato inventado. WhatsApp segue sem número: CTA preparado para a configuração existente, atualmente desabilitado e identificado como contato em breve. Sem upload ou funcionalidades de edição audiovisual.

Testes atualizados para os novos títulos e cinco etapas. Nova suíte verifica seleção individual por teclado, descrições, responsabilidades, posições conceituais do playhead, transição de 450ms e ausência de autoplay, movimento reduzido, checklist, CTA pendente, duas linhas de seletores com pelo menos 44px de altura e ausência de overflow em 320, 390, 430 e 1440px. Primeira execução revelou overflow de 4px em 320px causado pela camada radial decorativa; corrigido o inset horizontal. Teste de integração antigo também foi ajustado para distinguir rótulo do botão e novo título contextual.

Capturas locais de todas as cinco etapas em .cache/process-{390,1440}-*.png. Inspeção visual de Briefing no mobile e Edição no desktop: títulos, representação das responsabilidades, aviso de escopo, ondas, seleção e checklist legíveis; mídias e demais seções preservadas. Sem teste em aparelho físico. Preservadas alterações locais anteriores do Portfólio; sem commit, push ou deploy, aguardando autorização conforme solicitação direta anterior.

Resultado final: npm run check aprovado (formatação, lint, cinco testes Vitest, tipagem e build). npm run test:e2e -- tests/e2e/process.spec.ts tests/e2e/foundation.spec.ts aprovado: 36 execuções em 1,3 minuto em desktop e mobile, incluindo 320px após correção. npm run format:check e git diff --check repetidos ao concluir. Implementação pronta para revisão local; nenhuma publicação realizada.

## Envio autorizado das alterações revisadas — 26/11/2026

Usuário autorizou expressamente o push da prévia: inclui reformulação da seção Processo e remoção das legendas de orientação no Portfólio. Mantidos os resultados de check e E2E registrados acima, sem alterações adicionais de implementação. Envio na branch feat/cinematic-landing, sem merge na main.

Publicação confirmada: commit 3344eeb enviado para origin/feat/cinematic-landing. Workflow https://github.com/mariomoutinho/mario-gomes-portfolio/actions/runs/45820390837 aprovado. Homologação no site público em 390px e 1440px confirmou novo cabeçalho, aviso permanente sobre captação pelo cliente, cinco seletores, seleção de Entrega com descrição atualizada, ausência das legendas Horizontal/Vertical no Portfólio e ausência de overflow horizontal. Registro posterior enviado com [skip ci].
