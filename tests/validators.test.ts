import { describe, it, expect } from 'vitest';
import {
  validateCPF,
  validateCNPJ,
  validateEmail,
  validatePhone,
  validateName,
  validateCEP,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateURL,
  validateDate,
  validateCPFOrCNPJ,
  validateFormField,
} from '../src/utils/validators';

describe('validateCPF', () => {
  it('deve retornar inválido para CPF vazio', () => {
    const result = validateCPF('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CPF é obrigatório');
  });

  it('deve retornar inválido para CPF com menos de 11 dígitos', () => {
    const result = validateCPF('1234567890');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CPF deve ter 11 dígitos');
  });

  it('deve retornar inválido para CPF com mais de 11 dígitos', () => {
    const result = validateCPF('123456789012');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CPF deve ter 11 dígitos');
  });

  it('deve retornar inválido para CPF com dígitos repetidos', () => {
    const result = validateCPF('11111111111');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CPF inválido (dígitos repetidos)');
  });

  it('deve retornar inválido para CPF com primeiro dígito verificador errado', () => {
    const result = validateCPF('12345678901');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CPF inválido (dígito verificador incorreto)');
  });

  it('deve retornar válido para CPF válido', () => {
    const result = validateCPF('11144477735');
    expect(result.valid).toBe(true);
  });

  it('deve aceitar CPF com máscara', () => {
    const result = validateCPF('111.444.777-35');
    expect(result.valid).toBe(true);
  });
});

describe('validateCNPJ', () => {
  it('deve retornar inválido para CNPJ vazio', () => {
    const result = validateCNPJ('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CNPJ é obrigatório');
  });

  it('deve retornar inválido para CNPJ com menos de 14 dígitos', () => {
    const result = validateCNPJ('1234567800019');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CNPJ deve ter 14 dígitos');
  });

  it('deve retornar inválido para CNPJ com mais de 14 dígitos', () => {
    const result = validateCNPJ('123456780001900');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CNPJ deve ter 14 dígitos');
  });

  it('deve retornar inválido para CNPJ com dígitos repetidos', () => {
    const result = validateCNPJ('11111111111111');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CNPJ inválido (dígitos repetidos)');
  });

  it('deve retornar inválido para CNPJ com dígitos verificadores errados', () => {
    const result = validateCNPJ('12345678000190');
    expect(result.valid).toBe(false);
  });

  it('deve retornar válido para CNPJ válido', () => {
    const result = validateCNPJ('11222333000181');
    expect(result.valid).toBe(true);
  });

  it('deve aceitar CNPJ com máscara', () => {
    const result = validateCNPJ('11.222.333/0001-81');
    expect(result.valid).toBe(true);
  });
});

describe('validateEmail', () => {
  it('deve retornar inválido para email vazio', () => {
    const result = validateEmail('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('E-mail é obrigatório');
  });

  it('deve retornar inválido para email sem @', () => {
    const result = validateEmail('email.com');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('E-mail inválido');
  });

  it('deve retornar inválido para email sem domínio', () => {
    const result = validateEmail('usuario@');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('E-mail inválido');
  });

  it('deve retornar inválido para email sem TLD', () => {
    const result = validateEmail('usuario@dominio');
    expect(result.valid).toBe(false);
  });

  it('deve retornar válido para email válido', () => {
    expect(validateEmail('teste@dominio.com').valid).toBe(true);
    expect(validateEmail('usuario.nome@empresa.com.br').valid).toBe(true);
    expect(validateEmail('user+tag@example.org').valid).toBe(true);
  });

  it('deve retornar inválido para email muito longo', () => {
    const longEmail = 'a'.repeat(250) + '@b.com';
    const result = validateEmail(longEmail);
    expect(result.valid).toBe(false);
    expect(result.message).toBe('E-mail muito longo');
  });
});

describe('validatePhone', () => {
  it('deve retornar inválido para telefone vazio', () => {
    const result = validatePhone('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Telefone é obrigatório');
  });

  it('deve retornar inválido para telefone com menos de 10 dígitos', () => {
    const result = validatePhone('119999999');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Telefone deve ter pelo menos 10 dígitos');
  });

  it('deve retornar inválido para telefone com mais de 11 dígitos', () => {
    const result = validatePhone('119999999999');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Telefone deve ter no máximo 11 dígitos');
  });

  it('deve retornar inválido para celular sem 9º dígito', () => {
    const result = validatePhone('11999999999');
    expect(result.valid).toBe(false);
  });

  it('deve retornar válido para telefone fixo', () => {
    const result = validatePhone('1133334444');
    expect(result.valid).toBe(true);
  });

  it('deve retornar válido para celular', () => {
    const result = validatePhone('11999999999');
    expect(result.valid).toBe(true);
  });

  it('deve aceitar telefone com máscara', () => {
    expect(validatePhone('(11) 99999-9999').valid).toBe(true);
    expect(validatePhone('(11) 3333-4444').valid).toBe(true);
  });
});

describe('validateName', () => {
  it('deve retornar inválido para nome vazio', () => {
    const result = validateName('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Nome é obrigatório');
  });

  it('deve retornar inválido para nome com menos de 3 caracteres', () => {
    const result = validateName('AB');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Nome deve ter pelo menos 3 caracteres');
  });

  it('deve retornar inválido para nome com mais de 100 caracteres', () => {
    const result = validateName('A'.repeat(101));
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Nome deve ter no máximo 100 caracteres');
  });

  it('deve retornar inválido para nome com números', () => {
    const result = validateName('João123');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Nome não deve conter números');
  });

  it('deve retornar inválido para nome com caracteres especiais', () => {
    const result = validateName('João@Silva');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Nome não deve conter caracteres especiais');
  });

  it('deve retornar válido para nome com acentos', () => {
    const result = validateName('João Silva Santos');
    expect(result.valid).toBe(true);
  });

  it('deve retornar válido para nome com hífen', () => {
    const result = validateName('Maria-Santos');
    expect(result.valid).toBe(true);
  });
});

describe('validateCEP', () => {
  it('deve retornar inválido para CEP vazio', () => {
    const result = validateCEP('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CEP é obrigatório');
  });

  it('deve retornar inválido para CEP com menos de 8 dígitos', () => {
    const result = validateCEP('1234567');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('CEP deve ter 8 dígitos');
  });

  it('deve retornar válido para CEP válido', () => {
    const result = validateCEP('12345678');
    expect(result.valid).toBe(true);
  });

  it('deve aceitar CEP com máscara', () => {
    const result = validateCEP('12345-678');
    expect(result.valid).toBe(true);
  });
});

describe('validateRequired', () => {
  it('deve retornar inválido para valor vazio', () => {
    const result = validateRequired('', 'Campo');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Campo é obrigatório');
  });

  it('deve retornar inválido para valor com espaços apenas', () => {
    const result = validateRequired('   ', 'Campo');
    expect(result.valid).toBe(false);
  });

  it('deve retornar válido para valor não vazio', () => {
    const result = validateRequired('valor', 'Campo');
    expect(result.valid).toBe(true);
  });
});

describe('validateMinLength', () => {
  it('deve retornar inválido para valor abaixo do mínimo', () => {
    const result = validateMinLength('ab', 3, 'Campo');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Campo deve ter pelo menos 3 caracteres');
  });

  it('deve retornar válido para valor no mínimo', () => {
    const result = validateMinLength('abc', 3, 'Campo');
    expect(result.valid).toBe(true);
  });

  it('deve retornar válido para valor acima do mínimo', () => {
    const result = validateMinLength('abcd', 3, 'Campo');
    expect(result.valid).toBe(true);
  });
});

describe('validateMaxLength', () => {
  it('deve retornar inválido para valor acima do máximo', () => {
    const result = validateMaxLength('abcd', 3, 'Campo');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Campo deve ter no máximo 3 caracteres');
  });

  it('deve retornar válido para valor no máximo', () => {
    const result = validateMaxLength('abc', 3, 'Campo');
    expect(result.valid).toBe(true);
  });

  it('deve retornar válido para valor abaixo do máximo', () => {
    const result = validateMaxLength('ab', 3, 'Campo');
    expect(result.valid).toBe(true);
  });
});

describe('validateURL', () => {
  it('deve retornar inválido para URL vazia', () => {
    const result = validateURL('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('URL é obrigatória');
  });

  it('deve retornar inválido para URL inválida', () => {
    const result = validateURL('not-a-url');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('URL inválida');
  });

  it('deve retornar válido para URL válida', () => {
    const result = validateURL('https://example.com');
    expect(result.valid).toBe(true);
  });
});

describe('validateDate', () => {
  it('deve retornar inválido para data vazia', () => {
    const result = validateDate('');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Data é obrigatória');
  });

  it('deve retornar inválido para data inválida', () => {
    const result = validateDate('32/13/2020');
    expect(result.valid).toBe(false);
  });

  it('deve retornar válido para data válida', () => {
    const result = validateDate('25/12/2020');
    expect(result.valid).toBe(true);
  });
});

describe('validateCPFOrCNPJ', () => {
  it('deve aceitar CPF válido', () => {
    const result = validateCPFOrCNPJ('11144477735', 'Documento');
    expect(result.valid).toBe(true);
  });

  it('deve aceitar CNPJ válido', () => {
    const result = validateCPFOrCNPJ('11222333000181', 'Documento');
    expect(result.valid).toBe(true);
  });

  it('deve rejeitar documento com tamanho inválido', () => {
    const result = validateCPFOrCNPJ('123', 'Documento');
    expect(result.valid).toBe(false);
  });
});

describe('validateFormField', () => {
  it('deve validar campo obrigatório', () => {
    const result = validateFormField('', { name: 'CPF', required: true, type: 'text' });
    expect(result.valid).toBe(false);
  });

  it('deve validar CPF quando tipo é cpf', () => {
    const result = validateFormField('123', { name: 'CPF', required: true, type: 'cpf' });
    expect(result.valid).toBe(false);
  });

  it('deve validar email quando tipo é email', () => {
    const result = validateFormField('invalid', { name: 'E-mail', required: true, type: 'email' });
    expect(result.valid).toBe(false);
  });

  it('deve validar nome quando campo contém "nome"', () => {
    const result = validateFormField('Ab', { name: 'Nome', required: true, type: 'text' });
    expect(result.valid).toBe(false);
  });
});