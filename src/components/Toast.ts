import { $ } from '../utils/dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  dismissible?: boolean;
}

const toastIcons: Record<ToastType, string> = {
  success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
  info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
};

const toastColors: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  success: { bg: 'bg-green-50', border: 'border-green-400', icon: 'text-green-500', text: 'text-green-800' },
  error: { bg: 'bg-red-50', border: 'border-red-400', icon: 'text-red-500', text: 'text-red-800' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-400', icon: 'text-amber-500', text: 'text-amber-800' },
  info: { bg: 'bg-blue-50', border: 'border-blue-400', icon: 'text-blue-500', text: 'text-blue-800' },
};

const toastPositions: Record<string, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

let toastContainer: HTMLElement | null = null;

function getOrCreateContainer(position: string = 'top-right'): HTMLElement {
  if (toastContainer) {
    return toastContainer;
  }

  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.className = `fixed ${toastPositions[position]} z-[100] flex flex-col gap-2 p-4 max-w-sm w-full pointer-events-none`;
  document.body.appendChild(toastContainer);

  return toastContainer;
}

export function showToast(message: string, type: ToastType = 'info', options?: ToastOptions): void {
  const duration = options?.duration ?? 5000;
  const position = options?.position ?? 'top-right';
  const dismissible = options?.dismissible ?? true;

  const container = getOrCreateContainer(position);
  const colors = toastColors[type];
  const id = `toast-${Date.now()}`;

  const toastHTML = `
    <div 
      id="${id}"
      class="toast-item pointer-events-auto ${colors.bg} ${colors.border} border-l-4 rounded-lg shadow-lg p-4 flex items-start gap-3 transform transition-all duration-300 translate-x-full opacity-0"
      role="alert"
      aria-live="polite"
    >
      <span class="${colors.icon} flex-shrink-0">${toastIcons[type]}</span>
      <p class="${colors.text} text-sm flex-1">${message}</p>
      ${dismissible ? `
        <button 
          class="toast-close ${colors.icon} hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Fechar notificação"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      ` : ''}
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHTML);

  const toast = document.getElementById(id);
  if (!toast) return;

  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
  });

  const closeToast = () => {
    toast.classList.remove('translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-full', 'opacity-0');
    
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn?.addEventListener('click', closeToast);

  if (duration > 0) {
    setTimeout(closeToast, duration);
  }
}

export function showSuccessToast(message: string, options?: ToastOptions): void {
  showToast(message, 'success', options);
}

export function showErrorToast(message: string, options?: ToastOptions): void {
  showToast(message, 'error', options);
}

export function showWarningToast(message: string, options?: ToastOptions): void {
  showToast(message, 'warning', options);
}

export function showInfoToast(message: string, options?: ToastOptions): void {
  showToast(message, 'info', options);
}

export function clearAllToasts(): void {
  const container = document.getElementById('toast-container');
  container?.remove();
  toastContainer = null;
}