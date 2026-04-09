import { TESTIMONIALS, getTopTestimonials } from '../data/testimonials';
import type { Testimonial } from '../types';

export interface TestimonialsProps {
  limit?: number;
  showAll?: boolean;
}

const starIcon = `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

const quoteIcon = `<svg class="w-10 h-10 text-primary-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>`;

function renderTestimonialCard(testimonial: Testimonial, index: number): string {
  const stars = Array(testimonial.rating).fill(starIcon).join('');
  
  return `
    <article 
      class="testimonial-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all opacity-0"
      style="animation-delay: ${index * 100}ms"
      role="article"
      aria-label="Depoimento de ${testimonial.nome}"
    >
      <div class="flex items-start gap-4 mb-4">
        <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg flex-shrink-0">
          ${testimonial.nome.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 class="font-semibold text-gray-900">${testimonial.nome}</h4>
          <p class="text-sm text-gray-500">${testimonial.cidade}, ${testimonial.estado}</p>
        </div>
      </div>
      
      <div class="mb-3" aria-label="${testimonial.rating} estrelas">
        ${stars}
      </div>
      
      <div class="relative">
        <span class="absolute -top-2 -left-2 text-4xl text-primary-200 opacity-50">"</span>
        <blockquote class="text-gray-600 italic leading-relaxed pl-4">
          ${testimonial.texto}
        </blockquote>
        <span class="absolute -bottom-4 -right-2 text-4xl text-primary-200 opacity-50">"</span>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-100">
        <span class="inline-block bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
          ${testimonial.servicoNome}
        </span>
      </div>
    </article>
  `;
}

export function renderTestimonials(container: HTMLElement, props?: TestimonialsProps): void {
  const testimonials = props?.showAll ? TESTIMONIALS : getTopTestimonials(props?.limit || 6);
  
  const testimonialsHTML = testimonials.map((t, i) => renderTestimonialCard(t, i)).join('');

  const html = `
    <section id="depoimentos" class="py-12 md:py-16 bg-gray-50" aria-labelledby="depoimentos-title">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
          <h2 id="depoimentos-title" class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            O que nossos clientes dizem
          </h2>
          <p class="text-gray-600 max-w-xl mx-auto">
            A satisfação dos nossos clientes é a nossa maior conquista
          </p>
        </div>
        
        <div class="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${testimonialsHTML}
        </div>

        <div class="mt-10 text-center">
          <p class="text-sm text-gray-500 mb-4">Nota média: <span class="font-bold text-amber-500">4.8/5</span> baseada em ${TESTIMONIALS.length} avaliações</p>
        </div>
      </div>
    </section>
  `;

  container.innerHTML = html;
  initTestimonialsAnimation();
}

function initTestimonialsAnimation(): void {
  const cards = document.querySelectorAll('.testimonial-card');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).classList.add('animate-fade-in-up');
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => {
    (card as HTMLElement).style.transition = 'opacity 0.5s ease-out, transform 0.3s ease';
    observer.observe(card);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
}

export function renderTestimonialsCarousel(container: HTMLElement): void {
  const testimonials = getTopTestimonials(6);
  
  const html = `
    <section id="depoimentos" class="py-12 md:py-16 bg-gray-50" aria-labelledby="depoimentos-title">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
          <h2 id="depoimentos-title" class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            O que nossos clientes dizem
          </h2>
        </div>
        
        <div class="relative overflow-hidden">
          <div id="testimonial-track" class="flex transition-transform duration-500 ease-in-out">
            ${testimonials.map((t, i) => `
              <div class="flex-shrink-0 w-full px-2">
                ${renderTestimonialCard(t, i)}
              </div>
            `).join('')}
          </div>
          
          <button 
            id="testimonial-prev" 
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors z-10"
            aria-label="Depoimento anterior"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <button 
            id="testimonial-next" 
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors z-10"
            aria-label="Próximo depoimento"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
        
        <div class="flex justify-center gap-2 mt-6" id="testimonial-dots">
          ${testimonials.map((_, i) => `
            <button 
              class="testimonial-dot w-2 h-2 rounded-full bg-gray-300 hover:bg-primary-500 transition-colors"
              aria-label="Ver depoimento ${i + 1}"
              data-index="${i}"
            ></button>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  container.innerHTML = html;
  initCarouselBehavior();
}

function initCarouselBehavior(): void {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  let currentIndex = 0;
  const totalSlides = Math.ceil(TESTIMONIALS.length / 3);
  
  const updateCarousel = () => {
    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-primary-500', i === currentIndex);
      dot.classList.toggle('bg-gray-300', i !== currentIndex);
    });
  };
  
  prevBtn?.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
    updateCarousel();
  });
  
  nextBtn?.addEventListener('click', () => {
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  track?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      } else {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      }
      updateCarousel();
    }
  });
}