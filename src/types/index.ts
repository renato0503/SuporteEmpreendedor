export type ServiceId =
  | 'abertura-mei'
  | 'dasan'
  | 'parcelamento'
  | 'alteracao-cadastral'
  | 'baixa-mei'
  | 'consulta-situacao';

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'cpf'
  | 'cnpj'
  | 'cep'
  | 'number'
  | 'currency'
  | 'date'
  | 'textarea'
  | 'select';

export type IconName =
  | 'briefcase'
  | 'document'
  | 'calculator'
  | 'pencil'
  | 'trash'
  | 'search'
  | 'phone'
  | 'whatsapp'
  | 'check'
  | 'clock'
  | 'shield'
  | 'star';

export interface FAQItem {
  pergunta: string;
  resposta: string;
  palavrasChave?: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  mask?: string;
  maxLength?: number;
  minLength?: number;
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    message?: string;
  };
  options?: SelectOption[];
  helpText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
  field?: string;
}

export interface LeadFormData {
  nome: string;
  cpf: string;
  cnpj?: string;
  telefone: string;
  email: string;
  servicoId: ServiceId;
  servicoNome: string;
  valorHonorario: number;
  observacoes?: string;
  consentimento: boolean;
  dataConsentimento?: Date;
  ip?: string;
  userAgent?: string;
}

export interface Service {
  id: ServiceId;
  slug: string;
  nome: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  valorMinimo: number;
  valorMedio?: number;
  icone: IconName;
  corDestaque: string;
  prazoEstimado: string;
  documentosNecessarios: string[];
  faq: FAQItem[];
  beneficios: string[];
  etapas: string[];
  observacoes?: string;
}

export interface Route {
  path: string;
  title: string;
  render: () => HTMLElement | string;
  meta?: {
    description?: string;
    keywords?: string[];
  };
}

export interface WhatsAppConfig {
  phoneNumber: string;
  baseUrl: string;
  defaultMessage?: string;
}

export interface AppConfig {
  whatsappNumber: string;
  siteName: string;
  siteDescription: string;
  gaId?: string;
  metaPixelId?: string;
  emailContato?: string;
  endereco?: string;
  horarioAtendimento?: string;
}

export interface Testimonial {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  servico: ServiceId;
  servicoNome: string;
  texto: string;
  rating: number;
  data: Date;
  foto?: string;
}

export interface PageProps {
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type RouterCallback = (params: Record<string, string>) => void;

export interface RouterRoute {
  path: string;
  title: string;
  render: RouterCallback;
  meta?: {
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}