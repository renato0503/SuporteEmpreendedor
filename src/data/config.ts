import type { AppConfig } from '../types';

export const APP_CONFIG: AppConfig = {
  whatsappNumber: '5500000000000',
  siteName: 'Suporte Empreendedor',
  siteDescription: 'Despachante digital especializado em serviços para MEIs. Abertura, Declaração, Parcelamento e muito mais.',
  gaId: '',
  metaPixelId: '',
  emailContato: 'contato@suporteempreendedor.com.br',
  endereco: '',
  horarioAtendimento: 'Segunda a sexta, das 9h às 18h',
};

export const WHATSAPP_BASE_URL = 'https://wa.me';

export const ROUTES = {
  HOME: '/',
  SERVICOS: '/servicos',
  SERVICO: '/servico/:slug',
  SOBRE: '/sobre',
  CONTATO: '/contato',
  CONFIRMACAO: '/confirmacao',
  PRIVACIDADE: '/privacidade',
  TERMOS: '/termos',
} as const;

export const SEO_DEFAULTS = {
  title: APP_CONFIG.siteName,
  description: APP_CONFIG.siteDescription,
  canonical: 'https://suporteempreendedor.com.br',
  ogImage: '/assets/images/og-default.png',
};

export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563EB',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1E3A5F',
  },
  cta: {
    400: '#34d399',
    500: '#10B981',
    600: '#059669',
  },
  footer: '#0F172A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const SERVICE_PRICES = {
  'abertura-mei': { min: 97, average: 97 },
  'dasan': { min: 67, average: 67 },
  'parcelamento': { min: 127, average: 127 },
  'alteracao-cadastral': { min: 67, average: 67 },
  'baixa-mei': { min: 97, average: 97 },
  'consulta-situacao': { min: 47, average: 47 },
} as const;

export const VALIDATION_MESSAGES = {
  required: 'Este campo é obrigatório',
  invalidCPF: 'CPF inválido',
  invalidCNPJ: 'CNPJ inválido',
  invalidEmail: 'E-mail inválido',
  invalidPhone: 'Telefone inválido',
  invalidCEP: 'CEP inválido',
  minLength: 'Quantidade mínima de caracteres não atingida',
  maxLength: 'Quantidade máxima de caracteres excedida',
} as const;