import { APP_CONFIG } from '../data/config';

const currentYear = new Date().getFullYear();

const footerIcons = {
  logo: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#1E3A5F"/><path d="M10 12h12M10 16h12M10 20h8" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="3" fill="#10B981"/></svg>`,
  whatsapp: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.652.149.571-.055 1.758-.683 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`,
  warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 6v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>`,
};

export interface FooterProps {
  showCTA?: boolean;
  showLinks?: boolean;
}

export function renderFooter(container: HTMLElement, props?: FooterProps): void {
  const showCTA = props?.showCTA ?? true;
  const showLinks = props?.showLinks ?? true;

  const footerHTML = `
    <footer id="main-footer" class="bg-slate-950 text-white mt-auto" role="contentinfo">
      ${showCTA ? `
        <div class="bg-primary-900/50 border-b border-primary-800">
          <div class="max-w-7xl mx-auto px-4 py-8 text-center">
            <h3 class="text-xl font-bold mb-2">Pronto para formalizar seu negócio?</h3>
            <p class="text-gray-300 mb-4 max-w-lg mx-auto">Entre em contato conosco e tire todas as suas dúvidas sobre os serviços para MEI.</p>
            <a 
              href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
              class="inline-flex items-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              aria-label="Falar no WhatsApp"
            >
              ${footerIcons.whatsapp}
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      ` : ''}

      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                ${footerIcons.logo}
              </div>
              <div>
                <h4 class="font-bold">${APP_CONFIG.siteName}</h4>
                <p class="text-xs text-gray-400">Despachante Digital</p>
              </div>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              ${APP_CONFIG.siteDescription}
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-4 text-lg">Links Rápidos</h4>
            <nav class="space-y-2" aria-label="Links do footer">
              <a href="#servicos" class="block text-gray-400 hover:text-cta-400 transition-colors text-sm">Nossos Serviços</a>
              <a href="#faq" class="block text-gray-400 hover:text-cta-400 transition-colors text-sm">FAQ - Perguntas Frequentes</a>
              <a href="#sobre" class="block text-gray-400 hover:text-cta-400 transition-colors text-sm">Sobre Nós</a>
              <a href="#contato" class="block text-gray-400 hover:text-cta-400 transition-colors text-sm">Fale Conosco</a>
            </nav>
          </div>

          <div>
            <h4 class="font-bold mb-4 text-lg">Contato</h4>
            <div class="space-y-3 text-sm text-gray-400">
              <p class="flex items-center gap-2">
                ${footerIcons.whatsapp}
                <span>WhatsApp disponível</span>
              </p>
              <p>✉️ ${APP_CONFIG.emailContato || 'contato@suporteempreendedor.com.br'}</p>
              ${APP_CONFIG.horarioAtendimento ? `<p>🕐 ${APP_CONFIG.horarioAtendimento}</p>` : ''}
            </div>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-6">
          <div class="bg-amber-950/30 border border-amber-700/50 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <span class="text-amber-500 text-xl">⚠️</span>
              <div>
                <h5 class="font-bold text-amber-500 text-sm mb-2">Aviso Importante</h5>
                <p class="text-xs text-gray-300 leading-relaxed">
                  Este é um serviço <strong>PRIVADO</strong> e <strong>OPCIONAL</strong> de assessoria ao Microempreendedor Individual. 
                  <strong>NÃO</strong> possuímos vínculo com o Governo Federal, Receita Federal, SEBRAE ou qualquer órgão público. 
                  Os serviços oferecidos referem-se à assessoria e intermediação junto aos portais públicos, pelos quais cobramos honorários. 
                  Todos os serviços aqui descritos podem ser realizados gratuitamente pelo próprio empreendedor nos portais oficiais do governo.
                </p>
              </div>
            </div>
          </div>

          ${showLinks ? `
            <div class="flex flex-wrap items-center justify-center gap-4 mb-4">
              <a href="#privacidade" class="text-xs text-gray-500 hover:text-gray-300 transition-colors">Política de Privacidade</a>
              <span class="text-gray-700">|</span>
              <a href="#termos" class="text-xs text-gray-500 hover:text-gray-300 transition-colors">Termos de Uso</a>
              <span class="text-gray-700">|</span>
              <button id="back-to-top" class="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
                ↑ Voltar ao topo
              </button>
            </div>
          ` : ''}

          <div class="text-center text-xs text-gray-500">
            <p>© ${currentYear} ${APP_CONFIG.siteName}. Todos os direitos reservados.</p>
            <p class="mt-1">CNPJ: XX.XXX.XXX/0001-XX | Despachante Independente</p>
          </div>
        </div>
      </div>
    </footer>
  `;

  container.innerHTML = footerHTML;
  initFooterBehavior();
}

function initFooterBehavior(): void {
  const backToTop = document.getElementById('back-to-top');
  
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function renderDisclaimer(container: HTMLElement): void {
  const disclaimerHTML = `
    <div class="bg-amber-950/30 border border-amber-700/50 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <span class="text-amber-500 text-xl flex-shrink-0">⚠️</span>
        <div>
          <h5 class="font-bold text-amber-500 text-sm mb-2">Aviso Legal</h5>
          <p class="text-xs text-gray-300 leading-relaxed">
            Este é um serviço <strong>PRIVADO</strong> e <strong>OPCIONAL</strong> de assessoria ao Microempreendedor Individual. 
            <strong>NÃO</strong> possuímos vínculo com o Governo Federal, Receita Federal, SEBRAE ou qualquer órgão público. 
            Os serviços oferecidos referem-se à assessoria e intermediação junto aos portais públicos, pelos quais cobramos honorários. 
            Todos os serviços aqui descritos podem ser realizados gratuitamente pelo próprio empreendedor nos portais oficiais do governo.
          </p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = disclaimerHTML;
}