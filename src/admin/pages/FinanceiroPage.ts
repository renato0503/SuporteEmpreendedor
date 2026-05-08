import { renderKPICard } from '../components/KPICard';
import { $ } from '../../utils/dom';
import { openLeadFormModal } from '../components/LeadFormModal';
import { loadServicePrices } from '../../utils/priceService';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../firebase';

interface FinancialTransaction {
  id?: string;
  type: 'receita' | 'custo' | 'despesa' | 'retirada';
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt?: any;
}

interface MonthOption {
  value: string;
  label: string;
}

function getMonths(): MonthOption[] {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const currentYear = new Date().getFullYear();
  
  return months.map((label, index) => ({
    value: `${currentYear}-${String(index + 1).padStart(2, '0')}`,
    label: `${label} ${currentYear}`
  })).reverse();
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getCurrentQuarter(): number {
  return Math.floor(new Date().getMonth() / 3) + 1;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
}

const categories = {
  receita: ['Prestação de Serviços', 'Honorários', 'Outras Receitas'],
  custo: ['Insumos', 'Terceiros', 'Impostos', 'Comissões'],
  despesa: ['Aluguel', 'Luz/Água/Internet', 'Software/Assinaturas', 'Marketing', 'Telefone', 'Material de Escritório', 'Contador', 'Outros'],
  retirada: ['Pró-labore', 'Distribuição de Lucros', 'Retirada Pessoal']
};

export async function renderFinanceiroPage(container: HTMLElement) {
  const prices = await loadServicePrices();
  const kpis = { ...await (await import('../services/leadService')).leadService.getDashboardKPIs(), totalLeads: 12 };
  const currentMonth = getCurrentMonth();
  const months = getMonths();
  const currentQuarter = getCurrentQuarter();
  
  // Fetch transactions from Firestore
  let transactions: FinancialTransaction[] = [];
  try {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FinancialTransaction));
  } catch (e) {
    console.log('No transactions found, using empty list');
  }

  // Filter functions
  const filterByMonth = (month: string) => {
    return transactions.filter(t => t.date.startsWith(month));
  };
  
  const filterByQuarter = (quarter: number) => {
    const year = new Date().getFullYear();
    const startMonth = (quarter - 1) * 3 + 1;
    return transactions.filter(t => {
      const [tYear, tMonth] = t.date.split('-').map(Number);
      return tYear === year && tMonth >= startMonth && tMonth < startMonth + 3;
    });
  };
  
  const filterByYear = (year: number) => {
    return transactions.filter(t => t.date.startsWith(String(year)));
  };

  const calculateTotals = (filteredTransactions: FinancialTransaction[]) => {
    const receitas = filteredTransactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + t.amount, 0);
    const custos = filteredTransactions.filter(t => t.type === 'custo').reduce((sum, t) => sum + t.amount, 0);
    const despesas = filteredTransactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + t.amount, 0);
    const retiradas = filteredTransactions.filter(t => t.type === 'retirada').reduce((sum, t) => sum + t.amount, 0);
    
    const lucroBruto = receitas - custos;
    const lucroLiquido = lucroBruto - despesas - retiradas;
    const margem = receitas > 0 ? ((lucroLiquido / receitas) * 100) : 0;
    
    return { receitas, custos, despesas, retiradas, lucroBruto, lucroLiquido, margem };
  };

  container.innerHTML = `
    <div class="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto animate-fade-in pb-20">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Gestão Financeira</h1>
          <p class="text-slate-500 font-medium">Controle de custos, despesas, receitas e fluxo de caixa.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-print-dre" class="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Imprimir DRE
          </button>
          <button id="btn-new-transaction" class="px-6 py-3 bg-[#125133] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#125133]/20 hover:scale-105 transition-transform flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
            Nova Transação
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Período:</label>
            <select id="period-filter" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:border-[#125133] outline-none cursor-pointer">
              <option value="month">Mensal</option>
              <option value="quarter">Trimestral</option>
              <option value="year">Anual</option>
            </select>
          </div>
          
          <div id="month-filter-container" class="flex items-center gap-2">
            <select id="month-select" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:border-[#125133] outline-none cursor-pointer">
              ${months.map(m => `
                <option value="${m.value}" ${m.value === currentMonth ? 'selected' : ''}>${m.label}</option>
              `).join('')}
            </select>
          </div>
          
          <div id="quarter-filter-container" class="hidden flex items-center gap-2">
            <select id="quarter-select" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:border-[#125133] outline-none cursor-pointer">
              ${[1,2,3,4].map(q => `
                <option value="${q}" ${q === currentQuarter ? 'selected' : ''}>${q}º Trimestre ${new Date().getFullYear()}</option>
              `).join('')}
            </select>
          </div>
          
          <div id="year-filter-container" class="hidden flex items-center gap-2">
            <select id="year-select" class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 focus:border-[#125133] outline-none cursor-pointer">
              ${[2024, 2025, 2026].map(y => `
                <option value="${y}" ${y === new Date().getFullYear() ? 'selected' : ''}>${y}</option>
              `).join('')}
            </select>
          </div>
          
          <span class="text-xs text-slate-400 ml-auto" id="transaction-count">${transactions.length} transações</span>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4" id="summary-cards">
        <!-- Cards rendered by JS -->
      </div>

      <!-- Transactions Table -->
      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-black text-slate-900">Transações Recentes</h3>
          <div class="flex gap-2">
            <button class="filter-type-btn px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-[#125133] text-white" data-type="all">Todas</button>
            <button class="filter-type-btn px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" data-type="receita">Receitas</button>
            <button class="filter-type-btn px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600" data-type="custo">Custos</button>
            <button class="filter-type-btn px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600" data-type="despesa">Despesas</button>
            <button class="filter-type-btn px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-purple-50 hover:text-purple-600" data-type="retirada">Retiradas</button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50">
                <th class="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Data</th>
                <th class="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipo</th>
                <th class="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Categoria</th>
                <th class="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Descrição</th>
                <th class="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Valor</th>
                <th class="px-6 py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Ações</th>
              </tr>
            </thead>
            <tbody id="transactions-body" class="divide-y divide-slate-100">
              <!-- Rows rendered by JS -->
            </tbody>
          </table>
        </div>
        
        <div id="empty-state" class="p-12 text-center ${transactions.length > 0 ? 'hidden' : ''}">
          <svg class="w-16 h-16 mx-auto text-slate-200" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p class="text-slate-400 font-bold mt-4">Nenhuma transação encontrada</p>
          <p class="text-slate-300 text-sm">Clique em "Nova Transação" para adicionar</p>
        </div>
      </div>
    </div>

    <!-- Transaction Modal -->
    <div id="transaction-modal" class="fixed inset-0 z-[100] invisible">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300" id="modal-overlay"></div>
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="bg-white rounded-[2.5rem] w-full max-w-lg p-8 transform translate-y-full transition-transform duration-300" id="modal-content">
          <button id="close-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <h3 class="text-2xl font-black text-slate-900 mb-6">Nova Transação</h3>
          
          <form id="transaction-form" class="space-y-4">
            <div>
              <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Tipo</label>
              <select name="type" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#125133] focus:ring-2 focus:ring-[#125133]/20 outline-none transition-all">
                <option value="">Selecione...</option>
                <option value="receita">💰 Receita</option>
                <option value="custo">📦 Custo</option>
                <option value="despesa">💡 Despesa</option>
                <option value="retirada">🏧 Retirada</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Categoria</label>
              <select name="category" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#125133] focus:ring-2 focus:ring-[#125133]/20 outline-none transition-all">
                <option value="">Selecione o tipo primeiro...</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Descrição</label>
              <input type="text" name="description" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#125133] focus:ring-2 focus:ring-[#125133]/20 outline-none transition-all" placeholder="Ex: Serviço de consultoria para cliente X">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Valor (R$)</label>
                <input type="number" name="amount" step="0.01" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#125133] focus:ring-2 focus:ring-[#125133]/20 outline-none transition-all" placeholder="0,00">
              </div>
              <div>
                <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Data</label>
                <input type="date" name="date" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#125133] focus:ring-2 focus:ring-[#125133]/20 outline-none transition-all">
              </div>
            </div>
            
            <button type="submit" class="w-full bg-[#125133] hover:bg-[#0e422a] text-white font-bold py-4 rounded-xl transition-all mt-4">
              Salvar Transação
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  // State
  let currentFilter = { period: 'month', value: currentMonth };
  let typeFilter = 'all';

  // Update categories when type changes
  const typeSelect = document.querySelector('#transaction-form select[name="type"]') as HTMLSelectElement;
  const categorySelect = document.querySelector('#transaction-form select[name="category"]') as HTMLSelectElement;
  
  typeSelect?.addEventListener('change', () => {
    const type = typeSelect.value;
    const opts = categories[type as keyof typeof categories] || [];
    categorySelect.innerHTML = '<option value="">Selecione...</option>' + 
      opts.map(c => `<option value="${c}">${c}</option>`).join('');
  });

  // Filter handlers
  const periodFilter = $('#period-filter') as HTMLSelectElement;
  const monthFilter = $('#month-select') as HTMLSelectElement;
  const quarterFilter = $('#quarter-select') as HTMLSelectElement;
  const yearFilter = $('#year-select') as HTMLSelectElement;
  
  const updateFilters = () => {
    const period = periodFilter.value;
    document.getElementById('month-filter-container')?.classList.toggle('hidden', period !== 'month');
    document.getElementById('quarter-filter-container')?.classList.toggle('hidden', period !== 'quarter');
    document.getElementById('year-filter-container')?.classList.toggle('hidden', period !== 'year');
    
    currentFilter.period = period;
    if (period === 'month') currentFilter.value = monthFilter.value;
    else if (period === 'quarter') currentFilter.value = quarterFilter.value;
    else currentFilter.value = yearFilter.value;
    
    renderTable();
  };
  
  periodFilter?.addEventListener('change', updateFilters);
  monthFilter?.addEventListener('change', updateFilters);
  quarterFilter?.addEventListener('change', updateFilters);
  yearFilter?.addEventListener('change', updateFilters);

  // Type filter buttons
  document.querySelectorAll('.filter-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-type-btn').forEach(b => {
        b.classList.remove('bg-[#125133]', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-500');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-500');
      btn.classList.add('bg-[#125133]', 'text-white');
      typeFilter = btn.getAttribute('data-type') || 'all';
      renderTable();
    });
  });

  // Render summary and table
  const getFilteredTransactions = () => {
    let filtered = transactions;
    
    if (currentFilter.period === 'month') {
      filtered = filterByMonth(currentFilter.value);
    } else if (currentFilter.period === 'quarter') {
      filtered = filterByQuarter(parseInt(currentFilter.value));
    } else {
      filtered = filterByYear(parseInt(currentFilter.value));
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    return filtered;
  };

  const renderTable = () => {
    const filtered = getFilteredTransactions();
    const totals = calculateTotals(filtered);
    
    // Update summary cards
    const summaryCards = $('#summary-cards');
    if (summaryCards) {
      summaryCards.innerHTML = `
        <div class="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Receitas</span>
          <p class="text-2xl font-black text-emerald-700 mt-2">${formatCurrency(totals.receitas)}</p>
          <span class="text-[9px] text-emerald-500">Entradas</span>
        </div>
        <div class="bg-red-50 p-6 rounded-2xl border border-red-100">
          <span class="text-[10px] font-black text-red-600 uppercase tracking-widest">Custos</span>
          <p class="text-2xl font-black text-red-700 mt-2">${formatCurrency(totals.custos)}</p>
          <span class="text-[9px] text-red-500">Gastos diretos</span>
        </div>
        <div class="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <span class="text-[10px] font-black text-orange-600 uppercase tracking-widest">Despesas + Retiradas</span>
          <p class="text-2xl font-black text-orange-700 mt-2">${formatCurrency(totals.despesas + totals.retiradas)}</p>
          <span class="text-[9px] text-orange-500">Gastos operacionais</span>
        </div>
        <div class="bg-[#125133] p-6 rounded-2xl border border-[#125133]">
          <span class="text-[10px] font-black text-[#F18825] uppercase tracking-widest">Lucro Líquido</span>
          <p class="text-2xl font-black text-white mt-2">${formatCurrency(totals.lucroLiquido)}</p>
          <span class="text-[9px] text-white/60">Margem: ${totals.margem.toFixed(1)}%</span>
        </div>
      `;
    }
    
    // Update table
    const tbody = $('#transactions-body');
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-slate-400">Nenhuma transação neste período</td></tr>';
      } else {
        tbody.innerHTML = filtered.map(t => {
          const typeColors: Record<string, { bg: string, text: string, label: string }> = {
            receita: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Receita' },
            custo: { bg: 'bg-red-50', text: 'text-red-600', label: 'Custo' },
            despesa: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Despesa' },
            retirada: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Retirada' }
          };
          const colors = typeColors[t.type] || typeColors.receita;
          
          return `
            <tr class="hover:bg-slate-50 transition-all">
              <td class="px-6 py-4 text-sm font-bold text-slate-600">${formatDate(t.date)}</td>
              <td class="px-6 py-4"><span class="px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${colors.bg} ${colors.text}">${colors.label}</span></td>
              <td class="px-6 py-4 text-sm text-slate-500">${t.category}</td>
              <td class="px-6 py-4 text-sm font-medium text-slate-700">${t.description}</td>
              <td class="px-6 py-4 text-right font-bold ${t.type === 'receita' ? 'text-emerald-600' : 'text-slate-700'}">${t.type === 'receita' ? '+' : '-'}${formatCurrency(t.amount)}</td>
              <td class="px-6 py-4 text-center">
                <button class="delete-transaction p-2 text-slate-300 hover:text-red-500 transition-colors" data-id="${t.id}">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
    
    // Update count
    const countEl = $('#transaction-count');
    if (countEl) countEl.textContent = `${filtered.length} transações`;
  };

  renderTable();

  // Modal handlers
  const modal = document.getElementById('transaction-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  
  const openModal = () => {
    modal?.classList.remove('invisible');
    setTimeout(() => {
      modalOverlay?.classList.replace('opacity-0', 'opacity-100');
      modalContent?.classList.replace('translate-y-full', 'translate-y-0');
    }, 10);
    // Set default date to today
    const dateInput = document.querySelector('#transaction-form input[name="date"]') as HTMLInputElement;
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
  };
  
  const closeModal = () => {
    modalOverlay?.classList.replace('opacity-100', 'opacity-0');
    modalContent?.classList.replace('translate-y-0', 'translate-y-full');
    setTimeout(() => modal?.classList.add('invisible'), 300);
  };

  $('#btn-new-transaction')?.addEventListener('click', openModal);
  document.getElementById('close-modal')?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // Delete handlers
  document.querySelectorAll('.delete-transaction').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (id && confirm('Excluir esta transação?')) {
        try {
          await deleteDoc(doc(db, 'transactions', id));
          transactions = transactions.filter(t => t.id !== id);
          renderTable();
        } catch (e) {
          console.error('Error deleting:', e);
        }
      }
    });
  });

  // Form submit
  $('#transaction-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const transaction: Omit<FinancialTransaction, 'id'> = {
      type: formData.get('type') as FinancialTransaction['type'],
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      createdAt: new Date()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'transactions'), transaction);
      transactions.unshift({ ...transaction, id: docRef.id });
      closeModal();
      form.reset();
      renderTable();
    } catch (err) {
      console.error('Error saving:', err);
      alert('Erro ao salvar transação');
    }
  });

  // Print DRE
  $('#btn-print-dre')?.addEventListener('click', () => {
    const filtered = getFilteredTransactions();
    const totals = calculateTotals(filtered);
    const periodLabel = currentFilter.period === 'month' 
      ? months.find(m => m.value === currentFilter.value)?.label 
      : currentFilter.period === 'quarter' 
        ? `${currentFilter.value}º Trimestre`
        : currentFilter.value;
    
    const dreContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DRE - ${periodLabel}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #125133; font-size: 24px; }
    h2 { color: #666; font-size: 14px; margin-bottom: 30px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #125133; color: white; font-size: 12px; text-transform: uppercase; }
    .positive { color: #22c55e; }
    .negative { color: #ef4444; }
    .header { text-align: center; margin-bottom: 30px; }
    .period { background: #F18825; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Suporte Empreendedor</h1>
    <h2>INOVA TECH CONSULTORIA</h2>
    <div class="period">${periodLabel}</div>
  </div>
  <h3>DEMONSTRAÇÃO DE RESULTADO</h3>
  <table>
    <tr><th>Descrição</th><th style="text-align:right">Valor</th></tr>
    <tr><td><strong>RECEITA BRUTA</strong></td><td style="text-align:right"><strong>${formatCurrency(totals.receitas)}</strong></td></tr>
    <tr><td>(-) CUSTOS</td><td style="text-align:right">(${formatCurrency(totals.custos)})</td></tr>
    <tr style="background:#f5f5f5"><td><strong>= LUCRO BRUTO</strong></td><td style="text-align:right"><strong>${formatCurrency(totals.lucroBruto)}</strong></td></tr>
    <tr><td>(-) DESPESAS OPERACIONAIS</td><td style="text-align:right">(${formatCurrency(totals.despesas)})</td></tr>
    <tr><td>(-) RETIRADAS</td><td style="text-align:right">(${formatCurrency(totals.retiradas)})</td></tr>
    <tr style="background:#125133; color:white"><td><strong>= LUCRO LÍQUIDO</strong></td><td style="text-align:right"><strong>${formatCurrency(totals.lucroLiquido)}</strong></td></tr>
    <tr><td><strong>MARGEM</strong></td><td style="text-align:right"><strong>${totals.margem.toFixed(1)}%</strong></td></tr>
  </table>
  <p style="margin-top:30px;font-size:10px;color:#999">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
</body>
</html>`;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(dreContent);
      printWindow.document.close();
      printWindow.print();
    }
  });
}