import { leadService } from '../services/leadService';
import { MOCK_LEADS } from '../data/mockData';
import { $ } from '../../utils/dom';

export async function renderAnalyticsPage(container: HTMLElement) {
  // 1. Fetch Data
  const leads = await leadService.getDashboardKPIs();
  
  // 2. Build Layout
  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1600px] mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Analytics & Business Intelligence</h1>
          <p class="text-slate-500 font-medium font-inter">Insights detalhados sobre o desempenho da sua assessoria.</p>
        </div>
        <div class="flex items-center gap-3">
           <select class="px-4 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm outline-none cursor-pointer">
             <option>Últimos 30 dias</option>
             <option>Últimos 90 dias</option>
             <option>Este Ano</option>
           </select>
        </div>
      </div>

      <!-- Main Analytics Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Conversion Funnel -->
        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-[600px]">
          <h3 class="text-xl font-black text-slate-900 tracking-tight mb-12">Funil de Conversão Comercial</h3>
          
          <div class="flex-grow flex flex-col items-center justify-center space-y-2">
            <!-- Funnel Stages (CSS Built) -->
            ${[
              { label: 'Leads Captados', value: leads.totalLeads, color: 'bg-slate-900', width: 'w-full' },
              { label: 'Em Atendimento', value: leads.leadsEmAtendimento, color: 'bg-[#125133]', width: 'w-[80%]' },
              { label: 'Propostas Enviadas', value: Math.floor(leads.leadsEmAtendimento * 0.7), color: 'bg-[#1a6b45]', width: 'w-[60%]' },
              { label: 'Fechamentos (Vendas)', value: leads.totalLeadsConcluidos, color: 'bg-[#F18825]', width: 'w-[40%]' }
            ].map((stage, idx, arr) => `
              <div class="flex flex-col items-center w-full">
                <div class="${stage.color} ${stage.width} p-6 rounded-2xl flex items-center justify-between group hover:scale-[1.02] transition-transform shadow-xl relative z-10">
                  <span class="text-[10px] font-black text-white uppercase tracking-widest opacity-80">${stage.label}</span>
                  <span class="text-2xl font-black text-white">${stage.value}</span>
                </div>
                ${idx < arr.length - 1 ? `
                  <div class="w-1 h-8 bg-slate-100 relative group-hover:bg-[#F18825]/20 transition-colors">
                     <div class="absolute -left-12 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                       ${Math.round((arr[idx+1].value / stage.value) * 100)}% Conv.
                     </div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Acquisition Channels (Pie/Donut Chart) -->
        <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-[600px]">
           <h3 class="text-xl font-black text-slate-900 tracking-tight mb-12">Canais de Aquisição</h3>
           
           <div class="flex-grow flex flex-col items-center justify-center">
              <div class="w-64 h-64 rounded-full border-[15px] border-slate-50 relative flex items-center justify-center">
                 <div class="text-center">
                   <span class="text-4xl font-black text-slate-900">${leads.totalLeads}</span>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Leads Totais</p>
                 </div>
                 
                 <!-- SVG Overlay for Donut Segments (Simplified) -->
                 <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#125133" stroke-width="15" stroke-dasharray="263.8" stroke-dashoffset="66" class="transition-all duration-1000" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#F18825" stroke-width="15" stroke-dasharray="263.8" stroke-dashoffset="200" class="transition-all duration-1000" />
                 </svg>
              </div>

              <div class="grid grid-cols-2 gap-8 mt-16 w-full max-w-sm">
                 <div class="flex items-center gap-3">
                   <div class="w-3 h-3 rounded-full bg-[#125133]"></div>
                   <div class="flex flex-col text-left">
                     <span class="text-xs font-black text-slate-900">Google Ads</span>
                     <span class="text-[10px] text-slate-400 font-bold">75% dos leads</span>
                   </div>
                 </div>
                 <div class="flex items-center gap-3">
                   <div class="w-3 h-3 rounded-full bg-[#F18825]"></div>
                   <div class="flex flex-col text-left">
                     <span class="text-xs font-black text-slate-900">Instagram</span>
                     <span class="text-[10px] text-slate-400 font-bold">20% dos leads</span>
                   </div>
                 </div>
                 <div class="flex items-center gap-3">
                   <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                   <div class="flex flex-col text-left">
                     <span class="text-xs font-black text-slate-900">Orgânico</span>
                     <span class="text-[10px] text-slate-400 font-bold">5% dos leads</span>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Segmentation Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        <!-- Service Popularity -->
        <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg col-span-2">
          <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">Popularidade por Serviço</h4>
          <div class="space-y-6">
            ${[
              { name: 'Declaração DASN', count: 142, perc: 45 },
              { name: 'Abertura de MEI', count: 98, perc: 30 },
              { name: 'Parcelamento', count: 52, perc: 18 },
              { name: 'Regularização', count: 21, perc: 7 }
            ].map(svc => `
              <div class="space-y-2">
                <div class="flex justify-between items-center text-xs font-black uppercase tracking-tight">
                  <span class="text-slate-700">${svc.name}</span>
                  <span class="text-slate-400">${svc.perc}% (${svc.count})</span>
                </div>
                <div class="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <div class="h-full bg-slate-900 rounded-full transition-all duration-1000" style="width: ${svc.perc}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Conversion by Service -->
        <div class="bg-slate-900 p-8 rounded-[2rem] shadow-2xl overflow-hidden relative group">
          <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#F18825]/10 rounded-full blur-3xl group-hover:bg-[#F18825]/20 transition-all duration-700"></div>
          <h4 class="text-sm font-black text-white uppercase tracking-widest mb-10 relative z-10">Meta de Fechamento</h4>
          <div class="flex flex-col items-center justify-center py-4 relative z-10">
            <div class="text-6xl font-black text-white tracking-tighter">82%</div>
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4 text-center leading-relaxed">Você está 12% acima da meta<br>estipulada para este trimestre.</p>
            <div class="mt-8 px-6 py-3 bg-[#F18825] text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-110 transition-transform cursor-pointer">
               Otimizar Campanha
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
