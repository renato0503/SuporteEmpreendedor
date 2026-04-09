# Sprint 05 — Componentes Interativos: ContactForm, Accordion, Testimonials, Modal

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Criar os componentes interativos que permitem ao usuário interagir com a página: formulários, FAQ, depoimentos e modais.

## 📁 Arquivos Criados

### Formulário de Contato
- [x] `src/components/ContactForm.ts` — Formulário completo com:
  - Campos dinâmicos baseados no serviço (CPF sempre, CNPJ condicional)
  - Máscaras em tempo real (input event)
  - Validação on blur e on submit
  - Feedback visual: borda verde/vermelha + ícones
  - Contador de caracteres (observações)
  - Checkbox de termos obrigatório
  - Loading state + prevenção double-submit
  - Tracking: `trackFormStart`, `trackFormSubmit`, `trackFormError`

### FAQ Accordion
- [x] `src/components/Accordion.ts` — FAQ interativo com:
  - Animação smooth (max-height transition)
  - Apenas 1 item aberto por vez (configurável)
  - Rotação do ícone 180° ao abrir
  - Acessibilidade: `aria-expanded`, `aria-controls`, `role="button"`
  - Navegação por teclado (Enter/Space)
  - Link para WhatsApp no final da seção

### Depoimentos
- [x] `src/components/Testimonials.ts` — Carousel + grid com:
  - Layout: carousel mobile (swipe), grid desktop
  - Cada card: estrelas, texto com aspas decorativas, nome, cidade
  - Animação fade-in on scroll (Intersection Observer)
  - Navigation: prev/next buttons + dots indicator
  - Touch/swipe support no mobile

### Modal Reutilizável
- [x] `src/components/Modal.ts` — Modal genérico com:
  - Props: title, content (HTML), onClose, size (sm/md/lg)
  - Overlay escuro com backdrop-blur
  - Animação: fade-in overlay + scale-in content
  - Fechar: X button, overlay click, Escape key
  - Focus trap (Tab não sai do modal)
  - Pre-built modals: `showTermsModal()`, `showPrivacyModal()`

## 🔧 Decisões Técnicas

### 1. Validação em Tempo Real
**Decisão**: Validar no evento `blur` + validar todos no `submit`

**Justificativa**:
- Evita spam de erros enquanto usuário ainda está preenchendo
- Validação completa no submit garante dados válidos antes do envio
- Combinado com masks no `input` event para UX fluida

### 2. Máscaras via input event
**Decisão**: Aplicar máscara no `input` event

**Justificativa**:
- Mais responsivo que `keyup` ou `keydown`
- Funciona com paste e autocomplete
- Separação clara: mask = formatação visual, validator = regras

### 3. CNPJ Condicional
**Decisão**: Mostrar campo CNPJ apenas para serviços que precisam

**Justificativa**:
- Abertura de MEI não precisa de CNPJ (vai gerar um)
- Demais serviços precisam do CNPJ existente
- Reduz clutter e confusão para o usuário

### 4. Accordion Single-Open
**Decisão**: Apenas 1 item aberto por vez

**Justificativa**:
- Melhora experiência mobile (menos scroll)
- Clareza na navegação
- Configurável para múltiplos via prop `allowMultiple`

### 5. Modal Focus Trap
**Decisão**: Tab循环 dentro do modal

**Justificativa**:
- Requisito de acessibilidade WCAG
- Impede que usuário "fuga" do modal com Tab
- Aplicado tanto para buttons quanto links e inputs

## ✅ Checklist de Aceite

- [x] ContactForm aplica máscaras em tempo real (CPF, CNPJ, Phone)
- [x] ContactForm mostra feedback visual (borda + ícone)
- [x] ContactForm valida todos os campos no submit
- [x] ContactForm previne double-submit (loading state)
- [x] ContactForm redireciona para WhatsApp com dados formatados
- [x] Accordion abre/fecha com animação smooth
- [x] Accordion rotaciona ícone ao abrir
- [x] Accordion suporta navegação por teclado
- [x] Testimonials mostra carousel no mobile
- [x] Testimonials suporta swipe/touch
- [x] Testimonials tem fade-in on scroll
- [x] Modal fecha com X, overlay click e Escape
- [x] Modal tem focus trap implementado
- [x] Modal tem content dinâmico (pode passar HTML)

## 🔜 Próximo Sprint

**Sprint 06 — Páginas do Router e Integração Completa**

- Criar páginas completas (Home, Serviço, Confirmação, Sobre)
- Integrar router com todos os componentes
- Adicionar página de política de privacidade e termos
- Implementar Service Worker para PWA
- Otimizar performance e acessibilidade final
- Testes E2E básicos