import { APP_CONFIG } from '../data/config';
import { router } from '../router';

export interface HeaderProps {
  showMenuButton?: boolean;
  showCTA?: boolean;
  onMenuToggle?: () => void;
}

const headerIcons = {
  menu: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`,
  close: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
  logo: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#1E3A5F"/><path d="M10 12h12M10 16h12M10 20h8" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="3" fill="#10B981"/></svg>`,
  whatsapp: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.652.149.571-.055 1.758-.683 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`,
};

export function renderHeader(container: HTMLElement, props?: HeaderProps): void {
  const showMenuButton = props?.showMenuButton ?? true;
  const showCTA = props?.showCTA ?? true;

  const headerHTML = `
    <header 
      id="main-header" 
      class="fixed top-0 left-0 right-0 z-50 bg-primary-900/80 backdrop-blur-lg border-b border-primary-800/50 text-white transition-all duration-300"
      role="banner"
    >
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="flex items-center justify-between h-20 transition-all duration-300 header-inner">
          <a href="#" class="flex items-center gap-3 group" aria-label="${APP_CONFIG.siteName} - Início">
            <div class="relative">
              <div class="absolute inset-0 bg-cta-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div class="relative w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform overflow-hidden">
                <img src="logo.png" alt="Logo" class="w-8 h-8 object-contain">
              </div>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-extrabold tracking-tight leading-none text-white transition-colors group-hover:text-cta-400">
                ${APP_CONFIG.siteName.split(' ')[0]}<span class="text-cta-500 font-normal">.</span>
              </h1>
              <p class="text-[10px] uppercase tracking-widest text-primary-300 font-bold">Despachante Digital</p>
            </div>
          </a>

          <nav class="hidden md:flex items-center bg-primary-800/30 backdrop-blur-sm px-6 py-2 rounded-full border border-primary-700/50 gap-8" role="navigation" aria-label="Menu principal">
            <a href="#servicos" class="text-sm font-semibold text-primary-100 hover:text-cta-400 transition-colors uppercase tracking-wider">Serviços</a>
            <a href="#faq" class="text-sm font-semibold text-primary-100 hover:text-cta-400 transition-colors uppercase tracking-wider">FAQ</a>
            <a href="#sobre" class="text-sm font-semibold text-primary-100 hover:text-cta-400 transition-colors uppercase tracking-wider">Sobre</a>
            <a href="#contato" class="text-sm font-semibold text-primary-100 hover:text-cta-400 transition-colors uppercase tracking-wider">Contato</a>
          </nav>

          <div class="flex items-center gap-4">
            ${showCTA ? `
              <a 
                href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
                class="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cta-600 hover:from-cta-500 hover:to-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-cta-500/50 hover:scale-105 active:scale-95"
                aria-label="Falar no WhatsApp"
              >
                ${headerIcons.whatsapp}
                <span>Suporte VIP</span>
              </a>
            ` : ''}
            
            ${showMenuButton ? `
              <button 
                id="mobile-menu-btn" 
                class="md:hidden p-2.5 bg-primary-800/50 hover:bg-primary-700/50 rounded-xl border border-primary-700/30 transition-all active:scale-95"
                aria-label="Abrir menu"
                aria-expanded="false"
                aria-controls="mobile-menu"
              >
                ${headerIcons.menu}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </header>

    <div 
      id="mobile-menu" 
      class="fixed inset-0 z-[60] hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <div class="absolute inset-0 bg-primary-950/60 backdrop-blur-md transition-opacity duration-300" id="mobile-menu-backdrop"></div>
      <div class="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-primary-900 border-l border-primary-800 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.5)] transform transition-transform duration-500 translate-x-full ease-out" id="mobile-menu-panel">
        <div class="h-full flex flex-col p-6">
          <div class="flex justify-between items-center mb-10">
            <div class="flex items-center gap-3">
               <div class="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <img src="logo.png" alt="Logo" class="w-6 h-6 object-contain">
              </div>
              <span class="text-xl font-bold text-white">${APP_CONFIG.siteName.split(' ')[0]}</span>
            </div>
            <button id="mobile-menu-close" class="p-2.5 text-primary-200 hover:text-white hover:bg-primary-800/50 rounded-xl transition-all active:scale-95" aria-label="Fechar menu">
              ${headerIcons.close}
            </button>
          </div>
          <nav class="flex-1 space-y-2" role="navigation" aria-label="Menu mobile">
            <a href="#servicos" class="mobile-nav-link flex items-center gap-4 text-white text-lg font-bold py-4 px-5 rounded-2xl hover:bg-primary-800 transition-all border border-transparent hover:border-primary-700/50">
              <span class="p-2 bg-primary-800 rounded-lg text-lg">📋</span>
              Serviços
            </a>
            <a href="#faq" class="mobile-nav-link flex items-center gap-4 text-white text-lg font-bold py-4 px-5 rounded-2xl hover:bg-primary-800 transition-all border border-transparent hover:border-primary-700/50">
              <span class="p-2 bg-primary-800 rounded-lg text-lg">❓</span>
              Dúvidas
            </a>
            <a href="#sobre" class="mobile-nav-link flex items-center gap-4 text-white text-lg font-bold py-4 px-5 rounded-2xl hover:bg-primary-800 transition-all border border-transparent hover:border-primary-700/50">
              <span class="p-2 bg-primary-800 rounded-lg text-lg">ℹ️</span>
              Sobre Nós
            </a>
            <a href="#contato" class="mobile-nav-link flex items-center gap-4 text-white text-lg font-bold py-4 px-5 rounded-2xl hover:bg-primary-800 transition-all border border-transparent hover:border-primary-700/50">
              <span class="p-2 bg-primary-800 rounded-lg text-lg">📞</span>
              Contato
            </a>
          </nav>
          ${showCTA ? `
            <div class="mt-auto pt-6 border-t border-primary-800/50">
              <a 
                href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
                class="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cta-600 text-white font-bold px-6 py-4 rounded-2xl transition-all shadow-lg active:scale-95"
              >
                ${headerIcons.whatsapp}
                <span>Suporte Agora</span>
              </a>
              <p class="text-center text-[10px] text-primary-400 mt-4 uppercase tracking-widest font-bold">Atendimento Seg - Sex, 09h às 18h</p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = headerHTML;
  initHeaderBehavior();
}

function initHeaderBehavior(): void {
  const header = document.getElementById('main-header');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuClose = document.getElementById('mobile-menu-close');
  const menuPanel = document.getElementById('mobile-menu-panel');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  let lastScrollY = 0;
  let ticking = false;

  function updateHeader(): void {
    const currentScrollY = window.scrollY;
    
    if (header) {
      if (currentScrollY > 50) {
        header.classList.add('bg-primary-900/95', 'backdrop-blur-md', 'shadow-lg');
      } else {
        header.classList.remove('bg-primary-900/95', 'backdrop-blur-md', 'shadow-lg');
      }

      if (currentScrollY > 100) {
        header.classList.add('scrolled');
        const inner = header.querySelector('.header-inner') as HTMLElement;
        if (inner) {
          inner.classList.remove('h-20');
          inner.classList.add('h-16');
        }
      } else {
        header.classList.remove('scrolled');
        const inner = header.querySelector('.header-inner') as HTMLElement;
        if (inner) {
          inner.classList.remove('h-16');
          inner.classList.add('h-20');
        }
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  function openMenu(): void {
    menu?.classList.remove('hidden');
    setTimeout(() => {
      menuPanel?.classList.remove('translate-x-full');
      menuPanel?.classList.add('translate-x-0');
    }, 10);
    document.body.style.overflow = 'hidden';
    menuBtn?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu(): void {
    menuPanel?.classList.remove('translate-x-0');
    menuPanel?.classList.add('translate-x-full');
    setTimeout(() => {
      menu?.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  menuBackdrop?.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });

  const ctaLinks = document.querySelectorAll('a[href^="https://wa.me"]');
  ctaLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as Record<string, unknown>).gtag?.('event', 'click', {
          event_category: 'conversion',
          event_label: 'Header CTA WhatsApp',
        });
      }
    });
  });
}

export function getHeaderHeight(): number {
  const header = document.getElementById('main-header');
  return header ? header.offsetHeight : 80;
}