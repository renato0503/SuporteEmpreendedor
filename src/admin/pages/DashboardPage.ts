import { leadService } from '../services/leadService';
import { renderKPICard } from '../components/KPICard';
import { exportToCSV } from '../../utils/exportUtils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { $ } from '../../utils/dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

interface Lead {
  id: string;
  nome?: string;
  telefone?: string;
  email?: string;
  servico?: string;
  status?: string;
  valor?: number;
  createdAt?: any;
}

export async function renderDashboardPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#125133]/20 border-t-[#125133] shadow-xl"></div>
        <p class="text-[#125133] font-black uppercase tracking-[0.3em] text-xs">Sincronizando Ecossistema...</p>
      </div>
    </div>
  `;

  const [kpis, activities, recentLeads] = await Promise.all([
    leadService.getDashboardKPIs(),
    leadService.getActivities(5),
    (async () => {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
    })()
  ]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const statusColors: Record<string, { bg: string, text: string }> = {
    novo: { bg: 'bg-blue-100', text: 'text-blue-700' },
    primeiro_contato: { bg: 'bg-purple-100', text: 'text-purple-700' },
    em_negociacao: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    aguardando_pagamento: { bg: 'bg-orange-100', text: 'text-orange-700' },
    pago: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    concluido: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    perdido: { bg: 'bg-red-100', text: 'text-red-700' }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      novo: 'Novo',
      primeiro_contato: '1º Contato',
      em_negociacao: 'Negociação',
      aguardando_pagamento: 'Aguardando',
      pago: 'Pago',
      concluido: 'Concluído',
      perdido: 'Perdido'
    };
    return labels[status] || status;
  };

  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="space-y-2">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p class="text-sm text-slate-500 font-medium">Visão geral da sua assessoria empreendedora</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-download-report" class="px-5 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Exportar
          </button>
        </div>
      </div>

      <!-- KPI Grid - 6 cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        ${renderKPICard({
          label: 'Total Leads',
          value: kpis.totalLeads,
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
          color: 'emerald',
          subtitle: 'Acumulado'
        })}
        
        ${renderKPICard({
          label: 'Novos Hoje',
          value: kpis.novosHoje,
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          color: 'orange',
          subtitle: 'Últimas 24h'
        })}

        ${renderKPICard({
          label: 'Atendimento',
          value: kpis.emAtendimento,
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>',
          color: 'blue',
          subtitle: 'Em Pipeline'
        })}

        ${renderKPICard({
          label: 'Faturamento',
          value: formatCurrency(kpis.faturamentoConfirmado),
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
          color: 'emerald',
          subtitle: 'Confirmado'
        })}

        ${renderKPICard({
          label: 'Pendente',
          value: formatCurrency(kpis.valorPendente),
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
          color: 'orange',
          subtitle: 'A Receber'
        })}

        ${renderKPICard({
          label: 'Ticket Médio',
          value: formatCurrency(kpis.ticketMedio),
          icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
          color: 'purple',
          subtitle: 'Média por Lead'
        })}
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Recent Leads -->
        <div class="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-black text-slate-900">Leads Recentes</h3>
              <p class="text-xs text-slate-400 font-medium mt-1">Últimos cadastros no sistema</p>
            </div>
            <button id="btn-view-all-leads" class="text-xs font-black text-[#125133] uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          
          <div class="divide-y divide-slate-100">
            ${recentLeads.length > 0 ? recentLeads.map(lead => {
              const colors = statusColors[lead.status] || statusColors.novo;
              return `
                <div class="p-6 hover:bg-slate-50 transition-all cursor-pointer group" data-lead-id="${lead.id}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#125133] to-[#1a6b45] flex items-center justify-center text-white font-black text-sm shadow-lg">
                        ${lead.nome?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'LE'}
                      </div>
                      <div>
                        <p class="text-sm font-black text-slate-900">${lead.nome || 'Sem nome'}</p>
                        <p class="text-xs text-slate-500 mt-0.5">${lead.servico || 'Serviço não especificado'}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${colors.bg} ${colors.text}">${getStatusLabel(lead.status)}</span>
                      <div class="text-right">
                        <p class="text-sm font-black text-slate-900">${lead.valor ? formatCurrency(lead.valor) : '-'}</p>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">${lead.createdAt?.toDate ? formatDistanceToNow(lead.createdAt.toDate(), { addSuffix: true, locale: ptBR }) : 'Agora'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="p-12 text-center">
                <svg class="w-12 h-12 mx-auto text-slate-200" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <p class="text-slate-400 text-sm font-medium mt-4">Nenhum lead encontrado</p>
              </div>
            `}
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col" style="max-height: 600px;">
          <div class="p-6 border-b border-slate-100">
            <h3 class="text-lg font-black text-slate-900">Atividades Recentes</h3>
            <p class="text-xs text-slate-400 font-medium mt-1">Últimas ações no sistema</p>
          </div>
          
          <div class="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            ${activities.length > 0 ? activities.map(item => `
              <div class="flex gap-4 group cursor-default animate-fade-in">
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-2xl ${item.type === 'novo_lead' ? 'bg-[#125133]/10 text-[#125133]' : item.type === 'pagamento' ? 'bg-[#F18825]/10 text-[#F18825]' : 'bg-blue-500/10 text-blue-500'} flex items-center justify-center shrink-0 border border-current/10 shadow-sm">
                    ${item.type === 'novo_lead' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>' : 
                      item.type === 'pagamento' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : 
                      '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>'}
                  </div>
                  <div class="w-0.5 h-full bg-slate-100 group-last:hidden rounded-full mt-2"></div>
                </div>
                <div class="flex-1 pb-6">
                  <p class="text-xs font-bold text-slate-800 leading-relaxed">${item.text}</p>
                  <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 block">${item.timestamp?.toDate ? formatDistanceToNow(item.timestamp.toDate(), { addSuffix: true, locale: ptBR }) : 'Agora'}</span>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-8">
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Nenhuma atividade</p>
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- Quick Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Conversion Rate -->
        <div class="bg-gradient-to-br from-[#125133] to-[#1a6b45] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div class="relative z-10">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-[#F18825]">Taxa de Conversão</span>
            <div class="flex items-baseline gap-2 mt-4">
              <span class="text-5xl font-black">${kpis.taxaConversao}%</span>
              <span class="text-sm text-white/60">dos leads viram receita</span>
            </div>
            <div class="mt-6 flex items-center gap-2">
              <div class="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div class="h-full bg-[#F18825] rounded-full" style="width: ${kpis.taxaConversao}%"></div>
              </div>
              <span class="text-xs font-bold text-white/80">${kpis.taxaConversao}% convertido</span>
            </div>
          </div>
        </div>

        <!-- Services Distribution -->
        <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8">
          <h3 class="text-lg font-black text-slate-900 mb-6">Serviços mais demandados</h3>
          <div class="space-y-4">
            ${[
              { name: 'Abertura de MEI', percent: 35 },
              { name: 'Declaração Anual (DASN)', percent: 28 },
              { name: 'Parcelamento de Débitos', percent: 20 },
              { name: 'Alteração Cadastral', percent: 12 },
              { name: 'Outros', percent: 5 }
            ].map(s => `
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="flex justify-between mb-1">
                    <span class="text-xs font-bold text-slate-700">${s.name}</span>
                    <span class="text-xs font-black text-slate-500">${s.percent}%</span>
                  </div>
                  <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-[#125133] rounded-full" style="width: ${s.percent}%"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Events
  $('#btn-download-report')?.addEventListener('click', () => {
    const headers = ['Métrica', 'Valor'];
    const data = [
      ['Total de Leads', kpis.totalLeads],
      ['Novos Hoje', kpis.novosHoje],
      ['Em Atendimento', kpis.emAtendimento],
      ['Valor Pendente', kpis.valorPendente],
      ['Faturamento Confirmado', kpis.faturamentoConfirmado]
    ];
    exportToCSV('Relatorio_Dashboard', headers, data);
  });

  $('#btn-view-all-leads')?.addEventListener('click', () => {
    window.location.hash = '#/leads';
  });

  document.querySelectorAll('[data-lead-id]').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-lead-id');
      if (id) window.location.hash = `#/leads?id=${id}`;
    });
  });
}