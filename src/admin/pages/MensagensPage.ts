import { $ } from '../../utils/dom';
import { crmService } from '../services/crmService';
import { MessageTemplate } from '../types/admin.types';

const SUGGESTED_TEMPLATES: Omit<MessageTemplate, 'id'>[] = [
  {
    title: 'Boas-vindas - Primeiro Contato',
    category: 'Apresentação',
    text: `Olá! 👋 Sou o(a) responsável pelo Suporte Empreendedor.

É um prazer atender você! Sou especializado em ajudar Microempreendedores Individuais (MEI) a resolver questões burocráticas de forma simples e rápida.

Como posso ajudá-lo(a) hoje? 😊`,
    usageCount: 0
  },
  {
    title: 'Abertura de MEI - Informações',
    category: 'Serviços',
    text: `Ótimo interesse na abertura do MEI! 🎉

Para formalizarmos seu negócio, preciso dos seguintes documentos:
• CPF titular
• Título de eleitor ou comprovante de votação
• Comprovante de endereço
• Número de celular com WhatsApp
• E-mail válido

O valor do serviço é R$ 97,00 (honorários) e o prazo é de 3 a 5 dias úteis. Taxas governamentais são isentas para abertura!

Quer que eu envie o link do formulário?`,
    usageCount: 0
  },
  {
    title: 'DASN - Declaração Anual',
    category: 'Serviços',
    text: `Olá! Tudo bem? 🗓️

O prazo para entrega da DASN (Declaração Anual do MEI) termina em 31 de maio!

Se precisar de ajuda para fazer sua declaração, nosso serviço custa apenas R$ 67,00 e garantimos que tudo fiquecerto para evitar multas.

Posso ajudar você com isso?`,
    usageCount: 0
  },
  {
    title: 'Parcelamento de Débitos',
    category: 'Serviços',
    text: `Olá! Entendo sua situação sobre os débitos do MEI. 😟

É possível parcelar débitos em até 60 vezes (mínimo R$ 28,74 por parcela). O valor do serviço de parcelamento é R$ 127,00.

Para fazer a análise, preciso de:
• CPF do titular
• CNPJ do MEI
• Comprovantes de débitos existentes

Posso ajudá-lo(a) a regularizar!`,
    usageCount: 0
  },
  {
    title: 'Confirmação de Pagamento',
    category: 'Financeiro',
    text: `Recebemos seu pagamento! ✅

Obrigado pela confiança em nosso trabalho. 😄

Seu serviço já está em processo e em breve entraremos em contato com o andamento.

Fique atento(a) ao WhatsApp para qualquer atualização!

Qualquer dúvida, é só chamar!`,
    usageCount: 0
  },
  {
    title: 'Follow-up - Retorno',
    category: 'Suporte',
    text: `Olá! 👋

Estou retornando nosso atendimento.

Percebi que você demonstrou interesse em nossos serviços para MEI. Gostaria de esclarecer alguma dúvida ou lanjutar com o agendamento?

Estamos à disposição para ajudar você a formalizar ou resolver questões do seu negócio!`,
    usageCount: 0
  },
  {
    title: 'Lembrete de Vencimento DAS',
    category: 'Suporte',
    text: `Olá! ⚠️ Lembrete importante:

O boleto do DAS (R$ 75,00 este mês) vence no dia 20.

Manter os pagamentos em dia é essencial para:
✅ Não perder benefícios do MEI
✅ Evitar multas e juros
✅ Manter o CNPJ ativo

Posso ajudá-lo(a) de alguma forma?`,
    usageCount: 0
  },
  {
    title: 'Agradecimento - Pós-atendimento',
    category: 'Retenção',
    text: `Obrigado pela preferência! 🙏

Foi um prazer ajudá-lo(a) com seu MEI!

Lembre-se que estamos aqui para qualquer dúvida futura:
• Alterações cadastrais
• Declaração anual (DASN)
• Parcelamentos
• Consultas de situação

Recomende-nos a outros empreendedores! Compartilhe nosso contato. 😊

Um abraço e sucesso no seu negócio!`,
    usageCount: 0
  },
  {
    title: 'Envio de Comprovante',
    category: 'Serviços',
    text: `Segue o comprovante do serviço solicitado: 📄

 تمام! Seu documento está pronto.

Qualquer dúvida sobre o conteúdo, é só perguntar!

Estamos à disposição para próximos atendimentos.`,
    usageCount: 0
  },
  {
    title: 'Verificação de Situação CNPJ',
    category: 'Serviços',
    text: `Olá! 📊

Realizei a consulta de situação do seu CNPJ e aqui está o resultado:

📍 Status: ATIVO/INAPTO/SUSPENSO
📍 Débitos: SIM/NÃO
📍 Pendências: (se houver)

Para regularizar ou esclarecer detalhes, posso ajudar!

Valor do serviço: R$ 47,00 (consulta completa)`,
    usageCount: 0
  }
];

export function renderMensagensPage(container: HTMLElement) {
  let templates: MessageTemplate[] = [];
  let editingTemplate: MessageTemplate | null = null;

  function render() {
    container.innerHTML = `
      <div class="p-8 lg:p-12 space-y-12 max-w-[1400px] mx-auto animate-fade-in">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Templates de Resposta</h1>
            <p class="text-slate-500 font-medium font-inter">Agilidade no atendimento com modelos padronizados.</p>
          </div>
          <button id="btn-open-tpl-modal" class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Novo Template</button>
        </div>

        <!-- Search & Filters -->
        <div class="relative group max-w-xl">
          <input type="text" id="search-templates" placeholder="Filtrar por título ou conteúdo..." 
            class="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 text-sm text-slate-700 focus:border-[#F18825] shadow-sm outline-none transition-all placeholder:text-slate-400 font-medium font-inter">
          <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F18825]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <!-- Templates Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="templates-grid">
           ${templates.length === 0 ? `
             <div class="col-span-full space-y-8">
                <div class="text-center py-8">
                   <p class="text-slate-400 font-bold">Nenhum template cadastrado ainda.</p>
                   <p class="text-slate-400 text-sm mt-2">Escolha um modelo abaixo para começar:</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   ${SUGGESTED_TEMPLATES.map((tpl, idx) => `
                     <div class="bg-white p-6 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-[#125133]/50 transition-all group">
                        <div class="flex items-center justify-between mb-3">
                           <span class="px-2 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-100 rounded-full">${tpl.category}</span>
                           <button class="text-[10px] font-black text-[#125133] uppercase tracking-widest hover:underline btn-add-suggested" data-idx="${idx}">+ Adicionar</button>
                        </div>
                        <h3 class="text-sm font-black text-slate-900 mb-2">${tpl.title}</h3>
                        <p class="text-xs text-slate-500 leading-relaxed line-clamp-3">${tpl.text}</p>
                     </div>
                   `).join('')}
                </div>
             </div>
           ` : templates.map((tpl) => `
             <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col justify-between hover:border-[#F18825]/20 transition-all group template-card" data-id="${tpl.id}">
                <div class="space-y-4">
                   <div class="flex items-center justify-between">
                      <span class="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-100 rounded-full">${tpl.category}</span>
                      <div class="flex items-center gap-2">
                        <button class="p-2 text-slate-300 hover:text-[#125133] transition-colors btn-copy" data-text="${tpl.text}">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                        </button>
                      </div>
                   </div>
                   <h3 class="text-sm font-black text-slate-900 leading-tight">${tpl.title}</h3>
                   <p class="text-xs text-slate-500 leading-relaxed font-medium line-clamp-4 min-h-[4rem] font-inter">${tpl.text}</p>
                </div>
                
                <div class="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                   <span class="text-[10px] text-slate-300 font-bold uppercase tracking-tight">Utilizado ${tpl.usageCount || 0}x</span>
                   <div class="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="text-[10px] font-black text-[#125133] uppercase tracking-widest hover:underline btn-edit" data-id="${tpl.id}">Editar</button>
                      <button class="text-[10px] font-black text-red-400 uppercase tracking-widest hover:underline btn-delete" data-id="${tpl.id}">Excluir</button>
                   </div>
                </div>
             </div>
           `).join('')}
        </div>
      </div>

      <!-- Modal: Editor de Template -->
      <div id="modal-template" class="fixed inset-0 z-[100] flex items-center justify-center p-6 hidden">
         <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm modal-overlay"></div>
         <div class="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 relative z-10 shadow-2xl animate-fade-in">
            <h3 class="text-xl font-black text-slate-900 mb-8 tracking-tight" id="modal-title">Novo Template</h3>
            <form id="form-template" class="space-y-6">
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título</label>
                     <input type="text" name="title" required class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] font-bold text-slate-800">
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                     <select name="category" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] text-xs font-bold text-slate-800">
                        <option value="Apresentação">Apresentação</option>
                        <option value="Serviços">Serviços</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Retenção">Retenção</option>
                     </select>
                  </div>
               </div>
               <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Conteúdo da Mensagem</label>
                  <textarea name="text" required rows="6" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] text-sm font-medium text-slate-700 font-inter resize-none"></textarea>
               </div>
               <div class="pt-6 flex gap-3">
                  <button type="button" class="flex-grow py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest modal-close">Cancelar</button>
                  <button type="submit" class="flex-grow py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#125133]/20">Salvar Template</button>
               </div>
            </form>
         </div>
      </div>
    `;

    // --- Events ---
    $('#btn-open-tpl-modal')?.addEventListener('click', () => {
       editingTemplate = null;
       const form = $('#form-template') as HTMLFormElement;
       form.reset();
       $('#modal-title')!.textContent = 'Novo Template';
       $('#modal-template')?.classList.remove('hidden');
    });

    // Add suggested templates
    container.querySelectorAll('.btn-add-suggested').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const idx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-idx') || '0');
        const suggested = SUGGESTED_TEMPLATES[idx];
        if (suggested) {
          await crmService.saveTemplate(suggested);
        }
      });
    });

    container.querySelectorAll('.modal-overlay, .modal-close').forEach(el => {
       el.addEventListener('click', () => $('#modal-template')?.classList.add('hidden'));
    });

    $('#form-template')?.addEventListener('submit', async (e) => {
       e.preventDefault();
       const form = e.target as HTMLFormElement;
       const formData = new FormData(form);
       const data = {
         title: formData.get('title') as string,
         category: formData.get('category') as string,
         text: formData.get('text') as string,
         usageCount: editingTemplate ? editingTemplate.usageCount : 0
       };
       await crmService.saveTemplate(data, editingTemplate?.id);
       $('#modal-template')?.classList.add('hidden');
    });

    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
         const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
         const tpl = templates.find(t => t.id === id);
         if (tpl) {
            editingTemplate = tpl;
            const form = $('#form-template') as HTMLFormElement;
            (form.elements.namedItem('title') as HTMLInputElement).value = tpl.title;
            (form.elements.namedItem('category') as HTMLSelectElement).value = tpl.category;
            (form.elements.namedItem('text') as HTMLTextAreaElement).value = tpl.text;
            $('#modal-title')!.textContent = 'Editar Template';
            $('#modal-template')?.classList.remove('hidden');
         }
      });
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
         const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
         if (id && confirm('Deseja excluir este template permanentemente?')) {
            await crmService.deleteTemplate(id);
         }
      });
    });

    // Copy Logic
    container.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = (e.currentTarget as HTMLElement).getAttribute('data-text');
        if (text) {
          navigator.clipboard.writeText(text);
          const icon = (e.currentTarget as HTMLElement).querySelector('svg');
          if (icon) {
             const original = icon.innerHTML;
             icon.innerHTML = '<path d="M5 13l4 4L19 7"></path>';
             (e.currentTarget as HTMLElement).classList.add('text-emerald-500');
             setTimeout(() => {
                icon.innerHTML = original;
                (e.currentTarget as HTMLElement).classList.remove('text-emerald-500');
             }, 2000);
          }
        }
      });
    });

    // Search Logic
    $('#search-templates')?.addEventListener('input', (e) => {
      const term = (e.target as HTMLInputElement).value.toLowerCase();
      document.querySelectorAll('.template-card').forEach(card => {
         const content = card.textContent?.toLowerCase() || '';
         (card as HTMLElement).style.display = content.includes(term) ? 'flex' : 'none';
      });
    });
  }

  // Subscribe to real-time data
  const unsubscribe = crmService.subscribeToTemplates((updatedTemplates) => {
    templates = updatedTemplates;
    render();
  });

  // Cleanup on unmount
  (container as any)._cleanup = unsubscribe;

  render();
}
