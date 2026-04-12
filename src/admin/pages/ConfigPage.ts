import { $ } from '../../utils/dom';

export function renderConfigPage(container: HTMLElement) {
  let activeTab = 'perfil';

  function render() {
    container.innerHTML = `
      <div class="p-8 lg:p-12 space-y-12 max-w-[1200px] mx-auto animate-fade-in pb-20">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Configurações do Sistema</h1>
            <p class="text-slate-500 font-medium">Personalize sua plataforma e gerencie dados sensíveis.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Sidebar Navigation -->
          <div class="lg:col-span-1 space-y-2">
             <button data-tab="perfil" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'perfil' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Perfil da Empresa</button>
             <button data-tab="status" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'status' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Status & Pipeline</button>
             <button data-tab="taxas" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'taxas' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Taxas e Preços</button>
             <button data-tab="seguranca" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'seguranca' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-400 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Segurança & API</button>
          </div>

          <!-- Settings Content Area -->
          <div class="lg:col-span-3 space-y-12" id="config-content">
             ${renderActiveTab()}
          </div>
        </div>
      </div>
    `;

    // Attach local events
    container.querySelectorAll('.config-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).getAttribute('data-tab');
        if (tab) {
          activeTab = tab;
          render();
        }
      });
    });

    $('#btn-backup')?.addEventListener('click', () => {
      alert('Preparando arquivo comprimido do banco de dados... O download iniciará em breve.');
    });
  }

  function renderActiveTab() {
    if (activeTab === 'perfil') {
      return `
        <section class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden animate-fade-in">
           <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#125133]/5 rounded-full blur-3xl"></div>
           <div class="flex items-center gap-8 relative z-10">
              <div class="w-32 h-32 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-[#125133] hover:text-[#125133] cursor-pointer transition-all group">
                 <svg class="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 <span class="text-[9px] font-black uppercase tracking-widest mt-2">Mudar Logo</span>
              </div>
              <div class="space-y-1">
                 <h3 class="text-xl font-black text-slate-900 tracking-tight">Identidade Visual</h3>
                 <p class="text-xs text-slate-400 font-inter">Aparece em orçamentos, emails e no topo do admin.</p>
              </div>
           </div>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social</label>
                 <input type="text" value="INOVA TECH CONSULTORIA" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                 <input type="text" value="46.965.600/0001-95" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              </div>
           </div>
           <button class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Salvar Perfil</button>
        </section>
        
        <section class="bg-red-50/30 p-10 rounded-[2.5rem] border border-red-100/50 space-y-8 animate-fade-in">
           <h3 class="text-xl font-black text-red-900">Zona de Risco</h3>
           <div class="flex flex-col sm:flex-row gap-4">
              <button id="btn-backup" class="px-8 py-5 bg-white border border-red-200 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex-grow shadow-sm">Exportar Backup Global</button>
           </div>
        </section>
      `;
    } else if (activeTab === 'status') {
       return `
         <section class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 animate-fade-in">
            <h3 class="text-xl font-black text-slate-900 tracking-tight">Pipeline de Vendas</h3>
            <p class="text-xs text-slate-400">Configure as etapas do Kanban e automações associadas.</p>
            <div class="space-y-4">
               ${['Novo Lead', 'Atendimento', 'Análise', 'Concluído'].map(s => `
                 <div class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#125133]/20 transition-all group">
                    <span class="text-xs font-bold text-slate-700">${s}</span>
                    <button class="text-[9px] font-black text-slate-400 uppercase hover:text-red-500">Excluir Etapa</button>
                 </div>
               `).join('')}
               <button class="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase hover:border-[#125133] hover:text-[#125133] transition-all">+ Adicionar Nova Etapa</button>
            </div>
         </section>
       `;
    } else if (activeTab === 'taxas') {
       return `
         <section class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 animate-fade-in">
            <h3 class="text-xl font-black text-slate-900 tracking-tight">Tabela de Honorários</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="p-6 bg-slate-50 rounded-2xl space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Abertura MEI</label>
                  <input type="text" value="R$ 145,00" class="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold">
               </div>
               <div class="p-6 bg-slate-50 rounded-2xl space-y-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Declaração DASN</label>
                  <input type="text" value="R$ 67,00" class="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold">
               </div>
            </div>
            <button class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Sincronizar Tabela</button>
         </section>
       `;
    } else {
       return `
         <section class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 animate-fade-in">
            <h3 class="text-xl font-black text-slate-900 tracking-tight">Segurança & Integrações</h3>
            <div class="space-y-6">
               <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Firebase Config (Client Side)</p>
                  <div class="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto">
                     apiKey: "AIzaSy...789", authDomain: "suporte-empreendedor.firebaseapp.com"
                  </div>
               </div>
               <button class="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Regerar chaves de API</button>
            </div>
         </section>
       `;
    }
  }

  render();
}
