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
