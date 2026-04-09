import type { ValidationResult } from '../types';
import { unmask } from './masks';

export function validateCPF(cpf: string): ValidationResult {
  if (!cpf) {
    return { valid: false, message: 'CPF é obrigatório' };
  }

  const digits = unmask(cpf);

  if (digits.length !== 11) {
    return { valid: false, message: 'CPF deve ter 11 dígitos' };
  }

  if (/^(\d)\1{10}$/.test(digits)) {
    return { valid: false, message: 'CPF inválido (dígitos repetidos)' };
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(digits[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(digits[9])) {
    return { valid: false, message: 'CPF inválido (dígito verificador incorreto)' };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(digits[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(digits[10])) {
    return { valid: false, message: 'CPF inválido (dígito verificador incorreto)' };
  }

  return { valid: true };
}

export function validateCNPJ(cnpj: string): ValidationResult {
  if (!cnpj) {
    return { valid: false, message: 'CNPJ é obrigatório' };
  }

  const digits = unmask(cnpj);

  if (digits.length !== 14) {
    return { valid: false, message: 'CNPJ deve ter 14 dígitos' };
  }

  if (/^(\d)\1{13}$/.test(digits)) {
    return { valid: false, message: 'CNPJ inválido (dígitos repetidos)' };
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += Number(digits[i]) * weights1[i];
  }
  let remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== Number(digits[12])) {
    return { valid: false, message: 'CNPJ inválido (dígito verificador incorreto)' };
  }

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += Number(digits[i]) * weights2[i];
  }
  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== Number(digits[13])) {
    return { valid: false, message: 'CNPJ inválido (dígito verificador incorreto)' };
  }

  return { valid: true };
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, message: 'E-mail é obrigatório' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'E-mail inválido' };
  }

  if (email.length > 254) {
    return { valid: false, message: 'E-mail muito longo' };
  }

  const localPart = email.split('@')[0];
  if (localPart.length > 64) {
    return { valid: false, message: 'Parte local do e-mail muito longa' };
  }

  return { valid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { valid: false, message: 'Telefone é obrigatório' };
  }

  const digits = unmask(phone);

  if (digits.length < 10) {
    return { valid: false, message: 'Telefone deve ter pelo menos 10 dígitos' };
  }

  if (digits.length > 11) {
    return { valid: false, message: 'Telefone deve ter no máximo 11 dígitos' };
  }

  if (digits.length === 11 && digits[2] !== '9') {
    return { valid: false, message: 'Celular deve ter 9º dígito igual a 9' };
  }

  if (digits.length === 10 && digits[2] === '9') {
    return { valid: false, message: 'Número de 10 dígitos deve ser telefone fixo' };
  }

  return { valid: true };
}

export function validateName(name: string): ValidationResult {
  if (!name) {
    return { valid: false, message: 'Nome é obrigatório' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 3) {
    return { valid: false, message: 'Nome deve ter pelo menos 3 caracteres' };
  }

  if (trimmed.length > 100) {
    return { valid: false, message: 'Nome deve ter no máximo 100 caracteres' };
  }

  const hasNumber = /\d/.test(trimmed);
  if (hasNumber) {
    return { valid: false, message: 'Nome não deve conter números' };
  }

  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmed);
  if (hasSpecialChars) {
    return { valid: false, message: 'Nome não deve conter caracteres especiais' };
  }

  const validNameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
  if (!validNameRegex.test(trimmed)) {
    return { valid: false, message: 'Nome contém caracteres inválidos' };
  }

  return { valid: true };
}

export function validateCEP(cep: string): ValidationResult {
  if (!cep) {
    return { valid: false, message: 'CEP é obrigatório' };
  }

  const digits = unmask(cep);

  if (digits.length !== 8) {
    return { valid: false, message: 'CEP deve ter 8 dígitos' };
  }

  return { valid: true };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} é obrigatório` };
  }
  return { valid: true };
}

export function validateMinLength(value: string, min: number, fieldName: string): ValidationResult {
  if (value && value.trim().length < min) {
    return { valid: false, message: `${fieldName} deve ter pelo menos ${min} caracteres` };
  }
  return { valid: true };
}

export function validateMaxLength(value: string, max: number, fieldName: string): ValidationResult {
  if (value && value.trim().length > max) {
    return { valid: false, message: `${fieldName} deve ter no máximo ${max} caracteres` };
  }
  return { valid: true };
}

export function validateURL(url: string): ValidationResult {
  if (!url) {
    return { valid: false, message: 'URL é obrigatória' };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, message: 'URL inválida' };
  }
}

export function validateDate(dateString: string): ValidationResult {
  if (!dateString) {
    return { valid: false, message: 'Data é obrigatória' };
  }

  const parts = dateString.split('/');
  if (parts.length !== 3) {
    return { valid: false, message: 'Data inválida (formato: DD/MM/AAAA)' };
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
    return { valid: false, message: 'Data inválida' };
  }

  const date = new Date(year, month - 1, day);
  if (date.getMonth() !== month - 1 || date.getFullYear() !== year || date.getDate() !== day) {
    return { valid: false, message: 'Data inválida' };
  }

  return { valid: true };
}

export function validateCNPJAlready(cnpj: string): ValidationResult {
  return validateCNPJ(cnpj);
}

export function validateCPFOrCNPJ(value: string, fieldName: string): ValidationResult {
  if (!value) {
    return { valid: false, message: `${fieldName} é obrigatório` };
  }

  const digits = unmask(value);
  
  if (digits.length === 11) {
    return validateCPF(value);
  } else if (digits.length === 14) {
    return validateCNPJ(value);
  } else {
    return { valid: false, message: `${fieldName} deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)` };
  }
}

export function validateFormField(value: string, field: { name: string; required: boolean; type: string }): ValidationResult {
  if (field.required) {
    const requiredResult = validateRequired(value, field.name);
    if (!requiredResult.valid) return requiredResult;
  }

  if (!value) return { valid: true };

  switch (field.type) {
    case 'cpf':
      return validateCPF(value);
    case 'cnpj':
      return validateCNPJ(value);
    case 'email':
      return validateEmail(value);
    case 'tel':
    case 'telefone':
      return validatePhone(value);
    case 'cep':
      return validateCEP(value);
    case 'text':
      if (field.name.toLowerCase().includes('nome')) {
        return validateName(value);
      }
      break;
  }

  return { valid: true };
}