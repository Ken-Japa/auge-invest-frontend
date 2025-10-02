export interface ApplicationFormProps {
  isLoading: boolean
}

export interface FormData {
  name: string
  email: string
  phone: string
  role: string
  experience: string
  portfolio: string
  github: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
  experience?: string
  role?: string
}
