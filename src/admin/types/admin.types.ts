import { Timestamp } from 'firebase/firestore';

export type LeadStatus = 'novo' | 'primeiro_contato' | 'em_negociacao' | 'aguardando_pagamento' | 'em_execucao' | 'concluido' | 'perdido';

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  valor: number;
  status: LeadStatus;
  cpf?: string;
  cnpj?: string;
  mensagem?: string;
  origem?: string;
  createdAt: any; // Can be Timestamp or Date
  updatedAt?: any;
  notes?: LeadNote[];
  followups?: FollowUp[];
}

export interface LeadNote {
  id: string;
  text: string;
  author: string;
  createdAt: any;
  important: boolean;
}

export interface FollowUp {
  id: string;
  date: string;
  time: string;
  description: string;
  status: 'pendente' | 'realizado' | 'atrasado';
  createdAt: any;
}

export interface DashboardStats {
  totalLeads: number;
  novosHoje: number;
  emAtendimento: number;
  aguardandoPagto: number;
  valorPendente: number;
  concluidosMes: number;
  taxaConversao: number;
}

export interface ActivityItem {
  id: string;
  type: 'novo_lead' | 'pagamento' | 'concluido' | 'alerta';
  text: string;
  timestamp: any;
  leadId?: string;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'editor';
}

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: string;
  status: 'pendente' | 'concluido';
  createdAt: any;
  clientEmail?: string;
  clientName?: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  category: string;
  text: string;
  usageCount: number;
  lastUsed?: any;
}

export interface SystemSettings {
  companyName: string;
  cnpj: string;
  email: string;
  whatsapp: string;
  feeAbertura: string;
  feeDasn: string;
  feeParcelamento: string;
  feeAlteracao: string;
  feeBaixa: string;
  feeConsulta: string;
  pipelineStages: string[];
}
