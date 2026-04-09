# Sprint 06 — Páginas do SPA: HomePage, ServicePage, NotFound, Offline

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Criar as "páginas" do SPA que compõem e orquestram os componentes já criados, e conectar tudo ao router para um SPA navegável e funcional.

## 📁 Arquivos Criados

### Páginas do SPA
- [x] `src/pages/HomePage.ts` — Página inicial completa
  - Hero Section com headline, sub-headline, CTA
  - Trust badges (atendimento rápido, dados protegidos, +2.000 atendidos)
  - ServiceGrid com serviços
  - Testimonials
  - FAQ accordion
  - CTA final antes do footer
  - Animações fadeIn com Intersection Observer

- [x] `src/pages/ServicePage.ts` — Página dinâmica de serviço
  - Busca serviço via slug (slug → serviceId mapping)
  - Breadcrumb: Home > Serviços > [Nome]
  - Back button
  - Info: título, descrição, valor, prazo, documentos
  - ContactForm com serviceId preenchido
  - FAQ específico do serviço
  - Animação slideIn from right

- [x] `src/pages/NotFoundPage.ts` — Página 404
  - Emoji grande 🔍
  - Mensagem amigável
  - Botão voltar para home
  - Serviços populares sugeridos

- [x] `src/pages/OfflinePage.ts` — Página offline
  - Ícone de Wi-Fi cortado
  - Checklist de soluções
  - Botão "Tentar novamente" (reload)
  - Dica sobre PWA offline

### Arquivos de Service Worker
- [x] `public/sw.js` — Service Worker para PWA
  - Cache de assets estáticos
  - Estratégia cache-first para navigation
  - Push notifications support
  - Offline fallback

- [x] `public/offline.html` — Página offline HTML puro
  - Versão standalone para quando offline
  - Tailwind via CDN

### Integração
- [x] `src/main.ts` — Atualizado com:
  - Import de todas as páginas
  - Registro de rotas no router
  - Header/Footer persistentes
  - Track de page views
  - Service Worker init
  - Offline handler

## 🔧 Decisões Técnicas

### 1. Mapeamento de Slugs
**Decisão**: Mapeamento explícito slug → serviceId

**Justificativa**:
- URLs amigáveis: `/abertura` ao invés de `/servico/abertura-mei`
- Suporte a múltiplos aliases: `abertura`, `abertura-mei` → mesmo serviço
- Separação clara da lógica de roteamento

### 2. Páginas como Funções Puras
**Decisão**: Cada página é uma função que recebe container

**Justificativa**:
- Reutilizável (pode renderizar em qualquer container)
- Facilita testing
- Limpa o container antes de renderizar nova página

### 3. Header/Footer Persistentes
**Decisão**: Header e Footer fora do router (#app)

**Justificativa**:
- Não precisa re-renderizar em cada navegação
- Melhora performance perceived
- Mais próximo de um app nativo

### 4. Service Worker com Cache-First
**Decisão**: Estratégia cache-first para navigation requests

**Justificativa**:
- Funciona offline
- Mais rápido para repeat visits
- PWA true offline capability

## ✅ Checklist de Aceite

- [x] HomePage compõe todos os componentes corretamente
- [x] ServicePage busca serviço correto via slug
- [x] 404 renderiza serviços sugeridos
- [x] OfflinePage detectável automaticamente
- [x] Routes registradas: /, /abertura, /declaracao, /parcelamento, /alteracao, /baixa, /consulta
- [x] Navegação funciona com hash-based routing
- [x] Service Worker registra sem erros
- [x] Analytics tracking de page views

## 🔜 Próximo Sprint

**Sprint 07 — Otimização Final e Deploy**

- Otimizar bundle size (code splitting)
- Adicionar preconnect para Google Fonts
- Implementar lazy loading de imagens
- Testes E2E com Playwright
- Deploy no GitHub Pages ou Vercel
- Lighthouse audit e otimizações
- Final checklist de entrega MVP