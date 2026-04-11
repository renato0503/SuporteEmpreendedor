import { leadService } from '../services/leadService';
import { renderKPICard } from '../components/KPICard';
import { MOCK_ACTIVITY, MOCK_FINANCE } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function renderDashboardPage(container: HTMLElement) {
  // 1. Initial Loading State
  container.innerHTML = `
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-6">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#125133]/20 border-t-[#125133] shadow-xl"></div>
        <p class="text-[#125133] font-black uppercase tracking-[0.3em] text-xs">Sincronizando Ecossistema...</p>
      </div>
    </div>
  `;

  // 2. Fetch Real Data
  const kpis = await leadService.getDashboardKPIs();

  // 3. Render Main Content
  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto animate-fade-in">
      <!-- Welcome Section -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="space-y-2">
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">Overview Estratégico</h1>
          <p class="text-slate-500 font-medium">Bem-vindo de volta. Aqui está o desempenho da sua assessoria hoje.</p>
        </div>
        <div class="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
           <button class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Baixar Relatório Mensal</button>
           <button class="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"></path></svg>
           </button>
        </div>
      </div>

      <!-- KPI Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        ${renderKPICard({
          label: 'Total de Leads',
          value: kpis.totalLeads,
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
          color: 'emerald',
          trend: { value: 12, isUp: true },
          subtitle: 'Histórico Total'
        })}
        
        ${renderKPICard({
          label: 'Novos Hoje',
          value: kpis.novosHoje,
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
          color: 'orange',
          trend: { value: 24, isUp: true },
          subtitle: 'Últimas 24h'
        })}

        ${renderKPICard({
          label: 'Em Atendimento',
          value: kpis.emAtendimento,
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>',
          color: 'blue',
          subtitle: 'Fila Ativa'
        })}

        ${renderKPICard({
          label: 'Valor Pendente',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpis.valorPendente),
          icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
          color: 'red',
          subtitle: 'Aguardando Pagto'
        })}
      </div>

      <!-- Charts & Activity Feed -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Revenue Chart -->
        <div class="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden h-[500px]">
          <div class="flex items-center justify-between mb-10">
            <div>
              <h3 class="text-xl font-black text-slate-900 tracking-tight">Evolução Financeira</h3>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Faturamento Bruto vs Pendente</p>
            </div>
            <div class="flex gap-2">
               <div class="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                 <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span class="text-[9px] font-black text-emerald-700 uppercase">Recebido</span>
               </div>
               <div class="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                 <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span class="text-[9px] font-black text-slate-500 uppercase">Pendente</span>
               </div>
            </div>
          </div>
          
          <div class="flex items-end justify-between h-[300px] px-4 gap-4">
            ${MOCK_FINANCE.monthlyRevenue.map(data => `
              <div class="flex-grow flex flex-col items-center group relative h-full justify-end">
                <div class="w-full flex gap-1 justify-center items-end h-full">
                  <div class="w-8 md:w-12 bg-slate-100 rounded-t-xl group-hover:bg-slate-200 transition-all duration-300 relative border-x border-t border-slate-200/50" style="height: ${(data.pending / 8000) * 100}%"></div>
                  <div class="w-8 md:w-16 bg-gradient-to-t from-[#125133] to-[#1a6b45] rounded-t-xl group-hover:scale-y-105 transition-all duration-500 shadow-lg shadow-[#125133]/10 relative" style="height: ${(data.revenue / 8000) * 100}%">
                     <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap shadow-xl z-10 pointer-events-none">
                       R$ ${data.revenue.toLocaleString('pt-BR')}
                     </div>
                  </div>
                </div>
                <span class="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">${data.month}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
          <div class="mb-8 p-1 bg-slate-50 rounded-2xl flex">
            <button class="flex-grow py-3 bg-white shadow-md rounded-xl text-xs font-black text-slate-900 uppercase tracking-widest transition-all">Atividades</button>
            <button class="flex-grow py-3 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-all">Alertas</button>
          </div>
          
          <div class="space-y-6 flex-grow overflow-y-auto pr-2 scrollbar-thin">
            ${MOCK_ACTIVITY.map(item => `
              <div class="flex gap-5 group cursor-default">
                <div class="flex flex-col items-center gap-2">
                  <div class="w-10 h-10 rounded-2xl ${item.type === 'novo_lead' ? 'bg-[#125133]/10 text-[#125133]' : item.type === 'pagamento' ? 'bg-[#F18825]/10 text-[#F18825]' : 'bg-blue-500/10 text-blue-500'} flex items-center justify-center shrink-0 border border-current/10 shadow-sm group-hover:scale-110 transition-transform">
                    ${item.type === 'novo_lead' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>' : 
                      item.type === 'pagamento' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : 
                      '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>'}
                  </div>
                  <div class="w-0.5 h-full bg-slate-100 group-last:hidden rounded-full"></div>
                </div>
                <div class="pb-6">
                  <p class="text-xs font-extrabold text-slate-800 leading-relaxed">${item.text}</p>
                  <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 block">${formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: ptBR })}</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          <button class="mt-6 w-full py-4 bg-slate-50 text-[10px] font-black text-slate-500 hover:text-[#125133] hover:bg-[#125133]/5 rounded-2xl transition-all uppercase tracking-[0.2em] border border-slate-100">Ver Histórico Completo</button>
        </div>
      </div>
    </div>
  `;
}
