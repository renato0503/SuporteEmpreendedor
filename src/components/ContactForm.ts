import type { ServiceId, LeadFormData } from '../types';
import { getServiceById } from '../data/services';
import { validateName, validateCPF, validateCNPJ, validateEmail, validatePhone, validateRequired } from '../utils/validators';
import { maskCPF, maskCNPJ, maskPhone } from '../utils/masks';
import { redirectToWhatsApp, formatWhatsAppMessage } from '../utils/whatsapp';
import { trackFormStart, trackFormSubmit, trackFormError } from '../utils/analytics';
import { $ } from '../utils/dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export interface ContactFormProps {
  serviceId: ServiceId;
  onSubmit?: (data: LeadFormData) => void;
}

const formIcons = {
  user: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`,
  document: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
  building: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
  phone: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>`,
  email: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
  message: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`,
  check: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
  warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 6v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>`,
  spinner: `<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`,
};

const servicesRequiringCNPJ: ServiceId[] = ['dasan', 'parcelamento', 'alteracao-cadastral', 'baixa-mei', 'consulta-situacao'];

function renderFieldIcon(type: string): string {
  const icons: Record<string, string> = {
    text: formIcons.user,
    name: formIcons.user,
    cpf: formIcons.document,
    cnpj: formIcons.building,
    tel: formIcons.phone,
    telefone: formIcons.phone,
    email: formIcons.email,
    textarea: formIcons.message,
  };
  return icons[type] || formIcons.user;
}

export function renderContactForm(container: HTMLElement, props: ContactFormProps): void {
  const { serviceId } = props;
  const service = getServiceById(serviceId);
  const showCNPJ = servicesRequiringCNPJ.includes(serviceId);

  const formHTML = `
    <form id="contact-form" class="space-y-5" novalidate>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              ${formIcons.user}
            </div>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              required
              class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900"
              placeholder="Seu nome completo"
              autocomplete="name"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none validation-icon"></div>
          </div>
          <p class="error-message hidden text-xs text-red-500 mt-1"></p>
        </div>

        <div class="form-group">
          <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">
            CPF <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              ${formIcons.document}
            </div>
            <input 
              type="text" 
              id="cpf" 
              name="cpf" 
              required
              class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900"
              placeholder="000.000.000-00"
              autocomplete="off"
              data-mask="cpf"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none validation-icon"></div>
          </div>
          <p class="error-message hidden text-xs text-red-500 mt-1"></p>
        </div>

        ${showCNPJ ? `
          <div class="form-group md:col-span-2">
            <label for="cnpj" class="block text-sm font-medium text-gray-700 mb-1">
              CNPJ (se tiver)
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                ${formIcons.building}
              </div>
              <input 
                type="text" 
                id="cnpj" 
                name="cnpj" 
                class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900"
                placeholder="00.000.000/0001-00"
                autocomplete="off"
                data-mask="cnpj"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none validation-icon"></div>
            </div>
            <p class="error-message hidden text-xs text-red-500 mt-1"></p>
          </div>
        ` : ''}

        <div class="form-group">
          <label for="telefone" class="block text-sm font-medium text-gray-700 mb-1">
            Telefone / WhatsApp <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              ${formIcons.phone}
            </div>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              required
              class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900"
              placeholder="(00) 00000-0000"
              autocomplete="tel"
              data-mask="phone"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none validation-icon"></div>
          </div>
          <p class="error-message hidden text-xs text-red-500 mt-1"></p>
        </div>

        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            E-mail <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              ${formIcons.email}
            </div>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900"
              placeholder="seu@email.com"
              autocomplete="email"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none validation-icon"></div>
          </div>
          <p class="error-message hidden text-xs text-red-500 mt-1"></p>
        </div>

        <div class="form-group md:col-span-2">
          <label for="observacoes" class="block text-sm font-medium text-gray-700 mb-1">
            Observações <span class="text-gray-400">(opicional)</span>
          </label>
          <div class="relative">
            <div class="absolute top-3 left-3 text-gray-400">
              ${formIcons.message}
            </div>
            <textarea 
              id="observacoes" 
              name="observacoes" 
              rows="3"
              class="form-input w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900 resize-none"
              placeholder="Alguma informação adicional relevante..."
              maxlength="500"
            ></textarea>
            <div class="absolute bottom-3 right-3 text-xs text-gray-400 char-count">
              0/500
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            id="termos" 
            name="termos" 
            required
            class="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span class="text-sm text-gray-600">
            Li e aceito os <a href="#termos" class="text-primary-600 hover:underline">Termos de Uso</a> 
            e <a href="#privacidade" class="text-primary-600 hover:underline">Política de Privacidade</a>
            <span class="text-red-500">*</span>
          </span>
        </label>
        <p class="error-message hidden text-xs text-red-500 mt-1 ml-8"></p>
      </div>

      <button 
        type="submit" 
        id="submit-btn"
        class="w-full bg-cta-500 hover:bg-cta-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <span class="btn-text">🟢 Solicitar Serviço no WhatsApp</span>
        <span class="btn-loading hidden">${formIcons.spinner} Processando...</span>
      </button>

      <p class="text-xs text-gray-500 text-center">
        Seus dados são protegidos conforme nossa 
        <a href="#privacidade" class="text-primary-600 hover:underline">Política de Privacidade</a>
      </p>
    </form>
  `;

  container.innerHTML = formHTML;
  initContactFormBehavior(serviceId, service.nome, service.valorMinimo);
}

function initContactFormBehavior(serviceId: ServiceId, serviceName: string, servicePrice: number): void {
  const form = $('#contact-form') as HTMLFormElement;
  if (!form) return;

  const submitBtn = $('#submit-btn') as HTMLButtonElement;
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  
  let formStarted = false;
  let isSubmitting = false;

  const getFieldType = (name: string): string => {
    const typeMap: Record<string, string> = {
      nome: 'name',
      cpf: 'cpf',
      cnpj: 'cnpj',
      telefone: 'tel',
      email: 'email',
      observacoes: 'text',
    };
    return typeMap[name] || 'text';
  };

  const validateField = (input: HTMLInputElement | HTMLTextAreaElement): { valid: boolean; message?: string } => {
    const { name, value } = input;
    const type = getFieldType(name);
    const trimmed = value.trim();

    if (name === 'termos') {
      return input.checked ? { valid: true } : { valid: false, message: 'Você deve aceitar os termos para continuar' };
    }

    if (!trimmed && (name === 'nome' || name === 'cpf' || name === 'telefone' || name === 'email')) {
      return { valid: false, message: 'Este campo é obrigatório' };
    }

    switch (name) {
      case 'nome':
        return validateName(trimmed);
      case 'cpf':
        return validateCPF(trimmed);
      case 'cnpj':
        if (!trimmed) return { valid: true };
        return validateCNPJ(trimmed);
      case 'telefone':
        return validatePhone(trimmed);
      case 'email':
        return validateEmail(trimmed);
      default:
        return { valid: true };
    }
  };

  const showValidation = (input: HTMLInputElement | HTMLTextAreaElement, result: { valid: boolean; message?: string }): void => {
    const formGroup = input.closest('.form-group') as HTMLElement;
    if (!formGroup) return;

    const errorMsg = formGroup.querySelector('.error-message') as HTMLElement;
    const icon = formGroup.querySelector('.validation-icon') as HTMLElement;

    formGroup.classList.remove('valid', 'invalid');

    if (input.value.trim() === '') {
      errorMsg?.classList.add('hidden');
      icon && (icon.innerHTML = '');
      return;
    }

    if (result.valid) {
      formGroup.classList.add('valid');
      formGroup.classList.remove('invalid');
      icon && (icon.innerHTML = `<span class="text-green-500">${formIcons.check}</span>`);
      errorMsg?.classList.add('hidden');
    } else {
      formGroup.classList.add('invalid');
      formGroup.classList.remove('valid');
      icon && (icon.innerHTML = `<span class="text-red-500">${formIcons.warning}</span>`);
      if (errorMsg && result.message) {
        errorMsg.textContent = result.message;
        errorMsg.classList.remove('hidden');
      }
    }
  };

  inputs.forEach((input) => {
    const mask = input.getAttribute('data-mask');

    input.addEventListener('input', () => {
      if (!formStarted) {
        formStarted = true;
        trackFormStart(serviceId);
      }

      if (mask === 'cpf') {
        input.value = maskCPF(input.value);
      } else if (mask === 'cnpj') {
        input.value = maskCNPJ(input.value);
      } else if (mask === 'phone') {
        input.value = maskPhone(input.value);
      }

      if (input.name === 'observacoes') {
        const counter = form.querySelector('.char-count') as HTMLElement;
        if (counter) {
          counter.textContent = `${input.value.length}/500`;
        }
      }
    });

    input.addEventListener('blur', () => {
      const result = validateField(input);
      showValidation(input, result);
    });
  });

  const validateAll = (): { valid: boolean; firstError?: HTMLInputElement | HTMLTextAreaElement } => {
    let firstError: HTMLInputElement | HTMLTextAreaElement | undefined;
    
    inputs.forEach((input) => {
      const result = validateField(input);
      showValidation(input, result);
      if (!result.valid && !firstError) {
        firstError = input;
      }
    });

    return { valid: !firstError, firstError };
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const { valid, firstError } = validateAll();

    if (!valid) {
      trackFormError(serviceId, 'validation_error');
      firstError?.focus();
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');
    
    const btnText = submitBtn.querySelector('.btn-text') as HTMLElement;
    const btnLoading = submitBtn.querySelector('.btn-loading') as HTMLElement;
    btnText?.classList.add('hidden');
    btnLoading?.classList.remove('hidden');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const formData = new FormData(form);
    const leadData: LeadFormData = {
      nome: formData.get('nome') as string,
      cpf: formData.get('cpf') as string,
      cnpj: formData.get('cnpj') as string || undefined,
      telefone: formData.get('telefone') as string,
      email: formData.get('email') as string,
      servicoId: serviceId,
      servicoNome: serviceName,
      valorHonorario: servicePrice,
      observacoes: formData.get('observacoes') as string || undefined,
      consentimento: Boolean(formData.get('termos')),
      dataConsentimento: new Date(),
    };

    trackFormSubmit(serviceId, servicePrice);
    
    // CRM Activation: Save lead to Firestore
    try {
      await addDoc(collection(db, 'leads'), {
        ...leadData,
        createdAt: new Date(),
        status: 'novo',
        origem: window.location.hostname
      });
      console.log('CRM: Lead capturado com sucesso');
    } catch (error) {
      console.error('CRM: Erro ao salvar lead:', error);
    }

    redirectToWhatsApp(leadData);

    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-75');
    btnText?.classList.remove('hidden');
    btnLoading?.classList.add('hidden');
  });
}

export function isFormValid(): boolean {
  const form = $('#contact-form') as HTMLFormElement;
  return form ? form.checkValidity() : false;
}

export function resetForm(): void {
  const form = $('#contact-form') as HTMLFormElement;
  form?.reset();

  const groups = document.querySelectorAll('.form-group');
  groups.forEach((group) => {
    group.classList.remove('valid', 'invalid');
    const errorMsg = group.querySelector('.error-message');
    const icon = group.querySelector('.validation-icon');
    errorMsg?.classList.add('hidden');
    if (icon) icon.innerHTML = '';
  });

  const counter = document.querySelector('.char-count');
  if (counter) counter.textContent = '0/500';
}