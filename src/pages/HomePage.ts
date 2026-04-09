import { $ } from '../utils/dom';
import { scrollToElement } from '../utils/dom';
import { SERVICES } from '../data/services';
import { getTopTestimonials } from '../data/testimonials';
import { FAQ_GERAL } from '../data/faq';
import { renderServiceGrid } from '../components/ServiceGrid';
import { renderTestimonials } from '../components/Testimonials';
import { renderAccordion } from '../components/Accordion';
import { APP_CONFIG } from '../data/config';

const heroIcons = {
  check: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
  shield: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
  users: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
  clock: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  whatsapp: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.652.149.571-.055 1.758-.683 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`,
};

export function renderHomePage(container: HTMLElement): void {
  const pageHTML = `
    <div id="home-page" class="page-content">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-blue-950 via-primary-900 to-indigo-900 text-white">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-64 h-64 bg-cta-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="text-center lg:text-left">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Resolva seu MEI em minutos.
              </h1>
              <p class="text-lg md:text-xl text-primary-100 mb-8 max-w-lg mx-auto lg:mx-0">
                Abertura, Declaração, Parcelamento e mais. Sem burocracia, sem complicação.
              </p>
              <button 
                id="hero-cta" 
                class="inline-flex items-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Ver Serviços →
              </button>
              
              <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                <div class="flex items-center gap-2 text-sm text-primary-200">
                  ${heroIcons.check}
                  <span>Atendimento rápido</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-primary-200">
                  ${heroIcons.shield}
                  <span>Dados protegidos</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-primary-200">
                  ${heroIcons.users}
                  <span>+2.000 MEIs atendidos</span>
                </div>
              </div>
            </div>
            
            <div class="hidden lg:block">
              <div id="hero-lottie" class="w-full aspect-square max-w-md mx-auto bg-white/5 rounded-2xl flex items-center justify-center">
                <div class="text-center text-primary-200">
                  <div class="text-6xl mb-4">📋</div>
                  <p class="text-lg">Serviços para MEI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section id="servicos-container" class="py-12 md:py-16 bg-gray-50"></section>

      <!-- Testimonials Section -->
      <section id="testimonials-container"></section>

      <!-- FAQ Section -->
      <section id="faq-container"></section>

      <!-- CTA Final -->
      <section class="py-12 md:py-16 bg-primary-900">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
            Ainda com dúvidas?
          </h2>
          <p class="text-primary-200 mb-8 max-w-xl mx-auto">
            Fale diretamente com nossa equipe pelo WhatsApp. Respondemos rapidamente!
          </p>
          <a 
            href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
            class="inline-flex items-center gap-3 bg-cta-500 hover:bg-cta-600 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            ${heroIcons.whatsapp}
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  `;

  container.innerHTML = pageHTML;

  const ctaButton = document.getElementById('hero-cta');
  ctaButton?.addEventListener('click', () => {
    scrollToElement('#servicos-container');
  });

  setTimeout(() => {
    const servicesContainer = document.getElementById('servicos-container');
    if (servicesContainer) {
      renderServiceGrid(servicesContainer, {
        title: 'Nossos Serviços',
        subtitle: 'Escolha o serviço que você precisa e resolva em minutos',
      });
    }

    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
      renderTestimonials(testimonialsContainer, { limit: 6 });
    }

    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
      renderAccordion(faqContainer, { items: FAQ_GERAL.slice(0, 5), allowMultiple: false });
    }
  }, 100);

  initPageAnimations();
}

function initPageAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section').forEach((section) => {
    (section as HTMLElement).style.opacity = '0';
    (section as HTMLElement).style.transition = 'opacity 0.6s ease-out';
    observer.observe(section);
  });

  setTimeout(() => {
    document.querySelectorAll('section').forEach((section) => {
      (section as HTMLElement).style.opacity = '1';
    });
  }, 100);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export function destroyHomePage(): void {
  const page = document.getElementById('home-page');
  page?.remove();
}