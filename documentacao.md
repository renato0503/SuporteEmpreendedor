**Documentação Completa — Plataforma "Suporte Empreendedor"

Repositório: [github.com/renato0503/SuporteEmpreendedor](https://github.com/renato0503/SuporteEmpreendedor)Versão do Documento: 2.0.0
Última Atualização: Junho 2025
Status: Em Desenvolvimento Ativo

---

📑 Índice Geral

text

1. Resumo Executivo
2. Visão e Missão do Produto
3. Glossário de Termos
4. Personas e Público-Alvo
5. Jornada do Cliente (Funil Completo)
6. Requisitos Funcionais (RF)
7. Requisitos Não-Funcionais (RNF)
8. Arquitetura Técnica
9. Estrutura de Pastas do Repositório
10. Stack Tecnológica
11. Módulos do PWA (Front-end)
12. Painel Administrativo (Back-office)
13. Integrações Externas
14. Segurança, LGPD e Compliance
15. Estratégia de Deploy e CI/CD
16. Roadmap de Fases
17. Guia de Contribuição (CONTRIBUTING)
18. Guia de Estilo e Design System
19. Plano de Testes
20. Apêndices e Referências

---

1. Resumo Executivo

A plataforma Suporte Empreendedor é um "despachante digital" privado voltado para Microempreendedores Individuais (MEI) no Brasil. Ela resolve um problema real: a complexidade burocrática enfrentada por milhões de MEIs ao lidar com portais governamentais para serviços como abertura de CNPJ, declaração anual (DASN-SIMEI), parcelamento de débitos, alteração cadastral e baixa do MEI.

O Problema

| Dor do Cliente                               | Impacto                      |
| -------------------------------------------- | ---------------------------- |
| Portais governamentais confusos e instáveis | Desistência, inadimplência |
| Falta de conhecimento técnico/fiscal        | Multas, cancelamento do CNPJ |
| Dificuldade de acesso via celular            | Exclusão digital            |
| Custo alto de contadores tradicionais        | Margem de lucro já apertada |

A Solução

Um PWA (Progressive Web App) que funciona como aplicativo nativo, oferecendo:

* Interface intuitiva e guiada para cada serviço
* Formulários inteligentes com validação em tempo real
* Atendimento humanizado via WhatsApp (MVP) evoluindo para CRM completo
* Cobrança transparente de honorários pelo serviço de despachante

Modelo de Receita

text

┌─────────────────────────────────────────────────┐

│  SERVIÇO                 │  HONORÁRIO ESTIMADO   │

├─────────────────────────────────────────────────┤

│  Abertura MEI            │  R$ 97 – R$ 197       │

│  Declaração Anual (DASN) │  R$ 67 – R$ 127       │

│  Parcelamento de Débitos │  R$ 127 – R$ 247      │

│  Alteração Cadastral     │  R$ 67 – R$ 127       │

│  Baixa do MEI            │  R$ 97 – R$ 147       │

│  Consulta de Situação    │  R$ 47 – R$ 97        │

└─────────────────────────────────────────────────┘

Nota: Valores de honorários são referência e serão definidos pela equipe comercial. Não incluem taxas governamentais (DAS, DARF, etc.).

---

2. Visão e Missão do Produto

Visão

Ser a principal referência digital em serviços de apoio ao MEI brasileiro, eliminando barreiras burocráticas com tecnologia acessível, segura e humana.

Missão

Simplificar a vida do Microempreendedor Individual oferecendo uma plataforma digital premium que transforma processos burocráticos complexos em experiências simples, rápidas e confiáveis.

Valores do Produto

| Valor          | Descrição                                                      |
| -------------- | ---------------------------------------------------------------- |
| Simplicidade   | Cada tela resolve uma dúvida. Zero complexidade desnecessária. |
| Transparência | Preços claros, sem letras miúdas escondidas.                   |
| Segurança     | Dados tratados com responsabilidade (LGPD).                      |
| Acessibilidade | Funciona em qualquer celular, inclusive com internet lenta.      |
| Confiança     | Comunicação que transmite autoridade e profissionalismo.       |

---

3. Glossário de Termos

| Termo          | Definição                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| MEI            | Microempreendedor Individual — categoria empresarial simplificada (faturamento até R$ 81 mil/ano). |
| DASN-SIMEI     | Declaração Anual do Simples Nacional do MEI — obrigação fiscal anual.                           |
| DAS            | Documento de Arrecadação do Simples Nacional — boleto mensal do MEI.                              |
| CNPJ           | Cadastro Nacional da Pessoa Jurídica.                                                               |
| PWA            | Progressive Web App — aplicação web que se comporta como app nativo.                              |
| SPA            | Single Page Application — aplicação de página única sem recarregamento.                         |
| CRM            | Customer Relationship Management — gestão de relacionamento com clientes.                          |
| Lead           | Potencial cliente que demonstrou interesse preenchendo um formulário.                               |
| Kanban         | Metodologia visual de gestão de fluxo de trabalho em colunas.                                       |
| MVP            | Minimum Viable Product — versão mínima funcional para validação.                                |
| Service Worker | Script que roda em segundo plano no navegador, permitindo cache offline.                             |
| Lottie         | Formato de animação baseado em JSON, leve e escalável.                                            |
| LGPD           | Lei Geral de Proteção de Dados (Lei nº 13.709/2018).                                              |
| Honorários    | Taxa cobrada pelo serviço de assessoria/despacho (não é taxa governamental).                      |

---

4. Personas e Público-Alvo

Persona Primária — "Carlos, o MEI Batalhador"

text

👤 Nome: Carlos Eduardo

🎂 Idade: 34 anos

📍 Localização: Periferia de São Paulo - SP

📱 Dispositivo: Smartphone Android (entrada), internet 4G instável

💼 Ocupação: Eletricista autônomo, MEI há 2 anos

💰 Renda mensal: R$ 2.500 – R$ 4.000

🎓 Escolaridade: Ensino médio completo

DORES:

- Não entende o portal do governo
- Já perdeu prazo da DASN e pagou multa
- Tem medo de "fazer errado e perder o CNPJ"
- Não tem tempo de ir a um contador

COMPORTAMENTO DIGITAL:

- Usa muito WhatsApp e Instagram
- Pesquisa no Google quando tem dúvida
- Prefere resolver tudo pelo celular
- Confia em sites que "parecem profissionais"

GATILHOS DE DECISÃO:

- Preço justo e transparente
- Rapidez na resolução
- Atendimento humano (WhatsApp)
- Visual que transmita segurança

Persona Secundária — "Ana, a MEI Iniciante"

text

👤 Nome: Ana Paula

🎂 Idade: 28 anos

📍 Localização: Belo Horizonte - MG

📱 Dispositivo: iPhone (intermediário), Wi-Fi em casa

💼 Ocupação: Confeiteira, quer formalizar o negócio

💰 Renda mensal: R$ 1.800 – R$ 3.000

🎓 Escolaridade: Superior incompleto

DORES:

- Não sabe por onde começar para abrir MEI
- Tem medo de burocracia
- Já tentou sozinha e desistiu no Gov.br

COMPORTAMENTO DIGITAL:

- Muito ativa no Instagram (segue perfis de empreendedorismo)
- Assiste reels e stories sobre "como abrir MEI"
- Clica em anúncios que oferecem soluções práticas

GATILHOS DE DECISÃO:

- "Faço tudo por você"
- Depoimentos de outros clientes
- Visual bonito e moderno

Persona Administrativa — "Renato, o Operador"

text

👤 Nome: Renato (Administrador)

💼 Papel: Dono da operação / Despachante digital

🖥️ Dispositivo: Desktop e celular

NECESSIDADES:

- Ver todos os leads que chegaram
- Saber o status de cada atendimento
- Controlar recebimentos
- Não perder nenhum cliente no funil
- Ter métricas claras de conversão

---

5. Jornada do Cliente (Funil Completo)

Diagrama do Funil

text

╔══════════════════════════════════════════════════════════════════╗

║                    FUNIL DE AQUISIÇÃO E ENTREGA                 ║

╠══════════════════════════════════════════════════════════════════╣

║                                                                  ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  1. ATRAÇÃO (TOPO DO FUNIL)                 │                ║

║  │  ─────────────────────────────              │                ║

║  │  • Google Ads (palavras-chave MEI)          │                ║

║  │  • Meta Ads (Instagram/Facebook)            │                ║

║  │  • SEO orgânico (blog/conteúdo)             │                ║

║  │  • Indicação de clientes satisfeitos        │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  2. ATERRISSAGEM (LANDING PAGE)             │                ║

║  │  ─────────────────────────────              │                ║

║  │  • PWA carrega em < 2 segundos              │                ║

║  │  • Hero Section com proposta de valor       │                ║

║  │  • Grid de serviços visualmente atrativo    │                ║

║  │  • Gatilhos: segurança, autoridade, prova   │                ║

║  │    social                                    │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  3. ENGAJAMENTO (PÁGINA DO SERVIÇO)         │                ║

║  │  ─────────────────────────────              │                ║

║  │  • Descrição clara do serviço               │                ║

║  │  • Valor do honorário visível               │                ║

║  │  • FAQ accordion animado                    │                ║

║  │  • Formulário inteligente com máscaras      │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  4. CONVERSÃO (FORMULÁRIO ENVIADO)          │                ║

║  │  ─────────────────────────────              │                ║

║  │  [MVP] → Redirect WhatsApp com dados        │                ║

║  │  [V2]  → Dados → Banco → CRM Kanban         │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  5. ATENDIMENTO E PAGAMENTO                 │                ║

║  │  ─────────────────────────────              │                ║

║  │  • Contato via WhatsApp / E-mail            │                ║

║  │  • Envio de link de pagamento (PIX/Boleto)  │                ║

║  │  • Confirmação automática ou manual         │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  6. EXECUÇÃO DO SERVIÇO                     │                ║

║  │  ─────────────────────────────              │                ║

║  │  • Operador executa no portal Gov.br        │                ║

║  │  • Atualiza status no CRM                   │                ║

║  │  • Cliente acompanha (WhatsApp ou PWA V2)   │                ║

║  └──────────────────┬──────────────────────────┘                ║

║                     ▼                                            ║

║  ┌─────────────────────────────────────────────┐                ║

║  │  7. ENTREGA E RETENÇÃO                      │                ║

║  │  ─────────────────────────────              │                ║

║  │  • Envio do comprovante/documentação        │                ║

║  │  • Pedido de avaliação / depoimento         │                ║

║  │  • Sugestão de instalar PWA na tela inicial │                ║

║  │  • Notificação futura (ex: lembrete DASN)   │                ║

║  └─────────────────────────────────────────────┘                ║

║                                                                  ║

╚══════════════════════════════════════════════════════════════════╝

Detalhamento por Etapa

5.1 — Atração (Tráfego)

Canais de Aquisição:

| Canal         | Estratégia                        | Palavras-chave / Segmentação                                              |
| ------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| Google Ads    | Search Ads com intenção de busca | "como abrir MEI", "parcelar dívida MEI", "declaração anual MEI atrasada" |
| Meta Ads      | Criativos em Reels/Stories         | Público: 25-50 anos, interesse em empreendedorismo, MEI                    |
| SEO Orgânico | Blog posts otimizados (Fase 3)     | Long-tail: "passo a passo para abrir MEI 2025"                              |
| Indicação   | Programa de indicação (Fase 3)   | Desconto para quem indicar novo cliente                                     |

5.2 — Aterrissagem (Landing Page)

Checklist de Elementos Obrigatórios:

text

✅ Headline principal com proposta de valor clara

✅ Sub-headline com benefício secundário

✅ CTA (Call to Action) acima da dobra

✅ Grid de serviços com ícones SVG animados

✅ Seção de prova social (depoimentos)

✅ Seção de FAQ (accordion)

✅ Badge de segurança (SSL, dados protegidos)

✅ Footer com disclaimer jurídico

✅ Tempo de carregamento < 2s

✅ Pontuação Lighthouse > 90

5.3 — Conversão (O Formulário)

Campos do Formulário Principal:

| Campo             | Tipo     | Máscara           | Obrigatório | Validação                      |
| ----------------- | -------- | ------------------ | ------------ | -------------------------------- |
| Nome Completo     | text     | —                 | ✅           | Mín. 3 caracteres, sem números |
| CPF               | text     | 000.000.000-00     | ✅           | Algoritmo de validação CPF     |
| CNPJ (se tiver)   | text     | 00.000.000/0000-00 | Condicional  | Algoritmo de validação CNPJ    |
| Telefone/WhatsApp | tel      | (00) 00000-0000    | ✅           | 10-11 dígitos                   |
| E-mail            | email    | —                 | ✅           | Regex padrão de e-mail          |
| Serviço Desejado | select   | —                 | ✅           | Lista pré-definida              |
| Observações     | textarea | —                 | ❌           | Máx. 500 caracteres             |

Fluxo pós-submit:

text

[Usuário preenche] → [Validação client-side em TS]

    │

    ├── [MVP] → Formata mensagem → window.open(whatsapp_url)

    │

    └── [V2]  → POST /api/leads → Banco de Dados → CRM Dashboard

    → Notificação WhatsApp (API)

    → E-mail de confirmação ao cliente

---

6. Requisitos Funcionais (RF)

Módulo: Landing Page / PWA Público

| ID     | Requisito                                                                                                                | Prioridade | Fase |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | ---------- | ---- |
| RF-001 | O sistema deve exibir uma Hero Section com headline, sub-headline e CTA principal                                        | Alta       | 1    |
| RF-002 | O sistema deve exibir um grid de serviços com ícones SVG animados                                                      | Alta       | 1    |
| RF-003 | Ao clicar em um serviço, o sistema deve navegar suavemente (SPA) para a página do serviço sem recarregar              | Alta       | 1    |
| RF-004 | Cada página de serviço deve exibir: descrição, valor do honorário e formulário                                     | Alta       | 1    |
| RF-005 | O formulário deve aplicar máscaras em tempo real nos campos CPF, CNPJ e Telefone                                       | Alta       | 1    |
| RF-006 | O formulário deve validar CPF com algoritmo completo (não apenas formato)                                              | Alta       | 1    |
| RF-007 | O formulário deve validar CNPJ com algoritmo completo quando preenchido                                                 | Média     | 1    |
| RF-008 | Ao submeter o formulário (MVP), o sistema deve gerar URL do WhatsApp com a mensagem formatada e redirecionar o usuário | Alta       | 1    |
| RF-009 | O sistema deve exibir seção de FAQ em formato accordion com animação suave                                           | Média     | 1    |
| RF-010 | O sistema deve exibir seção de depoimentos/prova social                                                                | Média     | 1    |
| RF-011 | O sistema deve exibir footer com disclaimer jurídico visível permanentemente                                           | Alta       | 1    |
| RF-012 | O PWA deve possuirmanifest.jsonconfigurado para instalação na tela inicial                                             | Alta       | 1    |
| RF-013 | O PWA deve possuirservice-worker.tspara cache de assets estáticos                                                       | Média     | 1    |
| RF-014 | O sistema deve ser responsivo (mobile-first) e funcionar em telas de 320px a 1920px+                                     | Alta       | 1    |
| RF-015 | O sistema deve exibir tela de "splash" ou loading animado ao abrir como PWA instalado                                    | Baixa      | 1    |

Módulo: Painel Administrativo (Back-office)

| ID     | Requisito                                                                                                                             | Prioridade | Fase |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---- |
| RF-100 | O sistema deve possuir tela de login com autenticação por e-mail/senha                                                              | Alta       | 2    |
| RF-101 | O dashboard deve exibir métricas: total de leads hoje, esta semana, este mês                                                        | Alta       | 2    |
| RF-102 | O dashboard deve exibir taxa de conversão (acessos vs. formulários enviados)                                                        | Média     | 2    |
| RF-103 | O dashboard deve exibir ranking de serviços mais solicitados em gráfico                                                             | Média     | 2    |
| RF-104 | O sistema deve exibir todos os leads em formato Kanban com colunas de arraste                                                         | Alta       | 2    |
| RF-105 | As colunas do Kanban devem ser: Novo Lead → Em Atendimento → Aguardando Pagamento → Serviço em Andamento → Concluído → Perdido | Alta       | 2    |
| RF-106 | O operador deve poder arrastar cards entre colunas (drag & drop)                                                                      | Alta       | 2    |
| RF-107 | Ao clicar em um card, deve abrir modal com todos os dados do lead                                                                     | Alta       | 2    |
| RF-108 | O operador deve poder adicionar notas/observações internas em cada lead                                                             | Média     | 2    |
| RF-109 | O sistema deve exibir painel financeiro com faturamento estimado vs. confirmado                                                       | Média     | 2    |
| RF-110 | O sistema deve permitir exportação de leads em CSV                                                                                  | Baixa      | 2    |
| RF-111 | O sistema deve enviar notificação (e-mail ou push) quando novo lead entrar                                                          | Média     | 3    |
| RF-112 | O sistema deve permitir configuração dos valores de honorários por serviço                                                        | Média     | 2    |

Módulo: Integrações

| ID     | Requisito                                                                                                 | Prioridade | Fase |
| ------ | --------------------------------------------------------------------------------------------------------- | ---------- | ---- |
| RF-200 | O sistema deve integrar com WhatsApp Business API para envio automático de mensagens                     | Média     | 3    |
| RF-201 | O sistema deve integrar com gateway de pagamento (Mercado Pago / Stripe) para gerar links de PIX e Boleto | Média     | 3    |
| RF-202 | O sistema deve integrar com Google Analytics 4 (GA4) para rastreamento de eventos                         | Alta       | 1    |
| RF-203 | O sistema deve integrar com Meta Pixel para rastreamento de conversões de anúncios                      | Alta       | 1    |
| RF-204 | O sistema deve integrar com plataforma de e-mail marketing (Fase futura)                                  | Baixa      | 3    |

---

7. Requisitos Não-Funcionais (RNF)

| ID      | Requisito                                                                                            | Métrica / Critério de Aceite                                                           |
| ------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| RNF-001 | Performance: A página inicial deve carregar em menos de 2 segundos em conexão 4G                   | LCP < 2.0s, FID < 100ms, CLS < 0.1 (Core Web Vitals)                                     |
| RNF-002 | Lighthouse Score: A pontuação do Lighthouse deve ser ≥ 90 em todas as categorias                  | Performance ≥ 90, Acessibilidade ≥ 90, SEO ≥ 90, PWA ≥ 90                            |
| RNF-003 | Responsividade: O layout deve se adaptar corretamente a viewports de 320px até 2560px               | Testado em: 320px, 375px, 414px, 768px, 1024px, 1440px, 1920px                           |
| RNF-004 | Compatibilidade: O PWA deve funcionar nos seguintes navegadores (últimas 2 versões)                | Chrome, Safari (iOS), Firefox, Edge, Samsung Internet                                    |
| RNF-005 | Acessibilidade: O sistema deve atender nível AA das WCAG 2.1                                        | Contraste ≥ 4.5:1, navegação por teclado, alt text em imagens, labels em formulários |
| RNF-006 | Segurança: Toda comunicação deve ser via HTTPS                                                    | Certificado SSL/TLS válido, HSTS habilitado                                             |
| RNF-007 | Segurança: Dados sensíveis (CPF, CNPJ) não devem ser armazenados em localStorage sem criptografia | Dados sensíveis transitam apenas em memória ou são criptografados                     |
| RNF-008 | Disponibilidade: O sistema deve ter uptime ≥ 99.5%                                                  | Monitoramento via UptimeRobot ou similar                                                 |
| RNF-009 | Escalabilidade: O front-end deve ser servido via CDN com cache eficiente                             | Cache-Control headers configurados, assets versionados                                   |
| RNF-010 | Manutenibilidade: O código deve seguir padrões ESLint + Prettier configurados                      | Zero erros de lint no CI/CD                                                              |
| RNF-011 | Offline: O PWA deve exibir página offline customizada quando sem internet                           | Service Worker com fallback page                                                         |
| RNF-012 | Tamanho do Bundle: O JS total transferido não deve exceder 150KB gzipped (Fase 1)                   | Medido via Lighthouse / webpack-bundle-analyzer                                          |

---

8. Arquitetura Técnica

8.1 — Visão Geral da Arquitetura

text

┌──────────────────────────────────────────────────────────────────────┐

│                         ARQUITETURA GERAL                            │

├──────────────────────────────────────────────────────────────────────┤

│                                                                      │

│  ┌─────────────┐    ┌─────────────────────────────────────────────┐ │

│  │   CLIENTE    │    │              FRONT-END (PWA)                │ │

│  │  (Browser)   │◄──►│                                             │ │

│  │             │    │  ┌─────────┐ ┌──────────┐ ┌─────────────┐  │ │

│  │  📱 Mobile   │    │  │ HTML5   │ │ Tailwind │ │ TypeScript  │  │ │

│  │  💻 Desktop  │    │  │ (SPA)   │ │ CSS v3   │ │ (Vanilla)   │  │ │

│  │             │    │  └─────────┘ └──────────┘ └─────────────┘  │ │

│  └─────────────┘    │                                             │ │

│                      │  ┌─────────────┐  ┌──────────────────┐     │ │

│                      │  │ Service     │  │ manifest.json    │     │ │

│                      │  │ Worker      │  │ (PWA Config)     │     │ │

│                      │  └─────────────┘  └──────────────────┘     │ │

│                      └────────────────────┬────────────────────────┘ │

│                                           │                          │

│                            ┌──────────────▼──────────────┐          │

│                            │     HOSPEDAGEM / CDN        │          │

│                            │  (GitHub Pages / Vercel /   │          │

│                            │   Netlify / Cloudflare)     │          │

│                            └──────────────┬──────────────┘          │

│                                           │                          │

│              ┌────────────────────────────┼────────────────────┐    │

│              │                            │                    │    │

│   ┌──────────▼────────┐   ┌──────────────▼──────┐  ┌─────────▼──┐│

│   │   Google           │   │   Meta Pixel        │  │  WhatsApp  ││

│   │   Analytics 4      │   │   (Conversões)      │  │  Redirect  ││

│   │   (Tracking)       │   │                     │  │  (MVP)     ││

│   └───────────────────┘   └─────────────────────┘  └────────────┘│

│                                                                      │

│  ════════════════════  FASE 2+ (BACK-END)  ════════════════════════ │

│                                                                      │

│   ┌──────────────────────────────────────────────────────────────┐  │

│   │                    API REST (Node.js / Express)              │  │

│   │                                                              │  │

│   │  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌────────────┐ │  │

│   │  │ /api/    │  │ /api/    │  │ /api/     │  │ /api/      │ │  │

│   │  │ leads    │  │ auth     │  │ metrics   │  │ payments   │ │  │

│   │  └────┬─────┘  └────┬─────┘  └─────┬─────┘  └─────┬──────┘ │  │

│   │       │              │              │              │         │  │

│   │  ┌────▼──────────────▼──────────────▼──────────────▼──────┐ │  │

│   │  │              BANCO DE DADOS                             │ │  │

│   │  │         (PostgreSQL / Supabase / Firebase)              │ │  │

│   │  └────────────────────────────────────────────────────────┘ │  │

│   └──────────────────────────────────────────────────────────────┘  │

│                                                                      │

│   ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐ │

│   │ WhatsApp API   │  │ Mercado Pago / │  │ E-mail (SendGrid /  │ │

│   │ (Mensagens     │  │ Stripe (PIX /  │  │  Resend / Mailgun)  │ │

│   │  automáticas)  │  │  Boleto)       │  │                     │ │

│   └────────────────┘  └────────────────┘  └──────────────────────┘ │

│                                                                      │

└──────────────────────────────────────────────────────────────────────┘

8.2 — Arquitetura SPA (Front-end Detalhado)

text

┌──────────────────────────────────────────────────────────────┐

│                    NAVEGAÇÃO SPA                              │

├──────────────────────────────────────────────────────────────┤

│                                                              │

│  URL Hash      Componente Renderizado     Transição          │

│  ──────────    ──────────────────────     ──────────         │

│  #/            → HomePage                 fadeIn              │

│  #/abertura    → ServicePage(abertura)    slideLeft           │

│  #/declaracao  → ServicePage(declaracao)  slideLeft           │

│  #/parcelamento→ ServicePage(parcelamento)slideLeft           │

│  #/alteracao   → ServicePage(alteracao)   slideLeft           │

│  #/baixa       → ServicePage(baixa)      slideLeft           │

│  #/consulta    → ServicePage(consulta)    slideLeft           │

│  #/admin       → AdminLogin              fadeIn  (Fase 2)    │

│  #/admin/dash  → AdminDashboard          fadeIn  (Fase 2)    │

│                                                              │

│  Componentes persistentes (sempre visíveis):                 │

│  ┌──────────────────────────────────────────────────────┐   │

│  │  Header (logo, nav, CTA)                             │   │

│  │  Footer (disclaimer, links, © copyright)             │   │

│  └──────────────────────────────────────────────────────┘   │

│                                                              │

└──────────────────────────────────────────────────────────────┘

---

9. Estrutura de Pastas do Repositório

text

SuporteEmpreendedor/

│

├── 📄 README.md                    # Documentação principal do projeto

├── 📄 LICENSE                      # Licença do projeto

├── 📄 .gitignore                   # Arquivos ignorados pelo Git

├── 📄 tsconfig.json                # Configuração do TypeScript

├── 📄 tailwind.config.js           # Configuração do Tailwind CSS (se build local)

├── 📄 package.json                 # Dependências e scripts NPM

├── 📄 .eslintrc.json               # Configuração do ESLint

├── 📄 .prettierrc                  # Configuração do Prettier

│

├── 📁 docs/                        # Documentação completa do projeto

│   ├── 📄 VISION.md                # Este documento de visão

│   ├── 📄 CONTRIBUTING.md          # Guia de contribuição

│   ├── 📄 CHANGELOG.md             # Histórico de mudanças

│   ├── 📄 ARCHITECTURE.md          # Decisões arquiteturais (ADR)

│   └── 📁 assets/                  # Imagens usadas na documentação

│       ├── 📄 funnel-diagram.png

│       ├── 📄 wireframe-home.png

│       └── 📄 wireframe-form.png

│

├── 📁 public/                      # Raiz do site publicado (servido pelo servidor)

│   ├── 📄 index.html               # Ponto de entrada do SPA

│   ├── 📄 manifest.json            # Configuração PWA (nome, ícones, cores)

│   ├── 📄 robots.txt               # Controle de indexação

│   ├── 📄 sitemap.xml              # Mapa do site para SEO

│   ├── 📄 _headers                 # Headers de segurança (Netlify/Vercel)

│   │

│   ├── 📁 assets/

│   │   ├── 📁 icons/               # Ícones PWA (192x192, 512x512, maskable)

│   │   │   ├── 📄 icon-192x192.png

│   │   │   ├── 📄 icon-512x512.png

│   │   │   ├── 📄 icon-maskable.png

│   │   │   └── 📄 favicon.ico

│   │   │

│   │   ├── 📁 svg/                 # Ícones SVG dos serviços

│   │   │   ├── 📄 abertura.svg

│   │   │   ├── 📄 declaracao.svg

│   │   │   ├── 📄 parcelamento.svg

│   │   │   ├── 📄 alteracao.svg

│   │   │   ├── 📄 baixa.svg

│   │   │   ├── 📄 consulta.svg

│   │   │   ├── 📄 security-badge.svg

│   │   │   └── 📄 check-success.svg

│   │   │

│   │   ├── 📁 lottie/              # Animações Lottie (JSON)

│   │   │   ├── 📄 hero-animation.json

│   │   │   ├── 📄 loading.json

│   │   │   └── 📄 success.json

│   │   │

│   │   └── 📁 images/              # Imagens estáticas (OG, backgrounds)

│   │       ├── 📄 og-image.jpg     # Open Graph image (compartilhamento)

│   │       └── 📄 hero-bg.webp     # Background hero (se necessário)

│   │

│   └── 📁 css/

│       └── 📄 styles.css           # CSS customizado (se não usar build)

│

├── 📁 src/                         # Código-fonte TypeScript

│   ├── 📄 main.ts                  # Entry point — inicializa o app

│   ├── 📄 router.ts                # Sistema de rotas SPA (hash-based)

│   ├── 📄 service-worker.ts        # Service Worker para cache offline

│   │

│   ├── 📁 components/              # Componentes de UI reutilizáveis

│   │   ├── 📄 Header.ts            # Componente do cabeçalho

│   │   ├── 📄 Footer.ts            # Componente do rodapé + disclaimer

│   │   ├── 📄 ServiceCard.ts       # Card individual do grid de serviços

│   │   ├── 📄 ServiceGrid.ts       # Grid completo de serviços

│   │   ├── 📄 ContactForm.ts       # Formulário de captação reutilizável

│   │   ├── 📄 Accordion.ts         # Componente FAQ sanfona

│   │   ├── 📄 Testimonials.ts      # Seção de depoimentos

│   │   ├── 📄 Modal.ts             # Modal genérico

│   │   └── 📄 Toast.ts             # Notificações toast

│   │

│   ├── 📁 pages/                   # "Páginas" do SPA (cada rota)

│   │   ├── 📄 HomePage.ts          # Página inicial (hero + grid)

│   │   ├── 📄 ServicePage.ts       # Página genérica de serviço (dinâmica)

│   │   ├── 📄 NotFoundPage.ts      # Página 404 customizada

│   │   └── 📄 OfflinePage.ts       # Página exibida quando offline

│   │

│   ├── 📁 utils/                   # Funções utilitárias puras

│   │   ├── 📄 masks.ts             # Máscaras: CPF, CNPJ, Telefone, CEP

│   │   ├── 📄 validators.ts        # Validadores: CPF, CNPJ, E-mail

│   │   ├── 📄 whatsapp.ts          # Gerador de URL do WhatsApp

│   │   ├── 📄 analytics.ts         # Helpers para GA4 e Meta Pixel

│   │   ├── 📄 animations.ts        # Funções de transição e animação

│   │   └── 📄 dom.ts               # Helpers de manipulação do DOM

│   │

│   ├── 📁 data/                    # Dados estáticos (sem banco de dados)

│   │   ├── 📄 services.ts          # Lista de serviços com descrições

│   │   ├── 📄 faq.ts               # Perguntas frequentes por serviço

│   │   ├── 📄 testimonials.ts      # Depoimentos para prova social

│   │   └── 📄 config.ts            # Configurações globais (WhatsApp number, etc)

│   │

│   └── 📁 types/                   # Definições de tipos TypeScript

│       ├── 📄 index.ts             # Tipos globais exportados

│       ├── 📄 service.types.ts     # Interface Service, ServiceId, etc.

│       ├── 📄 lead.types.ts        # Interface Lead, LeadStatus, etc.

│       └── 📄 form.types.ts        # Interface FormField, FormData, etc.

│

├── 📁 dist/                        # Build de produção (gerado automaticamente)

│   ├── 📄 index.html

│   ├── 📄 main.js                  # TS transpilado + bundled

│   ├── 📄 service-worker.js

│   └── 📁 assets/                  # Assets copiados

│

└── 📁 tests/                       # Testes automatizados

    ├── 📄 masks.test.ts            # Testes unitários para máscaras

    ├── 📄 validators.test.ts       # Testes unitários para validadores

    ├── 📄 whatsapp.test.ts         # Testes para geração de URL

    └── 📄 router.test.ts           # Testes para o roteador SPA

---

10. Stack Tecnológica

Fase 1 — MVP (Front-end Only)

| Camada        | Tecnologia                      | Justificativa                                                          |
| ------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Linguagem     | TypeScript 5.x                  | Tipagem forte previne bugs em formulários; autocompletar no VS Code   |
| Markup        | HTML5 Semântico                | SEO, acessibilidade, renderização rápida                            |
| Estilização | Tailwind CSS 3.x (CDN)          | Utility-first, responsivo, sem overhead de CSS custom complexo         |
| Animações   | CSS Transitions + Lottie Web    | Animações leves (Lottie < 50KB), transições nativas performáticas |
| Ícones       | SVGs inline / Lucide Icons      | Escaláveis, estilizáveis via CSS, zero requisições extras          |
| PWA           | manifest.json + Service Worker  | Instalável, cache offline, splash screen                              |
| Build         | esbuild / Vite (dev)            | Transpilação TS→JS ultrarrápida (<100ms)                           |
| Linting       | ESLint + Prettier               | Código consistente e legível                                         |
| Versionamento | Git + GitHub                    | Colaboração, CI/CD, histórico                                       |
| Analytics     | Google Analytics 4 + Meta Pixel | Rastreamento de conversões para otimização de ads                   |

Fase 2 — Plataforma Completa (Back-end)

| Camada           | Tecnologia                                  | Justificativa                                                         |
| ---------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Runtime          | Node.js 20 LTS                              | Ecossistema vasto, mesma linguagem do front                           |
| Framework API    | Express.js ou Fastify                       | Leve, flexível, produtivo                                            |
| Banco de Dados   | PostgreSQL (Supabase) ou Firebase Firestore | Supabase: SQL familiar + auth + realtime. Firebase: rápido para MVPs |
| Autenticação   | Supabase Auth ou Firebase Auth              | Login seguro com JWT, social login futuro                             |
| ORM              | Prisma (se PostgreSQL)                      | Type-safe queries, migrations automáticas                            |
| Hospedagem API   | Vercel Serverless / Railway / Render        | Deploy simples, auto-scaling                                          |
| Hospedagem Front | Vercel / Netlify / Cloudflare Pages         | CDN global, HTTPS automático, deploy via Git                         |

Fase 3 — Integrações Avançadas

| Integração        | Serviço                                                   | Finalidade                                                |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| Pagamentos          | Mercado Pago API / Stripe                                  | PIX, Boleto, Cartão — gerar links e confirmar pagamento |
| WhatsApp            | WhatsApp Business API (via Twilio / Z-API / Evolution API) | Mensagens automáticas de follow-up                       |
| E-mail              | Resend / SendGrid                                          | E-mails transacionais (confirmação, recibos)            |
| Notificações Push | Web Push API + Firebase Cloud Messaging                    | Lembretes (ex: "Sua DASN vence em 15 dias")               |

---

11. Módulos do PWA (Front-end) — Especificação Detalhada

11.1 — Header

text

┌──────────────────────────────────────────────────────────────┐

│  🟢 Suporte Empreendedor          Serviços  FAQ  Contato    │

│                                              [WhatsApp →]    │

└──────────────────────────────────────────────────────────────┘

Especificação:

| Propriedade   | Valor                                                   |
| ------------- | ------------------------------------------------------- |
| Posição     | fixed top-0, combackdrop-blurao scroll                  |
| Logo          | SVG inline ou texto estilizado + ícone                 |
| Navegação   | Links âncora (smooth scroll) no mobile: hamburger menu |
| CTA           | Botão "Fale no WhatsApp" — verde, sempre visível     |
| Comportamento | Shrink ao scrollar (height: 80px → 60px)               |
| Z-index       | 50 (acima de todo conteúdo)                            |

11.2 — Hero Section

text

┌──────────────────────────────────────────────────────────────┐

│                                                              │

│       Resolva seu MEI                    ┌──────────────┐   │

│       em minutos.                        │  [Animação    │   │

│                                          │   Lottie]     │   │

│       Abertura, Declaração,              │              │   │

│       Parcelamento e mais.               └──────────────┘   │

│       Sem burocracia.                                        │

│                                                              │

│       [  Ver Serviços  →  ]                                  │

│                                                              │

│       ✓ Atendimento rápido                                   │

│       ✓ Seus dados protegidos                                │

│       ✓ +2.000 MEIs atendidos                                │

│                                                              │

└──────────────────────────────────────────────────────────────┘

Especificação:

| Propriedade   | Valor                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| Background    | Gradiente suave (ex:from-blue-950 to-indigo-900) ou cor sólida escura      |
| Headline      | text-4xl md:text-6xl font-bold text-white                                   |
| Sub-headline  | text-lg md:text-xl text-blue-200                                            |
| CTA Principal | Botão combg-emerald-500 hover:bg-emerald-400, rounded-xl, shadow-lg        |
| Animação    | Lottie file de ilustração de documento/negócio (lado direito no desktop) |
| Trust badges  | 3 itens com ícone ✓ verde + texto                                         |
| Mobile        | Stack vertical, animação acima do texto                                   |

11.3 — Grid de Serviços

text

┌──────────────────────────────────────────────────────────────┐

│                     Nossos Serviços                          │

│                                                              │

│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │

│  │  📋          │  │  📊          │  │  💳          │      │

│  │  Abertura    │  │  Declaração  │  │  Parcelamento│      │

│  │  MEI         │  │  Anual       │  │  de Débitos  │      │

│  │              │  │              │  │              │      │

│  │  A partir de │  │  A partir de │  │  A partir de │      │

│  │  R$ 97       │  │  R$ 67       │  │  R$ 127      │      │

│  │              │  │              │  │              │      │

│  │  [Solicitar] │  │  [Solicitar] │  │  [Solicitar] │      │

│  └──────────────┘  └──────────────┘  └──────────────┘      │

│                                                              │

│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │

│  │  ✏️          │  │  🚪          │  │  🔍          │      │

│  │  Alteração   │  │  Baixa do    │  │  Consulta    │      │

│  │  Cadastral   │  │  MEI         │  │  Situação    │      │

│  │              │  │              │  │              │      │

│  │  A partir de │  │  A partir de │  │  A partir de │      │

│  │  R$ 67       │  │  R$ 97       │  │  R$ 47       │      │

│  │              │  │              │  │              │      │

│  │  [Solicitar] │  │  [Solicitar] │  │  [Solicitar] │      │

│  └──────────────┘  └──────────────┘  └──────────────┘      │

│                                                              │

└──────────────────────────────────────────────────────────────┘

Especificação dos Cards:

| Propriedade | Valor                                                         |
| ----------- | ------------------------------------------------------------- |
| Layout      | CSS Grid:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6      |
| Card style  | bg-white rounded-2xl shadow-md hover:shadow-xl transition-all |
| Ícone      | SVG animado (hover: scale + color shift)                      |
| Título     | text-xl font-semibold text-gray-800                           |
| Preço      | text-emerald-600 font-bold                                    |
| Botão      | bg-blue-600 hover:bg-blue-500 text-white rounded-lg           |
| Hover       | Card sobe 4px (hover:-translate-y-1)                          |
| Click       | Navega para#/servico-slugvia router SPA                       |

11.4 — Página de Serviço (Dinâmica)

text

┌──────────────────────────────────────────────────────────────┐

│  ← Voltar                                                    │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  📋 Abertura de MEI                                     │ │

│  │                                                         │ │

│  │  Formalize seu negócio em até 24 horas. Cuidamos       │ │

│  │  de todo o processo no portal Gov.br para você.        │ │

│  │                                                         │ │

│  │  Honorário: R$ 97,00                                    │ │

│  │  (Taxas governamentais não inclusas)                    │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  FORMULÁRIO DE SOLICITAÇÃO                              │ │

│  │                                                         │ │

│  │  Nome Completo *                                        │ │

│  │  ┌──────────────────────────────────────────────────┐  │ │

│  │  │                                                  │  │ │

│  │  └──────────────────────────────────────────────────┘  │ │

│  │                                                         │ │

│  │  CPF *                        Telefone/WhatsApp *       │ │

│  │  ┌──────────────────────┐    ┌──────────────────────┐  │ │

│  │  │ 000.000.000-00       │    │ (00) 00000-0000      │  │ │

│  │  └──────────────────────┘    └──────────────────────┘  │ │

│  │                                                         │ │

│  │  E-mail *                                               │ │

│  │  ┌──────────────────────────────────────────────────┐  │ │

│  │  │ seu@email.com                                    │  │ │

│  │  └──────────────────────────────────────────────────┘  │ │

│  │                                                         │ │

│  │  Observações (opcional)                                 │ │

│  │  ┌──────────────────────────────────────────────────┐  │ │

│  │  │                                                  │  │ │

│  │  └──────────────────────────────────────────────────┘  │ │

│  │                                                         │ │

│  │  ☐ Li e aceito os Termos de Uso e Política de          │ │

│  │    Privacidade *                                        │ │

│  │                                                         │ │

│  │         [ 🟢  Solicitar Serviço no WhatsApp  ]          │ │

│  │                                                         │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  ❓ DÚVIDAS FREQUENTES                                  │ │

│  │                                                         │ │

│  │  ▶ Quanto tempo leva para abrir meu MEI?               │ │

│  │  ▶ Preciso ter conta Gov.br?                           │ │

│  │  ▶ Quais documentos preciso enviar?                    │ │

│  │  ▶ O pagamento é antes ou depois do serviço?           │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

└──────────────────────────────────────────────────────────────┘

11.5 — Seção de Prova Social

text

┌──────────────────────────────────────────────────────────────┐

│                O que nossos clientes dizem                    │

│                                                              │

│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │

│  │ ⭐⭐⭐⭐⭐        │ │ ⭐⭐⭐⭐⭐        │ │ ⭐⭐⭐⭐⭐        │  │

│  │                │ │                │ │                │  │

│  │ "Resolveram    │ │ "Eu não sabia  │ │ "Parcelei      │  │

│  │  minha DASN    │ │  nem por onde  │ │  minha dívida  │  │

│  │  em 1 dia!"   │ │  começar..."   │ │  rapidinho."   │  │

│  │                │ │                │ │                │  │

│  │ — Maria S.     │ │ — João P.      │ │ — Ana C.       │  │

│  │   São Paulo    │ │   Belo Horizonte│ │  Curitiba     │  │

│  └────────────────┘ └────────────────┘ └────────────────┘  │

│                                                              │

└──────────────────────────────────────────────────────────────┘

11.6 — Footer + Disclaimer Jurídico

text

┌──────────────────────────────────────────────────────────────┐

│                                                              │

│  Suporte Empreendedor           Serviços    FAQ    Contato  │

│  © 2025. Todos os               Termos de Uso               │

│  direitos reservados.            Política de Privacidade     │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  ⚠️ AVISO LEGAL: Este é um serviço PRIVADO e OPCIONAL │ │

│  │  de assessoria ao Microempreendedor Individual. NÃO    │ │

│  │  possuímos vínculo com o Governo Federal, Receita      │ │

│  │  Federal, SEBRAE ou qualquer órgão público. Os         │ │

│  │  serviços oferecidos referem-se à assessoria e         │ │

│  │  intermediação junto aos portais públicos, pelos       │ │

│  │  quais cobramos honorários. Todos os serviços aqui     │ │

│  │  descritos podem ser realizados gratuitamente pelo     │ │

│  │  próprio empreendedor nos portais oficiais do governo. │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

└──────────────────────────────────────────────────────────────┘

Importância Legal: Este disclaimer é OBRIGATÓRIO e deve estar sempre visível. Ele protege a operação contra acusações de se passar por órgão público ou de cobrar por serviços gratuitos sem transparência.

---

12. Painel Administrativo (Back-office) — Fase 2

12.1 — Login

text

┌──────────────────────────────────────────────────────────────┐

│                                                              │

│                   🔒 Área Administrativa                     │

│                                                              │

│                   E-mail                                     │

│                   ┌────────────────────────┐                │

│                   │                        │                │

│                   └────────────────────────┘                │

│                                                              │

│                   Senha                                      │

│                   ┌────────────────────────┐                │

│                   │ ••••••••               │                │

│                   └────────────────────────┘                │

│                                                              │

│                   [      Entrar      ]                       │

│                                                              │

└──────────────────────────────────────────────────────────────┘

* Autenticação JWT
* Rate limiting (máx. 5 tentativas / 15 min)
* 2FA via e-mail (Fase 3)

12.2 — Dashboard de Métricas

text

┌──────────────────────────────────────────────────────────────┐

│  📊 Dashboard              [Período: Últimos 30 dias ▼]      │

│                                                              │

│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │

│  │  Leads   │ │  Taxa    │ │ Faturado │ │ Recebido │      │

│  │  Novos   │ │ Conversão│ │ (est.)   │ │ (conf.)  │      │

│  │          │ │          │ │          │ │          │      │

│  │   147    │ │  12.3%   │ │ R\$14.700 │ │ R\$11.200 │      │

│  │  ▲ +23%  │ │  ▲ +2.1% │ │  ▲ +18% │ │  ▲ +15% │      │

│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │

│                                                              │

│  ┌─────────────────────────┐ ┌──────────────────────────┐  │

│  │  Ranking de Serviços    │ │  Leads por Dia           │  │

│  │  ━━━━━━━━━━━━━━━━━━━    │ │                          │  │

│  │  Parcelamento    60%    │ │  📈 [Gráfico de linhas]   │  │

│  │  ████████████████████   │ │                          │  │

│  │  Abertura        25%    │ │                          │  │

│  │  ████████████           │ │                          │  │

│  │  Declaração      10%    │ │                          │  │

│  │  █████                  │ │                          │  │

│  │  Outros           5%    │ │                          │  │

│  │  ███                    │ │                          │  │

│  └─────────────────────────┘ └──────────────────────────┘  │

│                                                              │

└──────────────────────────────────────────────────────────────┘

### 12.3 — CRM Kanban (Gestão de Leads) — Continuação

text

┌──────────────────────────────────────────────────────────────────────────────────────────┐

│  📋 Funil de Atendimento                                         [+ Novo] [Filtros]      │

│                                                                                          │

│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │

│  │  NOVO LEAD   │ │      EM      │ │  AGUARDANDO  │ │  SERVIÇO EM  │ │  CONCLUÍDO   │  │

│  │     (12)     │ │ ATENDIMENTO  │ │  PAGAMENTO   │ │  ANDAMENTO   │ │     (89)     │  │

│  │              │ │     (5)      │ │     (8)      │ │     (3)      │ │              │  │

│  │ ┌──────────┐│ │ ┌──────────┐│ │ ┌──────────┐│ │ ┌──────────┐│ │ ┌──────────┐  │  │

│  │ │Carlos E. ││ │ │Ana P.    ││ │ │Marcos S. ││ │ │Julia R.  ││ │ │Pedro M.  │  │  │

│  │ │Parcelam. ││ │ │Abertura  ││ │ │DASN      ││ │ │Alteração ││ │ │Abertura  │  │  │

│  │ │14:32 hoje││ │ │Ontem     ││ │ │PIX R\$67  ││ │ │Gov.br    ││ │ │✅ Entregue│  │  │

│  │ └──────────┘│ │ └──────────┘│ │ └──────────┘│ │ └──────────┘│ │ └──────────┘  │  │

│  │ ┌──────────┐│ │ ┌──────────┐│ │ ┌──────────┐│ │              │ │ ┌──────────┐  │  │

│  │ │Maria L.  ││ │ │José F.   ││ │ │Rita C.   ││ │              │ │ │Carla T.  │  │  │

│  │ │Abertura  ││ │ │Parcelam. ││ │ │Baixa     ││ │              │ │ │DASN      │  │  │

│  │ │13:10 hoje││ │ │Hoje AM   ││ │ │Boleto    ││ │              │ │ │✅ Entregue│  │  │

│  │ └──────────┘│ │ └──────────┘│ │ └──────────┘│ │              │ │ └──────────┘  │  │

│  │     ...     │ │     ...     │ │     ...     │ │              │ │     ...       │  │

│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │

│                                                                                          │

│  ┌──────────────┐                                                                        │

│  │   PERDIDO    │  (Coluna colapsável, cinza, fora do fluxo principal)                   │

│  │     (23)     │                                                                        │

│  └──────────────┘                                                                        │

│                                                                                          │

└──────────────────────────────────────────────────────────────────────────────────────────┘

Especificação do Card do Lead:

typescript

// src/types/lead.types.ts

exporttypeLeadStatus=

  |'novo'

  |'em_atendimento'

  |'aguardando_pagamento'

  |'servico_em_andamento'

  |'concluido'

  |'perdido';

exportinterfaceLead {

  id:string;

  nome:string;

  cpf:string;

  cnpj?:string;

  telefone:string;

  email:string;

  servicoId: ServiceId;

  status: LeadStatus;

  valorHonorario:number;

  valorPago?:number;

  dataCriacao: Date;

  dataAtualizacao: Date;

  observacoesCliente?:string;

  notasInternas: NotaInterna[];

  historicoStatus: HistoricoStatus[];

}

exportinterfaceNotaInterna {

  id:string;

  texto:string;

  autor:string;

  dataCriacao: Date;

}

exportinterfaceHistoricoStatus {

  statusAnterior: LeadStatus;

  statusNovo: LeadStatus;

  dataAlteracao: Date;

  autor:string;

}

Modal de Detalhes do Lead (ao clicar no card):

text

┌──────────────────────────────────────────────────────────────┐

│  ✕                                                           │

│                                                              │

│  👤 Carlos Eduardo da Silva                                  │

│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │

│                                                              │

│  📋 Serviço: Parcelamento de Débitos                         │

│  💰 Honorário: R$ 127,00                                     │

│  📅 Data do Lead: 15/06/2025 às 14:32                        │

│  📌 Status: Novo Lead                                        │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  DADOS DO CLIENTE                                       │ │

│  │  CPF: 123.456.789-00                                    │ │

│  │  CNPJ: 12.345.678/0001-00                              │ │

│  │  Telefone: (11) 99876-5432                              │ │

│  │  E-mail: carlos@email.com                               │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  OBSERVAÇÕES DO CLIENTE                                 │ │

│  │  "Tenho 3 DAS atrasadas de 2024. Preciso parcelar      │ │

│  │   urgente para não perder o CNPJ."                      │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  NOTAS INTERNAS                              [+ Nota]  │ │

│  │                                                         │ │

│  │  📝 15/06 14:45 — Renato                               │ │

│  │     "Cliente possui 3 DAS vencidas. Total R$ 210."     │ │

│  │                                                         │ │

│  │  📝 15/06 15:10 — Renato                               │ │

│  │     "Enviado PIX de R$ 127 via WhatsApp."              │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  HISTÓRICO DE STATUS                                    │ │

│  │                                                         │ │

│  │  🔵 15/06 14:32  Novo Lead                              │ │

│  │  🟡 15/06 14:45  Em Atendimento                         │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

│  ┌────────────────────────────────────────────────────────┐ │

│  │  AÇÕES RÁPIDAS                                          │ │

│  │                                                         │ │

│  │  [📱 Abrir WhatsApp] [📧 Enviar E-mail] [💳 Gerar PIX]│ │

│  │                                                         │ │

│  │  Mover para: [Em Atendimento ▼]    [Salvar]            │ │

│  └────────────────────────────────────────────────────────┘ │

│                                                              │

└──────────────────────────────────────────────────────────────┘

### 12.4 — Painel Financeiro

text

┌──────────────────────────────────────────────────────────────────────┐

│  💰 Financeiro                              [Período: Jun/2025 ▼]    │

│                                                                      │

│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐          │

│  │  Faturamento   │ │  Recebido      │ │  Pendente      │          │

│  │  Estimado      │ │  (Confirmado)  │ │  (Aguardando)  │          │

│  │                │ │                │ │                │          │

│  │  R$ 18.669     │ │  R$ 14.210     │ │  R$ 4.459      │          │

│  └────────────────┘ └────────────────┘ └────────────────┘          │

│                                                                      │

│  ┌────────────────────────────────────────────────────────────────┐ │

│  │  EXTRATO DE RECEBIMENTOS                                       │ │

│  │                                                                 │ │

│  │  Data       │ Cliente       │ Serviço      │ Valor  │ Status   │ │

│  │  ──────────────────────────────────────────────────────────── │ │

│  │  15/06/2025 │ Ana Paula     │ Abertura     │ R$ 97  │ ✅ Pago  │ │

│  │  15/06/2025 │ José Ferreira │ Parcelamento │ R$ 127 │ ⏳ Pend. │ │

│  │  14/06/2025 │ Maria Lima    │ DASN         │ R$ 67  │ ✅ Pago  │ │

│  │  14/06/2025 │ Rita Costa    │ Baixa        │ R$ 97  │ ⏳ Pend. │ │

│  │  ...                                                           │ │

│  │                                                                 │ │

│  │  [Exportar CSV]  [Exportar PDF]                                │ │

│  └────────────────────────────────────────────────────────────────┘ │

│                                                                      │

└──────────────────────────────────────────────────────────────────────┘

---

## 13. Integrações Externas

### 13.1 — WhatsApp (MVP — Redirect)

No MVP, o redirecionamento ao WhatsApp é feito via URL API nativa:

typescript

// src/utils/whatsapp.ts

import { WhatsAppConfig, LeadFormData } from'../types';

constWHATSAPP_CONFIG: WhatsAppConfig = {

  phoneNumber:'5511999999999', // Número com DDI + DDD

  baseUrl:'https://api.whatsapp.com/send',

};

exportfunctiongenerateWhatsAppURL(data: LeadFormData):string {

  const message =formatMessage(data);

  const encodedMessage =encodeURIComponent(message);

  return `${WHATSAPP_CONFIG.baseUrl}?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encodedMessage}`;

}

functionformatMessage(data: LeadFormData):string {

  return`🟢 *NOVO LEAD — Suporte Empreendedor*

━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Serviço Solicitado:* ${data.servicoNome}

💰 *Honorário:* R$ ${data.valorHonorario.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Nome:* ${data.nome}

🔢 *CPF:* ${data.cpf}

${data.cnpj ?`🏢 *CNPJ:* ${data.cnpj}`:'🏢 *CNPJ:* Não informado'}

📱 *Telefone:* ${data.telefone}

📧 *E-mail:* ${data.email}

${data.observacoes ?`📝 *Observações:*\n${data.observacoes}`:''}

━━━━━━━━━━━━━━━━━━━━━━━━

_Enviado via plataforma Suporte Empreendedor_`;

}

exportfunctionredirectToWhatsApp(data: LeadFormData):void {

  const url =generateWhatsAppURL(data);

  window.open(url, '_blank');

}

### 13.2 — WhatsApp Business API (Fase 3)

text

┌──────────────────────────────────────────────────────────────────┐

│  FLUXO: WhatsApp Business API (Automático)                       │

│                                                                  │

│  [Lead criado no CRM]                                            │

│         │                                                        │

│         ▼                                                        │

│  [API envia mensagem template ao cliente]                        │

│  "Olá {nome}! Recebemos sua solicitação de {servico}."          │

│  "Em breve um especialista entrará em contato."                  │

│         │                                                        │

│         ▼                                                        │

│  [Operador muda status para "Aguardando Pagamento"]              │

│         │                                                        │

│         ▼                                                        │

│  [API envia link de pagamento PIX]                               │

│  "Segue o link para pagamento: {link_mercadopago}"              │

│         │                                                        │

│         ▼                                                        │

│  [Webhook confirma pagamento]                                    │

│         │                                                        │

│         ▼                                                        │

│  [API envia confirmação]                                         │

│  "✅ Pagamento confirmado! Já estamos trabalhando no seu         │

│   {servico}. Prazo estimado: {prazo}."                          │

│         │                                                        │

│         ▼                                                        │

│  [Operador conclui o serviço]                                    │

│         │                                                        │

│         ▼                                                        │

│  [API envia comprovante + pedido de avaliação]                   │

│  "🎉 Seu {servico} foi concluído com sucesso!                   │

│   Segue o comprovante: {link_doc}"                              │

│                                                                  │

└──────────────────────────────────────────────────────────────────┘

Provedores recomendados:

| Provedor       | Custo                    | Complexidade | Indicação               |
| -------------- | ------------------------ | ------------ | ------------------------- |
| Z-API          | A partir de R$ 49/mês   | Baixa        | MVP rápido               |
| Evolution API  | Self-hosted (gratuito)   | Média       | Controle total, sem custo |
| Twilio         | Pay-per-message          | Alta         | Escala enterprise         |
| Meta Cloud API | Gratuito (1000 msg/mês) | Média       | Oficial, mais confiável  |

### 13.3 — Google Analytics 4 (GA4)

typescript

// src/utils/analytics.ts

declare global {

  interfaceWindow {

    gtag: (...args:any[]) =>void;

    dataLayer:any[];

  }

}

exportconstGA_MEASUREMENT_ID='G-XXXXXXXXXX'; // Substituir pelo real

exportfunctioninitGA():void {

  const script = document.createElement('script');

  script.async =true;

  script.src =`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  window.gtag=function (...args:any[]) {

    window.dataLayer.push(arguments);

  };

  window.gtag('js', newDate());

  window.gtag('config', GA_MEASUREMENT_ID, {

    send_page_view:false, // Controlamos manualmente no SPA

  });

}

// Eventos customizados

exportfunctiontrackPageView(pagePath:string, pageTitle:string):void {

  window.gtag('event', 'page_view', {

    page_path: pagePath,

    page_title: pageTitle,

  });

}

exportfunctiontrackServiceClick(serviceId:string, serviceName:string):void {

  window.gtag('event', 'select_service', {

    service_id: serviceId,

    service_name: serviceName,

  });

}

exportfunctiontrackFormStart(serviceId:string):void {

  window.gtag('event', 'form_start', {

    service_id: serviceId,

  });

}

exportfunctiontrackFormSubmit(serviceId:string, value:number):void {

  window.gtag('event', 'generate_lead', {

    service_id: serviceId,

    value: value,

    currency:'BRL',

  });

}

exportfunctiontrackWhatsAppRedirect(serviceId:string):void {

  window.gtag('event', 'whatsapp_redirect', {

    service_id: serviceId,

  });

}

### 13.4 — Meta Pixel (Facebook/Instagram Ads)

typescript

// src/utils/analytics.ts (continuação)

exportconstMETA_PIXEL_ID='000000000000000'; // Substituir pelo real

exportfunctioninitMetaPixel():void {

  const script = document.createElement('script');

  script.innerHTML =`

    !function(f,b,e,v,n,t,s)

    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?

    n.callMethod.apply(n,arguments):n.queue.push(arguments)};

    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';

    n.queue=[];t=b.createElement(e);t.async=!0;

    t.src=v;s=b.getElementsByTagName(e)[0];

    s.parentNode.insertBefore(t,s)}(window, document,'script',

    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '${META_PIXEL_ID}');

    fbq('track', 'PageView');

  `;

  document.head.appendChild(script);

}

exportfunctiontrackMetaLead(serviceId:string, value:number):void {

  if (typeof (window asany).fbq ==='function') {

    (window asany).fbq('track', 'Lead', {

    content_name: serviceId,

    value: value,

    currency:'BRL',

    });

  }

}

### 13.5 — Gateway de Pagamento (Fase 3)

text

┌──────────────────────────────────────────────────────────────┐

│  FLUXO DE PAGAMENTO (Mercado Pago / Stripe)                  │

│                                                              │

│  [Operador clica "Gerar PIX" no CRM]                        │

│         │                                                    │

│         ▼                                                    │

│  [API Backend cria preference/checkout no gateway]           │

│         │                                                    │

│         ▼                                                    │

│  [Retorna link de pagamento + QR Code PIX]                   │

│         │                                                    │

│         ├──→ [Enviado ao cliente via WhatsApp]               │

│         │                                                    │

│         ▼                                                    │

│  [Cliente paga]                                              │

│         │                                                    │

│         ▼                                                    │

│  [Webhook do gateway notifica a API]                         │

│  POST /api/webhooks/payment                                  │

│         │                                                    │

│         ▼                                                    │

│  [API atualiza status do lead para "Serviço em Andamento"]   │

│  [Notificação enviada ao operador]                           │

│                                                              │

└──────────────────────────────────────────────────────────────┘

---

## 14. Segurança, LGPD e Compliance

### 14.1 — Lei Geral de Proteção de Dados (LGPD)

A plataforma coleta e processa dados pessoais sensíveis (CPF, CNPJ). É obrigatório estar em conformidade com a Lei nº 13.709/2018.

Obrigações implementadas:

| Obrigação            | Implementação                                                        | Fase |
| ---------------------- | ---------------------------------------------------------------------- | ---- |
| Base Legal             | Consentimento explícito via checkbox no formulário                   | 1    |
| Finalidade             | Dados coletados exclusivamente para prestação do serviço contratado | 1    |
| Transparência         | Política de Privacidade acessível no footer                          | 1    |
| Minimização          | Coletar apenas dados estritamente necessários                         | 1    |
| Segurança             | HTTPS, dados não armazenados em localStorage sem criptografia         | 1    |
| Retenção             | Dados de leads mantidos por no máximo 12 meses após conclusão       | 2    |
| Direito de Exclusão   | Mecanismo para o titular solicitar exclusão dos dados                 | 2    |
| Encarregado (DPO)      | Designação de responsável pelo tratamento de dados                  | 3    |
| Registro de Atividades | Log de todas as operações sobre dados pessoais                       | 3    |

### 14.2 — Política de Privacidade (Estrutura)

text

POLÍTICA DE PRIVACIDADE — SUPORTE EMPREENDEDOR

1. Quem somos
2. Quais dados coletamos

   - Nome completo
   - CPF
   - CNPJ (quando aplicável)
   - Telefone
   - E-mail
   - Dados de navegação (cookies, IP, dispositivo)
3. Para que usamos seus dados

   - Prestação do serviço contratado
   - Comunicação sobre o andamento
   - Envio de comprovantes
   - Melhoria da plataforma (analytics)
4. Com quem compartilhamos

   - Não vendemos dados a terceiros
   - Compartilhamento com gateway de pagamento (quando aplicável)
5. Como protegemos seus dados

   - Criptografia em trânsito (HTTPS/TLS)
   - Acesso restrito a operadores autorizados
6. Seus direitos como titular

   - Acesso, correção, exclusão, portabilidade
   - Contato: privacidade@suporteempreendedor.com.br
7. Cookies e tecnologias de rastreamento

   - GA4, Meta Pixel
   - Banner de consentimento de cookies
8. Alterações nesta política
9. Contato

### 14.3 — Termos de Uso (Estrutura)

text

TERMOS DE USO — SUPORTE EMPREENDEDOR

1. Aceitação dos termos
2. Descrição do serviço

   - Serviço PRIVADO e OPCIONAL de assessoria
   - NÃO somos órgão governamental
   - Os serviços podem ser realizados gratuitamente pelo

     próprio empreendedor nos portais oficiais
3. Honorários e pagamento

   - Valores claramente informados antes da contratação
   - Pagamento via PIX, boleto ou cartão
   - Política de reembolso
4. Obrigações do contratante

   - Fornecer dados verídicos e atualizados
   - Disponibilizar acesso/procuração quando necessário
5. Obrigações do contratado

   - Executar o serviço no prazo informado
   - Manter sigilo dos dados
   - Comunicar impedimentos
6. Limitação de responsabilidade

   - Não nos responsabilizamos por indisponibilidade

     dos portais governamentais
   - Não nos responsabilizamos por dados incorretos

     fornecidos pelo cliente
7. Propriedade intelectual
8. Rescisão
9. Foro e legislação aplicável
10. Contato

### 14.4 — Headers de Segurança

text

# _headers (Netlify) ou vercel.json

/*

  X-Frame-Options: DENY

  X-Content-Type-Options: nosniff

  X-XSS-Protection: 1; mode=block

  Referrer-Policy: strict-origin-when-cross-origin

  Permissions-Policy: camera=(), microphone=(), geolocation=()

  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.facebook.com;

  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

### 14.5 — Checklist de Segurança

text

SEGURANÇA — CHECKLIST DE IMPLEMENTAÇÃO

✅ Fase 1:

  □ HTTPS obrigatório (certificado SSL/TLS)

  □ Headers de segurança configurados

  □ CSP (Content Security Policy) implementada

  □ Sem dados sensíveis em localStorage

  □ Validação client-side em todos os campos

  □ Sanitização de inputs (XSS prevention)

  □ Disclaimer jurídico visível

  □ Checkbox de consentimento LGPD no formulário

  □ Política de Privacidade publicada

  □ Termos de Uso publicados

  □ robots.txt configurado

  □ Meta tags de segurança (noindex em páginas admin)

✅ Fase 2:

  □ Autenticação JWT com refresh tokens

  □ Rate limiting na API (express-rate-limit)

  □ Bcrypt para hash de senhas (custo ≥ 12)

  □ Validação server-side em todos os endpoints

  □ Sanitização de inputs no backend

  □ SQL injection prevention (Prisma/ORM)

  □ CORS configurado restritivamente

  □ Logs de acesso ao painel admin

  □ Backup automático do banco de dados

✅ Fase 3:

  □ 2FA (Two-Factor Authentication) para admin

  □ WAF (Web Application Firewall)

  □ Monitoramento de segurança (Sentry / LogRocket)

  □ Pen test inicial

  □ Política de retenção de dados implementada

  □ Mecanismo de exclusão de dados (LGPD)

---

## 15. Estratégia de Deploy e CI/CD

### 15.1 — Ambientes

| Ambiente        | URL                                | Branch    | Finalidade             |
| --------------- | ---------------------------------- | --------- | ---------------------- |
| Desenvolvimento | localhost:3000                     | feature/* | Desenvolvimento local  |
| Staging         | staging.suporteempreendedor.com.br | develop   | Testes e homologação |
| Produção      | suporteempreendedor.com.br         | main      | Ambiente público      |

### 15.2 — Pipeline CI/CD (GitHub Actions)

yaml

# .github/workflows/deploy.yml

name: CI/CD Pipeline

on:

  push:

    branches: [main, develop]

  pull_request:

    branches: [main]

jobs:

  lint-and-test:

    runs-on: ubuntu-latest

    steps:

    - name: Checkout

    uses: actions/checkout@v4

    - name: Setup Node.js

    uses: actions/setup-node@v4

    with:

    node-version: '20'

    cache: 'npm'

    - name: Install dependencies

    run: npm ci

    - name: Lint

    run: npm run lint

    - name: Type check

    run: npm run typecheck

    - name: Run tests

    run: npm run test

  build:

    needs: lint-and-test

    runs-on: ubuntu-latest

    steps:

    - name: Checkout

    uses: actions/checkout@v4

    - name: Setup Node.js

    uses: actions/setup-node@v4

    with:

    node-version: '20'

    cache: 'npm'

    - name: Install dependencies

    run: npm ci

    - name: Build

    run: npm run build

    - name: Upload build artifact

    uses: actions/upload-artifact@v4

    with:

    name: dist

    path: dist/

  deploy-staging:

    needs: build

    if: github.ref == 'refs/heads/develop'

    runs-on: ubuntu-latest

    steps:

    - name: Download artifact

    uses: actions/download-artifact@v4

    with:

    name: dist

    path: dist/

    - name: Deploy to Staging

    # Vercel / Netlify / Cloudflare deploy command

    run: echo "Deploy to staging environment"

  deploy-production:

    needs: build

    if: github.ref == 'refs/heads/main'

    runs-on: ubuntu-latest

    environment: production

    steps:

    - name: Download artifact

    uses: actions/download-artifact@v4

    with:

    name: dist

    path: dist/

    - name: Deploy to Production

    # Vercel / Netlify / Cloudflare deploy command

    run: echo "Deploy to production environment"

  lighthouse:

    needs: deploy-production

    if: github.ref == 'refs/heads/main'

    runs-on: ubuntu-latest

    steps:

    - name: Lighthouse CI

    uses: treosh/lighthouse-ci-action@v11

    with:

    urls: |

    https://suporteempreendedor.com.br/

    budgetPath: ./lighthouse-budget.json

### 15.3 — Scripts NPM

json

// package.json (parcial)

{

  "name":"suporte-empreendedor",

  "version":"1.0.0",

  "description":"Plataforma PWA de assessoria digital para MEI",

  "private":true,

  "scripts": {

    "dev":"vite",

    "build":"tsc && vite build",

    "preview":"vite preview",

    "lint":"eslint src/ --ext .ts",

    "lint:fix":"eslint src/ --ext .ts --fix",

    "format":"prettier --write 'src/**/*.{ts,html,css,json}'",

    "typecheck":"tsc --noEmit",

    "test":"vitest run",

    "test:watch":"vitest",

    "test:coverage":"vitest run --coverage",

    "lighthouse":"lhci autorun"

  },

  "devDependencies": {

    "typescript":"^5.4.0",

    "vite":"^5.2.0",

    "eslint":"^9.0.0",

    "prettier":"^3.2.0",

    "vitest":"^1.6.0",

    "@types/node":"^20.12.0"

  },

  "dependencies": {

    "lottie-web":"^5.12.0"

  }

}

---

## 16. Roadmap de Fases

### Visão Geral do Roadmap

text

═══════════════════════════════════════════════════════════════════

  FASE 1 — MVP (Semanas 1-3)          🎯 Objetivo: Validar demanda

═══════════════════════════════════════════════════════════════════

  Semana 1: Setup + Estrutura

  ├── ✅ Repositório GitHub configurado

  ├── ✅ Estrutura de pastas criada

  ├── ✅ TypeScript + Tailwind CSS configurados

  ├── ✅ index.html base com Header + Footer

  ├── ✅ manifest.json + ícones PWA

  ├── ✅ Service Worker básico (cache offline)

  └── ✅ Disclaimer jurídico no footer

  Semana 2: Landing Page Completa

  ├── ✅ Hero Section com animação Lottie

  ├── ✅ Grid de Serviços com SVGs

  ├── ✅ Router SPA (hash-based) em TypeScript

  ├── ✅ Páginas de Serviço dinâmicas

  ├── ✅ Formulários com máscaras e validação

  ├── ✅ FAQ accordion animado

  ├── ✅ Seção de depoimentos

  └── ✅ Redirect para WhatsApp com dados formatados

  Semana 3: Polish + Deploy

  ├── ✅ Testes unitários (validadores, máscaras)

  ├── ✅ Google Analytics 4 integrado

  ├── ✅ Meta Pixel integrado

  ├── ✅ SEO meta tags (Open Graph, Twitter Card)

  ├── ✅ Lighthouse score ≥ 90

  ├── ✅ Deploy em produção (Vercel/Netlify)

  ├── ✅ Domínio configurado + SSL

  └── ✅ Teste em dispositivos reais (Android/iOS)

═══════════════════════════════════════════════════════════════════

  FASE 2 — PLATAFORMA (Semanas 4-8)   🎯 Objetivo: Escalar operação

═══════════════════════════════════════════════════════════════════

  Semana 4-5: Backend + Banco de Dados

  ├── □ API REST (Node.js + Express/Fastify)

  ├── □ Banco de dados (Supabase/PostgreSQL)

  ├── □ Model de Lead + CRUD completo

  ├── □ Endpoint POST /api/leads (recebe formulário)

  ├── □ Autenticação JWT para admin

  └── □ Formulário do front agora envia para API (além do WhatsApp)

  Semana 6-7: Painel Administrativo

  ├── □ Tela de login admin

  ├── □ Dashboard com métricas reais

  ├── □ CRM Kanban com drag & drop

  ├── □ Modal de detalhes do lead

  ├── □ Sistema de notas internas

  ├── □ Histórico de status

  └── □ Exportação CSV

  Semana 8: Integração + Testes

  ├── □ Testes end-to-end

  ├── □ Stress test na API

  ├── □ Backup automático do banco

  ├── □ Documentação da API (Swagger/OpenAPI)

  └── □ Deploy do backend em produção

═══════════════════════════════════════════════════════════════════

  FASE 3 — INTEGRAÇÕES (Semanas 9-12)  🎯 Objetivo: Automatizar

═══════════════════════════════════════════════════════════════════

  Semana 9-10: Pagamentos

  ├── □ Integração Mercado Pago / Stripe

  ├── □ Gerar link PIX/Boleto via CRM

  ├── □ Webhook de confirmação de pagamento

  └── □ Atualização automática de status no Kanban

  Semana 11: WhatsApp Automatizado

  ├── □ Integração com WhatsApp Business API

  ├── □ Templates de mensagem aprovados

  ├── □ Envio automático: boas-vindas, pagamento, conclusão

  └── □ Notificações push (Web Push API)

  Semana 12: Otimização e Crescimento

  ├── □ A/B testing na Landing Page

  ├── □ E-mail transacional (Resend/SendGrid)

  ├── □ Programa de indicação

  ├── □ Blog/conteúdo para SEO (Fase futura)

  └── □ 2FA para admin

═══════════════════════════════════════════════════════════════════

  FASE 4 — EVOLUÇÃO (Trimestre 2+)     🎯 Objetivo: Produto maduro

═══════════════════════════════════════════════════════════════════

  ├── □ Área do cliente (acompanhar status do serviço)

  ├── □ Chatbot de atendimento na LP

  ├── □ App nativo (React Native / Capacitor)

  ├── □ Multi-operador (vários despachantes)

  ├── □ Relatórios avançados (BI)

  ├── □ Integrações com contabilidade

  └── □ Expansão para outros serviços (ME, EPP)

---

## 17. Guia de Contribuição (CONTRIBUTING.md)

markdown

# 🤝 Guia de Contribuição — Suporte Empreendedor

## Branches

- `main` — Produção (protegida, só via PR aprovado)
- `develop` — Staging (integração de features)
- `feature/nome-da-feature` — Features novas
- `fix/descricao-do-bug` — Correções de bugs
- `docs/descricao` — Atualizações de documentação

## Fluxo de Trabalho

1. Crie uma branch a partir de `develop`:

   ```bash

   git checkout develop

   git pull origin develop

   git checkout -b feature/nome-da-feature

   ```
2. Faça seus commits seguindo Conventional Commits:
3. text

feat: adiciona máscara de CPF no formulário

fix: corrige validação de CNPJ com zeros à esquerda

docs: atualiza README com instruções de instalação

style: ajusta espaçamento no grid de serviços

refactor: extrai lógica de validação para utils

test: adiciona testes para função de máscara

4. chore: atualiza dependências do projeto
5. Abra um Pull Request para develop:
   * Descreva o que foi feito
   * Adicione screenshots (se visual)
   * Referencie issues relacionadas
6. Após aprovação, faça merge

## Padrões de Código

* TypeScript strict mode (tsconfig com strict: true)
* ESLint sem warnings ou errors
* Prettier formatação automática
* Nomes em inglês para código (variáveis, funções, tipos)
* Nomes em português para conteúdo de UI (textos, labels)
* Commits em português são aceitos

## Setup Local

bash

# Clone o repositório

git clone https://github.com/renato0503/SuporteEmpreendedor.git

cd SuporteEmpreendedor

# Instale dependências

npminstall

# Inicie o servidor de desenvolvimento

npm run dev

# Abra http://localhost:3000

text

---

## 18. Guia de Estilo e Design System

### 18.1 — Paleta de Cores

CORES PRIMÁRIAS
═══════════════════════════════════════════════════

Brand Primary (Azul Profissional)
┌────────────────────────────────────────────┐
│ 50: #EFF6FF (bg-blue-50) │
│ 100: #DBEAFE (bg-blue-100) │
│ 500: #3B82F6 (bg-blue-500) ← Padrão │
│ 600: #2563EB (bg-blue-600) ← Hover │
│ 700: #1D4ED8 (bg-blue-700) │
│ 900: #1E3A5F (bg-blue-900) ← Header │
│ 950: #0F172A (bg-slate-950) ← Footer │
└────────────────────────────────────────────┘

Brand Success (Verde Ação)
┌────────────────────────────────────────────┐
│ 400: #34D399 (bg-emerald-400) ← Hover │
│ 500: #10B981 (bg-emerald-500) ← CTAs │
│ 600: #059669 (bg-emerald-600) │
└────────────────────────────────────────────┘

Brand Warning (Amarelo Alerta)
┌────────────────────────────────────────────┐
│ 500: #F59E0B (bg-amber-500) │
└────────────────────────────────────────────┘

Brand Danger (Vermelho Erro)
┌────────────────────────────────────────────┐
│ 500: #EF4444 (bg-red-500) │
└────────────────────────────────────────────┘

CORES NEUTRAS (Textos e Backgrounds)
═══════════════════════════════════════════════════
│ Texto principal: #111827 (text-gray-900) │
│ Texto secundário: #6B7280 (text-gray-500) │
│ Bordas: #E5E7EB (border-gray-200)│
│ Fundo página: #F9FAFB (bg-gray-50) │
│ Fundo card: #FFFFFF (bg-white) │

text

### 18.2 — Tipografia

FONTE PRIMÁRIA: Inter (Google Fonts)
═══════════════════════════════════════════════════

Headline H1: text-4xl md:text-6xl font-bold (36px / 60px)
Headline H2: text-3xl md:text-4xl font-bold (30px / 36px)
Headline H3: text-2xl font-semibold (24px)
Body Large: text-lg font-normal (18px)
Body: text-base font-normal (16px)
Body Small: text-sm font-normal (14px)
Caption: text-xs font-medium (12px)
Button: text-base font-semibold (16px)

CDN:

```

### 18.3 — Componentes de UI (Classes Tailwind)

css

/* BOTÕES */



/* Primário (CTA principal) */

.btn-primary {

  @apply bg-emerald-500 hover:bg-emerald-400 text-white

         font-semibold py-3 px-8 rounded-xl shadow-lg

         hover:shadow-xl transition-all duration-300

         active:scale-95 focus:ring-4 focus:ring-emerald-300;

}



/* Secundário */

.btn-secondary {

  @apply bg-blue-600 hover:bg-blue-500 text-white

         font-semibold py-3 px-6 rounded-lg shadow-md

         hover:shadow-lg transition-all duration-300

         active:scale-95 focus:ring-4 focus:ring-blue-300;

}



/* Ghost / Outline */

.btn-ghost {

  @apply bg-transparent border-2 border-gray-300

         hover:border-blue-500 hover:text-blue-600

         text-gray-700 font-semibold py-3 px-6 rounded-lg

         transition-all duration-300;

}



/* WhatsApp */

.btn-whatsapp {

  @apply bg-green-500 hover:bg-green-400 text-white

         font-semibold py-3 px-8 rounded-xl shadow-lg

         hover:shadow-xl transition-all duration-300

         active:scale-95 flex items-center gap-2;

}



/* INPUTS */



.input-field {

  @apply w-full px-4 py-3 rounded-lg border-2 border-gray-200

         focus:border-blue-500 focus:ring-4 focus:ring-blue-100

         outline-none transition-all duration-300

         text-gray-900 placeholder-gray-400;

}



.input-error {

  @apply border-red-500 focus:border-red-500 focus:ring-red-100;

}



.input-success {

  @apply border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100;

}



/* CARDS */



.card {

  @apply bg-white rounded-2xl shadow-md hover:shadow-xl

         transition-all duration-300 p-6 border border-gray-100;

}



.card-hoverable {

  @apply card hover:-translate-y-1 cursor-pointer;

}

### 18.4 — Espaçamento e Grid

text

ESPAÇAMENTO (Tailwind Scale)

═══════════════════════════════════════════════════



  Seções:     py-16 md:py-24    (64px / 96px)

  Entre cards: gap-6            (24px)

  Padding card: p-6             (24px)

  Entre campos form: space-y-4  (16px)

  Margin texto: mb-4            (16px)



CONTAINER

═══════════════════════════════════════════════════



  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8



GRID DE SERVIÇOS

═══════════════════════════════════════════════════



  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

### 18.5 — Animações

css

/* TRANSIÇÕES PADRÃO */



/* Fade In (para páginas) */

@keyframes fadeIn {

  from { opacity: 0; transform: translateY(10px); }

  to   { opacity: 1; transform: translateY(0); }

}

.animate-fadeIn {

  animation: fadeIn 0.4s ease-out forwards;

}



/* Slide Left (para páginas de serviço) */

@keyframes slideLeft {

  from { opacity: 0; transform: translateX(30px); }

  to   { opacity: 1; transform: translateX(0); }

}

.animate-slideLeft {

  animation: slideLeft 0.4s ease-out forwards;

}



/* Slide Down (para accordion) */

@keyframes slideDown {

  from { max-height: 0; opacity: 0; }

  to   { max-height: 500px; opacity: 1; }

}

.animate-slideDown {

  animation: slideDown 0.3s ease-out forwards;

  overflow: hidden;

}



/* Pulse (para badges de destaque) */

.animate-pulse-slow {

  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;

}



/* Scale on hover (para cards) */

.hover-scale {

  @apply transition-transform duration-300 hover:scale-105;

}


---


## 19. Plano de Testes

### 19.1 — Testes Unitários (Vitest)

typescript

// tests/validators.test.ts



import { describe, it, expect } from'vitest';

import { validateCPF, validateCNPJ, validateEmail, validatePhone } from'../src/utils/validators';



describe('validateCPF', () => {

  it('deve aceitar CPF válido', () => {

    expect(validateCPF('529.982.247-25')).toBe(true);

    expect(validateCPF('52998224725')).toBe(true);

  });



  it('deve rejeitar CPF com todos os dígitos iguais', () => {

    expect(validateCPF('111.111.111-11')).toBe(false);

    expect(validateCPF('000.000.000-00')).toBe(false);

  });



  it('deve rejeitar CPF com dígitos verificadores inválidos', () => {

    expect(validateCPF('529.982.247-26')).toBe(false);

    expect(validateCPF('123.456.789-00')).toBe(false);

  });



  it('deve rejeitar CPF com tamanho incorreto', () => {

    expect(validateCPF('1234567890')).toBe(false);

    expect(validateCPF('123456789012')).toBe(false);

    expect(validateCPF('')).toBe(false);

  });



  it('deve aceitar CPF com ou sem formatação', () => {

    expect(validateCPF('529.982.247-25')).toBe(true);

    expect(validateCPF('52998224725')).toBe(true);

  });

});



describe('validateCNPJ', () => {

  it('deve aceitar CNPJ válido', () => {

    expect(validateCNPJ('11.222.333/0001-81')).toBe(true);

    expect(validateCNPJ('11222333000181')).toBe(true);

  });



  it('deve rejeitar CNPJ com todos os dígitos iguais', () => {

    expect(validateCNPJ('11.111.111/1111-11')).toBe(false);

  });



  it('deve rejeitar CNPJ inválido', () => {

    expect(validateCNPJ('11.222.333/0001-82')).toBe(false);

  });

});



describe('validateEmail', () => {

  it('deve aceitar e-mails válidos', () => {

    expect(validateEmail('teste@email.com')).toBe(true);

    expect(validateEmail('nome.sobrenome@empresa.com.br')).toBe(true);

  });



  it('deve rejeitar e-mails inválidos', () => {

    expect(validateEmail('teste')).toBe(false);

    expect(validateEmail('teste@')).toBe(false);

    expect(validateEmail('@email.com')).toBe(false);

    expect(validateEmail('')).toBe(false);

  });

});



describe('validatePhone', () => {

  it('deve aceitar telefones válidos', () => {

    expect(validatePhone('(11) 99999-9999')).toBe(true);

    expect(validatePhone('11999999999')).toBe(true);

    expect(validatePhone('(11) 9999-9999')).toBe(true);

  });



  it('deve rejeitar telefones inválidos', () => {

    expect(validatePhone('1234')).toBe(false);

    expect(validatePhone('')).toBe(false);

  });

});

typescript

// tests/masks.test.ts



import { describe, it, expect } from'vitest';

import { maskCPF, maskCNPJ, maskPhone, unmask } from'../src/utils/masks';



describe('maskCPF', () => {

  it('deve formatar CPF corretamente', () => {

    expect(maskCPF('52998224725')).toBe('529.982.247-25');

  });



  it('deve formatar parcialmente enquanto digita', () => {

    expect(maskCPF('529')).toBe('529');

    expect(maskCPF('5299')).toBe('529.9');

    expect(maskCPF('52998224')).toBe('529.982.24');

    expect(maskCPF('529982247')).toBe('529.982.247');

    expect(maskCPF('52998224725')).toBe('529.982.247-25');

  });



  it('deve limitar a 14 caracteres formatados', () => {

    expect(maskCPF('529982247251234')).toBe('529.982.247-25');

  });

});



describe('maskCNPJ', () => {

  it('deve formatar CNPJ corretamente', () => {

    expect(maskCNPJ('11222333000181')).toBe('11.222.333/0001-81');

  });

});



describe('maskPhone', () => {

  it('deve formatar celular corretamente', () => {

    expect(maskPhone('11999999999')).toBe('(11) 99999-9999');

  });



  it('deve formatar fixo corretamente', () => {

    expect(maskPhone('1133334444')).toBe('(11) 3333-4444');

  });

});



describe('unmask', () => {

  it('deve remover todos os caracteres não numéricos', () => {

    expect(unmask('529.982.247-25')).toBe('52998224725');

    expect(unmask('(11) 99999-9999')).toBe('11999999999');

    expect(unmask('11.222.333/0001-81')).toBe('11222333000181');

  });

});

typescript

// tests/whatsapp.test.ts



import { describe, it, expect } from'vitest';

import { generateWhatsAppURL } from'../src/utils/whatsapp';



describe('generateWhatsAppURL', () => {

  it('deve gerar URL válida com todos os campos', () => {

    const data = {

      nome:'Carlos Eduardo',

      cpf:'529.982.247-25',

      cnpj:'11.222.333/0001-81',

      telefone:'(11) 99999-9999',

      email:'carlos@email.com',

      servicoId:'parcelamento'asconst,

      servicoNome:'Parcelamento de Débitos',

      valorHonorario:127,

      observacoes:'Tenho 3 DAS atrasadas',

    };



    const url =generateWhatsAppURL(data);

    expect(url).toContain('https://api.whatsapp.com/send');

    expect(url).toContain('phone=');

    expect(url).toContain('text=');

    expect(url).toContain(encodeURIComponent('Carlos Eduardo'));

    expect(url).toContain(encodeURIComponent('Parcelamento'));

  });



  it('deve funcionar sem campos opcionais', () => {

    const data = {

      nome:'Ana Paula',

      cpf:'529.982.247-25',

      telefone:'(11) 99999-9999',

      email:'ana@email.com',

      servicoId:'abertura'asconst,

      servicoNome:'Abertura de MEI',

      valorHonorario:97,

    };



    const url =generateWhatsAppURL(data);

    expect(url).toContain('https://api.whatsapp.com/send');

    expect(url).toContain(encodeURIComponent('Ana Paula'));

  });

});

### 19.2 — Testes de Acessibilidade

text

TESTES MANUAIS DE ACESSIBILIDADE

═══════════════════════════════════════════════════



□ Navegação completa via teclado (Tab, Shift+Tab, Enter, Escape)

□ Focus visible em todos os elementos interativos

□ Labels associados a todos os campos de formulário

□ Alt text em todas as imagens e ícones decorativos com aria-hidden

□ Contraste de cores ≥ 4.5:1 (texto normal) e ≥ 3:1 (texto grande)

□ Textos legíveis com zoom de 200%

□ Formulário utilizável com screen reader (VoiceOver / NVDA)

□ Mensagens de erro anunciadas por screen reader (aria-live)

□ Accordion operável via teclado (Enter/Space para abrir/fechar)

□ Skip to content link no topo da página

□ Landmark roles adequados (<header>, <main>, <footer>, <nav>)

□ Idioma declarado (<html lang="pt-BR">)

### 19.3 — Testes de Performance

text

TESTES DE PERFORMANCE (Lighthouse / WebPageTest)

═══════════════════════════════════════════════════



Métricas Alvo (Core Web Vitals):

  □ LCP (Largest Contentful Paint)  < 2.0s

  □ FID (First Input Delay)        < 100ms

  □ CLS (Cumulative Layout Shift)  < 0.1

  □ FCP (First Contentful Paint)   < 1.5s

  □ TTFB (Time to First Byte)     < 600ms

  □ TBT (Total Blocking Time)     < 200ms



Lighthouse Scores:

  □ Performance:    ≥ 90

  □ Accessibility:  ≥ 90

  □ Best Practices: ≥ 90

  □ SEO:           ≥ 90

  □ PWA:           ≥ 90



Testes em condições adversas:

  □ Throttle: Slow 3G

  □ Throttle: Fast 3G

  □ CPU: 4x slowdown

  □ Offline: Service Worker fallback funciona

### 19.4 — Testes em Dispositivos

text

MATRIZ DE DISPOSITIVOS PARA TESTE

═══════════════════════════════════════════════════



MOBILE (Prioridade ALTA — maioria do público):

  □ Android 11+ / Chrome (Samsung Galaxy A10/A20)

  □ Android 12+ / Chrome (Pixel, Samsung S series)

  □ Android / Samsung Internet

  □ Android / Firefox

  □ iOS 15+ / Safari (iPhone SE, iPhone 12 mini)

  □ iOS 16+ / Safari (iPhone 13, 14, 15)

  □ iOS / Chrome



TABLET:

  □ iPad / Safari

  □ Android tablet / Chrome



DESKTOP:

  □ Windows / Chrome

  □ Windows / Edge

  □ Windows / Firefox

  □ macOS / Safari

  □ macOS / Chrome



PWA INSTALL:

  □ Android / Chrome → "Adicionar à Tela Inicial" funciona

  □ iOS / Safari → "Adicionar à Tela de Início" funciona

  □ Splash screen exibida ao abrir PWA

  □ Ícone correto na tela inicial

  □ App abre em modo standalone (sem barra do navegador)


---


## 20. Apêndices e Referências

### 20.1 — Código de Referência: Tipos TypeScript Completos

typescript

// src/types/index.ts



// ==========================================

// SERVICE TYPES

// ==========================================



exporttypeServiceId=

  |'abertura'

  |'declaracao'

  |'parcelamento'

  |'alteracao'

  |'baixa'

  |'consulta';



exportinterfaceService {

  id: ServiceId;

  slug:string;

  nome:string;

  descricaoCurta:string;

  descricaoCompleta:string;

  valorMinimo:number;

  valorMaximo:number;

  icone:string; // caminho para SVG

  corDestaque:string; // classe Tailwind

  prazoEstimado:string;

  documentosNecessarios:string[];

  faq: FAQItem[];

}



exportinterfaceFAQItem {

  pergunta:string;

  resposta:string;

}



// ==========================================

// FORM TYPES

// ==========================================



exportinterfaceFormField {

  name:string;

  label:string;

  type:'text'|'email'|'tel'|'select'|'textarea'|'checkbox';

  placeholder?:string;

  required:boolean;

  mask?:'cpf'|'cnpj'|'phone';

  validation?: (value:string) => ValidationResult;

  options?: SelectOption[]; // para type === 'select'

  maxLength?:number;

}



exportinterfaceSelectOption {

  value:string;

  label:string;

}



exportinterfaceValidationResult {

  valid:boolean;

  message?:string;

}



exportinterfaceLeadFormData {

  nome:string;

  cpf:string;

  cnpj?:string;

  telefone:string;

  email:string;

  servicoId: ServiceId;

  servicoNome:string;

  valorHonorario:number;

  observacoes?:string;

  consentimento:boolean;

}



// ==========================================

// LEAD TYPES (Back-office — Fase 2)

// ==========================================



exporttypeLeadStatus=

  |'novo'

  |'em_atendimento'

  |'aguardando_pagamento'

  |'servico_em_andamento'

  |'concluido'

  |'perdido';



exportinterfaceLead {

  id:string;

  nome:string;

  cpf:string;

  cnpj?:string;

  telefone:



**
```
