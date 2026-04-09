# Sprint 02 — TypeScript Types, Router SPA e Dados Estáticos

## 📅 Data: 09/04/2026

## 🎯 Objetivo
Criar o sistema de tipos TypeScript, o roteador SPA hash-based e os dados estáticos dos serviços.

## 📁 Arquivos Criados

### Tipos TypeScript
- [x] `src/types/index.ts` — Todas as interfaces e tipos do projeto
  - `ServiceId` — Union type dos 6 serviços
  - `Service` — Interface completa do serviço
  - `FormField` — Campos de formulário com validação
  - `LeadFormData` — Dados do lead/cliente
  - `FAQItem` — FAQ com palavras-chave
  - `Testimonial` — Depoimentos
  - `Route`, `AppConfig`, `WhatsAppConfig` — Configurações
  - `BeforeInstallPromptEvent` — PWA events
  - `RouterRoute` — Rotas do router

### Dados Estáticos
- [x] `src/data/config.ts` — Configurações globais
  - `APP_CONFIG` —whatsappNumber, siteName, etc.
  - `WHATSAPP_BASE_URL`, `ROUTES`, `SEO_DEFAULTS`
  - `COLORS`, `SERVICE_PRICES`, `VALIDATION_MESSAGES`

- [x] `src/data/services.ts` — 6 serviços completos
  - `abertura-mei` — R$ 97, prazo 3-5 dias
  - `dasan` — R$ 67, prazo 1-2 dias
  - `parcelamento` — R$ 127, prazo 5-10 dias
  - `alteracao-cadastral` — R$ 67, prazo 2-3 dias
  - `baixa-mei` — R$ 97, prazo 3-5 dias
  - `consulta-situacao` — R$ 47, prazo imediato
  - Helper functions: `getServiceBySlug`, `getServiceById`, `getAllServices`, etc.

- [x] `src/data/faq.ts` — FAQs completos
  - 6 perguntas gerais sobre MEI
  - FAQs específicos por serviço
  - Funções helper para busca

- [x] `src/data/testimonials.ts` — 6 depoimentos
  - Diferentes serviços e cidades (SP, MG, PR, BA, CE, RS)
  - Ratings 4-5 estrelas
  - Funções helper: `getTestimonialsByService`, `getTopTestimonials`, etc.

### Router SPA
- [x] `src/router.ts` — Router hash-based completo
  - Classe `Router` com métodos: `addRoute`, `navigate`, `getCurrentRoute`, `handleRoute`
  - Suporte a parâmetros dinâmicos (`:slug`)
  - Middlewares: `beforeEach`, `afterEach`
  - Transições suaves entre páginas
  - Atualização de title e meta tags
  - Scroll to top automático
  - Handler 404

### Integração
- [x] `src/main.ts` — Atualizado com imports dos novos módulos
  - Importação de `APP_CONFIG` e `WHATSAPP_BASE_URL`
  - Uso de `SERVICES` para dados completos
  - Estrutura mantida para compatibilidade

## 🔧 Decisões Técnicas

### 1. Router Hash-Based vs History API
**Decisão**: Hash-based (`#/`)

**Justificativas**:
- **Compatibilidade universal**: Funciona em todos os navegadores sem configuração de servidor
- **Sem necessidade de server-side**: Ideal para hospedagem estática (GitHub Pages, Netlify, Vercel)
- **Simplicidade de deploy**: Não requer redirecionamentos no servidor
- **Funciona offline**: PWA funciona melhor com hash routing

**Trade-offs**:
- URLs menos amigáveis (`#/` vs `/`)
- Não suporta SEO server-side ideal
- Para SEO avançado, seria necessário migration para History API com fallback

### 2. Estrutura de Tipos
**Decisão**: Tipos genéricos com union types para ServiceId

**Justificativas**:
- Type safety completo no strict mode
- União literal para IDs previne erros de string
- Interfaces completas para dados de formulário e configuração

### 3. Dados Estáticos em Arquivos Separados
**Decisão**: Separação por domínio (services, faq, testimonials)

**Justificativas**:
- Manutenção facilitada
- Tree-shaking possível em build futuro
- testes unitários mais simples
- IDE autocomplete melhor

### 4. Campos de Formulário no Config
**Decisão**: Campos por serviço em `formFieldsConfig`

**Justificativas**:
- Separação de dados (services.ts) da lógica de formulário
- Flexibilidade para adicionar/remover campos sem alterar estrutura de tipos
- Migração futura para banco de dados facilitada

## ✅ Checklist de Aceite

- [x] Tipos TypeScript compilam sem erros
- [x] `getServiceBySlug('abertura-mei')` retorna serviço correto
- [x] Router navega corretamente entre páginas
- [x] Title atualiza a cada navegação
- [x] Scroll to top funciona nas transições
- [x] 404 handler renderiza corretamente
- [x] main.ts integra todos os módulos
- [x] Máscaras e validações funcionando

## 🔜 Próximo Sprint

**Sprint 03 — Componentes UI e页面**

- Componentizar: Header, Footer, ServiceCard, ServiceForm, etc.
- Criar sistema de navegação entre páginas
- Adicionar Lottie para animações
- Melhorar transitions e animações CSS
- Adicionar testes unitários para validações
- Criar arquivos de icons SVG