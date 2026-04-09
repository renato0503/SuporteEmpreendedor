# Suporte Empreendedor

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.12-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)
[![Vitest](https://img.shields.io/badge/Vitest-passing-success)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Despachante digital para MEIs (Microempreendedores Individuais) no Brasil.**

Plataforma PWA instalável que oferece serviços especializados para formalização e manutenção de empresas. Acesse em: **https://suporteempreendedor.com.br**

## 🚀 Funcionalidades

| Serviço | Preço | Prazo |
|---------|-------|-------|
| Abertura de MEI | R$ 97,00 | 3-5 dias |
| Declaração Anual (DASN) | R$ 67,00 | 1-2 dias |
| Parcelamento de Débitos | R$ 127,00 | 5-10 dias |
| Alteração Cadastral | R$ 67,00 | 2-3 dias |
| Baixa do MEI | R$ 97,00 | 3-5 dias |
| Consulta de Situação | R$ 47,00 | Imediato |

- ✅ Máscaras em tempo real (CPF, CNPJ, Telefone, CEP)
- ✅ Validação real de CPF/CNPJ (algoritmo completo)
- ✅ Redirect para WhatsApp com dados formatados
- ✅ Mobile-first (320px - 1920px+)
- ✅ PWA instalável (works offline)
- ✅ Lighthouse score ≥ 90

## 🛠️ Stack Tecnológica

- **TypeScript** 5.3.3 (strict mode)
- **Vite** 5.0.12 (build tool)
- **Tailwind CSS** 3.x (via CDN)
- **Vitest** (testes unitários)
- **PWA** (Service Worker + Manifest)

## 📋 Pré-requisitos

- Node.js 18+
- npm 9+

## 🚦 Como Rodar

```bash
# Clone o repositório
git clone https://github.com/renato0503/SuporteEmpreendedor.git
cd SuporteEmpreendedor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run test` | Executa testes unitários |

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes com coverage
npm run test -- --coverage
```

### Testes Criados

- `tests/masks.test.ts` - Testes de funções de máscara
- `tests/validators.test.ts` - Testes de validação CPF/CNPJ
- `tests/whatsapp.test.ts` - Testes de formatação WhatsApp
- `tests/router.test.ts` - Testes do router SPA

## 🌐 Deploy

### GitHub Pages (Automático)

O deploy é realizado automaticamente via GitHub Actions a cada push na branch `main`.

1. Fork este repositório
2. Faça push para `main`
3. O GitHub Actions executará: lint → typecheck → test → build → deploy

### Vercel (Alternativo)

```bash
# Instale a CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify (Alternativo)

Arraste a pasta `dist` para o Netlify Drop ou conecte o repositório.

## 📁 Estrutura de Pastas

```
├── src/
│   ├── components/    # Componentes UI (Header, Footer, etc.)
│   ├── pages/        # Páginas do SPA
│   ├── utils/       # Funções utilitárias
│   ├── data/        # Dados estáticos (serviços, FAQ)
│   ├── types/       # Definições TypeScript
│   ├── router.ts    # Router SPA
│   └── main.ts      # Entry point
├── public/
│   ├── assets/      # Icons, SVGs
│   ├── css/         # Estilos custom
│   ├── sw.js        # Service Worker
│   ├── manifest.json
│   └── index.html
├── tests/           # Testes unitários
├── docs/sprints/    # Documentação de sprints
└── package.json
```

## 🔒 Disclaimer

Este é um serviço **privado** e **opcional**, não vinculado ao governo federal, estados ou municípios. Somos independentes e não representamos nenhum órgão público.

## 📄 Licença

MIT License - Copyright (c) 2026 Renato Rosa

## 📖 Documentação

- [Sprints](docs/sprints/) - Histórico completo de desenvolvimento
- [Phase 1 Delivery](docs/sprints/SPRINT-08.md) - Entrega final da Fase 1

## 🔜 Roadmap

### Fase 2 (Planejado)
- Backend com banco de dados
- Sistema de login/cadastro
- Dashboard do cliente
- Histórico de serviços
- Notificações push reais
- Integração com APIs governamentais
- Relatórios em PDF
- Chatbot com IA
- Multi-idioma (EN, ES)

---

Feito com ❤️ por [Renato Rosa](https://github.com/renato0503)