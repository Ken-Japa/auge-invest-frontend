import { FormData, FormErrors } from '../types'

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '')
  if (cpf.length !== 11) return false
  if (cpf === '00000000000') return false

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

export const validateForm = (
  formData: FormData,
  acceptedTerms: boolean,
): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {}

  if (!formData.name.trim()) {
    errors.name = 'Nome é obrigatório'
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres'
  }

  const cpfClean = formData.cpf.replace(/[^\d]/g, '')
  if (!cpfClean) {
    errors.cpf = 'CPF é obrigatório'
  } else if (!validateCPF(cpfClean)) {
    errors.cpf = 'CPF inválido'
  }

  const phoneClean = formData.phone.replace(/[^\d]/g, '')
  if (!phoneClean) {
    errors.phone = 'Telefone é obrigatório'
  } else if (phoneClean.length < 10 || phoneClean.length > 11) {
    errors.phone = 'Telefone inválido'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    errors.email = 'Email inválido'
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  if (!passwordRegex.test(formData.password)) {
    errors.password = 'A senha deve conter pelo menos 6 caracteres, incluindo letras e números'
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 && acceptedTerms,
  }
}
