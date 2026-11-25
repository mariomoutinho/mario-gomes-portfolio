# Mário Gomes — Beyond the Frame

Fundação técnica de `mario-gomes-portfolio`, futuro portfólio audiovisual estático em português brasileiro. Esta entrega prepara engenharia e governança. A página renderiza uma raiz vazia intencionalmente, sem interface comercial, identidade visual, mídia ou animações.

## Ambiente

Node.js **24.19.0** (fixado em [.node-version](.node-version)) e npm **11.17.0**. As dependências diretas têm versões exatas no [package.json](package.json); o [package-lock.json](package-lock.json) registra a árvore resolvida. Use npm, sem misturar lockfiles.

Stack: React, TypeScript, Vite, CSS Modules, CSS Custom Properties, Lucide React, ESLint, Prettier, Vitest, React Testing Library e Playwright. Lucide está disponível para uso futuro, sem ícones arbitrários nesta fase. TypeScript 6.0.3 foi escolhido porque o typescript-eslint 8.74.0 declara suporte a TypeScript <6.1; o TypeScript 7 disponível no registro é incompatível com esse contrato.

## Executar

```powershell
Set-Location E:\mario-gomes-portfolio
npm ci
npm run dev
```

Abra o endereço local exibido pelo Vite. A tela vazia é esperada.

## Comandos

| Comando                    | Finalidade                                 |
| -------------------------- | ------------------------------------------ |
| `npm run dev`              | Servidor de desenvolvimento em loopback    |
| `npm run typecheck`        | TypeScript estrito sem emitir arquivos     |
| `npm run lint`             | ESLint sem avisos                          |
| `npm run format:check`     | Verificar formatação                       |
| `npm run format`           | Aplicar formatação                         |
| `npm test`                 | Testes de integração com DOM               |
| `npm run test:watch`       | Testes durante desenvolvimento             |
| `npm run build`            | Tipagem e build estático em dist/          |
| `npm run preview`          | Servir o build localmente                  |
| `npm run check`            | Formatação, lint, testes e build           |
| `npm run test:e2e:install` | Instalar Chromium para Playwright          |
| `npm run test:e2e`         | Testar build já gerado em desktop e mobile |

Para validar do zero:

```powershell
npm ci
npm run check
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.cache/ms-playwright"
npm run test:e2e:install
npm run test:e2e
```

A configuração E2E inicia e encerra seu próprio servidor de preview na porta 4173. A porta deve estar livre. Em Linux, instale também as dependências do navegador: `npx playwright install --with-deps chromium`. Não use o servidor de desenvolvimento como produção.

## Arquitetura e limites

Consulte [arquitetura](docs/ARCHITECTURE.md), [contrato futuro de design](docs/DESIGN_SYSTEM.md), [roadmap](docs/ROADMAP.md) e [validação](docs/VALIDATION.md). A base não tem backend, banco, autenticação, painel, rotas, animações ou bibliotecas de componentes.

## Git e GitHub

Repositório local independente em `E:\mario-gomes-portfolio`, branch inicial `main`; fora do Pindorama RPG. Não há remoto configurado nem publicação nesta entrega. Conta/organização e visibilidade no GitHub ainda precisam ser informadas.

Use branches curtas (`feat/...`, `fix/...`, `chore/...`), commits em inglês e PRs com problema, mudança, validação e limites. Identificadores de código em inglês; documentação, interface e descrição dos testes em pt-BR. Antes de mesclar, exigir revisão e o check `Quality and build`. A proteção de branch é uma configuração futura no GitHub; o arquivo de CI não a ativa.

Após definir conta, visibilidade e autorizar publicação, criar o remoto chamado `mario-gomes-portfolio` e enviar o histórico local. O workflow [.github/workflows/ci.yml](.github/workflows/ci.yml) fica pronto para PRs e pushes na main, sem deploy e com permissão somente de leitura. Não versionar credenciais, .env, node_modules, dist ou relatórios. Variáveis VITE_* são públicas no bundle: não devem conter segredos.

A licença do código e as permissões de imagens, vídeos, fontes e marcas permanecem pendentes. Nenhuma licença ou autoria de conteúdo externo foi presumida.
