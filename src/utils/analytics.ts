declare global {
  interface Window {
    gtag: ((command: string, ...args: unknown[]) => void) | undefined;
    fbq: ((command: string, ...args: unknown[]) => void) | undefined;
    dataLayer: unknown[];
  }
}

export function initGA(measurementId: string): void {
  if (!measurementId || typeof measurementId !== 'string') {
    console.warn('Analytics: GA measurement ID inválido');
    return;
  }

  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]): void {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('Analytics: GA inicializado', measurementId);
}

export function initMetaPixel(pixelId: string): void {
  if (!pixelId || typeof pixelId !== 'string') {
    console.warn('Analytics: Meta Pixel ID inválido');
    return;
  }

  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/pt_BR/fbevents.js';
  document.head.appendChild(script);

  window.fbq = function fbq(...args: unknown[]): void {
    window.dataLayer.push(args);
  };
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  console.log('Analytics: Meta Pixel inicializado', pixelId);
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('config', window.gtag, {
      page_path: path,
      page_title: title,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'PageView');
  }

  console.log('Analytics: PageView', path, title);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (window.fbq) {
    window.fbq('track', eventName, params);
  }

  console.log('Analytics: Event', eventName, params);
}

export function trackServiceClick(serviceId: string): void {
  trackEvent('service_click', {
    service_id: serviceId,
    event_category: 'engagement',
    event_label: `Click no serviço: ${serviceId}`,
  });
}

export function trackServiceView(serviceId: string): void {
  trackEvent('service_view', {
    service_id: serviceId,
    event_category: 'engagement',
    event_label: `Visualização do serviço: ${serviceId}`,
  });
}

export function trackFormStart(serviceId: string): void {
  trackEvent('form_start', {
    service_id: serviceId,
    event_category: 'conversion',
    event_label: `Início do formulário: ${serviceId}`,
  });
}

export function trackFormSubmit(serviceId: string, value: number): void {
  trackEvent('form_submit', {
    service_id: serviceId,
    event_category: 'conversion',
    event_label: `Envio do formulário: ${serviceId}`,
    value: value,
    currency: 'BRL',
  });
}

export function trackFormError(serviceId: string, errorType: string): void {
  trackEvent('form_error', {
    service_id: serviceId,
    event_category: 'error',
    event_label: `Erro no formulário: ${errorType}`,
  });
}

export function trackWhatsAppRedirect(serviceId: string): void {
  trackEvent('whatsapp_redirect', {
    service_id: serviceId,
    event_category: 'conversion',
    event_label: `Redirect para WhatsApp: ${serviceId}`,
  });
}

export function trackWhatsAppClick(serviceId: string): void {
  trackEvent('whatsapp_click', {
    service_id: serviceId,
    event_category: 'engagement',
    event_label: `Clique no WhatsApp: ${serviceId}`,
  });
}

export function trackButtonClick(buttonName: string, location: string): void {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location,
    event_category: 'engagement',
  });
}

export function trackScrollDepth(depth: number): void {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
  });
}

export function trackTimeOnPage(seconds: number): void {
  trackEvent('time_on_page', {
    time_seconds: seconds,
    event_category: 'engagement',
  });
}

export function trackExternalLinkClick(url: string, text: string): void {
  trackEvent('outbound_click', {
    outbound_url: url,
    outbound_text: text,
    event_category: 'engagement',
  });
}

export function trackInstallPromptShown(): void {
  trackEvent('install_prompt_shown', {
    event_category: 'engagement',
    event_label: 'PWA install prompt mostrado',
  });
}

export function trackInstallPromptAccepted(): void {
  trackEvent('install_prompt_accepted', {
    event_category: 'conversion',
    event_label: 'PWA instalado',
  });
}

export function trackInstallPromptDismissed(): void {
  trackEvent('install_prompt_dismissed', {
    event_category: 'engagement',
    event_label: 'PWA install prompt fechado',
  });
}

export function trackSearch(query: string, resultsCount: number): void {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    event_category: 'engagement',
  });
}

export function trackContactClick(method: 'whatsapp' | 'email' | 'form'): void {
  trackEvent('contact_click', {
    contact_method: method,
    event_category: 'conversion',
  });
}

export function setUserProperties(properties: Record<string, string | number | boolean>): void {
  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
}

export function trackTiming(category: string, variable: string, value: number, label?: string): void {
  trackEvent('timing_complete', {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
}

export function trackException(description: string, fatal: boolean = false): void {
  trackEvent('exception', {
    description: description,
    fatal: fatal,
  });
}

export function isGAInitialized(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function isMetaPixelInitialized(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

export function getAnalyticsStatus(): { ga: boolean; meta: boolean } {
  return {
    ga: isGAInitialized(),
    meta: isMetaPixelInitialized(),
  };
}