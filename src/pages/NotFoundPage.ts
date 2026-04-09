import { router } from '../router';
import { SERVICES } from '../data/services';

export function renderNotFoundPage(container: HTMLElement): void {
  const popularServices = SERVICES.slice(0, 3);

  const pageHTML = `
    <div id="not-found-page" class="page-content min-h-[60vh] flex items-center justify-center py-16">
      <div class="text-center px-4">
        <div class="text-8xl md:text-9xl mb-6">🔍</div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          A página que você procura não existe ou foi movida. Que tal voltar para a página inicial?
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            id="back-home-btn" 
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Voltar para a página inicial
          </button>
        </div>

        <div class="max-w-md mx-auto">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Serviços Populares</h2>
          <div class="space-y-3">
            ${popularServices.map(service => `
              <button 
                class="popular-service-btn w-full text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                data-slug="${service.id === 'abertura-mei' ? 'abertura' : service.id === 'dasan' ? 'declaracao' : service.id === 'parcelamento' ? 'parcelamento' : service.id === 'alteracao-cadastral' ? 'alteracao' : service.id === 'baixa-mei' ? 'baixa' : 'consulta'}"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-900">${service.nome}</span>
                  <span class="text-cta-500 font-semibold">R$ ${service.valorMinimo},00</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = pageHTML;

  const backHomeBtn = document.getElementById('back-home-btn');
  backHomeBtn?.addEventListener('click', () => {
    router.navigate('/');
  });

  container.querySelectorAll('.popular-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      if (slug) {
        router.navigate(`/${slug}`);
      }
    });
  });

  setTimeout(() => {
    const page = document.getElementById('not-found-page');
    if (page) {
      page.style.opacity = '0';
      page.style.transition = 'opacity 0.5s ease';
      requestAnimationFrame(() => {
        page.style.opacity = '1';
      });
    }
  }, 50);
}

export function destroyNotFoundPage(): void {
  const page = document.getElementById('not-found-page');
  page?.remove();
}