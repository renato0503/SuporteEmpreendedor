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
    <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-300 group">
      <div class="flex justify-between items-start mb-4">
        <div class="p-2.5 ${style.bg} ${style.text} rounded-xl ${style.border} border">
           ${icon}
        </div>
        ${trend ? `
          <div class="flex items-center gap-1 px-2 py-1 ${trend.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} rounded-lg text-[9px] font-black uppercase tracking-wider">
            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path d="${trend.isUp ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"></path>
            </svg>
            ${trend.value}%
          </div>
        ` : ''}
      </div>
      
      <div class="space-y-1">
        <p class="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">${label}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-2xl font-black text-slate-900 tracking-tight">${value}</h3>
          ${subtitle ? `<span class="text-[9px] text-slate-400 font-medium">${subtitle}</span>` : ''}
        </div>
      </div>

      <div class="mt-4 h-1 w-10 rounded-full ${style.bg} group-hover:w-full transition-all duration-500"></div>
    </div>
  `;
}