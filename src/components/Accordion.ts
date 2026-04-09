import type { FAQItem } from '../types';

export interface AccordionProps {
  items: FAQItem[];
  allowMultiple?: boolean;
}

export function renderAccordion(container: HTMLElement, props: AccordionProps): void {
  const { items, allowMultiple = false } = props;

  const itemsHTML = items.map((item, index) => `
    <div class="accordion-item border border-gray-200 rounded-lg mb-3 overflow-hidden" role="group">
      <button 
        class="accordion-trigger w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
        aria-expanded="false"
        aria-controls="accordion-content-${index}"
        id="accordion-header-${index}"
      >
        <span class="font-medium text-gray-900 pr-4">${item.pergunta}</span>
        <span class="accordion-icon flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 transition-transform duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>
      <div 
        class="accordion-content overflow-hidden max-h-0 transition-all duration-300 ease-in-out"
        id="accordion-content-${index}"
        role="region"
        aria-labelledby="accordion-header-${index}"
      >
        <div class="p-4 pt-0 text-gray-600 leading-relaxed">
          ${item.resposta}
        </div>
      </div>
    </div>
  `).join('');

  const accordionHTML = `
    <section id="faq" class="py-12 md:py-16" aria-labelledby="faq-title">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-10">
          <h2 id="faq-title" class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Perguntas Frequentes
          </h2>
          <p class="text-gray-600">
            Tire suas dúvidas sobre nossos serviços para MEI
          </p>
        </div>
        
        <div class="accordion-container" role="presentation">
          ${itemsHTML}
        </div>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Não encontrou a resposta que procurava?
          </p>
          <a 
            href="https://wa.me/5500000000000" 
            class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.652.149.571-.055 1.758-.683 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  `;

  container.innerHTML = accordionHTML;
  initAccordionBehavior(allowMultiple);
}

function initAccordionBehavior(allowMultiple: boolean): void {
  const triggers = document.querySelectorAll('.accordion-trigger');
  const style = document.createElement('style');
  style.textContent = `
    .accordion-item.open .accordion-content {
      max-height: 500px;
    }
    .accordion-item.open .accordion-icon {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item') as HTMLElement;
      const isOpen = item.classList.contains('open');

      if (!allowMultiple) {
        document.querySelectorAll('.accordion-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const triggerBtn = openItem.querySelector('.accordion-trigger') as HTMLButtonElement;
            triggerBtn?.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e instanceof KeyboardEvent && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

export function openAccordionItem(index: number): void {
  const item = document.querySelectorAll('.accordion-item')[index] as HTMLElement;
  if (item) {
    const trigger = item.querySelector('.accordion-trigger') as HTMLButtonElement;
    trigger?.click();
  }
}

export function closeAllAccordionItems(): void {
  document.querySelectorAll('.accordion-item.open').forEach((item) => {
    item.classList.remove('open');
    const trigger = item.querySelector('.accordion-trigger') as HTMLButtonElement;
    trigger?.setAttribute('aria-expanded', 'false');
  });
}