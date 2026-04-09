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
      class="fixed top-0 left-0 right-0 z-50 bg-primary-900 text-white transition-all duration-300"
      role="banner"
    >
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-20 transition-all duration-300 header-inner">
          <a href="#" class="flex items-center gap-3 group" aria-label="${APP_CONFIG.siteName} - Início">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              ${headerIcons.logo}
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg font-bold leading-tight">${APP_CONFIG.siteName.split(' ')[0]}</h1>
              <p class="text-xs text-primary-200">Despachante Digital</p>
            </div>
          </a>

          <nav class="hidden md:flex items-center gap-6" role="navigation" aria-label="Menu principal">
            <a href="#servicos" class="text-sm font-medium hover:text-cta-400 transition-colors">Serviços</a>
            <a href="#faq" class="text-sm font-medium hover:text-cta-400 transition-colors">FAQ</a>
            <a href="#sobre" class="text-sm font-medium hover:text-cta-400 transition-colors">Sobre</a>
            <a href="#contato" class="text-sm font-medium hover:text-cta-400 transition-colors">Contato</a>
          </nav>

          <div class="flex items-center gap-3">
            ${showCTA ? `
              <a 
                href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
                class="hidden sm:flex items-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Falar no WhatsApp"
              >
                ${headerIcons.whatsapp}
                <span>Fale no WhatsApp</span>
              </a>
            ` : ''}
            
            ${showMenuButton ? `
              <button 
                id="mobile-menu-btn" 
                class="md:hidden p-2 hover:bg-primary-800 rounded-lg transition-colors"
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
      class="fixed inset-0 z-50 hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="mobile-menu-backdrop"></div>
      <div class="absolute right-0 top-0 bottom-0 w-72 bg-primary-900 shadow-2xl transform transition-transform duration-300 translate-x-full" id="mobile-menu-panel">
        <div class="p-4">
          <div class="flex justify-between items-center mb-8">
            <span class="text-xl font-bold text-white">Menu</span>
            <button id="mobile-menu-close" class="p-2 text-white hover:bg-primary-800 rounded-lg transition-colors" aria-label="Fechar menu">
              ${headerIcons.close}
            </button>
          </div>
          <nav class="space-y-2" role="navigation" aria-label="Menu mobile">
            <a href="#servicos" class="mobile-nav-link block text-white text-base py-3 px-4 border-b border-primary-700 hover:bg-primary-800 rounded-lg transition-colors">
              📋 Serviços
            </a>
            <a href="#faq" class="mobile-nav-link block text-white text-base py-3 px-4 border-b border-primary-700 hover:bg-primary-800 rounded-lg transition-colors">
              ❓ FAQ
            </a>
            <a href="#sobre" class="mobile-nav-link block text-white text-base py-3 px-4 border-b border-primary-700 hover:bg-primary-800 rounded-lg transition-colors">
              ℹ️ Sobre
            </a>
            <a href="#contato" class="mobile-nav-link block text-white text-base py-3 px-4 border-b border-primary-700 hover:bg-primary-800 rounded-lg transition-colors">
              📞 Contato
            </a>
          </nav>
          ${showCTA ? `
            <div class="mt-6 p-4">
              <a 
                href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
                class="flex items-center justify-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-semibold px-4 py-3 rounded-full transition-all"
              >
                ${headerIcons.whatsapp}
                <span>Fale no WhatsApp</span>
              </a>
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