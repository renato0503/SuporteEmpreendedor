import { $ } from '../../utils/dom';

export function renderMensagensPage(container: HTMLElement) {
  const templates = [
    { 
      category: 'Apresentação', 
      title: 'Saudação Inicial', 
      text: 'Olá! Recebemos seu interesse no Suporte Empreendedor. Como podemos ajudar com sua MEI hoje?' 
    },
    { 
      category: 'Serviços', 
      title: 'Abertura de MEI', 
      text: 'Para abrir sua MEI, precisaremos de: RG, CPF, Título de Eleitor e comprovante de endereço. O prazo médio é de 24 horas úteis.' 
    },
    { 
      category: 'Serviços', 
      title: 'Declaração DASN', 
      text: 'A Declaração Anual deve ser entregue até maio. Podemos regularizar sua situação hoje mesmo por apenas R$ 67,00.' 
    },
    { 
      category: 'Financeiro', 
      title: 'Dados para PIX', 
      text: 'Pode realizar o pagamento via PIX para a chave CNPJ: 46.965.600/0001-95 (Inova Tech Consultoria). Após o envio, favor mandar o comprovante.' 
    },
    { 
      category: 'Retenção', 
      title: 'Follow-up (24h)', 
      text: 'Olá! Passando para saber se conseguiu ver as informações que enviamos. Alguma dúvida sobre o processo?' 
    },
    { 
      category: 'Suporte', 
      title: 'Dúvidas Técnicas', 
      text: 'Nossa equipe técnica já está analisando seu caso. Em até 2 horas retornaremos com o protocolo final.' 
    },
    { 
      category: 'Encerramento', 
      title: 'Feedback Conclusão', 
      text: 'Seu serviço foi concluído com sucesso! Pode validar no portal do empreendedor. Ficamos à disposição!' 
    },
    { 
      category: 'Documentos', 
      title: 'Solicitação de IRPF', 
      text: 'Olá! Para sua declaração de renda, além dos dados da MEI, precisaremos de cópia do IRPF do ano anterior (se houver).' 
    }
  ];

  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-12 max-w-[1400px] mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Templates de Resposta</h1>
          <p class="text-slate-500 font-medium font-inter">Agilidade no atendimento com modelos padronizados.</p>
        </div>
        <button id="btn-new-template" class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform">Novo Template</button>
      </div>

      <!-- Search & Filters -->
      <div class="relative group max-w-xl">
        <input type="text" id="search-templates" placeholder="Filtrar por título ou conteúdo..." 
          class="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 text-sm text-slate-700 focus:border-[#F18825] shadow-sm outline-none transition-all placeholder:text-slate-400 font-medium">
        <svg class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F18825]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <!-- Templates Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="templates-grid">
         ${templates.map((tpl, i) => `
           <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col justify-between hover:border-[#125133]/20 transition-all group template-card" data-index="${i}">
              <div class="space-y-4">
                 <div class="flex items-center justify-between">
                    <span class="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-100 rounded-full">${tpl.category}</span>
                    <button class="p-2 text-slate-300 hover:text-[#125133] transition-colors btn-copy" data-text="${tpl.text}">
                       <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                    </button>
                 </div>
                 <h3 class="text-sm font-black text-slate-900 leading-tight">${tpl.title}</h3>
                 <p class="text-xs text-slate-500 leading-relaxed font-medium line-clamp-4 min-h-[4rem]">${tpl.text}</p>
              </div>
              
              <div class="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                 <span class="text-[10px] text-slate-300 font-bold uppercase tracking-tight">Utilizado 12x hoje</span>
                 <button class="text-[10px] font-black text-[#125133] uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-opacity btn-edit">Editar</button>
              </div>
           </div>
         `).join('')}
      </div>
    </div>
  `;

  // Logic: Search
  $('#search-templates')?.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    document.querySelectorAll('.template-card').forEach(card => {
       const text = card.textContent?.toLowerCase() || '';
       if (text.includes(term)) {
         (card as HTMLElement).style.display = 'flex';
       } else {
         (card as HTMLElement).style.display = 'none';
       }
    });
  });

  // Logic: New Template
  $('#btn-new-template')?.addEventListener('click', () => {
    alert('Função: Abrindo editor de novo template...');
  });

  // Logic: Edit
  document.querySelectorAll('.btn-edit').forEach(btn => {
     btn.addEventListener('click', () => {
        alert('Carregando editor para este template...');
     });
  });

  // Logic: Copy
  document.querySelectorAll('.btn-copy').forEach(btn => {
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
}
