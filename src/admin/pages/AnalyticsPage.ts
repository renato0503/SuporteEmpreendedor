import { leadService } from '../services/leadService';
import { $ } from '../../utils/dom';

export async function renderAnalyticsPage(container: HTMLElement) {
  // 1. Fetch Data
  const kpis = await leadService.getDashboardKPIs();
  
  // 2. Build Layout
  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto animate-fade-in pb-20">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Analytics & Business Intelligence</h1>
          <p class="text-slate-500 font-medium font-inter">Insights detalhados sobre o desempenho da sua assessoria.</p>
        </div>
        <div class="flex items-center gap-3">
           <select class="px-4 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm outline-none cursor-pointer">
              <option>Tempo Real (Live)</option>
              <option>Últimos 30 dias</option>
           </select>
        </div>
      </div>

      <!-- Main Analytics Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Conversion Funnel -->
        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-[600px]">
          <h3 class="text-xl font-black text-slate-900 tracking-tight mb-12">Funil de Atendimento</h3>
          
          <div class="flex-grow flex flex-col items-center justify-center space-y-2">
            ${[
              { label: 'Total de Leads', value: kpis.totalLeads, color: 'bg-slate-900', width: 'w-full' },
              { label: 'Em Atendimento', value: kpis.emAtendimento, color: 'bg-[#125133]', width: 'w-[80%]' },
              { label: 'Aguardando Pagamento', value: kpis.aguardandoPagto, color: 'bg-[#1a6b45]', width: 'w-[60%]' },
              { label: 'Vendas Concluídas', value: kpis.concluidosMes, color: 'bg-[#F18825]', width: 'w-[40%]' }
            ].map((stage, idx, arr) => `
              <div class="flex flex-col items-center w-full">
                <div class="${stage.color} ${stage.width} p-6 rounded-2xl flex items-center justify-between shadow-xl">
                  <span class="text-[10px] font-black text-white uppercase tracking-widest opacity-80">${stage.label}</span>
                  <span class="text-2xl font-black text-white">${stage.value}</span>
                </div>
                ${idx < arr.length - 1 ? `
                  <div class="w-1 h-6 bg-slate-100 flex items-center justify-center">
                     <span class="text-[8px] font-black text-slate-300 translate-x-12">${stage.value > 0 ? Math.round((arr[idx+1].value / stage.value) * 100) : 0}%</span>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Acquisition Channels (Visual Placeholders with Real Data) -->
        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-[600px]">
           <h3 class="text-xl font-black text-slate-900 tracking-tight mb-12">Distribuição de Serviços</h3>
           
           <div class="flex-grow flex flex-col items-center justify-center">
              <div class="w-64 h-64 rounded-full border-[20px] border-slate-50 relative flex items-center justify-center overflow-hidden">
                 <div class="text-center z-10">
                    <span class="text-4xl font-black text-slate-900">${kpis.totalLeads}</span>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Interessados</p>
                 </div>
                 <div class="absolute inset-0 bg-[#125133] opacity-10"></div>
              </div>

              <div class="grid grid-cols-1 gap-6 mt-16 w-full max-w-sm">
                 <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded-full bg-[#125133]"></div>
                      <span class="text-xs font-black text-slate-800">Abertura de MEI</span>
                    </div>
                    <span class="text-xs font-black text-slate-900 font-inter">${kpis.statsPorServico.abertura}</span>
                 </div>
                 <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded-full bg-[#F18825]"></div>
                      <span class="text-xs font-black text-slate-800">DASN</span>
                    </div>
                    <span class="text-xs font-black text-slate-900 font-inter">${kpis.statsPorServico.dasn}</span>
                 </div>
                 <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div class="flex items-center gap-3">
                      <div class="w-3 h-3 rounded-full bg-slate-300"></div>
                      <span class="text-xs font-black text-slate-800">Outros Serviços</span>
                    </div>
                    <span class="text-xs font-black text-slate-900 font-inter">${kpis.statsPorServico.outros}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Conversion by Service -->
      <div class="bg-slate-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-[#125133]/20 rounded-full blur-3xl"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
           <div class="text-center md:text-left">
              <h3 class="text-4xl font-black text-white tracking-tighter">Taxa de Conversão: ${kpis.taxaConversao}%</h3>
              <p class="text-slate-400 font-medium mt-4 max-w-md">Sua performance comercial está acima da média do setor de consultoria MEI.</p>
           </div>
           <div class="flex items-center gap-6">
              <div class="w-24 h-24 rounded-full border-4 border-emerald-500/30 flex items-center justify-center">
                 <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  `;
}
