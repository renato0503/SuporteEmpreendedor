export interface Holiday {
  date: string;
  name: string;
  type: 'federal' | 'estadual' | 'municipal';
  location?: 'cg' | 'vg' | 'mt';
}

export const HOLIDAYS_2025: Holiday[] = [
  { date: '2025-01-01', name: 'Confraternização Universal', type: 'federal' },
  { date: '2025-03-01', name: 'Carnaval', type: 'federal' },
  { date: '2025-03-02', name: 'Carnaval', type: 'federal' },
  { date: '2025-03-03', name: 'Carnaval', type: 'federal' },
  { date: '2025-04-18', name: 'Sexta-feira Santa', type: 'federal' },
  { date: '2025-04-20', name: 'Páscoa', type: 'federal' },
  { date: '2025-04-21', name: 'Tiradentes', type: 'federal' },
  { date: '2025-05-01', name: 'Dia do Trabalho', type: 'federal' },
  { date: '2025-06-19', name: 'Corpus Christi', type: 'federal' },
  { date: '2025-09-07', name: 'Independência do Brasil', type: 'federal' },
  { date: '2025-10-12', name: 'Nossa Senhora Aparecida', type: 'federal' },
  { date: '2025-10-15', name: 'Dia do Professor', type: 'federal' },
  { date: '2025-11-02', name: 'Finados', type: 'federal' },
  { date: '2025-11-15', name: 'Proclamação da República', type: 'federal' },
  { date: '2025-11-20', name: 'Dia da Consciência Negra', type: 'federal' },
  { date: '2025-12-25', name: 'Natal', type: 'federal' },
  { date: '2025-12-31', name: 'Véspera de Ano Novo', type: 'federal' },
  
  { date: '2025-09-18', name: 'Dia de Mato Grosso', type: 'estadual', location: 'mt' },
  { date: '2025-11-29', name: 'Dia do Evangélico', type: 'estadual', location: 'mt' },
  
  { date: '2025-04-28', name: 'Aniversário de Cuiabá', type: 'municipal', location: 'cg' },
  { date: '2025-06-15', name: 'Dia do Funcionário Público', type: 'municipal', location: 'cg' },
  { date: '2025-08-13', name: 'Dia de São Francisco', type: 'municipal', location: 'cg' },
  { date: '2025-09-08', name: 'Dia de Nossa Senhora da Guia', type: 'municipal', location: 'cg' },
  { date: '2025-10-08', name: 'Dia de Nossa Senhora da Penha', type: 'municipal', location: 'cg' },
  { date: '2025-12-08', name: 'Dia de Nossa Senhora da Imaculada Conceição', type: 'municipal', location: 'cg' },
  
  { date: '2025-01-20', name: 'Aniversário de Várzea Grande', type: 'municipal', location: 'vg' },
  { date: '2025-06-13', name: 'Dia de Santo Antônio', type: 'municipal', location: 'vg' },
  { date: '2025-08-16', name: 'Dia de São Roque', type: 'municipal', location: 'vg' },
  { date: '2025-09-15', name: 'Dia da Emancipação Política de VG', type: 'municipal', location: 'vg' },
];

export const COMMEMORATIVE_DATES: { month: number; day: number; name: string; type: 'nacional' | 'comercio' }[] = [
  { month: 1, day: 24, name: 'Dia do Mercado', type: 'comercio' },
  { month: 2, day: 14, name: 'Dia dos Namorados', type: 'nacional' },
  { month: 3, day: 8, name: 'Dia da Mulher', type: 'nacional' },
  { month: 3, day: 19, name: 'Dia do Cliente', type: 'comercio' },
  { month: 4, day: 22, name: 'Dia da Terra', type: 'nacional' },
  { month: 5, day: 10, name: 'Dia das Mães', type: 'nacional' },
  { month: 6, day: 12, name: 'Dia dos Namorados', type: 'nacional' },
  { month: 6, day: 24, name: 'Dia de São João', type: 'nacional' },
  { month: 7, day: 9, name: 'Dia da Pizza', type: 'comercio' },
  { month: 8, day: 13, name: 'Dia dos Pais', type: 'nacional' },
  { month: 9, day: 7, name: 'Dia do Cliente', type: 'comercio' },
  { month: 9, day: 21, name: 'Dia da Árvore', type: 'nacional' },
  { month: 9, day: 22, name: 'Dia do Cliente', type: 'comercio' },
  { month: 10, day: 5, name: 'Dia da Criança', type: 'nacional' },
  { month: 10, day: 31, name: 'Halloween', type: 'comercio' },
  { month: 11, day: 10, name: 'Dia do Profissional Liberal', type: 'nacional' },
  { month: 12, day: 24, name: 'Natal', type: 'comercio' },
  { month: 12, day: 30, name: 'Dia do Profissional de Turismo', type: 'nacional' },
];

export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  const monthStr = String(month).padStart(2, '0');
  const prefix = `${year}-${monthStr}`;
  
  return HOLIDAYS_2025.filter(h => h.date.startsWith(prefix));
}

export function isHoliday(dateStr: string): Holiday | undefined {
  return HOLIDAYS_2025.find(h => h.date === dateStr);
}

export function isComemorativeDate(date: Date): { name: string; type: string } | undefined {
  const commemorative = COMMEMORATIVE_DATES.find(c => 
    c.month === date.getMonth() + 1 && c.day === date.getDate()
  );
  return commemorative ? { name: commemorative.name, type: commemorative.type } : undefined;
}