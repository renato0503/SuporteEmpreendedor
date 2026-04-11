import { $ } from '../../utils/dom';

export function renderAgendaPage(container: HTMLElement) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1400px] mx-auto animate-fade-in h-full flex flex-col">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Agenda de Assessoria</h1>
          <p class="text-slate-500 font-medium">Controle de prazos DASN e follow-ups de leads.</p>
        </div>
        <div class="flex items-center gap-3">
           <button class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
             Anterior
           </button>
           <button class="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Março 2026</button>
           <button class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
             Próximo
           </button>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-12 flex-grow overflow-hidden">
        <!-- Calendar Grid -->
        <div class="xl:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col h-full">
           <div class="grid grid-cols-7 gap-4 mb-8">
              ${days.map(d => `<div class="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">${d}</div> text-center`).join('')}
           </div>
           <div class="grid grid-cols-7 gap-4 flex-grow">
              ${dates.map(date => `
                <div class="aspect-square bg-slate-50/50 rounded-2xl border border-slate-100 p-3 hover:border-[#125133]/20 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden relative">
                   <span class="text-xs font-black text-slate-800">${date}</span>
                   ${date === 14 || date === 22 || date === 28 ? `
                     <div class="space-y-1 relative z-10 overflow-hidden">
                        <div class="h-1.5 w-full bg-[#F18825] rounded-full scale-x-125 -translate-x-1 shadow-sm"></div>
                        <div class="h-1.5 w-full bg-[#125133] rounded-full scale-x-125 -translate-x-1 shadow-sm"></div>
                     </div>
                   ` : ''}
                   ${date === 11 ? `<div class="absolute inset-0 bg-[#125133]/5 border-2 border-[#125133]/20 rounded-2xl"></div>` : ''}
                </div>
              `).join('')}
           </div>
        </div>

        <!-- Task List Sidebar -->
        <div class="space-y-8 h-full flex flex-col">
           <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex-grow flex flex-col overflow-hidden">
              <div class="flex items-center justify-between mb-8 srink-0">
                 <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest">Tarefas para Hoje</h3>
                 <span class="px-2.5 py-1 bg-[#F18825]/10 text-[#F18825] text-[10px] font-black rounded-lg">4 Pendentes</span>
              </div>
              
              <div class="space-y-4 overflow-y-auto pr-2 scrollbar-hide flex-grow">
                ${[
                  { title: 'Follow-up Lead: Airton Silva', time: '10:30', cat: 'CRM' },
                  { title: 'Enviar DASN: Maria Santos', time: '14:00', cat: 'Operação' },
                  { title: 'Cobrar Pagamento: Joana Lima', time: '16:15', cat: 'Financeiro' },
                  { title: 'Revisar Pendências MEI', time: '17:30', cat: 'Admin' }
                ].map(task => `
                  <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#F18825]/20 transition-all group flex items-start gap-4 cursor-pointer">
                     <div class="w-6 h-6 rounded-lg border-2 border-slate-200 bg-white group-hover:border-[#F18825] transition-colors shrink-0 flex items-center justify-center">
                        <div class="w-2.5 h-2.5 bg-[#F18825] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                     </div>
                     <div class="flex-grow">
                        <p class="text-xs font-black text-slate-800 leading-tight">${task.title}</p>
                        <div class="flex items-center gap-3 mt-2">
                           <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">${task.time}</span>
                           <span class="text-[9px] font-black text-[#125133] uppercase tracking-widest">${task.cat}</span>
                        </div>
                     </div>
                  </div>
                `).join('')}
              </div>
              
              <button class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] mt-8 hover:bg-black transition-all shrink-0 shadow-lg">+ Adicionar Tarefa</button>
           </div>
        </div>
      </div>
    </div>
  `;
}
