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
    <footer id="main-footer" class="bg-[#125133] text-white mt-auto border-t border-white/5" role="contentinfo">
      ${showCTA ? `
        <div class="bg-primary-900/30 border-b border-white/5 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-cta-500/10 opacity-50"></div>
          <div class="max-w-7xl mx-auto px-4 py-16 relative text-center">
            <h3 class="text-3xl md:text-4xl font-black mb-6 leading-tight">Pronto para formalizar <br class="md:hidden"/> seu negócio?</h3>
            <p class="text-primary-200/80 mb-10 max-w-lg mx-auto text-lg">Entre em contato hoje mesmo e resolva suas pendências MEI com segurança.</p>
            <a 
              href="https://wa.me/${APP_CONFIG.whatsappNumber}" 
              class="inline-flex items-center gap-3 bg-[#F18825] hover:bg-[#d16e11] text-white font-black px-10 py-5 rounded-2xl transition-all shadow-2xl hover:-translate-y-1 active:scale-95"
              aria-label="Falar no WhatsApp"
            >
              ${footerIcons.whatsapp}
              <span>Falar com Especialista</span>
            </a>
          </div>
        </div>
      ` : ''}

      <div class="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div class="md:col-span-5">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl">
                <img src="logo.png" alt="Logo" class="w-8 h-8 object-contain">
              </div>
              <div>
                <h4 class="text-xl font-black tracking-tight">${APP_CONFIG.siteName}</h4>
                <p class="text-[10px] uppercase tracking-widest text-primary-400 font-bold">Despachante Digital</p>
              </div>
            </div>
            <p class="text-primary-200/60 leading-relaxed text-sm max-w-sm">
              Sua parceira estratégica na gestão do MEI. Tecnologia e expertise para simplificar sua jornada empreendedora.
            </p>
          </div>

          <div class="md:col-span-3">
            <h4 class="font-black mb-8 text-sm uppercase tracking-widest text-white/50">Navegação</h4>
            <nav class="flex flex-col gap-4 text-sm font-bold" aria-label="Links do footer">
              <a href="#servicos" class="text-primary-200/60 hover:text-cta-400 transition-colors">Serviços</a>
              <a href="#faq" class="text-primary-200/60 hover:text-cta-400 transition-colors">Dúvidas Frequentes</a>
              <a href="#sobre" class="text-primary-200/60 hover:text-cta-400 transition-colors">Quem Somos</a>
              <a href="#contato" class="text-primary-200/60 hover:text-cta-400 transition-colors">Suporte Direto</a>
            </nav>
          </div>

          <div class="md:col-span-4">
            <h4 class="font-black mb-8 text-sm uppercase tracking-widest text-white/50">Atendimento Oficial</h4>
            <div class="space-y-4 text-sm font-bold">
              <a href="https://wa.me/${APP_CONFIG.whatsappNumber}" class="flex items-center gap-3 text-primary-200/60 hover:text-emerald-400 transition-colors group">
                <span class="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  ${footerIcons.whatsapp}
                </span>
                <span>WhatsApp Express</span>
              </a>
              <div class="flex items-center gap-3 text-primary-200/60">
                 <span class="p-2 bg-white/5 rounded-lg">✉️</span>
                 <span>${APP_CONFIG.emailContato || 'contato@suporteempreendedor.com.br'}</span>
              </div>
              <div class="flex items-center gap-3 text-primary-200/60">
                 <span class="p-2 bg-white/5 rounded-lg">🕐</span>
                 <span>Atendimento: Seg - Sex</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-white/5 pt-12">
          <div class="bg-primary-900/20 border border-white/5 rounded-3xl p-6 md:p-8 mb-12">
            <div class="flex items-start gap-4">
              <span class="p-3 bg-amber-500/10 text-amber-500 rounded-2xl text-2xl flex-shrink-0 animate-pulse">⚠️</span>
              <div>
                <h5 class="font-black text-amber-500 text-sm mb-3 uppercase tracking-widest">Aviso Importante / Disclaimer</h5>
                <p class="text-[11px] md:text-xs text-primary-200/60 leading-relaxed font-medium">
                  Este é um serviço <strong>PRIVADO</strong> e <strong>OPCIONAL</strong> de assessoria ao Microempreendedor Individual (MEI). 
                  <strong>NÃO</strong> possuímos vínculo com o Governo Federal, Receita Federal ou qualquer órgão público. 
                  Os serviços oferecidos referem-se à assessoria técnica e intermediação, pelos quais cobramos honorários fixos e transparentes. 
                  Todos os processos descritos podem ser realizados gratuitamente pelo empreendedor diretamente nos portais oficiais do governo (gov.br).
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

          <div class="text-center text-xs text-white/40">
            <p>© ${currentYear} ${APP_CONFIG.siteName}. Todos os direitos reservados.</p>
            <p class="mt-1">${APP_CONFIG.companyName} | CNPJ: ${APP_CONFIG.cnpj} | 📍 Cuiabá - MT</p>
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