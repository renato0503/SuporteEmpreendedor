import { describe, it, expect } from 'vitest';
import {
  maskCPF,
  maskCNPJ,
  maskPhone,
  maskCEP,
  maskCurrency,
  maskDate,
  unmask,
  formatPhoneInternational,
  isValidPhoneLength,
  getPhoneType,
} from '../src/utils/masks';

describe('maskCPF', () => {
  it('deve retornar string vazia para valor vazio', () => {
    expect(maskCPF('')).toBe('');
    expect(maskCPF(null as unknown as string)).toBe('');
    expect(maskCPF(undefined as unknown as string)).toBe('');
  });

  it('deve formatar CPF com menos de 3 dígitos', () => {
    expect(maskCPF('123')).toBe('123');
    expect(maskCPF('12')).toBe('12');
    expect(maskCPF('1')).toBe('1');
  });

  it('deve formatar CPF com 3-5 dígitos', () => {
    expect(maskCPF('12345')).toBe('123.45');
    expect(maskCPF('1234')).toBe('123.4');
  });

  it('deve formatar CPF com 6-8 dígitos', () => {
    expect(maskCPF('1234567')).toBe('123.456.7');
    expect(maskCPF('12345678')).toBe('123.456.78');
  });

  it('deve formatar CPF completo com 11 dígitos', () => {
    expect(maskCPF('12345678901')).toBe('123.456.789-01');
  });

  it('deve ignorar caracteres não numéricos', () => {
    expect(maskCPF('123.456.789-01')).toBe('123.456.789-01');
    expect(maskCPF('123-456-789-01')).toBe('123.456.789-01');
    expect(maskCPF('abc123def456ghi789jkl01')).toBe('123.456.789-01');
  });

  it('deve limitar a 11 dígitos', () => {
    expect(maskCPF('123456789012')).toBe('123.456.789-01');
  });
});

describe('maskCNPJ', () => {
  it('deve retornar string vazia para valor vazio', () => {
    expect(maskCNPJ('')).toBe('');
    expect(maskCNPJ(null as unknown as string)).toBe('');
  });

  it('deve formatar CNPJ com menos de 2 dígitos', () => {
    expect(maskCNPJ('12')).toBe('12');
    expect(maskCNPJ('1')).toBe('1');
  });

  it('deve formatar CNPJ com 2-4 dígitos', () => {
    expect(maskCNPJ('1234')).toBe('12.34');
    expect(maskCNPJ('123')).toBe('12.3');
  });

  it('deve formatar CNPJ com 5-7 dígitos', () => {
    expect(maskCNPJ('1234567')).toBe('12.345.67');
    expect(maskCNPJ('12345678')).toBe('12.345.678');
  });

  it('deve formatar CNPJ com 8-11 dígitos', () => {
    expect(maskCNPJ('1234567890')).toBe('12.345.678/90');
    expect(maskCNPJ('12345678901')).toBe('12.345.678/901');
  });

  it('deve formatar CNPJ completo com 14 dígitos', () => {
    expect(maskCNPJ('12345678000190')).toBe('12.345.678/0001-90');
  });

  it('deve ignorar caracteres não numéricos', () => {
    expect(maskCNPJ('12.345.678/0001-90')).toBe('12.345.678/0001-90');
  });

  it('deve limitar a 14 dígitos', () => {
    expect(maskCNPJ('123456789012345')).toBe('12.345.678/0001-90');
  });
});

describe('maskPhone', () => {
  it('deve retornar string vazia para valor vazio', () => {
    expect(maskPhone('')).toBe('');
  });

  it('deve formatar telefone com DDD apenas', () => {
    expect(maskPhone('11')).toBe('(11)');
    expect(maskPhone('1')).toBe('(1)');
  });

  it('deve formatar telefone com 3 dígitos (com espaço)', () => {
    expect(maskPhone('119')).toBe('(11) 9');
  });

  it('deve formatar telefone fixo (10 dígitos)', () => {
    expect(maskPhone('1133334444')).toBe('(11) 3333-4444');
  });

  it('deve formatar telefone celular (11 dígitos)', () => {
    expect(maskPhone('11999999999')).toBe('(11) 99999-9999');
  });

  it('deve ignorar caracteres não numéricos', () => {
    expect(maskPhone('(11) 99999-9999')).toBe('(11) 99999-9999');
    expect(maskPhone('+55 11 99999 9999')).toBe('(11) 99999-9999');
  });

  it('deve limitar a 11 dígitos', () => {
    expect(maskPhone('1199999999999')).toBe('(11) 99999-9999');
  });
});

describe('maskCEP', () => {
  it('deve retornar string vazia para valor vazio', () => {
    expect(maskCEP('')).toBe('');
  });

  it('deve formatar CEP com menos de 5 dígitos', () => {
    expect(maskCEP('12345')).toBe('12345');
    expect(maskCEP('1234')).toBe('1234');
  });

  it('deve formatar CEP completo', () => {
    expect(maskCEP('12345678')).toBe('12345-678');
  });

  it('deve ignorar caracteres não numéricos', () => {
    expect(maskCEP('12345-678')).toBe('12345-678');
  });

  it('deve limitar a 8 dígitos', () => {
    expect(maskCEP('1234567890')).toBe('12345-678');
  });
});

describe('maskCurrency', () => {
  it('deve formatar número para moeda brasileira', () => {
    expect(maskCurrency(100)).toBe('R$ 100,00');
    expect(maskCurrency(1234.56)).toBe('R$ 1.234,56');
    expect(maskCurrency(0)).toBe('R$ 0,00');
  });

  it('deve formatar string numérica', () => {
    expect(maskCurrency('100')).toBe('R$ 100,00');
    expect(maskCurrency('1234.56')).toBe('R$ 1.234,56');
  });

  it('deve retornar R$ 0,00 para valor inválido', () => {
    expect(maskCurrency(NaN)).toBe('R$ 0,00');
    expect(maskCurrency('abc' as unknown as number)).toBe('R$ 0,00');
  });
});

describe('unmask', () => {
  it('deve retornar string vazia para valor vazio', () => {
    expect(unmask('')).toBe('');
  });

  it('deve remover todos os caracteres não numéricos', () => {
    expect(unmask('123.456.789-01')).toBe('12345678901');
    expect(unmask('12.345.678/0001-90')).toBe('12345678000190');
    expect(unmask('(11) 99999-9999')).toBe('11999999999');
    expect(unmask('abc123def456')).toBe('123456');
  });
});

describe('formatPhoneInternational', () => {
  it('deve formatar número para formato internacional brasileiro', () => {
    expect(formatPhoneInternational('11', '999999999')).toBe('5511999999999');
    expect(formatPhoneInternational('21', '33334444')).toBe('552133334444');
  });
});

describe('isValidPhoneLength', () => {
  it('deve validar telefone com 10 dígitos', () => {
    expect(isValidPhoneLength('1133334444')).toBe(true);
  });

  it('deve validar telefone com 11 dígitos', () => {
    expect(isValidPhoneLength('11999999999')).toBe(true);
  });

  it('deve rejeitar telefone com menos de 10 dígitos', () => {
    expect(isValidPhoneLength('1199999999')).toBe(false);
  });

  it('deve rejeitar telefone com mais de 11 dígitos', () => {
    expect(isValidPhoneLength('119999999999')).toBe(false);
  });
});

describe('getPhoneType', () => {
  it('deve retornar landline para telefone de 10 dígitos', () => {
    expect(getPhoneType('1133334444')).toBe('landline');
  });

  it('deve retornar mobile para celular (11 dígitos começando com 9)', () => {
    expect(getPhoneType('11999999999')).toBe('mobile');
  });

  it('deve retornar invalid para 11 dígitos sem 9', () => {
    expect(getPhoneType('11899999999')).toBe('invalid');
  });

  it('deve retornar invalid para quantidade inválida de dígitos', () => {
    expect(getPhoneType('123')).toBe('invalid');
    expect(getPhoneType('123456789012')).toBe('invalid');
  });
});