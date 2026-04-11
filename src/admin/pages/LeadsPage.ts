import { leadService } from '../services/leadService';
import { Lead, LeadStatus } from '../types/admin.types';
import { $ } from '../../utils/dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function renderLeadsPage(container: HTMLElement) {
  let allLeads: Lead[] = [];
  let filteredLeads: Lead[] = [];
  let currentFilter = 'todos';
  let searchTerm = '';

  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Gestão de Leads</h1>
          <p class="text-slate-500 font-medium">Controle total da sua base de clientes em tempo real.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-export-csv" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Exportar CSV
          </button>
          <button class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
            Novo Lead
          </button>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl flex flex-col xl:flex-row gap-6 items-center">
        <div class="relative flex-grow w-full max-w-md group">
          <input type="text" id="search-leads" placeholder="Buscar por nome, email ou telefone..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-3.5 text-sm text-slate-700 focus:border-[#F18825] focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium">
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F18825] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div class="flex flex-wrap gap-2 items-center">
          <button data-filter="todos" class="filter-btn active-filter px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all">Todos</button>
          <button data-filter="novo" class="filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all">Novos</button>
          <button data-filter="em_negociacao" class="filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all">Em Negociação</button>
          <button data-filter="aguardando_pagamento" class="filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all">Aguardando Pagto</button>
          <button data-filter="concluido" class="filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all">Concluídos</button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden relative min-h-[400px]">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th class="px-8 py-6 w-48">Entrada</th>
                <th class="px-8 py-6">Informações do Cliente</th>
                <th class="px-8 py-6">Serviço & Faturamento</th>
                <th class="px-8 py-6">Status Atual</th>
                <th class="px-8 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="leads-table-body" class="divide-y divide-slate-50">
               <!-- Dinamicamente preenchido -->
            </tbody>
          </table>
        </div>

        <div id="leads-empty" class="hidden py-32 text-center animate-fade-in">
          <div class="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
             <svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900">Nenhum Lead Encontrado</h3>
          <p class="text-slate-400 mt-2 font-medium">Tente ajustar seus filtros ou busca.</p>
        </div>

        <div id="leads-loader" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300">
          <div class="flex flex-col items-center gap-4">
             <div class="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-[#125133]"></div>
             <span class="text-[10px] font-black text-[#125133] uppercase tracking-widest">Sincronizando Leads...</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // --- Logic ---
  const tableBody = $('#leads-table-body');
  const loader = $('#leads-loader');
  const emptyState = $('#leads-empty');

  const unsubscribe = leadService.subscribeToLeads((leads) => {
    allLeads = leads;
    applyFilters();
    loader?.classList.add('opacity-0');
    setTimeout(() => loader?.classList.add('hidden'), 300);
  });

  function applyFilters() {
    searchTerm = ($('#search-leads') as HTMLInputElement)?.value.toLowerCase() || '';
    
    filteredLeads = allLeads.filter(lead => {
      const matchSearch = lead.nome.toLowerCase().includes(searchTerm) || 
                          lead.email.toLowerCase().includes(searchTerm) || 
                          lead.telefone.includes(searchTerm);
      
      const matchFilter = currentFilter === 'todos' || lead.status === currentFilter;
      
      return matchSearch && matchFilter;
    });

    renderTable();
  }

  function renderTable() {
    if (!tableBody || !emptyState) return;

    if (filteredLeads.length === 0) {
      tableBody.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    tableBody.innerHTML = filteredLeads.map(lead => {
      const date = lead.createdAt?.toDate ? format(lead.createdAt.toDate(), "dd/MM 'às' HH:mm", { locale: ptBR }) : 'N/A';
      
      const statusConfig: Record<LeadStatus, { label: string, color: string }> = {
        novo: { label: 'Novo', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
        primeiro_contato: { label: 'Primeiro Contato', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
        em_negociacao: { label: 'Negociação', color: 'bg-[#F18825]/10 text-[#F18825] border-[#F18825]/20' },
        aguardando_pagamento: { label: 'Aguardando Pagto', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
        em_execucao: { label: 'Em Execução', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
        concluido: { label: 'Concluído', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
        perdido: { label: 'Perdido', color: 'bg-slate-900/10 text-slate-900 border-slate-900/20' }
      };

      const config = statusConfig[lead.status] || statusConfig.novo;

      return `
        <tr class="hover:bg-slate-50/50 transition-colors group">
          <td class="px-8 py-6">
            <div class="flex flex-col">
              <span class="text-xs font-extrabold text-slate-900">${date}</span>
              <span class="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tight">${lead.origem || 'Site Direto'}</span>
            </div>
          </td>
          <td class="px-8 py-6">
            <div class="flex flex-col">
              <span class="text-sm font-black text-slate-900 tracking-tight">${lead.nome}</span>
              <span class="text-xs text-slate-500 mt-1">${lead.email}</span>
            </div>
          </td>
          <td class="px-8 py-6">
            <div class="flex flex-col">
              <span class="text-xs font-black text-[#125133] uppercase tracking-wide">${lead.servico}</span>
              <span class="text-sm font-extrabold text-slate-900 mt-1">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.valor || 0)}</span>
            </div>
          </td>
          <td class="px-8 py-6">
            <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${config.color}">
              ${config.label}
            </span>
          </td>
          <td class="px-8 py-6 text-right">
            <div class="flex items-center justify-end gap-3">
              <a href="https://wa.me/${lead.telefone.replace(/\D/g, '')}" target="_blank" 
                class="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all shadow-sm border border-emerald-100 flex items-center gap-2 group/wa">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.178 1.652.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <button class="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all border border-slate-100 font-black text-xs uppercase tracking-tighter btn-details" data-id="${lead.id}">
                Detalhes
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row events
    document.querySelectorAll('.btn-details').forEach(btn => {
       btn.addEventListener('click', (e) => {
         const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
         // openLeadModal(id); // To be implemented in next step
       });
    });
  }

  // --- Filter Events ---
  $('#search-leads')?.addEventListener('input', applyFilters);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter', 'bg-[#125133]', 'text-white', 'border-[#125133]'));
      const el = e.currentTarget as HTMLElement;
      el.classList.add('active-filter', 'bg-[#125133]', 'text-white', 'border-[#125133]');
      currentFilter = el.getAttribute('data-filter') || 'todos';
      applyFilters();
    });
  });

  // Export CSV Logic
  $('#btn-export-csv')?.addEventListener('click', () => {
    if (filteredLeads.length === 0) return alert('Nenhum dado para exportar.');
    
    const headers = ['Data', 'Nome', 'Email', 'Telefone', 'Servico', 'Valor', 'Status'];
    const rows = filteredLeads.map(l => [
      l.createdAt?.toDate ? l.createdAt.toDate().toLocaleDateString() : 'N/A',
      l.nome,
      l.email,
      l.telefone,
      l.servico,
      l.valor || 0,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_suporte_empreendedor_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
