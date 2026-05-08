import { Lead, LeadStatus } from '../types/admin.types';
import { leadService } from '../services/leadService';
import { $ } from '../../utils/dom';

export function openLeadFormModal(initialData: Partial<Lead> = {}, onSuccess?: () => void) {
  let modalOverlay = $('#lead-form-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'lead-form-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in p-4">
      <div id="form-content" class="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-scale-up border border-slate-100">
        <!-- Header -->
        <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 class="text-2xl font-black text-slate-900 tracking-tight">${initialData.id ? 'Editar Lead' : 'Novo Lead / Oportunidade'}</h2>
            <p class="text-slate-700 text-xs font-medium mt-1">Insira os dados cadastrais do novo cliente.</p>
          </div>
          <button id="close-form" class="p-4 text-slate-300 hover:text-slate-900 hover:bg-white rounded-2xl transition-all shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Form Area -->
        <div class="p-8 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-thin">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Nome do Cliente</label>
              <input type="text" id="lead-nome" value="${initialData.nome || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-[#125133] outline-none transition-all" placeholder="Nome completo">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
              <input type="text" id="lead-telefone" value="${initialData.telefone || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-[#125133] outline-none transition-all" placeholder="(00) 00000-0000">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Email Profissional</label>
              <input type="email" id="lead-email" value="${initialData.email || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-[#125133] outline-none transition-all" placeholder="Email para contato">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Valor do Ticket (R$)</label>
              <input type="number" id="lead-valor" value="${initialData.valor || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-[#125133] outline-none transition-all" placeholder="0.00">
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Serviço Pretendido</label>
            <select id="lead-servico" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-[#125133] outline-none transition-all appearance-none cursor-pointer">
              <option value="Abertura de MEI" ${initialData.servico === 'Abertura de MEI' ? 'selected' : ''}>Abertura de MEI</option>
              <option value="DASN" ${initialData.servico === 'DASN' ? 'selected' : ''}>DASN (Declaração)</option>
              <option value="Parcelamento" ${initialData.servico === 'Parcelamento' ? 'selected' : ''}>Parcelamento MEI</option>
              <option value="Regularização" ${initialData.servico === 'Regularização' ? 'selected' : ''}>Regularização CNPJ/CPF</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-700 uppercase tracking-widest ml-1">Status Inicial</label>
            <div class="flex flex-wrap gap-2">
              ${['novo', 'primeiro_contato', 'em_negociacao', 'aguardando_pagamento'].map(s => `
                <button data-status-choice="${s}" class="status-choice px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${initialData.status === s || (s === 'novo' && !initialData.status) ? 'bg-[#125133] text-white border-[#125133]' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'}">${s.replace('_', ' ')}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
          <button id="cancel-form" class="flex-grow py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Descartar</button>
          <button id="submit-lead" class="flex-grow py-4 bg-[#125133] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-[1.02] transition-all">Salvar Registro</button>
        </div>
      </div>
    </div>
  `;

  let selectedStatus: LeadStatus = (initialData.status as LeadStatus) || 'novo';

  // Events
  const close = () => {
    $('#lead-form-overlay')?.remove();
  };

  $('#close-form')?.addEventListener('click', close);
  $('#cancel-form')?.addEventListener('click', close);

  modalOverlay.querySelector('#form-content')?.addEventListener('click', (e) => e.stopPropagation());
  modalOverlay.addEventListener('click', close);

  modalOverlay.querySelectorAll('.status-choice').forEach(btn => {
    btn.addEventListener('click', (e) => {
      modalOverlay.querySelectorAll('.status-choice').forEach(b => b.classList.remove('bg-[#125133]', 'text-white', 'border-[#125133]'));
      (e.currentTarget as HTMLElement).classList.add('bg-[#125133]', 'text-white', 'border-[#125133]');
      selectedStatus = (e.currentTarget as HTMLElement).getAttribute('data-status-choice') as LeadStatus;
    });
  });

  $('#submit-lead')?.addEventListener('click', async () => {
    const btn = $('#submit-lead') as HTMLButtonElement;
    btn.disabled = true;
    btn.innerText = 'PROCESSANDO...';

    const data: Partial<Lead> = {
      nome: ($('#lead-nome') as HTMLInputElement).value,
      telefone: ($('#lead-telefone') as HTMLInputElement).value,
      email: ($('#lead-email') as HTMLInputElement).value,
      valor: parseFloat(($('#lead-valor') as HTMLInputElement).value || '0'),
      servico: ($('#lead-servico') as HTMLSelectElement).value,
      status: selectedStatus
    };

    if (!data.nome || !data.telefone) {
      alert('Nome e Telefone são obrigatórios.');
      btn.disabled = false;
      btn.innerText = 'SALVAR REGISTRO';
      return;
    }

    try {
      if (initialData.id) {
        await leadService.updateLead(initialData.id, data);
      } else {
        await leadService.createLead(data);
      }
      if (onSuccess) onSuccess();
      close();
    } catch (err) {
      alert('Erro ao salvar lead.');
      btn.disabled = false;
      btn.innerText = 'SALVAR REGISTRO';
    }
  });
}
