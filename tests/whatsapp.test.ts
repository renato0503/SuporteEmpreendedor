import { describe, it, expect } from 'vitest';
import {
  formatWhatsAppMessage,
  generateWhatsAppURL,
  formatQuickReplyMessage,
  generateWhatsAppLink,
  isWhatsAppAvailable,
  formatServiceRequestMessage,
} from '../src/utils/whatsapp';
import type { LeadFormData } from '../src/types';

describe('formatWhatsAppMessage', () => {
  it('deve formatar mensagem corretamente com todos os campos', () => {
    const data: LeadFormData = {
      nome: 'João Silva',
      cpf: '111.444.777-35',
      cnpj: '11.222.333/0001-81',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      servicoId: 'abertura-mei',
      servicoNome: 'Abertura de MEI',
      valorHonorario: 97,
      observacoes: 'Preciso abrir MEI para prestação de serviços',
      consentimento: true,
    };

    const message = formatWhatsAppMessage(data);

    expect(message).toContain('Abertura de MEI');
    expect(message).toContain('R$ 97,00');
    expect(message).toContain('João Silva');
    expect(message).toContain('111.444.777-35');
    expect(message).toContain('11.222.333/0001-81');
    expect(message).toContain('(11) 99999-9999');
    expect(message).toContain('joao@email.com');
    expect(message).toContain('Preciso abrir MEI');
  });

  it('deve formatar mensagem sem CNPJ quando não informado', () => {
    const data: LeadFormData = {
      nome: 'Maria Santos',
      cpf: '222.333.444-55',
      telefone: '(21) 98888-8888',
      email: 'maria@email.com',
      servicoId: 'dasan',
      servicoNome: 'Declaração Anual (DASN)',
      valorHonorario: 67,
      consentimento: true,
    };

    const message = formatWhatsAppMessage(data);

    expect(message).toContain('Declaração Anual (DASN)');
    expect(message).not.toContain('CNPJ:');
  });

  it('deve incluir observações quando presente', () => {
    const data: LeadFormData = {
      nome: 'Teste',
      cpf: '111.111.111-11',
      telefone: '11999999999',
      email: 'teste@teste.com',
      servicoId: 'consulta-situacao',
      servicoNome: 'Consulta de Situação',
      valorHonorario: 47,
      observacoes: 'Observação importante',
      consentimento: true,
    };

    const message = formatWhatsAppMessage(data);

    expect(message).toContain('Observação importante');
    expect(message).toContain('📝 *Observações*');
  });

  it('não deve incluir seção de observações quando vazia', () => {
    const data: LeadFormData = {
      nome: 'Teste',
      cpf: '111.111.111-11',
      telefone: '11999999999',
      email: 'teste@teste.com',
      servicoId: 'consulta-situacao',
      servicoNome: 'Consulta de Situação',
      valorHonorario: 47,
      observacoes: '',
      consentimento: true,
    };

    const message = formatWhatsAppMessage(data);

    expect(message).not.toContain('📝 *Observações*');
  });

  it('deve usar markdown do WhatsApp corretamente', () => {
    const data: LeadFormData = {
      nome: 'Teste',
      cpf: '111.111.111-11',
      telefone: '11999999999',
      email: 'teste@teste.com',
      servicoId: 'abertura-mei',
      servicoNome: 'Abertura de MEI',
      valorHonorario: 97,
      consentimento: true,
    };

    const message = formatWhatsAppMessage(data);

    expect(message).toContain('*');
    expect(message).toContain('_');
    expect(message).toContain('─'.repeat(20));
  });
});

describe('generateWhatsAppURL', () => {
  it('deve gerar URL corretamente', () => {
    const data: LeadFormData = {
      nome: 'Teste',
      cpf: '111.111.111-11',
      telefone: '11999999999',
      email: 'teste@teste.com',
      servicoId: 'abertura-mei',
      servicoNome: 'Abertura de MEI',
      valorHonorario: 97,
      consentimento: true,
    };

    const url = generateWhatsAppURL(data);

    expect(url).toContain('https://wa.me/');
    expect(url).toContain('?text=');
  });

  it('deve URL-encoded corretamente', () => {
    const data: LeadFormData = {
      nome: 'João',
      cpf: '111.111.111-11',
      telefone: '11999999999',
      email: 'joao@email.com',
      servicoId: 'abertura-mei',
      servicoNome: 'Abertura de MEI',
      valorHonorario: 97,
      consentimento: true,
    };

    const url = generateWhatsAppURL(data);
    const decoded = decodeURIComponent(url);

    expect(decoded).toContain('João');
    expect(decoded).toContain('Abertura de MEI');
  });
});

describe('formatQuickReplyMessage', () => {
  it('deve formatar mensagem rápida corretamente', () => {
    const message = formatQuickReplyMessage('Abertura de MEI', 97, 'João Silva');

    expect(message).toContain('Abertura de MEI');
    expect(message).toContain('R$ 97,00');
    expect(message).toContain('João Silva');
  });
});

describe('generateWhatsAppLink', () => {
  it('deve gerar link básico', () => {
    const link = generateWhatsAppLink('5511999999999');
    expect(link).toBe('https://wa.me/5511999999999');
  });

  it('deve gerar link com mensagem', () => {
    const link = generateWhatsAppLink('5511999999999', 'Olá!');
    expect(link).toContain('https://wa.me/5511999999999');
    expect(link).toContain('text=');
  });

  it('deve limpar telefone', () => {
    const link = generateWhatsAppLink('+55 (11) 99999-9999', 'Teste');
    expect(link).toContain('551199999999');
  });
});

describe('isWhatsAppAvailable', () => {
  it('deve retornar booleano', () => {
    const result = isWhatsAppAvailable();
    expect(typeof result).toBe('boolean');
  });
});

describe('formatServiceRequestMessage', () => {
  it('deve formatar mensagem de contato', () => {
    const message = formatServiceRequestMessage('Abertura de MEI', 'João Silva', '11999999999');

    expect(message).toContain('Abertura de MEI');
    expect(message).toContain('João Silva');
    expect(message).toContain('11999999999');
  });
});