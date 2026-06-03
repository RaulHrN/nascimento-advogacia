# Nascimento Advocacia

Projeto Next.js 16 com App Router, TypeScript e Tailwind CSS 4.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Estrutura

```txt
src/
  app/          Rotas, layouts e arquivos especiais do App Router
  components/   Componentes compartilhados
  lib/          Codigo compartilhado sem UI
  styles/       CSS global, Tailwind e tema
public/         Arquivos estaticos publicos
```

Arquivos de configuracao ficam na raiz do projeto, como `next.config.ts`,
`tsconfig.json`, `postcss.config.mjs` e `eslint.config.mjs`.

## Estilos

O ponto de entrada global e `src/styles/index.css`.

- `tailwind.css`: Tailwind CSS, `tw-animate-css` e `@source`.
- `theme.css`: tokens, tema, base global e animacoes locais.

As fontes sao carregadas por `next/font/google` no layout raiz para evitar
requisicoes externas no navegador.

## Seguranca

- Use `.env.local` para valores locais e secretos.
- Use `.env.example` apenas como modelo, sem credenciais reais.
- Nao coloque segredos em componentes client-side.
- Prefira helpers server-side em `src/lib` quando lidarem com credenciais.
