export interface FormData {
  name: string
  cpf: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

export interface FormErrors {
  name?: string
  cpf?: string
  phone?: string
  email?: string
  password?: string
  confirmPassword?: string
}
