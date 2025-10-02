export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning'

export interface SnackbarState {
  open: boolean
  message: string
  severity: SnackbarSeverity
}
