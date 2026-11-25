# Arquitetura

## Evolução: landing page local

A especificação recebida em 25/11/2026 autoriza a interface comercial local. App compõe sete seções narrativas; dados em src/data, componentes em layout/media/motion/ui e seções interativas em src/sections. O Ato 03 usa PortfolioSection e CinematicPortfolioMarquee, com dados em src/data/portfolio.ts, transform via Web Animations API e modal único em components/media/portfolio-video-player.tsx. A galeria estática anterior foi removida por ter sido substituída. Não há novas dependências. A documentação abaixo registra a fundação original; o contrato visual vigente está em DESIGN_SYSTEM.md.

## Escopo original da fundação

Aplicação React estática de uma única entrada. `index.html → src/main.tsx → src/app/app.tsx`. StrictMode ativo. O App expõe somente uma região main vazia com rótulo técnico, estilizada por CSS Module. O HTML tem idioma pt-BR, título solicitado, viewport e noindex enquanto a fundação não é um site pronto. Remover noindex apenas na etapa de publicação aprovada.

Sem roteador, estado global, serviços, backend, autenticação ou abstrações de domínio antecipadas.

## Responsabilidades

| Caminho                                       | Responsabilidade                                               |
| --------------------------------------------- | -------------------------------------------------------------- |
| `src/app/`                                    | Composição e inicialização da aplicação                        |
| `src/components/layout/`                      | Estruturas reutilizáveis futuras                               |
| `src/components/ui/`                          | Elementos de interface futuros                                 |
| `src/components/motion/`                      | Movimento futuro, sujeito a aprovação e preferência do usuário |
| `src/components/media/`                       | Apresentação e carregamento de mídia futuros                   |
| `src/sections/`                               | Seções comerciais, após especificação                          |
| `src/hooks/`                                  | Hooks reutilizáveis com caso real                              |
| `src/config/`                                 | Configurações tipadas não secretas                             |
| `src/data/`                                   | Conteúdo declarativo aprovado                                  |
| `src/assets/`                                 | Recursos importados e processados pelo Vite                    |
| `public/media/{images,videos,posters,brand}/` | Arquivos públicos servidos diretamente, sem transformação      |
| `src/styles/`                                 | Reset, tokens, estilos globais e preferência de movimento      |
| `src/types/`                                  | Tipos compartilhados quando houver mais de um consumidor       |
| `src/utils/`                                  | Funções puras com necessidade demonstrada                      |
| `src/test/`                                   | Setup comum do Vitest e Testing Library                        |
| `tests/e2e/`                                  | Testes do build com Playwright                                 |
| `docs/`                                       | Decisões, escopo e evidências                                  |

As pastas reservadas usam .gitkeep. Testes de componentes ficam próximos ao código. Não criar componentes vazios ou arquivos barrel sem consumidores.

## Convenções e dependências

Componentes e tipos em PascalCase; funções, variáveis e hooks em camelCase, hooks com prefixo use; arquivos em kebab-case; classes locais em CSS Modules. Imports relativos enquanto a escala não justificar aliases. Conteúdo separado de renderização quando houver conteúdo aprovado; funções de dados não dependem da interface.

CSS global entra apenas em main.tsx, com tokens → reset → motion. Estilos de cada componente ficam no respectivo .module.css. CSS Custom Properties serão definidas em tokens.css depois da direção artística, sem paleta, tipografia ou escala arbitrárias nesta entrega.

## Configurações e qualidade

Um tsconfig.json cobre fonte, testes e ferramentas, com strict, noUncheckedIndexedAccess e exactOptionalPropertyTypes. Um vite.config.ts configura React; vitest.config.ts reutiliza essa configuração por mergeConfig e acrescenta somente o ambiente de teste. Não duplicar plugins ou criar configurações app/node sem necessidade técnica.

ESLint flat config, regras de hooks e React Refresh; eslint-config-prettier desliga regras conflitantes. Prettier cuida da formatação. Vitest usa jsdom e limpeza explícita após cada teste. Playwright é separado, testa dist via preview em Chromium desktop e viewport mobile, com preferência de movimento reduzido.

O package-lock.json deve acompanhar mudanças no package.json. npm ci é o caminho de reprodução em CI. Dependências sem ranges evitam atualizações diretas silenciosas; atualizar em PR próprio com verificação dos peer dependencies e testes. O cache npm é local e ignorado.

## Evolução e mídia

Não instalar bibliotecas de animação ou componentes nesta fase. Usar imports nomeados de Lucide quando os ícones forem definidos. A futura implementação deve respeitar HTML semântico, teclado, foco, contraste, redução de movimento e layouts fluidos. A fundação não afirma que um produto ainda inexistente é acessível.

Vídeos, posters, formatos, legendas, compressão, lazy loading e orçamentos de performance serão definidos quando os materiais e a experiência forem conhecidos. Não incluir mídia sem origem e permissão documentadas. Caminhos em public são públicos e não devem conter informações privadas.

## Referências técnicas

- [Vite: requisitos e início](https://vite.dev/guide/)
- [Vite: CSS Modules e Custom Properties](https://vite.dev/guide/features.html#css)
- [Vitest: configuração](https://vitest.dev/config/)
- [Playwright: instalação](https://playwright.dev/docs/intro)
- Metadados de versões, engines e peerDependencies consultados no registro oficial npm durante a preparação.
