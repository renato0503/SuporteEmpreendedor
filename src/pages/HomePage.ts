import { scrollToElement } from '../utils/dom';
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
    <div id="home-page" class="page-content bg-slate-50">
      <!-- Hero Section -->
      <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A192F] text-white">
        <!-- Floating Elements Background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cta-500/10 rounded-full blur-[150px] animate-pulse" style="animation-delay: 2s"></div>
          <div class="absolute top-[20%] right-[15%] w-2 h-2 bg-cta-400 rounded-full animate-ping"></div>
          <div class="absolute bottom-[30%] left-[10%] w-3 h-3 bg-primary-400 rounded-full animate-ping" style="animation-delay: 1.5s"></div>
          
          <!-- Grid Overlay -->
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 lg:px-8 py-24 md:py-32 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="text-center lg:text-left">
              <div class="inline-flex items-center gap-2 bg-primary-800/50 backdrop-blur-sm border border-primary-700/50 px-4 py-2 rounded-full mb-8 animate-fade-in">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cta-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-cta-500"></span>
                </span>
                <span class="text-xs font-bold uppercase tracking-widest text-primary-100">Soluções MEI em Tempo Real</span>
              </div>
              
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] animate-fade-in-up">
                O Despachante <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-cta-400 to-emerald-400">Inteligente</span> do MEI.
              </h1>
              
              <p class="text-lg md:text-xl text-primary-200/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s">
                Formalize, regularize e gerencie seu CNPJ com a agilidade que o mercado exige. Tecnologia de ponta com suporte especializado.
              </p>
              
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style="animation-delay: 0.4s">
                <button 
                  id="hero-cta" 
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cta-500 hover:bg-cta-400 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-[0_20px_50px_-15px_rgba(16,185,129,0.4)] hover:shadow-cta-500/60 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  Resolver Pendências
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                
                <a 
                  href="#sobre" 
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold px-8 py-5 rounded-2xl border border-white/10 transition-all hover:border-white/20"
                >
                  Conhecer Método
                </a>
              </div>
              
              <div class="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-8 animate-fade-in" style="animation-delay: 0.6s">
                <div class="flex flex-col">
                  <span class="text-2xl font-black text-white">4.9/5</span>
                  <span class="text-[10px] uppercase tracking-wider text-primary-400 font-bold">Avaliação Google</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-2xl font-black text-white">+15k</span>
                  <span class="text-[10px] uppercase tracking-wider text-primary-400 font-bold">Processos Concluídos</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-2xl font-black text-white">100%</span>
                  <span class="text-[10px] uppercase tracking-wider text-primary-400 font-bold">Segurança Digital</span>
                </div>
              </div>
            </div>
            
            <div class="relative hidden lg:block animate-fade-in-left">
              <div class="absolute -inset-10 bg-cta-500/20 blur-[100px] rounded-full"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
                <div class="flex items-center justify-between mb-8">
                  <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div class="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-mono text-primary-300">suporte_empreendedor.v2</div>
                </div>
                
                <div class="space-y-6">
                  <div class="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                    <div class="w-12 h-12 bg-cta-500/20 rounded-lg flex items-center justify-center text-cta-400 text-2xl">✨</div>
                    <div class="flex-1">
                      <div class="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
                      <div class="h-2 w-full bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div class="p-4 bg-cta-500/10 rounded-xl border border-cta-500/20 flex items-center gap-4">
                    <div class="w-12 h-12 bg-cta-500/20 rounded-lg flex items-center justify-center text-cta-400 text-2xl">🚀</div>
                    <div class="flex-1">
                      <div class="h-2 w-32 bg-cta-400/30 rounded-full mb-2"></div>
                      <div class="h-2 w-full bg-cta-400/10 rounded-full"></div>
                    </div>
                  </div>
                   <div class="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                    <div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 text-2xl">🔒</div>
                    <div class="flex-1">
                      <div class="h-2 w-20 bg-white/20 rounded-full mb-2"></div>
                      <div class="h-2 w-full bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 flex justify-center">
                   <div class="animate-bounce p-2 bg-white/10 rounded-full border border-white/10">
                    <svg class="w-6 h-6 text-cta-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Grid Section -->
      <section id="servicos-container" class="py-24 md:py-32 bg-white relative">
        <div class="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-50 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-4 lg:px-8 relative">
           <div class="text-center mb-16">
            <h2 class="text-base font-black text-cta-600 uppercase tracking-[0.2em] mb-4">Portfólio de Soluções</h2>
            <h3 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Serviços que fazem sua <br/> empresa decolar.</h3>
          </div>
          <div id="services-grid" class="animate-fade-in"></div>
        </div>
      </section>

      <!-- Trust Section -->
      <section id="testimonials-container" class="py-24 bg-slate-50 border-y border-slate-200"></section>

      <!-- FAQ Section -->
      <section id="faq-container" class="py-24 bg-white"></section>

      <!-- CTA Final Moderno -->
      <section class="py-24 bg-[#0A192F] relative overflow-hidden">
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[100px]"></div>
        <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div class="w-20 h-20 bg-cta-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl border border-cta-500/20">💬</div>
          <h2 class="text-3xl md:text-5xl font-black text-white mb-6">
            Vamos profissionalizar <br/> seu negócio hoje?
          </h2>
          <p class="text-primary-200/80 mb-12 text-lg leading-relaxed max-w-xl mx-auto">
            Nossa equipe técnica está pronta para analisar sua situação e propor o melhor caminho. Atendimento humanizado e sem robôs.
          </p>
          <a 
            href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
            class="group inline-flex items-center gap-4 bg-white text-[#0A192F] font-black px-10 py-5 rounded-2xl transition-all shadow-2xl hover:bg-cta-400 hover:text-white hover:-translate-y-1 active:scale-95 text-lg"
          >
            ${heroIcons.whatsapp}
            <span>Iniciar Conversa VIP</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
          <div class="mt-12 flex flex-wrap justify-center gap-6 text-primary-400 font-bold uppercase tracking-widest text-[10px]">
            <span class="flex items-center gap-2">✓ Resposta em 5min</span>
            <span class="flex items-center gap-2">✓ Sem Custo Fixo</span>
            <span class="flex items-center gap-2">✓ 100% Online</span>
          </div>
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
    const servicesContainer = document.getElementById('services-grid');
    if (servicesContainer) {
      renderServiceGrid(servicesContainer, {
        title: '',
        subtitle: '',
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
          entry.target.classList.add('animate-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; opacity: 0; }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

export function destroyHomePage(): void {
  const page = document.getElementById('home-page');
  page?.remove();
}