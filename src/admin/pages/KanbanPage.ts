import { leadService } from '../services/leadService';
import { Lead, LeadStatus } from '../types/admin.types';
import { $ } from '../../utils/dom';
import { openLeadModal } from '../components/LeadModal';

export function renderKanbanPage(container: HTMLElement) {
  let allLeads: Lead[] = [];
  
  const statuses: { id: LeadStatus, label: string, color: string }[] = [
    { id: 'novo', label: 'Entrada / Novo', color: 'bg-emerald-500' },
    { id: 'primeiro_contato', label: '1º Contato', color: 'bg-blue-500' },
    { id: 'em_negociacao', label: 'Em Negociação', color: 'bg-[#F18825]' },
    { id: 'aguardando_pagamento', label: 'Aguardando Pagto', color: 'bg-red-500' },
    { id: 'em_execucao', label: 'Em Execução', color: 'bg-purple-500' },
    { id: 'concluido', label: 'Finalizado', color: 'bg-slate-400' },
    { id: 'perdido', label: 'Arquivado', color: 'bg-slate-900' }
  ];

  container.innerHTML = `
    <div class="h-full flex flex-col p-8 lg:p-12 space-y-8 animate-fade-in overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Pipeline de Vendas</h1>
          <p class="text-slate-500 font-medium text-sm mt-1">Arraste e solte para mover leads entre os estágios.</p>
        </div>
        <div class="flex items-center gap-4">
           <div class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
             <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sincronização Ativa</span>
           </div>
        </div>
      </div>

      <!-- Kanban Board Wrapper -->
      <div class="flex-grow overflow-x-auto scrollbar-thin pb-4">
        <div class="flex gap-6 h-full min-w-max">
          ${statuses.map(status => `
            <div class="w-80 flex flex-col bg-slate-100/50 rounded-[2rem] border border-slate-200/50 h-full">
              <!-- Column Header -->
              <div class="p-6 flex items-center justify-between shrink-0">
                <div class="flex items-center gap-3">
                  <div class="w-2.5 h-2.5 rounded-full ${status.color} shadow-lg shadow-current/20"></div>
                  <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-widest">${status.label}</h3>
                </div>
                <span id="count-${status.id}" class="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 shadow-sm">0</span>
              </div>
              
              <!-- Draggable Area -->
              <div id="column-${status.id}" data-status="${status.id}" class="kanban-column flex-grow p-4 space-y-4 overflow-y-auto scrollbar-hide min-h-[200px] transition-colors duration-300 rounded-b-[2rem]">
                <!-- Cards will be injected here -->
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // --- Board Logic ---
  const unsubscribe = leadService.subscribeToLeads((leads) => {
    allLeads = leads;
    renderBoard();
  });

  function renderBoard() {
    statuses.forEach(status => {
      const column = $(`#column-${status.id}`);
      const countEl = $(`#count-${status.id}`);
      if (!column || !countEl) return;

      const columnLeads = allLeads.filter(l => l.status === status.id);
      countEl.innerText = columnLeads.length.toString();

      column.innerHTML = columnLeads.map(lead => `
        <div draggable="true" data-id="${lead.id}" class="kanban-card bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#125133]/20 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full ${status.color}"></div>
          
          <div class="space-y-3">
            <div class="flex justify-between items-start">
               <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${lead.servico}</span>
               <button class="p-1.5 text-slate-300 hover:text-slate-900 transition-colors btn-card-details" data-id="${lead.id}">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
               </button>
            </div>
            
            <h4 class="text-sm font-black text-slate-900 tracking-tight leading-tight">${lead.nome}</h4>
            
            <div class="flex items-center justify-between pt-2">
              <span class="text-xs font-black text-[#125133]">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.valor || 0)}</span>
              <div class="flex -space-x-2">
                 <div class="w-6 h-6 rounded-lg bg-slate-100 border border-white flex items-center justify-center text-[9px] font-black text-slate-400 shadow-sm">AS</div>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Add Drag Events to Cards
      column.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.querySelector('.btn-card-details')?.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
          if (id) openLeadModal(id);
        });
      });

      // Add Drop Events to Columns
      column.addEventListener('dragover', handleDragOver);
      column.addEventListener('dragleave', handleDragLeave);
      column.addEventListener('drop', handleDrop);
    });
  }

  // --- Drag & Drop Handlers ---
  let draggedCardId: string | null = null;

  function handleDragStart(this: HTMLElement, e: DragEvent) {
    draggedCardId = this.getAttribute('data-id');
    this.classList.add('opacity-40', 'scale-95');
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedCardId || '');
    }
  }

  function handleDragEnd(this: HTMLElement) {
    this.classList.remove('opacity-40', 'scale-95');
    draggedCardId = null;
    document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('bg-[#125133]/5', 'border-[#125133]/20'));
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    const column = e.currentTarget as HTMLElement;
    column.classList.add('bg-[#125133]/5', 'border-[#125133]/20');
  }

  function handleDragLeave(e: DragEvent) {
    const column = e.currentTarget as HTMLElement;
    column.classList.remove('bg-[#125133]/5', 'border-[#125133]/20');
  }

  async function handleDrop(e: DragEvent) {
    e.preventDefault();
    const column = e.currentTarget as HTMLElement;
    column.classList.remove('bg-[#125133]/5', 'border-[#125133]/20');
    
    const newStatus = column.getAttribute('data-status') as LeadStatus;
    const id = e.dataTransfer?.getData('text/plain');

    if (id && newStatus) {
      const lead = allLeads.find(l => l.id === id);
      if (lead && lead.status !== newStatus) {
        try {
          // Visual feedback immediately
          const card = document.querySelector(`.kanban-card[data-id="${id}"]`);
          if (card) {
            card.classList.add('animate-pulse', 'border-[#F18825]');
          }
          
          await leadService.updateLeadStatus(id, newStatus);
          
          // Toast or simple notification could go here
          console.log(`Lead ${id} moved to ${newStatus}`);
        } catch (err) {
          console.error('Error updating status on drop:', err);
          alert('Erro ao atualizar status. O card voltará para a posição original.');
        }
      }
    }
  }
}
