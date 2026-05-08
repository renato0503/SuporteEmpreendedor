# Suporte Empreendedor - Contexto das Interações

## Visão Geral do Projeto

Plataforma PWA completa para serviços de consultoria ao MEI (Microempreendedor Individual) no Brasil, desenvolvida com:
- **Frontend:** Vite + TypeScript + Tailwind CSS
- **Backend:** Firebase (Firestore, Hosting, Authentication)
- **Automação:** Servidor Node.js com whatsapp-web.js (Render)

---

## Funcionalidades Implementadas

### 1. Site Público (suporteempreendedor.com.br)

**Fluxo de Captura de Leads:**
1. Cliente clica em qualquer serviço
2. Abre modal com formulário (nome, WhatsApp, email)
3. Ao enviar:
   - Salva lead no Firebase Firestore (coleção "leads")
   - Cria agendamento "Primeiro Atendimento" na agenda (dia útil seguinte)
   - Mostra modal de preço com valor do serviço
   - Após 13 segundos, redireciona para WhatsApp com mensagem automática

**Blocos de Serviços (com preços visíveis):**
- Abertura MEI - R$ 135,00
- Declaração DASN - R$ 85,00
- Parcelamento - R$ 113,00
- Alteração Cadastral - R$ 88,00
- Baixa do MEI - R$ 97,00
- Consulta Situação - R$ 47,00

**Modal de Pagamento:**
- Botão PicPay com link de pagamento
- Chave PIX CNPJ com botão "Copiar"
- Mensagem após pagamento

### 2. Admin Panel (suporteempreendedor.web.app/admin)

**Páginas Implementadas:**
- Dashboard (KPIs, leads recentes, feed de atividades)
- Leads (CRM completo)
- Agenda (tarefas/compromissos com calendário)
- Financeiro (transações, DRE, filtros)
- Configurações (preços, segurança)
- Mensagens
- Analytics
- Kanban

**Funcionalidades Admin:**
- autenticação por senha (localStorage, 24h)
- Agenda com feriados e datas comemorativas (MT, CG, VG)
- Compromissos com cliente (nome, email)
- Envio de convite por email para cliente
- Sincronização Google Calendar

### 3. Automação WhatsApp

**Servidor Node.js (whatsapp-server/):**
- Localizado na pasta `whatsapp-server/`
- Hospedado no Render (gratuito)
- URL: https://suporte-empreendedor-whatsapp.onrender.com
- Funcionalidades:
  - Notificação automática ao admin quando novo lead
  - Resposta automática para mensagens recebidas

**APIs Disponíveis:**
- `POST /notify-admin` - Notifica novo lead
- `POST /send-message` - Envia mensagem
- `GET /status` - Verifica conexão

### 4. Email de Novos Leads

Implementado via EmailJS (precisa configuração):
- Destino: airton_50@htmail.com
- Código pronto no site, precisa das chaves do EmailJS

---

## URLs de Produção

- **Site:** https://suporte-empreendedor.web.app
- **Admin:** https://suporte-empreendedor.web.app/admin
- **WhatsApp Server:** https://suporte-empreendedor-whatsapp.onrender.com

---

## Estrutura de Arquivos Principais

```
├── index.html              # Site público com toda lógica de lead
├── admin.html             # Admin panel
├── firebase.json          # Config Firebase
├── whatsapp-server/       # Servidor WhatsApp
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── src/
    ├── admin/
    │   ├── pages/         # Páginas admin
    │   ├── components/    # Componentes admin
    │   ├── services/      # Serviços Firebase
    │   └── types/         # TypeScript types
    └── utils/
        ├── calendarUtils.ts
        ├── holidays.ts    # Feriados MT/CG/VG
        └── ...
```

---

## Pendências / Para Configurar

1. **EmailJS** - Precisa das chaves para enviar email de novos leads
2. **WhatsApp Server** - Precisa escanear QR Code uma vez no Render
3. **Preços** - Estão hardcoded no site, podem ser movidos para Firebase

---

## Problemas Resolvidos

- Modal de preço não aparecia (await bloqueando) → Promise não-bloqueante
- Botão copiar PIX não funcionava → Fallback para navegadores antigos
- Deploy Render falhou → Removido render.yaml conflitante
- Firebase Realtime Database expirando → Regras atualizadas

---

*Última atualização: 08/05/2026*