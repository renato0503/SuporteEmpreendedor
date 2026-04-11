import { Lead, ActivityItem, FollowUp } from '../types/admin.types';

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead_1',
    nome: 'Ricardo Oliveira',
    email: 'ricardo.oli@gmail.com',
    telefone: '(65) 99234-1122',
    servico: 'Parcelamento de Débitos',
    valor: 127,
    status: 'em_negociacao',
    cpf: '123.456.789-01',
    origem: 'google',
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: 'lead_2',
    nome: 'Maria Fernanda Santos',
    email: 'ma_fernanda@outlook.com',
    telefone: '(65) 99876-5432',
    servico: 'Abertura de MEI',
    valor: 97,
    status: 'novo',
    cnpj: '',
    origem: 'instagram',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
  },
  {
    id: 'lead_3',
    nome: 'João Pedro Silva',
    email: 'jpedro.silva@uol.com.br',
    telefone: '(65) 98111-2233',
    servico: 'Declaração Anual (DASN)',
    valor: 67,
    status: 'aguardando_pagamento',
    cpf: '987.654.321-00',
    origem: 'organico',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 'lead_4',
    nome: 'Ana Cláudia Mendes',
    email: 'ana.claudia@empresa.com',
    telefone: '(65) 99344-5566',
    servico: 'Alteração Cadastral',
    valor: 67,
    status: 'em_execucao',
    cnpj: '12.345.678/0001-90',
    origem: 'google',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 'lead_5',
    nome: 'Bruno Carvalho',
    email: 'bruno.carv@hotmail.com',
    telefone: '(65) 99555-6677',
    servico: 'Encerramento de MEI',
    valor: 97,
    status: 'concluido',
    cpf: '456.789.123-45',
    origem: 'indicacao',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
  // Add more to reach 25
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `lead_mock_${i}`,
    nome: `Cliente Mock ${i + 6}`,
    email: `cliente${i + 6}@teste.com`,
    telefone: `(65) 99000-00${i + 6}`,
    servico: ['Abertura de MEI', 'DASN', 'Parcelamento', 'Alteração', 'Baixa', 'Consulta'][Math.floor(Math.random() * 6)],
    valor: [97, 67, 127, 67, 97, 47][Math.floor(Math.random() * 6)],
    status: ['novo', 'primeiro_contato', 'em_negociacao', 'aguardando_pagamento', 'em_execucao', 'concluido', 'perdido'][Math.floor(Math.random() * 7)] as any,
    origem: ['google', 'instagram', 'facebook', 'direto', 'google'][Math.floor(Math.random() * 5)],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 30)),
  }))
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'act_1', type: 'novo_lead', text: 'Novo lead captado: Maria Fernanda Santos (Abertura MEI)', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'act_2', type: 'pagamento', text: 'Pagamento confirmado: João Pedro Silva (R$ 67,00)', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: 'act_3', type: 'concluido', text: 'Serviço concluído: Bruno Carvalho (Encerramento MEI)', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  { id: 'act_4', type: 'alerta', text: 'Urgente: 3 leads sem resposta há mais de 2h', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
];

export const MOCK_FINANCE = {
  monthlyRevenue: [
    { month: 'Nov', revenue: 4500, pending: 800 },
    { month: 'Dez', revenue: 5200, pending: 1200 },
    { month: 'Jan', revenue: 4800, pending: 950 },
    { month: 'Fev', revenue: 6100, pending: 1500 },
    { month: 'Mar', revenue: 5900, pending: 1100 },
    { month: 'Abr', revenue: 7200, pending: 1800 },
  ],
  stats: {
    estimated: 9000,
    confirmed: 7200,
    pending: 1800,
    averageTicket: 85
  }
};

export const MOCK_FOLLOWUPS: FollowUp[] = [
  { id: 'f_1', date: '2026-04-11', time: '14:30', description: 'Ligar para Ricardo (Parcelamento)', status: 'pendente', createdAt: new Date() },
  { id: 'f_2', date: '2026-04-11', time: '16:00', description: 'Enviar contrato Maria Fernanda', status: 'pendente', createdAt: new Date() },
  { id: 'f_3', date: '2026-04-10', time: '10:00', description: 'Cobrar documentos Bruno', status: 'realizado', createdAt: new Date() },
];
