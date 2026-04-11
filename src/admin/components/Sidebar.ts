import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export function renderSidebar() {
  const user = auth.currentUser;
  const initials = user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 'AS';

  return `
    <aside class="w-[240px] bg-[#0a1f14] border-r border-white/5 flex flex-col h-screen sticky top-0 z-30 transition-all duration-300 overflow-y-auto scrollbar-thin">
      <!-- Topo Sidebar -->
      <div class="p-6 border-b border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#125133] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
             <img src="/logo.png" alt="Logo" class="w-7 h-7 object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
             <span class="hidden font-black text-white text-lg font-display tracking-tight">SE</span>
          </div>
          <div class="flex flex-col">
            <span class="font-black text-white text-sm tracking-tight font-display">HUB ADMIN</span>
            <span class="text-[9px] text-[#F18825] font-black uppercase tracking-[0.2em] leading-none mt-1 bg-[#F18825]/10 px-1.5 py-0.5 rounded-full border border-[#F18825]/20">v2.0 Premium</span>
          </div>
        </div>
      </div>

      <!-- Perfil Resumido -->
      <div class="p-6">
        <div class="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-300">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#125133] to-[#1a6b45] flex items-center justify-center text-white font-black text-sm shadow-xl">
             ${initials}
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-white text-sm font-black truncate leading-none">${user?.displayName || 'Airton Silva'}</span>
            <span class="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-2">Administrador</span>
          </div>
        </div>
      </div>

      <div class="h-px bg-white/5 mx-6"></div>

      <!-- Menu Principal -->
      <nav class="flex-grow p-6 space-y-2">
        <div class="text-[10px] uppercase font-black tracking-[0.3em] text-[#1a6b45] mb-5 px-3">Ecossistema</div>
        
        <button data-hash="/dashboard" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all duration-300">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#125133]/20 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          </div>
          Dashboard
        </button>

        <button data-hash="/leads" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all relative">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0zM9 7h.01M9 11h.01M9 15h.01"></path></svg>
          </div>
          Leads / CRM
          <span class="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#F18825] text-white text-[9px] font-black rounded-full shadow-lg shadow-[#F18825]/20 animate-pulse">12</span>
        </button>

        <button data-hash="/kanban" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2V7"></path></svg>
          </div>
          Kanban Board
        </button>

        <button data-hash="/financeiro" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          Financeiro
        </button>

        <button data-hash="/analytics" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
          </div>
          Analytics
        </button>

        <button data-hash="/mensagens" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all relative">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          Mensagens
          <span class="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full border border-dark-900"></span>
        </button>

        <button data-hash="/agenda" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          Agenda
        </button>

        <button data-hash="/configuracoes" class="nav-link group w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
          <div class="bg-dark-700 p-2 rounded-xl group-hover:bg-[#125133] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          Configurações
        </button>
      </nav>

      <div class="h-px bg-white/5 mx-6"></div>

      <!-- Rodapé Sidebar -->
      <div class="p-6 space-y-4">
        <button id="btn-admin-logout" class="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] border border-red-500/10">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Encerrar Sessão
        </button>
        
        <div class="px-2 text-center">
          <p class="text-white font-black text-[9px] uppercase tracking-widest opacity-30">Suporte Empreendedor</p>
          <p class="text-slate-600 text-[8px] uppercase tracking-[0.3em] font-black mt-1 leading-none">Inova Tech LTDA</p>
        </div>
      </div>
    </aside>
  `;
}

export function attachSidebarEvents() {
  const logoutBtn = document.getElementById('btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Deseja realmente encerrar sua sessão segura?')) {
        await signOut(auth);
      }
    });
  }

  // Handle nav navigation correctly with SPA router
  document.querySelectorAll('[data-hash]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const hash = (e.currentTarget as HTMLElement).getAttribute('data-hash');
      if (hash) {
        window.location.hash = hash;
      }
    });
  });
}
