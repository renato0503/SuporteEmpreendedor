import { Lead, LeadStatus, LeadNote } from '../types/admin.types';
import { leadService } from '../services/leadService';
import { $ } from '../../utils/dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function openLeadModal(leadId: string) {
  // 1. Create Modal Container if it doesn't exist
  let modalOverlay = $('#lead-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'lead-modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  // 2. Initial State
  modalOverlay.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div id="modal-content" class="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col translate-x-full transition-transform duration-500 ease-out border-l border-slate-200">
        <div class="flex items-center justify-center h-full">
           <div class="animate-spin rounded-full h-8 w-8 border-4 border-slate-100 border-t-[#125133]"></div>
        </div>
      </div>
    </div>
  `;

  // Animate in
  setTimeout(() => $('#modal-content')?.classList.remove('translate-x-full'), 10);

  // 3. Fetch Data & Build UI
  leadService.subscribeToLeads((leads) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return closeLeadModal();
    renderModalUI(lead);
  });
}

function renderModalUI(lead: Lead) {
  const content = $('#modal-content');
  if (!content) return;

  const date = lead.createdAt?.toDate ? format(lead.createdAt.toDate(), "PPPP 'às' HH:mm", { locale: ptBR }) : 'N/A';
  
  content.innerHTML = `
    <!-- Header -->
    <div class="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">${lead.nome}</h2>
          <span class="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">Ativo</span>
        </div>
        <p class="text-slate-400 text-xs font-medium mt-1">Lead captado em ${date}</p>
      </div>
      <button id="close-modal" class="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Tabs Nav -->
    <div class="px-8 border-b border-slate-100 flex gap-6 overflow-x-auto scrollbar-hide">
      <button data-tab="info" class="tab-btn active-tab py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Informações</button>
      <button data-tab="timeline" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Histórico</button>
      <button data-tab="mensagens" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Mensagens</button>
      <button data-tab="financeiro" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Financeiro</button>
      <button data-tab="arquivos" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Arquivos</button>
      <button data-tab="notes" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Notas</button>
      <button data-tab="followups" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0">Agenda</button>
    </div>

    <!-- Tab Content Area -->
    <div class="flex-grow overflow-y-auto p-8 bg-slate-50/50" id="modal-tab-container">
       <!-- Tab content injected here -->
    </div>

    <!-- Footer Actions -->
    <div class="p-8 border-t border-slate-100 bg-white grid grid-cols-2 gap-4">
       <button id="btn-save" class="w-full py-4 bg-[#125133] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-[1.02] transition-all">Salvar Alterações</button>
       <button id="btn-delete-lead" class="w-full py-4 border border-red-100 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all">Excluir Registro</button>
    </div>
  `;

  // --- Tab Logic ---
  const tabContainer = $('#modal-tab-container');
  const tabs = document.querySelectorAll('.tab-btn');

  function switchTab(tabId: string) {
    tabs.forEach(t => t.classList.remove('active-tab', 'border-[#125133]', 'text-[#125133]'));
    const activeTab = $(`[data-tab="${tabId}"]`);
    activeTab?.classList.add('active-tab', 'border-[#125133]', 'text-[#125133]');

    if (!tabContainer) return;

    if (tabId === 'info') {
      tabContainer.innerHTML = `
        <div class="space-y-8 animate-fade-in">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <input type="text" value="${lead.nome}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
              <input type="text" value="${lead.telefone}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <input type="email" value="${lead.email}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CPF ou CNPJ</label>
              <input type="text" value="${lead.cpf || lead.cnpj || ''}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm">
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Serviço Desejado</label>
            <select class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm">
              <option value="Abertura de MEI" ${lead.servico === 'Abertura de MEI' ? 'selected' : ''}>Abertura de MEI</option>
              <option value="DASN" ${lead.servico === 'DASN' ? 'selected' : ''}>Declaração Anual (DASN)</option>
              <option value="Parcelamento" ${lead.servico === 'Parcelamento' ? 'selected' : ''}>Parcelamento de Débitos</option>
              <option value="Alteração" ${lead.servico === 'Alteração' ? 'selected' : ''}>Alteração Cadastral</option>
            </select>
          </div>

          <div class="space-y-2">
             <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mensagem do Cliente</label>
             <div class="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-sm text-slate-600 leading-relaxed italic">
               "${lead.mensagem || 'Nenhuma mensagem adicional informada pelo cliente durante a captação.'}"
             </div>
          </div>
        </div>
      `;
    } else if (tabId === 'timeline') {
       tabContainer.innerHTML = `
         <div class="space-y-6 animate-fade-in p-2">
            <div class="flex gap-4 relative">
               <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg></div>
               <div class="w-px h-10 bg-slate-200 absolute left-5 top-10"></div>
               <div>
                 <p class="text-sm font-bold text-slate-900">Lead Captado</p>
                 <span class="text-[10px] text-slate-400 font-black uppercase tracking-widest">${date}</span>
               </div>
            </div>
            <div class="flex gap-4 relative">
               <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
               <div>
                 <p class="text-sm font-bold text-slate-900">Status alterado para Atendimento</p>
                 <span class="text-[10px] text-slate-400 font-black uppercase tracking-widest">Há 2 horas</span>
               </div>
            </div>
         </div>
       `;
    } else if (tabId === 'mensagens') {
       tabContainer.innerHTML = `
         <div class="space-y-4 animate-fade-in">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Escolha um template para enviar</h4>
            ${['Apresentação Inicial', 'Solicitação de Documentos', 'Dados para PIX'].map(tpl => `
               <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-[#125133] transition-all cursor-pointer">
                  <span class="text-xs font-bold text-slate-800">${tpl}</span>
                  <svg class="w-4 h-4 text-slate-300 group-hover:text-[#125133]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
               </div>
            `).join('')}
         </div>
       `;
    } else if (tabId === 'financeiro') {
       tabContainer.innerHTML = `
         <div class="space-y-6 animate-fade-in">
            <div class="bg-[#125133] p-6 rounded-2xl text-white">
               <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Total em Aberto</p>
               <h3 class="text-3xl font-black mt-2">R$ 145,00</h3>
            </div>
            <div class="space-y-2">
               <div class="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                  <span class="text-xs font-bold">Taxa de Abertura MEI</span>
                  <span class="text-xs font-black text-orange-500">PENDENTE</span>
               </div>
            </div>
         </div>
       `;
    } else if (tabId === 'arquivos') {
       tabContainer.innerHTML = `
         <div class="space-y-6 animate-fade-in">
            <div class="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-[#125133] transition-all cursor-pointer group">
               <svg class="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
               <span class="text-[10px] font-black uppercase tracking-widest mt-4">Upload de Documentos</span>
            </div>
         </div>
       `;
    } else if (tabId === 'notes') {
      tabContainer.innerHTML = `
        <div class="space-y-6 animate-fade-in h-full flex flex-col">
          <div class="flex-grow space-y-4">
             <div class="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
               <p class="text-sm text-slate-700 leading-relaxed">Cliente demonstrou urgência para o parcelamento devido a restrição no CNPJ.</p>
               <span class="text-[9px] text-[#F18825] font-black uppercase mt-3 block">Adicionado há 2h por Airton Silva</span>
             </div>
          </div>
          <div class="pt-4 space-y-4">
            <textarea placeholder="Escreva uma nova anotação interna..." class="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:border-[#125133] outline-none shadow-sm resize-none"></textarea>
            <button class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all">Adicionar Nota Interna</button>
          </div>
        </div>
      `;
    } else {
       tabContainer.innerHTML = `
         <div class="space-y-6 animate-fade-in">
           <div class="p-6 bg-white border border-slate-200 rounded-2xl">
              <p class="text-xs font-bold text-slate-800">Próximo Follow-up</p>
              <p class="text-[10px] text-slate-400 font-medium mt-1">15 de Abril de 2026 às 10:00</p>
           </div>
           <button class="w-full py-4 bg-[#F18825] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#F18825]/20">+ Agendar Reunião</button>
         </div>
       `;
    }
  }

  // --- Initial Tab ---
  switchTab('info');

  // --- Events ---
  tabs.forEach(t => t.addEventListener('click', (e) => switchTab((e.currentTarget as HTMLElement).getAttribute('data-tab') || 'info')));
  
  $('#close-modal')?.addEventListener('click', closeLeadModal);
  
  content.addEventListener('click', (e) => e.stopPropagation());
  $('#lead-modal-overlay')?.addEventListener('click', closeLeadModal);

  $('#btn-delete-lead')?.addEventListener('click', async () => {
    if (confirm('Tem certeza que deseja excluir este lead permanentemente?')) {
      await leadService.deleteLead(lead.id);
      closeLeadModal();
    }
  });
}

export function closeLeadModal() {
  const content = $('#modal-content');
  content?.classList.add('translate-x-full');
  setTimeout(() => {
    $('#lead-modal-overlay')?.remove();
  }, 500);
}
