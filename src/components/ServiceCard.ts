import type { Service } from '../types';
import { router } from '../router';
import { trackServiceClick } from '../utils/analytics';
import { fadeInUp } from '../utils/animations';

const serviceIcons: Record<string, string> = {
  briefcase: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
  document: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
  calculator: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
  pencil: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
  trash: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`,
  search: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
};

const serviceColors: Record<string, string> = {
  'abertura-mei': 'bg-blue-50 text-blue-600 border-blue-100',
  'dasan': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'parcelamento': 'bg-amber-50 text-amber-600 border-amber-100',
  'alteracao-cadastral': 'bg-purple-50 text-purple-600 border-purple-100',
  'baixa-mei': 'bg-red-50 text-red-600 border-red-100',
  'consulta-situacao': 'bg-cyan-50 text-cyan-600 border-cyan-100',
};

const priceColors: Record<string, string> = {
  'abertura-mei': 'text-blue-600',
  'dasan': 'text-emerald-600',
  'parcelamento': 'text-amber-600',
  'alteracao-cadastral': 'text-purple-600',
  'baixa-mei': 'text-red-600',
  'consulta-situacao': 'text-cyan-600',
};

export interface ServiceCardProps {
  service: Service;
  index?: number;
  onClick?: (service: Service) => void;
}

export function renderServiceCard(service: Service, index: number = 0): string {
  const icon = serviceIcons[service.icone] || serviceIcons.briefcase;
  const colorClass = serviceColors[service.id] || 'bg-gray-50 text-gray-600 border-gray-100';
  const priceColorClass = priceColors[service.id] || 'text-gray-600';
  const delay = index * 100;

  return `
    <article 
      class="service-card group bg-white rounded-xl p-5 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 opacity-0"
      data-service-id="${service.id}"
      data-index="${index}"
      style="animation-delay: ${delay}ms"
      role="button"
      tabindex="0"
      aria-label="Solicitar ${service.nome} - R$ ${service.valorMinimo},00"
    >
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
          ${icon}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
            ${service.nome}
          </h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">
            ${service.descricaoCurta}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold ${priceColorClass}">
              R$ ${service.valorMinimo},00
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-cta-500 transition-colors">
              Solicitar
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ${service.prazoEstimado}
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Processamento rápido
        </span>
      </div>
    </article>
  `;
}

export function renderServiceCards(services: Service[], container: HTMLElement): void {
  const cardsHTML = services.map((service, index) => renderServiceCard(service, index)).join('');
  
  container.innerHTML = cardsHTML;
  
  setTimeout(() => {
    const cards = container.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
    cards.forEach((card, index) => {
      fadeInUp(card, 300).catch(() => {});
      card.style.opacity = '1';
    });
  }, 50);

  container.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service-id');
      if (serviceId) {
        trackServiceClick(serviceId);
        router.navigate(`/servico/${serviceId}`);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e instanceof KeyboardEvent && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        card.click();
      }
    });
  });
}

export function initServiceCards(container: HTMLElement): void {
  container.classList.add('opacity-0');
  
  setTimeout(() => {
    const cards = container.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.classList.add('animate-fade-in-up');
    });
  }, 100);
}