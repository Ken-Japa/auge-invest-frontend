import { FormErrors } from '../types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {}

  if (!email.trim()) {
    errors.email = 'E-mail é obrigatório'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'E-mail inválido'
  }

  if (!password.trim()) {
    errors.password = 'Senha é obrigatória'
  }

  return errors
}
