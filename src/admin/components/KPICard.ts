export interface KPICardProps {
  label: string;
  value: string | number;
  icon: string;
  color: 'emerald' | 'orange' | 'blue' | 'purple' | 'slate' | 'red';
  trend?: {
    value: number;
    isUp: boolean;
  };
  subtitle?: string;
}

export function renderKPICard({ label, value, icon, color, trend, subtitle }: KPICardProps) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
    orange: { bg: 'bg-[#F18825]/10', text: 'text-[#F18825]', border: 'border-[#F18825]/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
    slate: { bg: 'bg-slate-500/10', text: 'text-slate-500', border: 'border-slate-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
  };

  const style = colorMap[color];

  return `
    <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/60 translate-all duration-500 group">
      <div class="flex justify-between items-start mb-6">
        <div class="p-3.5 ${style.bg} ${style.text} rounded-2xl ${style.border} border group-hover:scale-110 transition-transform duration-500">
           ${icon}
        </div>
        ${trend ? `
          <div class="flex items-center gap-1.5 px-3 py-1.5 ${trend.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} rounded-full text-[10px] font-black uppercase tracking-wider border ${trend.isUp ? 'border-emerald-100' : 'border-red-100'} shadow-sm">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path d="${trend.isUp ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"></path>
            </svg>
            ${trend.value}%
          </div>
        ` : ''}
      </div>
      
      <div class="space-y-1">
        <p class="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">${label}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-4xl font-black text-slate-900 tracking-tighter">${value}</h3>
          ${subtitle ? `<span class="text-xs text-slate-400 font-bold">${subtitle}</span>` : ''}
        </div>
      </div>

      <!-- Pequeno detalhe decorativo bottom -->
      <div class="mt-8 h-1 w-12 rounded-full ${style.bg} group-hover:w-full transition-all duration-700"></div>
    </div>
  `;
}
