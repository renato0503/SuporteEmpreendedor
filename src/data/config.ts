import type { AppConfig } from '../types';

export const APP_CONFIG: AppConfig = {
  whatsappNumber: '5565993482157',
  siteName: 'Suporte Empreendedor',
  siteDescription: 'Simplifique a Gestão do seu MEI com quem entende.',
  gaId: 'G-Z1J2BX3Z60', // Measurement ID from Firebase
  metaPixelId: '',
  emailContato: 'contato@suporteempreendedor.com.br',
  endereco: '',
  horarioAtendimento: 'Segunda a sexta, das 9h às 18h',
  companyName: 'Inova tech soluções',
  cnpj: '46.965.600.0001.95',
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
  ogImage: '/logo.png',
};

export const COLORS = {
  primary: {
    50: '#f0f7f4',
    100: '#dcece5',
    200: '#bdd9cd',
    300: '#92bdab',
    400: '#649b84',
    500: '#125133', // Verde Principal
    600: '#0e422a',
    700: '#0b3422',
    800: '#08271a',
    900: '#051b12',
  },
  cta: {
    400: '#fb9f4b',
    500: '#F18825', // Laranja CTA
    600: '#d16e11',
  },
  footer: '#125133',
  success: '#125133',
  warning: '#F18825',
  error: '#EF4444',
  info: '#125133',
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