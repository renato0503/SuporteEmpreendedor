import { $ } from '../utils/dom';

export interface ModalProps {
  title: string;
  content: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

let activeModal: HTMLElement | null = null;

export function renderModal(props: ModalProps): void {
  const { title, content, onClose, showCloseButton = true, size = 'md' } = props;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  const overlayHTML = `
    <div 
      id="modal-overlay" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        id="modal-container"
        class="modal-container ${sizeClasses[size]} w-full bg-white rounded-2xl shadow-2xl transform scale-95 transition-transform duration-300 overflow-hidden"
      >
        <div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <h2 id="modal-title" class="text-xl font-bold text-gray-900">${title}</h2>
          ${showCloseButton ? `
            <button 
              id="modal-close" 
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fechar modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          ` : ''}
        </div>
        
        <div class="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          <div id="modal-content" class="prose prose-sm md:prose max-w-none text-gray-600">
            ${content}
          </div>
        </div>
        
        <div class="p-4 md:p-6 border-t border-gray-100 bg-gray-50">
          <button 
            id="modal-action" 
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Ok, entendi
          </button>
        </div>
      </div>
    </div>
  `;

  closeModal();

  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-root';
  document.body.appendChild(modalContainer);
  modalContainer.innerHTML = overlayHTML;

  activeModal = modalContainer;

  requestAnimationFrame(() => {
    const overlay = $('#modal-overlay');
    const container = $('#modal-container');
    
    overlay?.classList.remove('opacity-0');
    container?.classList.remove('scale-95');
    container?.classList.add('scale-100');
  });

  initModalBehavior(onClose);
}

function initModalBehavior(onClose?: () => void): void {
  const overlay = $('#modal-overlay');
  const closeBtn = $('#modal-close');
  const actionBtn = $('#modal-action');
  const container = $('#modal-container');

  const close = () => {
    overlay?.classList.add('opacity-0');
    container?.classList.remove('scale-100');
    container?.classList.add('scale-95');

    setTimeout(() => {
      closeModal();
      onClose?.();
    }, 300);
  };

  closeBtn?.addEventListener('click', close);
  actionBtn?.addEventListener('click', close);

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      close();
    }
  });

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  document.addEventListener('keydown', handleEscape);

  const focusableElements = activeModal?.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements?.[0];
  const lastFocusable = focusableElements?.[focusableElements.length - 1];

  firstFocusable?.focus();

  activeModal?.addEventListener('keydown', (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  });

  setTimeout(() => {
    if (activeModal) {
      activeModal.addEventListener('remove', () => {
        document.removeEventListener('keydown', handleEscape);
      }, { once: true });
    }
  }, 0);
}

export function closeModal(): void {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
}

export function isModalOpen(): boolean {
  return activeModal !== null;
}

export function showTermsModal(): void {
  const content = `
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Termos de Uso</h3>
    
    <p class="mb-4">Última atualização: ${new Date().toLocaleDateString('pt-BR')}</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">1. Objetivo</h4>
    <p class="mb-4">Este documento estabelece os termos e condições para utilização dos serviços oferecido por Suporte Empreendedor.</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">2. Serviços Oferecidos</h4>
    <p class="mb-4">Prestamos serviços de assessoria e intermediação junto aos órgãos públicos para formalização e manutenção de Microempreendedores Individuais (MEI).</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">3. Responsabilidades do Usuário</h4>
    <ul class="list-disc pl-4 mb-4">
      <li>Fornecer informações verdadeiras e completas</li>
      <li>Manter seus dados atualizados</li>
      <li>Responsabilizar-se pela veracidade das informações</li>
    </ul>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">4. Limitação de Responsabilidade</h4>
    <p class="mb-4">Não nos responsabilizamos por decisões tomadas pelo usuário baseadas nas informações fornecidas em nosso site.</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">5. Propriedade Intelectual</h4>
    <p class="mb-4">Todo o conteúdo deste site é de nossa propriedade e não pode ser reproduzido sem autorização prévia.</p>
  `;

  renderModal({ title: 'Termos de Uso', content });
}

export function showPrivacyModal(): void {
  const content = `
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Política de Privacidade</h3>
    
    <p class="mb-4">Última atualização: ${new Date().toLocaleDateString('pt-BR')}</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">1. Coleta de Dados</h4>
    <p class="mb-4">Coletamos apenas os dados necessários para prestação dos serviços solicitados, incluindo nome, CPF, telefone, e-mail e dados relacionados ao serviço contratado.</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">2. Uso dos Dados</h4>
    <ul class="list-disc pl-4 mb-4">
      <li>Prestação dos serviços solicitados</li>
      <li>Comunicação sobre o andamento dos serviços</li>
      <li>Melhoria de nossos serviços</li>
    </ul>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">3. Proteção dos Dados</h4>
    <p class="mb-4">Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado, alteração ou destruição.</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">4. Compartilhamento</h4>
    <p class="mb-4">Seus dados podem ser compartilhados com parceiros terceiros exclusivamente para prestação dos serviços, mediante compromisso de confidencialidade.</p>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">5. Seus Direitos</h4>
    <ul class="list-disc pl-4 mb-4">
      <li>Acessar seus dados pessoais</li>
      <li>Corrigir dados incorretos</li>
      <li>Solicitar exclusão de dados</li>
      <li>Revogar consentimento</li>
    </ul>
    
    <h4 class="font-semibold text-gray-900 mb-2 mt-4">6. Contato</h4>
    <p class="mb-4">Para exercer seus direitos ou esclarecer dúvidas, entre em contato pelo e-mail: contato@suporteempreendedor.com.br</p>
  `;

  renderModal({ title: 'Política de Privacidade', content });
}