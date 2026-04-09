# Suporte Empreendedor

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.12-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)

Despachante digital para MEIs (Microempreendedores Individuais) no Brasil. Plataforma PWA instalável que oferece serviços especializados para formalização e manutenção de empresas.

## 🚀 Stack Tecnológica

- **TypeScript** 5.3.3 (strict mode)
- **Vite** 5.0.12 (build tool)
- **Tailwind CSS** 3.x (via CDN - Fase 1)
- **Lottie Web** (animações)
- **PWA** (Progressive Web App)
- **ESLint** + **Prettier** (code quality)

## 📋 Funcionalidades

- ✅ Abertura de MEI (R$ 97)
- ✅ Declaração Anual - DASN (R$ 67)
- ✅ Parcelamento de Débitos (R$ 127)
- ✅ Alteração Cadastral (R$ 67)
- ✅ Baixa do MEI (R$ 97)
- ✅ Consulta de Situação (R$ 47)
- ✅ Máscaras em tempo real (CPF, CNPJ, Telefone, CEP)
- ✅ Validação real de CPF/CNPJ
- ✅ Redirect para WhatsApp com dados formatados
- ✅ Mobile-first (320px - 1920px+)
- ✅ Lighthouse score ≥ 90

## 🏁 Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Verificar tipos TypeScript
npm run typecheck

# Executar lint
npm run lint
```

## 📁 Estrutura de Pastas

```
├── public/              # Arquivos estáticos
│   ├── assets/          # Ícones, SVGs, Lottie
│   ├── index.html       # HTML base
│   ├── manifest.json    # PWA manifest
│   └── robots.txt       # SEO
├── src/                 # Código TypeScript
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas do SPA
│   ├── utils/           # Funções utilitárias
│   ├── data/            # Dados estáticos
│   ├── types/           # Definições de tipos
│   └── main.ts          # Entry point
├── docs/                # Documentação
│   └── sprints/         # Histórico de sprints
├── css/                 # Estilos adicionais
├── tests/               # Testes unitários
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configurações TypeScript
├── vite.config.ts       # Configurações Vite
└── README.md            # Este arquivo
```

## 📖 Documentação

A documentação completa está disponível em [docs/](docs/).

- [Sprints](docs/sprints/) - Histórico de desenvolvimento

## ⚠️ Disclaimer

Este é um serviço privado, não vinculado ao governo federal, estados ou municípios. Somos independentes e não representamos nenhum órgão público.

---

© 2026 Suporte Empreendedor. Todos os direitos reservados.