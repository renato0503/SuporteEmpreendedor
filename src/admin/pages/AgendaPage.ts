import { $ } from '../../utils/dom';
import { crmService } from '../services/crmService';
import { Task } from '../types/admin.types';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getGoogleCalendarLink, downloadICS, generateICSWithEmail, openEmailWithICS } from '../../utils/calendarUtils';
import { isHoliday, isComemorativeDate, Holiday, COMMEMORATIVE_DATES, HOLIDAYS_2025 } from '../../utils/holidays';

const CATEGORIES = ['Assessoria', 'Comercial', 'Financeiro', 'Configuração'];

export function renderAgendaPage(container: HTMLElement) {
  let tasks: Task[] = [];
  let currentMonth = new Date();
  let selectedDate = new Date();
  let filterCategory: string = 'todas';
  let filterStatus: string = 'todas';
  let viewMode: 'calendar' | 'list' = 'calendar';
  let deleteTaskId: string | null = null;

  function render() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    let filteredTasks = tasks.filter(t => isSameDay(parseISO(t.date), selectedDate));

    if (filterCategory !== 'todas') {
      filteredTasks = filteredTasks.filter(t => t.category === filterCategory);
    }
    if (filterStatus !== 'todas') {
      filteredTasks = filteredTasks.filter(t => t.status === filterStatus);
    }

    const pendingTasks = filteredTasks.filter(t => t.status === 'pendente');
    const completedTasks = filteredTasks.filter(t => t.status === 'concluido');
    
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth() + 1;
    const monthHolidays = HOLIDAYS_2025.filter(h => {
      const [, month, day] = h.date.split('-').map(Number);
      return month === currentMonthNum;
    });
    const monthComemoratives = COMMEMORATIVE_DATES.filter(c => c.month === currentMonthNum);

    container.innerHTML = `
      <div class="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto animate-fade-in h-full flex flex-col pb-24">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
          <div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight">Agenda Operacional</h1>
            <p class="text-slate-700 font-medium">Gestão inteligente de prazos e follow-ups estratégicos.</p>
          </div>
          
          <div class="flex items-center gap-4 text-[10px]">
             <div class="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-xl border border-red-100">
                <div class="w-2 h-2 rounded-full bg-red-500"></div>
                <span class="font-bold text-red-700">Feriados</span>
             </div>
             <div class="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl border border-amber-100">
                <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                <span class="font-bold text-amber-700">Datas Comemorativas</span>
             </div>
          </div>
<div class="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
             ${viewMode === 'calendar' ? `
               <button id="cal-prev" class="p-4 hover:bg-slate-50 text-slate-400 hover:text-[#125133] rounded-xl transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
               </button>
               <div class="px-6 py-3 bg-slate-50 rounded-xl">
                  <span class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">${format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</span>
               </div>
               <button id="cal-next" class="p-4 hover:bg-slate-50 text-slate-400 hover:text-[#125133] rounded-xl transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
               </button>
               <button id="btn-today" class="px-4 py-2 text-[10px] font-black text-[#125133] uppercase tracking-widest hover:bg-[#125133]/5 rounded-xl transition-all">Hoje</button>
             ` : ''}
             <button id="btn-toggle-view" class="p-3 ${viewMode === 'calendar' ? 'bg-[#125133] text-white' : 'bg-slate-50 text-[#125133]'} hover:opacity-80 rounded-xl transition-all" title="${viewMode === 'calendar' ? 'Modo Lista' : 'Modo Calendário'}">
                ${viewMode === 'calendar' 
                  ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>`
                  : `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
                }
             </button>
           </div>
        </div>

        <div class="grid ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-4'} gap-8 flex-grow overflow-hidden">
          ${viewMode === 'calendar' ? `
          <!-- Calendar Grid -->
          <div class="xl:col-span-3 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col h-full overflow-hidden relative">
             <div class="absolute top-0 right-0 w-64 h-64 bg-[#125133]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             
             <div class="grid grid-cols-7 gap-2 mb-6 relative z-10">
                 ${daysOfWeek.map(d => `<div class="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] text-center">${d}</div>`).join('')}
             </div>
             
<div class="grid grid-cols-7 gap-2 flex-grow overflow-y-auto pr-1 relative z-10 scrollbar-hide">
                  ${calendarDays.map(date => {
                    const dayTasks = tasks.filter(t => isSameDay(parseISO(t.date), date));
                    const pendingCount = dayTasks.filter(t => t.status === 'pendente').length;
                    const completedCount = dayTasks.filter(t => t.status === 'concluido').length;
                    const isSelected = isSameDay(date, selectedDate);
                    const isCurrentMonth = isSameMonth(date, currentMonth);
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const holiday = isHoliday(dateStr);
                    const commemorative = isComemorativeDate(date);
                    
                    const isFeriado = holiday && (holiday.type === 'federal' || holiday.type === 'estadual');
                    const isDataComemorativa = !holiday && commemorative;
                    
                    let dayClasses = 'calendar-day aspect-square rounded-2xl border ';
                    if (isSelected) dayClasses += 'border-[#125133] bg-[#125133]/10 shadow-lg shadow-[#125133]/20';
                    else if (isFeriado) dayClasses += 'bg-red-50 border-red-200';
                    else if (isDataComemorativa) dayClasses += 'bg-amber-50 border-amber-200';
                    else if (isCurrentMonth) dayClasses += 'bg-slate-50 border-slate-100';
                    else dayClasses += 'bg-transparent border-transparent opacity-20';

                    return `
                     <div class="${dayClasses} p-2 hover:border-[#125133]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col gap-1 relative" data-date="${dateStr}" title="${holiday ? holiday.name : commemorative ? commemorative.name : ''}">
                        <div class="flex items-center justify-between">
                           <span class="text-sm font-black ${isToday(date) ? 'text-[#F18825]' : isSelected ? 'text-[#125133]' : isFeriado ? 'text-red-600' : isDataComemorativa ? 'text-amber-600' : 'text-slate-800'}">${format(date, 'd')}</span>
                           ${isFeriado ? '<span class="text-[6px] font-black text-red-500 uppercase">FERIADO</span>' : ''}
                           ${isDataComemorativa ? '<span data-type="comemorativa" class="text-[6px] font-black text-amber-600 uppercase">DATA</span>' : ''}
                        </div>
                        
                        <div class="flex flex-wrap gap-1 mt-auto">
                           ${pendingCount > 0 ? `<div class="w-2 h-2 rounded-full bg-[#F18825]"></div>` : ''}
                           ${completedCount > 0 ? `<div class="w-2 h-2 rounded-full bg-emerald-400"></div>` : ''}
                           ${dayTasks.length > 2 ? `<span class="text-[7px] font-black text-slate-400">+${dayTasks.length - 2}</span>` : ''}
                        </div>
                        
                        ${isSelected ? `<div class="absolute top-1 right-1 w-1.5 h-1.5 bg-[#125133] rounded-full animate-ping"></div>` : ''}
                        ${holiday ? `<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"></div>` : ''}
                     </div>
                   `;
                  }).join('')}
              </div>
          </div>
          ` : `
          <!-- List View -->
          <div class="xl:col-span-4 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col h-full overflow-hidden relative">
             <div class="absolute top-0 right-0 w-64 h-64 bg-[#125133]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             
             <div class="flex items-center justify-between mb-8 relative z-10">
                <h3 class="text-lg font-black text-slate-900 tracking-tight">Todos os Compromissos</h3>
                <span class="text-xs font-black text-slate-400 uppercase tracking-widest">${tasks.length} registro${tasks.length !== 1 ? 's' : ''}</span>
             </div>
             
             <div class="space-y-3 overflow-y-auto pr-2 relative z-10">
                ${tasks.length === 0 ? `
                  <div class="flex flex-col items-center justify-center py-20 text-center space-y-3 opacity-40">
                     <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                     </div>
                     <p class="text-xs font-black uppercase tracking-widest text-slate-400">Nenhum compromisso agendado.</p>
                  </div>
                ` : `
                  ${tasks.sort((a, b) => {
                    const dateA = new Date(a.date + 'T' + a.time);
                    const dateB = new Date(b.date + 'T' + b.time);
                    return dateA.getTime() - dateB.getTime();
                  }).map(task => {
                    const isCompleted = task.status === 'concluido';
                    const taskDate = parseISO(task.date);
                    return `
                      <div class="list-task p-5 bg-slate-50 border ${isCompleted ? 'border-emerald-200' : 'border-slate-100'} rounded-2xl hover:border-[#125133]/20 transition-all group flex items-center gap-4">
                         <div class="w-16 text-center shrink-0">
                            <div class="text-xs font-black ${isToday(taskDate) ? 'text-[#F18825]' : 'text-slate-400'} uppercase tracking-widest">${format(taskDate, 'dd MMM')}</div>
                            <div class="text-[10px] font-black ${isCompleted ? 'text-emerald-500' : 'text-[#F18825]'} uppercase">${task.time}</div>
                         </div>
                         
                         <div class="flex-grow">
                            <div class="flex items-center gap-2 mb-1">
                               <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">${task.category}</span>
                               ${isCompleted ? '<span class="text-[8px] font-black text-emerald-500 uppercase tracking-widest">✓ Concluído</span>' : ''}
                            </div>
                            <p class="text-sm font-black ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}">${task.title}</p>
                         </div>
                         
                         <div class="flex items-center gap-2 shrink-0">
                            <button class="btn-toggle-status-list w-8 h-8 rounded-lg border-2 ${isCompleted ? 'border-emerald-500 bg-emerald-50 text-emerald-500' : 'border-slate-200 bg-white hover:border-emerald-500 hover:text-emerald-500'} transition-all flex items-center justify-center" data-id="${task.id}" data-status="${task.status}" title="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluído'}">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                            </button>
                            <button class="btn-edit-list w-8 h-8 rounded-lg border border-slate-200 bg-white hover:border-[#125133] hover:text-[#125133] transition-all flex items-center justify-center" data-id="${task.id}" title="Editar">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            <button class="btn-delete-list w-8 h-8 rounded-lg border border-slate-200 bg-white hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center" data-id="${task.id}" title="Excluir">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                         </div>
                      </div>
                    `;
                  }).join('')}
                `}
             </div>
          </div>
          `}

          <!-- Selected Day Tasks -->
          <div class="space-y-6 h-full flex flex-col overflow-hidden">
             <div class="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-2xl flex-grow flex flex-col overflow-hidden relative">
                <!-- Filters -->
                <div class="flex flex-col gap-3 mb-6 shrink-0">
                   <div class="flex items-center justify-between">
                      <h3 class="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Compromissos</h3>
                      <p class="text-xl font-black text-slate-900 tracking-tight">${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</p>
                   </div>
                   
                   <div class="flex gap-2">
                      <select id="filter-category" class="flex-1 text-[9px] font-black text-slate-700 uppercase tracking-widest bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#125133]">
                         <option value="todas">Todas as categorias</option>
                         ${CATEGORIES.map(c => `<option value="${c}" ${filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
                      </select>
                      <select id="filter-status" class="flex-1 text-[9px] font-black text-slate-700 uppercase tracking-widest bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#125133]">
                         <option value="todas">Todos</option>
                         <option value="pendente" ${filterStatus === 'pendente' ? 'selected' : ''}>Pendentes</option>
                         <option value="concluido" ${filterStatus === 'concluido' ? 'selected' : ''}>Concluídos</option>
                      </select>
                   </div>
                </div>
                
                <div class="space-y-3 overflow-y-auto pr-2 scrollbar-hide flex-grow">
                  ${filteredTasks.length === 0 ? `
                    <div class="flex flex-col items-center justify-center py-16 text-center space-y-3 opacity-40">
                       <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                       </div>
                       <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Nenhum compromisso</p>
                    </div>
                  ` : `
                    ${pendingTasks.length > 0 ? `
                      <div class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Pendente${pendingTasks.length > 1 ? 's' : ''} (${pendingTasks.length})</div>
                      ${pendingTasks.map(task => renderTaskCard(task, false)).join('')}
                    ` : ''}
                    
                    ${completedTasks.length > 0 ? `
                      <div class="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-2 mt-4">Concluído${completedTasks.length > 1 ? 's' : ''} (${completedTasks.length})</div>
                      ${completedTasks.map(task => renderTaskCard(task, true)).join('')}
                    ` : ''}
                  `}
                </div>
                
                <button id="btn-open-task-modal" class="w-full py-4 bg-[#125133] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] mt-6 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#125133]/20 shrink-0">+ Adicionar Compromisso</button>
             </div>
          </div>
        </div>
      </div>

      <!-- Modal: Novo/Editar Compromisso -->
      <div id="modal-task" class="fixed inset-0 z-[100] flex items-center justify-center p-6 hidden">
         <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md modal-overlay"></div>
         <div class="bg-white w-full max-w-lg rounded-[3rem] p-10 relative z-10 shadow-2xl animate-scale-up border border-slate-100">
            <div class="flex items-center gap-4 mb-8">
               <div class="w-10 h-10 bg-[#125133]/10 text-[#125133] rounded-2xl flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
               </div>
               <div>
                  <h3 class="text-xl font-black text-slate-900 tracking-tight" id="modal-title">Novo Agendamento</h3>
                  <p class="text-xs text-slate-700 font-bold uppercase tracking-widest">Para ${format(selectedDate, 'dd/MM/yyyy')}</p>
               </div>
            </div>

            <form id="form-task" class="space-y-6">
               <input type="hidden" name="task-id" value="">
               <input type="hidden" name="date" value="${format(selectedDate, 'yyyy-MM-dd')}">
               
<div class="space-y-2">
                   <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">O que precisa ser feito?</label>
                   <input type="text" name="title" placeholder="Ex: Reunião de Follow-up" required class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] focus:bg-white font-bold text-slate-800 transition-all text-sm">
                </div>

                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cliente (Nome)</label>
                      <input type="text" name="clientName" placeholder="Nome do cliente" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] focus:bg-white font-bold text-slate-800 transition-all text-sm">
                   </div>
                   <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">E-mail do Cliente</label>
                      <input type="email" name="clientEmail" placeholder="cliente@email.com" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] focus:bg-white font-bold text-slate-800 transition-all text-sm">
                   </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Horário</label>
                     <input type="time" name="time" required class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] focus:bg-white font-bold text-slate-800 transition-all text-sm">
                  </div>
                  <div class="space-y-2">
                     <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Categoria</label>
                     <select name="category" class="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#125133] focus:bg-white text-[10px] font-black text-slate-800 uppercase tracking-widest transition-all">
                        ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
                     </select>
                  </div>
               </div>

               <div class="pt-4 flex gap-3">
                  <button type="button" class="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest modal-close hover:bg-slate-100 transition-all">Cancelar</button>
                  <button type="submit" class="flex-1 py-4 bg-[#125133] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#125133]/20 hover:scale-[1.02] active:scale-95 transition-all">Salvar</button>
               </div>
            </form>
         </div>
      </div>

      <!-- Modal de Confirmação -->
      <div id="modal-confirm" class="fixed inset-0 z-[110] flex items-center justify-center p-6 hidden">
         <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md confirm-overlay"></div>
         <div class="bg-white w-full max-w-sm rounded-[2rem] p-8 relative z-10 shadow-2xl animate-scale-up border border-slate-100">
            <div class="text-center mb-6">
               <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
               </div>
               <h3 class="text-lg font-black text-slate-900">Excluir Compromisso?</h3>
               <p class="text-xs text-slate-700 mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            <div class="flex gap-3">
               <button class="flex-1 py-3 bg-slate-50 text-slate-700 rounded-xl font-black text-[10px] uppercase tracking-widest confirm-cancel hover:bg-slate-100 transition-all">Cancelar</button>
               <button class="flex-1 py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest confirm-delete hover:bg-red-600 transition-all">Excluir</button>
            </div>
         </div>
      </div>
    `;

    attachEvents();
  }

  function renderTaskCard(task: Task, isCompleted: boolean) {
    const statusIcon = isCompleted 
      ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
      : `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    
    return `
      <div class="task-card p-5 bg-slate-50 border ${isCompleted ? 'border-emerald-200' : 'border-slate-100'} rounded-[1.5rem] hover:border-[#125133]/20 transition-all group flex flex-col gap-3 relative overflow-hidden">
         ${isCompleted ? '<div class="absolute inset-0 bg-emerald-500/5"></div>' : ''}
         
         <div class="flex items-start justify-between gap-3 relative z-10">
            <div class="flex-grow">
               <div class="flex items-center gap-2 mb-1">
                  <span class="text-[8px] font-black ${isCompleted ? 'text-emerald-600' : 'text-[#F18825]'} uppercase tracking-widest">${task.time}</span>
                  <div class="w-1 h-1 rounded-full bg-slate-300"></div>
                  <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">${task.category}</span>
               </div>
               <p class="text-xs font-black ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'} leading-tight group-hover:text-[#125133] transition-colors">${task.title}</p>
            </div>
            
            <div class="flex flex-col gap-1 shrink-0">
               <button class="btn-toggle-status w-7 h-7 rounded-lg border-2 ${isCompleted ? 'border-emerald-500 bg-emerald-50 text-emerald-500' : 'border-slate-200 bg-white hover:border-emerald-500 hover:text-emerald-500'} transition-all flex items-center justify-center" data-id="${task.id}" data-status="${task.status}" title="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluído'}">
                  ${statusIcon}
               </button>
            </div>
         </div>
         
<div class="flex items-center gap-2 pt-2 border-t border-slate-200/50 relative z-10">
             <button class="btn-edit flex-1 py-2 bg-white hover:bg-[#125133]/5 text-[8px] font-black text-slate-700 uppercase tracking-widest rounded-lg border border-slate-200 hover:border-[#125133]/30 hover:text-[#125133] transition-all" data-id="${task.id}">Editar</button>
             <button class="btn-sync-google flex-1 py-2 bg-white hover:bg-emerald-50 text-[8px] font-black text-emerald-600 uppercase tracking-widest rounded-lg border border-emerald-100 hover:border-emerald-300 transition-all" data-id="${task.id}">Google</button>
             ${task.clientEmail ? `<button class="btn-send-email flex-1 py-2 bg-white hover:bg-blue-50 text-[8px] font-black text-blue-600 uppercase tracking-widest rounded-lg border border-blue-100 hover:border-blue-300 transition-all" data-id="${task.id}" title="Enviar convite por e-mail">E-mail</button>` : ''}
             <button class="btn-delete w-8 h-8 py-2 bg-white hover:bg-red-50 text-[8px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest rounded-lg border border-slate-200 hover:border-red-300 transition-all flex items-center justify-center" data-id="${task.id}">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
             </button>
          </div>
      </div>
    `;
  }

  function attachEvents() {
    $('#btn-toggle-view')?.addEventListener('click', () => {
      viewMode = viewMode === 'calendar' ? 'list' : 'calendar';
      render();
    });

    $('#cal-prev')?.addEventListener('click', () => {
      currentMonth = subMonths(currentMonth, 1);
      render();
    });

    $('#cal-next')?.addEventListener('click', () => {
      currentMonth = addMonths(currentMonth, 1);
      render();
    });

    $('#btn-today')?.addEventListener('click', () => {
      currentMonth = new Date();
      selectedDate = new Date();
      render();
    });

    container.querySelectorAll('.calendar-day').forEach(el => {
      el.addEventListener('click', () => {
        const dateStr = (el as HTMLElement).getAttribute('data-date');
        if (dateStr) {
          selectedDate = parseISO(dateStr);
          render();
        }
      });
    });

    $('#filter-category')?.addEventListener('change', (e) => {
      filterCategory = (e.target as HTMLSelectElement).value;
      render();
    });

    $('#filter-status')?.addEventListener('change', (e) => {
      filterStatus = (e.target as HTMLSelectElement).value;
      render();
    });

    $('#btn-open-task-modal')?.addEventListener('click', () => {
      $('#modal-title').textContent = 'Novo Agendamento';
      const form = $('#form-task') as HTMLFormElement;
      form?.reset();
      (form?.querySelector('[name="task-id"]') as HTMLInputElement).value = '';
      $('#modal-task')?.classList.remove('hidden');
    });
    
    container.querySelectorAll('.modal-overlay, .modal-close').forEach(el => {
       el.addEventListener('click', () => $('#modal-task')?.classList.add('hidden'));
    });

    $('#form-task')?.addEventListener('submit', async (e) => {
       e.preventDefault();
       const form = e.target as HTMLFormElement;
       const formData = new FormData(form);
       const taskId = formData.get('task-id') as string;
       
       const data = {
         title: formData.get('title') as string,
         date: formData.get('date') as string,
         time: formData.get('time') as string,
         category: formData.get('category') as string,
         status: 'pendente' as const,
         clientName: formData.get('clientName') as string || undefined,
         clientEmail: formData.get('clientEmail') as string || undefined
       };

       if (taskId) {
         await crmService.updateTask(taskId, data);
       } else {
         await crmService.addTask(data);
       }
       
       $('#modal-task')?.classList.add('hidden');
       form.reset();
    });

    container.querySelectorAll('.btn-toggle-status').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const currentStatus = (e.currentTarget as HTMLElement).getAttribute('data-status') as 'pendente' | 'concluido';
        if (id) {
          await crmService.toggleTaskStatus(id, currentStatus);
        }
      });
    });

    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const task = tasks.find(t => t.id === id);
        if (task) {
          $('#modal-title').textContent = 'Editar Agendamento';
          const form = $('#form-task') as HTMLFormElement;
          (form?.querySelector('[name="task-id"]') as HTMLInputElement).value = task.id;
          (form?.querySelector('[name="title"]') as HTMLInputElement).value = task.title;
          (form?.querySelector('[name="time"]') as HTMLInputElement).value = task.time;
          (form?.querySelector('[name="category"]') as HTMLSelectElement).value = task.category;
          (form?.querySelector('[name="clientName"]') as HTMLInputElement).value = task.clientName || '';
          (form?.querySelector('[name="clientEmail"]') as HTMLInputElement).value = task.clientEmail || '';
          $('#modal-task')?.classList.remove('hidden');
        }
      });
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTaskId = (e.currentTarget as HTMLElement).getAttribute('data-id');
        $('#modal-confirm')?.classList.remove('hidden');
      });
    });

    $('.confirm-overlay, .confirm-cancel')?.addEventListener('click', () => {
      $('#modal-confirm')?.classList.add('hidden');
      deleteTaskId = null;
    });

    $('.confirm-delete')?.addEventListener('click', async () => {
      if (deleteTaskId) {
        await crmService.deleteTask(deleteTaskId);
        $('#modal-confirm')?.classList.add('hidden');
        deleteTaskId = null;
      }
    });

    container.querySelectorAll('.btn-sync-google').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const task = tasks.find(t => t.id === id);
        if (task) {
          window.open(getGoogleCalendarLink(task), '_blank');
        }
      });
    });

    container.querySelectorAll('.btn-send-email').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const task = tasks.find(t => t.id === id);
        if (task && task.clientEmail) {
          openEmailWithICS(task);
        }
      });
    });

    // List view events
    container.querySelectorAll('.btn-toggle-status-list').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const currentStatus = (e.currentTarget as HTMLElement).getAttribute('data-status') as 'pendente' | 'concluido';
        if (id) {
          await crmService.toggleTaskStatus(id, currentStatus);
        }
      });
    });

    container.querySelectorAll('.btn-edit-list').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const task = tasks.find(t => t.id === id);
        if (task) {
          $('#modal-title').textContent = 'Editar Agendamento';
          const form = $('#form-task') as HTMLFormElement;
          (form?.querySelector('[name="task-id"]') as HTMLInputElement).value = task.id;
          (form?.querySelector('[name="title"]') as HTMLInputElement).value = task.title;
          (form?.querySelector('[name="time"]') as HTMLInputElement).value = task.time;
          (form?.querySelector('[name="category"]') as HTMLSelectElement).value = task.category;
          (form?.querySelector('[name="date"]') as HTMLInputElement).value = task.date;
          (form?.querySelector('[name="clientName"]') as HTMLInputElement).value = task.clientName || '';
          (form?.querySelector('[name="clientEmail"]') as HTMLInputElement).value = task.clientEmail || '';
          $('#modal-task')?.classList.remove('hidden');
        }
      });
    });

    container.querySelectorAll('.btn-delete-list').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTaskId = (e.currentTarget as HTMLElement).getAttribute('data-id');
        $('#modal-confirm')?.classList.remove('hidden');
      });
    });
  }

  const unsubscribe = crmService.subscribeToTasks((updatedTasks) => {
    tasks = updatedTasks;
    render();
  });

  (container as any)._cleanup = unsubscribe;

  render();
}
