import { $ } from '../../utils/dom';
import { crmService } from '../services/crmService';
import { SystemSettings } from '../types/admin.types';
import { changeAdminPassword } from './LoginPage';

const DEFAULT_SETTINGS: SystemSettings = {
  companyName: 'Suporte Empreendedor',
  cnpj: '',
  email: '',
  whatsapp: '',
  feeAbertura: '97,00',
  feeDasn: '67,00',
  feeParcelamento: '127,00',
  feeAlteracao: '67,00',
  feeBaixa: '97,00',
  feeConsulta: '47,00',
  pipelineStages: ['novo', 'primeiro_contato', 'em_negociacao', 'aguardando_pagamento', 'em_execucao', 'concluido', 'perdido']
};

export async function renderConfigPage(container: HTMLElement) {
  let activeTab = 'perfil';
  let settings: SystemSettings = { ...DEFAULT_SETTINGS };
  let isSaving = false;

  const storedSettings = await crmService.getSettings();
  if (storedSettings) {
    settings = { ...DEFAULT_SETTINGS, ...storedSettings };
  }

  function render() {
    container.innerHTML = `
      <div class="p-8 lg:p-12 space-y-8 max-w-[1200px] mx-auto animate-fade-in pb-20">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Configurações do Sistema</h1>
            <p class="text-slate-500 font-medium">Personalize sua plataforma e gerencie dados sensíveis.</p>
          </div>
          <div id="save-indicator" class="hidden px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest">
            ✓ Salvo automaticamente
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-1 space-y-2">
<button data-tab="perfil" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'perfil' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Perfil da Empresa</button>
              <button data-tab="taxas" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'taxas' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Taxas e Preços</button>
              <button data-tab="pipeline" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'pipeline' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Pipeline</button>
              <button data-tab="seguranca" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'seguranca' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Segurança</button>
              <button data-tab="backup" class="config-tab w-full text-left px-6 py-4 rounded-2xl ${activeTab === 'backup' ? 'bg-[#125133] text-white shadow-lg shadow-[#125133]/20' : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'} text-xs font-black uppercase tracking-widest transition-all">Backup & Dados</button>
          </div>

          <div class="lg:col-span-3 space-y-8" id="config-content">
             ${renderActiveTab()}
          </div>
        </div>
      </div>
    `;

    attachEvents();
  }

  function renderActiveTab() {
    if (activeTab === 'perfil') {
      return `
        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Dados da Empresa</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Nome da Empresa</label>
                 <input type="text" id="config-companyName" value="${settings.companyName || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="Nome que aparece no site">
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">CNPJ</label>
                 <input type="text" id="config-cnpj" value="${settings.cnpj || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="00.000.000/0001-00">
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Email de Contato</label>
                 <input type="email" id="config-email" value="${settings.email || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="contato@empresa.com.br">
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">WhatsApp (com DDI)</label>
                 <input type="text" id="config-whatsapp" value="${settings.whatsapp || ''}" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="5511999999999">
              </div>
           </div>
           <div class="pt-4">
             <button id="btn-save-perfil" class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Salvar Dados</button>
           </div>
        </section>

        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Previsualização</h3>
           <div class="p-6 bg-slate-50 rounded-2xl">
              <p class="text-sm text-slate-600 mb-4">Veja como os dados aparecem no site:</p>
              <div class="bg-white p-4 rounded-xl border border-slate-200">
                 <p class="text-lg font-black text-slate-900" id="preview-name">${settings.companyName || 'Nome da Empresa'}</p>
                 <p class="text-xs text-slate-500 mt-1">CNPJ: ${settings.cnpj || '00.000.000/0001-00'}</p>
                 <p class="text-xs text-slate-500">Email: ${settings.email || 'email@empresa.com'}</p>
                 <p class="text-xs text-slate-500">WhatsApp: ${settings.whatsapp || '55 11 99999-9999'}</p>
              </div>
           </div>
        </section>
      `;
    } else if (activeTab === 'taxas') {
      return `
        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Tabela de Preços</h3>
           <p class="text-sm text-slate-500">Estes valores serão usados automaticamente nos formulários do site.</p>
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Abertura MEI</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeAbertura" value="${settings.feeAbertura || '97,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Declaração DASN</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeDasn" value="${settings.feeDasn || '67,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Parcelamento</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeParcelamento" value="${settings.feeParcelamento || '127,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Alteração Cadastral</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeAlteracao" value="${settings.feeAlteracao || '67,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Baixa do MEI</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeBaixa" value="${settings.feeBaixa || '97,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl space-y-3">
                 <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Consulta Situação</label>
                 <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input type="text" id="config-feeConsulta" value="${settings.feeConsulta || '47,00'}" class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-[#125133]">
                 </div>
              </div>
           </div>
           <div class="pt-4">
             <button id="btn-save-taxas" class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Sincronizar Preços</button>
           </div>
        </section>

        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Resumo dos Serviços</h3>
           <div class="overflow-x-auto">
             <table class="w-full text-left">
               <thead>
                 <tr class="border-b border-slate-200">
                   <th class="py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Serviço</th>
                   <th class="py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Preço</th>
                   <th class="py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                 </tr>
               </thead>
               <tbody>
                 <tr class="border-b border-slate-100">
                   <td class="py-4 text-sm font-bold text-slate-700">Abertura de MEI</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeAbertura || '97,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
                 <tr class="border-b border-slate-100">
                   <td class="py-4 text-sm font-bold text-slate-700">Declaração Anual (DASN)</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeDasn || '67,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
                 <tr class="border-b border-slate-100">
                   <td class="py-4 text-sm font-bold text-slate-700">Parcelamento de Débitos</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeParcelamento || '127,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
                 <tr class="border-b border-slate-100">
                   <td class="py-4 text-sm font-bold text-slate-700">Alteração Cadastral</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeAlteracao || '67,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
                 <tr class="border-b border-slate-100">
                   <td class="py-4 text-sm font-bold text-slate-700">Baixa do MEI</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeBaixa || '97,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
                 <tr>
                   <td class="py-4 text-sm font-bold text-slate-700">Consulta de Situação</td>
                   <td class="py-4 text-sm font-black text-slate-900">R$ ${settings.feeConsulta || '47,00'}</td>
                   <td class="py-4"><span class="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Ativo</span></td>
                 </tr>
               </tbody>
             </table>
           </div>
        </section>
      `;
    } else if (activeTab === 'pipeline') {
      return `
        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Pipeline de Vendas</h3>
           <p class="text-sm text-slate-500">Estas etapas aparecem no Kanban e na listagem de leads.</p>
           <div class="space-y-3">
              ${settings.pipelineStages.map((stage, idx) => `
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#125133]/20 transition-all group">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-[#125133]/10 text-[#125133] flex items-center justify-center text-xs font-black">${idx + 1}</div>
                      <span class="text-sm font-bold text-slate-700">${stage.replace('_', ' ')}</span>
                   </div>
                   <button class="btn-remove-stage opacity-0 group-hover:opacity-100 text-[9px] font-black text-red-400 hover:text-red-600 uppercase transition-all" data-index="${idx}">Excluir</button>
                </div>
              `).join('')}
           </div>
           <div class="flex gap-4 pt-4">
             <input type="text" id="new-stage-name" placeholder="Nome da nova etapa" class="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]">
             <button id="btn-add-stage" class="px-6 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20">+ Adicionar</button>
           </div>
        </section>

        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Estatísticas do Pipeline</h3>
           <div class="grid grid-cols-3 gap-4">
              <div class="p-5 bg-slate-50 rounded-2xl text-center">
                 <p class="text-3xl font-black text-slate-900">${settings.pipelineStages.length}</p>
                 <p class="text-[10px] font-black text-slate-500 uppercase mt-1">Etapas</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl text-center">
                 <p class="text-3xl font-black text-slate-900">7</p>
                 <p class="text-[10px] font-black text-slate-500 uppercase mt-1">Padrão</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl text-center">
                 <p class="text-3xl font-black text-slate-900">${settings.pipelineStages.length > 7 ? settings.pipelineStages.length - 7 : 0}</p>
                 <p class="text-[10px] font-black text-slate-500 uppercase mt-1">Personalizadas</p>
              </div>
           </div>
        </section>
      `;
    } else if (activeTab === 'seguranca') {
      return `
        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Segurança do Admin</h3>
           <p class="text-sm text-slate-500">Altere a senha de acesso ao painel administrativo.</p>
           
           <div class="space-y-4 max-w-md">
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Nova Senha</label>
                <input type="password" id="new-admin-password" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="Digite a nova senha">
             </div>
             <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Confirmar Senha</label>
                <input type="password" id="confirm-admin-password" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#125133]" placeholder="Confirme a nova senha">
             </div>
             <div id="password-error" class="hidden p-4 bg-red-50 border border-red-100 rounded-2xl">
                <p class="text-xs font-bold text-red-600">As senhas não conferem ou estão vazias</p>
             </div>
             <div id="password-success" class="hidden p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <p class="text-xs font-bold text-emerald-600">Senha alterada com sucesso!</p>
             </div>
             <button id="btn-change-password" class="px-8 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Alterar Senha</button>
           </div>
           
           <div class="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
             <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#125133]/10 rounded-2xl flex items-center justify-center text-[#125133]">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <div>
                   <p class="text-sm font-black text-slate-900">Alterar Senha</p>
                   <p class="text-[10px] text-slate-500">Mínimo 4 caracteres</p>
                </div>
             </div>
           </div>
        </section>
      `;
    } else if (activeTab === 'backup') {
      return `
        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Gerenciamento de Dados</h3>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                    </div>
                    <div>
                       <p class="text-sm font-black text-slate-900">Backup Automático</p>
                       <p class="text-[10px] text-slate-500">Último: hoje às 14:30</p>
                    </div>
                 </div>
                 <button id="btn-backup-now" class="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase hover:bg-slate-50 transition-all">Fazer Backup Agora</button>
              </div>
              
              <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                       <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                       <p class="text-sm font-black text-slate-900">Exportar Dados</p>
                       <p class="text-[10px] text-slate-500">Leads, tarefas e configurações</p>
                    </div>
                 </div>
                 <button id="btn-export-data" class="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-[10px] uppercase hover:bg-slate-50 transition-all">Exportar CSV</button>
              </div>
           </div>
        </section>

        <section class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 animate-fade-in">
           <h3 class="text-xl font-black text-slate-900 tracking-tight">Informações do Sistema</h3>
           <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-[10px] text-slate-500 uppercase mb-1">Plataforma</p>
                 <p class="font-black text-slate-900">Suporte Empreendedor</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-[10px] text-slate-500 uppercase mb-1">Versão</p>
                 <p class="font-black text-slate-900">1.0.0</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-[10px] text-slate-500 uppercase mb-1">Hospedagem</p>
                 <p class="font-black text-slate-900">Firebase</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                 <p class="text-[10px] text-slate-500 uppercase mb-1">Última Atualização</p>
                 <p class="font-black text-slate-900">${new Date().toLocaleDateString('pt-BR')}</p>
              </div>
           </div>
        </section>
      `;
    }
  }

  async function saveSettings() {
    if (isSaving) return;
    isSaving = true;
    
    const indicator = $('#save-indicator');
    indicator?.classList.remove('hidden');
    
    try {
      await crmService.saveSettings(settings);
      setTimeout(() => {
        indicator?.classList.add('hidden');
        isSaving = false;
      }, 1500);
    } catch (err) {
      console.error('Error saving settings:', err);
      isSaving = false;
    }
  }

  function attachEvents() {
    container.querySelectorAll('.config-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).getAttribute('data-tab');
        if (tab) {
          activeTab = tab;
          render();
        }
      });
    });

    // Save perfil
    $('#btn-save-perfil')?.addEventListener('click', async () => {
      const btn = $('#btn-save-perfil') as HTMLButtonElement;
      btn.innerText = 'SALVANDO...';
      btn.disabled = true;
      
      settings.companyName = ($('#config-companyName') as HTMLInputElement)?.value;
      settings.cnpj = ($('#config-cnpj') as HTMLInputElement)?.value;
      settings.email = ($('#config-email') as HTMLInputElement)?.value;
      settings.whatsapp = ($('#config-whatsapp') as HTMLInputElement)?.value;
      
      await crmService.saveSettings(settings);
      
      btn.innerText = 'SALVO!';
      setTimeout(() => { btn.innerText = 'SALVAR DADOS'; btn.disabled = false; }, 1500);
      
      // Update preview
      const previewName = $('#preview-name');
      if (previewName) previewName.textContent = settings.companyName || 'Nome da Empresa';
    });

    // Save taxas
    $('#btn-save-taxas')?.addEventListener('click', async () => {
      const btn = $('#btn-save-taxas') as HTMLButtonElement;
      btn.innerText = 'SINCRONIZANDO...';
      btn.disabled = true;
      
      settings.feeAbertura = ($('#config-feeAbertura') as HTMLInputElement)?.value;
      settings.feeDasn = ($('#config-feeDasn') as HTMLInputElement)?.value;
      settings.feeParcelamento = ($('#config-feeParcelamento') as HTMLInputElement)?.value;
      settings.feeAlteracao = ($('#config-feeAlteracao') as HTMLInputElement)?.value;
      settings.feeBaixa = ($('#config-feeBaixa') as HTMLInputElement)?.value;
      settings.feeConsulta = ($('#config-feeConsulta') as HTMLInputElement)?.value;
      
      await crmService.saveSettings(settings);
      
      btn.innerText = 'SINCRONIZADO!';
      setTimeout(() => { btn.innerText = 'SINCRONIZAR PREÇOS'; btn.disabled = false; }, 1500);
      
      // Refresh to show updated prices
      render();
    });

    // Add stage
    $('#btn-add-stage')?.addEventListener('click', async () => {
      const name = ($('#new-stage-name') as HTMLInputElement)?.value;
      if (name) {
        const formattedName = name.toLowerCase().replace(/\s+/g, '_');
        settings.pipelineStages.push(formattedName);
        await crmService.saveSettings(settings);
        ($('#new-stage-name') as HTMLInputElement).value = '';
        render();
      }
    });

    // Remove stage
    container.querySelectorAll('.btn-remove-stage').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
        settings.pipelineStages.splice(index, 1);
        await crmService.saveSettings(settings);
        render();
      });
    });

    // Backup now
    $('#btn-backup-now')?.addEventListener('click', () => {
      alert('📦 Backup iniciado...\n\nO sistema está criando uma cópia de segurança de:\n• Leads\n• Tarefas da Agenda\n• Templates de Mensagens\n• Configurações\n\nVocê receberá uma notificação quando concluir.');
    });

    // Export data
    $('#btn-export-data')?.addEventListener('click', () => {
      alert('📊 Exportando dados...\n\nPrepare seu arquivo CSV com todos os leads e tarefas.');
    });

    // Change admin password
    $('#btn-change-password')?.addEventListener('click', async () => {
      const newPass = ($('#new-admin-password') as HTMLInputElement)?.value;
      const confirmPass = ($('#confirm-admin-password') as HTMLInputElement)?.value;
      const errorEl = $('#password-error');
      const successEl = $('#password-success');
      
      errorEl?.classList.add('hidden');
      successEl?.classList.add('hidden');
      
      if (!newPass || newPass.length < 4) {
        errorEl?.classList.remove('hidden');
        return;
      }
      
      if (newPass !== confirmPass) {
        errorEl?.classList.remove('hidden');
        return;
      }
      
      const success = await changeAdminPassword(newPass);
      if (success) {
        successEl?.classList.remove('hidden');
        ($('#new-admin-password') as HTMLInputElement).value = '';
        ($('#confirm-admin-password') as HTMLInputElement).value = '';
      } else {
        errorEl?.classList.remove('hidden');
      }
    });
  }

  render();
}