import type { Service } from '../types';
import { SERVICES } from '../data/services';
import { renderServiceCard } from './ServiceCard';
import { trackServiceView } from '../utils/analytics';

export interface ServiceGridProps {
  services?: Service[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function renderServiceGrid(container: HTMLElement, props?: ServiceGridProps): void {
  const services = props?.services || SERVICES;

  const cardsHTML = services.map((service, index) => renderServiceCard(service, index)).join('');

  const gridHTML = `
    <div 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" 
      role="list"
      aria-label="Lista de serviços disponíveis"
    >
      ${cardsHTML}
    </div>
  `;

  container.innerHTML = gridHTML;
  initServiceGridBehavior(container);
}

function initServiceGridBehavior(container: HTMLElement): void {
  const cards = container.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const serviceId = card.getAttribute('data-service-id');
          
          card.classList.add('service-card-visible');
          
          if (serviceId) {
            trackServiceView(serviceId);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });

  const style = document.createElement('style');
  style.textContent = `
    .service-card-visible {
      opacity: 1 !important;
      animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export function filterServicesByPrice(
  services: Service[],
  minPrice: number,
  maxPrice: number
): Service[] {
  return services.filter(
    (service) => service.valorMinimo >= minPrice && service.valorMinimo <= maxPrice
  );
}

export function sortServicesByPrice(
  services: Service[],
  order: 'asc' | 'desc' = 'asc'
): Service[] {
  return [...services].sort((a, b) => {
    if (order === 'asc') {
      return a.valorMinimo - b.valorMinimo;
    }
    return b.valorMinimo - a.valorMinimo;
  });
}

export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return SERVICES;

  return SERVICES.filter(
    (service) =>
      service.nome.toLowerCase().includes(lowerQuery) ||
      service.descricaoCurta.toLowerCase().includes(lowerQuery) ||
      service.descricaoCompleta.toLowerCase().includes(lowerQuery)
  );
}

export function getServicesGroupedByPrice(): Record<string, Service[]> {
  const groups: Record<string, Service[]> = {
    'ate-70': [],
    '70-100': [],
    'acima-100': [],
  };

  SERVICES.forEach((service) => {
    if (service.valorMinimo <= 70) {
      groups['ate-70'].push(service);
    } else if (service.valorMinimo <= 100) {
      groups['70-100'].push(service);
    } else {
      groups['acima-100'].push(service);
    }
  });

  return groups;
}

export function renderServicesByGroup(container: HTMLElement): void {
  const groups = getServicesGroupedByPrice();
  let html = '';

  if (groups['ate-70'].length > 0) {
    html += `
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Serviços até R$ 70</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${groups['ate-70'].map((s, i) => renderServiceCard(s, i)).join('')}
        </div>
      </div>
    `;
  }

  if (groups['70-100'].length > 0) {
    html += `
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Serviços entre R$ 70 e R$ 100</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${groups['70-100'].map((s, i) => renderServiceCard(s, i)).join('')}
        </div>
      </div>
    `;
  }

  if (groups['acima-100'].length > 0) {
    html += `
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Serviços acima de R$ 100</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${groups['acima-100'].map((s, i) => renderServiceCard(s, i)).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

export { SERVICES as defaultServices };
export { renderServiceCard };