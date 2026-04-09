# Sprint 07 — PWA Completo: Service Worker, SVGs dos Serviços e Polish

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Tornar o PWA instalável, funcional offline e visualmente polido com SVGs reais.

## 📁 Arquivos Criados

### Service Worker
- [x] `src/service-worker.ts` (TypeScript source)
- [x] `public/sw.js` (compiled JS)
  - Cache First para assets estáticos (CSS, JS, fonts, SVGs)
  - Network First para HTML/navigation requests
  - Stale-while-revalidate para API calls
  - Pre-cache dos assets essenciais no install
  - Cleanup de caches antigos no activate
  - Push notifications support
  - Cache versioning

### SVGs dos Serviços
- [x] `public/assets/svg/abertura.svg` — Documento com + (novo)
- [x] `public/assets/svg/declaracao.svg` — Relatório/checklist
- [x] `public/assets/svg/parcelamento.svg` — Moedas/parcelas
- [x] `public/assets/svg/alteracao.svg` — Lápis/edição
- [x] `public/assets/svg/baixa.svg` — Porta/saída
- [x] `public/assets/svg/consulta.svg` — Lupa/busca

### Ícones PWA
- [x] `public/assets/icons/icon.svg` — Icon principal
- [x] Atualizado `public/manifest.json` com todos os icon paths

### CSS Custom
- [x] `public/css/styles.css` — Custom styles que não podem ser feitos com Tailwind
  - Scrollbar customizada
  - Animações @keyframes (fadeIn, slideIn, pulse, shake, bounce, spin)
  - Classes utility (.no-scroll, .skeleton, .truncate-2, .truncate-3)
  - Responsive utilities (reduced-motion, high-contrast)
  - Safe area insets

### HTML Updates
- [x] `index.html` atualizado:
  - Preconnect para Google Fonts
  - Link para styles.css
  - Apple touch icons
  - Service Worker registration
  - Meta tags para PWA

## 🔧 Cache Strategy

### Assets Cacheados (Pre-cache no install)
```
/
/index.html
/manifest.json
/offline.html
/css/styles.css
/assets/icons/icon.svg
/assets/svg/abertura.svg
/assets/svg/declaracao.svg
/assets/svg/parcelamento.svg
/assets/svg/alteracao.svg
/assets/svg/baixa.svg
/assets/svg/consulta.svg
```

### Estratégias por Tipo de Request
| Tipo | Estratégia | Justificativa |
|------|-------------|---------------|
| Fonts (Google) | Cache First | Raramente mudam, offline-first |
| JS/CSS/Imagens/SVGs | Cache First | Assets estáticos, cacheável |
| HTML/Navigation | Network First | Conteúdo pode mudar, fallback offline |
| API (futuro) | Stale-While-Revalidate | Balance entre velocidade e fresh |

## ✅ Checklist de Aceite

- [x] Service Worker registra sem erros
- [x] Assets pré-cacheados no install
- [x] Navegação funciona offline (Network First + fallback)
- [x] Assets estáticos servidos do cache (Cache First)
- [x] SVGs dos 6 serviços criados (viewBox 48x48)
- [x] Ícones PWA configurados no manifest
- [x] CSS custom carregado
- [x] Navegação suave entre páginas
- [x] Responsividade verificada

## 🔜 Próximo Sprint

** Sprint 08 — Deploy e Finalização**

- Deploy no GitHub Pages
- Configurar GitHub Actions para build automático
- Lighthouse audit
- Testes finais
- Documentação final de entrega
- ReadMe completo

## 📝 Como Testar PWA

### Local
```bash
npm run build
npm run preview
# Acesse http://localhost:4173
# Abra DevTools > Application > Service Workers
```

### Install PWA
1. Abra no Chrome/Edge
2. DevTools > Application > Manifest
3. Verifique "Installable"
4. Clique "Install" button ou browser prompt

### Offline Test
1. DevTools > Network > Offline
2. Recarregue a página
3. Verifique que ainda funciona (offline.html fallback)

### Lighthouse
1. DevTools > Lighthouse
2. Run audit (PWA category)
3. Verifique scores ≥ 90