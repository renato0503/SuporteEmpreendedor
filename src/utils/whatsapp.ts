import type { LeadFormData } from '../types';
import { APP_CONFIG, WHATSAPP_BASE_URL } from '../data/config';

export function formatWhatsAppMessage(data: LeadFormData): string {
  const lines: string[] = [];

  lines.push(`🚀 *Novo pedido de serviço*`);
  lines.push('');
  lines.push(`📋 *${data.servicoNome}*`);
  lines.push(`💰 *Valor: R$ ${data.valorHonorario.toFixed(2).replace('.', ',')}*`);
  lines.push('');
  lines.push('─'.repeat(20));
  lines.push('👤 *Dados do Cliente*');
  lines.push('');

  lines.push(`*Nome:* ${data.nome}`);
  lines.push(`*CPF:* ${data.cpf}`);
  
  if (data.cnpj) {
    lines.push(`*CNPJ:* ${data.cnpj}`);
  }
  
  lines.push(`*Telefone:* ${data.telefone}`);
  lines.push(`*E-mail:* ${data.email}`);

  if (data.observacoes && data.observacoes.trim()) {
    lines.push('');
    lines.push('─'.repeat(20));
    lines.push('📝 *Observações*');
    lines.push('');
    lines.push(data.observacoes);
  }

  lines.push('');
  lines.push('─'.repeat(20));
  lines.push('');
  lines.push('✅ _Enviado via Suporte Empreendedor_');
  lines.push(`📅 ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);

  return lines.join('\n');
}

export function generateWhatsAppURL(data: LeadFormData): string {
  const message = formatWhatsAppMessage(data);
  const phone = APP_CONFIG.whatsappNumber;
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}/${phone}?text=${encodedMessage}`;
}

export function redirectToWhatsApp(data: LeadFormData): void {
  const url = generateWhatsAppURL(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function formatQuickReplyMessage(serviceName: string, servicePrice: number, customerName: string): string {
  return `Olá! Gostaria de informações sobre *${serviceName}* (R$ ${servicePrice.toFixed(2).replace('.', ',')}).

Meu nome: ${customerName}`;
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const baseUrl = 'https://wa.me';
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (message) {
    return `${baseUrl}/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }
  
  return `${baseUrl}/${cleanPhone}`;
}

export function isWhatsAppAvailable(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  return isMobile || 'ontouchstart' in window;
}

export function getWhatsAppInstallURL(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'https://apps.apple.com/app/whatsapp-messenger/id310633997';
  }
  
  if (/android/.test(userAgent)) {
    return 'https://play.google.com/store/apps/details?id=com.whatsapp';
  }
  
  return 'https://www.whatsapp.com/download/';
}

export function formatServiceRequestMessage(
  serviceName: string,
  customerName: string,
  customerPhone: string
): string {
  const lines = [
    `📩 *Novo pedido de contato*`,
    '',
    `*Serviço:* ${serviceName}`,
    `*Nome:* ${customerName}`,
    `*Telefone:* ${customerPhone}`,
    '',
    'Por favor, entrar em contato.',
  ];
  
  return lines.join('\n');
}