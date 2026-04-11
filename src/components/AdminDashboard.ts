import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { $ } from '../utils/dom';

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  cpf?: string;
  cnpj?: string;
  mensagem?: string;
  status: 'novo' | 'em_atendimento' | 'concluido' | 'cancelado';
  createdAt: Timestamp;
}

export function renderAdminDashboard(container: HTMLElement) {
  let leads: Lead[] = [];
  
  // Outer structure
  container.innerHTML = `
    <div class="flex h-screen bg-dark-900 font-sans text-slate-300">
      <!-- Sidebar -->
      <aside class="w-72 bg-dark-800 border-r border-white/5 flex flex-col hidden lg:flex shadow-2xl z-20">
        <div class="p-8 border-b border-white/5 bg-dark-900/50">
          <div class="flex items-center gap-4">
            <div class="bg-dark-700 p-2 rounded-xl border border-white/10 shadow-lg">
              <img src="/logo.png" alt="Logo" class="w-8 h-8 object-contain">
            </div>
            <div class="flex flex-col">
              <span class="font-black text-white text-sm tracking-tight font-display">HUB ADMIN</span>
              <span class="text-[9px] text-cta font-black uppercase tracking-[0.2em] leading-none mt-1">v2.0 Premium</span>
            </div>
          </div>
        </div>
        
        <nav class="flex-grow p-6 space-y-4">
          <div class="text-[10px] uppercase font-black tracking-widest text-slate-600 mb-4 px-2">Menu Principal</div>
          
          <a href="#" class="group flex items-center gap-4 px-4 py-4 bg-cta text-white rounded-2xl font-bold text-sm shadow-lg shadow-cta/20 transition-all transform hover:scale-[1.02]">
            <div class="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            Gestão de Leads
          </a>
          
          <a href="#" class="group flex items-center gap-4 px-4 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl font-bold text-sm transition-all">
            <div class="bg-dark-700 p-1.5 rounded-lg group-hover:bg-dark-600 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            Analytics
          </a>
        </nav>

        <div class="p-6 border-t border-white/5 bg-dark-900/30">
          <button id="btn-logout" class="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-red-500/10 hover:border-red-500/30">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Encerrar Sessão
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow overflow-y-auto flex flex-col bg-dark-900 hero-pattern">
        <!-- Top bar -->
        <header class="h-20 bg-dark-800/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-10 shadow-xl">
          <div class="flex flex-col">
            <h2 class="text-white font-black text-xl font-display tracking-tight">Painel de Operações</h2>
            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest">Sincronizado com Firebase Cloud</p>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="hidden sm:flex flex-col items-end">
              <span class="text-white text-sm font-black leading-none">${auth.currentUser?.displayName || 'Admin Especialista'}</span>
              <span class="text-cta text-[9px] uppercase font-black tracking-widest mt-2 px-2 py-0.5 bg-cta/10 rounded-full border border-cta/20">Master Access</span>
            </div>
            <div class="relative group">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cta to-primary-dark p-0.5 shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <div class="w-full h-full rounded-[14px] bg-dark-800 flex items-center justify-center text-white overflow-hidden">
                   <svg class="w-6 h-6 text-cta" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Dynamic Content -->
        <div class="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto w-full">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="stats-container">
            <!-- Dynamic stats here -->
          </div>

          <!-- Table Container -->
          <div class="bg-dark-800 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative">
            <div class="p-8 border-b border-white/5 bg-dark-900/20 flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="bg-cta/20 p-3 rounded-2xl">
                  <svg class="w-5 h-5 text-cta" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <div>
                  <h3 class="text-xl font-black text-white">Inbox de Leads</h3>
                  <p class="text-xs text-slate-500 mt-1 font-medium">Fila prioritária de atendimento</p>
                </div>
              </div>
              
              <div class="relative w-full lg:w-96 group">
                <input type="text" id="lead-search" placeholder="Buscar por nome, e-mail ou serviço..." 
                  class="w-full bg-dark-900/50 border border-white/10 rounded-2xl px-12 py-4 text-sm text-white focus:border-cta focus:bg-dark-900 outline-none transition-all placeholder:text-slate-600 shadow-inner">
                <svg class="w-5 h-5 text-slate-600 absolute left-4 top-4 group-focus-within:text-cta transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-dark-900/40 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                    <th class="px-8 py-6">Data de Entrada</th>
                    <th class="px-8 py-6">Informações do Lead</th>
                    <th class="px-8 py-6">Serviço Desejado</th>
                    <th class="px-8 py-6">Gestão de Status</th>
                    <th class="px-8 py-6 text-right">Controle</th>
                  </tr>
                </thead>
                <tbody id="leads-body">
                  <!-- Leads will be injected here -->
                </tbody>
              </table>
            </div>

            <div id="leads-empty" class="hidden py-24 text-center">
              <div class="bg-dark-700/30 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                <svg class="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              </div>
              <h4 class="text-white font-bold text-lg">Inbox Vazio</h4>
              <p class="text-slate-500 text-sm mt-2">Nenhum registro encontrado no momento.</p>
            </div>

            <div id="leads-loading" class="py-24 text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cta mx-auto shadow-2xl shadow-cta/20"></div>
              <p class="mt-6 text-slate-500 font-bold uppercase tracking-widest text-xs">Sincronizando Nuvem...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // Attach logout
  $('#btn-logout')?.addEventListener('click', () => signOut(auth));

  // Lead Sync Logic
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  
  onSnapshot(q, (snapshot) => {
    leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
    updateStats(leads);
    renderLeads(leads);
    $('#leads-loading')?.classList.add('hidden');
  });

  function updateStats(data: Lead[]) {
    const total = data.length;
    const novos = data.filter(l => l.status === 'novo').length;
    const atendimento = data.filter(l => l.status === 'em_atendimento').length;
    const concluido = data.filter(l => l.status === 'concluido').length;

    const statsEl = $('#stats-container');
    if (statsEl) {
      statsEl.innerHTML = `
        <div class="bg-dark-800 p-8 rounded-3xl border border-white/10 shadow-lg hover:border-white/20 transition-all group">
          <div class="flex justify-between items-start mb-4">
            <p class="text-[11px] text-slate-500 uppercase font-black tracking-widest">Leads Captados</p>
            <div class="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
          </div>
          <p class="text-4xl font-black text-white tracking-tighter">${total}</p>
        </div>
        <div class="bg-dark-800 p-8 rounded-3xl border border-white/10 shadow-lg hover:border-primary-light/30 transition-all group">
          <div class="flex justify-between items-start mb-4">
            <p class="text-[11px] text-primary-light uppercase font-black tracking-widest">Novos (24h)</p>
            <div class="p-2 bg-primary-light/10 rounded-lg text-primary-light">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          <p class="text-4xl font-black text-primary-light tracking-tighter">${novos}</p>
        </div>
        <div class="bg-dark-800 p-8 rounded-3xl border border-white/10 shadow-lg hover:border-cta/30 transition-all group">
          <div class="flex justify-between items-start mb-4">
            <p class="text-[11px] text-cta uppercase font-black tracking-widest">Em Conversa</p>
            <div class="p-2 bg-cta/10 rounded-lg text-cta">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
          </div>
          <p class="text-4xl font-black text-cta tracking-tighter">${atendimento}</p>
        </div>
        <div class="bg-dark-800 p-8 rounded-3xl border border-white/10 shadow-lg hover:border-slate-500 transition-all group">
          <div class="flex justify-between items-start mb-4">
            <p class="text-[11px] text-slate-500 uppercase font-black tracking-widest">Taxa Conversão</p>
            <div class="p-2 bg-slate-500/10 rounded-lg text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <p class="text-4xl font-black text-slate-100 tracking-tighter">${concluido}</p>
        </div>
      `;
    }
  }

  function renderLeads(filteredLeads: Lead[]) {
    const tbody = $('#leads-body');
    const emptyEl = $('#leads-empty');
    if (!tbody || !emptyEl) return;

    if (filteredLeads.length === 0) {
      tbody.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }

    emptyEl.classList.add('hidden');
    tbody.innerHTML = filteredLeads.map(lead => {
      const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('pt-BR') : 'N/A';
      const statusClass = {
        novo: 'bg-primary-dark/20 text-primary-light border-primary-light/40',
        em_atendimento: 'bg-cta/20 text-cta border-cta/40 underline-offset-4 decoration-dotted decoration-cta',
        concluido: 'bg-slate-800/50 text-slate-400 border-slate-700/50',
        cancelado: 'bg-red-900/20 text-red-400 border-red-500/20'
      }[lead.status] || 'bg-slate-500/10 text-slate-400';

      const statusLabels = {
        novo: 'NOVO AGUARDANDO',
        em_atendimento: 'EM NEGOCIAÇÃO',
        concluido: 'OPERAÇÃO CONCLUÍDA',
        cancelado: 'LEAD DESCARTADO'
      };

      return `
        <tr class="border-b border-white/5 hover:bg-white/[0.03] transition-all group">
          <td class="px-8 py-6">
            <span class="text-[11px] font-black tracking-widest text-slate-600 uppercase group-hover:text-cta transition-colors">${date}</span>
          </td>
          <td class="px-8 py-6">
            <div class="flex flex-col">
              <span class="text-sm font-black text-white tracking-tight">${lead.nome}</span>
              <span class="text-[10px] text-slate-500 mt-1 uppercase tracking-widest py-0.5 px-2 bg-dark-900 w-fit rounded border border-white/5 font-bold">${lead.cpf || lead.cnpj || 'DADOS NÃO INFORMADOS'}</span>
            </div>
          </td>
          <td class="px-8 py-6">
            <span class="text-[10px] font-black uppercase text-cta bg-cta/10 py-1.5 px-3 rounded-lg border border-cta/20">${lead.servico}</span>
          </td>
          <td class="px-8 py-6">
            <select data-id="${lead.id}" class="status-select text-[9px] font-black uppercase px-4 py-2 rounded-xl border ${statusClass} cursor-pointer outline-none bg-dark-900 hover:border-white/20 transition-all shadow-lg">
              <optgroup label="Alterar Status Leads" class="bg-dark-800">
                <option value="novo" ${lead.status === 'novo' ? 'selected' : ''} class="bg-dark-800">${statusLabels.novo}</option>
                <option value="em_atendimento" ${lead.status === 'em_atendimento' ? 'selected' : ''} class="bg-dark-800">${statusLabels.em_atendimento}</option>
                <option value="concluido" ${lead.status === 'concluido' ? 'selected' : ''} class="bg-dark-800">${statusLabels.concluido}</option>
                <option value="cancelado" ${lead.status === 'cancelado' ? 'selected' : ''} class="bg-dark-800">${statusLabels.cancelado}</option>
              </optgroup>
            </select>
          </td>
          <td class="px-8 py-6 text-right">
            <div class="flex items-center justify-end gap-3">
               <a href="https://wa.me/${lead.telefone.replace(/\D/g, '')}" target="_blank" 
                class="p-2.5 bg-primary-light/10 text-primary-light hover:bg-primary-light hover:text-white rounded-xl transition-all shadow-lg border border-primary-light/20 flex items-center gap-2 group/wa">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.178 1.652.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <span class="max-w-0 overflow-hidden group-hover/wa:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-black uppercase tracking-widest ml-0 group-hover/wa:ml-2">Atendimento</span>
              </a>
              <button data-delete="${lead.id}" class="p-2.5 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach events to newly rendered table
    document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = (e.target as HTMLSelectElement).getAttribute('data-id');
        const status = (e.target as HTMLSelectElement).value;
        if (id) {
          try {
            await updateDoc(doc(db, 'leads', id), { status });
          } catch (err) {
            console.error('Error updating status:', err);
          }
        }
      });
    });

    document.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute('data-delete');
        if (id && confirm('Tem certeza que deseja excluir este lead permanentemente?')) {
          try {
            await deleteDoc(doc(db, 'leads', id));
          } catch (err) {
            console.error('Error deleting lead:', err);
          }
        }
      });
    });
  }

  // Search logic
  $('#lead-search')?.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    const filtered = leads.filter(l => 
      l.nome.toLowerCase().includes(term) || 
      l.servico.toLowerCase().includes(term) || 
      l.email.toLowerCase().includes(term) || 
      l.telefone.includes(term)
    );
    renderLeads(filtered);
  });
}
