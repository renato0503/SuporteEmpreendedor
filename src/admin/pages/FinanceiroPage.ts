import { leadService } from '../services/leadService';
import { MOCK_FINANCE, MOCK_LEADS } from '../data/mockData';
import { renderKPICard } from '../components/KPICard';
import { $ } from '../../utils/dom';

export async function renderFinanceiroPage(container: HTMLElement) {
  // 1. Fetch Data
  const kpis = await leadService.getDashboardKPIs();
  
  // 2. Initial Layout
  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Gestão Financeira</h1>
          <p class="text-slate-500 font-medium">Controle de faturamento, precificação e fluxo de caixa.</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Imprimir DRE
          </button>
          <button class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Nova Transação</button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${renderKPICard({
          label: 'Faturamento Bruto',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(MOCK_FINANCE.stats.confirmed),
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
          color: 'emerald',
          trend: { value: 8, isUp: true },
          subtitle: 'Mês Atual'
        })}
        
        ${renderKPICard({
          label: 'Valor a Receber',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpis.valorPendente),
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.234 3.468.657m-9.62 9.042a10.033 10.033 0 004.582 9.717m.445-3.076a10.035 10.035 0 01-4.042-4.103m6.273 5.466l-.04.09m1.473-8.69V4c0-.817-.168-1.595-.472-2.304M4.144 6.058a9.941 9.941 0 00-2.139 2.14m12.33 2.33a4 4 0 00-5.855 4.384m9.366 1.746a3.5 3.5 0 11-5.657-3.935"></path></svg>',
          color: 'orange',
          subtitle: 'Leads em andamento'
        })}

        ${renderKPICard({
          label: 'Ticket Médio',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(MOCK_FINANCE.stats.averageTicket),
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
          color: 'blue',
          subtitle: 'Por serviço concluído'
        })}

        ${renderKPICard({
          label: 'Projeção 30 dias',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(MOCK_FINANCE.stats.estimated),
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
          color: 'purple',
          trend: { value: 15, isUp: true },
          subtitle: 'Pipeline Ativo'
        })}
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- Monthly Revenue Bar Chart -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl h-[500px] flex flex-col">
          <h3 class="text-xl font-black text-slate-900 tracking-tight mb-8">Fluxo de Caixa Mensal</h3>
          <div class="flex-grow flex items-end justify-between gap-4 px-4 pb-8 h-[300px]">
            ${MOCK_FINANCE.monthlyRevenue.map(data => `
              <div class="flex-grow flex flex-col items-center group h-full justify-end relative">
                <div class="w-full flex flex-col items-center justify-end h-full relative">
                  <!-- Pending portion -->
                  <div class="w-full max-w-[40px] bg-slate-100 border-x border-t border-slate-200 rounded-t-lg transition-all" style="height: ${(data.pending / 8000) * 100}%"></div>
                  <!-- Confirmed portion -->
                  <div class="w-full max-w-[60px] bg-gradient-to-t from-[#125133] to-[#1a6b45] rounded-t-xl group-hover:scale-y-105 transition-all duration-500 shadow-lg shadow-[#125133]/10" style="height: ${(data.revenue / 8000) * 100}%"></div>
                  
                  <!-- Tooltip -->
                  <div class="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black py-2 px-3 rounded-xl z-10 pointer-events-none shadow-2xl">
                    R$ ${data.revenue.toLocaleString('pt-BR')}
                  </div>
                </div>
                <span class="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">${data.month}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Price Management Table -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[500px]">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-black text-slate-900 tracking-tight">Tabela de Preços</h3>
            <button class="text-xs font-black text-[#125133] uppercase tracking-widest hover:underline">Editar Valores</button>
          </div>
          
          <div class="space-y-4 overflow-y-auto pr-2 scrollbar-thin">
            ${[
              { name: 'Abertura de MEI', price: 97, cost: 0, margin: '100%', status: 'active' },
              { name: 'Declaração DASN', price: 67, cost: 0, margin: '100%', status: 'active' },
              { name: 'Parcelamento', price: 127, cost: 0, margin: '100%', status: 'active' },
              { name: 'Alteração Cadastral', price: 67, cost: 0, margin: '100%', status: 'active' },
              { name: 'Baixa de MEI', price: 97, cost: 0, margin: '100%', status: 'active' },
              { name: 'Regularização CPF', price: 47, cost: 0, margin: '100%', status: 'active' },
            ].map(item => `
              <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#125133]/20 transition-all">
                <div class="flex flex-col">
                  <span class="text-xs font-black text-slate-800">${item.name}</span>
                  <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Margem: ${item.margin}</span>
                </div>
                <div class="flex items-center gap-6">
                   <span class="text-sm font-black text-slate-900">R$ ${item.price.toFixed(2)}</span>
                   <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                   </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Recent Transactions Table -->
      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
        <div class="p-8 border-b border-slate-100">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Histórico de Recebimentos</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th class="px-8 py-6">Data</th>
                <th class="px-8 py-6">Lead</th>
                <th class="px-8 py-6">Serviço</th>
                <th class="px-8 py-6">Forma</th>
                <th class="px-8 py-6">Valor Liq.</th>
                <th class="px-8 py-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              ${MOCK_LEADS.filter(l => l.status === 'concluido' || l.status === 'aguardando_pagamento').slice(0, 5).map(l => `
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-8 py-6 text-xs font-extrabold text-slate-900">${l.createdAt?.toLocaleDateString ? l.createdAt.toLocaleDateString() : 'Hoje'}</td>
                  <td class="px-8 py-6 text-sm font-black text-slate-800">${l.nome}</td>
                  <td class="px-8 py-6 text-xs text-slate-500 font-bold uppercase tracking-tight">${l.servico}</td>
                  <td class="px-8 py-6">
                    <span class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                       PIX
                    </span>
                  </td>
                  <td class="px-8 py-6 text-sm font-black text-[#125133]">R$ ${(l.valor || 0).toFixed(2)}</td>
                  <td class="px-8 py-6 text-right">
                    <span class="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${l.status === 'concluido' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                       ${l.status === 'concluido' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
