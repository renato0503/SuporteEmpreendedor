import type { FAQItem } from '../types';

export const FAQ_GERAL: FAQItem[] = [
  {
    pergunta: 'O que é um MEI (Microempreendedor Individual)?',
    resposta: 'O MEI é uma modalidade de empresa simplificada criada pelo governo brasileiro para formalizar pequenos negócios. Com o MEI, você pode ter um CNPJ próprio, emitir notas fiscais,Ter benefícios previdenciários e pagar impostos simplificados. O limite de faturamento anual é de R$ 81.000,00 (atualizado anualmente).',
    palavrasChave: ['MEI', 'microempreendedor', 'formalização', 'CNPJ'],
  },
  {
    pergunta: 'Quanto custa para abrir um MEI?',
    resposta: 'A abertura do MEI é gratuita. Você só paga uma taxa mensal obrigatória (DAS) que corresponde a 5% do salário mínimo vigente, que inclui contribuição previdenciária e, se aplicável, ISS e ICMS. Os honorários do despachante são cobrados separadamente pelo serviço de abertura.',
    palavrasChave: ['custo MEI', 'taxa', 'DAS', 'imposto MEI'],
  },
  {
    pergunta: 'Quais documentos preciso para abrir um MEI?',
    resposta: 'Para abrir um MEI você precisará de: CPF válido, Título de eleitor ou comprovante de votação, comprovante de endereço comercial ou residencial, número de celular com WhatsApp ativo e e-mail válido. Não é necessário ter capital inicial nem documentos adicionales.',
    palavrasChave: ['documentos abertura MEI', 'CPF', 'título eleitor'],
  },
  {
    pergunta: 'Preciso ter contador para ser MEI?',
    resposta: 'Não, o MEI não é obrigado a ter contador. No entanto, se seu faturamento ultrapassar determinados limites ou se tiver dúvidas sobre obrigações acessórias, Recommendável buscar orientação profissional para evitar problemas com o Leão.',
    palavrasChave: ['contador MEI', 'obrigações acessórias'],
  },
  {
    pergunta: 'O MEI pode emitir nota fiscal?',
    resposta: 'Sim, o MEI pode e deve emitir notas fiscais electrônicas (NF-e) para vendas a empresas e, em alguns estados, para vendas a consumidores. Para emitir notas, é necessário fazer o cadastro na Secretária de Fazenda do seu estado.',
    palavrasChave: ['nota fiscal MEI', 'NF-e', 'nota fiscal eletrônica'],
  },
  {
    pergunta: 'O que acontece se eu não pagar o DAS do MEI?',
    resposta: 'O não pagamento do DAS gera débitos que acumulam juros e multa. Após alguns meses de inadimplência, o CNPJ pode ser bloqueado para emissão de notas fiscais e, em casos extremos, cancelado automaticamente. Além disso, débitos impedem a participação em licitações e obtenção de crédito.',
    palavrasChave: ['DAS não pago', 'débito MEI', 'juros multa'],
  },
];

export function getServiceFAQ(serviceId: string): FAQItem[] {
  const faqMap: Record<string, FAQItem[]> = {
    'abertura-mei': [
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
    'dasan': [
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
    parcelamento: [
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
        resposta: 'O parcelamento pode ser cancelado se houver 3 parcelas consecutivas ou 5 alternadas não pagas. Nesse caso, todo o valor restante se torna imediatamente vencido.',
      },
      {
        pergunta: 'Posso incluir débitos estaduais no mesmo parcelamento?',
        resposta: 'Débitos estaduais (ICMS) e municipais (ISS) têm parcelamentos separados. Cada estado/município tem suas próprias regras. Podemos orientá-lo sobre como proceder para cada tipo de débito.',
      },
    ],
    'alteracao-cadastral': [
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
    'baixa-mei': [
      {
        pergunta: 'A baixa do MEI é gratuita?',
        resposta: 'Sim, o procedimento de baixa junto à Receita Federal é gratuito. However, é necessário quitar eventuais débitos existentes para que a baixa seja concluída.',
      },
      {
        pergunta: 'Posso reabrir o MEI depois da baixa?',
        resposta: 'Sim, é possível abrir um novo MEI a qualquer momento após a baixa. Não há período de carência, mas você precisará de um novo CNPJ.',
      },
      {
        pergunta: 'E se eu tiver funcionário?',
        resposta: 'Antes da baixa, é necessário dispensar o funcionário adequadamente, com rescisão de contrato, emitir as guias de FGTS e contribuições atrasadas, e fazer a baixa do funcionário no CAGED.',
      },
      {
        pergunta: 'Quais débitos preciso quitar para fazer a baixa?',
        resposta: 'É necessário quitar: DAS em aberto, última DASN (com entrega em dia), débitos de ICMS e ISS (se aplicável), e eventuais multas por atraso na entrega de declarações.',
      },
    ],
    'consulta-situacao': [
      {
        pergunta: 'O que significa cada situação cadastral?',
        resposta: 'Os principais status são: Ativo (regular), Inapto (pendência de declaração), Suspenso (bloqueio judicial ou administrativo), Baixado (encerrado) e Nulo (não localizado).',
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
  };
  return faqMap[serviceId] || [];
}

export function getAllFAQs(): FAQItem[] {
  return FAQ_GERAL;
}

export function searchFAQ(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return FAQ_GERAL.filter(
    (item) =>
      item.pergunta.toLowerCase().includes(lowerQuery) ||
      item.resposta.toLowerCase().includes(lowerQuery)
  );
}