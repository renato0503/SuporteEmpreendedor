import { getServiceBySlug, getServiceById } from '../data/services';
import type { ServiceId } from '../types';
import { renderContactForm } from '../components/ContactForm';
import { renderAccordion } from '../components/Accordion';
import { router } from '../router';
import { $ } from '../utils/dom';
import { slideIn } from '../utils/animations';

const serviceIcons: Record<string, string> = {
  briefcase: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
  document: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
  calculator: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
  pencil: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
  trash: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`,
  search: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
};

const slugToServiceId: Record<string, ServiceId> = {
  'abertura': 'abertura-mei',
  'abertura-mei': 'abertura-mei',
  'declaracao': 'dasan',
  'declaracao-anual': 'dasan',
  'dasan': 'dasan',
  'parcelamento': 'parcelamento',
  'parcelamento-debitos': 'parcelamento',
  'alteracao': 'alteracao-cadastral',
  'alteracao-cadastral': 'alteracao-cadastral',
  'baixa': 'baixa-mei',
  'baixa-mei': 'baixa-mei',
  'encerramento': 'baixa-mei',
  'consulta': 'consulta-situacao',
  'consulta-situacao': 'consulta-situacao',
};

function getServiceIdFromSlug(slug: string): ServiceId | null {
  return slugToServiceId[slug] || null;
}

export function renderServicePage(container: HTMLElement, slug: string): void {
  const serviceId = getServiceIdFromSlug(slug);

  if (!serviceId) {
    renderNotFoundPage(container);
    return;
  }

  let service;
  try {
    service = getServiceById(serviceId);
  } catch {
    renderNotFoundPage(container);
    return;
  }

  const icon = serviceIcons[service.icone] || serviceIcons.briefcase;

  const pageHTML = `
    <div id="service-page" class="page-content py-8">
      <!-- Breadcrumb -->
      <nav class="max-w-4xl mx-auto px-4 mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm">
          <li>
            <a href="#/" class="text-primary-600 hover:text-primary-700">Home</a>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <a href="#servicos" class="text-primary-600 hover:text-primary-700">Serviços</a>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-600 font-medium">${service.nome}</li>
        </ol>
      </nav>

      <!-- Back Button -->
      <div class="max-w-4xl mx-auto px-4 mb-6">
        <button id="back-btn" class="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Voltar para serviços
        </button>
      </div>

      <!-- Service Info -->
      <div class="max-w-4xl mx-auto px-4 mb-8">
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
              ${icon}
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">${service.nome}</h1>
              <p class="text-3xl font-bold text-cta-500">R$ ${service.valorMinimo},00</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-3 text-gray-600">
              <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Prazo: ${service.prazoEstimado}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>Processamento rápido</span>
            </div>
          </div>

          <div class="prose max-w-none text-gray-600 mb-6">
            ${service.descricaoCompleta.split('\n\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
          </div>

          ${service.documentosNecessarios.length > 0 ? `
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-3">Documentos necessários:</h3>
              <ul class="space-y-2">
                ${service.documentosNecessarios.map(doc => `
                  <li class="flex items-center gap-2 text-gray-600">
                    <svg class="w-4 h-4 text-cta-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${doc}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          ${service.beneficios.length > 0 ? `
            <div class="mt-6">
              <h3 class="font-semibold text-gray-900 mb-3">Benefícios:</h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                ${service.beneficios.map(beneficio => `
                  <li class="flex items-center gap-2 text-gray-600">
                    <span class="text-cta-500">✓</span>
                    ${beneficio}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Contact Form -->
      <div class="max-w-2xl mx-auto px-4 mb-8">
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Solicitar este serviço</h2>
          <div id="contact-form-container"></div>
        </div>
      </div>

      <!-- FAQ do Serviço -->
      ${service.faq.length > 0 ? `
        <div class="max-w-3xl mx-auto px-4">
          <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
            <div id="service-faq-container"></div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  container.innerHTML = pageHTML;

  const backBtn = document.getElementById('back-btn');
  backBtn?.addEventListener('click', () => {
    router.navigate('/');
  });

  const formContainer = document.getElementById('contact-form-container');
  if (formContainer) {
    renderContactForm(formContainer, { serviceId });
  }

  const faqContainer = document.getElementById('service-faq-container');
  if (faqContainer && service.faq.length > 0) {
    renderAccordion(faqContainer, { items: service.faq, allowMultiple: false });
  }

  setTimeout(() => {
    const page = document.getElementById('service-page');
    if (page) {
      page.style.opacity = '0';
      page.style.transform = 'translateX(30px)';
      page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      requestAnimationFrame(() => {
        page.style.opacity = '1';
        page.style.transform = 'translateX(0)';
      });
    }
  }, 50);
}

export function renderNotFoundPage(container: HTMLElement): void {
  const { renderServicePage } = require('./NotFoundPage');
  renderServicePage(container);
}

export function destroyServicePage(): void {
  const page = document.getElementById('service-page');
  page?.remove();
}