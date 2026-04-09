import type { Testimonial, ServiceId } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    nome: 'Maria Cristina Silva',
    cidade: 'São Paulo',
    estado: 'SP',
    servico: 'abertura-mei',
    servicoNome: 'Abertura de MEI',
    texto: 'Processo super rápido e sem complicação. Tinha medo de lidar com a burocracia, mas o time cuidou de tudo. Em 4 dias meu MEI estava正式izado. Recomendo!',
    rating: 5,
    data: new Date('2025-12-15'),
    foto: undefined,
  },
  {
    id: 't2',
    nome: 'Roberto Carlos Santos',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    servico: 'dasan',
    servicoNome: 'Declaração Anual (DASN)',
    texto: 'Ano passado atrasou a declaração e quase pagou multa. Esse ano contratei o serviço e ficou tudo certinho. O valor vale a pena pelo serviço completo que fazem.',
    rating: 5,
    data: new Date('2025-04-20'),
    foto: undefined,
  },
  {
    id: 't3',
    nome: 'Ana Paula Oliveira',
    cidade: 'Curitiba',
    estado: 'PR',
    servico: 'parcelamento',
    servicoNome: 'Parcelamento de Débitos',
    texto: 'Tinha mais de R$ 3.000 em débitos acumulados e não sabia o que fazer. They helped me set up an installment plan that fits my budget. My CNPJ is now regular again!',
    rating: 5,
    data: new Date('2025-08-10'),
    foto: undefined,
  },
  {
    id: 't4',
    nome: 'Carlos Eduardo Mendes',
    cidade: 'Salvador',
    estado: 'BA',
    servico: 'alteracao-cadastral',
    servicoNome: 'Alteração Cadastral',
    texto: 'Precisava mudar o endereço do meu MEI e atualizar o telefone. O serviço foi rápidocomo esperado. Em 2 dias tudo já estava atualizado nos órgãos.',
    rating: 4,
    data: new Date('2025-11-05'),
    foto: undefined,
  },
  {
    id: 't5',
    nome: 'Juliana Ferreira',
    cidade: 'Fortaleza',
    estado: 'CE',
    servico: 'baixa-mei',
    servicoNome: 'Baixa do MEI',
    texto: 'Encerrar as atividades foi mais simples do que imaginei. A equipe verificou todos os débitos, me orientou sobre a DASN final e fez tudo certinho. Muito satisfeita.',
    rating: 5,
    data: new Date('2025-09-22'),
    foto: undefined,
  },
  {
    id: 't6',
    nome: 'Paulo Henrique Alves',
    cidade: 'Porto Alegre',
    estado: 'RS',
    servico: 'consulta-situacao',
    servicoNome: 'Consulta de Situação',
    texto: 'Antes de participar de uma licitação, fiz a consulta e descobri que tinha débitos ignorados. Consegui regularizar a tempo. Service saved my business!',
    rating: 5,
    data: new Date('2026-01-10'),
    foto: undefined,
  },
];

export function getTestimonialsByService(serviceId: ServiceId): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.servico === serviceId);
}

export function getTestimonialsByCity(city: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.cidade.toLowerCase().includes(city.toLowerCase()));
}

export function getTopTestimonials(count: number = 3): Testimonial[] {
  return [...TESTIMONIALS]
    .sort((a, b) => b.rating - a.rating || b.data.getTime() - a.data.getTime())
    .slice(0, count);
}

export function getAllTestimonials(): Testimonial[] {
  return TESTIMONIALS;
}

export function getAverageRating(): number {
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / TESTIMONIALS.length) * 10) / 10;
}