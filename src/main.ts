import type { Service, ServiceId, FormField, BeforeInstallPromptEvent } from './types';
import { APP_CONFIG, WHATSAPP_BASE_URL } from './data/config';
import { SERVICES, getServiceById } from './data/services';

const icons: Record<string, string> = {
  briefcase: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
  document: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
  calculator: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
  pencil: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
  trash: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`,
  search: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
};

interface LocalService {
  id: string;
  nome: string;
  descricaoCurta: string;
  valorMinimo: number;
  icone: string;
}

const localServices: LocalService[] = [
  { id: 'abertura-mei', nome: 'Abertura de MEI', descricaoCurta: 'Formalize seu negócio e become um Microempreendedor Individual', valorMinimo: 97, icone: 'briefcase' },
  { id: 'dasan', nome: 'Declaração Anual (DASN)', descricaoCurta: 'Declaração Simplificada do Microempreendedor Individual', valorMinimo: 67, icone: 'document' },
  { id: 'parcelamento', nome: 'Parcelamento de Débitos', descricaoCurta: 'Parcele suas dívidas do MEI em até 60 vezes', valorMinimo: 127, icone: 'calculator' },
  { id: 'alteracao-cadastral', nome: 'Alteração Cadastral', descricaoCurta: 'Atualize seus dados cadastrais no MEI', valorMinimo: 67, icone: 'pencil' },
  { id: 'baixa-mei', nome: 'Baixa do MEI', descricaoCurta: 'Encerre sua atividade como Microempreendedor Individual', valorMinimo: 97, icone: 'trash' },
  { id: 'consulta-situacao', nome: 'Consulta de Situação', descricaoCurta: 'Verifique a situação cadastral do seu MEI', valorMinimo: 47, icone: 'search' },
];

const formFieldsConfig: Record<string, FormField[]> = {
  'abertura-mei': [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'cep', label: 'CEP', type: 'cep', required: true },
    { name: 'atividade', label: 'Atividade Principal (CBO)', type: 'text', required: true },
  ],
  'dasan': [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'cnpj', label: 'CNPJ MEI', type: 'cnpj', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
    { name: 'faturamento', label: 'Faturamento Anual', type: 'text', required: false },
  ],
  parcelamento: [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'cnpj', label: 'CNPJ MEI', type: 'cnpj', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
    { name: 'valor_divida', label: 'Valor aproximado da dívida', type: 'text', required: true },
  ],
  'alteracao-cadastral': [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'cnpj', label: 'CNPJ MEI', type: 'cnpj', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
    { name: 'alteracao', label: 'O que deseja alterar?', type: 'textarea', required: true },
  ],
  'baixa-mei': [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'cnpj', label: 'CNPJ MEI', type: 'cnpj', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
    { name: 'motivo', label: 'Motivo da baixa', type: 'textarea', required: false },
  ],
  'consulta-situacao': [
    { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
    { name: 'cpf', label: 'CPF', type: 'cpf', required: true },
    { name: 'cnpj', label: 'CNPJ MEI', type: 'cnpj', required: true },
    { name: 'telefone', label: 'Telefone com WhatsApp', type: 'tel', required: true },
  ],
};

let currentService: LocalService | null = null;

function showPage(pageId: string): void {
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });
  const page = document.getElementById(`page-${pageId}`);
  if (page) {
    page.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderServices(): void {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = localServices
    .map(
      (service) => `
    <button class="service-card bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left border border-gray-100 hover:border-primary-200" data-service="${service.id}">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
          ${icons[service.icone]}
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 mb-1">${service.nome}</h4>
          <p class="text-sm text-gray-500 mb-2">${service.descricaoCurta}</p>
          <span class="text-lg font-bold text-cta-500">R$ ${service.valorMinimo},00</span>
        </div>
      </div>
    </button>
  `
    )
    .join('');

  grid.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => {
      const serviceId = card.getAttribute('data-service');
      const service = localServices.find((s) => s.id === serviceId);
      if (service) {
        currentService = service;
        renderServiceForm(service);
        showPage('service');
      }
    });
  });
}

function renderServiceForm(service: LocalService): void {
  const content = document.getElementById('service-content');
  if (!content) return;

  const fields = formFieldsConfig[service.id] || [];
  const serviceData = SERVICES.find((s) => s.id === service.id);

  content.innerHTML = `
    <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <button id="back-btn" class="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-4">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Voltar
      </button>
      
      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
          ${icons[service.icone]}
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">${service.nome}</h2>
          <p class="text-2xl font-bold text-cta-500">R$ ${service.valorMinimo},00</p>
        </div>
      </div>

      ${serviceData?.descricaoCurta ? `<p class="text-gray-600 mb-6">${serviceData.descricaoCurta}</p>` : ''}

      <form id="service-form" class="space-y-4">
        ${fields
          .map((field) => {
            const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-gray-900';
            const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
            
            let input = '';
            if (field.type === 'textarea') {
              input = `<textarea name="${field.name}" ${field.required ? 'required' : ''} rows="3" class="${inputClass}" placeholder="${field.label}"></textarea>`;
            } else {
              input = `<input type="${field.type === 'email' ? 'email' : 'text'}" name="${field.name}" ${field.required ? 'required' : ''} class="${inputClass}" placeholder="${field.label}" data-type="${field.type}">`;
            }
            
            return `
              <div>
                <label class="${labelClass}">${field.label}${field.required ? ' *' : ''}</label>
                ${input}
              </div>
            `;
          })
          .join('')}
        
        <button type="submit" class="w-full bg-cta-500 text-white font-semibold py-4 rounded-lg hover:bg-cta-600 transition-all mt-6">
          Enviar dados via WhatsApp
        </button>
      </form>
    </div>
  `;

  document.getElementById('back-btn')?.addEventListener('click', () => {
    showPage('home');
    currentService = null;
  });

  setupMasks();
  setupFormSubmit(service);
}

function setupMasks(): void {
  document.querySelectorAll('[data-type]').forEach((input) => {
    const el = input as HTMLInputElement;
    const type = el.getAttribute('data-type');

    el.addEventListener('input', () => {
      if (type === 'cpf') {
        el.value = maskCPF(el.value);
      } else if (type === 'cnpj') {
        el.value = maskCNPJ(el.value);
      } else if (type === 'tel') {
        el.value = maskTelefone(el.value);
      } else if (type === 'cep') {
        el.value = maskCEP(el.value);
      }
    });
  });
}

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function maskCNPJ(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function maskTelefone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  if (digits.length <= 8) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function maskCEP(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(digits[9])) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  return remainder === Number(digits[10]);
}

function validateCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;
  
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(digits[i]) * weights1[i];
  let remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== Number(digits[12])) return false;
  
  sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(digits[i]) * weights2[i];
  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  return remainder === Number(digits[13]);
}

function setupFormSubmit(service: LocalService): void {
  const form = document.getElementById('service-form') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    const cpfField = form.querySelector('[name="cpf"]') as HTMLInputElement;
    const cnpjField = form.querySelector('[name="cnpj"]') as HTMLInputElement;

    if (cpfField && cpfField.value && !validateCPF(cpfField.value)) {
      alert('CPF inválido. Por favor, insira um CPF válido.');
      cpfField.focus();
      return;
    }

    if (cnpjField && cnpjField.value && !validateCNPJ(cnpjField.value)) {
      alert('CNPJ inválido. Por favor, insira um CNPJ válido.');
      cnpjField.focus();
      return;
    }

    const message = buildWhatsAppMessage(service, data);
    const phone = APP_CONFIG.whatsappNumber;
    const url = `${WHATSAPP_BASE_URL}/${phone}?text=${encodeURIComponent(message)}`;
    
    const link = document.getElementById('whatsapp-link') as HTMLAnchorElement;
    if (link) {
      link.href = url;
    }
    
    showPage('confirmation');
  });
}

function buildWhatsAppMessage(service: LocalService, data: Record<string, string>): string {
  const fields = formFieldsConfig[service.id] || [];
  
  const lines = [
    `*${service.nome}*`,
    '',
    `_Valor: R$ ${service.valorMinimo},00_`,
    '',
    '---',
    'Dados do cliente:',
    '',
  ];

  for (const field of fields) {
    const value = data[field.name] || '-';
    lines.push(`*${field.label}:* ${value}`);
  }

  lines.push('', '---', '', '_Enviado via Suporte Empreendedor_');
  return lines.join('\n');
}

function initMobileMenu(): void {
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.remove('hidden');
  });

  closeMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });
}

function initInstallPrompt(): void {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;
  const installPrompt = document.getElementById('install-prompt');
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    installPrompt?.classList.remove('hidden');
  });

  installBtn?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installPrompt?.classList.add('hidden');
      }
      deferredPrompt = null;
    }
  });
}

function initBackHome(): void {
  document.getElementById('back-home-btn')?.addEventListener('click', () => {
    showPage('home');
    currentService = null;
  });
}

function initApp(): void {
  renderServices();
  initMobileMenu();
  initInstallPrompt();
  initBackHome();
}

document.addEventListener('DOMContentLoaded', initApp);

export {};