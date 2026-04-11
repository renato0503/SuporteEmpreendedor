import { $ } from '../../utils/dom';

export function renderConfigPage(container: HTMLElement) {
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
           <button class="w-full text-left px-6 py-4 rounded-2xl bg-[#125133] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#125133]/20 transition-all">Perfil da Empresa</button>
           <button class="w-full text-left px-6 py-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-all">Status & Pipeline</button>
           <button class="w-full text-left px-6 py-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-all">Taxas e Preços</button>
           <button class="w-full text-left px-6 py-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-all">Segurança & API</button>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-3 space-y-12">
           <!-- Company Profile Section -->
           <section class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden">
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
                    <input type="text" value="INOVA TECH CONSULTORIA SERVICOS E FINANCAS LTDA" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#125133] outline-none shadow-sm transition-all text-slate-800">
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                    <input type="text" value="46.965.600/0001-95" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#125133] outline-none shadow-sm transition-all text-slate-800">
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Principal de Contato</label>
                    <input type="email" value="contato@inovatech.com" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#125133] outline-none shadow-sm transition-all text-slate-800">
                 </div>
                 <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                    <input type="text" value="+55 (11) 98765-4321" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#125133] outline-none shadow-sm transition-all text-slate-800">
                 </div>
              </div>

              <div class="pt-8 border-t border-slate-50 flex items-center justify-end gap-3 z-10 relative">
                 <button class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform flex items-center gap-3">
                    Salvar Perfil Institucional
                 </button>
              </div>
           </section>

           <!-- Danger Zone: Backups & Reset -->
           <section class="bg-red-50/30 p-10 rounded-[2.5rem] border border-red-100/50 space-y-8">
              <div class="flex items-center gap-4">
                 <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <div>
                    <h3 class="text-xl font-black text-red-900 tracking-tight">Zona de Risco</h3>
                    <p class="text-xs text-red-500 font-medium">Ações irreversíveis sobre a base de dados do CRM.</p>
                 </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                 <button id="btn-backup" class="px-8 py-5 bg-white border border-red-200 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex-grow shadow-sm">
                    Exportar Backup Global (JSON)
                 </button>
                 <button class="px-8 py-5 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all flex-grow shadow-lg shadow-red-600/20">
                    Limpar Logs de Atividade
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  `;

  // Logic: Simple Backup Alert
  $('#btn-backup')?.addEventListener('click', () => {
    alert('Preparando arquivo comprimido do banco de dados... O download iniciará em breve.');
  });
}
