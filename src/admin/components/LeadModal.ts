import { Lead, LeadStatus, MessageTemplate } from '../types/admin.types';
import { leadService } from '../services/leadService';
import { crmService } from '../services/crmService';
import { $ } from '../../utils/dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'novo', label: 'Novo', color: 'bg-emerald-500' },
  { value: 'primeiro_contato', label: '1º Contato', color: 'bg-blue-500' },
  { value: 'em_negociacao', label: 'Negociação', color: 'bg-[#F18825]' },
  { value: 'aguardando_pagamento', label: 'Aguardando Pagto', color: 'bg-red-500' },
  { value: 'em_execucao', label: 'Em Execução', color: 'bg-purple-500' },
  { value: 'concluido', label: 'Concluído', color: 'bg-slate-500' },
  { value: 'perdido', label: 'Perdido', color: 'bg-slate-900' }
];

const SERVICES = [
  'Abertura de MEI',
  'Declaração Anual (DASN)',
  'Parcelamento de Débitos',
  'Alteração Cadastral',
  'Baixa do MEI',
  'Consulta de Situação',
  'Outro'
];

export function openLeadModal(leadId: string) {
  let templates: MessageTemplate[] = [];
  let currentLead: Lead | null = null;
  let notes: { text: string; createdAt: any }[] = [];
  let isEditing = false;

  let modalOverlay = $('#lead-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'lead-modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="fixed inset-0 z-[100] flex items-center justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div id="modal-content" class="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col translate-x-full transition-transform duration-500 ease-out border-l border-slate-200">
        <div class="flex items-center justify-center h-full">
           <div class="animate-spin rounded-full h-8 w-8 border-4 border-slate-100 border-t-[#125133]"></div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => $('#modal-content')?.classList.remove('translate-x-full'), 10);

  const unsubLeads = leadService.subscribeToLeads((leads) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return closeLeadModal();
    currentLead = lead;
    renderModalUI(lead);
  });

  let currentTab = 'info';
  let refreshMensagensTab: (() => void) | null = null;
  
  const unsubTemplates = crmService.subscribeToTemplates((updatedTemplates) => {
    templates = updatedTemplates;
    if (currentTab === 'mensagens' && currentLead) {
      if (refreshMensagensTab) refreshMensagensTab();
    }
  });

  const unsubTasks = crmService.subscribeToTasks((tasks) => {
    if (currentLead && document.querySelector('.active-tab[data-tab="agenda"]')) {
      const leadTasks = tasks.filter(t => 
        t.title.toLowerCase().includes(currentLead!.nome.toLowerCase().split(' ')[0]) ||
        t.title.includes(leadId)
      );
      const container = $('#lead-tasks');
      if (container) {
        if (leadTasks.length === 0) {
          container.innerHTML = '<p class="text-center text-slate-400 text-xs py-4">Nenhum agendamento para este lead.</p>';
        } else {
          container.innerHTML = leadTasks.map(t => `
            <div class="p-4 bg-white border ${t.status === 'concluido' ? 'border-emerald-200' : 'border-slate-200'} rounded-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-black text-slate-900">${t.title}</p>
<p class="text-[10px] text-slate-700 mt-1">${format(new Date(t.date), 'dd/MM')} às ${t.time}</p>
                </div>
                <span class="px-2 py-1 text-[8px] font-black uppercase rounded-lg ${t.status === 'concluido' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}">
                  ${t.status === 'concluido' ? '✓' : '⏳'}
                </span>
              </div>
            </div>
          `).join('');
        }
      }
    }
  });

  function closeLeadModal() {
    unsubLeads();
    unsubTemplates();
    unsubTasks();
    const content = $('#modal-content');
    content?.classList.add('translate-x-full');
    setTimeout(() => $('#lead-modal-overlay')?.remove(), 500);
  }

  function renderModalUI(lead: Lead) {
    const content = $('#modal-content');
    if (!content) return;

    const date = lead.createdAt?.toDate ? format(lead.createdAt.toDate(), "PPPP 'às' HH:mm", { locale: ptBR }) : 'N/A';
    const currentStatus = STATUS_OPTIONS.find(s => s.value === lead.status) || STATUS_OPTIONS[0];

    content.innerHTML = `
      <!-- Header -->
      <div class="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
        <div class="flex flex-col">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-black text-slate-900 tracking-tight">${lead.nome}</h2>
            <span class="px-3 py-1 ${currentStatus.color}/10 ${currentStatus.color.replace('bg-', 'text-')} border ${currentStatus.color.replace('bg-', '')}/20 rounded-full text-[10px] font-black uppercase tracking-widest">${currentStatus.label}</span>
          </div>
          <p class="text-slate-700 text-xs font-medium mt-1">Lead captado em ${date}</p>
        </div>
        <div class="flex items-center gap-2">
          <a href="https://wa.me/${(lead.telefone || '').replace(/\D/g, '')}" target="_blank" class="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.178 1.652.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
          <button id="close-modal" class="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Tabs Nav -->
      <div class="px-6 border-b border-slate-100 flex gap-4 overflow-x-auto scrollbar-hide shrink-0 bg-white">
        <button data-tab="info" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0 active-tab border-[#125133] text-[#125133]">Informações</button>
        <button data-tab="mensagens" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0 text-slate-700">WhatsApp</button>
        <button data-tab="financeiro" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0 text-slate-700">Financeiro</button>
        <button data-tab="notes" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0 text-slate-700">Notas</button>
        <button data-tab="agenda" class="tab-btn py-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent hover:text-slate-900 whitespace-nowrap shrink-0 text-slate-700">Agenda</button>
      </div>

      <!-- Tab Content -->
      <div class="flex-grow overflow-y-auto p-6 bg-slate-50/50" id="modal-tab-container"></div>

      <!-- Footer Actions -->
      <div class="p-6 border-t border-slate-100 bg-white flex items-center justify-between gap-4 shrink-0">
        <button id="btn-delete-lead" class="px-6 py-3 border border-red-100 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all">Excluir</button>
        <button id="btn-save-lead" class="px-8 py-3 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-[1.02] transition-all">Salvar Alterações</button>
      </div>
    `;

    const tabContainer = $('#modal-tab-container');
    const tabs = document.querySelectorAll('.tab-btn');

    function renderMensagensTab(lead: Lead) {
      const tabContainer = $('#modal-tab-container');
      if (!tabContainer) return;
      
      refreshMensagensTab = () => renderMensagensTab(lead);
      
      tabContainer.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
          ${templates.length === 0 ? `
            <div class="text-center py-8 bg-white border border-dashed border-slate-300 rounded-2xl">
              <p class="text-xs font-bold text-slate-500">Nenhum template. Configure em Mensagens.</p>
            </div>
          ` : templates.map(tpl => `
            <div class="p-5 bg-white border border-slate-200 rounded-2xl hover:border-[#125133] transition-all cursor-pointer group btn-copy-tpl" data-text="${tpl.text.replace(/{nome}/g, lead.nome)}">
               <div class="flex items-center justify-between mb-2">
                  <span class="text-[9px] font-black text-[#125133] uppercase tracking-widest bg-[#125133]/5 px-2 py-1 rounded-lg">${tpl.category}</span>
                  <svg class="w-4 h-4 text-slate-400 group-hover:text-[#125133]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
               </div>
               <p class="text-sm font-black text-slate-900 mb-1">${tpl.title}</p>
               <p class="text-[11px] text-slate-600 font-inter line-clamp-2">${tpl.text.substring(0, 100)}...</p>
            </div>
          `).join('')}
          <a href="https://wa.me/${lead.telefone.replace(/\D/g, '')}?text=${encodeURIComponent('Olá ' + lead.nome + '! Vi seu contato no site. Como posso ajudar?')}" target="_blank" class="flex items-center justify-center gap-2 p-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.178 1.652.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Abrir WhatsApp
          </a>
        </div>
      `;
      tabContainer.querySelectorAll('.btn-copy-tpl').forEach(btn => {
         btn.addEventListener('click', (e) => {
           const text = (e.currentTarget as HTMLElement).getAttribute('data-text');
           if (text) {
             navigator.clipboard.writeText(text);
             (e.currentTarget as HTMLElement).classList.add('bg-emerald-50', 'border-emerald-500');
             setTimeout(() => (e.currentTarget as HTMLElement).classList.remove('bg-emerald-50', 'border-emerald-500'), 1500);
           }
         });
      });
    }

    function switchTab(tabId: string) {
      currentTab = tabId;
      tabs.forEach(t => {
        t.classList.remove('active-tab', 'border-[#125133]', 'text-[#125133]', 'text-slate-700');
        if ((t as HTMLElement).getAttribute('data-tab') === tabId) {
          t.classList.add('active-tab', 'border-[#125133]', 'text-[#125133]');
        } else {
          t.classList.add('text-slate-700');
        }
      });

      if (!tabContainer) return;

      if (tabId === 'info') {
        tabContainer.innerHTML = `
          <div class="space-y-6 animate-fade-in pb-10">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Nome Completo</label>
                <input type="text" id="edit-nome" value="${lead.nome}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">WhatsApp</label>
                <input type="text" id="edit-telefone" value="${lead.telefone}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">E-mail</label>
                <input type="email" id="edit-email" value="${lead.email}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Serviço</label>
                <select id="edit-servico" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
                  ${SERVICES.map(s => `<option value="${s}" ${lead.servico === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Status</label>
                <select id="edit-status" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
                  ${STATUS_OPTIONS.map(s => `<option value="${s.value}" ${lead.status === s.value ? 'selected' : ''}>${s.label}</option>`).join('')}
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Valor (R$)</label>
                <input type="number" id="edit-valor" value="${lead.valor || 0}" class="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:border-[#125133] outline-none">
              </div>
            </div>
            <div class="space-y-2">
               <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Mensagem de Origem</label>
               <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-sm text-slate-700 font-inter">${lead.mensagem || 'Sem mensagem.'}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-xs text-slate-700">
               <div><span class="font-black">Origem:</span> ${lead.origem || 'Site'}</div>
               <div><span class="font-black">CPF:</span> ${lead.cpf || 'Não informado'}</div>
            </div>
          </div>
        `;
      } else if (tabId === 'mensagens') {
        tabContainer.innerHTML = `
          <div class="space-y-4 animate-fade-in pb-10">
            ${templates.length === 0 ? `
              <div class="text-center py-8 bg-white border border-dashed border-slate-300 rounded-2xl">
                <p class="text-xs font-bold text-slate-400">Nenhum template. Configure em Mensagens.</p>
              </div>
            ` : templates.map(tpl => `
<div class="p-5 bg-white border border-slate-200 rounded-2xl hover:border-[#125133] transition-all cursor-pointer group btn-copy-tpl" data-text="${tpl.text.replace(/{nome}/g, lead.nome || 'Cliente')}">
                 <div class="flex items-center justify-between mb-2">
                    <span class="text-[9px] font-black text-[#125133] uppercase tracking-widest bg-[#125133]/5 px-2 py-1 rounded-lg">${tpl.category}</span>
                    <svg class="w-4 h-4 text-slate-300 group-hover:text-[#125133]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                 </div>
                 <p class="text-sm font-black text-slate-900 mb-1">${tpl.title}</p>
                 <p class="text-[11px] text-slate-700 font-inter line-clamp-2">${tpl.text.substring(0, 100)}...</p>
              </div>
            `).join('')}
<a href="https://wa.me/${(lead.telefone || '').replace(/\D/g, '')}?text=${encodeURIComponent('Olá ' + (lead.nome || 'cliente') + '! Vi seu contato no site. Como posso ajudar?')}" target="_blank" class="flex items-center justify-center gap-2 p-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.178 1.652.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Abrir WhatsApp
            </a>
          </div>
        `;
        tabContainer.querySelectorAll('.btn-copy-tpl').forEach(btn => {
           btn.addEventListener('click', (e) => {
             const text = (e.currentTarget as HTMLElement).getAttribute('data-text');
             if (text) {
               navigator.clipboard.writeText(text);
               (e.currentTarget as HTMLElement).classList.add('bg-emerald-50', 'border-emerald-500');
               setTimeout(() => (e.currentTarget as HTMLElement).classList.remove('bg-emerald-50', 'border-emerald-500'), 1500);
             }
           });
        });
      } else if (tabId === 'financeiro') {
        tabContainer.innerHTML = `
          <div class="space-y-6 animate-fade-in pb-10">
             <div class="bg-slate-900 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Valor do Serviço</p>
                <input type="number" id="edit-valor-financeiro" value="${lead.valor || 0}" class="bg-transparent text-3xl font-black mt-2 text-white border-b border-white/30 focus:border-white outline-none w-full pb-2" placeholder="0.00">
             </div>
             
             <div class="space-y-4">
                <div class="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                   <p class="text-[10px] font-black text-slate-700 uppercase tracking-widest">Detalhes do Serviço</p>
                   <div class="grid grid-cols-2 gap-3">
                      <div>
                         <label class="text-[9px] text-slate-500 uppercase block mb-1">Serviço</label>
                         <select id="edit-servico-financeiro" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                            ${SERVICES.map(s => `<option value="${s}" ${lead.servico === s ? 'selected' : ''}>${s}</option>`).join('')}
                         </select>
                      </div>
                      <div>
                         <label class="text-[9px] text-slate-500 uppercase block mb-1">Status Pago</label>
                         <select id="edit-status-pagamento" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                            <option value="pendente" ${lead.status !== 'concluido' && lead.status !== 'aguardando_pagamento' ? 'selected' : ''}>Pendente</option>
                            <option value="aguardando" ${lead.status === 'aguardando_pagamento' ? 'selected' : ''}>Aguardando</option>
                            <option value="pago" ${lead.status === 'concluido' ? 'selected' : ''}>Pago</option>
                         </select>
                      </div>
                   </div>
                </div>
                
                <div class="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
                   <p class="text-[10px] font-black text-slate-700 uppercase tracking-widest">Informações de Pagamento</p>
                   <div class="grid grid-cols-2 gap-3">
                      <div>
                         <label class="text-[9px] text-slate-500 uppercase block mb-1">Forma de Pagamento</label>
                         <select id="edit-forma-pagamento" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                            <option value="">Selecionar...</option>
                            <option value="PIX">PIX</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Transferência">Transferência</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Boleto">Boleto</option>
                         </select>
                      </div>
                      <div>
                         <label class="text-[9px] text-slate-500 uppercase block mb-1">Data do Pagamento</label>
                         <input type="date" id="edit-data-pagamento" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
                      </div>
                   </div>
                   <div>
                      <label class="text-[9px] text-slate-500 uppercase block mb-1">Observações</label>
                      <textarea id="edit-obs-financeiro" rows="2" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium" placeholder="Observações sobre pagamento..."></textarea>
                   </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                   <div class="p-4 bg-white border border-slate-200 rounded-2xl">
                      <p class="text-[10px] text-slate-500 uppercase">Ticket Médio</p>
                      <p class="text-lg font-black text-slate-900">R$ ${new Intl.NumberFormat('pt-BR').format(lead.valor || 0)}</p>
                   </div>
                   <div class="p-4 bg-white border border-slate-200 rounded-2xl">
                      <p class="text-[10px] text-slate-500 uppercase">Valor Projeto</p>
                      <p class="text-lg font-black text-slate-900">R$ ${new Intl.NumberFormat('pt-BR').format((lead.valor || 0) * 1)}</p>
                   </div>
                </div>
             </div>
             
             <button id="btn-salvar-financeiro" class="w-full py-4 bg-[#125133] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-[1.02] transition-all">Salvar Dados Financeiros</button>
          </div>
        `;
        
        $('#btn-salvar-financeiro')?.addEventListener('click', async () => {
          const btn = $('#btn-salvar-financeiro') as HTMLButtonElement;
          const originalText = btn.innerText;
          btn.innerText = 'SALVANDO...';
          btn.disabled = true;
          
          const novoValor = parseFloat(($('#edit-valor-financeiro') as HTMLInputElement)?.value || '0');
          const novoServico = ($('#edit-servico-financeiro') as HTMLSelectElement)?.value;
          const statusPagamento = ($('#edit-status-pagamento') as HTMLSelectElement)?.value;
          
          let novoStatus: LeadStatus = 'novo';
          if (statusPagamento === 'pago') {
            novoStatus = 'concluido';
          } else if (statusPagamento === 'aguardando') {
            novoStatus = 'aguardando_pagamento';
          } else {
            novoStatus = 'em_negociacao';
          }
          
          try {
            await leadService.updateLead(lead.id, {
              valor: novoValor,
              servico: novoServico,
              status: novoStatus
            });
            
            btn.innerText = 'SALVO!';
            setTimeout(() => { 
              btn.innerText = originalText; 
              btn.disabled = false; 
              // Refresh the modal to show updated data
              renderModalUI({ ...lead, valor: novoValor, servico: novoServico, status: novoStatus });
            }, 1500);
          } catch (err) {
            btn.innerText = 'ERRO';
            setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 2000);
          }
        });
      } else if (tabId === 'notes') {
        tabContainer.innerHTML = `
          <div class="space-y-4 animate-fade-in pb-10">
            <div class="flex gap-3">
              <input type="text" id="new-note" placeholder="Adicionar uma nota..." class="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:border-[#125133] outline-none placeholder:text-slate-500">
              <button id="btn-add-note" class="px-6 py-3 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Add</button>
            </div>
            <div id="notes-list" class="space-y-3">
              ${(lead.notes || []).length > 0 ? lead.notes.map(n => `
                <div class="p-4 bg-white border border-slate-200 rounded-2xl">
                  <p class="text-sm text-slate-700 font-inter">${n.text}</p>
                  <span class="text-[9px] text-slate-700 font-black uppercase mt-2 block">${n.createdAt?.toDate ? format(n.createdAt.toDate(), 'dd/MM HH:mm') : ''}</span>
                </div>
              `).join('') : '<p class="text-center text-slate-500 text-xs py-8">Nenhuma nota ainda.</p>'}
            </div>
          </div>
        `;
        
        $('#btn-add-note')?.addEventListener('click', async () => {
          const noteText = ($('#new-note') as HTMLInputElement)?.value;
          if (noteText && noteText.trim()) {
            const newNote: any = { text: noteText.trim(), createdAt: new Date(), id: Date.now().toString(), author: 'Admin', important: false };
            const newNotes = [...(lead.notes || []), newNote];
            await leadService.updateLead(lead.id, { notes: newNotes });
            ($('#new-note') as HTMLInputElement).value = '';
            switchTab('notes');
          }
        });
      } else if (tabId === 'agenda') {
        tabContainer.innerHTML = `
          <div class="space-y-4 animate-fade-in pb-10">
            <div class="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
               <p class="text-[10px] font-black text-slate-700 uppercase">Agendar Tarefa</p>
<input type="text" id="task-title" placeholder="Ex: Ligar para ${lead.nome.split(' ')[0]}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-500">
                <div class="grid grid-cols-2 gap-3">
                  <input type="date" id="task-date" class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
                  <input type="time" id="task-time" class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700">
                </div>
               <button id="btn-create-task" class="w-full py-3 bg-[#F18825] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F18825]/90">+ Criar Agendamento</button>
            </div>
            <div id="lead-tasks" class="space-y-3">
              <p class="text-center text-slate-400 text-xs py-4">Carregando tarefas...</p>
            </div>
          </div>
        `;

        const today = new Date().toISOString().split('T')[0];
        ($('#task-date') as HTMLInputElement).value = today;

        $('#btn-create-task')?.addEventListener('click', async () => {
          const title = ($('#task-title') as HTMLInputElement)?.value;
          const date = ($('#task-date') as HTMLInputElement)?.value;
          const time = ($('#task-time') as HTMLInputElement)?.value || '09:00';
          
          if (title && date) {
            await crmService.addTask({
              title: `[Lead: ${lead.nome}] ${title}`,
              date,
              time,
              category: 'Assessoria',
              status: 'pendente'
            });
            ($('#task-title') as HTMLInputElement).value = '';
            switchTab('agenda');
          }
        });
      }
    }

    function renderAgendaTab(tasks: any[]) {
      const container = $('#lead-tasks');
      if (!container) return;
      
      if (tasks.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-400 text-xs py-4">Nenhum agendamento para este lead.</p>';
      } else {
        container.innerHTML = tasks.map(t => `
          <div class="p-4 bg-white border ${t.status === 'concluido' ? 'border-emerald-200' : 'border-slate-200'} rounded-2xl">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-black text-slate-900">${t.title}</p>
                <p class="text-[10px] text-slate-400 mt-1">${format(new Date(t.date), 'dd/MM')} às ${t.time}</p>
              </div>
              <span class="px-2 py-1 text-[8px] font-black uppercase rounded-lg ${t.status === 'concluido' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}">
                ${t.status === 'concluido' ? '✓' : '⏳'}
              </span>
            </div>
          </div>
        `).join('');
      }
    }

    switchTab('info');
    tabs.forEach(t => t.addEventListener('click', (e) => switchTab((e.currentTarget as HTMLElement).getAttribute('data-tab') || 'info')));

    $('#close-modal')?.addEventListener('click', closeLeadModal);
    $('#lead-modal-overlay')?.addEventListener('click', closeLeadModal);
    $('#modal-content')?.addEventListener('click', (e) => e.stopPropagation());

    $('#btn-save-lead')?.addEventListener('click', async () => {
       const btn = $('#btn-save-lead') as HTMLButtonElement;
       btn.innerText = 'SALVANDO...';
       btn.disabled = true;

       try {
         await leadService.updateLead(lead.id, {
           nome: ($('#edit-nome') as HTMLInputElement)?.value,
           telefone: ($('#edit-telefone') as HTMLInputElement)?.value,
           email: ($('#edit-email') as HTMLInputElement)?.value,
           servico: ($('#edit-servico') as HTMLSelectElement)?.value,
           status: ($('#edit-status') as HTMLSelectElement)?.value as LeadStatus,
           valor: parseFloat(($('#edit-valor') as HTMLInputElement)?.value || '0')
         });
         
         btn.innerText = 'SALVO!';
         setTimeout(() => { btn.innerText = 'SALVAR ALTERAÇÕES'; btn.disabled = false; }, 2000);
       } catch (err) {
         btn.innerText = 'ERRO';
         setTimeout(() => { btn.innerText = 'SALVAR ALTERAÇÕES'; btn.disabled = false; }, 2000);
       }
    });

    $('#btn-delete-lead')?.addEventListener('click', async () => {
      if (confirm(`Excluir o lead ${lead.nome}?`)) {
        await leadService.deleteLead(lead.id);
        closeLeadModal();
      }
    });
  }
}