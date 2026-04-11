import { auth } from '../../firebase';

export function renderTopBar(title: string) {
  const user = auth.currentUser;
  const initials = user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 'AS';

  return `
    <header class="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm transition-all duration-300">
      <div class="flex flex-col">
        <h2 id="page-title" class="text-slate-900 font-extrabold text-2xl tracking-tight">${title}</h2>
        <p class="text-[10px] text-[#1a6b45] uppercase font-black tracking-widest mt-1 flex items-center gap-1.5">
          <svg class="w-3 h-3 text-[#22c55e]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.07m7.072 0a5 5 0 010 7.072M13 12a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          Sincronizado com Firebase Cloud
        </p>
      </div>
      
      <div class="flex items-center gap-8">
        <!-- Busca Global -->
        <div class="hidden xl:flex relative group w-96">
          <input type="text" placeholder="Buscar leads, serviços ou transações..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-3.5 text-sm text-slate-700 focus:border-[#F18825] focus:bg-white focus:ring-4 focus:ring-[#F18825]/5 outline-none transition-all placeholder:text-slate-400 font-medium">
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F18825] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white border border-slate-100 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-400 shadow-sm uppercase tracking-tighter">
            <span>Ctrl</span> + <span>K</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Notificações -->
          <div class="relative group">
            <button class="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-[#F18825] rounded-full border-2 border-white ring-2 ring-[#F18825]/20 animate-pulse"></span>
            </button>
            <div class="absolute right-0 top-full mt-4 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div class="flex items-center justify-between mb-4 px-2">
                <span class="text-sm font-black text-slate-900 uppercase tracking-widest">Alertas Rápidos</span>
                <span class="text-[10px] text-[#F18825] font-black uppercase cursor-pointer hover:underline">Limpar</span>
              </div>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div class="p-3 bg-[#F18825]/5 rounded-2xl border border-[#F18825]/10 flex gap-3">
                  <div class="w-8 h-8 rounded-xl bg-[#F18825]/20 flex items-center justify-center text-[#F18825]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-800 leading-tight">3 Leads sem resposta há +2h</p>
                    <span class="text-[9px] text-slate-400 font-bold uppercase mt-1 block">Ação necessária agora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="h-8 w-px bg-slate-200 mx-2"></div>

          <!-- Perfil Dropdown -->
          <div class="flex items-center gap-4 relative group">
            <div class="flex flex-col items-end text-right">
              <span class="text-slate-900 text-sm font-extrabold leading-none">${user?.displayName || 'Airton Silva'}</span>
              <span class="text-slate-400 text-[10px] uppercase font-black tracking-widest mt-1 flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-[#22c55e] rounded-full"></span>
                Online
              </span>
            </div>
            <div class="relative">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#125133] to-[#F18825] p-0.5 shadow-lg shadow-[#125133]/10 transform transition-transform group-hover:scale-105">
                <div class="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-[#125133] font-black text-lg overflow-hidden uppercase">
                   ${initials}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}
