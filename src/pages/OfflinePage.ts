export function renderOfflinePage(container: HTMLElement): void {
  const pageHTML = `
    <div id="offline-page" class="page-content min-h-[60vh] flex items-center justify-center py-16">
      <div class="text-center px-4 max-w-md mx-auto">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path>
          </svg>
        </div>
        
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Você está sem conexão
        </h1>
        
        <p class="text-gray-600 mb-8">
          Verifique sua internet e tente novamente. Você pode precisar:
        </p>
        
        <ul class="text-left text-gray-600 mb-8 space-y-2">
          <li class="flex items-center gap-2">
            <span class="text-cta-500">✓</span>
            Verificar se o Wi-Fi está conectado
          </li>
          <li class="flex items-center gap-2">
            <span class="text-cta-500">✓</span>
            Reiniciar seu roteador
          </li>
          <li class="flex items-center gap-2">
            <span class="text-cta-500">✓</span>
            Mover-se para um local com melhor sinal
          </li>
        </ul>

        <button 
          id="retry-btn" 
          class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Tentar novamente
        </button>

        <div class="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-sm text-amber-800">
            <strong>Dica:</strong> Você também pode salvar esta página para acesso offline!
          </p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = pageHTML;

  const retryBtn = document.getElementById('retry-btn');
  retryBtn?.addEventListener('click', () => {
    window.location.reload();
  });

  window.addEventListener('online', () => {
    router.navigate('/');
  });
}

export function destroyOfflinePage(): void {
  const page = document.getElementById('offline-page');
  page?.remove();
}

declare const router: { navigate: (path: string) => void };