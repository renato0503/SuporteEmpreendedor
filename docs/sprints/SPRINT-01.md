# Sprint 01 — Setup Base e Estrutura do Projeto

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Criar a fundação do projeto com todas as configurações e estrutura de pastas.

## 📁 Arquivos Criados

- [x] `package.json` — Dependências e scripts (typescript, vite, eslint, prettier, vitest, lottie-web)
- [x] `tsconfig.json` — TypeScript strict mode (ES2022, bundler, paths)
- [x] `tsconfig.node.json` — Configuração para Vite
- [x] `.eslintrc.json` — Regras TypeScript + ESLint
- [x] `.prettierrc` — Formatação (singleQuote, tabWidth: 2, trailingComma: all)
- [x] `.gitignore` — Node.js + dist + env
- [x] `vite.config.ts` — Alias @/, porta 3000
- [x] `public/index.html` — HTML base com Tailwind CDN, PWA meta tags, estrutura semântica
- [x] `public/manifest.json` — PWA config (name, icons, theme_color, shortcuts)
- [x] `public/robots.txt` — SEO básico
- [x] `README.md` — Documentação do projeto
- [x] `src/main.ts` — Lógica SPA (serviços, validação, máscaras, WhatsApp redirect)
- [x] `docs/sprints/SPRINT-01.md` — Este arquivo

## 📂 Estrutura de Pastas Criada

```
public/
  assets/
    icons/
    svg/
    lottie/
    images/
src/
  components/
  pages/
  utils/
  data/
  types/
  tests/
docs/
  sprints/
css/
```

## 🔧 Decisões Técnicas

1. **Tailwind CDN na Fase 1**: Decisão conscious de usar CDN para rápido desenvolvimento. Futura migração para build process quando necessário.

2. **TypeScript strict mode**: Maior segurança e menos bugs em tempo de desenvolvimento. Configuração `noEmit: true` para Vite lidar com transpilação.

3. **moduleResolution: bundler**: Compatibilidade com Vite e importações modernas. Suporta paths aliases.

4. **SPA sem router externo**: Implementação manual de pages com CSS transitions para manter leveza e controle total sobre animações.

5. **Validação CPF/CNPJ real**: Algoritmos matemáticos oficiais para garantir integridade dos dados antes do envio.

6. **Máscaras em tempo real**: Input events para formatação instantânea (CPF: 000.000.000-00, CNPJ: 00.000.000/0000-00).

## ✅ Checklist de Aceite

- [x] `npm install` executa sem erros
- [x] `npm run dev` inicia servidor Vite na porta 3000
- [x] index.html abre no navegador com Tailwind funcionando
- [x] Estrutura de pastas completa criada
- [x] manifest.json válido (formato JSON correto)
- [x] HTML semântico e acessível (header, main, footer, nav)
- [x] PWA meta tags configuradas
- [x] TypeScript compila sem erros

## 🔜 Próximo Sprint

**Sprint 02 — TypeScript Types + Router SPA + Dados Estáticos**

- Criar tipos TypeScript completos (Service, FormField, FormData, etc.)
- Implementar router SPA robusto com history API
- Separar dados estáticos em src/data/services.ts
- Componentizar Header, Footer, ServiceCard
- Adicionar testes unitários para validações
- Melhorar estrutura de pastas dos componentes