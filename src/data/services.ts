import type { Service, ServiceId, FAQItem } from '../types';
import { SERVICE_PRICES } from './config';

export const SERVICES: Service[] = [
  {
    id: 'abertura-mei',
    slug: 'abertura-mei',
    nome: 'Abertura de MEI',
    descricaoCurta: 'Formalize seu negócio em poucos dias com todo o suporte necessário.',
    descricaoCompleta: `A abertura do Microempreendedor Individual (MEI) é o primeiro passo para quem deseja trabalhar formalmente no Brasil. Com nosso serviço, você não precisa enfrentar filas complicadas nem entender toda a burocracia governamental.

Nosso time de despachantes especializados cuida de todo o processo de abertura, desde a escolha da atividade principal (CBO) até a emissão do CCMEI (Certificado de Condição de Microempreendedor Individual). Vocêreceberá todas as orientações necessárias e We'll guide you through each step of the process.

Após a formalização, você terá acesso a todos os benefícios do MEI: emissão de notas fiscais, acesso a linhas de crédito com taxas especiais, direitos previdenciários completos e muito mais.`,
    valorMinimo: SERVICE_PRICES['abertura-mei'].min,
    valorMedio: SERVICE_PRICES['abertura-mei'].average,
    icone: 'briefcase',
    corDestaque: '#2563EB',
    prazoEstimado: '3 a 5 dias úteis',
    documentosNecessarios: [
      'CPF do titular',
      'Título de eleitor ou comprovante de votação',
      'Comprovante de endereço',
      'Número do celular com WhatsApp',
      'E-mail válido',
    ],
    faq: [
      {
        pergunta: 'Quanto tempo leva para abrir um MEI?',
        resposta: 'O processo de abertura do MEI geralmente leva de 3 a 5 dias úteis após o envio de todos os documentos necessários. Em alguns casos, pode ser mais rápido dependendo da disponibilidade dos órgãos responsáveis.',
      },
      {
        pergunta: 'Quais são os custos mensais do MEI?',
        resposta: 'O MEI paga mensalmente o DAS (Documento de Arrecadação do Simples Nacional), que corresponde a 5% do salário mínimo vigente. Esse valor inclui contribuição previdenciária, ISS (se prestador de serviços) e ICMS (se comerciante).',
      },
      {
        pergunta: 'Posso ter funcionários como MEI?',
        resposta: 'Sim, o MEI pode contratar até 1 funcionário com carteira assinada. Nesse caso, há obrigações adicionais como recolhimento de FGTS e contribuição previdenciária sobre a folha de pagamento.',
      },
      {
        pergunta: 'O que acontece se eu não emitir notas fiscais?',
        resposta: 'A emissão de notas fiscais é obrigatória para operações comerciais e prestação de serviços B2B. Para vendas ao consumidor final, a nota fiscal eletrônica (NF-e) é obrigatória acima de R$ 10.000 anuais.',
      },
    ],
    beneficios: [
      'Processo 100% online e sem burocracia',
      'Especialistas dedicados ao seu caso',
      'Orientação sobre atividades permitidas',
      'Acompanhamento completo até a conclusão',
      'Suporte pós-abertura',
    ],
    etapas: [
      'Envio dos documentos via formulário',
      'Análise e validação dos dados',
      'Cadastro na Receita Federal',
      'Cadastro na Secretária de Fazenda',
      'Emissão do CCMEI',
      'Entrega do relatório final',
    ],
    observacoes: 'O valor informado é referente aos honorários despachantes. Taxas governamentais são isentas para abertura do MEI.',
  },
  {
    id: 'dasan',
    slug: 'declaracao-anual-dasn',
    nome: 'Declaração Anual (DASN)',
    descricaoCurta: 'Declare seu faturamento anual de forma simples e evite multas.',
    descricaoCompleta: `A Declaração Anual do Simples Nacional (DASN) é uma obrigação obrigatória de todos os Microempreendedores Individuais. Through this annual declaration, you report your total revenue to the tax authorities.

Many entrepreneurs forget this deadline or make mistakes when completing the declaration, which can result in fines of up to 2% per month on the amount due, in addition to loss of benefits and even cancellation of the CNPJ.

Our service includes complete analysis of your billing data, preparation and submission of the declaration to the Federal Revenue Service, and delivery of the receipt confirming compliance. We also verify that there are no pending debts that could block your CNPJ.`,
    valorMinimo: SERVICE_PRICES['dasan'].min,
    valorMedio: SERVICE_PRICES['dasan'].average,
    icone: 'document',
    corDestaque: '#10B981',
    prazoEstimado: '1 a 2 dias úteis',
    documentosNecessarios: [
      'CPF do titular',
      'CNPJ do MEI',
      'Total de faturamento bruto anual',
      'Valor de despesas (se declarado)',
      'Notas fiscais emitidas no ano',
    ],
    faq: [
      {
        pergunta: 'Qual é o prazo para entregar a DASN?',
        resposta: 'O prazo é até o dia 31 de maio de cada ano. Após essa data, são aplicadas multas e juros. Lembramos que o prazo pode variar em casos de mudança de situação cadastral durante o ano.',
      },
      {
        pergunta: 'O que acontece se eu não entregar a DASN?',
        resposta: 'A multa para atraso na entrega é de 2% ao mês sobre o imposto devido, limitada a 20% do valor total. Além disso, o CNPJ pode ser cancelado automaticamente após 12 meses sem declaração.',
      },
      {
        pergunta: 'Preciso ter contador para fazer a DASN?',
        resposta: 'Não é obrigatório, mas altamente recomendado. Um despachante ou contador pode identificar deduções legais e garantir que a declaração esteja correta, evitando problemas futuros.',
      },
      {
        pergunta: 'Como funciona a declaração para quem iniciou as atividades no meio do ano?',
        resposta: 'Para quem abriu o MEI durante o ano, a declaração deve proporcionalizar o faturamento. Por exemplo, se abriu em julho, declara apenas os meses de operação.',
      },
    ],
    beneficios: [
      'Análise completa do faturamento anual',
      'Declaração preenchida por especialistas',
      'Verificação de débitos pendentes',
      'Entrega dentro do prazo',
      'Recibo de entrega garantizado',
    ],
    etapas: [
      'Coleta de dados de faturamento',
      'Verificação de notas fiscais emitidas',
      'Cálculo correto dos valores devidos',
      'Preenchimento e transmissão da DASN',
      'Emissão do comprovante de entrega',
    ],
    observacoes: 'Serviço válido para declarações de anos anteriores (atrasadas). Consultar valores adicionais para declarações com mais de 1 ano de atraso.',
  },
  {
    id: 'parcelamento',
    slug: 'parcelamento-debitos-mei',
    nome: 'Parcelamento de Débitos',
    descricaoCurta: 'Parcele suas dívidas do MEI em até 60 vezes com condições especiais.',
    descricaoCompleta: `Se você acumulou débitos do MEI, seja por falta de pagamento do DAS mensal ou pela não entrega da DASN, sabe como pode ser difícil resolver essa situação. Além da dificuldade financeira, os débitos podem impedir a emissão de notas fiscais e até mesmo levar ao cancelamento do CNPJ.

Oferecemos um serviço completo de parcelamento que permite quitar suas dívidas em condições facilitadas. Atuamos diretamente junto à Receita Federal e Secretarias de Fazenda para negociar o melhor plano de pagamento para sua situação.

O parcelamento pode ser feito em até 60 vezes para débitos federais, com entrada reduzida. Para débitos estaduais e municipais, as condições variam conforme a legislação local. Nossa equipe analisa seu caso e indica a melhor estratégia de regularização.`,
    valorMinimo: SERVICE_PRICES['parcelamento'].min,
    valorMedio: SERVICE_PRICES['parcelamento'].average,
    icone: 'calculator',
    corDestaque: '#F59E0B',
    prazoEstimado: '5 a 10 dias úteis',
    documentosNecessarios: [
      'CPF do titular',
      'CNPJ do MEI',
      'Comprovantes de débitos existentes',
      'Comprovante de renda atual',
      'Telefone e e-mail para contato',
    ],
    faq: [
      {
        pergunta: 'Qual é o valor mínimo da parcela?',
        resposta: 'O valor mínimo da parcela é de R$ 28,74 (aproximadamente 1% do salário mínimo). O número máximo de parcelas é 60 para débitos federais.',
      },
      {
        pergunta: 'Posso parcelar débitos atrasados de vários anos?',
        resposta: 'Sim, é possível parcelar débitos de anos anteriores, incluindo multas e juros. Existe um programa específico (PRT - Parcelamento de Débitos do Simples Nacional) que facilita essa negociação.',
      },
      {
        pergunta: 'O que acontece se eu não pagar uma parcela?',
        resposta: 'O parcelamento pode ser cancelado se houver 3 parcelas consecutivas ou 5 alternadas não pagas. Nesse caso, todo o valor剩下的 становится立即到期。',
      },
      {
        pergunta: 'Posso incluir débitos estaduais no mesmo parcelamento?',
        resposta: 'Débitos estaduais (ICMS) e municipais (ISS) têm parcelamentos separados. Cada estado/município tem suas próprias regras. Podemos orientá-lo sobre como proceder para cada tipo de débito.',
      },
    ],
    beneficios: [
      'Análise completa da situação cadastral',
      'Negociação das melhores condições',
      'Parcelamento em até 60 vezes',
      'Regularização imediata do CNPJ',
      'Suporte durante todo o período do parcelamento',
    ],
    etapas: [
      'Análise detalhada dos débitos existentes',
      'Levantamento de débitos federais, estaduais e municipais',
      'Elaboração da proposta de parcelamento',
      'Protocolo do pedido junto aos órgãos',
      'Acompanhamento até aprovação',
      'Orientação para pagamento das parcelas',
    ],
    observacoes: 'O valor informado refere-se aos honorários despachantes. Os valores dos débitos parcelados são pagos diretamente aos órgãos públicos.',
  },
  {
    id: 'alteracao-cadastral',
    slug: 'alteracao-cadastral-mei',
    nome: 'Alteração Cadastral',
    descricaoCurta: 'Atualize seus dados cadastrais de forma rápida e segura.',
    descricaoCompleta: `Quando você precisa alterar informações do seu MEI, como endereço, telefone, atividades econômicas ou até mesmo nome fantasia, é necessário fazer uma alteração cadastral junto à Receita Federal e demais órgãos competentes.

Esse processo, embora aparentemente simples, pode gerar problemas se não for feito corretamente. Uma alteração malfeita pode afetar a tributação, a emissão de notas fiscais ou até mesmo o vínculo com fornecedores e clientes.

Our team takes care of the entire process, ensuring that all changes are registered correctly with the Federal Revenue, State Treasury and Municipal offices. We also verify that there are no pending debts that could complicate the update.`,
    valorMinimo: SERVICE_PRICES['alteracao-cadastral'].min,
    valorMedio: SERVICE_PRICES['alteracao-cadastral'].average,
    icone: 'pencil',
    corDestaque: '#8B5CF6',
    prazoEstimado: '2 a 3 dias úteis',
    documentosNecessarios: [
      'CPF do titular',
      'CNPJ do MEI',
      'Documento com dados a serem alterados',
      'Comprovante de novo endereço (se mudança)',
      'Telefone e e-mail atualizados',
    ],
    faq: [
      {
        pergunta: 'Quais dados posso alterar no MEI?',
        resposta: 'É possível alterar: endereço comercial, telefone, e-mail, nome fantasia, atividades econômicas (CBO), natureza jurídica, Capital Social e informações de contato.',
      },
      {
        pergunta: 'Trocar de atividade requer algum custo adicional?',
        resposta: 'A mudança de atividade principal pode alterar a tributação mensal (valores de ISS e ICMS). Algumas atividades têm adicionais de imposto. Nossa equipe orienta sobre os impactos.',
      },
      {
        pergunta: 'Posso mudar o endereço do MEI para outro estado?',
        resposta: 'Sim, é possível, mas o processo envolve baixa no estado atual e abertura no novo estado. Isso pode afetar débitos existentes e histórico de contribuição.',
      },
      {
        pergunta: 'A alteração cadastral interfere no meu CNPJ?',
        resposta: 'Não, o CNPJ permanece o mesmo. Apenas os dados cadastrais são atualizados. A alteração não afeta a contagem de tempo de atividade ou benefícios conquistados.',
      },
    ],
    beneficios: [
      'Atualização completa em todos os órgãos',
      'Verificação de pendências antes da alteração',
      'Processo 100% online',
      'Novo comprovante atualizado',
      'Confirmação de todas as mudanças',
    ],
    etapas: [
      'Levantamento dos dados atuais',
      'Identificação das alterações necessárias',
      'Atualização na Receita Federal',
      'Atualização na Secretária de Fazenda (estadual)',
      'Atualização na Secretária de Fazenda (municipal)',
      'Entrega do novo comprovante',
    ],
    observacoes: 'Para alterações que envolvam mudança de cidade ou estado, consultar prazos e documentações adicionais.',
  },
  {
    id: 'baixa-mei',
    slug: 'baixa-mei-encerramento',
    nome: 'Baixa do MEI',
    descricaoCurta: 'Encerre sua atividade formal de forma legal e sem complicações.',
    descricaoCompleta: `Se você decidiu encerrar suas atividades como Microempreendedor Individual, é fundamental fazer a baixa formal do CNPJ. Isso evita que você continue acumulando obrigações e débitos automaticamente.

O processo de baixa do MEI é gratuito junto aos órgãos governamentais, mas requer atenção a alguns detalhes importantes. É necessário quitar todos os débitos existentes, entregar a DASN final e verificar que não há pendências em aberto.

Nossa equipe orienta sobre todos os passos necessários para uma baixa segura, incluindo a orientação sobre como proceder com funcionários (se houver), a destinação de estoque e equipamentos, e a declaração final de informações.`,
    valorMinimo: SERVICE_PRICES['baixa-mei'].min,
    valorMedio: SERVICE_PRICES['baixa-mei'].average,
    icone: 'trash',
    corDestaque: '#EF4444',
    prazoEstimado: '3 a 5 dias úteis',
    documentosNecessarios: [
      'CPF do titular',
      'CNPJ do MEI',
      'Comprovante de débitos quitados',
      'Última DASN entregue',
      'Declaração de baixa de funcionários (se aplicável)',
    ],
    faq: [
      {
        pergunta: 'A baixa do MEI é gratuita?',
        resposta: 'Sim, o procedimento de baixa junto à Receita Federal é gratuito. however, é necessário quitar eventuais débitos existentes para que a baixa seja concluída.',
      },
      {
        pergunta: 'Posso reopen o MEI depois da baixa?',
        resposta: 'Sim, é possível abrir um novo MEI a qualquer momento após a baixa. Não há período de carência, mas você precisará de um novo CNPJ.',
      },
      {
        pergunta: 'E se eu tiver funcionário?',
        resposta: 'Antes da baixa, é necessário dispensar o funcionário adequadamente, rescisão de contrato,emitir as guias de FGTS e contribuições atrasadas, e fazer a baixa do karyawan no CAGED.',
      },
      {
        pergunta: 'Quais débitos preciso quitar para fazer a baixa?',
        resposta: 'É necessário quitar: DAS em aberto, última DASN (com entrega em dia), débitos de ICMS e ISS (se aplicável), e eventuais multas por atraso na entrega de declarações.',
      },
    ],
    beneficios: [
      'Orientação completa sobre o processo',
      'Verificação de débitos pendentes',
      'Auxílio na declaração final',
      'Baixa em todos os órgãos',
      'Certidão de baixa delivered',
    ],
    etapas: [
      'Verificação de débitos pendentes',
      'Quitação ou parcelamento de débitos',
      'Entrega da DASN final',
      'Protocolo de baixa na Receita Federal',
      'Baixa nas Secretarias de Fazenda',
      'Entrega do comprovante de baixa',
    ],
    observacoes: 'É fundamental entregar a DASN do ano da baixa, mesmo que não haja faturamento. Isso evita cobranças futuras.',
  },
  {
    id: 'consulta-situacao',
    slug: 'consulta-situacao-cadastral',
    nome: 'Consulta de Situação',
    descricaoCurta: 'Verifique a situação do seu CNPJ MEI instantaneamente.',
    descricaoCompleta: `Você sabe qual é a situação atual do seu CNPJ? Muitos empreendedores descobrem problemas apenas quando tentam emitir uma nota fiscal ou participar de uma licitação.

A consulta de situação cadastral verifica todos os aspectos do seu MEI junto à Receita Federal, Secretarias de Fazenda Estaduais e Municipais, e outros órgãos reguladores. Assim, você mantém controle total sobre a regularidade do seu negócio.

Este serviço é ideal para quem está planejando expandir atividades, participar de licitações, obter crédito ou simplesmente quer ter certeza de que está tudo em dia com o governo.`,
    valorMinimo: SERVICE_PRICES['consulta-situacao'].min,
    valorMedio: SERVICE_PRICES['consulta-situacao'].average,
    icone: 'search',
    corDestaque: '#06B6D4',
    prazoEstimado: 'Imediato',
    documentosNecessarios: [
      'CPF do titular',
      'CNPJ do MEI',
      'Telefone para contato',
    ],
    faq: [
      {
        pergunta: 'O que significa cada situação cadastral?',
        resposta: 'Os principais status são: Ativo (regular), Inapto (pendência de declaração), Suspenso (bloqueio judicial ou administrativo), Baixado (encerrado) e Null (não localizado).',
      },
      {
        pergunta: 'Por que meu CNPJ pode estar inapto?',
        resposta: 'A situação "Inapto" geralmente ocorre pela não entrega da DASN por 2 anos consecutivos. Também pode acontecer por pendências em declarações optantes.',
      },
      {
        pergunta: 'Como resolver um CNPJ inapto?',
        resposta: 'Para reativar, é necessário entregar todas as DASN atrasadas e quitar eventuais débitos em aberto. Em alguns casos, pode ser necessário procurar um contador.',
      },
      {
        pergunta: 'A consulta mostra débitos em aberto?',
        resposta: 'Sim, o relatório inclui informações sobre débitos de DAS, ICMS, ISS e outras obrigações não cumpridas.',
      },
    ],
    beneficios: [
      'Verificação completa em todos os órgãos',
      'Relatório detalhado da situação',
      'Identificação de pendências',
      'Orientações para regularização',
      'Certidão de situação atualizada',
    ],
    etapas: [
      'Consulta na Receita Federal',
      'Consulta na Secretária de Fazenda Estadual',
      'Consulta na Secretária de Fazenda Municipal',
      'Elaboração do relatório completo',
      'Entrega do diagnóstico',
    ],
    observacoes: 'Serviço disponível para consulta de CNPJs de todo o Brasil.',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServiceById(id: ServiceId): Service {
  const service = SERVICES.find((s) => s.id === id);
  if (!service) {
    throw new Error(`Service with id "${id}" not found`);
  }
  return service;
}

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServicesByPriceRange(min: number, max: number): Service[] {
  return SERVICES.filter((service) => service.valorMinimo >= min && service.valorMinimo <= max);
}

export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase();
  return SERVICES.filter(
    (service) =>
      service.nome.toLowerCase().includes(lowerQuery) ||
      service.descricaoCurta.toLowerCase().includes(lowerQuery) ||
      service.descricaoCompleta.toLowerCase().includes(lowerQuery)
  );
}