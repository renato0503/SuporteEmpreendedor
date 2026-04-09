# Sprint 03 — Funções Utilitárias: Máscaras, Validadores e WhatsApp

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Criar todas as funções utilitárias puras que serão usadas nos formulários e na conversão de leads.

## 📁 Arquivos Criados

### Utilitários de Máscaras
- [x] `src/utils/masks.ts` — Funções de formatação
  - `maskCPF()` — Formata CPF (000.000.000-00)
  - `maskCNPJ()` — Formata CNPJ (00.000.000/0000-00)
  - `maskPhone()` — Telefone com DDD, suporte a fixo e celular
  - `maskCEP()` — CEP (00000-000)
  - `maskCurrency()` — Formata moeda BRL
  - `maskDate()` — Data (DD/MM/AAAA)
  - `unmask()` — Remove caracteres não numéricos
  - `formatPhoneInternational()` — Formato brasileiro internacional (+55)
  - `isValidPhoneLength()` — Valida tamanho do telefone
  - `getPhoneType()` — Detecta celular vs fixo

### Utilitários de Validação
- [x] `src/utils/validators.ts` — Validadores com algoritmo real
  - `validateCPF()` — Algoritmo completo dos dígitos verificadores
  - `validateCNPJ()` — Algoritmo completo com pesos específicos
  - `validateEmail()` — Regex robusto com validação de length
  - `validatePhone()` — Aceita 10 (fixo) ou 11 (celular) dígitos
  - `validateName()` — Mín 3 chars, sem números, sem especiais
  - `validateCEP()` — Validação de 8 dígitos
  - `validateRequired()`, `validateMinLength()`, `validateMaxLength()`
  - `validateURL()`, `validateDate()`
  - `validateCPFOrCNPJ()` — Aceita CPF ou CNPJ
  - `validateFormField()` — Validador genérico por tipo de campo

### Utilitários WhatsApp
- [x] `src/utils/whatsapp.ts` — Integração WhatsApp
  - `formatWhatsAppMessage()` — Mensagem formatada com markdown
  - `generateWhatsAppURL()` — URL com texto encoded
  - `redirectToWhatsApp()` — Abre em nova aba
  - `formatQuickReplyMessage()` — Mensagem rápida
  - `generateWhatsAppLink()` — Gera link base
  - `isWhatsAppAvailable()` — Detecta dispositivo
  - `getWhatsAppInstallURL()` — URL de instalação

### Utilitários DOM
- [x] `src/utils/dom.ts` — Manipulação do DOM
  - `$()`, `$$()` — Query selectors
  - `createElement()` — Helper tipado para criação de elementos
  - `setHTML()`, `setText()` — Conteúdo
  - `addClass()`, `removeClass()`, `toggleClass()`, `hasClass()`
  - `show()`, `hide()`, `isVisible()`
  - `scrollToTop()`, `scrollToElement()`
  - `onReady()`, `delegate()`, `debounce()`, `throttle()`
  - `isElementInViewport()`, `focusElement()`

### Utilitários de Animações
- [x] `src/utils/animations.ts` — Animações CSS via JS
  - `fadeIn()`, `fadeOut()` — Promises com requestAnimationFrame
  - `slideIn()` — Direções (left, right, up, down)
  - `animatePageTransition()` — Transição entre páginas
  - `fadeInUp()`, `fadeInDown()`, `scaleIn()`
  - `pulse()`, `shake()` — Animações de feedback
  - `animateValue()` — Contador animado
  - Funções de easing: `easeOutCubic`, `easeInOutCubic`

### Utilitários de Analytics
- [x] `src/utils/analytics.ts` — Google Analytics + Meta Pixel
  - `initGA()`, `initMetaPixel()` — Inicialização segura
  - `trackPageView()`, `trackEvent()` — Tracking genérico
  - `trackServiceClick()`, `trackServiceView()` — Eventos de serviço
  - `trackFormStart()`, `trackFormSubmit()`, `trackFormError()` — Conversão
  - `trackWhatsAppRedirect()`, `trackWhatsAppClick()` — WhatsApp
  - `trackButtonClick()`, `trackScrollDepth()`, `trackTimeOnPage()`
  - `trackInstallPromptShown()`, `trackInstallPromptAccepted()`
  - `isGAInitialized()`, `isMetaPixelInitialized()` — Verificação de status

### Testes Unitários
- [x] `tests/masks.test.ts` — 25+ testes
  - Tests para cada função de máscara
  - Edge cases (null, undefined, strings vazias)
  - Limites de caracteres
  
- [x] `tests/validators.test.ts` — 30+ testes
  - CPFs válidos e inválidos
  - CNPJs válidos e inválidos
  - Emails válidos e inválidos
  - Nomes com acentos, hífens, números, especiais
  - Datas, CEPs, URLs
  
- [x] `tests/whatsapp.test.ts` — 15+ testes
  - Formatação de mensagens completas
  - Cenários com e sem CNPJ
  - Observações opcionais
  - URL encoding

## 🔧 Decisões Técnicas

### 1. Retorno de ValidationResult
**Decisão**: `{ valid: boolean, message?: string }`

**Justificativa**:
- API consistente para todos os validadores
- Mensagens em português para UI
- Campo `message` opcional para evitar clutter quando válido

### 2. Promises nas Animações
**Decisão**: Animações retornam Promise

**Justificativa**:
- Permite chaining de animações
- Coordenação de transições complexas
- testes unitários mais confiáveis

### 3. Analytics Seguro
**Decisão**: Verificar existência de gtag/fbq antes de chamar

**Justificativa**:
- Fallback graceful se scripts não carregam
- Não quebra app em desenvolvimento local
- Suporte a múltiplos pixels

### 4. Máscaras em Tempo Real
**Decisão**: Input event handler no componente, não no validador

**Justificativa**:
- Separação de concerns
- Máscara = formatação visual
- Validador = regras de negócio

## ✅ Checklist de Aceite

- [x] maskCPF formata corretamente (000.000.000-00)
- [x] maskCNPJ formata corretamente (00.000.000/0000-00)
- [x] maskPhone detecta celular (11 dígitos) vs fixo (10 dígitos)
- [x] validateCPF detecta CPFs inválidos (dígitos verificadores)
- [x] validateCNPJ detecta CNPJs inválidos (algoritmo completo)
- [x] validateEmail valida formato e length
- [x] formatWhatsAppMessage gera mensagem completa
- [x] generateWhatsAppURL cria URL válida
- [x] Animações retornam Promises
- [x] Analytics não quebra se GA/Pixel não carregados
- [x] Testes passam no Vitest

## 🔜 Próximo Sprint

**Sprint 04 — Componentes UI e Estrutura de Páginas**

- Criar estrutura de componentes (Header, Footer, etc.)
- Implementar sistema de páginas completo
- Adicionar ícones SVG inline
- Integrar animações Lottie
- Melhorar transições entre páginas
- Criar componentes de formulários reutilizáveis
- Adicionar loading states
- Implementar sistema de notifications/toasts